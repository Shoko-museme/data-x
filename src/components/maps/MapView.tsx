
import { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Group } from 'react-konva';
import type { MapData, Device as DeviceType } from '../../types/map';
import { Shape, Device } from './MapObjects';
import { Grid } from './Grid';
import { DeviceDetailPanel } from './DeviceDetailPanel';

interface MapViewProps {
  currentMap: string;
  currentFloor: string;
}

const LOCAL_STORAGE_KEY = 'map-editor-data';

export function MapView({ currentMap, currentFloor }: MapViewProps) {
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<DeviceType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        setMapData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to load map data", e);
      }
    } else {
        setMapData(null);
    }
    setSelectedDevice(null); // Reset selection when map changes
  }, [currentMap, currentFloor]); 

  useEffect(() => {
    const checkSize = () => {
        if (containerRef.current) {
            setSize({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight,
            });
        }
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const offsetX = mapData ? (size.width - mapData.width) / 2 : 0;
  const offsetY = mapData ? (size.height - mapData.height) / 2 : 0;

  const handleSelectDevice = (device: DeviceType) => {
    setSelectedDevice(device);
  };

  const handleClosePanel = () => {
    setSelectedDevice(null);
  };

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      {mapData && size.width > 0 ? (
        <Stage width={size.width} height={size.height}>
            <Grid width={size.width} height={size.height} gridSize={40} />
            <Layer>
                <Group x={offsetX} y={offsetY}>
                {mapData.shapes.map((shape) => (
                    <Shape key={shape.id} shape={shape} />
                ))}
                {mapData.devices.map(device => (
                    <Device key={device.id} device={device} onActivate={handleSelectDevice} />
                ))}
                </Group>
            </Layer>
        </Stage>
      ) : (
        <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-500">
                {!mapData ? "没有找到地图数据。请先进入编辑模式创建地图。" : "正在加载地图..."}
            </p>
        </div>
      )}
      {selectedDevice && (
        <DeviceDetailPanel device={selectedDevice} onClose={handleClosePanel} />
      )}
    </div>
  );
}
