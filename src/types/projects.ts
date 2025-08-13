// 项目管理相关的类型定义

// 项目成员类型
export interface ProjectAssignee {
  name: string
  avatar: string
  initials: string
}

// 项目条目类型
export interface ProjectEntry {
  id: string
  name: string
  status: 'Completed' | 'In Progress' | 'Planning' | 'Review'
  assignee: ProjectAssignee
  priority: 'High' | 'Medium' | 'Low'
  dueDate: string
  progress: number
}

// 项目状态配置类型
export interface ProjectStatusConfig {
  [key: string]: string
}

// 优先级配置类型
export interface PriorityConfig {
  [key: string]: string
}
