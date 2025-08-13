// 所有类型定义的导出文件

// Dashboard相关类型
export type {
  KPIData,
  RealTimeEvent,
  EventLevelConfig,
  HazardousOperation,
  AIPatrolData,
  FactoryArea,
  HazardTrendData,
  HazardTypeData,
} from './dashboard'

// 项目管理相关类型
export type {
  ProjectAssignee,
  ProjectEntry,
  ProjectStatusConfig,
  PriorityConfig,
} from './projects'

// UI组件相关类型
export type {
  NavBarProps,
  RealTimeEventStreamProps,
  RiskHeatMapProps,
  ButtonVariant,
  ButtonSize,
  BadgeVariant,
  CardProps,
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
} from './ui'

// 页面类型
export type PageType = 'overview' | 'maps' | 'projects' | 'analytics' | 'reports'

// 应用状态类型
export interface AppState {
  currentPage: PageType
  highlightedLocation: string
}

// 通用响应类型
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

// 分页类型
export interface Pagination {
  page: number
  pageSize: number
  total: number
  hasNext: boolean
  hasPrev: boolean
}

// 列表响应类型
export interface ListResponse<T> extends ApiResponse<T[]> {
  pagination?: Pagination
}
