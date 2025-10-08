'use client';

import { useEffect } from 'react';
import { 
  trackWhatsAppClick, 
  trackPhoneClick, 
  trackScholarshipInquiry,
  trackUniversityInterest,
  trackProgramInterest,
  trackDocumentDownload,
  trackEmailSubscription,
  trackPartnershipInquiry
} from '@/lib/analytics';

interface EducationTrackingProps {
  // WhatsApp tracking
  whatsappSource?: string;
  
  // Phone tracking
  phoneSource?: string;
  
  // Scholarship tracking
  scholarshipCountry?: string;
  scholarshipProgram?: string;
  
  // University tracking
  universityName?: string;
  universityCountry?: string;
  
  // Program tracking
  programName?: string;
  programCountry?: string;
  
  // Document tracking
  documentName?: string;
  documentType?: string;
  
  // Email subscription
  emailAddress?: string;
  
  // Partnership tracking
  companyName?: string;
}

export default function EducationTracking({
  whatsappSource,
  phoneSource,
  scholarshipCountry,
  scholarshipProgram,
  universityName,
  universityCountry,
  programName,
  programCountry,
  documentName,
  documentType,
  emailAddress,
  companyName
}: EducationTrackingProps) {
  
  // Track WhatsApp clicks
  useEffect(() => {
    if (whatsappSource) {
      const handleWhatsAppClick = () => {
        trackWhatsAppClick(whatsappSource);
        
        // Also track with Meta Conversion API
        fetch('/api/meta-conversion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventType: 'whatsapp_click',
            data: {
              userData: {}
            },
            source: whatsappSource
          }),
        }).catch(error => console.error('WhatsApp tracking error:', error));
      };

      // Add event listener for WhatsApp buttons
      const whatsappButtons = document.querySelectorAll('[data-whatsapp-tracking]');
      whatsappButtons.forEach(button => {
        button.addEventListener('click', handleWhatsAppClick);
      });

      return () => {
        whatsappButtons.forEach(button => {
          button.removeEventListener('click', handleWhatsAppClick);
        });
      };
    }
  }, [whatsappSource]);

  // Track phone clicks
  useEffect(() => {
    if (phoneSource) {
      const handlePhoneClick = () => {
        trackPhoneClick(phoneSource);
        
        // Also track with Meta Conversion API
        fetch('/api/meta-conversion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventType: 'phone_click',
            data: {
              userData: {}
            },
            source: phoneSource
          }),
        }).catch(error => console.error('Phone tracking error:', error));
      };

      // Add event listener for phone buttons
      const phoneButtons = document.querySelectorAll('[data-phone-tracking]');
      phoneButtons.forEach(button => {
        button.addEventListener('click', handlePhoneClick);
      });

      return () => {
        phoneButtons.forEach(button => {
          button.removeEventListener('click', handlePhoneClick);
        });
      };
    }
  }, [phoneSource]);

  // Track scholarship inquiries
  useEffect(() => {
    if (scholarshipCountry || scholarshipProgram) {
      const handleScholarshipInquiry = () => {
        trackScholarshipInquiry(scholarshipCountry, scholarshipProgram);
        
        // Also track with Meta Conversion API
        fetch('/api/meta-conversion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventType: 'scholarship_inquiry',
            data: {
              userData: {
                email: emailAddress || '',
                country: scholarshipCountry,
                program: scholarshipProgram
              }
            },
            source: 'scholarship_section'
          }),
        }).catch(error => console.error('Scholarship tracking error:', error));
      };

      // Add event listener for scholarship buttons
      const scholarshipButtons = document.querySelectorAll('[data-scholarship-tracking]');
      scholarshipButtons.forEach(button => {
        button.addEventListener('click', handleScholarshipInquiry);
      });

      return () => {
        scholarshipButtons.forEach(button => {
          button.removeEventListener('click', handleScholarshipInquiry);
        });
      };
    }
  }, [scholarshipCountry, scholarshipProgram, emailAddress]);

  // Track university interest
  useEffect(() => {
    if (universityName && universityCountry) {
      const handleUniversityInterest = () => {
        trackUniversityInterest(universityName, universityCountry);
        
        // Also track with Meta Conversion API
        fetch('/api/meta-conversion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventType: 'university_interest',
            data: {
              universityName,
              country: universityCountry,
              userData: {
                email: emailAddress || ''
              }
            },
            source: 'university_section'
          }),
        }).catch(error => console.error('University tracking error:', error));
      };

      // Add event listener for university buttons
      const universityButtons = document.querySelectorAll('[data-university-tracking]');
      universityButtons.forEach(button => {
        button.addEventListener('click', handleUniversityInterest);
      });

      return () => {
        universityButtons.forEach(button => {
          button.removeEventListener('click', handleUniversityInterest);
        });
      };
    }
  }, [universityName, universityCountry, emailAddress]);

  // Track program interest
  useEffect(() => {
    if (programName && programCountry) {
      const handleProgramInterest = () => {
        trackProgramInterest(programName, programCountry);
        
        // Also track with Meta Conversion API
        fetch('/api/meta-conversion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventType: 'program_interest',
            data: {
              programName,
              country: programCountry,
              userData: {
                email: emailAddress || ''
              }
            },
            source: 'program_section'
          }),
        }).catch(error => console.error('Program tracking error:', error));
      };

      // Add event listener for program buttons
      const programButtons = document.querySelectorAll('[data-program-tracking]');
      programButtons.forEach(button => {
        button.addEventListener('click', handleProgramInterest);
      });

      return () => {
        programButtons.forEach(button => {
          button.removeEventListener('click', handleProgramInterest);
        });
      };
    }
  }, [programName, programCountry, emailAddress]);

  // Track document downloads
  useEffect(() => {
    if (documentName && documentType) {
      const handleDocumentDownload = () => {
        trackDocumentDownload(documentName, documentType);
        
        // Also track with Meta Conversion API
        fetch('/api/meta-conversion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventType: 'document_download',
            data: {
              documentName,
              documentType,
              userData: {
                email: emailAddress || ''
              }
            },
            source: 'document_section'
          }),
        }).catch(error => console.error('Document tracking error:', error));
      };

      // Add event listener for document download buttons
      const documentButtons = document.querySelectorAll('[data-document-tracking]');
      documentButtons.forEach(button => {
        button.addEventListener('click', handleDocumentDownload);
      });

      return () => {
        documentButtons.forEach(button => {
          button.removeEventListener('click', handleDocumentDownload);
        });
      };
    }
  }, [documentName, documentType, emailAddress]);

  // Track email subscriptions
  useEffect(() => {
    if (emailAddress) {
      const handleEmailSubscription = () => {
        trackEmailSubscription(emailAddress);
        
        // Also track with Meta Conversion API
        fetch('/api/meta-conversion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventType: 'email_subscription',
            data: {
              userData: {
                email: emailAddress,
                firstName: '',
                lastName: ''
              }
            },
            source: 'newsletter_signup'
          }),
        }).catch(error => console.error('Email subscription tracking error:', error));
      };

      // Add event listener for email subscription forms
      const emailForms = document.querySelectorAll('[data-email-subscription-tracking]');
      emailForms.forEach(form => {
        form.addEventListener('submit', handleEmailSubscription);
      });

      return () => {
        emailForms.forEach(form => {
          form.removeEventListener('submit', handleEmailSubscription);
        });
      };
    }
  }, [emailAddress]);

  // Track partnership inquiries
  useEffect(() => {
    if (companyName) {
      const handlePartnershipInquiry = () => {
        trackPartnershipInquiry(companyName);
        
        // Also track with Meta Conversion API
        fetch('/api/meta-conversion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventType: 'partnership_inquiry',
            data: {
              userData: {
                name: '',
                email: emailAddress || '',
                company: companyName
              }
            },
            source: 'partnership_section'
          }),
        }).catch(error => console.error('Partnership tracking error:', error));
      };

      // Add event listener for partnership buttons
      const partnershipButtons = document.querySelectorAll('[data-partnership-tracking]');
      partnershipButtons.forEach(button => {
        button.addEventListener('click', handlePartnershipInquiry);
      });

      return () => {
        partnershipButtons.forEach(button => {
          button.removeEventListener('click', handlePartnershipInquiry);
        });
      };
    }
  }, [companyName, emailAddress]);

  return null; // This component doesn't render anything
}
