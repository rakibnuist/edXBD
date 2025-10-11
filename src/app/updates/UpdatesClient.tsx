'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, Plus, Calendar, User, Star, Filter, SortAsc, SortDesc } from 'lucide-react';
import { trackConsultationRequest, trackPageView } from '@/lib/analytics';
import { Update, UpdatesResponse } from '@/lib/types';

export default function UpdatesClient() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [filteredUpdates, setFilteredUpdates] = useState<Update[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [authors, setAuthors] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAuthor, setSelectedAuthor] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState<Update | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUpdates = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/updates');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: UpdatesResponse = await response.json();
      
      setUpdates(data.updates || []);
      setCategories(data.categories || ['All']);
      setAuthors(data.authors || ['All']);
    } catch (error) {
      console.error('Error fetching updates:', error);
      // Set empty arrays on error so UI doesn't get stuck
      setUpdates([]);
      setCategories(['All']);
      setAuthors(['All']);
    } finally {
      setLoading(false);
    }
  };

  const filterUpdates = useCallback(() => {
    let filtered = [...updates];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(update =>
        update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        update.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        update.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(update => update.category === selectedCategory);
    }

    // Author filter
    if (selectedAuthor !== 'All') {
      filtered = filtered.filter(update => update.author === selectedAuthor);
    }


    // Date filter
    if (dateFilter !== 'All') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'Last Week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'Last Month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'Last Year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(update => {
        const updateDate = new Date(update.publishedAt || update.createdAt);
        return updateDate >= filterDate;
      });
    }

    // Featured filter
    if (showFeaturedOnly) {
      filtered = filtered.filter(update => update.isFeatured);
    }

    // Sort updates
    filtered.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt);
      const dateB = new Date(b.publishedAt || b.createdAt);
      
      switch (sortBy) {
        case 'newest':
          return dateB.getTime() - dateA.getTime();
        case 'oldest':
          return dateA.getTime() - dateB.getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return dateB.getTime() - dateA.getTime();
      }
    });

    setFilteredUpdates(filtered);
  }, [updates, searchTerm, selectedCategory, selectedAuthor, dateFilter, sortBy, showFeaturedOnly]);

  useEffect(() => {
    fetchUpdates();
    // Track page view for lead generation campaigns
    trackPageView('updates_page');
  }, []);

  useEffect(() => {
    filterUpdates();
  }, [updates, searchTerm, selectedCategory, selectedAuthor, dateFilter, sortBy, showFeaturedOnly, filterUpdates]);


  const closeModal = () => {
    setShowModal(false);
    setSelectedUpdate(null);
  };

  const handleContactFormOpen = () => {
    trackConsultationRequest('updates_page_cta_clicked');
    window.dispatchEvent(new CustomEvent('openQuickForm'));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedAuthor('All');
    setDateFilter('All');
    setSortBy('newest');
    setShowFeaturedOnly(false);
  };


  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(dateString));
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Scholarships': 'bg-green-100 text-green-800',
      'Visa Updates': 'bg-blue-100 text-blue-800',
      'Events': 'bg-purple-100 text-purple-800',
      'Partnerships': 'bg-orange-100 text-orange-800',
      'Success Stories': 'bg-yellow-100 text-yellow-800',
      'News': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading updates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Latest Study Abroad Updates
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Stay informed with the latest study abroad news, scholarship opportunities, and university announcements.
            </p>
            
            {/* Single CTA */}
            <div className="flex justify-center">
              <button 
                onClick={handleContactFormOpen}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Get Updates
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border p-6 mb-8">
          {/* First Row - Search and Main Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search updates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Author Filter */}
            <div className="lg:w-48">
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {authors.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="lg:w-40">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
          </div>

          {/* Second Row - Additional Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            {/* Date Filter */}
            <div className="sm:w-40">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Time</option>
                <option value="Last Week">Last Week</option>
                <option value="Last Month">Last Month</option>
                <option value="Last Year">Last Year</option>
              </select>
            </div>

            {/* Featured Toggle */}
            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                showFeaturedOnly
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Star className="w-4 h-4 inline mr-1" />
              Featured
            </button>

            {/* Clear Filters */}
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-4 h-4 inline mr-1" />
              Clear All
            </button>
          </div>


          {/* Results Count */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium text-blue-600">{filteredUpdates.length}</span> of{' '}
              <span className="font-medium">{updates.length}</span> updates
            </p>
          </div>
        </div>

        {/* Updates Grid */}
        {filteredUpdates.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No updates found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={clearAllFilters}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpdates.map((update) => (
              <article
                key={update._id}
                className="bg-white rounded-lg border hover:shadow-lg transition-shadow duration-200 overflow-hidden group"
              >
                {/* Featured Badge */}
                {update.isFeatured && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </span>
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  {update.featuredImage ? (
                    <img
                      src={update.featuredImage}
                      alt={update.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <div className="text-4xl opacity-60">📰</div>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  {/* Category and Date */}
                  <div className="flex items-center justify-between mb-3">
                    {update.category && (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(update.category)}`}>
                        {update.category}
                      </span>
                    )}
                    <div className="flex items-center text-gray-500 text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(update.publishedAt || update.createdAt)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {update.title}
                  </h3>

                  {/* Excerpt */}
                  {update.excerpt && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {update.excerpt}
                    </p>
                  )}


                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center text-gray-500 text-xs">
                      <User className="w-3 h-3 mr-1" />
                      {update.author}
                    </div>
                    <Link 
                      href={`/updates/${update.slug}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>

      {/* Simple Modal */}
      {showModal && selectedUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Preview</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  {selectedUpdate.category && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(selectedUpdate.category)}`}>
                      {selectedUpdate.category}
                    </span>
                  )}
                  {selectedUpdate.isFeatured && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {selectedUpdate.title}
                </h3>
                
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span className="mr-4">{formatDate(selectedUpdate.publishedAt || selectedUpdate.createdAt)}</span>
                  <User className="w-3 h-3 mr-1" />
                  <span>{selectedUpdate.author}</span>
                </div>
              </div>

              {selectedUpdate.excerpt && (
                <div className="text-gray-700 mb-4 p-3 bg-gray-50 rounded">
                  {selectedUpdate.excerpt}
                </div>
              )}

              <div className="flex gap-3">
                <Link
                  href={`/updates/${selectedUpdate.slug}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Read Full Article
                </Link>
                <button
                  onClick={closeModal}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
