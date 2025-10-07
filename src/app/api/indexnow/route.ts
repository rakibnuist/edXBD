import { NextRequest, NextResponse } from 'next/server'
import { submitToIndexNow, submitAllImportantPages, submitNewContent } from '@/lib/indexnow'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { urls, action = 'submit' } = body

    let result

    switch (action) {
      case 'submit-all':
        result = await submitAllImportantPages()
        break
      case 'submit-new':
        if (!urls || !Array.isArray(urls)) {
          return NextResponse.json(
            { error: 'URLs array is required for submit-new action' },
            { status: 400 }
          )
        }
        result = await submitNewContent(urls)
        break
      case 'submit':
      default:
        if (!urls || !Array.isArray(urls)) {
          return NextResponse.json(
            { error: 'URLs array is required' },
            { status: 400 }
          )
        }
        result = await submitToIndexNow(urls)
        break
    }

    return NextResponse.json(result, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    })

  } catch (error) {
    console.error('IndexNow API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'IndexNow API endpoint',
    usage: {
      'POST /api/indexnow': 'Submit URLs to IndexNow',
      body: {
        action: 'submit | submit-all | submit-new',
        urls: ['array of URLs (required for submit and submit-new)']
      }
    },
    examples: {
      'Submit specific URLs': {
        action: 'submit',
        urls: ['/new-page', '/updated-content']
      },
      'Submit all important pages': {
        action: 'submit-all'
      },
      'Submit new content': {
        action: 'submit-new',
        urls: ['/new-blog-post', '/new-service']
      }
    }
  })
}
