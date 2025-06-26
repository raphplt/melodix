import PreviewTrack from '@/components/spotify/PreviewTrack'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen">
      <h1 className="mt-10 text-center text-3xl font-bold">Jouer à Melodix</h1>
      <PreviewTrack />
    </div>
  )
}

export default page
