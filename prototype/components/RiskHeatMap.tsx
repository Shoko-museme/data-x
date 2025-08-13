import { useState } from 'react'
import { MapPin, TrendingUp, PieChart, BarChart3, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts'

// Mock factory areas with risk levels
const factoryAreas = [
  { id: 1, name: '1号车间', x: 15, y: 20, width: 25, height: 20, riskLevel: 'high', alerts: 3, temp: '28°C' },
  { id: 2, name: '2号车间', x: 45, y: 20, width: 25, height: 20, riskLevel: 'medium', alerts: 1, temp: '24°C' },
  { id: 3, name: '3号车间', x: 75, y: 20, width: 20, height: 20, riskLevel: 'low', alerts: 0, temp: '22°C' },
  { id: 4, name: '储罐区', x: 15, y: 50, width: 20, height: 15, riskLevel: 'critical', alerts: 5, temp: '32°C' },
  { id: 5, name: '装卸区', x: 40, y: 50, width: 30, height: 15, riskLevel: 'medium', alerts: 2, temp: '26°C' },
  { id: 6, name: '办公区', x: 75, y: 50, width: 20, height: 15, riskLevel: 'low', alerts: 0, temp: '23°C' },
  { id: 7, name: '配电房', x: 15, y: 70, width: 15, height: 10, riskLevel: 'high', alerts: 2, temp: '30°C' },
  { id: 8, name: '维修区', x: 35, y: 70, width: 20, height: 10, riskLevel: 'medium', alerts: 1, temp: '25°C' },
  { id: 9, name: '停车场', x: 60, y: 70, width: 35, height: 10, riskLevel: 'low', alerts: 0, temp: '21°C' }
]

// Mock data for hazard trends (30 days)
const hazardTrendData = [
  { date: '12-01', count: 8, resolved: 6 },
  { date: '12-02', count: 12, resolved: 9 },
  { date: '12-03', count: 6, resolved: 5 },
  { date: '12-04', count: 15, resolved: 12 },
  { date: '12-05', count: 9, resolved: 8 },
  { date: '12-06', count: 11, resolved: 10 },
  { date: '12-07', count: 7, resolved: 6 },
  { date: '12-08', count: 13, resolved: 11 },
  { date: '12-09', count: 10, resolved: 8 },
  { date: '12-10', count: 14, resolved: 13 },
  { date: '12-11', count: 8, resolved: 7 },
  { date: '12-12', count: 16, resolved: 14 },
  { date: '12-13', count: 11, resolved: 9 },
  { date: '12-14', count: 7, resolved: 6 }
]

// Mock data for hazard types distribution
const hazardTypeData = [
  { name: '人员违章', value: 35, color: '#dc2626' },
  { name: '设备异常', value: 28, color: '#ea580c' },
  { name: '环境风险', value: 22, color: '#ca8a04' },
  { name: '工艺安全', value: 10, color: '#16a34a' },
  { name: '其他', value: 5, color: '#6b7280' }
]

const COLORS = ['#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#6b7280']

const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'critical':
      return '#dc2626' // red-600
    case 'high':
      return '#ea580c' // orange-600
    case 'medium':
      return '#ca8a04' // yellow-600
    case 'low':
      return '#16a34a' // green-600
    default:
      return '#6b7280' // gray-500
  }
}

const getRiskBadgeClass = (riskLevel: string) => {
  switch (riskLevel) {
    case 'critical':
      return 'bg-red-100 text-red-700 hover:bg-red-100'
    case 'high':
      return 'bg-orange-100 text-orange-700 hover:bg-orange-100'
    case 'medium':
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
    case 'low':
      return 'bg-green-100 text-green-700 hover:bg-green-100'
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-100'
  }
}

const getRiskLabel = (riskLevel: string) => {
  switch (riskLevel) {
    case 'critical':
      return '严重'
    case 'high':
      return '高风险'
    case 'medium':
      return '中风险'
    case 'low':
      return '低风险'
    default:
      return '未知'
  }
}

interface RiskHeatMapProps {
  onAreaSelect?: (areaId: number) => void
  highlightedLocation?: string
}

export function RiskHeatMap({ onAreaSelect, highlightedLocation }: RiskHeatMapProps) {
  const [selectedArea, setSelectedArea] = useState<number | null>(null)
  const [hoveredArea, setHoveredArea] = useState<number | null>(null)

  const handleAreaClick = (areaId: number) => {
    setSelectedArea(areaId)
    onAreaSelect?.(areaId)
  }

  const selectedAreaData = selectedArea ? factoryAreas.find(area => area.id === selectedArea) : null

  return (
    <div className="space-y-4 h-full">
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-600" />
            厂区风险热力图
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gray-50 rounded-lg overflow-hidden" style={{ aspectRatio: '16/10' }}>
            {/* SVG Factory Map */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Grid background */}
              <defs>
                <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                  <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#f3f4f6" strokeWidth="0.2"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />

              {/* Factory boundary */}
              <rect
                x="10" y="10" width="85" height="80"
                fill="none" stroke="#e5e7eb" strokeWidth="0.5" rx="2"
              />

              {/* Roads/Pathways */}
              <rect x="10" y="45" width="85" height="3" fill="#e2e8f0" />
              <rect x="35" y="10" width="3" height="80" fill="#e2e8f0" />
              <rect x="70" y="10" width="3" height="80" fill="#e2e8f0" />

              {/* Factory Areas */}
              {factoryAreas.map((area) => {
                const isHovered = hoveredArea === area.id
                const isSelected = selectedArea === area.id
                const isHighlighted = highlightedLocation?.includes(area.name)
                
                return (
                  <g key={area.id}>
                    <rect
                      x={area.x} y={area.y}
                      width={area.width} height={area.height}
                      fill={getRiskColor(area.riskLevel)}
                      fillOpacity={isSelected ? 0.8 : isHovered ? 0.6 : 0.4}
                      stroke={isHighlighted ? '#3b82f6' : isSelected ? '#1f2937' : getRiskColor(area.riskLevel)}
                      strokeWidth={isHighlighted ? 1 : isSelected ? 0.8 : 0.4}
                      rx="1"
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredArea(area.id)}
                      onMouseLeave={() => setHoveredArea(null)}
                      onClick={() => handleAreaClick(area.id)}
                    />
                    <text
                      x={area.x + area.width / 2} y={area.y + area.height / 2}
                      textAnchor="middle" dominantBaseline="middle"
                      className="text-xs fill-white pointer-events-none font-medium"
                      fontSize="2.5"
                    >
                      {area.name}
                    </text>
                    {area.alerts > 0 && (
                      <circle
                        cx={area.x + area.width - 3} cy={area.y + 3}
                        r="2" fill="#dc2626"
                        className="animate-pulse"
                      />
                    )}
                  </g>
                )
              })}
            </svg>

            {/* Hover tooltip */}
            {hoveredArea && (
              <div className="absolute top-2 left-2 bg-white/95 backdrop-blur border rounded-lg p-2 shadow-lg text-xs">
                {(() => {
                  const area = factoryAreas.find(a => a.id === hoveredArea)
                  if (!area) return null
                  return (
                    <div className="space-y-1">
                      <div className="font-medium">{area.name}</div>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getRiskBadgeClass(area.riskLevel)}`}>
                          {getRiskLabel(area.riskLevel)}
                        </Badge>
                        <span className="text-muted-foreground">温度: {area.temp}</span>
                      </div>
                      {area.alerts > 0 && (
                        <div className="text-red-600">
                          <AlertTriangle className="h-3 w-3 inline mr-1" />
                          {area.alerts} 个报警
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>
            )}

            {/* Legend */}
            <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur border rounded-lg p-2 text-xs">
              <div className="space-y-1">
                <div className="font-medium mb-2">风险等级</div>
                {[
                  { level: 'critical', label: '严重' },
                  { level: 'high', label: '高风险' },
                  { level: 'medium', label: '中风险' },
                  { level: 'low', label: '低风险' }
                ].map(({ level, label }) => (
                  <div key={level} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: getRiskColor(level) }}
                    ></div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Area Analytics Panel */}
      {selectedAreaData && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span>{selectedAreaData.name} - 安全数据分析</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedArea(null)}
              >
                ×
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="trends" className="h-full">
              <TabsList className="grid w-full grid-cols-2 mx-6">
                <TabsTrigger value="trends" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  隐患趋势图
                </TabsTrigger>
                <TabsTrigger value="types" className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  隐患类型占比
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="trends" className="px-6 pb-6 mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      最近30天隐患发现与处理情况
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded"></div>
                        <span>发现隐患</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-600 rounded"></div>
                        <span>已处理</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={hazardTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          fontSize={12}
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                          fontSize={12}
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                            fontSize: '12px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="count" 
                          stroke="hsl(var(--primary))" 
                          name="发现隐患"
                          strokeWidth={2}
                          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="resolved" 
                          stroke="#16a34a" 
                          name="已处理"
                          strokeWidth={2}
                          dot={{ fill: '#16a34a', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-bold text-primary">148</div>
                      <div className="text-xs text-muted-foreground">总计发现</div>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-bold text-green-600">126</div>
                      <div className="text-xs text-muted-foreground">已处理</div>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-bold text-orange-600">85%</div>
                      <div className="text-xs text-muted-foreground">处理率</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="types" className="px-6 pb-6 mt-4">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    各类隐患占比分析，帮助定位主要安全问题
                  </p>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={hazardTypeData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                          fontSize={12}
                        >
                          {hazardTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                            fontSize: '12px'
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-2">
                    {hazardTypeData.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">{item.value}</span>
                          <span className="text-xs text-muted-foreground">起</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}