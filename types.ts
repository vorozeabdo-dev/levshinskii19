export type ApartmentStatus = 'available' | 'booked' | 'sold';

export interface FinishingOptions {
  'white-box': boolean;
  'turnkey': boolean;
}

export interface Windows {
  orientation: string;
  count: number;
}

export interface Apartment {
  id: string;
  number: string;
  floor: number;
  rooms: number;
  totalArea: number;
  livingArea: number;
  ceilingHeight: number;
  pricePerSqm: number;
  totalPrice: number;
  status: ApartmentStatus;
  floorPlanImage: string;
  viewImage: string;
  gallery?: string[];

  features: string[];
  tags: string[];
  finishingOptions: FinishingOptions;
  windows: Windows;
  description: string;
  updatedAt: string;
}

export interface Filters {
  rooms: string;
  status: string;
}

// Augment window interface
declare global {
  interface Window {
    storage: {
      get: (key: string) => Promise<{ value: string | null }>;
      set: (key: string, value: string, shared?: boolean) => Promise<boolean>;
    };
  }
}