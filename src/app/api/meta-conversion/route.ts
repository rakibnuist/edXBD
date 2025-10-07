import { NextRequest, NextResponse } from 'next/server';
import { 
  trackStudyAbroadLead, 
  trackConsultationRequest, 
  trackPageView, 
  trackViewContent,
  trackCompleteRegistration,
  trackContact,
  testConversionAPI
} from '@/lib/meta-conversion-api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, data, source } = body;

    let result;

    switch (eventType) {
      case 'study_abroad_lead':
        result = await trackStudyAbroadLead(data, source, request);
        break;
      
      case 'consultation_request':
        result = await trackConsultationRequest(source, data, request);
        break;
      
      case 'page_view':
        result = await trackPageView(data.pageName, data.pageCategory, request);
        break;
      
      case 'view_content':
        result = await trackViewContent(data.contentName, data.contentCategory, data.userData, request);
        break;
      
      case 'complete_registration':
        result = await trackCompleteRegistration(data.formType, data.userData, request);
        break;
      
      case 'contact':
        result = await trackContact(data.contactMethod, data.userData, request);
        break;
      
      case 'test':
        result = await testConversionAPI(request);
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid event type' },
          { status: 400 }
        );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Meta Conversion API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Meta Conversion API endpoint is active',
    supportedEvents: [
      'study_abroad_lead',
      'consultation_request',
      'page_view',
      'view_content',
      'complete_registration',
      'contact',
      'test'
    ]
  });
}
