import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { ContractSummary, CreateEntryPayload, DiaryEntry } from '../types/entry';
import * as entryApi from '../services/entryApi';

interface EntriesState {
  items: DiaryEntry[];
  summary: ContractSummary[];
  contractFilter: string;
  loading: boolean;
  summaryLoading: boolean;
  submitting: boolean;
  error: string | null;
}

const initialState: EntriesState = {
  items: [],
  summary: [],
  contractFilter: '',
  loading: false,
  summaryLoading: false,
  submitting: false,
  error: null,
};

export const loadEntries = createAsyncThunk(
  'entries/loadEntries',
  async (contract?: string) => entryApi.fetchEntries(contract)
);

export const addEntry = createAsyncThunk(
  'entries/addEntry',
  async (payload: CreateEntryPayload, { rejectWithValue }) => {
    try {
      return await entryApi.createEntry(payload);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loadSummary = createAsyncThunk(
  'entries/loadSummary',
  async () => entryApi.fetchSummary()
);

const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    setContractFilter(state, action: PayloadAction<string>) {
      state.contractFilter = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load entries';
      })
      .addCase(addEntry.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(addEntry.fulfilled, (state, action) => {
        state.submitting = false;
        state.items = [action.payload, ...state.items];
      })
      .addCase(addEntry.rejected, (state, action) => {
        state.submitting = false;
        if (!action.payload) {
          state.error = action.error.message ?? 'Failed to create entry';
        }
      })
      .addCase(loadSummary.pending, (state) => {
        state.summaryLoading = true;
      })
      .addCase(loadSummary.fulfilled, (state, action) => {
        state.summaryLoading = false;
        state.summary = action.payload;
      })
      .addCase(loadSummary.rejected, (state) => {
        state.summaryLoading = false;
      });
  },
});

export const { setContractFilter, clearError } = entriesSlice.actions;
export default entriesSlice.reducer;
