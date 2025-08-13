import { FileText, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
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
  },
  {
    id: 4,
    name: '受限空间作业',
    location: '反应釜R-101',
    timeSlot: '08:00-12:00',
    status: 'completed',
    workers: 2,
    supervisor: '刘工'
  },
  {
    id: 5,
    name: '动火作业',
    location: '管道维修区',
    timeSlot: '10:00-11:30',
    status: 'in-progress',
    workers: 3,
    supervisor: '赵师傅'
  },
  {
    id: 6,
    name: '临时用电',
    location: '新建仓库区',
    timeSlot: '全天',
    status: 'in-progress',
    workers: 5,
    supervisor: '孙电工'
  }
]

function HazardousOperationsCard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-sm">进行中</Badge>
      case 'scheduled':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800 text-sm">未开始</Badge>
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 text-sm">已完成</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-6 w-6 text-muted-foreground" />
          今日危险作业
        </CardTitle>
        <CardDescription className="text-base">
          进行中的和计划中的高风险作业活动
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <div className="h-full overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-base">作业名称</TableHead>
                <TableHead className="text-base">地点</TableHead>
                <TableHead className="text-base">状态</TableHead>
                <TableHead className="text-right text-base">详情</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hazardousOperations.map((op) => (
                <TableRow key={op.id}>
                  <TableCell className="font-medium text-base">{op.name}</TableCell>
                  <TableCell className="text-base">{op.location}</TableCell>
                  <TableCell>{getStatusBadge(op.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export function FocusAreaMonitoring() {
  return (
    <HazardousOperationsCard />
  )
}
