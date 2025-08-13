import type { FactoryArea } from '../types/factoryArea'

export const factoryAreas: FactoryArea[] = [
  { id: 1, name: '1号车间', shapeType: 'rect', x: 15, y: 20, width: 25, height: 20, riskLevel: 'high',
    summary: { riskScore: 82, activeAlerts: 3, temperature: '28°C' },
    trendData: [
      { day: '周一', alerts: 5 }, { day: '周二', alerts: 8 }, { day: '周三', alerts: 6 },
      { day: '周四', alerts: 9 }, { day: '周五', alerts: 12 }, { day: '周六', alerts: 7 }, { day: '今日', alerts: 3 }
    ],
    eventTypeData: [
      { name: '设备异常', value: 2, color: '#ea580c' },
      { name: '安全违规', value: 1, color: '#ca8a04' }
    ]
  },
  {
    id: 2, name: '2号车间', shapeType: 'rect', x: 45, y: 20, width: 25, height: 20, riskLevel: 'medium',
    summary: { riskScore: 65, activeAlerts: 1, temperature: '24°C' },
    trendData: [
        { day: '周一', alerts: 2 }, { day: '周二', alerts: 3 }, { day: '周三', alerts: 4 },
        { day: '周四', alerts: 2 }, { day: '周五', alerts: 5 }, { day: '周六', alerts: 3 }, { day: '今日', alerts: 1 }
    ],
    eventTypeData: [
      { name: '设备异常', value: 1, color: '#ea580c' }
    ]
  },
  { id: 3, name: '3号车间', shapeType: 'rect', x: 75, y: 20, width: 20, height: 20, riskLevel: 'low',
    summary: { riskScore: 30, activeAlerts: 0, temperature: '22°C' }, trendData: [], eventTypeData: [] },
  { id: 4, name: '储罐区', shapeType: 'rect', x: 15, y: 50, width: 20, height: 15, riskLevel: 'critical',
    summary: { riskScore: 95, activeAlerts: 5, temperature: '32°C' }, trendData: [], eventTypeData: [] },
  { id: 5, name: '装卸区', shapeType: 'rect', x: 40, y: 50, width: 30, height: 15, riskLevel: 'medium',
    summary: { riskScore: 58, activeAlerts: 2, temperature: '26°C' }, trendData: [], eventTypeData: [] },
  { id: 6, name: '办公区', shapeType: 'rect', x: 75, y: 50, width: 20, height: 15, riskLevel: 'low',
    summary: { riskScore: 15, activeAlerts: 0, temperature: '23°C' }, trendData: [], eventTypeData: [] },
  { id: 7, name: '配电房', shapeType: 'rect', x: 15, y: 70, width: 15, height: 10, riskLevel: 'high',
    summary: { riskScore: 88, activeAlerts: 2, temperature: '30°C' }, trendData: [], eventTypeData: [] },
  { id: 8, name: '维修区', shapeType: 'rect', x: 35, y: 70, width: 20, height: 10, riskLevel: 'medium',
    summary: { riskScore: 55, activeAlerts: 1, temperature: '25°C' }, trendData: [], eventTypeData: [] },
  { id: 9, name: '停车场', shapeType: 'rect', x: 60, y: 70, width: 35, height: 10, riskLevel: 'low',
    summary: { riskScore: 10, activeAlerts: 0, temperature: '21°C' }, trendData: [], eventTypeData: [] }
]
