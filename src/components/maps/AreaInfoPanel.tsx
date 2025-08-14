
import { AlertTriangle, Wrench, Bell, Info, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface AreaInfoPanelProps {
  currentArea: string;
}

const dangerousTasks = [
  { id: 1, task: '高空作业', location: '预精轧行车', status: '进行中', time: '09:00' },
  { id: 2, task: '动火作业', location: '加热炉底', status: '已结束', time: '10:30' },
]

const recentEvents = [
  { id: 1, type: '设备报警', message: '1#液压站温度异常', severity: '紧急', time: '11:15' },
  { id: 2, type: '人员闯入', message: '加热炉底发现未授权人员', severity: '重要', time: '11:05' },
]

const deviceStatus = [
    { name: '摄像头', status: 'ok', value: '11/11' },
    { name: 'PLC', status: 'ok', value: '4/4' },
    { name: '传感器', status: 'warning', value: '1/2' },
]


export function AreaInfoPanel({ currentArea }: AreaInfoPanelProps) {
  const getStatusColor = (status: string) => {
    return status === '进行中' 
      ? 'border-blue-500/50 text-blue-500' 
      : 'border-gray-500/50 text-muted-foreground';
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case '紧急':
        return 'border-red-500/50 text-red-500';
      case '重要':
        return 'border-orange-500/50 text-orange-500';
      default:
        return 'border-yellow-500/50 text-yellow-500';
    }
  }
  
  const getDeviceStatusColor = (status: string) => {
    switch(status) {
        case 'ok': return 'bg-green-500';
        case 'warning': return 'bg-yellow-500';
        default: return 'bg-gray-500';
    }
  }

  return (
    <Card className="absolute top-1/2 right-4 -translate-y-1/2 z-10 w-80 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 border shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Info className="h-5 w-5" />
          <span>当前区域: {currentArea}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-2">
        {/* Dangerous Tasks */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm">今日危险作业</span>
          </div>
          <div className="space-y-2">
            {dangerousTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                <div>
                  <div className="text-sm font-medium">{task.task} ({task.location})</div>
                  <div className="text-xs text-muted-foreground">{task.time}</div>
                </div>
                <Badge variant="outline" className={getStatusColor(task.status)}>{task.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Recent Events */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm">近期安全事件</span>
          </div>
          <div className="space-y-2">
            {recentEvents.map((event) => (
              <div key={event.id} className="p-2 rounded-md bg-muted/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold">{event.type}</span>
                  <Badge variant="outline" className={getSeverityColor(event.severity)}>{event.severity}</Badge>
                </div>
                <div className="flex items-end justify-between">
                    <p className="text-sm text-muted-foreground max-w-[180px]">{event.message}</p>
                    <span className="text-xs text-muted-foreground">{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />

        {/* Device Status */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm">设备状态概览</span>
          </div>
          <div className="space-y-2">
             {deviceStatus.map(device => (
                 <div key={device.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${getDeviceStatusColor(device.status)}`}></span>
                        <span>{device.name}</span>
                    </div>
                    <span className="font-mono text-muted-foreground">{device.value}</span>
                </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
