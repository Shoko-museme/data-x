import { AlertTriangle, Flame, UserX, Zap, Clock, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const events = [
  {
    id: 1,
    level: 'emergency',
    type: 'fire',
    title: '火焰烟雾',
    location: '2号车间-A区',
    time: '14:32:05',
    icon: Flame,
    description: '检测到异常高温和烟雾信号'
  },
  {
    id: 2,
    level: 'critical',
    type: 'intrusion',
    title: '人员闯入',
    location: '北侧围墙-C11摄像头',
    time: '14:31:50',
    icon: UserX,
    description: '非授权人员进入限制区域'
  },
  {
    id: 3,
    level: 'warning',
    type: 'equipment',
    title: '设备异常',
    location: '3号生产线-传感器02',
    time: '14:30:15',
    icon: Zap,
    description: '温度传感器读数超出正常范围'
  },
  {
    id: 4,
    level: 'info',
    type: 'maintenance',
    title: '维护提醒',
    location: '1号车间-设备维护',
    time: '14:28:30',
    icon: Clock,
    description: '定期维护检查即将到期'
  },
  {
    id: 5,
    level: 'warning',
    type: 'safety',
    title: '安全违规',
    location: '装卸区-A3摄像头',
    time: '14:25:10',
    icon: AlertTriangle,
    description: '检测到未佩戴安全帽作业'
  }
]

const getLevelConfig = (level: string) => {
  switch (level) {
    case 'emergency':
      return {
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-500/30',
        badgeClass: 'bg-red-100 text-red-700 hover:bg-red-100',
        label: '紧急'
      }
    case 'critical':
      return {
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-500/30',
        badgeClass: 'bg-orange-100 text-orange-700 hover:bg-orange-100',
        label: '重要'
      }
    case 'warning':
      return {
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-500/30',
        badgeClass: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
        label: '警告'
      }
    default:
      return {
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-500/30',
        badgeClass: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
        label: '信息'
      }
  }
}

interface RealTimeEventStreamProps {
  onLocationClick?: (location: string) => void
}

function EventItem({ event, onLocationClick }: { event: (typeof events)[0]; onLocationClick?: (location: string) => void }) {
  const Icon = event.icon
  const config = getLevelConfig(event.level)

  return (
    <div className="group relative flex items-start gap-x-3 p-2 rounded-lg hover:bg-accent transition-colors">
      <div className="absolute left-5.5 top-7 h-full w-px bg-muted/60" aria-hidden="true" />
      
      <div className={`relative flex h-7 w-7 flex-none items-center justify-center rounded-full ${config.bgColor}`}>
        <Icon className={`h-4 w-4 ${config.color}`} />
      </div>

      <div className="flex-auto py-0.5 text-xs leading-5">
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground">{event.title}</span>
          <time className="flex-none text-muted-foreground">
            {event.time}
          </time>
        </div>
        
        <p className="text-muted-foreground mt-1 line-clamp-1">{event.description}</p>
        
        <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-x-2">
                 <Badge variant="outline" className={`text-xs ${config.badgeClass} ${config.borderColor} border`}>
                    {config.label}
                 </Badge>
                 <button onClick={() => onLocationClick?.(event.location)} className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                     <MapPin className="h-3 w-3" />
                     {event.location}
                 </button>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-x-2">
                 <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                    详情
                 </Button>
                 <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                    处理
                 </Button>
            </div>
        </div>
      </div>
    </div>
  )
}

export function RealTimeEventStream({ onLocationClick }: RealTimeEventStreamProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="h-2.5 w-2.5 bg-red-500 rounded-full animate-pulse"></div>
          实时安全事件流
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6 flex-1 min-h-0">
        <div className="h-full overflow-y-auto pr-2 -mr-2">
          <div className="relative space-y-6">
            {events.map((event) => (
              <EventItem key={event.id} event={event} onLocationClick={onLocationClick} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
