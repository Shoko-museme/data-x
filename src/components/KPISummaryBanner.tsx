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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon
        return (
          <Card key={index} className="transition-all hover:shadow-lg hover:border-primary/50">
            <CardContent className="p-6 h-full">
              <div className="flex flex-col justify-between h-full space-y-4">
                {/* Top Section: Icon and Title */}
                <div>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                      <Icon className={`h-8 w-8 ${kpi.color}`} />
                    </div>
                    {kpi.status === 'excellent' && (
                      <Badge variant="outline" className="border-green-600/50 bg-green-50 text-green-700">
                        优秀
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-base font-medium text-muted-foreground pt-4">
                    {kpi.title}
                  </h3>
                </div>

                {/* Middle Section: Value or Details */}
                <div className="flex-grow">
                  {kpi.value && (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-bold tracking-tight">{kpi.value}</span>
                      {kpi.unit && (
                        <span className="text-base text-muted-foreground">{kpi.unit}</span>
                      )}
                    </div>
                  )}
                  
                  {kpi.details && (
                    <div className="space-y-2 pt-1">
                      {kpi.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center justify-between text-base">
                          <span className="text-muted-foreground">{detail.label}</span>
                          {'color' in detail ? (
                            <Badge variant="secondary" className={`text-sm font-semibold ${detail.color}`}>
                              {detail.value}
                            </Badge>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className={`h-2 w-2 rounded-full ${
                                'status' in detail && detail.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                              }`} />
                              <span className="font-semibold">{detail.value}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Bottom Section: Description */}
                {kpi.description && (
                  <p className="text-sm text-muted-foreground pt-2">
                    {kpi.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
