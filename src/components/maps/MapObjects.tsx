import React, { useState, useRef, useEffect } from 'react';
import { Rect as KonvaRect, Transformer, Circle as KonvaCircle, Line as KonvaLine, Image as KonvaImage, Text as KonvaText } from 'react-konva';
import type { MapShape, MapDevice } from '../../types/map';
import Konva from 'konva';
import cameraIconUrl from '../../assets/monitor.png';
import plcIconUrl from '../../assets/plc.png';

interface ShapeProps {
    shape: MapShape;
    isSelected?: boolean;
    onSelect?: (id: string, type: 'shape') => void;
    onChange?: (shape: MapShape) => void;
}

export const Shape = ({ shape, isSelected, onSelect = () => {}, onChange = () => {} }: ShapeProps) => {
  const shapeRef = useRef<Konva.Rect | Konva.Circle | Konva.Line>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const [image, setImage] = useState<HTMLImageElement>();

  useEffect(() => {
    if (shape.fillPatternImageUrl) {
        const img = new window.Image();
        img.src = shape.fillPatternImageUrl;
        img.onload = () => {
            setImage(img);
        };
    } else {
        setImage(undefined);
    }
  }, [shape.fillPatternImageUrl]);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);
  
  const handleTransformEnd = () => {
    const node = shapeRef.current;
    if (!node) return;

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    
    node.scaleX(1);
    node.scaleY(1);

    if (shape.type === 'rect') {
        onChange({
          ...shape,
          points: [
            node.x(),
            node.y(),
            Math.max(5, (node as Konva.Rect).width() * scaleX),
            Math.max(5, (node as Konva.Rect).height() * scaleY),
          ],
          rotation: node.rotation(),
        });
    } else if (shape.type === 'circle') {
        onChange({
            ...shape,
            points: [
              node.x(),
              node.y(),
              (node as Konva.Circle).radius() * scaleX,
            ],
          });
    } else if (shape.type === 'polygon') {
        const line = node as Konva.Line;
        const newPoints = line.points().map((point, i) => {
            if (i % 2 === 0) return point * scaleX + line.x();
            return point * scaleY + line.y();
        });
        line.x(0);
        line.y(0);
        line.scaleX(1);
        line.scaleY(1);

        onChange({
            ...shape,
            points: newPoints,
            rotation: node.rotation()
        })
    }
  };

  if (shape.type === 'rect') {
    const [x, y, width, height] = shape.points;
    return (
        <>
        <KonvaRect
          ref={shapeRef as React.Ref<Konva.Rect>}
          x={x}
          y={y}
          width={width}
          height={height}
          rotation={shape.rotation}
          fill={shape.fill}
          stroke={shape.stroke}
          strokeWidth={shape.strokeWidth}
          fillEnabled={shape.fillEnabled}
          fillPatternImage={image}
          onClick={() => onSelect(shape.id, 'shape')}
          onTap={() => onSelect(shape.id, 'shape')}
          onTransformEnd={handleTransformEnd}
          draggable={isSelected}
          onDragEnd={(e) => {
            onChange({
              ...shape,
              points: [e.target.x(), e.target.y(), width, height],
            });
          }}
        />
        {shape.name && (
            <KonvaText
                x={x}
                y={y}
                width={width}
                height={height}
                text={shape.name}
                fontSize={16}
                fontStyle="bold"
                fill="black"
                align="center"
                verticalAlign="middle"
                listening={false} // don't listen to events on text
            />
        )}
        {isSelected && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
            rotateEnabled={true}
          />
        )}
      </>
    )
  }

  if (shape.type === 'circle') {
    const [x, y, radius] = shape.points;
    return (
        <>
            <KonvaCircle
                ref={shapeRef as React.Ref<Konva.Circle>}
                x={x}
                y={y}
                radius={radius}
                fill={shape.fill}
                stroke={shape.stroke}
                strokeWidth={shape.strokeWidth}
                fillEnabled={shape.fillEnabled}
                fillPatternImage={image}
                onClick={() => onSelect(shape.id, 'shape')}
                onTap={() => onSelect(shape.id, 'shape')}
                onTransformEnd={handleTransformEnd}
                draggable={isSelected}
                onDragEnd={(e) => {
                    onChange({
                        ...shape,
                        points: [e.target.x(), e.target.y(), radius],
                    });
                }}
            />
            {shape.name && (
                <KonvaText
                    x={x - radius}
                    y={y - radius}
                    width={radius * 2}
                    height={radius * 2}
                    text={shape.name}
                    fontSize={16}
                    fontStyle="bold"
                    fill="black"
                    align="center"
                    verticalAlign="middle"
                    listening={false}
                />
            )}
            {isSelected && <Transformer ref={trRef} rotateEnabled={false} />}
        </>
    )
  }

  if (shape.type === 'polygon') {
    return (
        <>
            <KonvaLine
                ref={shapeRef as React.Ref<Konva.Line>}
                points={shape.points}
                fill={shape.fill}
                stroke={shape.stroke}
                strokeWidth={shape.strokeWidth}
                closed={true}
                fillEnabled={shape.fillEnabled}
                fillPatternImage={image}
                onClick={() => onSelect(shape.id, 'shape')}
                onTap={() => onSelect(shape.id, 'shape')}
                draggable={isSelected}
                onDragEnd={(e) => {
                    const line = e.target as Konva.Line;
                    const newPoints = line.points().map((point: number, i: number) => {
                        if (i % 2 === 0) return point + line.x();
                        return point + line.y();
                    });
                    line.x(0);
                    line.y(0);
                    onChange({...shape, points: newPoints});
                }}
            />
            {shape.name && (() => {
                const points = shape.points;
                let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
                for (let i = 0; i < points.length; i += 2) {
                    minX = Math.min(minX, points[i]);
                    minY = Math.min(minY, points[i+1]);
                    maxX = Math.max(maxX, points[i]);
                    maxY = Math.max(maxY, points[i+1]);
                }
                const width = maxX - minX;
                const height = maxY - minY;
                
                return (
                    <KonvaText
                        x={minX}
                        y={minY}
                        width={width}
                        height={height}
                        text={shape.name}
                        fontSize={16}
                        fontStyle="bold"
                        fill="black"
                        align="center"
                        verticalAlign="middle"
                        listening={false}
                    />
                );
            })()}
             {isSelected && <Transformer ref={trRef} rotateEnabled={true} />}
        </>
    )
  }

  return null;
};

interface DeviceProps {
    device: MapDevice;
    isSelected?: boolean;
    onSelect?: (id: string, type: 'device') => void;
    onChange?: (device: MapDevice) => void;
    onActivate?: (device: MapDevice) => void;
}
export const Device = ({ device, isSelected, onSelect = () => {}, onChange = () => {}, onActivate }: DeviceProps) => {
    const shapeRef = useRef<Konva.Image>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const [image, setImage] = useState<HTMLImageElement>();

    const iconUrl = device.type === 'camera' ? cameraIconUrl : plcIconUrl;
  
    useEffect(() => {
        const img = new window.Image();
        img.src = iconUrl;
        img.onload = () => {
            setImage(img);
        };
    }, [iconUrl]);
  
    useEffect(() => {
      if (isSelected && trRef.current && shapeRef.current) {
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer()?.batchDraw();
      }
    }, [isSelected]);
  
    return (
      <>
        <KonvaImage
          ref={shapeRef}
          key={device.id}
          x={device.x}
          y={device.y}
          image={image}
          width={device.width || 24}
          height={device.height || 24}
          draggable={isSelected}
          onClick={(e) => {
            if (isSelected) {
              onSelect(device.id, 'device');
            } else if (onActivate) {
              onActivate(device);
            }
          }}
          onTap={() => {
            if (!isSelected && onActivate) {
                onActivate(device);
            } else {
                onSelect(device.id, 'device')
            }
          }}
          onDragEnd={(e) => {
            onChange({ ...device, x: e.target.x(), y: e.target.y() });
          }}
          onTransformEnd={() => {
            const node = shapeRef.current;
            if (!node) return;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            node.scaleX(1);
            node.scaleY(1);

            onChange({
                ...device,
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
            flipEnabled={false}
            enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          />
        )}
      </>
    );
  };
