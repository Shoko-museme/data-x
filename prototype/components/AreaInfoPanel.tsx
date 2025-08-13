import { AlertTriangle, CheckCircle, Clock, Wrench, Bell } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

const maintenanceTasks = [
  { id: 1, task: 'HVAC System Check', status: 'pending', time: '09:00 AM' },
  { id: 2, task: 'Fire Safety Inspection', status: 'completed', time: '08:30 AM' },
  { id: 3, task: 'Elevator Maintenance', status: 'in-progress', time: '10:00 AM' }
]

const alarmEvents = [
  { id: 1, type: 'Security', message: 'Unauthorized access attempt - Room 204', severity: 'high', time: '08:45 AM' },
  { id: 2, type: 'Fire', message: 'Smoke detector triggered - Kitchen Area', severity: 'critical', time: '07:30 AM' },
  { id: 3, type: 'System', message: 'Network connectivity issue - Server Room', severity: 'medium', time: '07:15 AM' }
]

interface AreaInfoPanelProps {
  currentArea: string
}

export function AreaInfoPanel({ currentArea }: AreaInfoPanelProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />
      default:
        return <Wrench className="h-4 w-4 text-orange-600" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700 hover:bg-red-100'
      case 'high':
        return 'bg-orange-100 text-orange-700 hover:bg-orange-100'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100'
    }
  }

  return (
    <Card className="absolute top-4 right-4 z-40 w-80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Area Information
        </CardTitle>
        <CardDescription>
          Current area: {currentArea} • Today's overview
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Maintenance Tasks */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Maintenance Tasks</span>
          </div>
          <div className="space-y-2">
            {maintenanceTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  {getStatusIcon(task.status)}
                  <div>
                    <div className="text-sm font-medium">{task.task}</div>
                    <div className="text-xs text-muted-foreground">{task.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Alarm Events */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Recent Alarms</span>
          </div>
          <div className="space-y-2">
            {alarmEvents.map((alarm) => (
              <div key={alarm.id} className="p-2 rounded-lg bg-muted/50">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getSeverityColor(alarm.severity)}>
                        {alarm.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alarm.time}</span>
                    </div>
                    <div className="text-sm font-medium">{alarm.type}</div>
                    <div className="text-xs text-muted-foreground mt-1">{alarm.message}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <Separator />
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-green-600">12</div>
            <div className="text-xs text-muted-foreground">Sensors OK</div>
          </div>
          <div>
            <div className="text-xl font-bold text-orange-600">3</div>
            <div className="text-xs text-muted-foreground">Alerts</div>
          </div>
          <div>
            <div className="text-xl font-bold text-blue-600">85%</div>
            <div className="text-xs text-muted-foreground">Occupancy</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}