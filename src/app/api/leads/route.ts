import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';

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
