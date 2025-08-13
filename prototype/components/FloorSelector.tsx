import { Button } from './ui/button'
import { Card } from './ui/card'

const floors = [
  { id: '5f', name: '5F', label: '5th Floor' },
  { id: '4f', name: '4F', label: '4th Floor' },
  { id: '3f', name: '3F', label: '3rd Floor' },
  { id: '2f', name: '2F', label: '2nd Floor' },
  { id: '1f', name: '1F', label: '1st Floor' },
  { id: 'b1', name: 'B1', label: 'Basement 1' }
]

interface FloorSelectorProps {
  currentFloor: string
  onFloorChange: (floorId: string) => void
}

export function FloorSelector({ currentFloor, onFloorChange }: FloorSelectorProps) {
  return (
    <Card className="absolute top-1/2 left-4 -translate-y-1/2 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border shadow-lg">
      <div className="p-3">
        <div className="text-sm font-medium text-muted-foreground mb-3 px-1">Floors</div>
        <div className="flex flex-col gap-2">
          {floors.map((floor) => (
            <Button
              key={floor.id}
              variant={currentFloor === floor.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onFloorChange(floor.id)}
              className="justify-start w-16 h-10"
            >
              {floor.name}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  )
}