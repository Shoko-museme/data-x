import { MapPin, Layers, Zap, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

export function MapsPage() {
  return (
    <main className="container mx-auto px-6 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">地图监控</h1>
          <p className="text-muted-foreground">实时查看工厂区域监控状态</p>
        </div>

        {/* Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Map Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  工厂平面图
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <div className="h-full bg-gray-100 rounded-lg flex items-center justify-center text-muted-foreground">
                  {/* Placeholder for actual map component */}
                  <div className="text-center space-y-4">
                    <MapPin className="h-16 w-16 mx-auto text-gray-400" />
                    <div>
                      <p className="text-lg font-medium">地图组件</p>
                      <p className="text-sm">集成实际地图功能后在此显示</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Map Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  图层控制
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">摄像头</span>
                  <Button variant="outline" size="sm">显示</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">传感器</span>
                  <Button variant="outline" size="sm">显示</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">报警区域</span>
                  <Button variant="outline" size="sm">显示</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">人员位置</span>
                  <Button variant="outline" size="sm">隐藏</Button>
                </div>
              </CardContent>
            </Card>

            {/* Current Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  当前报警
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-2 bg-red-50 rounded-lg">
                    <div className="h-2 w-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">火焰检测</p>
                      <p className="text-xs text-muted-foreground">2号车间-A区</p>
                      <Badge className="text-xs bg-red-100 text-red-700 hover:bg-red-100">紧急</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 p-2 bg-yellow-50 rounded-lg">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">设备异常</p>
                      <p className="text-xs text-muted-foreground">3号生产线</p>
                      <Badge className="text-xs bg-yellow-100 text-yellow-700 hover:bg-yellow-100">警告</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 p-2 bg-orange-50 rounded-lg">
                    <div className="h-2 w-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">人员闯入</p>
                      <p className="text-xs text-muted-foreground">北侧围墙</p>
                      <Badge className="text-xs bg-orange-100 text-orange-700 hover:bg-orange-100">重要</Badge>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  查看全部报警
                </Button>
              </CardContent>
            </Card>

            {/* Device Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  设备状态
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">摄像头</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-600">198/200</span>
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">温度传感器</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-600">45/48</span>
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">烟雾检测器</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-yellow-600">32/35</span>
                      <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">PLC控制器</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-600">48/50</span>
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  设备详情
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
