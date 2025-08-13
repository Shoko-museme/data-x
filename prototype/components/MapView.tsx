import { MapPin, Camera, Thermometer, Shield, Wifi } from 'lucide-react'

interface MapViewProps {
  currentMap: string
  currentFloor: string
}

// Mock sensor data for the map
const sensors = [
  { id: 1, type: 'temperature', x: 25, y: 30, status: 'normal', value: '22°C' },
  { id: 2, type: 'camera', x: 70, y: 20, status: 'active', value: 'Recording' },
  { id: 3, type: 'security', x: 15, y: 60, status: 'alert', value: 'Motion' },
  { id: 4, type: 'wifi', x: 80, y: 70, status: 'normal', value: '95%' },
  { id: 5, type: 'temperature', x: 45, y: 80, status: 'warning', value: '28°C' },
  { id: 6, type: 'camera', x: 60, y: 45, status: 'active', value: 'Recording' }
]

// Mock room/area data
const rooms = [
  { id: 1, name: 'Conference Room A', x: 10, y: 15, width: 25, height: 20 },
  { id: 2, name: 'Office Space', x: 40, y: 15, width: 35, height: 25 },
  { id: 3, name: 'Server Room', x: 80, y: 15, width: 15, height: 15 },
  { id: 4, name: 'Kitchen', x: 10, y: 50, width: 20, height: 15 },
  { id: 5, name: 'Main Hall', x: 35, y: 45, width: 40, height: 35 },
  { id: 6, name: 'Storage', x: 80, y: 60, width: 15, height: 25 }
]

export function MapView({ currentMap, currentFloor }: MapViewProps) {
  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'temperature':
        return Thermometer
      case 'camera':
        return Camera
      case 'security':
        return Shield
      case 'wifi':
        return Wifi
      default:
        return MapPin
    }
  }

  const getSensorColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-100'
      case 'warning':
        return 'text-orange-600 bg-orange-100'
      case 'alert':
        return 'text-red-600 bg-red-100'
      case 'active':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="w-full h-full relative bg-gray-50 overflow-hidden">
      {/* SVG Map Container */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Building outline */}
        <rect
          x="5"
          y="5"
          width="90"
          height="90"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="0.5"
          rx="2"
        />

        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f3f4f6" strokeWidth="0.2"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />

        {/* Rooms */}
        {rooms.map((room) => (
          <g key={room.id}>
            <rect
              x={room.x}
              y={room.y}
              width={room.width}
              height={room.height}
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="0.3"
              rx="1"
              className="hover:fill-blue-50 cursor-pointer transition-colors"
            />
            <text
              x={room.x + room.width / 2}
              y={room.y + room.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-gray-700 pointer-events-none"
              fontSize="2"
            >
              {room.name}
            </text>
          </g>
        ))}

        {/* Corridors/Pathways */}
        <rect x="35" y="5" width="5" height="40" fill="#e2e8f0" />
        <rect x="5" y="40" width="70" height="5" fill="#e2e8f0" />
        <rect x="75" y="35" width="5" height="50" fill="#e2e8f0" />
      </svg>

      {/* Sensor Overlays */}
      {sensors.map((sensor) => {
        const Icon = getSensorIcon(sensor.type)
        return (
          <div
            key={sensor.id}
            className={`absolute w-8 h-8 rounded-full flex items-center justify-center border-2 border-background shadow-md cursor-pointer hover:scale-110 transition-transform ${getSensorColor(sensor.status)}`}
            style={{
              left: `${sensor.x}%`,
              top: `${sensor.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            title={`${sensor.type}: ${sensor.value}`}
          >
            <Icon className="h-4 w-4" />
          </div>
        )
      })}

      {/* Map info overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur border rounded-lg px-4 py-2 shadow-lg">
        <div className="text-sm text-center">
          <span className="font-medium">{currentMap.replace('-', ' ').toUpperCase()}</span>
          <span className="text-muted-foreground mx-2">•</span>
          <span className="text-muted-foreground">{currentFloor.toUpperCase()}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur border rounded-lg p-3 shadow-lg">
        <div className="text-sm font-medium mb-2">Sensors</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-100 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
            </div>
            <span>Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-100 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-600"></div>
            </div>
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-100 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
            </div>
            <span>Alert</span>
          </div>
        </div>
      </div>
    </div>
  )
}