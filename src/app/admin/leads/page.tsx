'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { trackDashboardView, trackLeadManagement, sendConversionAPIEvent } from '@/lib/analytics';
import { trackLeadStatusChange } from '@/lib/meta-conversion-api';
import { Lead } from '@/lib/types';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function LeadsPage() {
  const { getAuthHeaders } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    trackDashboardView('leads_management');
    fetchLeads();
  }, [statusFilter, sourceFilter, countryFilter]);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      
      // First, get a fresh token by logging in
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'admin@eduexpressint.com',
          password: 'admin123'
        })
      });

      if (!loginResponse.ok) {
        throw new Error(`Login failed with status: ${loginResponse.status}`);
      }

      const loginData = await loginResponse.json();
      const token = loginData.token;

      if (!token) {
        throw new Error('No token received from login');
      }

      // Now fetch leads with the fresh token
      const params = new URLSearchParams();
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      if (sourceFilter !== 'all') {
        params.append('source', sourceFilter);
      }
      if (countryFilter !== 'all') {
        params.append('country', countryFilter);
      }
      
      const url = `/api/admin/leads${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
        
        // Extract unique countries for filter dropdown
        const countries = [...new Set(data.map((lead: Lead) => lead.country))].sort() as string[];
        setAvailableCountries(countries);
      } else {
        setLeads([]);
        showMessage('error', 'Failed to fetch leads');
      }
    } catch (error) {
      setLeads([]);
      showMessage('error', 'Network error while fetching leads');
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      // Get fresh token
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'admin@eduexpressint.com',
          password: 'admin123'
        })
      });

      if (!loginResponse.ok) {
        throw new Error(`Login failed with status: ${loginResponse.status}`);
      }

      const loginData = await loginResponse.json();
      const token = loginData.token;

      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        trackLeadManagement('status_update', { 
          lead_id: leadId, 
          new_status: newStatus,
          success: true 
        });

        // Track status change with enhanced Meta Conversion API
        const lead = leads.find(l => l._id === leadId);
        if (lead) {
          try {
            await trackLeadStatusChange({
              name: lead.name,
              email: lead.email,
              phone: lead.phone,
              country: lead.country,
              program: lead.program,
              previousStatus: lead.status,
              newStatus: newStatus
            });
          } catch (conversionError) {
            console.error('Meta Conversion API error for status update:', conversionError);
          }
        }

        // Update local state immediately for better UX
        setLeads(prevLeads => 
          prevLeads.map(lead => 
            lead._id === leadId 
              ? { ...lead, status: newStatus as any, updatedAt: new Date().toISOString() }
              : lead
          )
        );
        
        // Update selected lead if it's the one being edited
        if (selectedLead && selectedLead._id === leadId) {
          setSelectedLead(prev => prev ? { ...prev, status: newStatus as any, updatedAt: new Date().toISOString() } : null);
        }
        
        showMessage('success', 'Lead status updated successfully!');
        setSelectedLead(null);
      } else {
        trackLeadManagement('status_update', { 
          lead_id: leadId, 
          new_status: newStatus,
          success: false,
          error: 'api_error'
        });
        showMessage('error', 'Failed to update lead status');
      }
    } catch (error) {
      trackLeadManagement('status_update', { 
        lead_id: leadId, 
        new_status: newStatus,
        success: false,
        error: 'network_error'
      });
      showMessage('error', 'Network error while updating lead status');
    }
  };

  const handleWhatsAppTracking = async (data: any) => {
    trackLeadManagement('whatsapp_contact', { 
      leadName: data.leadName, 
      phoneNumber: data.phoneNumber,
      country: data.country,
      program: data.program,
      status: data.status
    });

    // Track WhatsApp contact with Meta Conversion API
    try {
      const [firstName, ...lastNameParts] = data.leadName.split(' ');
      const lastName = lastNameParts.join(' ') || '';
      
      await sendConversionAPIEvent(
        'Contact',
        {
          phone: data.phoneNumber,
          firstName: firstName,
          lastName: lastName
        },
        {
          content_name: 'WhatsApp Contact',
          content_category: 'Lead Communication',
          contact_method: 'whatsapp',
          lead_status: data.status,
          study_destination: data.country,
          program_interest: data.program
        }
      );
    } catch (conversionError) {
      console.error('Meta Conversion API error for WhatsApp contact:', conversionError);
    }
  };

  const deleteLead = async (leadId: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      try {
        // Get fresh token
        const loginResponse = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: 'admin@eduexpressint.com',
            password: 'admin123'
          })
        });

        if (!loginResponse.ok) {
          throw new Error(`Login failed with status: ${loginResponse.status}`);
        }

        const loginData = await loginResponse.json();
        const token = loginData.token;

        const response = await fetch(`/api/admin/leads/${leadId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
          trackLeadManagement('lead_delete', { 
            lead_id: leadId, 
            success: true 
          });
          showMessage('success', 'Lead deleted successfully!');
          fetchLeads();
          setSelectedLead(null);
        } else {
          trackLeadManagement('lead_delete', { 
            lead_id: leadId, 
            success: false,
            error: 'api_error'
          });
          showMessage('error', 'Failed to delete lead');
        }
      } catch (error) {
        trackLeadManagement('lead_delete', { 
          lead_id: leadId, 
          success: false,
          error: 'network_error'
        });
        showMessage('error', 'Network error while deleting lead');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'consultation_scheduled': return 'bg-indigo-100 text-indigo-800';
      case 'consultation_completed': return 'bg-purple-100 text-purple-800';
      case 'qualified': return 'bg-yellow-100 text-yellow-800';
      case 'application_started': return 'bg-orange-100 text-orange-800';
      case 'application_submitted': return 'bg-amber-100 text-amber-800';
      case 'admission_received': return 'bg-emerald-100 text-emerald-800';
      case 'visa_applied': return 'bg-teal-100 text-teal-800';
      case 'visa_approved': return 'bg-cyan-100 text-cyan-800';
      case 'enrolled': return 'bg-green-100 text-green-800';
      case 'converted': return 'bg-purple-100 text-purple-800';
      case 'not_interested': return 'bg-red-100 text-red-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading leads...</div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Message Display */}
      {message && (
        <div className={`mb-4 p-3 sm:p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base">{message.text}</span>
            <button
              onClick={() => setMessage(null)}
              className="ml-4 text-lg font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-0">Lead Management</h1>
        <div className="text-sm text-gray-500">
          Total Leads: {leads.length}
        </div>
      </div>
      {/* Filters */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full border border-gray-300 rounded-md px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="consultation_scheduled">Consultation Scheduled</option>
              <option value="consultation_completed">Consultation Completed</option>
              <option value="qualified">Qualified</option>
              <option value="application_started">Application Started</option>
              <option value="application_submitted">Application Submitted</option>
              <option value="admission_received">Admission Received</option>
              <option value="visa_applied">Visa Applied</option>
              <option value="visa_approved">Visa Approved</option>
              <option value="enrolled">Enrolled</option>
              <option value="converted">Converted</option>
              <option value="not_interested">Not Interested</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Source</label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="block w-full border border-gray-300 rounded-md px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Sources</option>
              <option value="contact_form">Contact Form</option>
              <option value="website">Website</option>
              <option value="quick_form">Quick Form</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Country</label>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="block w-full border border-gray-300 rounded-md px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Countries</option>
              {availableCountries.map((country) => (
                <option key={country} value={country}>
                  {country.charAt(0).toUpperCase() + country.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-3 sm:mt-4">
          <button
            onClick={() => {
              setStatusFilter('all');
              setSourceFilter('all');
              setCountryFilter('all');
            }}
            className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-xs sm:text-sm"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-gray-900">{lead.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate">{lead.email}</div>
                      {lead.phone && (
                        <div className="flex items-center space-x-2">
                          <a 
                            href={`tel:${lead.phone}`}
                            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                            title="Click to call"
                          >
                            📞 {lead.phone}
                          </a>
                          <WhatsAppButton
                            phoneNumber={lead.phone}
                            leadName={lead.name}
                            leadCountry={lead.country}
                            leadProgram={lead.program}
                            leadStatus={lead.status}
                            size="small"
                            showText={true}
                            onTrack={handleWhatsAppTracking}
                          />
                        </div>
                      )}
                      {/* Mobile: Show country and source below contact info */}
                      <div className="sm:hidden mt-1">
                        <span className="text-xs text-gray-400">{lead.country}</span>
                        <span className="text-xs text-gray-400 mx-1">•</span>
                        <span className="text-xs text-gray-400">{lead.source}</span>
                      </div>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.country}
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.source}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                      className={`text-xs border border-gray-300 rounded px-1 sm:px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 ${getStatusColor(lead.status)}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="consultation_scheduled">Consultation Scheduled</option>
                      <option value="consultation_completed">Consultation Completed</option>
                      <option value="qualified">Qualified</option>
                      <option value="application_started">Application Started</option>
                      <option value="application_submitted">Application Submitted</option>
                      <option value="admission_received">Admission Received</option>
                      <option value="visa_applied">Visa Applied</option>
                      <option value="visa_approved">Visa Approved</option>
                      <option value="enrolled">Enrolled</option>
                      <option value="converted">Converted</option>
                      <option value="not_interested">Not Interested</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="text-blue-600 hover:text-blue-900 text-xs sm:text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => deleteLead(lead._id)}
                        className="text-red-600 hover:text-red-900 text-xs sm:text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-4 sm:top-20 mx-auto p-3 sm:p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">Lead Details</h3>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-xs sm:text-sm text-gray-900">{selectedLead.name}</p>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-xs sm:text-sm text-gray-900">{selectedLead.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700">Phone</label>
                    <div className="mt-1">
                      {selectedLead.phone ? (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <a 
                            href={`tel:${selectedLead.phone}`}
                            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                            title="Click to call"
                          >
                            📞 {selectedLead.phone}
                          </a>
                          <WhatsAppButton
                            phoneNumber={selectedLead.phone}
                            leadName={selectedLead.name}
                            leadCountry={selectedLead.country}
                            leadProgram={selectedLead.program}
                            leadStatus={selectedLead.status}
                            size="medium"
                            variant="default"
                            showText={true}
                            onTrack={handleWhatsAppTracking}
                            className="w-full sm:w-auto"
                          />
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm text-gray-500">Not provided</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700">Country</label>
                    <p className="mt-1 text-xs sm:text-sm text-gray-900">{selectedLead.country}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700">Source</label>
                    <p className="mt-1 text-xs sm:text-sm text-gray-900">{selectedLead.source}</p>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedLead.status)}`}>
                      {selectedLead.status}
                    </span>
                  </div>
                </div>

                {selectedLead.message && (
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700">Message</label>
                    <p className="mt-1 text-xs sm:text-sm text-gray-900">{selectedLead.message}</p>
                  </div>
                )}

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Created</label>
                  <p className="mt-1 text-xs sm:text-sm text-gray-900">{new Date(selectedLead.createdAt).toLocaleString()}</p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Update Status</label>
                  <div className="flex flex-wrap gap-2">
                    {['new', 'contacted', 'consultation_scheduled', 'consultation_completed', 'qualified', 'application_started', 'application_submitted', 'admission_received', 'visa_applied', 'visa_approved', 'enrolled', 'converted', 'not_interested', 'closed'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateLeadStatus(selectedLead._id, status)}
                        className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full ${
                          selectedLead.status === status
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

