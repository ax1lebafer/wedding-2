import { PageLayout } from './layouts/PageLayout'
import { DressCode, Hero, Invitation, Schedule, Venue } from './sections'

function App() {
  return (
    <PageLayout>
      <Hero />
      <Invitation />
      <Schedule />
      <Venue />
      <DressCode />
    </PageLayout>
  )
}

export default App
