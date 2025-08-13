import { HardHat, Bot, Clock, CheckCircle, AlertCircle, FileText, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const hazardousOperations = [
  {
    id: 1,
    name: '高空作业检修',
    location: '2号车间屋顶',
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
  patrolArea: '1号生产线',
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

function HazardousOperationsCard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">进行中</Badge>
      case 'scheduled':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">未开始</Badge>
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">已完成</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          今日危险作业
        </CardTitle>
        <CardDescription>
          进行中的和计划中的高风险作业活动
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>作业名称</TableHead>
              <TableHead>地点</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">详情</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hazardousOperations.map((op) => (
              <TableRow key={op.id}>
                <TableCell className="font-medium">{op.name}</TableCell>
                <TableCell>{op.location}</TableCell>
                <TableCell>{getStatusBadge(op.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function AIPatrolCard() {
  return(
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <img src="/qwen-color.svg" alt="AI Patrol Icon" className="h-5 w-5" />
                AI 智能巡查
            </CardTitle>
            <CardDescription>
                最近一次巡查于 {aiPatrolData.lastPatrol} 在 {aiPatrolData.patrolArea} 完成
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-sm">主要发现 ({aiPatrolData.mainFindings} 项)</h4>
                <Separator />
                <ul className="space-y-2 text-sm">
                    {aiPatrolData.findings.map((finding, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 mt-0.5 text-yellow-600 flex-shrink-0" />
                            <span>{finding}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-sm">处理建议</h4>
                <Separator />
                <ul className="space-y-2 text-sm">
                    {aiPatrolData.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                            <span>{suggestion}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <Button className="w-full">
                查看完整巡查报告
            </Button>
        </CardContent>
    </Card>
  )
}

export function FocusAreaMonitoring() {
  return (
    <div className="space-y-6">
      <HazardousOperationsCard />
      <AIPatrolCard />
    </div>
  )
}
