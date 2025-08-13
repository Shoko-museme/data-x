// Dashboard相关的类型定义

// KPI数据类型
export interface KPIData {
  title: string
  value?: string
  unit?: string
  icon: any // Lucide图标组件类型
  status?: string
  color: string
  bgColor: string
  description?: string
  details?: Array<{
    label: string
    value: string | number
    color?: string
    status?: string
  }>
}

// 实时事件数据类型
export interface RealTimeEvent {
  id: number
  level: 'emergency' | 'critical' | 'warning' | 'info'
  type: string
  title: string
  location: string
  time: string
  icon: any // Lucide图标组件类型
  description: string
}

// 事件级别配置类型
export interface EventLevelConfig {
  color: string
  bgColor: string
  badgeClass: string
  label: string
}

// 危险作业操作类型
export interface HazardousOperation {
  id: number
  name: string
  location: string
  timeSlot: string
  status: 'in-progress' | 'scheduled' | 'completed'
  workers: number
  supervisor: string
}

// AI巡查数据类型
export interface AIPatrolData {
  lastPatrol: string
  patrolArea: string
  mainFindings: number
  findings: string[]
  suggestions: string[]
  overallStatus: 'normal' | 'warning' | 'critical'
}

// 工厂区域类型
export interface FactoryArea {
  id: number
  name: string
  x: number
  y: number
  width: number
  height: number
  riskLevel: 'critical' | 'high' | 'medium' | 'low'
  alerts: number
  temp: string
}

// 隐患趋势数据类型
export interface HazardTrendData {
  date: string
  count: number
  resolved: number
}

// 隐患类型数据类型
export interface HazardTypeData {
  name: string
  value: number
  color: string
}
