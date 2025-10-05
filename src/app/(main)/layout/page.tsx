"use client";

import { useState, useRef } from 'react';
import { useApp } from '../layout';
import { Table } from '@/types';

export default function LayoutPage() {
  const { tables, guests, updateTablePosition, t } = useApp();
  const [roomWidth, setRoomWidth] = useState(20);
  const [roomHeight, setRoomHeight] = useState(25);
  const roomRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (tableId: string, event: any) => {
    if (!roomRef.current) return;

    const rect = roomRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Clamp values between 0 and 100
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));

    updateTablePosition(tableId, clampedX, clampedY);
  };

  const autoArrange = () => {
    // Auto-arrange tables in a grid pattern
    const cols = Math.ceil(Math.sqrt(tables.length));
    tables.forEach((table, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const spacing = 80 / (cols + 1);
      const x = spacing * (col + 1) + 10;
      const y = spacing * (row + 1) + 10;
      updateTablePosition(table.id, x, y);
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t.layout.title}</h1>
        <p className="text-sm md:text-base text-gray-800">{t.layout.subtitle}</p>
      </div>

      {/* Room Size Controls */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 md:mb-8">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">{t.layout.roomSize}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              {t.layout.width}
            </label>
            <input
              type="number"
              min="5"
              max="50"
              value={roomWidth}
              onChange={(e) => setRoomWidth(Number(e.target.value))}
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              {t.layout.height}
            </label>
            <input
              type="number"
              min="5"
              max="50"
              value={roomHeight}
              onChange={(e) => setRoomHeight(Number(e.target.value))}
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-900"
            />
          </div>
          <div className="flex items-end sm:col-span-2 md:col-span-1">
            <button
              onClick={autoArrange}
              className="w-full px-4 md:px-6 py-2 text-sm md:text-base cursor-pointer bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              {t.layout.autoArrange}
            </button>
          </div>
        </div>
      </div>

      {/* Room Floor Plan */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
        {tables.length === 0 ? (
          <div className="text-center py-12 md:py-16 text-gray-700">
            <p className="text-base md:text-lg">{t.layout.noTables}</p>
            <p className="text-sm mt-2">{t.layout.noTablesDesc}</p>
          </div>
        ) : (
          <div
            ref={roomRef}
            className="relative bg-gray-50 border-2 md:border-4 border-gray-300 rounded-lg overflow-x-auto"
            style={{
              minHeight: `${Math.min(roomHeight * 20, 400)}px`,
              height: `${roomHeight * 30}px`,
              backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            {/* Room dimensions label */}
            <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs md:text-sm text-gray-700 font-medium z-10">
              {roomWidth}m × {roomHeight}m
            </div>

            {/* Tables */}
            {tables.map((table, index) => {
              // Auto-arrange tables in a grid if no position set
              let position = table.position;
              if (!position) {
                const cols = Math.ceil(Math.sqrt(tables.length));
                const row = Math.floor(index / cols);
                const col = index % cols;
                const spacing = 80 / (cols + 1);
                position = {
                  x: spacing * (col + 1) + 10,
                  y: spacing * (row + 1) + 10,
                };
              }

              const tableGuests = table.guests.map(gId => guests.find(g => g.id === gId)).filter(Boolean);
              const guestNames = tableGuests.map(g => g?.name || '');
              const isOverCapacity = table.guests.length > table.capacity;

              return (
                <DraggableTable
                  key={table.id}
                  table={table}
                  position={position}
                  guestCount={tableGuests.length}
                  guestNames={guestNames}
                  isOverCapacity={isOverCapacity}
                  onDragEnd={(event) => handleDragEnd(table.id, event)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

interface DraggableTableProps {
  table: Table;
  position: { x: number; y: number };
  guestCount: number;
  guestNames: string[];
  isOverCapacity: boolean;
  onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
}

function DraggableTable({ table, position, guestCount, guestNames, isOverCapacity, onDragEnd }: DraggableTableProps) {
  const size = table.type === 'round' ? 80 : 100;

  return (
    <div
      draggable
      onDragEnd={onDragEnd}
      className={`absolute cursor-move transition-all group ${
        isOverCapacity ? 'ring-4 ring-red-500' : ''
      }`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div
        className={`w-full h-full flex flex-col items-center justify-center text-white font-bold text-sm shadow-lg ${
          table.type === 'round' ? 'rounded-full' : 'rounded-lg'
        } ${
          isOverCapacity
            ? 'bg-red-600'
            : guestCount === table.capacity
            ? 'bg-green-600'
            : 'bg-purple-600'
        }`}
      >
        <div className="text-xs">{table.type === 'round' ? '🔵' : '🟦'}</div>
        <div>{table.name}</div>
        <div className="text-xs mt-1">
          {guestCount}/{table.capacity}
        </div>
      </div>

      {/* Hover tooltip with guest names */}
      {guestNames.length > 0 && (
        <div className="absolute hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg p-2 shadow-xl z-50 min-w-[150px] left-1/2 -translate-x-1/2 bottom-full mb-2">
          <div className="space-y-1">
            {guestNames.map((name, idx) => (
              <div key={idx} className="whitespace-nowrap">
                {idx + 1}. {name}
              </div>
            ))}
          </div>
          {/* Arrow pointing down */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}
