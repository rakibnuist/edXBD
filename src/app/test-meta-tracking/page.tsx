'use client';

import { useState } from 'react';
import { useMetaTracking } from '@/hooks/useMetaTracking';
import EnhancedContactForm from '@/components/EnhancedContactForm';

const TestMetaTrackingPage = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const {
    trackEvent,
    trackLeadEvent,
    trackContactEvent,
    trackWhatsAppEvent,
    trackPhoneEvent,
    trackDestinationEvent,
    trackScholarshipEvent,
    trackConsultationEvent,
    trackApplicationEvent,
    trackAdmissionEvent,
    trackVisaEvent,
    trackEnrollmentEvent,
    trackFormSubmission,
    trackButtonClick,
    trackPageView,
    trackContentView,
    setUser,
    clearUser
  } = useMetaTracking();

  const addTestResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testEvents = [
    {
      name: 'Track Lead Event',
      action: () => {
        trackLeadEvent({
          email: 'test@example.com',
          phone: '+8801234567890',
          firstName: 'Test',
          lastName: 'User',
          country: 'UK'
        }, 'test_page');
        addTestResult('Lead event tracked with Event Quality parameters');
      }
    },
    {
      name: 'Track Contact Event',
      action: () => {
        trackContactEvent('email', {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User'
        });
        addTestResult('Contact event tracked');
      }
    },
    {
      name: 'Track WhatsApp Click',
      action: () => {
        trackWhatsAppEvent('test_page', {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User'
        });
        addTestResult('WhatsApp click tracked');
      }
    },
    {
      name: 'Track Phone Click',
      action: () => {
        trackPhoneEvent('test_page', {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User'
        });
        addTestResult('Phone click tracked');
      }
    },
    {
      name: 'Track Destination View',
      action: () => {
        trackDestinationEvent('UK', {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User'
        });
        addTestResult('Destination view tracked');
      }
    },
    {
      name: 'Track Scholarship Inquiry',
      action: () => {
        trackScholarshipEvent({
          email: 'test@example.com',
          phone: '+8801234567890',
          firstName: 'Test',
          lastName: 'User',
          country: 'UK',
          program: 'Master'
        });
        addTestResult('Scholarship inquiry tracked');
      }
    },
    {
      name: 'Track Consultation Request',
      action: () => {
        trackConsultationEvent('test_page', {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User'
        });
        addTestResult('Consultation request tracked');
      }
    },
    {
      name: 'Track Application Submission',
      action: () => {
        trackApplicationEvent({
          email: 'test@example.com',
          phone: '+8801234567890',
          firstName: 'Test',
          lastName: 'User',
          country: 'UK'
        }, 'University of Oxford', 'Master in Computer Science');
        addTestResult('Application submission tracked');
      }
    },
    {
      name: 'Track Admission Received',
      action: () => {
        trackAdmissionEvent({
          email: 'test@example.com',
          phone: '+8801234567890',
          firstName: 'Test',
          lastName: 'User',
          country: 'UK'
        }, 'University of Oxford', 'Master in Computer Science');
        addTestResult('Admission received tracked');
      }
    },
    {
      name: 'Track Visa Approval',
      action: () => {
        trackVisaEvent({
          email: 'test@example.com',
          phone: '+8801234567890',
          firstName: 'Test',
          lastName: 'User',
          country: 'UK'
        }, 'University of Oxford', 'Master in Computer Science');
        addTestResult('Visa approval tracked');
      }
    },
    {
      name: 'Track Enrollment Completion',
      action: () => {
        trackEnrollmentEvent({
          email: 'test@example.com',
          phone: '+8801234567890',
          firstName: 'Test',
          lastName: 'User',
          country: 'UK'
        }, 'University of Oxford', 'Master in Computer Science');
        addTestResult('Enrollment completion tracked');
      }
    },
    {
      name: 'Track Custom Event',
      action: () => {
        trackEvent('CustomEvent', {
          content_name: 'Test Custom Event',
          content_category: 'Testing',
          value: 100,
          currency: 'BDT'
        }, {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User'
        });
        addTestResult('Custom event tracked');
      }
    },
    {
      name: 'Track Page View',
      action: () => {
        trackPageView('Test Meta Tracking Page', 'testing');
        addTestResult('Page view tracked');
      }
    },
    {
      name: 'Track Content View',
      action: () => {
        trackContentView('Test Content', 'testing', {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User'
        });
        addTestResult('Content view tracked');
      }
    },
    {
      name: 'Set User ID',
      action: () => {
        setUser('test_user_123', true);
        addTestResult('User ID set to: test_user_123');
      }
    },
    {
      name: 'Clear User ID',
      action: () => {
        clearUser();
        addTestResult('User ID cleared');
      }
    }
  ];

  const testFormSubmissions = [
    {
      name: 'Contact Form',
      action: () => {
        trackFormSubmission('contact', {
          name: 'Test User',
          email: 'test@example.com',
          phone: '+8801234567890',
          message: 'This is a test message'
        }, 'test_page');
        addTestResult('Contact form submission tracked');
      }
    },
    {
      name: 'Consultation Form',
      action: () => {
        trackFormSubmission('consultation', {
          name: 'Test User',
          email: 'test@example.com',
          phone: '+8801234567890',
          country: 'UK',
          program: 'Master'
        }, 'test_page');
        addTestResult('Consultation form submission tracked');
      }
    },
    {
      name: 'Application Form',
      action: () => {
        trackFormSubmission('application', {
          name: 'Test User',
          email: 'test@example.com',
          phone: '+8801234567890',
          country: 'UK',
          program: 'Master',
          university: 'University of Oxford'
        }, 'test_page');
        addTestResult('Application form submission tracked');
      }
    },
    {
      name: 'Scholarship Form',
      action: () => {
        trackFormSubmission('scholarship', {
          name: 'Test User',
          email: 'test@example.com',
          phone: '+8801234567890',
          country: 'UK',
          program: 'Master'
        }, 'test_page');
        addTestResult('Scholarship form submission tracked');
      }
    },
    {
      name: 'Partnership Form',
      action: () => {
        trackFormSubmission('partnership', {
          name: 'Test User',
          email: 'test@example.com',
          phone: '+8801234567890',
          company: 'Test Company',
          message: 'Partnership inquiry'
        }, 'test_page');
        addTestResult('Partnership form submission tracked');
      }
    }
  ];

  const testButtonClicks = [
    {
      name: 'WhatsApp Button',
      action: () => {
        trackButtonClick('whatsapp', 'test_page', {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User'
        });
        addTestResult('WhatsApp button click tracked');
      }
    },
    {
      name: 'Phone Button',
      action: () => {
        trackButtonClick('phone', 'test_page', {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User'
        });
        addTestResult('Phone button click tracked');
      }
    },
    {
      name: 'Email Button',
      action: () => {
        trackButtonClick('email', 'test_page', {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User'
        });
        addTestResult('Email button click tracked');
      }
    },
    {
      name: 'Consultation Button',
      action: () => {
        trackButtonClick('consultation', 'test_page', {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User'
        });
        addTestResult('Consultation button click tracked');
      }
    },
    {
      name: 'Application Button',
      action: () => {
        trackButtonClick('application', 'test_page', {
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User'
        });
        addTestResult('Application button click tracked');
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Meta Event Quality Tracking Test
          </h1>
          <p className="text-lg text-gray-600">
            Test the enhanced Meta tracking implementation with Event Quality parameters
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Controls */}
          <div className="space-y-6">
            {/* Event Tracking Tests */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Event Tracking Tests</h2>
              <div className="grid grid-cols-1 gap-2">
                {testEvents.map((test, index) => (
                  <button
                    key={index}
                    onClick={test.action}
                    className="text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                  >
                    {test.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Submission Tests */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Form Submission Tests</h2>
              <div className="grid grid-cols-1 gap-2">
                {testFormSubmissions.map((test, index) => (
                  <button
                    key={index}
                    onClick={test.action}
                    className="text-left px-4 py-2 bg-green-50 hover:bg-green-100 rounded-md transition-colors"
                  >
                    {test.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Button Click Tests */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Button Click Tests</h2>
              <div className="grid grid-cols-1 gap-2">
                {testButtonClicks.map((test, index) => (
                  <button
                    key={index}
                    onClick={test.action}
                    className="text-left px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors"
                  >
                    {test.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Results */}
            <button
              onClick={() => setTestResults([])}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Clear Test Results
            </button>
          </div>

          {/* Test Results */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Test Results</h2>
              <div className="bg-gray-100 rounded-md p-4 h-96 overflow-y-auto">
                {testResults.length === 0 ? (
                  <p className="text-gray-500">No test results yet. Click the test buttons to see results.</p>
                ) : (
                  <div className="space-y-2">
                    {testResults.map((result, index) => (
                      <div key={index} className="text-sm text-gray-700 bg-white p-2 rounded border">
                        {result}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Enhanced Contact Form</h2>
              <EnhancedContactForm
                formType="consultation"
                source="test_page"
                title="Test Enhanced Form"
                description="This form uses enhanced Meta tracking with Event Quality parameters"
                showCountry={true}
                showProgram={true}
                showMessage={true}
                showLocation={false}
              />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">How to Test</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Open your browser's Developer Tools (F12)</li>
            <li>Go to the Console tab</li>
            <li>Click the test buttons above to trigger events</li>
            <li>Check the console for Meta Pixel tracking logs</li>
            <li>Check the Network tab for API calls to /api/meta-conversion</li>
            <li>Verify that Event Quality parameters (fbc, fbp, external_id) are being sent</li>
            <li>Check your Meta Events Manager to see the events being received</li>
          </ol>
        </div>

        {/* Event Quality Parameters Info */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Event Quality Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-800">
            <div>
              <h4 className="font-semibold">fbc (Facebook Click ID)</h4>
              <p className="text-sm">Automatically extracted from URL parameter 'fbclid' when users click Facebook ads</p>
            </div>
            <div>
              <h4 className="font-semibold">fbp (Facebook Browser ID)</h4>
              <p className="text-sm">Automatically extracted from '_fbp' cookie set by Meta Pixel</p>
            </div>
            <div>
              <h4 className="font-semibold">external_id</h4>
              <p className="text-sm">Your internal user ID, automatically generated for anonymous users</p>
            </div>
            <div>
              <h4 className="font-semibold">fb_login_id</h4>
              <p className="text-sm">Facebook Login ID for users logged into Facebook (requires Facebook Login SDK)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestMetaTrackingPage;
