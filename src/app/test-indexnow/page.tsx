'use client'

import { useState } from 'react'

export default function TestIndexNowPage() {
  const [urls, setUrls] = useState('/')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const submitUrls = async (action: string) => {
    setLoading(true)
    setResult(null)

    try {
      const body: any = { action }
      
      if (action !== 'submit-all') {
        body.urls = urls.split('\n').filter(url => url.trim())
      }

      const response = await fetch('/api/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: 'Error submitting URLs',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-8">
            🚀 IndexNow API Test
          </h1>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">📋 IndexNow Configuration</h3>
            <div className="space-y-2 text-sm">
              <p><strong>API Key:</strong> 9303d37873c94ab5a25637e6d1ad9ece</p>
              <p><strong>Key Location:</strong> <code>https://www.eduexpressint.com/9303d37873c94ab5a25637e6d1ad9ece.txt</code></p>
              <p><strong>Supported Engines:</strong> Bing, Yandex, Seznam</p>
            </div>
          </div>

          <div className="grid gap-8">
            {/* Submit All Important Pages */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">📄 Submit All Important Pages</h2>
              <p className="text-gray-600 mb-4">Submit all main pages of your website to IndexNow</p>
              <button
                onClick={() => submitUrls('submit-all')}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit All Pages'}
              </button>
            </div>

            {/* Submit Specific URLs */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">🔗 Submit Specific URLs</h2>
              <p className="text-gray-600 mb-4">Enter URLs to submit (one per line):</p>
              <textarea
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none"
                placeholder="/new-page&#10;/updated-content&#10;/blog/post"
              />
              <div className="mt-4 space-x-4">
                <button
                  onClick={() => submitUrls('submit')}
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit URLs'}
                </button>
                <button
                  onClick={() => submitUrls('submit-new')}
                  disabled={loading}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit as New Content'}
                </button>
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">📊 Results</h2>
                <div className={`p-4 rounded-lg ${
                  result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                    {result.message}
                  </p>
                  
                  {result.submittedUrls && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700">Submitted URLs:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                        {result.submittedUrls.map((url: string, index: number) => (
                          <li key={index}>{url}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {result.errors && result.errors.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-red-700">Errors:</p>
                      <ul className="list-disc list-inside text-sm text-red-600 mt-1">
                        {result.errors.map((error: string, index: number) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">💡 How to Use IndexNow</h3>
              <ul className="list-disc list-inside text-yellow-700 space-y-2">
                <li><strong>Submit All Pages:</strong> Use this to submit all important pages at once</li>
                <li><strong>Submit Specific URLs:</strong> Use this when you have specific URLs to submit</li>
                <li><strong>Submit as New Content:</strong> Use this for newly published content</li>
                <li><strong>Real-time:</strong> IndexNow provides faster indexing than traditional sitemaps</li>
                <li><strong>Multiple Engines:</strong> Submits to Bing, Yandex, and other compatible engines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
