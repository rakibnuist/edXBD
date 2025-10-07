'use client';

import { useEffect } from 'react';

interface ContentOptimizerProps {
  children: React.ReactNode;
  pageType?: 'homepage' | 'country' | 'service' | 'about' | 'contact' | 'update';
  structuredData?: Record<string, unknown>;
}

// Content optimization component for better SEO
const ContentOptimizer: React.FC<ContentOptimizerProps> = ({ 
  children, 
  pageType = 'homepage',
  structuredData 
}) => {
  useEffect(() => {
    // Optimize content structure for SEO
    const optimizeContentStructure = () => {
      // Ensure proper heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let h1Count = 0;
      let previousLevel = 0;

      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        
        // Count H1 tags (should be only one per page)
        if (level === 1) {
          h1Count++;
          if (h1Count > 1) {
            console.warn('Multiple H1 tags found. Consider using only one H1 per page for better SEO.');
          }
        }

        // Check heading hierarchy
        if (index > 0 && level > previousLevel + 1) {
          console.warn(`Heading hierarchy issue: ${heading.tagName} follows ${headings[index - 1].tagName}. Consider proper heading order.`);
        }
        
        previousLevel = level;
      });

      // Optimize images for SEO
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        // Ensure all images have alt text
        if (!img.alt || img.alt.trim() === '') {
          console.warn('Image missing alt text:', img.src);
        }

        // Add loading="lazy" to images below the fold
        const rect = img.getBoundingClientRect();
        if (rect.top > window.innerHeight && !img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
      });

      // Optimize links for SEO
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        // Ensure external links have proper attributes
        if (link.hostname !== window.location.hostname) {
          if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
          }
        }

        // Check for descriptive link text
        if (link.textContent?.trim() === '' || link.textContent?.trim() === 'Click here') {
          console.warn('Link with non-descriptive text:', link.href);
        }
      });

      // Optimize form elements
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          // Ensure form inputs have proper labels
          const id = input.getAttribute('id');
          if (id && !document.querySelector(`label[for="${id}"]`)) {
            console.warn('Form input missing label:', id);
          }
        });
      });
    };

    // Add structured data to page
    const addStructuredData = () => {
      if (structuredData) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
    };

    // Optimize content for readability
    const optimizeReadability = () => {
      // Add reading time estimation
      const content = document.querySelector('main, article, .content');
      if (content) {
        const text = content.textContent || '';
        const wordsPerMinute = 200;
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        
        // Add reading time indicator if not already present
        if (!document.querySelector('.reading-time')) {
          const readingTimeElement = document.createElement('div');
          readingTimeElement.className = 'reading-time';
          readingTimeElement.textContent = `Reading time: ${readingTime} min`;
          readingTimeElement.style.cssText = 'font-size: 0.875rem; color: #6b7280; margin-bottom: 1rem;';
          content.insertBefore(readingTimeElement, content.firstChild);
        }
      }
    };

    // Initialize content optimizations
    optimizeContentStructure();
    addStructuredData();
    optimizeReadability();

    // Monitor content performance
    const monitorContentPerformance = () => {
      // Track content engagement
      let scrollDepth = 0;
      let maxScrollDepth = 0;
      
      const trackScrollDepth = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollDepth = Math.round((scrollTop / docHeight) * 100);
        maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
      };

      window.addEventListener('scroll', trackScrollDepth);

      // Track time on page
      const startTime = Date.now();
      
      // Cleanup function
      return () => {
        window.removeEventListener('scroll', trackScrollDepth);
        
        // Log engagement metrics
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        console.log('Content engagement:', {
          timeOnPage,
          maxScrollDepth,
          pageType
        });
      };
    };

    const cleanup = monitorContentPerformance();

    return cleanup;
  }, [pageType, structuredData]);

  return (
    <>
      {/* Content optimization styles */}
      <style jsx global>{`
        /* Optimize typography for readability */
        .content h1, .content h2, .content h3, .content h4, .content h5, .content h6 {
          line-height: 1.3;
          margin-bottom: 0.5em;
          margin-top: 1.5em;
        }
        
        .content p {
          line-height: 1.6;
          margin-bottom: 1em;
        }
        
        .content ul, .content ol {
          margin-bottom: 1em;
          padding-left: 1.5em;
        }
        
        .content li {
          margin-bottom: 0.5em;
        }
        
        /* Optimize images for better display */
        .content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        /* Improve link visibility */
        .content a {
          color: #2563eb;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
        }
        
        .content a:hover {
          color: #1d4ed8;
          text-decoration-thickness: 2px;
        }
        
        /* Optimize form elements */
        .content input, .content textarea, .content select {
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          font-size: 1rem;
          line-height: 1.5;
        }
        
        .content input:focus, .content textarea:focus, .content select:focus {
          outline: 2px solid #2563eb;
          outline-offset: 2px;
        }
        
        /* Improve button accessibility */
        .content button {
          min-height: 44px;
          min-width: 44px;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
        }
        
        /* Reading time indicator */
        .reading-time {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 1rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid #e5e7eb;
        }
        
        /* Print styles for better content printing */
        @media print {
          .content {
            font-size: 12pt;
            line-height: 1.4;
            color: #000;
          }
          
          .content h1, .content h2, .content h3 {
            page-break-after: avoid;
          }
          
          .content img {
            max-width: 100%;
            page-break-inside: avoid;
          }
        }
      `}</style>
      
      {children}
    </>
  );
};

export default ContentOptimizer;
