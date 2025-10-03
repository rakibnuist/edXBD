import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Content from '@/models/Content';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const contents = await Content.find()
      .sort({ updatedAt: -1 });

    return NextResponse.json(contents);
  } catch (error) {
    // Error fetching contents
    return NextResponse.json(
      { error: 'Failed to fetch contents' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    console.log('Creating content with data:', body);
    
    // Validate required fields
    if (!body.title || !body.slug || !body.content || !body.author) {
      console.error('Missing required fields:', { 
        title: !!body.title, 
        slug: !!body.slug, 
        content: !!body.content, 
        author: !!body.author 
      });
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, content, and author are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingContent = await Content.findOne({ slug: body.slug });
    if (existingContent) {
      console.error('Slug already exists:', body.slug);
      return NextResponse.json(
        { error: 'Slug already exists. Please choose a different slug.' },
        { status: 400 }
      );
    }

    const content = new Content(body);
    const savedContent = await content.save();
    console.log('Content created successfully:', savedContent._id);

    return NextResponse.json(savedContent, { status: 201 });
  } catch (error) {
    console.error('Error creating content:', error);
    return NextResponse.json(
      { error: 'Failed to create content', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
