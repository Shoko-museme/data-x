import { ChevronDown, Map } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Card } from './ui/card'

const maps = [
  { id: 'building-a', name: 'Building A - Main Campus' },
  { id: 'building-b', name: 'Building B - Research Center' },
  { id: 'building-c', name: 'Building C - Administrative' },
  { id: 'warehouse', name: 'Warehouse - Storage Facility' }
]

interface MapSelectorProps {
  currentMap: string
  onMapChange: (mapId: string) => void
}

export function MapSelector({ currentMap, onMapChange }: MapSelectorProps) {
  const selectedMap = maps.find(map => map.id === currentMap) || maps[0]

  return (
    <Card className="absolute top-4 left-4 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border shadow-lg">
      <div className="flex items-center gap-3 p-4">
        <Map className="h-5 w-5 text-primary" />
        <div className="flex items-center gap-2">
          <span className="font-medium">{selectedMap.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {maps.map((map) => (
                <DropdownMenuItem
                  key={map.id}
                  onClick={() => onMapChange(map.id)}
                  className={map.id === currentMap ? 'bg-accent' : ''}
                >
                  {map.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  )
}