import { NextRequest, NextResponse } from 'next/server';
import { verifyTokenFromRequest } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';
import Testimonial from '@/models/Testimonial';
import Country from '@/models/Country';
import Partnership from '@/models/Partnership';

export async function GET(request: NextRequest) {
  try {
    const decoded = verifyTokenFromRequest(request);
    
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized - Admin access required' }, { status: 403 });
    }

    await connectDB();

    // Get dashboard statistics
    const [
      totalLeads,
      newLeads,
      totalTestimonials,
      totalCountries,
      totalPartnerships,
      newPartnerships,
      recentLeads,
      recentPartnerships
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'new' }),
      Testimonial.countDocuments({ isActive: true }),
      Country.countDocuments({ isActive: true }),
      Partnership.countDocuments(),
      Partnership.countDocuments({ status: 'pending' }),
      Lead.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email country program status createdAt'),
      Partnership.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('companyName contactPerson email country partnershipType status createdAt')
    ]);

    return NextResponse.json({
      totalLeads,
      newLeads,
      totalTestimonials,
      totalCountries,
      totalPartnerships,
      newPartnerships,
      recentLeads,
      recentPartnerships
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    
    // More detailed error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isConnectionError = errorMessage.includes('connect') || errorMessage.includes('ECONNREFUSED');
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch dashboard data',
        details: errorMessage,
        type: isConnectionError ? 'connection_error' : 'database_error'
      },
      { status: 500 }
    );
  }
}
