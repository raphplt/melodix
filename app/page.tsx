import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Stats from '@/components/Stats'
import Newsletter from '@/components/Newsletter'
import AuthDebug from '@/components/debug/AuthDebug'

export default function Home() {
  return (
    <Layout>
      <AuthDebug />
      <Hero />
      <Features />
      <Stats />
      <Newsletter />
    </Layout>
  )
}
