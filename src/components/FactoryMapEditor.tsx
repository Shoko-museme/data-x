import { useState, useRef, useEffect } from 'react'
import { Stage, Layer, Rect, Transformer } from 'react-konva'

import { factoryAreas as initialAreas } from '../data/factoryAreas'
import type { FactoryArea, RectArea } from '../types/factoryArea'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'

interface AreaShapeProps {
  area: RectArea
  isSelected: boolean
  onSelect: () => void
  onChange: (newAttrs: Partial<RectArea>) => void
}

function AreaShape({ area, isSelected, onSelect, onChange }: AreaShapeProps) {
  const shapeRef = useRef<any>(null)
  const trRef = useRef<any>(null)

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current])
      trRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  return (
    <>
      <Rect
        ref={shapeRef}
        x={area.x}
        y={area.y}
        width={area.width}
        height={area.height}
        fill={getRiskColor(area.riskLevel)}
        opacity={0.6}
        stroke={isSelected ? 'blue' : '#fff'}
        strokeWidth={isSelected ? 1 : 0.2}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={e => {
          onChange({ x: e.target.x(), y: e.target.y() })
        }}
        onTransformEnd={e => {
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          // reset scale to avoid double transform
          node.scaleX(1)
          node.scaleY(1)
          onChange({
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          })
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit minimum size
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </>
  )
}

const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'critical':
      return '#dc2626'
    case 'high':
      return '#ea580c'
    case 'medium':
      return '#ca8a04'
    case 'low':
      return '#16a34a'
    default:
      return '#6b7280'
  }
}

export function FactoryMapEditor() {
  const [areas, setAreas] = useState<FactoryArea[]>(initialAreas)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const deselect = () => setSelectedId(null)

  const updateArea = (id: number, newAttrs: Partial<RectArea>) => {
    setAreas(prev =>
      prev.map(a =>
        a.id === id ? { ...a, ...(newAttrs as any) } : a
      )
    )
  }

  const handleSave = () => {
    // 仅保存基础几何和风险等级等字段，保留其它业务字段
    const content =
      `import { FactoryArea } from '../types/factoryArea'\n\n` +
      `export const factoryAreas: FactoryArea[] = ${JSON.stringify(areas, null, 2)}\n`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'factoryAreas.ts'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>厂区地图编辑器（矩形 Beta）</CardTitle>
        <div className="flex gap-2 mt-2">
          <Button size="sm" onClick={() => setSelectedId(null)} variant="secondary">
            取消选择
          </Button>
          <Button size="sm" onClick={handleSave}>
            保存为 TS
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <Stage
          width={600}
          height={500}
          onMouseDown={e => {
            // deselect when clicked on empty area
            if (e.target === e.target.getStage()) {
              deselect()
            }
          }}
          style={{ background: '#f3f4f6' }}
        >
          <Layer>
            {areas.map(area =>
              area.shapeType === 'rect' ? (
                <AreaShape
                  key={area.id}
                  area={area as RectArea}
                  isSelected={area.id === selectedId}
                  onSelect={() => setSelectedId(area.id)}
                  onChange={newAttrs => updateArea(area.id, newAttrs)}
                />
              ) : null
            )}
          </Layer>
        </Stage>
      </CardContent>
    </Card>
  )
}
