import { PageLayout } from './layouts/PageLayout'
import { Hero, Invitation, Schedule } from './sections'

function App() {
  return (
    <PageLayout>
      <Hero />
      <Invitation />
      <Schedule />
    </PageLayout>
  )
}

export default App
