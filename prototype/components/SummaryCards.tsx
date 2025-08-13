import { Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'

const summaryData = [
  {
    title: 'Tasks Completed',
    value: '247',
    subtitle: 'out of 320 total',
    progress: 77,
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    title: 'In Progress',
    value: '42',
    subtitle: 'active tasks',
    progress: 13,
    icon: Clock,
    color: 'text-blue-600'
  },
  {
    title: 'Overdue',
    value: '8',
    subtitle: 'need attention',
    progress: 3,
    icon: AlertCircle,
    color: 'text-red-600'
  },
  {
    title: 'This Week',
    value: '23',
    subtitle: 'tasks due',
    progress: 7,
    icon: Calendar,
    color: 'text-orange-600'
  }
]

export function SummaryCards() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2>Project Summary</h2>
        <span className="text-sm text-muted-foreground">Last updated 2 hours ago</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item, index) => {
          const Icon = item.icon
          return (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${item.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold">{item.value}</div>
                    <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}