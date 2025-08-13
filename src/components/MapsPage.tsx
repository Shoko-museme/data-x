import { useState } from 'react'
import { MapSelector } from './maps/MapSelector'
import { FloorSelector } from './maps/FloorSelector'
import { AreaInfoPanel } from './maps/AreaInfoPanel'
import { MapView } from './maps/MapView'

export function MapsPage() {
  const [currentMap, setCurrentMap] = useState('building-a')
  const [currentFloor, setCurrentFloor] = useState('1f')

  const mapNames: { [key: string]: string } = {
    'building-a': '第一轧钢车间',
    'building-b': '第二炼钢车间',
    'outdoor-area': '厂区总览',
  };

  const currentMapName = mapNames[currentMap] || '未知区域';

  return (
    <main className="relative h-[calc(100vh-4rem)] w-full bg-background">
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
        currentArea={`${currentMapName} - ${currentFloor.toUpperCase()}`} 
      />
    </main>
  )
}
