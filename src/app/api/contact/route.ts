import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    
    // Validate required fields
    const { firstName, lastName, email, phone, message } = body;
    
    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
