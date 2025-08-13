import { AlertTriangle, Flame, UserX, Zap, Clock } from 'lucide-react'
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
        badgeClass: 'bg-red-100 text-red-700 hover:bg-red-100',
        label: '紧急'
      }
    case 'critical':
      return {
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        badgeClass: 'bg-orange-100 text-orange-700 hover:bg-orange-100',
        label: '重要'
      }
    case 'warning':
      return {
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        badgeClass: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
        label: '警告'
      }
    default:
      return {
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        badgeClass: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
        label: '信息'
      }
  }
}

interface RealTimeEventStreamProps {
  onLocationClick?: (location: string) => void
}

export function RealTimeEventStream({ onLocationClick }: RealTimeEventStreamProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
          实时安全事件流
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-4 flex-1 min-h-0">
        <div className="h-full overflow-y-auto">
          <div className="space-y-1">
            {events.map((event) => {
              const Icon = event.icon
              const config = getLevelConfig(event.level)
              
              return (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors border-l-2 border-l-transparent hover:border-l-primary/20"
                >
                  <div className={`p-1.5 rounded-full ${config.bgColor} flex-shrink-0 mt-0.5`}>
                    <Icon className={`h-3 w-3 ${config.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`text-xs ${config.badgeClass}`}>
                        {config.label}
                      </Badge>
                      <span className="text-xs font-medium">{event.title}</span>
                      <span className="text-xs text-muted-foreground">{event.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-auto p-0 text-primary hover:text-primary/80"
                        onClick={() => onLocationClick?.(event.location)}
                      >
                        {event.location}
                      </Button>
                    </div>
                    
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs h-6">
                        查看详情
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-6">
                        处理
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}