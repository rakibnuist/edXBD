import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const source = searchParams.get('source');
    const country = searchParams.get('country');

    let query = {};
    if (status && status !== 'all') {
      query = { ...query, status };
    }
    if (source && source !== 'all') {
      query = { ...query, source };
    }
    if (country && country !== 'all') {
      query = { ...query, country };
    }

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .limit(100);

    return NextResponse.json(leads);
  } catch (error) {
    // Error fetching leads
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const lead = new Lead(body);
    await lead.save();

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    // Error creating lead
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
