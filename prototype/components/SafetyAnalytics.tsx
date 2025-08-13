import { TrendingUp, PieChart, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts'

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

export function SafetyAnalytics() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          安全数据趋势与分析
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
                  <BarChart data={hazardTrendData}>
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
                    <Bar dataKey="count" fill="hsl(var(--primary))" name="发现隐患" />
                    <Bar dataKey="resolved" fill="#16a34a" name="已处理" />
                  </BarChart>
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
  )
}