'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setStatus('error')
      setMessage('Please enter your email address.')
      return
    }

    if (!validateEmail(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setStatus('loading')
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStatus('success')
      setMessage('Thank you! You\'ll be notified when we launch.')
      setEmail('')    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="newsletter" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-400/10 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full border border-purple-300/30 w-fit">
                <Mail className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get Early Access
              </CardTitle>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Be the first to know when Melofix launches. Join our exclusive waitlist 
                and get priority access to beta features, special pricing, and musical challenges.
              </p>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`h-12 bg-white/20 backdrop-blur-sm border-white/30 placeholder:text-gray-500 text-gray-900 focus:bg-white/30 focus:border-purple-400 transition-all duration-300 ${
                        status === 'error' ? 'border-red-400 focus:border-red-400' : ''
                      }`}
                      disabled={status === 'loading'}
                      aria-describedby={status === 'error' || status === 'success' ? 'form-message' : undefined}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="h-12 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Joining...
                      </div>
                    ) : (
                      'Join Waitlist'
                    )}
                  </Button>
                </div>

                {/* Status Message */}
                {(status === 'success' || status === 'error') && (
                  <div
                    id="form-message"
                    className={`mt-4 p-4 rounded-lg flex items-center ${
                      status === 'success'
                        ? 'bg-green-100/20 backdrop-blur-sm border border-green-300/30 text-green-800'
                        : 'bg-red-100/20 backdrop-blur-sm border border-red-300/30 text-red-800'
                    }`}
                    role="alert"
                  >
                    {status === 'success' ? (
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    )}
                    <span className="text-sm font-medium">{message}</span>
                  </div>
                )}
              </form>

              {/* Additional Info */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 mb-4">
                  Join 10,000+ music enthusiasts already on the waitlist
                </p>
                <div className="flex justify-center space-x-6 text-xs text-gray-400">
                  <span>✓ No spam, ever</span>
                  <span>✓ Unsubscribe anytime</span>
                  <span>✓ Early access perks</span>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  )
}
