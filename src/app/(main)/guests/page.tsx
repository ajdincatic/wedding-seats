"use client";

import { useState } from 'react';
import { useApp } from '../layout';

export default function GuestsPage() {
  const { guests, addGuest, updateGuest, deleteGuest, t, showConfirm } = useApp();
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [showBulk, setShowBulk] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editTags, setEditTags] = useState('');

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addGuest({
      name: name.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });

    setName('');
    setTags('');
  };

  const handleBulkAdd = () => {
    const lines = bulkText.split('\n').filter(line => line.trim());
    lines.forEach(line => {
      const [guestName, ...guestTags] = line.split(',').map(s => s.trim());
      if (guestName) {
        addGuest({
          name: guestName,
          tags: guestTags.filter(Boolean),
        });
      }
    });
    setBulkText('');
    setShowBulk(false);
  };

  const startEdit = (id: string) => {
    const guest = guests.find(g => g.id === id);
    if (guest) {
      setEditingId(id);
      setEditName(guest.name);
      setEditTags(guest.tags.join(', '));
    }
  };

  const saveEdit = () => {
    if (editingId) {
      updateGuest(editingId, {
        name: editName.trim(),
        tags: editTags.split(',').map(t => t.trim()).filter(Boolean),
      });
      setEditingId(null);
      setEditName('');
      setEditTags('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditTags('');
  };

  const unassignedGuests = guests.filter(g => !g.tableId);
  const assignedGuests = guests.filter(g => g.tableId);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t.guests.title}</h1>
          <p className="text-sm md:text-base text-gray-700 mt-1">
            {t.guests.total}: {guests.length} | {t.guests.assigned}: {assignedGuests.length} | {t.guests.unassigned}: {unassignedGuests.length}
          </p>
        </div>
        <button
          onClick={() => setShowBulk(!showBulk)}
          className="px-4 py-2 cursor-pointer bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm md:text-base w-full sm:w-auto"
        >
          {showBulk ? t.guests.individual : t.guests.bulkAdd}
        </button>
      </div>

      {/* Add Guest Form */}
      {!showBulk ? (
        <form onSubmit={handleAddGuest} className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-6 md:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.guests.guestName}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.guests.namePlaceholder}
                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.guests.tags}
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder={t.guests.tagsPlaceholder}
                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>

            <div className="md:col-span-1 flex items-end">
              <button
                type="submit"
                className="w-full px-4 md:px-6 py-2 text-sm md:text-base cursor-pointer bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                {t.guests.addGuest}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.guests.bulkLabel}
          </label>
          <textarea
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            placeholder={t.guests.bulkPlaceholder}
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm text-gray-900 placeholder-gray-500"
          />
          <button
            onClick={handleBulkAdd}
            className="mt-4 px-6 py-2 cursor-pointer bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            {t.guests.addAll}
          </button>
        </div>
      )}

      {/* Guests List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-lg font-semibold text-gray-900">{t.guests.guestList}</h2>
        </div>

        {guests.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="text-lg">{t.guests.noGuests}</p>
            <p className="text-sm mt-2">{t.guests.noGuestsDesc}</p>
          </div>
        ) : (
          <div className="divide-y">
            {guests.map(guest => (
              <div key={guest.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                {editingId === guest.id ? (
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm md:text-base border border-gray-300 rounded text-gray-900 placeholder-gray-500"
                    />
                    <input
                      type="text"
                      value={editTags}
                      onChange={(e) => setEditTags(e.target.value)}
                      placeholder={t.guests.tags.toLowerCase()}
                      className="flex-1 px-3 py-2 text-sm md:text-base border border-gray-300 rounded text-gray-900 placeholder-gray-500"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="flex-1 sm:flex-none px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        {t.guests.save}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 sm:flex-none px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        {t.guests.cancel}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{guest.name}</h3>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                        {guest.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {guest.tableId && (
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            {t.guests.assignedTag}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(guest.id)}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm cursor-pointer text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        {t.guests.edit}
                      </button>
                      <button
                        onClick={() => {
                          showConfirm(
                            t.guests.deleteConfirm,
                            `${guest.name}?`,
                            () => deleteGuest(guest.id)
                          );
                        }}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        {t.guests.delete}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
