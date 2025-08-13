import { MoreHorizontal, ArrowUpDown, Filter, Download } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

const entriesData = [
  {
    id: 'PRJ-001',
    name: 'Website Redesign',
    status: 'In Progress',
    assignee: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      initials: 'SC'
    },
    priority: 'High',
    dueDate: '2024-12-20',
    progress: 75
  },
  {
    id: 'PRJ-002',
    name: 'Mobile App Development',
    status: 'Planning',
    assignee: {
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      initials: 'MJ'
    },
    priority: 'Medium',
    dueDate: '2024-12-25',
    progress: 20
  },
  {
    id: 'PRJ-003',
    name: 'Database Migration',
    status: 'Completed',
    assignee: {
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      initials: 'ER'
    },
    priority: 'High',
    dueDate: '2024-12-15',
    progress: 100
  },
  {
    id: 'PRJ-004',
    name: 'API Integration',
    status: 'Review',
    assignee: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      initials: 'DK'
    },
    priority: 'Low',
    dueDate: '2024-12-30',
    progress: 90
  }
]

const getStatusBadge = (status: string) => {
  const variants = {
    'Completed': 'bg-green-100 text-green-700 hover:bg-green-100',
    'In Progress': 'bg-blue-100 text-blue-700 hover:bg-blue-100',
    'Planning': 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
    'Review': 'bg-orange-100 text-orange-700 hover:bg-orange-100'
  }
  return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-700 hover:bg-gray-100'
}

const getPriorityBadge = (priority: string) => {
  const variants = {
    'High': 'bg-red-100 text-red-700 hover:bg-red-100',
    'Medium': 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
    'Low': 'bg-green-100 text-green-700 hover:bg-green-100'
  }
  return variants[priority as keyof typeof variants] || 'bg-gray-100 text-gray-700 hover:bg-gray-100'
}

export function EntriesTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>项目列表</CardTitle>
            <CardDescription>管理和跟踪所有项目的进度</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                  项目
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>状态</TableHead>
              <TableHead>负责人</TableHead>
              <TableHead>优先级</TableHead>
              <TableHead>到期日期</TableHead>
              <TableHead>进度</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entriesData.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{entry.name}</div>
                    <div className="text-sm text-muted-foreground">{entry.id}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${getStatusBadge(entry.status)}`}>
                    {entry.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={entry.assignee.avatar} />
                      <AvatarFallback>{entry.assignee.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{entry.assignee.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${getPriorityBadge(entry.priority)}`}>
                    {entry.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{entry.dueDate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${entry.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{entry.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>查看详情</DropdownMenuItem>
                      <DropdownMenuItem>编辑</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">删除</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
