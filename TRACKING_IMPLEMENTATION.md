# 📊 Advanced Tracking Implementation Guide

## 1. Add Data Attributes to Buttons

### WhatsApp Buttons
```html
<!-- Add these attributes to all WhatsApp buttons -->
<button 
  data-whatsapp-tracking
  data-source="destination_page"
  data-country="South Korea"
  data-program="Engineering"
>
  WhatsApp Us
</button>
```

### Phone Buttons
```html
<!-- Add these attributes to all phone buttons -->
<button 
  data-phone-tracking
  data-source="header"
  data-contact-type="consultation"
>
  Call Now
</button>
```

### Scholarship Buttons
```html
<!-- Add these attributes to scholarship-related buttons -->
<button 
  data-scholarship-tracking
  data-country="South Korea"
  data-program="MBA"
  data-scholarship-type="merit"
>
  Apply for Scholarship
</button>
```

### University Buttons
```html
<!-- Add these attributes to university-related buttons -->
<button 
  data-university-tracking
  data-university="Seoul National University"
  data-country="South Korea"
  data-program="Computer Science"
>
  Learn More
</button>
```

### Program Buttons
```html
<!-- Add these attributes to program-related buttons -->
<button 
  data-program-tracking
  data-program="MBA"
  data-country="South Korea"
  data-duration="2 years"
>
  View Program Details
</button>
```

### Document Download Buttons
```html
<!-- Add these attributes to download buttons -->
<button 
  data-document-tracking
  data-document="University Application Guide"
  data-document-type="PDF"
  data-country="South Korea"
>
  Download Guide
</button>
```

### Email Subscription Forms
```html
<!-- Add these attributes to newsletter signup forms -->
<form 
  data-email-subscription-tracking
  data-source="footer"
  data-list="newsletter"
>
  <input type="email" placeholder="Enter your email" />
  <button type="submit">Subscribe</button>
</form>
```

### Partnership Buttons
```html
<!-- Add these attributes to partnership-related buttons -->
<button 
  data-partnership-tracking
  data-partnership-type="agent"
  data-country="Bangladesh"
  data-experience="5+ years"
>
  Become a Partner
</button>
```

## 2. Page-Specific Tracking Implementation

### Homepage
```tsx
// Add to src/app/page.tsx
<EducationTracking 
  whatsappSource="hero_section"
  phoneSource="hero_section"
  scholarshipCountry="South Korea"
  scholarshipProgram="Engineering"
/>
```

### Destination Pages
```tsx
// Add to each destination page
<EducationTracking 
  whatsappSource="destination_page"
  phoneSource="destination_page"
  universityName="Seoul National University"
  universityCountry="South Korea"
  programName="Computer Science"
  programCountry="South Korea"
  documentName="South Korea Study Guide"
  documentType="PDF"
/>
```

### Services Page
```tsx
// Add to src/app/services/page.tsx
<EducationTracking 
  whatsappSource="services_page"
  phoneSource="services_page"
  scholarshipCountry="Multiple"
  scholarshipProgram="All Programs"
/>
```

### Partnership Page
```tsx
// Add to src/app/partnership/page.tsx
<EducationTracking 
  whatsappSource="partnership_page"
  phoneSource="partnership_page"
  companyName="Partner Company"
/>
```

## 3. Form Enhancement

### Contact Form
```tsx
// Add to contact form submission
const handleSubmit = async (formData) => {
  // Track form submission
  await fetch('/api/meta-conversion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventType: 'study_abroad_lead',
      data: formData,
      source: 'contact_form'
    })
  });
};
```

### Quick Contact Form
```tsx
// Add to quick contact form
const handleQuickSubmit = async (formData) => {
  // Track quick form submission
  await fetch('/api/meta-conversion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventType: 'consultation_request',
      data: formData,
      source: 'quick_form'
    })
  });
};
```

## 4. Advanced Event Tracking

### Scroll Tracking
```tsx
// Add scroll-based tracking
useEffect(() => {
  const handleScroll = () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercent > 50 && !hasTracked50) {
      trackEvent('scroll_depth', { depth: 50, page: 'homepage' });
      setHasTracked50(true);
    }
    
    if (scrollPercent > 75 && !hasTracked75) {
      trackEvent('scroll_depth', { depth: 75, page: 'homepage' });
      setHasTracked75(true);
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Time on Page Tracking
```tsx
// Add time-based tracking
useEffect(() => {
  const startTime = Date.now();
  
  return () => {
    const timeSpent = Date.now() - startTime;
    if (timeSpent > 30000) { // 30 seconds
      trackEvent('time_on_page', { 
        duration: timeSpent, 
        page: 'homepage' 
      });
    }
  };
}, []);
```

### Video Engagement Tracking
```tsx
// Add video tracking
const handleVideoPlay = () => {
  trackEvent('video_play', {
    video_title: 'Study in South Korea',
    video_duration: 120,
    page: 'destination_page'
  });
};

const handleVideoComplete = () => {
  trackEvent('video_complete', {
    video_title: 'Study in South Korea',
    completion_rate: 100,
    page: 'destination_page'
  });
};
```

## 5. Error Tracking

### Form Validation Errors
```tsx
// Track form validation errors
const handleValidationError = (field, error) => {
  trackEvent('form_validation_error', {
    field_name: field,
    error_type: error,
    form_type: 'contact_form',
    page: 'contact'
  });
};
```

### API Errors
```tsx
// Track API errors
const handleApiError = (error, endpoint) => {
  trackEvent('api_error', {
    error_message: error.message,
    endpoint: endpoint,
    page: window.location.pathname
  });
};
```

## 6. Performance Tracking

### Page Load Times
```tsx
// Track page performance
useEffect(() => {
  const loadTime = performance.now();
  trackEvent('page_load_time', {
    load_time: loadTime,
    page: 'homepage',
    connection_type: navigator.connection?.effectiveType
  });
}, []);
```

### Image Load Tracking
```tsx
// Track image loading performance
const handleImageLoad = (imageName) => {
  trackEvent('image_load', {
    image_name: imageName,
    load_time: performance.now(),
    page: 'homepage'
  });
};
```

## 7. User Journey Tracking

### Multi-Step Form Tracking
```tsx
// Track multi-step form progress
const trackFormStep = (step, formData) => {
  trackEvent('form_step_complete', {
    step_number: step,
    form_type: 'application_form',
    fields_completed: Object.keys(formData).length
  });
};
```

### Cross-Page Journey
```tsx
// Track user journey across pages
const trackPageTransition = (fromPage, toPage) => {
  trackEvent('page_transition', {
    from_page: fromPage,
    to_page: toPage,
    session_id: getSessionId()
  });
};
```

## 8. A/B Testing Integration

### Test Variant Tracking
```tsx
// Track A/B test variants
const trackTestVariant = (testName, variant) => {
  trackEvent('ab_test_view', {
    test_name: testName,
    variant: variant,
    page: 'homepage'
  });
};
```

### Conversion by Variant
```tsx
// Track conversions by test variant
const trackConversionByVariant = (testName, variant, conversionType) => {
  trackEvent('ab_test_conversion', {
    test_name: testName,
    variant: variant,
    conversion_type: conversionType,
    page: 'homepage'
  });
};
```

## 9. Real-Time Monitoring

### Add Status Component
```tsx
// Add to admin dashboard
import MetaConversionStatus from '@/components/MetaConversionStatus';

// In your admin dashboard
<MetaConversionStatus />
```

### Error Monitoring
```tsx
// Add error boundary for tracking
class TrackingErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    trackEvent('tracking_error', {
      error_message: error.message,
      error_stack: error.stack,
      component_stack: errorInfo.componentStack
    });
  }
}
```

## 10. Data Quality Assurance

### Event Validation
```tsx
// Validate events before sending
const validateEvent = (eventData) => {
  const requiredFields = ['eventType', 'data', 'source'];
  const missingFields = requiredFields.filter(field => !eventData[field]);
  
  if (missingFields.length > 0) {
    console.error('Missing required fields:', missingFields);
    return false;
  }
  
  return true;
};
```

### Duplicate Prevention
```tsx
// Prevent duplicate events
const eventCache = new Set();

const sendEvent = (eventData) => {
  const eventKey = `${eventData.eventType}_${eventData.data.email}_${Date.now()}`;
  
  if (eventCache.has(eventKey)) {
    console.warn('Duplicate event prevented:', eventKey);
    return;
  }
  
  eventCache.add(eventKey);
  // Send event...
};
```
