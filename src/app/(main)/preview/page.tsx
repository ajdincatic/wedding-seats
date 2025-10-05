"use client";

import { useRef } from 'react';
import { useApp } from '../layout';
import { storage } from '@/lib/storage';
import { Guest } from '@/types';
import AffiliateSection from '@/components/AffiliateSection';

export default function PreviewPage() {
  const { guests, tables, clearAll, t } = useApp();
  const printRef = useRef<HTMLDivElement>(null);

  const openAmazonAffiliate = () => {
    window.open('https://www.amazon.com/wedding/home?tag=yourtaghere', '_blank', 'noopener,noreferrer');
  };

  const handleExportPDF = () => {
    // Use browser's native print to PDF functionality
    window.print();
    // Open Amazon affiliate link after export
    setTimeout(() => openAmazonAffiliate(), 500);
  };

  const handleExportJSON = () => {
    storage.exportToJSON({
      guests,
      tables,
      lastUpdated: new Date().toISOString(),
    });
    // Open Amazon affiliate link after export
    openAmazonAffiliate();
  };

  const handleExportCSV = () => {
    storage.exportToCSV(guests, tables);
    // Open Amazon affiliate link after export
    openAmazonAffiliate();
  };

  const unassignedGuests = guests.filter(g => !g.tableId);
  const assignedGuests = guests.filter(g => g.tableId);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 md:mb-8 no-print">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t.preview.title}</h1>
        <p className="text-sm md:text-base text-gray-700">{t.preview.subtitle}</p>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 md:mb-8 no-print">
        <h2 className="text-base md:text-lg font-semibold mb-4 text-gray-900">{t.preview.actions}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <button
            onClick={handleExportPDF}
            className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            {t.preview.exportPDF}
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            {t.preview.exportCSV}
          </button>
          <button
            onClick={handleExportJSON}
            className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {t.preview.exportJSON}
          </button>
          <button
            onClick={clearAll}
            className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base cursor-pointer bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
          >
            {t.preview.deleteAll}
          </button>
        </div>
      </div>

      {/* Affiliate Section */}
      <div className="no-print mb-6 md:mb-8">
        <AffiliateSection />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8 no-print">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md text-center">
          <div className="text-2xl md:text-3xl font-bold text-purple-600">{guests.length}</div>
          <div className="text-xs md:text-sm text-gray-700 mt-1">{t.preview.totalGuests}</div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md text-center">
          <div className="text-2xl md:text-3xl font-bold text-green-600">{assignedGuests.length}</div>
          <div className="text-xs md:text-sm text-gray-700 mt-1">{t.preview.assignedCount}</div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md text-center">
          <div className="text-2xl md:text-3xl font-bold text-orange-600">{unassignedGuests.length}</div>
          <div className="text-xs md:text-sm text-gray-700 mt-1">{t.preview.unassignedCount}</div>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md text-center">
          <div className="text-2xl md:text-3xl font-bold text-blue-600">{tables.length}</div>
          <div className="text-xs md:text-sm text-gray-700 mt-1">{t.preview.tablesCount}</div>
        </div>
      </div>

      {/* Print Preview */}
      <div ref={printRef} data-pdf-export className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {t.preview.pageTitle}
          </h2>
          <p className="text-sm md:text-base text-gray-700">
            {new Date().toLocaleDateString('hr-HR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {tables.length === 0 ? (
          <div className="text-center py-12 md:py-16 text-gray-500">
            <p className="text-base md:text-lg">{t.preview.noTablesPreview}</p>
            <p className="text-sm mt-2">{t.preview.noTablesPreviewDesc}</p>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {tables.map(table => {
              const tableGuests = table.guests
                .map((gId: string) => guests.find(g => g.id === gId))
                .filter((g): g is Guest => g !== undefined);

              return (
                <div key={table.id} className="border-2 border-gray-200 rounded-lg p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-3 border-b">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        {table.type === 'round' ? '🔵' : '🟦'} {table.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-700 mt-1">
                        {t.tables.capacity}: {table.guests.length} / {table.capacity} {t.tables.seats}
                      </p>
                    </div>
                    {table.guests.length > table.capacity && (
                      <span className="text-sm md:text-base text-red-600 font-semibold">{t.preview.overCapacityWarning}</span>
                    )}
                    {table.guests.length === table.capacity && (
                      <span className="text-sm md:text-base text-green-600 font-semibold">{t.preview.fullTag}</span>
                    )}
                  </div>

                  {tableGuests.length === 0 ? (
                    <p className="text-gray-400 italic text-sm">{t.preview.noGuestsAssigned}</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      {tableGuests.map((guest: Guest, idx: number) => (
                        <div key={guest.id} className="flex items-start gap-2">
                          <span className="text-gray-500 font-mono">{idx + 1}.</span>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{guest.name}</div>
                            {guest.tags.length > 0 && (
                              <div className="flex gap-1 mt-1 flex-wrap">
                                {guest.tags.map((tag: string, tidx: number) => (
                                  <span
                                    key={tidx}
                                    className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Unassigned Guests */}
        {unassignedGuests.length > 0 && (
          <div className="mt-6 md:mt-8 border-2 border-orange-200 bg-orange-50 rounded-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-orange-900 mb-4">
              {t.preview.unassignedTitle} ({unassignedGuests.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {unassignedGuests.map((guest, idx) => (
                <div key={guest.id} className="flex items-center gap-2">
                  <span className="text-gray-500 font-mono">{idx + 1}.</span>
                  <span className="font-medium text-gray-900">{guest.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Room Layout for PDF */}
        {tables.length > 0 && (
          <div className="mt-8 border-t pt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t.layout.title}
            </h3>
            <div
              className="relative bg-gray-50 border-2 border-gray-300 rounded-lg mx-auto"
              style={{
                width: '100%',
                maxWidth: '800px',
                height: '500px',
                backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            >
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

                const isOverCapacity = table.guests.length > table.capacity;
                const size = table.type === 'round' ? 70 : 90;

                return (
                  <div
                    key={table.id}
                    className={`absolute ${isOverCapacity ? 'ring-4 ring-red-500' : ''}`}
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      transform: 'translate(-50%, -50%)',
                      width: `${size}px`,
                      height: `${size}px`,
                    }}
                  >
                    <div
                      className={`w-full h-full flex flex-col items-center justify-center text-white font-bold text-xs shadow-lg ${
                        table.type === 'round' ? 'rounded-full' : 'rounded-lg'
                      } ${
                        isOverCapacity
                          ? 'bg-red-600'
                          : table.guests.length === table.capacity
                          ? 'bg-green-600'
                          : 'bg-purple-600'
                      }`}
                    >
                      <div className="text-xs">{table.type === 'round' ? '🔵' : '🟦'}</div>
                      <div className="text-xs">{table.name}</div>
                      <div className="text-xs mt-1">
                        {table.guests.length}/{table.capacity}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>{t.preview.generatedBy}</p>
        </div>
      </div>
    </div>
  );
}
