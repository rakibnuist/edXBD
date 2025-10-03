import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 });

    return NextResponse.json(testimonials);
  } catch (error) {
    // Error fetching testimonials
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const testimonial = new Testimonial(body);
    await testimonial.save();

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    // Error creating testimonial
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
