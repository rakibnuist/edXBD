import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Country from '@/models/Country';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const countries = await Country.find()
      .sort({ name: 1 });

    return NextResponse.json(countries);
  } catch (error) {
    // Error fetching countries
    return NextResponse.json(
      { error: 'Failed to fetch countries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const country = new Country(body);
    await country.save();

    return NextResponse.json(country, { status: 201 });
  } catch (error) {
    // Error creating country
    return NextResponse.json(
      { error: 'Failed to create country' },
      { status: 500 }
    );
  }
}
