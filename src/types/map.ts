export interface MapShape {
  id: string;
  type: 'rect' | 'polygon' | 'circle';
  points: number[];
  fill: string;
  stroke: string;
  strokeWidth: number;
  name?: string;
  rotation?: number;
  fillPatternImageUrl?: string;
  fillEnabled?: boolean;
}

export interface MapDevice {
  id: string;
  x: number;
  y: number;
  type: 'camera' | 'plc';
  name: string;
  status?: 'ok' | 'warning' | 'error';
  width?: number;
  height?: number;
}

export interface MapData {
  shapes: MapShape[];
  devices: MapDevice[];
  backgroundImage?: string;
  width: number;
  height: number;
}
