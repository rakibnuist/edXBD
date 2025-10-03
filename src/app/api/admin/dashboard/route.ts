import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';
import Testimonial from '@/models/Testimonial';
import Country from '@/models/Country';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get dashboard statistics
    const [
      totalLeads,
      newLeads,
      totalTestimonials,
      totalCountries,
      recentLeads
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'new' }),
      Testimonial.countDocuments({ isActive: true }),
      Country.countDocuments({ isActive: true }),
      Lead.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email country program status createdAt')
    ]);

    return NextResponse.json({
      totalLeads,
      newLeads,
      totalTestimonials,
      totalCountries,
      recentLeads
    });
  } catch (error) {
    // Error fetching dashboard data
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
