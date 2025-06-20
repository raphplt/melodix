import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Music, Headphones, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 mb-8">
              <Star className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">
                Coming Soon - Early Access Available
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Challenge your ears.{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Discover new music.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Train your musical ear with interactive challenges, discover hidden gems, 
              and compete with friends in the ultimate music discovery platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Early Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:bg-white/50 hover:border-gray-400 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
              >
                <Music className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-white/20">
              <div className="flex items-center text-gray-600">
                <Headphones className="w-5 h-5 mr-2 text-purple-600" />
                <span className="text-sm font-medium">Audio Training</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Music className="w-5 h-5 mr-2 text-pink-600" />
                <span className="text-sm font-medium">Music Discovery</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Star className="w-5 h-5 mr-2 text-blue-600" />
                <span className="text-sm font-medium">Social Challenges</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
