import { useState } from 'react'
import { NavBar } from './components/NavBar'
import { DashboardV2 } from './components/DashboardV2'
import { EntriesTable } from './components/EntriesTable'
import { MapsPage } from './components/MapsPage'

function App() {
  const [currentPage, setCurrentPage] = useState('overview')

  const renderPage = () => {
    switch (currentPage) {
      case 'maps':
        return <MapsPage />
      case 'map-editor':
        return <MapsPage initialEdit={true} />
      case 'projects':
        return (
          <main className="container mx-auto px-6 py-8">
            <div className="space-y-8">
              <div>
                <h1>Projects</h1>
                <p className="text-muted-foreground">Manage and track all your projects</p>
              </div>
              <EntriesTable />
            </div>
          </main>
        )
      case 'overview':
      default:
        return <DashboardV2 />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  )
}

export default App
