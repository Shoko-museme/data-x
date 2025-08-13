// UI组件相关的类型定义

// 导航栏Props类型
export interface NavBarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

// 实时事件流Props类型
export interface RealTimeEventStreamProps {
  onLocationClick?: (location: string) => void
}

// 风险热力图Props类型
export interface RiskHeatMapProps {
  highlightedLocation?: string
}

// 按钮变体类型
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'

// 按钮尺寸类型
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

// 徽章变体类型
export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

// 卡片Props类型
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

// 表格相关类型
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  className?: string
}

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  className?: string
}

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  className?: string
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  className?: string
}
