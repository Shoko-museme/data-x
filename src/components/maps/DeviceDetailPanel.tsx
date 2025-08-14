import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Video, Shield, HardDrive, Bell } from 'lucide-react';
import type { Device } from '@/types/map';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface DeviceDetailPanelProps {
  device: Device;
  onClose: () => void;
}

const recentEvents = [
    { id: 1, type: '人员闯入', message: '在摄像头监控区域发现未授权人员', severity: '紧急', time: '11:05' },
    { id: 2, type: '设备离线', message: '摄像头信号中断超过5分钟', severity: '重要', time: '09:30' },
]

const getSeverityColor = (severity: string) => {
    switch (severity) {
      case '紧急':
        return 'border-red-500/50 text-red-500';
      case '重要':
        return 'border-orange-500/50 text-orange-500';
      default:
        return 'border-yellow-500/50 text-yellow-500';
    }
}

export function DeviceDetailPanel({ device, onClose }: DeviceDetailPanelProps) {
  if (!device) return null;

  return (
    <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[400px] bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 border shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <HardDrive className="h-5 w-5" />
          {device.name}
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2"><Shield className="h-4 w-4" />设备状态</h3>
            <div className="text-sm text-muted-foreground">
              <p>ID: {device.id}</p>
              <p>状态: <span className="text-green-500">正常</span></p>
              <p>位置: ({device.x}, {device.y})</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2"><Bell className="h-4 w-4" />相关安全事件</h3>
            <div className="space-y-2">
                {recentEvents.map((event) => (
                  <div key={event.id} className="p-2 rounded-md bg-muted/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold">{event.type}</span>
                      <Badge variant="outline" className={getSeverityColor(event.severity)}>{event.severity}</Badge>
                    </div>
                    <div className="flex items-end justify-between">
                        <p className="text-sm text-muted-foreground max-w-[240px]">{event.message}</p>
                        <span className="text-xs text-muted-foreground">{event.time}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          
          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2"><Video className="h-4 w-4" />视频流</h3>
            <div className="aspect-video bg-black rounded-md flex items-center justify-center">
                <p className="text-white">实时视频流</p>
            </div>
            <Button className="w-full mt-2">调整视频流</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
