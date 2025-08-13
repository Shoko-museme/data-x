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
    name: 'API Integration',
    status: 'Completed',
    assignee: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      initials: 'EW'
    },
    priority: 'High',
    dueDate: '2024-12-15',
    progress: 100
  },
  {
    id: 'PRJ-004',
    name: 'Database Migration',
    status: 'In Progress',
    assignee: {
      name: 'Alex Kumar',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      initials: 'AK'
    },
    priority: 'Low',
    dueDate: '2024-12-30',
    progress: 45
  },
  {
    id: 'PRJ-005',
    name: 'Security Audit',
    status: 'On Hold',
    assignee: {
      name: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      initials: 'LP'
    },
    priority: 'Medium',
    dueDate: '2024-12-28',
    progress: 10
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-700 hover:bg-green-100'
    case 'In Progress':
      return 'bg-blue-100 text-blue-700 hover:bg-blue-100'
    case 'Planning':
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
    case 'On Hold':
      return 'bg-gray-100 text-gray-700 hover:bg-gray-100'
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-100'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-700 hover:bg-red-100'
    case 'Medium':
      return 'bg-orange-100 text-orange-700 hover:bg-orange-100'
    case 'Low':
      return 'bg-green-100 text-green-700 hover:bg-green-100'
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-100'
  }
}

export function EntriesTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Manage and track your active projects</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button variant="ghost" size="sm" className="gap-1">
                  ID
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" className="gap-1">
                  Project Name
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" className="gap-1">
                  Due Date
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entriesData.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.id}</TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(entry.status)}>
                    {entry.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={entry.assignee.avatar} alt={entry.assignee.name} />
                      <AvatarFallback className="text-xs">{entry.assignee.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{entry.assignee.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getPriorityColor(entry.priority)}>
                    {entry.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(entry.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${entry.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground w-10 text-right">
                      {entry.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Project</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Delete Project
                      </DropdownMenuItem>
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