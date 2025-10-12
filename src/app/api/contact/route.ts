import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { trackStudyAbroadLead } from '@/lib/meta-conversion-api';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    
    // Handle both name formats (single name field or firstName/lastName)
    let fullName: string;
    let firstName: string;
    let lastName: string;
    
    if (body.name) {
      // Single name field format
      fullName = body.name.trim();
      const nameParts = fullName.split(' ');
      firstName = nameParts[0] || '';
      lastName = nameParts.slice(1).join(' ') || '';
    } else if (body.firstName && body.lastName) {
      // Separate firstName/lastName format
      firstName = body.firstName.trim();
      lastName = body.lastName.trim();
      fullName = `${firstName} ${lastName}`;
    } else {
      return NextResponse.json(
        { error: 'Missing required fields: name (or firstName and lastName), email, and phone are required' },
        { status: 400 }
      );
    }

    // Validate required fields
    const { email, phone, message } = body;
    
    if (!email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: email and phone are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Create new lead from contact form
    const lead = new Lead({
      name: fullName,
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      country: body.country || 'Not specified',
      program: body.program || 'Contact Form Inquiry',
      message: message ? message.trim() : 'Consultation request from ' + (body.country || 'Unknown'),
      source: body.source || 'contact_form',
      status: 'new'
    });
    
    await lead.save();

    // Track lead with Meta Conversion API (non-blocking)
    try {
      // Run tracking in background without awaiting
      trackStudyAbroadLead({
        name: fullName,
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        country: body.country || 'Not specified',
        program: body.program || 'Contact Form Inquiry',
        message: message ? message.trim() : 'Consultation request from ' + (body.country || 'Unknown')
      }, body.source || 'contact_form', request).catch(trackingError => {
        console.error('Meta Conversion API tracking error (non-blocking):', trackingError);
      });
    } catch (trackingError) {
      console.error('Meta Conversion API tracking error:', trackingError);
      // Don't fail the request if tracking fails
    }

    // Return success response
    return NextResponse.json(
      { 
        message: 'Message sent successfully',
        leadId: lead._id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
