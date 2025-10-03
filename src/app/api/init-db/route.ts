import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/init-db';

export async function POST() {
  try {
    const success = await initializeDatabase();
    
    if (success) {
      return NextResponse.json({ 
        message: 'Database initialized successfully',
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json(
        { error: 'Database initialization failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    // Database initialization error
    return NextResponse.json(
      { 
        error: 'Database initialization failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
