
import { Button } from '@/components/ui/button';

interface FloorSelectorProps {
  currentFloor: string;
  onFloorChange: (floor: string) => void;
}

const floors = ['3f', '2f', '1f'];

export function FloorSelector({ currentFloor, onFloorChange }: FloorSelectorProps) {
  return (
    <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 rounded-lg shadow-lg border">
      <div className="text-sm font-medium text-muted-foreground mb-2 px-1 text-center">楼层</div>
      <div className="flex flex-col items-center gap-1">
        {floors.map((floor) => (
          <Button
            key={floor}
            variant={currentFloor === floor ? 'default' : 'ghost'}
            size="sm"
            className={`w-16 h-10 ${currentFloor === floor ? 'bg-muted hover:bg-muted text-foreground' : ''}`}
            onClick={() => onFloorChange(floor)}
          >
            {floor.toUpperCase()}
          </Button>
        ))}
      </div>
    </div>
  );
}
