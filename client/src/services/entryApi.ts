import type {
  ContractSummary,
  CreateEntryPayload,
  DiaryEntry,
  ValidationError,
} from '../types/entry';

const API_BASE = import.meta.env.VITE_API_URL ?? '';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw body;
  }
  return response.json();
}

export async function fetchEntries(contract?: string): Promise<DiaryEntry[]> {
  const params = contract ? `?contract=${encodeURIComponent(contract)}` : '';
  const response = await fetch(`${API_BASE}/api/entries${params}`);
  return handleResponse<DiaryEntry[]>(response);
}

export async function createEntry(payload: CreateEntryPayload): Promise<DiaryEntry> {
  const response = await fetch(`${API_BASE}/api/entries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse<DiaryEntry>(response);
}

export async function fetchSummary(): Promise<ContractSummary[]> {
  const response = await fetch(`${API_BASE}/api/entries/summary`);
  return handleResponse<ContractSummary[]>(response);
}

export function isValidationError(error: unknown): error is { errors: ValidationError[] } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'errors' in error &&
    Array.isArray((error as { errors: unknown }).errors)
  );
}
