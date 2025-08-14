import { useState, useEffect } from 'react'
import { MapPin, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Separator } from './ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts'
import { factoryAreas as fallbackAreas } from '../data/factoryAreas'
import type { FactoryArea, RectArea } from '../types/factoryArea'

const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'critical': return '#dc2626';
    case 'high': return '#ea580c';
    case 'medium': return '#ca8a04';
    case 'low': return '#16a34a';
    default: return '#6b7280';
  }
}

interface AreaDetailPanelProps {
  area: FactoryArea;
}

function AreaDetailPanel({ area }: AreaDetailPanelProps) {
    const [activeTab, setActiveTab] = useState('trend');
    const [timeRange, setTimeRange] = useState('day');
    
    // Dummy data for year/month - to be implemented
    const trendDataYear = [ { month: '1月', alerts: 150 }, { month: '2月', alerts: 180 }, /* ... */ ];
    const trendDataMonth = [ { date: '1', alerts: 5 }, { date: '2', alerts: 8 }, /* ... */ ];

    const getTrendData = () => {
        switch(timeRange) {
            case 'year': return trendDataYear;
            case 'month': return trendDataMonth;
            case 'day':
            default:
                return area.trendData;
        }
    }
    
    const getXAxisKey = () => {
        switch(timeRange) {
            case 'year': return 'month';
            case 'month': return 'date';
            case 'day':
            default:
                return 'day';
        }
    }

    return (
        <div className="pt-4 animate-in fade-in-50 duration-500">
            <h3 className="text-xl font-bold mb-4">{area.name} - 详细分析</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-base">
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <div className="text-muted-foreground">风险评分</div>
                    <div className="text-3xl font-bold">{area.summary?.riskScore ?? 'N/A'}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <div className="text-muted-foreground">实时报警</div>
                    <div className="text-3xl font-bold">{area.summary?.activeAlerts ?? 'N/A'}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <div className="text-muted-foreground">区域温度</div>
                    <div className="text-3xl font-bold">{area.summary?.temperature ?? 'N/A'}</div>
                </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="trend">报警趋势</TabsTrigger>
                    <TabsTrigger value="distribution">事件分布</TabsTrigger>
                </TabsList>
                <TabsContent value="trend">
                     <div className="mt-4">
                        <div className="flex justify-end gap-2 mb-2">
                            <Button variant={timeRange === 'year' ? 'default' : 'outline'} size="sm" onClick={() => setTimeRange('year')}>年</Button>
                            <Button variant={timeRange === 'month' ? 'default' : 'outline'} size="sm" onClick={() => setTimeRange('month')}>月</Button>
                            <Button variant={timeRange === 'day' ? 'default' : 'outline'} size="sm" onClick={() => setTimeRange('day')}>日</Button>
                        </div>
                        <div className="h-52">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsLineChart data={getTrendData()} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <XAxis dataKey={getXAxisKey()} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                                    <Line type="monotone" dataKey="alerts" name="报警次数" stroke="hsl(var(--primary))" strokeWidth={2} />
                                </RechartsLineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="distribution">
                     <div className="mt-4 h-60">
                         <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                                <Pie data={area.eventTypeData ?? []} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} label>
                                    {(area.eventTypeData ?? []).map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                                <Legend iconSize={10} />
                            </RechartsPieChart>
                        </ResponsiveContainer>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

interface RiskHeatMapProps {
  highlightedLocation: string;
}

export function RiskHeatMap({ highlightedLocation }: RiskHeatMapProps) {
  const [factoryAreas, setFactoryAreas] = useState<FactoryArea[]>(fallbackAreas)
  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(1)

  useEffect(() => {
    import('../data/factoryAreas')
      .then(module => {
        setFactoryAreas(module.factoryAreas)
      })
      .catch(err => {
        console.warn('Could not load edited factoryAreas.ts, using fallback. Error:', err)
        setFactoryAreas(fallbackAreas)
      })
  }, [])

  useEffect(() => {
    if (highlightedLocation) {
      const area = factoryAreas.find((a: FactoryArea) => a.name === highlightedLocation);
      if (area) {
        setSelectedAreaId(area.id);
      }
    }
  }, [highlightedLocation, factoryAreas]);

  const selectedArea = factoryAreas.find((a: FactoryArea) => a.id === selectedAreaId);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-6 w-6 text-red-600" />
          工厂风险热力图
        </CardTitle>
         <CardDescription className="text-base">
            点击地图区域查看下方的详细风险分析数据
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <div className="relative bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 h-72">
            <svg viewBox="0 0 100 85" className="w-full h-full">
              {factoryAreas.map((area: FactoryArea) => {
                if (area.shapeType !== 'rect') return null
                const rectArea = area as RectArea
                const { x, y, width, height, rotation = 0 } = rectArea

                return (
                  <g 
                    key={area.id} 
                    onClick={() => setSelectedAreaId(area.id)} 
                    className="cursor-pointer"
                    transform={`translate(${x}, ${y}) rotate(${rotation})`}
                  >
                    <rect
                      x={0} y={0} width={width} height={height}
                      fill={getRiskColor(area.riskLevel)}
                      fillOpacity={selectedAreaId === area.id ? 0.9 : 0.6}
                      stroke={selectedAreaId === area.id ? 'hsl(var(--primary))' : '#fff'}
                      strokeWidth={selectedAreaId === area.id ? 0.8 : 0.2}
                      className="transition-all duration-200"
                    />
                     <text
                        x={width / 2} y={height / 2}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize={3} fill="#fff" fontWeight="bold"
                        className="pointer-events-none"
                    >
                        {area.name}
                    </text>
                  </g>
                )
              })}
            </svg>
        </div>

        {selectedArea ? (
            <>
                <Separator className="my-4" />
                <div className="flex-1 overflow-y-auto">
                    <AreaDetailPanel area={selectedArea} />
                </div>
            </>
        ) : (
            <div className="flex flex-col items-center justify-center flex-1 text-center text-muted-foreground p-8">
                <Info className="h-12 w-12 mb-2" />
                <h3 className="text-lg font-semibold">请选择一个区域</h3>
                <p className="text-sm">点击上方地图上的任意区域以查看详情。</p>
            </div>
        )}
      </CardContent>
    </Card>
  )
}
