import { PageLayout } from './layouts/PageLayout'
import { Hero, Invitation, Schedule, Venue } from './sections'

function App() {
  return (
    <PageLayout>
      <Hero />
      <Invitation />
      <Schedule />
      <Venue />
    </PageLayout>
  )
}

export default App
