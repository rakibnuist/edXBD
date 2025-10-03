'use client';

import { ArrowLeft, Calendar, User, Tag, Share2, Eye, Star, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import QuickContactForm from '@/components/QuickContactForm';
import { trackConsultationRequest } from '@/lib/analytics';
import { Update, UpdateClientProps } from '@/lib/types';

export default function UpdateClient({ update }: UpdateClientProps) {
  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <Link 
            href="/updates" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Updates
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="bg-white rounded-2xl shadow-lg border p-8 mb-8">
            <div className="flex items-center space-x-4 mb-6">
              {update.category && (
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {update.category}
                </span>
              )}
              {update.isFeatured && (
                <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {update.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(update.publishedAt || update.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{update.author}</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                <span>{update.views || 0} views</span>
              </div>
              <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors hover:bg-blue-50 px-3 py-1 rounded-lg">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>

            {update.excerpt && (
              <div className="text-xl text-gray-700 leading-relaxed border-l-4 border-blue-500 pl-6 mb-8 bg-blue-50 p-4 rounded-r-lg">
                {update.excerpt}
              </div>
            )}

            {update.tags && update.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                 {update.tags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className="flex items-center bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-2xl shadow-lg border p-8 mb-8">
            {update.featuredImage && (
              <div className="mb-8">
                <img 
                  src={update.featuredImage} 
                  alt={update.title}
                  className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
            
            {/* Article Body */}
            <div className="article-body">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700 prose-blockquote:text-gray-600 prose-blockquote:border-blue-500 prose-h1:text-3xl prose-h1:font-bold prose-h2:text-2xl prose-h2:font-semibold prose-h3:text-xl prose-h3:font-semibold"
                dangerouslySetInnerHTML={{ __html: update.content }}
              />
            </div>
          </div>

          {/* Single Combined CTA Section */}
          <div className="bg-blue-600 rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Study Abroad Journey?</h2>
            <p className="text-lg mb-6 opacity-90">
              Get FREE consultation and expert guidance for your international education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  trackConsultationRequest('update_page_get_consultation');
                  window.dispatchEvent(new CustomEvent('openQuickForm'));
                }}
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                <User className="w-4 h-4 mr-2" />
                Get FREE Consultation
              </button>
              <Link 
                href="https://wa.me/8801983333566"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact Form Modal */}
      <QuickContactForm />
    </div>
  );
}
