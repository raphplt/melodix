import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Headphones, 
  Music, 
  Users, 
  Trophy, 
  Brain, 
  Zap,
  Target,
  Gamepad2,
  TrendingUp
} from 'lucide-react'

const features = [
  {
    icon: Headphones,
    title: 'Audio Training',
    description: 'Develop your musical ear with scientifically-designed exercises that improve pitch recognition, rhythm detection, and audio analysis skills.',
  },
  {
    icon: Music,
    title: 'Music Discovery',
    description: 'Explore new genres, artists, and tracks through curated challenges that expand your musical horizons and introduce you to hidden gems.',
  },
  {
    icon: Users,
    title: 'Social Challenges',
    description: 'Compete with friends and the global community in real-time music challenges, leaderboards, and collaborative playlists.',
  },
  {
    icon: Brain,
    title: 'Adaptive Learning',
    description: 'Our AI-powered system adjusts difficulty based on your progress, ensuring optimal learning pace and personalized challenges.',
  },
  {
    icon: Trophy,
    title: 'Achievement System',
    description: 'Unlock badges, earn points, and track your musical journey with comprehensive progress tracking and milestone rewards.',
  },
  {
    icon: Zap,
    title: 'Real-time Feedback',
    description: 'Get instant feedback on your performance with detailed analytics and suggestions for improvement on every challenge.',
  },
  {
    icon: Target,
    title: 'Precision Training',
    description: 'Focus on specific musical skills with targeted exercises for interval recognition, chord identification, and genre classification.',
  },
  {
    icon: Gamepad2,
    title: 'Gamified Experience',
    description: 'Learn through play with engaging game mechanics, streaks, daily challenges, and interactive musical puzzles.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Analytics',
    description: 'Visualize your improvement over time with detailed statistics, performance graphs, and skill development tracking.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Musical Growth
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover a comprehensive suite of tools designed to enhance your musical abilities 
            and connect you with a vibrant community of music enthusiasts.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card 
                key={index}
                className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-300/30 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                      <IconComponent className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-lg border-white/20 inline-block">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to start your musical journey?
              </h3>
              <p className="text-gray-600 mb-6">
                Join thousands of music enthusiasts already improving their skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Free during beta
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  No credit card required
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
