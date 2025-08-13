
import { Map, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MapSelectorProps {
  currentMap: string;
  onMapChange: (map: string) => void;
}

const maps = [
  { id: 'building-a', name: '第一轧钢车间' },
  { id: 'building-b', name: '第二炼钢车间' },
  { id: 'outdoor-area', name: '厂区总览' },
];

export function MapSelector({ currentMap, onMapChange }: MapSelectorProps) {
  const selectedMap = maps.find(map => map.id === currentMap) || maps[0];

  return (
    <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 rounded-lg shadow-lg border">
      <div className="flex items-center gap-2">
        <Map className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              <span className="font-semibold">{selectedMap.name}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {maps.map((map) => (
              <DropdownMenuItem
                key={map.id}
                onClick={() => onMapChange(map.id)}
                className={map.id === currentMap ? 'bg-muted hover:bg-muted' : ''}
              >
                {map.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
