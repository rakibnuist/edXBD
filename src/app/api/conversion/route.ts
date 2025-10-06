import { NextRequest, NextResponse } from 'next/server';
import { sendConversionAPIEvent } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventName, userData, customData, eventId } = body;

    // Validate required fields
    if (!eventName || !userData) {
      return NextResponse.json(
        { error: 'Missing required fields: eventName and userData' },
        { status: 400 }
      );
    }

    // Send conversion event to Meta
    const result = await sendConversionAPIEvent(
      eventName,
      userData,
      customData,
      eventId
    );

    return NextResponse.json(
      { 
        success: true,
        result: result
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Conversion API error:', error);
    return NextResponse.json(
      { error: 'Failed to send conversion event' },
      { status: 500 }
    );
  }
}
