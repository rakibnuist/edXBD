'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  country: string;
  program: string;
  message?: string;
  status: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export default function LeadsPageNew() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      fetchLeads();
    }
  }, [isAuthenticated, authLoading]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get token from localStorage (set by AuthContext)
      const token = localStorage.getItem('admin_token');
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      // Fetch leads with the existing token
      const response = await fetch('/api/admin/leads', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Leads fetched:', data);
        setLeads(data);
      } else if (response.status === 401 || response.status === 403) {
        // Token expired or invalid, try to refresh by logging in again
        console.log('Token expired, refreshing...');
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

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          localStorage.setItem('admin_token', loginData.token);
          
          // Retry with new token
          const retryResponse = await fetch('/api/admin/leads', {
            headers: {
              'Authorization': `Bearer ${loginData.token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (retryResponse.ok) {
            const data = await retryResponse.json();
            console.log('Leads fetched with refreshed token:', data);
            setLeads(data);
          } else {
            throw new Error(`HTTP error after token refresh! status: ${retryResponse.status}`);
          }
        } else {
          throw new Error(`Token refresh failed with status: ${loginResponse.status}`);
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('admin_token');
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update local state
        setLeads(prevLeads => 
          prevLeads.map(lead => 
            lead._id === leadId 
              ? { ...lead, status: newStatus, updatedAt: new Date().toISOString() }
              : lead
          )
        );
        
        if (selectedLead && selectedLead._id === leadId) {
          setSelectedLead(prev => prev ? { ...prev, status: newStatus, updatedAt: new Date().toISOString() } : null);
        }
        
        setError(null);
      } else if (response.status === 401 || response.status === 403) {
        // Token expired, try to refresh
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

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          localStorage.setItem('admin_token', loginData.token);
          
          // Retry with new token
          const retryResponse = await fetch(`/api/admin/leads/${leadId}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${loginData.token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus }),
          });
          
          if (retryResponse.ok) {
            // Update local state
            setLeads(prevLeads => 
              prevLeads.map(lead => 
                lead._id === leadId 
                  ? { ...lead, status: newStatus, updatedAt: new Date().toISOString() }
                  : lead
              )
            );
            
            if (selectedLead && selectedLead._id === leadId) {
              setSelectedLead(prev => prev ? { ...prev, status: newStatus, updatedAt: new Date().toISOString() } : null);
            }
            
            setError(null);
          } else {
            throw new Error(`Failed to update lead status after token refresh: ${retryResponse.status}`);
          }
        } else {
          throw new Error(`Token refresh failed: ${loginResponse.status}`);
        }
      } else {
        throw new Error(`Failed to update lead status: ${response.status}`);
      }
    } catch (err) {
      console.error('Error updating lead status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update lead status');
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

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Checking authentication...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-lg text-gray-600">Authentication required</div>
          <div className="text-sm text-gray-500 mt-2">Please login to access the leads page</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Loading leads...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-lg text-red-600">Error loading leads</div>
          <div className="text-sm text-gray-500 mt-2">{error}</div>
          <button 
            onClick={fetchLeads}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
        <div className="text-sm text-gray-500">
          Total Leads: {leads.length}
        </div>
      </div>

      {/* Debug Info */}
      <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
        <h3 className="font-bold text-yellow-800">Debug Info:</h3>
        <p className="text-sm text-yellow-700">
          Total Leads: {leads.length} | 
          Auth Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'} | 
          Loading: {loading ? 'Yes' : 'No'} | 
          Error: {error || 'None'}
        </p>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.email}</div>
                      {lead.phone && (
                        <div className="text-sm text-blue-600">{lead.phone}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                      className={`text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 ${getStatusColor(lead.status)}`}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </button>
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
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Lead Details</h3>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLead.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLead.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLead.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLead.country}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Source</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLead.source}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedLead.status)}`}>
                      {selectedLead.status}
                    </span>
                  </div>
                </div>

                {selectedLead.message && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLead.message}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Created</label>
                  <p className="mt-1 text-sm text-gray-900">{new Date(selectedLead.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
