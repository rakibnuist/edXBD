import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { trackStudyAbroadLead } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    
    // Validate required fields
    const { firstName, lastName, email, phone, message } = body;
    
    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, email, phone, and message are required' },
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

    // Create full name from first and last name
    const fullName = `${firstName} ${lastName}`;
    
    // Create new lead from contact form
    const lead = new Lead({
      name: fullName,
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      country: body.country || 'Not specified',
      program: 'Contact Form Inquiry',
      message: message.trim(),
      source: 'contact_form',
      status: 'new'
    });
    
    await lead.save();

    // Track lead with Meta Conversion API
    try {
      await trackStudyAbroadLead({
        name: fullName,
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        country: body.country || 'Not specified',
        program: 'Contact Form Inquiry',
        message: message.trim()
      }, 'contact_form');
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
