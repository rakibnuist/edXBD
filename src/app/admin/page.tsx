'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { 
  trackDashboardView, 
  trackDashboardAction, 
  trackDatabaseOperation
} from '@/lib/analytics';
import { DashboardStats } from '@/lib/types';
import ConversionTrackingStatus from '@/components/ConversionTrackingStatus';

const defaultStats: DashboardStats = {
  totalLeads: 0,
  newLeads: 0,
  totalTestimonials: 0,
  totalCountries: 0,
  totalPartnerships: 0,
  newPartnerships: 0,
  recentLeads: [],
  recentPartnerships: []
};

export default function AdminDashboard() {
  const { getAuthHeaders, isAuthenticated, loading: authLoading, user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState<'connected' | 'disconnected' | 'unknown'>('unknown');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Only fetch data if user is authenticated and auth is not loading
    if (isAuthenticated && !authLoading) {
      // Track dashboard view
      trackDashboardView('admin_dashboard');
      
      fetchDashboardData();
      checkDatabaseStatus();
    }
  }, [isAuthenticated, authLoading]);

  const checkDatabaseStatus = async () => {
    try {
      const response = await fetch('/api/test');
      if (response.ok) {
        setDbStatus('connected');
        trackDatabaseOperation('status_check', true, { status: 'connected' });
      } else {
        setDbStatus('disconnected');
        trackDatabaseOperation('status_check', false, { status: 'disconnected' });
      }
    } catch (error) {
      setDbStatus('disconnected');
      trackDatabaseOperation('status_check', false, { status: 'error', error: 'network_error' });
    }
  };

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard', {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
        setRefreshKey(prev => prev + 1); // Force re-render
        trackDatabaseOperation('fetch_dashboard_data', true, {
          total_leads: data.totalLeads,
          new_leads: data.newLeads,
          total_testimonials: data.totalTestimonials,
          total_countries: data.totalCountries
        });
      } else if (response.status === 403) {
        // Check if admin user exists, if not redirect to setup
        const setupResponse = await fetch('/api/setup/admin');
        const setupData = await setupResponse.json();
        if (!setupData.adminExists) {
          window.location.href = '/setup';
          return;
        }
        console.error('Dashboard API error:', response.status, response.statusText);
        setStats(defaultStats);
        trackDatabaseOperation('fetch_dashboard_data', false, { 
          error: 'api_error', 
          status: response.status,
          statusText: response.statusText 
        });
      } else {
        console.error('Dashboard API error:', response.status, response.statusText);
        setStats(defaultStats);
        trackDatabaseOperation('fetch_dashboard_data', false, { 
          error: 'api_error', 
          status: response.status,
          statusText: response.statusText 
        });
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      setStats(defaultStats);
      trackDatabaseOperation('fetch_dashboard_data', false, { 
        error: 'network_error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  };


  // Show loading while auth is being checked or data is being fetched
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">
            {authLoading ? 'Checking authentication...' : 'Loading dashboard...'}
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {authLoading ? 'Verifying user credentials...' : 'Connecting to database...'}
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-lg text-gray-600">Authentication required</div>
          <div className="text-sm text-gray-500 mt-2">Please login to access the dashboard</div>
        </div>
      </div>
    );
  }

  return (
    <div key={refreshKey}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
            dbStatus === 'connected' ? 'bg-green-100 text-green-800' :
            dbStatus === 'disconnected' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              dbStatus === 'connected' ? 'bg-green-500' :
              dbStatus === 'disconnected' ? 'bg-red-500' :
              'bg-yellow-500'
            }`}></div>
            Database: {dbStatus}
          </div>
          {dbStatus === 'disconnected' && (
            <div className="flex items-center space-x-3">
              <button
                onClick={async () => {
                  try {
                    trackDashboardAction('init_database', { action: 'start' });
                    const response = await fetch('/api/init-db', { method: 'POST' });
                    if (response.ok) {
                      trackDatabaseOperation('init_database', true, { success: true });
                      checkDatabaseStatus();
                      fetchDashboardData();
                    } else {
                      trackDatabaseOperation('init_database', false, { error: 'api_error' });
                    }
                  } catch (error) {
                    trackDatabaseOperation('init_database', false, { error: 'network_error' });
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
              >
                Initialize DB
              </button>
              <div className="text-xs text-gray-500 max-w-xs">
                <p>Database not connected. Check your MongoDB connection or create a .env.local file.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalLeads}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Leads</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.newLeads}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Testimonials</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalTestimonials}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Countries</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalCountries}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Partnerships</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalPartnerships}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Partnerships</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.newPartnerships}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Leads */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Leads</h2>
          </div>
          <div className="p-6">
            {stats.recentLeads.length > 0 ? (
              <div className="space-y-4">
                {stats.recentLeads.map((lead) => (
                  <div key={lead._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{lead.name}</h3>
                      <p className="text-sm text-gray-600">{lead.email}</p>
                      <p className="text-sm text-gray-500">{lead.country} - {lead.program}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        lead.status === 'new' ? 'bg-green-100 text-green-800' :
                        lead.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'qualified' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recent leads</p>
            )}
          </div>
        </div>

        {/* Recent Partnerships */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Partnerships</h2>
          </div>
          <div className="p-6">
            {stats.recentPartnerships.length > 0 ? (
              <div className="space-y-4">
                {stats.recentPartnerships.map((partnership) => (
                  <div key={partnership._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{partnership.companyName || partnership.contactPerson}</h3>
                      <p className="text-sm text-gray-600">{partnership.contactPerson}</p>
                      <p className="text-sm text-gray-500">{partnership.country} - {partnership.partnershipType.replace('_', ' ')}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        partnership.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        partnership.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                        partnership.status === 'approved' ? 'bg-green-100 text-green-800' :
                        partnership.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {partnership.status.replace('_', ' ')}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(partnership.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recent partnerships</p>
            )}
          </div>
        </div>
      </div>

      {/* Conversion Tracking Status */}
      <div className="mb-8">
        <ConversionTrackingStatus />
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <Link 
          href="/admin/leads" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          onClick={() => trackDashboardAction('navigate_to_leads', { destination: '/admin/leads' })}
        >
          <h3 className="text-lg font-medium text-gray-900 mb-2">Manage Leads</h3>
          <p className="text-gray-600">View and manage all leads</p>
        </Link>
        
        <Link 
          href="/admin/testimonials" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          onClick={() => trackDashboardAction('navigate_to_testimonials', { destination: '/admin/testimonials' })}
        >
          <h3 className="text-lg font-medium text-gray-900 mb-2">Manage Testimonials</h3>
          <p className="text-gray-600">Add and edit testimonials</p>
        </Link>
        
        <Link 
          href="/admin/content" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          onClick={() => trackDashboardAction('navigate_to_content', { destination: '/admin/content' })}
        >
          <h3 className="text-lg font-medium text-gray-900 mb-2">Manage Content</h3>
          <p className="text-gray-600">Update website content</p>
        </Link>
        
        <Link 
          href="/admin/partnerships" 
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          onClick={() => trackDashboardAction('navigate_to_partnerships', { destination: '/admin/partnerships' })}
        >
          <h3 className="text-lg font-medium text-gray-900 mb-2">Manage Partnerships</h3>
          <p className="text-gray-600">View and manage B2B partnerships</p>
        </Link>
      </div>
    </div>
  );
}
