'use client';

import { useEffect, useState } from 'react';
import { Lead } from '@/lib/types';

export default function UserLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, sourceFilter, countryFilter]);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
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
      const response = await fetch(url);
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
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
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
      } else {
        showMessage('error', 'Failed to update lead status');
      }
    } catch (error) {
      showMessage('error', 'Network error while updating lead status');
    }
  };

  const handleCall = (phoneNumber: string) => {
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`, '_self');
    }
  };

  const handleWhatsApp = (phoneNumber: string, leadName: string) => {
    if (phoneNumber) {
      // Remove any non-numeric characters and ensure it starts with country code
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      const whatsappPhone = cleanPhone.startsWith('880') ? cleanPhone : `880${cleanPhone}`;
      
      // Create a personalized message
      const message = encodeURIComponent(`Hi ${leadName}! This is EduExpress International. I'm reaching out regarding your study abroad inquiry. How can I help you today?`);
      
      // Open WhatsApp with the message
      window.open(`https://wa.me/${whatsappPhone}?text=${message}`, '_blank');
    }
  };

  const deleteLead = async (leadId: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      try {
        const response = await fetch(`/api/admin/leads/${leadId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          showMessage('success', 'Lead deleted successfully!');
          fetchLeads();
          setSelectedLead(null);
        } else {
          showMessage('error', 'Failed to delete lead');
        }
      } catch (error) {
        showMessage('error', 'Network error while deleting lead');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'qualified':
        return 'bg-green-100 text-green-800';
      case 'converted':
        return 'bg-purple-100 text-purple-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-0">Leads Management</h1>
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
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
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
              <option value="website">Website</option>
              <option value="social_media">Social Media</option>
              <option value="referral">Referral</option>
              <option value="advertisement">Advertisement</option>
              <option value="other">Other</option>
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
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leads List */}
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
                          <button
                            onClick={() => handleCall(lead.phone)}
                            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                            title="Click to call"
                          >
                            📞 {lead.phone}
                          </button>
                          <button
                            onClick={() => handleWhatsApp(lead.phone, lead.name)}
                            className="inline-flex items-center px-1.5 py-0.5 text-xs font-medium text-white bg-green-500 hover:bg-green-600 rounded shadow-sm transition-colors duration-200 hover:shadow-md"
                            title="Send WhatsApp message"
                          >
                            <svg className="w-2.5 h-2.5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                            </svg>
                            WA
                          </button>
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
                      <option value="qualified">Qualified</option>
                      <option value="converted">Converted</option>
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
                          <button
                            onClick={() => handleCall(selectedLead.phone)}
                            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                            title="Click to call"
                          >
                            📞 {selectedLead.phone}
                          </button>
                          <button
                            onClick={() => handleWhatsApp(selectedLead.phone, selectedLead.name)}
                            className="inline-flex items-center px-3 py-1.5 text-xs sm:text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105"
                            title="Send WhatsApp message"
                          >
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                            </svg>
                            WhatsApp
                          </button>
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
                    {['new', 'contacted', 'qualified', 'converted', 'closed'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateLeadStatus(selectedLead._id, status)}
                        className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full ${
                          selectedLead.status === status
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
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
