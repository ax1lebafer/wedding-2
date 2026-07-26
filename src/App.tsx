import { useEffect } from 'react'
import { PageLayout } from './layouts/PageLayout'
import {
  DressCode,
  Hero,
  Invitation,
  Rsvp,
  Schedule,
  Venue,
} from './sections'
import { enableContentProtection } from './utils/contentProtection'

function App() {
  useEffect(() => enableContentProtection(), [])

  return (
    <PageLayout>
      <Hero />
      <Invitation />
      <Schedule />
      <Venue />
      <DressCode />
      <Rsvp />
    </PageLayout>
  )
}

export default App
