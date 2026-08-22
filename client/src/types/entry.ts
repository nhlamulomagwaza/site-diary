export interface DiaryEntry {
  id: number;
  date: string;
  contractName: string;
  weather: string;
  notes: string;
  authorName: string;
  createdAt: string;
}

export interface CreateEntryPayload {
  date: string;
  contractName: string;
  weather: string;
  notes: string;
  authorName: string;
}

export interface ContractSummary {
  contractName: string;
  count: number;
}

export interface ValidationError {
  field: string;
  message: string;
}
