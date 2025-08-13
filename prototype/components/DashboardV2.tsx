import { useState } from 'react'
import { KPISummaryBanner } from './KPISummaryBanner'
import { RealTimeEventStream } from './RealTimeEventStream'
import { FocusAreaMonitoring } from './FocusAreaMonitoring'
import { RiskHeatMap } from './RiskHeatMap'
import { SafetyAnalytics } from './SafetyAnalytics'

export function DashboardV2() {
  const [highlightedLocation, setHighlightedLocation] = useState<string>('')

  const handleLocationClick = (location: string) => {
    setHighlightedLocation(location)
    // Auto-clear highlight after 3 seconds
    setTimeout(() => setHighlightedLocation(''), 3000)
  }

  return (
    <main className="container mx-auto px-6 py-6 space-y-6">
      {/* Top Banner - KPI Summary */}
      <KPISummaryBanner />
      
      {/* Four Quadrant Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Top Left - Real-time Event Stream */}
          <div className="h-80">
            <RealTimeEventStream onLocationClick={handleLocationClick} />
          </div>
          
          {/* Bottom Left - Focus Area Monitoring */}
          <div className="flex-1">
            <FocusAreaMonitoring />
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Risk Heat Map */}
          <div className="h-80">
            <RiskHeatMap highlightedLocation={highlightedLocation} />
          </div>
          
          {/* Safety Analytics */}
          <div className="flex-1">
            <SafetyAnalytics />
          </div>
        </div>
      </div>
    </main>
  )
}