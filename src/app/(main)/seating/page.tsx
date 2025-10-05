"use client";

import { useState } from 'react';
import { useApp } from '../layout';
import { Guest, Table } from '@/types';
import { getTranslations } from '@/lib/i18n';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';

export default function SeatingPage() {
  const { guests, tables, assignGuestToTable, removeGuestFromTable, addTable, t, showAlert } = useApp();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [isAutoAssigning, setIsAutoAssigning] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleAutoAssign = () => {
    const unassigned = guests.filter(g => !g.tableId);
    if (unassigned.length === 0) {
      showAlert(t.seating.autoAssign, t.seating.autoAssignNoGuests);
      return;
    }

    setIsAutoAssigning(true);

    // Group guests by their primary tag (first tag or 'Mixed' if no tag)
    const guestsByGroup: { [key: string]: Guest[] } = {};
    unassigned.forEach(guest => {
      const primaryTag = guest.tags[0] || 'Mixed';
      if (!guestsByGroup[primaryTag]) guestsByGroup[primaryTag] = [];
      guestsByGroup[primaryTag].push(guest);
    });

    let tablesCreated = 0;
    const tableCapacity = 8;

    // For each group, create tables and assign guests
    Object.entries(guestsByGroup).forEach(([groupName, groupGuests]) => {
      const numTablesNeeded = Math.ceil(groupGuests.length / tableCapacity);

      for (let i = 0; i < numTablesNeeded; i++) {
        const tableNumber = tables.length + tablesCreated + 1;
        const tableName = groupName === 'Mixed'
          ? `Stol ${tableNumber}`
          : `${groupName} ${i + 1}`;

        const guestsForThisTable = groupGuests.slice(i * tableCapacity, (i + 1) * tableCapacity);

        const newTable = {
          name: tableName,
          type: 'round' as const,
          capacity: tableCapacity,
          guests: [],
        };

        const tableId = addTable(newTable);
        tablesCreated++;

        // Assign each guest to this table
        guestsForThisTable.forEach(guest => {
          assignGuestToTable(guest.id, tableId);
        });
      }
    });

    // Show success message
    setTimeout(() => {
      const message = t.seating.autoAssignSuccess
        .replace('{tables}', tablesCreated.toString())
        .replace('{guests}', unassigned.length.toString());
      showAlert(t.seating.autoAssign, message);
      setIsAutoAssigning(false);
    }, 300);
  };

  const unassignedGuests = guests.filter(g => !g.tableId);
  const allTags = Array.from(new Set(guests.flatMap(g => g.tags)));

  const filteredGuests = unassignedGuests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !filterTag || guest.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const guestId = active.id as string;
      const targetId = over.id as string;

      // Check if dropping on a table
      const table = tables.find(t => t.id === targetId);
      if (table) {
        assignGuestToTable(guestId, targetId);
      }
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const activeGuest = guests.find(g => g.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t.seating.title}</h1>
              <p className="text-sm md:text-base text-gray-700">
                {t.seating.subtitle}
              </p>
            </div>
            <button
              onClick={handleAutoAssign}
              disabled={isAutoAssigning}
              className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base cursor-pointer bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isAutoAssigning && (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {t.seating.autoAssign}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Panel - Unassigned Guests */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md lg:sticky lg:top-4">
              <div className="p-3 sm:p-4 bg-purple-50 border-b">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                  {t.seating.unassignedGuests} ({unassignedGuests.length})
                </h2>

                <input
                  type="text"
                  placeholder={t.seating.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 text-sm text-gray-900 placeholder-gray-500"
                />

                {allTags.length > 0 && (
                  <select
                    value={filterTag}
                    onChange={(e) => setFilterTag(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                  >
                    <option value="">{t.seating.allTags}</option>
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                )}
              </div>

              <div className="p-3 sm:p-4 space-y-2 max-h-[400px] md:max-h-[600px] overflow-y-auto">
                {filteredGuests.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    {unassignedGuests.length === 0
                      ? t.seating.allAssigned
                      : t.seating.noMatch}
                  </p>
                ) : (
                  filteredGuests.map(guest => (
                    <DraggableGuest key={guest.id} guest={guest} />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Tables */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
                {t.seating.tablesTitle} ({tables.length})
              </h2>

              {tables.length === 0 ? (
                <div className="text-center py-12 md:py-16 text-gray-500">
                  <p className="text-base md:text-lg mb-2">{t.seating.noTablesMsg}</p>
                  <p className="text-sm">{t.seating.noTablesDesc}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {tables.map(table => {
                    const isOverCapacity = table.guests.length > table.capacity;
                    const isFull = table.guests.length === table.capacity;
                    const tableGuests = table.guests
                      .map((gId: string) => guests.find(g => g.id === gId))
                      .filter((g): g is Guest => g !== undefined);

                    return (
                      <DroppableTable
                        key={table.id}
                        table={table}
                        guests={tableGuests}
                        isOverCapacity={isOverCapacity}
                        isFull={isFull}
                        onRemoveGuest={removeGuestFromTable}
                        t={t}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeGuest ? (
          <div className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-xl font-semibold">
            {activeGuest.name}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

// Draggable Guest Component
function DraggableGuest({ guest }: { guest: Guest }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: guest.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 bg-gray-50 border-2 border-gray-200 rounded-lg cursor-move hover:border-purple-400 hover:bg-purple-50 transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="font-semibold text-gray-900">{guest.name}</div>
      {guest.tags.length > 0 && (
        <div className="flex gap-1 mt-1 flex-wrap">
          {guest.tags.map((tag: string, idx: number) => (
            <span
              key={idx}
              className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Droppable Table Component
function DroppableTable({
  table,
  guests,
  isOverCapacity,
  isFull,
  onRemoveGuest,
  t,
}: {
  table: Table;
  guests: Guest[];
  isOverCapacity: boolean;
  isFull: boolean;
  onRemoveGuest: (guestId: string) => void;
  t: ReturnType<typeof getTranslations>;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: table.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 border-2 rounded-xl transition-all min-h-[200px] ${
        isOver
          ? 'border-purple-500 bg-purple-50 scale-105'
          : isOverCapacity
          ? 'border-red-500 bg-red-50'
          : isFull
          ? 'border-green-500 bg-green-50'
          : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-900">
            {table.type === 'round' ? '🔵' : '🟦'} {table.name}
          </h3>
          <p
            className={`text-sm font-semibold ${
              isOverCapacity ? 'text-red-600' : 'text-gray-700'
            }`}
          >
            {table.guests.length} / {table.capacity} {t.tables.seats}
            {isOverCapacity && ' ⚠️'}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {guests.map((guest: Guest) => (
          <div
            key={guest.id}
            className="flex items-center justify-between p-2 bg-white rounded border border-gray-200 group"
          >
            <span className="text-sm font-medium text-gray-900">{guest.name}</span>
            <button
              onClick={() => onRemoveGuest(guest.id)}
              className="text-red-600 hover:bg-red-50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-xs"
            >
              ✕
            </button>
          </div>
        ))}

        {guests.length === 0 && !isOver && (
          <p className="text-sm text-gray-400 italic text-center py-8">
            {t.seating.dragHere}
          </p>
        )}

        {isOver && (
          <div className="text-sm text-purple-600 font-semibold text-center py-8 animate-pulse">
            {t.seating.dropHere}
          </div>
        )}
      </div>
    </div>
  );
}
