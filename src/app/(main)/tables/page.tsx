"use client";

import { useState } from 'react';
import { useApp } from '../layout';

export default function TablesPage() {
  const { tables, addTable, updateTable, deleteTable, guests, t, showConfirm } = useApp();
  const [name, setName] = useState('');
  const [type, setType] = useState<'round' | 'rectangle'>('round');
  const [capacity, setCapacity] = useState('8');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState<'round' | 'rectangle'>('round');
  const [editCapacity, setEditCapacity] = useState('8');

  const handleAddTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !capacity) return;

    addTable({
      name: name.trim(),
      type,
      capacity: parseInt(capacity),
      guests: [],
    });

    setName('');
    setCapacity('8');
  };

  const startEdit = (id: string) => {
    const table = tables.find(t => t.id === id);
    if (table) {
      setEditingId(id);
      setEditName(table.name);
      setEditType(table.type);
      setEditCapacity(table.capacity.toString());
    }
  };

  const saveEdit = () => {
    if (editingId) {
      updateTable(editingId, {
        name: editName.trim(),
        type: editType,
        capacity: parseInt(editCapacity),
      });
      setEditingId(null);
      setEditName('');
      setEditCapacity('8');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditCapacity('8');
  };

  const getTotalCapacity = () => tables.reduce((sum, t) => sum + t.capacity, 0);
  const getTotalAssigned = () => tables.reduce((sum, t) => sum + t.guests.length, 0);
  const getAvailableSeats = () => getTotalCapacity() - getTotalAssigned();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t.tables.title}</h1>
          <p className="text-sm md:text-base text-gray-700 mt-1">
            {t.tables.totalTables}: {tables.length} | {t.tables.capacity}: {getTotalCapacity()} | {t.tables.filled}: {getTotalAssigned()} | {t.tables.available}: {getAvailableSeats()}
          </p>
        </div>
      </div>

      {/* Add Table Form */}
      <form onSubmit={handleAddTable} className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-6 md:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.tables.tableName}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.tables.namePlaceholder}
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.tables.tableType}
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'round' | 'rectangle')}
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
            >
              <option value="round">{t.tables.round}</option>
              <option value="rectangle">{t.tables.rectangle}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.tables.capacity}
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div className="flex items-end sm:col-span-2 md:col-span-1">
            <button
              type="submit"
              className="w-full px-4 md:px-6 py-2 text-sm md:text-base cursor-pointer bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              {t.tables.addTable}
            </button>
          </div>
        </div>
      </form>

      {/* Quick Add Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {[
          { name: t.tables.namePlaceholder, type: 'round' as const, capacity: 8 },
          { name: t.tables.namePlaceholder.replace('1', '2'), type: 'round' as const, capacity: 10 },
          { name: 'VIP ' + t.tables.namePlaceholder.split(' ')[0], type: 'rectangle' as const, capacity: 6 },
          { name: t.tables.brideGroom, type: 'rectangle' as const, capacity: 2 },
        ].map((preset, idx) => (
          <button
            key={idx}
            onClick={() => {
              const num = tables.filter(t => t.name.startsWith(preset.name.split(' ')[0])).length + 1;
              const tableName = preset.name.includes('Stol') || preset.name.includes('Table') ? `${preset.name.split(' ')[0]} ${num}` : preset.name;
              addTable({
                name: tableName,
                type: preset.type,
                capacity: preset.capacity,
                guests: [],
              });
            }}
            className="px-3 md:px-4 py-2 md:py-3 cursor-pointer bg-purple-100 hover:bg-purple-200 border-2 border-purple-300 rounded-lg transition-colors text-xs md:text-sm font-semibold text-gray-900"
          >
            {preset.type === 'round' ? '🔵' : '🟦'} <span className="hidden sm:inline">{preset.name}</span><span className="sm:hidden">{preset.name.split(' ')[0]}</span> ({preset.capacity})
          </button>
        ))}
      </div>

      {/* Tables List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-lg font-semibold text-gray-900">{t.tables.tableList}</h2>
        </div>

        {tables.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="text-lg">{t.tables.noTables}</p>
            <p className="text-sm mt-2">{t.tables.noTablesDesc}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 p-6">
            {tables.map(table => {
              const isOverCapacity = table.guests.length > table.capacity;
              const guestsList = table.guests
                .map(gId => guests.find(g => g.id === gId)?.name)
                .filter(Boolean);

              return (
                <div
                  key={table.id}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    isOverCapacity
                      ? 'border-red-500 bg-red-50'
                      : table.guests.length === table.capacity
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {editingId === table.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500"
                      />
                      <select
                        value={editType}
                        onChange={(e) => setEditType(e.target.value as 'round' | 'rectangle')}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
                      >
                        <option value="round">{t.tables.round}</option>
                        <option value="rectangle">{t.tables.rectangle}</option>
                      </select>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={editCapacity}
                        onChange={(e) => setEditCapacity(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={saveEdit}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          {t.guests.save}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          {t.guests.cancel}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">
                            {table.type === 'round' ? '🔵' : '🟦'} {table.name}
                          </h3>
                          <p className={`text-sm font-semibold ${
                            isOverCapacity ? 'text-red-600' : 'text-gray-700'
                          }`}>
                            {table.guests.length} / {table.capacity} {t.tables.seats}
                            {isOverCapacity && ' ' + t.tables.overCapacity}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => startEdit(table.id)}
                            className="p-2 cursor-pointer text-blue-600 hover:bg-blue-50 rounded transition-colors text-sm"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => {
                              showConfirm(
                                t.tables.deleteConfirm,
                                `${table.name}?`,
                                () => deleteTable(table.id)
                              );
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors text-sm cursor-pointer"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>

                      {guestsList.length > 0 ? (
                        <div className="space-y-1">
                          {guestsList.map((name, idx) => (
                            <div
                              key={idx}
                              className="text-sm py-1 px-2 bg-white rounded border border-gray-200"
                            >
                              {name}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 italic">{t.tables.noGuests}</p>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
