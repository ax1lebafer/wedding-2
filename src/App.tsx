import { PageLayout } from './layouts/PageLayout'
import {
  DressCode,
  Hero,
  Invitation,
  Rsvp,
  Schedule,
  Venue,
} from './sections'

function App() {
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
