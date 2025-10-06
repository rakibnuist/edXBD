import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { trackStudyAbroadLead } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    
    // Create new lead
    const lead = new Lead({
      ...body,
      source: body.source || 'website',
      status: 'new'
    });
    
    await lead.save();

    // Track lead with Meta Conversion API
    try {
      await trackStudyAbroadLead({
        name: body.name || 'Unknown',
        email: body.email || '',
        phone: body.phone || '',
        country: body.country || 'Not specified',
        program: body.program || 'Not specified',
        message: body.message || ''
      }, body.source || 'website');
    } catch (trackingError) {
      console.error('Meta Conversion API tracking error:', trackingError);
      // Don't fail the request if tracking fails
    }

    // Return success response
    return NextResponse.json(
      { 
        message: 'Lead submitted successfully',
        leadId: lead._id 
      },
      { status: 201 }
    );
  } catch (error) {
    // Error creating lead
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}
