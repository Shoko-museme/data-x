import { HardHat, Bot, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

const hazardousOperations = [
  {
    id: 1,
    name: '高空作业检修',
    location: '第二轧钢车间屋顶',
    timeSlot: '09:00-17:00',
    status: 'in-progress',
    workers: 3,
    supervisor: '张师傅'
  },
  {
    id: 2,
    name: '化学品罐清洗',
    location: '储罐区B-03',
    timeSlot: '14:00-18:00',
    status: 'in-progress',
    workers: 2,
    supervisor: '李工'
  },
  {
    id: 3,
    name: '电气系统维护',
    location: '配电房A区',
    timeSlot: '19:00-23:00',
    status: 'scheduled',
    workers: 4,
    supervisor: '王电工'
  }
]

const aiPatrolData = {
  lastPatrol: '14:30',
  patrolArea: '1#动力房',
  mainFindings: 2,
  findings: [
    '叉车超速行驶',
    '化学品未规范存放'
  ],
  suggestions: [
    '立即对叉车司机进行安全培训',
    '重新整理化学品存放区域标识'
  ],
  overallStatus: 'warning'
}

export function FocusAreaMonitoring() {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'in-progress':
        return {
          label: '进行中',
          class: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
          icon: Clock
        }
      case 'scheduled':
        return {
          label: '未开始',
          class: 'bg-gray-100 text-gray-700 hover:bg-gray-100',
          icon: Clock
        }
      case 'completed':
        return {
          label: '已完成',
          class: 'bg-green-100 text-green-700 hover:bg-green-100',
          icon: CheckCircle
        }
      default:
        return {
          label: '未知',
          class: 'bg-gray-100 text-gray-700 hover:bg-gray-100',
          icon: AlertCircle
        }
    }
  }

  return (
    <div className="space-y-4 h-full">
      {/* 危险作业监控 */}
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <HardHat className="h-5 w-5 text-orange-600" />
            今日危险作业/检修计划
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {hazardousOperations.map((operation) => {
            const statusConfig = getStatusConfig(operation.status)
            const StatusIcon = statusConfig.icon
            
            return (
              <div
                key={operation.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{operation.name}</h4>
                    <Badge className={`text-xs ${statusConfig.class}`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusConfig.label}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">地点:</span> {operation.location}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">时间:</span> {operation.timeSlot}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">人员:</span> {operation.workers}人 | 负责人: {operation.supervisor}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* AI安全专家巡查摘要 */}
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            AI安全专家巡查摘要
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 巡查状态 */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">最近巡查</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {aiPatrolData.lastPatrol}已完成对{aiPatrolData.patrolArea}的巡查
            </span>
          </div>

          {/* 核心结论 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">核心结论</span>
            </div>
            <p className="text-sm text-muted-foreground pl-6">
              发现{aiPatrolData.mainFindings}项主要隐患：
              {aiPatrolData.findings.join('、')}
            </p>
          </div>

          <Separator />

          {/* 整改建议 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">整改建议</span>
            </div>
            <ul className="space-y-1 pl-6">
              {aiPatrolData.suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  • {suggestion}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full">
              查看完整报告
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}