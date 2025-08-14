import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect as KonvaRect, Transformer, Circle as KonvaCircle, Line as KonvaLine } from 'react-konva';
import type { MapData, MapShape, MapDevice } from '../../types/map';
import type { KonvaEventObject } from 'konva/lib/Node';
import Konva from 'konva';
import { Shape, Device } from './MapObjects';
import { Grid } from './Grid';

type Tool = 'rect' | 'select' | 'camera' | 'plc' | 'circle' | 'polygon';
const LOCAL_STORAGE_KEY = 'map-editor-data';

  interface PropertiesPanelProps {
    selectedItem: {
        item: MapShape | MapDevice;
        type: 'shape' | 'device';
    } | null;
    onUpdate: (item: MapShape | MapDevice) => void;
    onDelete: () => void;
    onLayerChange: (direction: 'top' | 'up' | 'down' | 'bottom') => void;
    onCopy: () => void;
}
  const PropertiesPanel = ({ selectedItem, onUpdate, onDelete, onLayerChange, onCopy }: PropertiesPanelProps) => {
    if (!selectedItem || !selectedItem.item) {
      return (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">属性</h3>
          <p className="text-gray-500">请在画布中选择一个对象以编辑其属性。</p>
        </div>
      );
    }
  
    const { item, type } = selectedItem;
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      onUpdate({ ...item, [name]: type === 'checkbox' ? checked : value });
    };

    const handleColorChange = (name: string, value: string) => {
        onUpdate({ ...item, [name]: value });
    }
  
    return (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">编辑属性</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ID</label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.id}</p>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">名称</label>
            <input
              type="text"
              name="name"
              id="name"
              value={item.name || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {type === 'shape' && (
            <>
              <div>
                <label htmlFor="fillEnabled" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <input
                        type="checkbox"
                        name="fillEnabled"
                        id="fillEnabled"
                        checked={item.fillEnabled ?? true}
                        onChange={handleInputChange}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    启用填充
                </label>
              </div>
              <div>
                <label htmlFor="fill" className="block text-sm font-medium text-gray-700 dark:text-gray-300">填充颜色</label>
                <input
                  type="color"
                  name="fill"
                  id="fill"
                  value={item.fill}
                  onChange={handleInputChange}
                  className="mt-1 h-8 w-full"
                />
              </div>
              <div>
                <label htmlFor="stroke" className="block text-sm font-medium text-gray-700 dark:text-gray-300">描边颜色</label>
                <input
                  type="color"
                  name="stroke"
                  id="stroke"
                  value={item.stroke}
                  onChange={handleInputChange}
                  className="mt-1 h-8 w-full"
                />
              </div>
              <div>
                <label htmlFor="strokeWidth" className="block text-sm font-medium text-gray-700 dark:text-gray-300">描边宽度</label>
                <input
                  type="number"
                  name="strokeWidth"
                  id="strokeWidth"
                  value={item.strokeWidth}
                  onChange={handleInputChange}
                  min="0"
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="w-full border-t-2 border-gray-200 dark:border-gray-600 my-2 pt-4">
                <label htmlFor="fillPatternImageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">纹理图片URL</label>
                 <input
                    type="text"
                    name="fillPatternImageUrl"
                    id="fillPatternImageUrl"
                    value={item.fillPatternImageUrl || ''}
                    onChange={handleInputChange}
                    placeholder="https://example.com/texture.png"
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                {item.fillPatternImageUrl && (
                    <button
                        onClick={() => onUpdate({ ...item, fillPatternImageUrl: '' })}
                        className="mt-2 w-full px-3 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 text-sm"
                    >
                        清除纹理
                    </button>
                )}
              </div>
            </>
          )}
           <div className="w-full border-t-2 border-gray-200 dark:border-gray-600 my-2 pt-4 grid grid-cols-2 gap-2">
                <button onClick={() => onLayerChange('up')} className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-600 text-sm">上移一层</button>
                <button onClick={() => onLayerChange('top')} className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-600 text-sm">置于顶层</button>
                <button onClick={() => onLayerChange('down')} className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-600 text-sm">下移一层</button>
                <button onClick={() => onLayerChange('bottom')} className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-600 text-sm">置于底层</button>
           </div>
           <div className="w-full border-t-2 border-gray-200 dark:border-gray-600 my-2 pt-4 flex space-x-2">
                <button
                    onClick={onCopy}
                    className="w-full px-3 py-2 rounded-md bg-cyan-500 text-white hover:bg-cyan-600 text-sm"
                >
                    复制选中项 (Ctrl+D)
                </button>
                <button
                    onClick={onDelete}
                    className="w-full px-3 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600 text-sm"
                >
                    删除选中项
                </button>
            </div>
        </div>
      </div>
    );
  };


export function MapEditor() {
  const [mapData, setMapData] = useState<MapData>({
    shapes: [],
    devices: [],
    width: 1200,
    height: 800,
  });
  const [tool, setTool] = useState<Tool>('select');
  const [drawing, setDrawing] = useState(false);
  const [newRect, setNewRect] = useState<MapShape | null>(null);
  const [newCircle, setNewCircle] = useState<MapShape | null>(null);
  const [newPolygon, setNewPolygon] = useState<number[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isShiftDown, setIsShiftDown] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'shape' | 'device' | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setMapData(parsedData);
      } catch (error) {
        console.error("Failed to parse map data from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        handleDelete();
      }
      if (e.key === 'Enter' && tool === 'polygon' && newPolygon.length > 2) {
        handleCompletePolygon();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'd' && selectedId) {
        e.preventDefault();
        handleCopy();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedId, selectedType, tool, newPolygon]);

  const handleSave = () => {
    try {
      const dataString = JSON.stringify(mapData);
      localStorage.setItem(LOCAL_STORAGE_KEY, dataString);
      alert('地图已保存！');
    } catch (error) {
      console.error("Failed to save map data to localStorage", error);
      alert('保存失败！');
    }
  };

  const handleClear = () => {
    if(window.confirm('确定要清空所有编辑内容吗？此操作不可撤销。')) {
      const clearedData: MapData = { ...mapData, shapes: [], devices: [] };
      setMapData(clearedData);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }

  const handleDelete = () => {
    if (!selectedId) return;

    if (selectedType === 'shape') {
      setMapData(prev => ({
        ...prev,
        shapes: prev.shapes.filter(s => s.id !== selectedId),
      }));
    } else if (selectedType === 'device') {
      setMapData(prev => ({
        ...prev,
        devices: prev.devices.filter(d => d.id !== selectedId),
      }));
    }

    setSelectedId(null);
    setSelectedType(null);
  };

  const handleCopy = () => {
    if (!selectedId || !selectedType) return;

    const offset = 10;

    if (selectedType === 'shape') {
        const originalShape = mapData.shapes.find(s => s.id === selectedId);
        if (!originalShape) return;

        let newPoints = [...originalShape.points];
        if (originalShape.type === 'polygon') {
            newPoints = newPoints.map((p, i) => i % 2 === 0 ? p + offset : p + offset);
        } else {
            newPoints[0] += offset;
            newPoints[1] += offset;
        }

        const newShape: MapShape = {
            ...originalShape,
            id: `${originalShape.type}-${Date.now()}`,
            points: newPoints,
            name: `${originalShape.name || originalShape.type} (copy)`
        };
        
        setMapData(prev => ({...prev, shapes: [...prev.shapes, newShape]}));
        setSelectedId(newShape.id);
    } else if (selectedType === 'device') {
        const originalDevice = mapData.devices.find(d => d.id === selectedId);
        if (!originalDevice) return;

        const newDevice: MapDevice = {
            ...originalDevice,
            id: `${originalDevice.type}-${Date.now()}`,
            x: originalDevice.x + offset,
            y: originalDevice.y + offset,
            name: `${originalDevice.name || originalDevice.type} (copy)`
        };

        setMapData(prev => ({...prev, devices: [...prev.devices, newDevice]}));
        setSelectedId(newDevice.id);
    }
  }


  const getSnappedPos = (pos: {x: number, y: number}, lastPos: {x: number, y: number} | null, isShiftDown: boolean) => {
    if (!isShiftDown || !lastPos) return pos;

    const deltaX = Math.abs(pos.x - lastPos.x);
    const deltaY = Math.abs(pos.y - lastPos.y);

    if (deltaX < deltaY) {
      return { x: lastPos.x, y: pos.y };
    } else {
      return { x: pos.x, y: lastPos.y };
    }
  }

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    // deselect when clicking on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
      setSelectedType(null);
    }
    
    const currentTool = tool;
    const stage = e.target.getStage();
    const pos = stage?.getPointerPosition();
    if (!pos) return;

    if (currentTool === 'rect') {
      setDrawing(true);
      setNewRect({
        id: `rect-${Date.now()}`,
        type: 'rect',
        points: [pos.x, pos.y, pos.x, pos.y],
        fill: 'rgba(0, 0, 255, 0.5)',
        stroke: 'blue',
        strokeWidth: 2,
        rotation: 0,
        fillEnabled: true,
      });
    } else if (currentTool === 'circle') {
        setDrawing(true);
        setNewCircle({
          id: `circle-${Date.now()}`,
          type: 'circle',
          points: [pos.x, pos.y, 0],
          fill: 'rgba(255, 0, 0, 0.5)',
          stroke: 'red',
          strokeWidth: 2,
          fillEnabled: true,
        });
    } else if (currentTool === 'polygon') {
        setDrawing(true);
        const lastPoint = newPolygon.length >= 2 ? { x: newPolygon[newPolygon.length - 2], y: newPolygon[newPolygon.length - 1] } : null;
        const snappedPos = getSnappedPos(pos, lastPoint, e.evt.shiftKey);
        setNewPolygon(prev => [...prev, snappedPos.x, snappedPos.y]);
    } else if (currentTool === 'camera' || currentTool === 'plc') {
      const newDevice: MapDevice = {
        id: `${currentTool}-${Date.now()}`,
        type: currentTool,
        x: pos.x,
        y: pos.y,
        name: `${currentTool === 'camera' ? '摄像头' : 'PLC'} #${mapData.devices.length + 1}`,
      };

      setMapData(prev => ({
        ...prev,
        devices: [...prev.devices, newDevice],
      }));
      
      setTool('select');
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!drawing) return;
    const stage = e.target.getStage();
    if (!stage) return;
    const pos = stage.getPointerPosition();
    if (!pos) return;

    setMousePos(pos);
    setIsShiftDown(e.evt.shiftKey);

    if (tool === 'rect' && newRect) {
        const [startX, startY] = newRect.points;
        setNewRect({
          ...newRect,
          points: [startX, startY, pos.x, pos.y],
        });
    } else if (tool === 'circle' && newCircle) {
        const [startX, startY] = newCircle.points;
        const radius = Math.sqrt(Math.pow(pos.x - startX, 2) + Math.pow(pos.y - startY, 2));
        setNewCircle({
          ...newCircle,
          points: [startX, startY, radius],
        });
    }
  };

  const handleMouseUp = () => {
    if (!drawing) return;
    
    if (tool === 'rect' && newRect) {
        setDrawing(false);
        const [x1, y1, x2, y2] = newRect.points;
        const finalRect = {
            ...newRect,
            points: [
                Math.min(x1, x2),
                Math.min(y1, y2),
                Math.abs(x1 - x2),
                Math.abs(y1 - y2)
            ]
        };
        setMapData((prev) => ({ ...prev, shapes: [...prev.shapes, finalRect] }));
        setNewRect(null);

    } else if (tool === 'circle' && newCircle) {
        setDrawing(false);
        setMapData((prev) => ({ ...prev, shapes: [...prev.shapes, newCircle] }));
        setNewCircle(null);
    }
    
    if(tool !== 'polygon') {
      setTool('select');
    }
  };

  const handleCompletePolygon = () => {
    if (newPolygon.length < 4) { // Need at least 2 points (4 numbers)
      setDrawing(false);
      setNewPolygon([]);
      setTool('select');
      return;
    };

    const newShape: MapShape = {
        id: `polygon-${Date.now()}`,
        type: 'polygon',
        points: newPolygon,
        fill: 'rgba(0, 255, 0, 0.5)',
        stroke: 'green',
        strokeWidth: 2,
    };

    setMapData(prev => ({...prev, shapes: [...prev.shapes, newShape]}));
    setNewPolygon([]);
    setDrawing(false);
    setTool('select');
  }

  const updateShape = (updatedShape: MapShape) => {
    const newShapes = mapData.shapes.map(s => s.id === updatedShape.id ? updatedShape : s);
    setMapData(prev => ({ ...prev, shapes: newShapes }));
  };

  const updateDevice = (updatedDevice: MapDevice) => {
    const newDevices = mapData.devices.map(d => d.id === updatedDevice.id ? updatedDevice : d);
    setMapData(prev => ({ ...prev, devices: newDevices }));
  };

  const handleLayerOrderChange = (direction: 'top' | 'up' | 'down' | 'bottom') => {
    if (!selectedId || !selectedType) return;

    if (selectedType === 'shape') {
        const list = [...mapData.shapes];
        const index = list.findIndex(item => item.id === selectedId);
        if (index === -1) return;
        const item = list.splice(index, 1)[0];

        if (direction === 'top') {
            list.push(item);
        } else if (direction === 'up') {
            list.splice(Math.min(list.length, index + 1), 0, item);
        } else if (direction === 'down') {
            list.splice(Math.max(0, index - 1), 0, item);
        } else if (direction === 'bottom') {
            list.unshift(item);
        }
        setMapData(prev => ({...prev, shapes: list}));
    } else {
        const list = [...mapData.devices];
        const index = list.findIndex(item => item.id === selectedId);
        if (index === -1) return;
        const item = list.splice(index, 1)[0];
        
        if (direction === 'top') {
            list.push(item);
        } else if (direction === 'up') {
            list.splice(Math.min(list.length, index + 1), 0, item);
        } else if (direction === 'down') {
            list.splice(Math.max(0, index - 1), 0, item);
        } else if (direction === 'bottom') {
            list.unshift(item);
        }
        setMapData(prev => ({...prev, devices: list}));
    }
  }

  const selectedItem = selectedId ? {
      item: selectedType === 'shape' 
          ? mapData.shapes.find(s => s.id === selectedId)
          : mapData.devices.find(d => d.id === selectedId),
      type: selectedType
  } : null;

  return (
    <div className="w-full h-full flex flex-col items-center bg-gray-100 dark:bg-gray-800">
        <div className="p-2 bg-white dark:bg-gray-700 shadow-md rounded-lg my-2 flex flex-wrap space-x-2">
          <button
            onClick={() => { setTool('select'); setSelectedId(null); setSelectedType(null); }}
            className={`px-3 py-1 rounded-md ${tool === 'select' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}
          >
            选择/移动
          </button>
          <button
            onClick={() => setTool('rect')}
            className={`px-3 py-1 rounded-md ${tool === 'rect' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}
          >
            绘制矩形
          </button>
          <button
            onClick={() => setTool('circle')}
            className={`px-3 py-1 rounded-md ${tool === 'circle' ? 'bg-yellow-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}
          >
            绘制圆形
          </button>
          <button
            onClick={() => { setTool('polygon'); setNewPolygon([]); setDrawing(true); }}
            className={`px-3 py-1 rounded-md ${tool === 'polygon' ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}
          >
            绘制多边形 (Enter完成)
          </button>
          <button
            onClick={() => setTool('camera')}
            className={`px-3 py-1 rounded-md ${tool === 'camera' ? 'bg-sky-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}
          >
            标注摄像头
          </button>
          <button
            onClick={() => setTool('plc')}
            className={`px-3 py-1 rounded-md ${tool === 'plc' ? 'bg-orange-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}
          >
            标注PLC
          </button>
          <div className="border-l-2 border-gray-300 mx-2"></div>
          <button
            onClick={handleSave}
            className="px-3 py-1 rounded-md bg-teal-500 text-white hover:bg-teal-600"
          >
            保存地图
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            清空地图
          </button>
        </div>

        <div className="w-full flex-grow flex">
            <div className="w-72 flex-shrink-0 bg-white dark:bg-gray-700 shadow-lg overflow-y-auto">
                <PropertiesPanel
                    selectedItem={selectedItem}
                    onUpdate={selectedType === 'shape' ? updateShape : updateDevice}
                    onDelete={handleDelete}
                    onLayerChange={handleLayerOrderChange}
                    onCopy={handleCopy}
                />
            </div>
            <div className="flex-grow flex justify-center items-start">
                <Stage
                    width={mapData.width}
                    height={mapData.height}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    className="bg-white dark:bg-gray-900 shadow-inner"
                >
                    <Grid width={mapData.width} height={mapData.height} gridSize={20} />
                    <Layer>
                        {mapData.shapes.map((shape) => (
                        <Shape
                            key={shape.id}
                            shape={shape}
                            isSelected={shape.id === selectedId && selectedType === 'shape'}
                            onSelect={(id: string, type: 'shape' | 'device') => {
                                setSelectedId(id);
                                setSelectedType(type as 'shape');
                            }}
                            onChange={updateShape}
                        />
                        ))}
                        {mapData.devices.map(device => (
                        <Device
                            key={device.id}
                            device={device}
                            isSelected={device.id === selectedId && selectedType === 'device'}
                            onSelect={(id: string, type: 'shape' | 'device') => {
                                setSelectedId(id);
                                setSelectedType(type as 'device');
                            }}
                            onChange={updateDevice}
                        />
                        ))}
                        {newRect && (
                            <KonvaRect
                                x={Math.min(newRect.points[0], newRect.points[2])}
                                y={Math.min(newRect.points[1], newRect.points[3])}
                                width={Math.abs(newRect.points[0] - newRect.points[2])}
                                height={Math.abs(newRect.points[1] - newRect.points[3])}
                                fill={newRect.fill}
                                stroke={newRect.stroke}
                                strokeWidth={newRect.strokeWidth}
                                />
                        )}
                        {newCircle && (
                        <KonvaCircle
                            x={newCircle.points[0]}
                            y={newCircle.points[1]}
                            radius={newCircle.points[2]}
                            fill={newCircle.fill}
                            stroke={newCircle.stroke}
                            strokeWidth={newCircle.strokeWidth}
                        />
                        )}
                        {tool === 'polygon' && newPolygon.length > 0 && (
                        <KonvaLine
                            points={(() => {
                                const lastPoint = newPolygon.length >= 2 ? { x: newPolygon[newPolygon.length - 2], y: newPolygon[newPolygon.length - 1] } : null;
                                const snappedMousePos = getSnappedPos(mousePos, lastPoint, isShiftDown);
                                return [...newPolygon, snappedMousePos.x, snappedMousePos.y];
                            })()}
                            stroke="black"
                            strokeWidth={2}
                            lineCap="round"
                            lineJoin="round"
                            closed={false} // Preview is not closed
                        />
                        )}
                    </Layer>
                </Stage>
            </div>
        </div>
    </div>
  );
}
