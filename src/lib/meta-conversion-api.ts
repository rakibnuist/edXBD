// Meta Conversion API implementation for EduExpress International
import crypto from 'crypto';

// Configuration
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || '';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
const META_API_VERSION = 'v18.0';

// Hash data for Meta Conversion API (server-side)
export const hashData = (data: string): string => {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
};

// Get client IP from request headers
export const getClientIP = (request: Request): string => {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return '127.0.0.1';
};

// Generate unique event ID for deduplication
export const generateEventId = (): string => {
  return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Send event to Meta Conversion API
export const sendConversionAPIEvent = async (
  eventName: string,
  userData: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  },
  customData?: Record<string, unknown>,
  eventId?: string,
  request?: Request
): Promise<{ success: boolean; eventId: string; error?: string }> => {
  if (!META_ACCESS_TOKEN || !META_PIXEL_ID) {
    return {
      success: false,
      eventId: eventId || generateEventId(),
      error: 'Missing Meta access token or pixel ID'
    };
  }

  try {
    const finalEventId = eventId || generateEventId();
    
    // Prepare user data with hashed values
    const hashedUserData: Record<string, string[]> = {};
    
    if (userData.email) {
      hashedUserData.em = [hashData(userData.email)];
    }
    if (userData.phone) {
      hashedUserData.ph = [hashData(userData.phone)];
    }
    if (userData.firstName) {
      hashedUserData.fn = [hashData(userData.firstName)];
    }
    if (userData.lastName) {
      hashedUserData.ln = [hashData(userData.lastName)];
    }
    if (userData.city) {
      hashedUserData.ct = [hashData(userData.city)];
    }
    if (userData.state) {
      hashedUserData.st = [hashData(userData.state)];
    }
    if (userData.country) {
      hashedUserData.country = [hashData(userData.country)];
    }
    if (userData.zipCode) {
      hashedUserData.zp = [hashData(userData.zipCode)];
    }

    // Get client IP and user agent
    const clientIP = request ? getClientIP(request) : '127.0.0.1';
    const userAgent = request ? request.headers.get('user-agent') || '' : '';

    const eventData = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: finalEventId,
          user_data: {
            ...hashedUserData,
            client_ip_address: clientIP,
            client_user_agent: userAgent,
          },
          custom_data: customData || {},
          event_source_url: request ? new URL(request.url).href : '',
          action_source: 'website',
        },
      ],
      access_token: META_ACCESS_TOKEN,
    };

    const response = await fetch(`https://graph.facebook.com/${META_API_VERSION}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Meta Conversion API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    
    return {
      success: true,
      eventId: finalEventId,
    };
  } catch (error) {
    console.error('Meta Conversion API error:', error);
    return {
      success: false,
      eventId: eventId || generateEventId(),
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Education-specific conversion events
export const trackStudyAbroadLead = async (
  formData: {
    name: string;
    email: string;
    phone: string;
    country?: string;
    program?: string;
    message?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  },
  source: string = 'website_contact_form',
  request?: Request
): Promise<{ success: boolean; eventId: string; error?: string }> => {
  const eventId = generateEventId();
  const [firstName, ...lastNameParts] = formData.name.split(' ');
  const lastName = lastNameParts.join(' ') || '';
  
  const userData = {
    email: formData.email,
    phone: formData.phone,
    firstName: firstName,
    lastName: lastName,
    city: formData.city,
    state: formData.state,
    country: formData.country,
    zipCode: formData.zipCode,
  };

  const customData = {
    content_name: 'Study Abroad Consultation Form',
    content_category: 'Education Lead Generation',
    source: source,
    study_destination: formData.country || 'not_specified',
    program_interest: formData.program || 'not_specified',
    has_message: !!formData.message,
    value: 0,
    currency: 'BDT',
  };

  return await sendConversionAPIEvent('Lead', userData, customData, eventId, request);
};

export const trackConsultationRequest = async (
  source: string = 'website',
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  },
  request?: Request
): Promise<{ success: boolean; eventId: string; error?: string }> => {
  const eventId = generateEventId();
  
  const customData = {
    content_name: 'Free Consultation Request',
    content_category: 'Lead Generation',
    source: source,
    value: 0,
    currency: 'BDT',
  };

  return await sendConversionAPIEvent('Lead', userData || {}, customData, eventId, request);
};

export const trackPageView = async (
  pageName: string,
  pageCategory?: string,
  request?: Request
): Promise<{ success: boolean; eventId: string; error?: string }> => {
  const eventId = generateEventId();
  
  const customData = {
    content_name: pageName,
    content_category: pageCategory || 'general',
    page_title: pageName,
    page_category: pageCategory || 'general',
  };

  return await sendConversionAPIEvent('PageView', {}, customData, eventId, request);
};

export const trackViewContent = async (
  contentName: string,
  contentCategory: string,
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  },
  request?: Request
): Promise<{ success: boolean; eventId: string; error?: string }> => {
  const eventId = generateEventId();
  
  const customData = {
    content_name: contentName,
    content_category: contentCategory,
    value: 0,
    currency: 'BDT',
  };

  return await sendConversionAPIEvent('ViewContent', userData || {}, customData, eventId, request);
};

export const trackCompleteRegistration = async (
  formType: string,
  userData: {
    email: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  },
  request?: Request
): Promise<{ success: boolean; eventId: string; error?: string }> => {
  const eventId = generateEventId();
  
  const customData = {
    content_name: `${formType} Registration`,
    content_category: 'Form Submission',
    registration_method: formType,
    value: 0,
    currency: 'BDT',
  };

  return await sendConversionAPIEvent('CompleteRegistration', userData, customData, eventId, request);
};

export const trackContact = async (
  contactMethod: string,
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  },
  request?: Request
): Promise<{ success: boolean; eventId: string; error?: string }> => {
  const eventId = generateEventId();
  
  const customData = {
    content_name: `${contactMethod} Contact`,
    content_category: 'Contact',
    contact_method: contactMethod,
    value: 0,
    currency: 'BDT',
  };

  return await sendConversionAPIEvent('Contact', userData || {}, customData, eventId, request);
};

// Test event for debugging
export const testConversionAPI = async (
  request?: Request
): Promise<{ success: boolean; eventId: string; error?: string }> => {
  const eventId = generateEventId();
  
  const customData = {
    content_name: 'Test Event',
    content_category: 'Testing',
    test_event: true,
    value: 0,
    currency: 'BDT',
  };

  return await sendConversionAPIEvent('PageView', {}, customData, eventId, request);
};
