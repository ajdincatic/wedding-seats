export interface Guest {
  id: string;
  name: string;
  tags: string[];
  tableId?: string;
}

export interface Table {
  id: string;
  name: string;
  type: 'round' | 'rectangle';
  capacity: number;
  guests: string[]; // guest IDs
  position?: {
    x: number;
    y: number;
  };
}

export interface SeatingPlan {
  guests: Guest[];
  tables: Table[];
  lastUpdated: string;
}
