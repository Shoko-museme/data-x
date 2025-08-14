import { useState } from 'react'
import { X, AlertCircle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import type { AIPatrolData } from '@/types/patrol'

const aiPatrolData: AIPatrolData = {
  lastPatrol: '14:30',
  patrolArea: '1#生产线',
  mainFindings: 2,
  findings: [
    '叉车超速行驶',
    '化学品未规范存放'
  ],
  suggestions: [
    '立即对叉车司机进行安全培训',
    '重新整理化学品存放区域标识'
  ],
  overallStatus: 'warning'
}

export function AIPatrolPanel() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 浮动按钮 */}
      <Button
        aria-label={isOpen ? '关闭AI智能巡查面板' : '打开AI智能巡查面板'}
        onClick={() => setIsOpen(!isOpen)}
        className="h-24 w-24 rounded-full shadow-lg bg-white hover:bg-gray-100 p-0 flex items-center justify-center"
        size="lg"
      >
        <img src="/qwen-color.svg" alt="AI 巡查" className="h-12 w-12" />
      </Button>

      {/* 展开的面板 */}
      {isOpen && (
        <div className="absolute bottom-36 right-0 w-96">
          <Card className="shadow-xl border-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <img src="/qwen-color.svg" alt="AI 巡查" className="h-6 w-6" />
                  AI 智能巡查
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0"
                  aria-label="关闭AI智能巡查面板"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <CardDescription className="text-base">
                最近一次巡查于 {aiPatrolData.lastPatrol} 在 {aiPatrolData.patrolArea} 完成
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-base">主要发现 ({aiPatrolData.mainFindings} 项)</h4>
                <Separator />
                <ul className="space-y-2 text-base">
                  {aiPatrolData.findings.map((finding, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 mt-0.5 text-yellow-600 flex-shrink-0" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-base">处理建议</h4>
                <Separator />
                <ul className="space-y-2 text-base">
                  {aiPatrolData.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 mt-0.5 text-green-600 flex-shrink-0" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button className="w-full text-base py-3">
                查看完整巡查报告
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
