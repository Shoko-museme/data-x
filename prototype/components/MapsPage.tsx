import { useState } from 'react'
import { MapSelector } from './MapSelector'
import { FloorSelector } from './FloorSelector'
import { AreaInfoPanel } from './AreaInfoPanel'
import { MapView } from './MapView'

export function MapsPage() {
  const [currentMap, setCurrentMap] = useState('building-a')
  const [currentFloor, setCurrentFloor] = useState('1f')

  return (
    <div className="relative h-screen w-full bg-background">
      {/* Main Map View */}
      <MapView currentMap={currentMap} currentFloor={currentFloor} />
      
      {/* Floating Components */}
      <MapSelector 
        currentMap={currentMap} 
        onMapChange={setCurrentMap} 
      />
      
      <FloorSelector 
        currentFloor={currentFloor} 
        onFloorChange={setCurrentFloor} 
      />
      
      <AreaInfoPanel 
        currentArea={`${currentMap.replace('-', ' ').toUpperCase()} - ${currentFloor.toUpperCase()}`} 
      />
    </div>
  )
}