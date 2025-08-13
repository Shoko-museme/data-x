export type RiskLevel = 'critical' | 'high' | 'medium' | 'low'

export interface FactoryAreaBase {
  id: number
  name: string
  riskLevel: RiskLevel
  // 可选：监控数据字段，编辑器不会直接使用，但 RiskHeatMap 需要
  summary?: {
    riskScore: number
    activeAlerts: number
    temperature: string
  }
  trendData?: Array<Record<string, any>>
  eventTypeData?: Array<{ name: string; value: number; color: string }>
}

export interface RectArea extends FactoryAreaBase {
  shapeType: 'rect'
  x: number
  y: number
  width: number
  height: number
}

export interface PolygonArea extends FactoryAreaBase {
  shapeType: 'polygon'
  /**
   * Points array in the form [x1, y1, x2, y2, ...],
   * all values normalized to the 0-100 SVG viewBox coordinate system.
   */
  points: number[]
}

export type FactoryArea = RectArea | PolygonArea
