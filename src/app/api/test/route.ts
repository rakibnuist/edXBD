import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    return NextResponse.json({ 
      status: 'connected',
      message: 'Database connection successful',
      timestamp: new Date().toISOString(),
      mongodb_uri: process.env.MONGODB_URI ? 'configured' : 'not_configured',
      metaConversionAPI: !!process.env.META_ACCESS_TOKEN,
      metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || 'not_configured',
      gtmId: process.env.NEXT_PUBLIC_GTM_ID || 'not_configured'
    });
  } catch (error) {
    console.error('Database connection error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isConnectionError = errorMessage.includes('connect') || errorMessage.includes('ECONNREFUSED');
    
    return NextResponse.json(
      { 
        status: 'disconnected',
        message: 'Database connection failed',
        error: errorMessage,
        type: isConnectionError ? 'connection_error' : 'database_error',
        mongodb_uri: process.env.MONGODB_URI ? 'configured' : 'not_configured',
        metaConversionAPI: !!process.env.META_ACCESS_TOKEN,
        metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || 'not_configured',
        gtmId: process.env.NEXT_PUBLIC_GTM_ID || 'not_configured',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
