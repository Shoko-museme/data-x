import { Shield, AlertTriangle, HardHat, Eye, Activity } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'

const kpiData = [
  {
    title: '实时安全评分',
    value: '98.5',
    unit: '分',
    icon: Shield,
    status: 'excellent',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: '综合算法动态计算'
  },
  {
    title: '今日报警统计',
    value: '12',
    details: [
      { label: '紧急', value: 2, color: 'bg-red-100 text-red-700' },
      { label: '未处理', value: 5, color: 'bg-orange-100 text-orange-700' },
      { label: '处理中', value: 3, color: 'bg-blue-100 text-blue-700' }
    ],
    icon: AlertTriangle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    title: '危险作业',
    value: '2',
    unit: '个进行中',
    icon: HardHat,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    description: '来自每日计划'
  },
  {
    title: '关键隐患',
    value: '8',
    unit: '个',
    icon: Eye,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: '今日发现 (AI巡查+系统预警)'
  },
  {
    title: '设备状态',
    details: [
      { label: '摄像头', value: '198/200', status: 'online' },
      { label: 'PLC', value: '48/50', status: 'online' }
    ],
    icon: Activity,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  }
]

export function KPISummaryBanner() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
                {kpi.status === 'excellent' && (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    优秀
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </h3>
                
                {kpi.value && (
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{kpi.value}</span>
                    {kpi.unit && (
                      <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                    )}
                  </div>
                )}
                
                {kpi.details && (
                  <div className="space-y-1">
                    {kpi.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {detail.label}
                        </span>
                        {detail.color ? (
                          <Badge className={`text-xs ${detail.color}`}>
                            {detail.value}
                          </Badge>
                        ) : (
                          <span className={`text-xs font-medium ${
                            detail.status === 'online' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {detail.value}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {kpi.description && (
                  <p className="text-xs text-muted-foreground">{kpi.description}</p>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}