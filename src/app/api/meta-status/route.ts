import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check Meta Pixel ID
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || null;
    
    // Check Meta Access Token
    const accessToken = process.env.META_ACCESS_TOKEN || null;
    
    // Determine if Meta services are active
    const pixelActive = !!pixelId;
    const conversionApiActive = !!accessToken;
    
    return NextResponse.json({
      pixelId,
      accessToken: accessToken ? `${accessToken.substring(0, 10)}...` : null, // Show partial token for security
      pixelActive,
      conversionApiActive,
      eventsTracked: 0, // This would need to be fetched from Meta API in a real implementation
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error checking Meta status:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check Meta status',
        pixelId: null,
        accessToken: null,
        pixelActive: false,
        conversionApiActive: false,
        eventsTracked: 0
      },
      { status: 500 }
    );
  }
}
