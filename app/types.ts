export interface WithId {
  id: number;
}

export interface Character extends WithId {
  name: string;
  gender: string | null;
  ability: string;
  minimalDistance: string;
  weight: string;
  born: string;
  inSpaceSince: string;
  beerConsumption: number;
  knowsTheAnswer: boolean;
  nemeses: Nemesis[];
}

export interface Nemesis extends WithId {
  isAlive: boolean;
  years: number;
  secrets: Secret[];
}

export interface Secret extends WithId {
  secretCode: number;
}

export interface CharactersResponse {
  data: {
    characters_count: number;
    average_age: number;
    average_weight: number;
    genders: {
      female: number;
      male: number;
      other: number;
      noGender: number;
    };
  };
  characters: Character[];
}

export interface DataRow {
  [key: string]: any;
  children?: DataRow[];
}

export interface GenericHierarchyTableProps<T extends object> {
  items: T[];
  onDelete: (item: T) => void;
  excludeKeys?: string[];
}

export interface HierarchyRowProps<T extends object> {
  item: T;
  onDelete: (item: T) => void;
  displayKeys: string[];
  excludeKeys?: string[];
}