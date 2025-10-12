'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { trackDashboardView, trackContentManagement } from '@/lib/analytics';
import { Content } from '@/lib/types';

export default function ContentPage() {
  const { getAuthHeaders } = useAuth();
  const [contents, setContents] = useState<Content[]>([]);
  const [filteredContents, setFilteredContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    type: 'page',
    isPublished: false,
    featuredImage: '',
    metaDescription: '',
    tags: [] as string[],
    categories: [] as string[],
    author: 'Admin'
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [editorMode, setEditorMode] = useState<'html' | 'preview'>('html');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    trackDashboardView('content_management');
    fetchContents();
  }, []);

  // Filter contents based on selected filters
  useEffect(() => {
    let filtered = [...contents];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(content => 
        content.categories && content.categories.includes(selectedCategory)
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(content => content.type === selectedType);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      const isPublished = selectedStatus === 'published';
      filtered = filtered.filter(content => content.isPublished === isPublished);
    }

    setFilteredContents(filtered);
  }, [contents, selectedCategory, selectedType, selectedStatus]);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  };

  const fetchContents = async () => {
    try {
      setLoading(true);
      
      // Debug: Check what headers we're getting
      const headers = getAuthHeaders();
      console.log('Auth headers:', headers);
      console.log('Token from localStorage:', localStorage.getItem('admin_token') ? 'Token exists' : 'No token');
      
      const response = await fetch('/api/admin/content', {
        headers: headers
      });
      
      console.log('Content API response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        setContents(data);
        console.log('Contents fetched successfully:', data);
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch contents:', errorData);
        showMessage('error', `Failed to fetch contents: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error fetching contents:', error);
      showMessage('error', 'Network error while fetching contents');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({ ...prev, featuredImage: data.imageUrl }));
        trackContentManagement('image_upload', { 
          success: true, 
          file_size: file.size,
          file_type: file.type 
        });
      } else {
        trackContentManagement('image_upload', { 
          success: false, 
          error: 'upload_failed' 
        });
        alert('Failed to upload image');
      }
    } catch (error) {
      trackContentManagement('image_upload', { 
        success: false, 
        error: 'network_error' 
      });
      alert('Failed to upload image');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      if (!formData.title.trim()) {
        showMessage('error', 'Title is required');
        return;
      }
      if (!formData.slug.trim()) {
        showMessage('error', 'Slug is required');
        return;
      }
      if (!formData.content.trim()) {
        showMessage('error', 'Content is required');
        return;
      }
      if (!formData.author.trim()) {
        showMessage('error', 'Author is required');
        return;
      }

      const url = editingContent ? `/api/admin/content/${editingContent._id}` : '/api/admin/content';
      const method = editingContent ? 'PUT' : 'POST';
      
      console.log('Submitting content:', { url, method, formData });
      
      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('Content saved successfully:', result);
        
        const action = editingContent ? 'update' : 'create';
        trackContentManagement(action, { 
          content_id: editingContent?._id || result._id,
          title: formData.title,
          type: formData.type,
          has_image: !!formData.featuredImage,
          success: true
        });
        
        showMessage('success', editingContent ? 'Content updated successfully!' : 'Content created successfully!');
        fetchContents();
        setShowForm(false);
        setEditingContent(null);
        setFormData({
          title: '',
          slug: '',
          content: '',
          type: 'page',
          isPublished: false,
          featuredImage: '',
          metaDescription: '',
          tags: [],
          categories: [],
          author: 'Admin'
        });
        setEditorMode('html');
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        
        const action = editingContent ? 'update' : 'create';
        trackContentManagement(action, { 
          content_id: editingContent?._id,
          title: formData.title,
          success: false,
          error: 'api_error'
        });
        
        showMessage('error', `Failed to ${editingContent ? 'update' : 'create'} content: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
      
      const action = editingContent ? 'update' : 'create';
      trackContentManagement(action, { 
        content_id: editingContent?._id,
        success: false,
        error: 'network_error'
      });
      
      showMessage('error', 'Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (content: Content) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      slug: content.slug,
      content: content.content,
      type: content.type,
      isPublished: content.isPublished,
      featuredImage: content.featuredImage || '',
      metaDescription: content.metaDescription || '',
      tags: content.tags || [],
      categories: content.categories || [],
      author: content.author || 'Admin'
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this content?')) {
      try {
        const response = await fetch(`/api/admin/content/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });

        if (response.ok) {
          trackContentManagement('delete', { 
            content_id: id,
            success: true 
          });
          fetchContents();
        } else {
          trackContentManagement('delete', { 
            content_id: id,
            success: false,
            error: 'api_error'
          });
        }
      } catch (error) {
        trackContentManagement('delete', { 
          content_id: id,
          success: false,
          error: 'network_error'
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading content...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Message Display */}
      {message && (
        <div className={`mb-4 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          <div className="flex justify-between items-center">
            <span>{message.text}</span>
            <button
              onClick={() => setMessage(null)}
              className="ml-4 text-lg font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingContent(null);
            setFormData({
              title: '',
              slug: '',
              content: '',
              type: 'page',
              isPublished: false,
              featuredImage: '',
              metaDescription: '',
              tags: [],
              categories: [],
              author: 'Admin'
            });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add New Content
        </button>
      </div>

      {/* Filter Options */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Announcement">Announcement</option>
              <option value="University">University</option>
              <option value="Success">Success</option>
              <option value="Partnership">Partnership</option>
              <option value="News">News</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="page">Page</option>
              <option value="blog">Blog</option>
              <option value="update">Update</option>
              <option value="service">Service</option>
              <option value="destination">Destination</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Filter Summary */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {filteredContents.length} of {contents.length} content items
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedType('all');
              setSelectedStatus('all');
            }}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContents.length > 0 ? (
                filteredContents.map((content) => (
                  <tr key={content._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{content.title}</div>
                        <div className="text-sm text-gray-500">/{content.slug}</div>
                        {content.categories && content.categories.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {content.categories.map((category, index) => (
                              <span
                                key={index}
                                className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {content.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        content.isPublished ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {content.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(content.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(content)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(content._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-lg font-medium">No content found</p>
                      <p className="text-sm">Try adjusting your filters or create new content.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingContent ? 'Edit Content' : 'Add New Content'}
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setFormData({ 
                        ...formData, 
                        title,
                        slug: !editingContent ? generateSlug(title) : formData.slug
                      });
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="page">Page</option>
                    <option value="blog">Blog</option>
                    <option value="update">Update</option>
                    <option value="service">Service</option>
                    <option value="destination">Destination</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <div className="mb-2">
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditorMode('html')}
                        className={`px-3 py-1 text-sm rounded ${
                          editorMode === 'html' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        HTML Code
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditorMode('preview')}
                        className={`px-3 py-1 text-sm rounded ${
                          editorMode === 'preview' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                  
                  {editorMode === 'html' ? (
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={15}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                      placeholder="Enter HTML content here..."
                      required
                    />
                  ) : (
                    <div 
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 min-h-[300px] bg-white"
                      dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-gray-500">No content to preview</p>' }}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                  
                  {/* Image Link Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Image URL</label>
                    <input
                      type="url"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* File Upload */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Or Upload Image</label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageUpload(file);
                          }
                        }}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        disabled={isUploadingImage}
                      />
                      {isUploadingImage && (
                        <div className="text-sm text-blue-600">Uploading...</div>
                      )}
                    </div>
                  </div>

                  {/* Image Preview */}
                  {formData.featuredImage && (
                    <div className="mt-2">
                      <img 
                        src={formData.featuredImage} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded border"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, featuredImage: '' })}
                        className="mt-1 text-sm text-red-600 hover:text-red-800"
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="SEO meta description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Categories</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Announcement', 'University', 'Success', 'Partnership', 'News'].map((category) => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.categories?.includes(category) || false}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                categories: [...(formData.categories || []), category]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                categories: formData.categories?.filter(cat => cat !== category) || []
                              });
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags?.join(', ') || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="study abroad, education, scholarship..."
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">Published</label>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {editingContent ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      `${editingContent ? 'Update' : 'Add'} Content`
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
