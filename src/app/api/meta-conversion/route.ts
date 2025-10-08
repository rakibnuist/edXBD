import { NextRequest, NextResponse } from 'next/server';
import { 
  trackStudyAbroadLead, 
  trackConsultationRequest, 
  trackPageView, 
  trackViewContent,
  trackCompleteRegistration,
  trackContact,
  trackLeadStatusChange,
  trackConsultationBooking,
  trackApplicationSubmission,
  trackAdmissionReceived,
  trackVisaApproval,
  trackEnrollmentCompletion,
  trackWhatsAppClick,
  trackPhoneClick,
  trackDestinationView,
  trackScholarshipInquiry,
  trackUniversityInterest,
  trackProgramInterest,
  trackDocumentDownload,
  trackEmailSubscription,
  trackPartnershipInquiry,
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
      
      case 'lead_status_change':
        result = await trackLeadStatusChange(data.leadData, request);
        break;
      
      case 'consultation_booking':
        result = await trackConsultationBooking(data.leadData, request);
        break;
      
      case 'application_submission':
        result = await trackApplicationSubmission(data.leadData, request);
        break;
      
      case 'admission_received':
        result = await trackAdmissionReceived(data.leadData, request);
        break;
      
      case 'visa_approval':
        result = await trackVisaApproval(data.leadData, request);
        break;
      
      case 'enrollment_completion':
        result = await trackEnrollmentCompletion(data.leadData, request);
        break;
      
      case 'whatsapp_click':
        result = await trackWhatsAppClick(source, data.userData, request);
        break;
      
      case 'phone_click':
        result = await trackPhoneClick(source, data.userData, request);
        break;
      
      case 'destination_view':
        result = await trackDestinationView(data.countryName, data.userData, request);
        break;
      
      case 'scholarship_inquiry':
        result = await trackScholarshipInquiry(data.userData, request);
        break;
      
      case 'university_interest':
        result = await trackUniversityInterest(data.universityName, data.country, data.userData, request);
        break;
      
      case 'program_interest':
        result = await trackProgramInterest(data.programName, data.country, data.userData, request);
        break;
      
      case 'document_download':
        result = await trackDocumentDownload(data.documentName, data.documentType, data.userData, request);
        break;
      
      case 'email_subscription':
        result = await trackEmailSubscription(data.userData, request);
        break;
      
      case 'partnership_inquiry':
        result = await trackPartnershipInquiry(data.userData, request);
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
      'lead_status_change',
      'consultation_booking',
      'application_submission',
      'admission_received',
      'visa_approval',
      'enrollment_completion',
      'whatsapp_click',
      'phone_click',
      'destination_view',
      'scholarship_inquiry',
      'university_interest',
      'program_interest',
      'document_download',
      'email_subscription',
      'partnership_inquiry',
      'test'
    ]
  });
}
