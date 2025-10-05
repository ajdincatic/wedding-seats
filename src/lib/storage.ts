import { SeatingPlan, Guest, Table } from '@/types';

const STORAGE_KEY = 'wedding-seating-plan';

export const storage = {
  savePlan: (plan: SeatingPlan): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    } catch (error) {
      console.error('Failed to save seating plan:', error);
    }
  },

  loadPlan: (): SeatingPlan | null => {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to load seating plan:', error);
      return null;
    }
  },

  clearPlan: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear seating plan:', error);
    }
  },

  exportToJSON: (plan: SeatingPlan): void => {
    const dataStr = JSON.stringify(plan, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `seating-plan-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  importFromJSON: (file: File): Promise<SeatingPlan> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const plan = JSON.parse(e.target?.result as string);
          resolve(plan);
        } catch {
          reject(new Error('Nevažeća JSON datoteka'));
        }
      };
      reader.onerror = () => reject(new Error('Greška pri čitanju datoteke'));
      reader.readAsText(file);
    });
  },

  exportToCSV: (guests: Guest[], tables: Table[]): void => {
    let csv = 'Ime gosta,Tagovi,Stol\n';

    guests.forEach(guest => {
      const table = tables.find(t => t.guests.includes(guest.id));
      const tableName = table ? table.name : 'Nije raspoređen';
      csv += `"${guest.name}","${guest.tags.join(', ')}","${tableName}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `seating-plan-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },
};
