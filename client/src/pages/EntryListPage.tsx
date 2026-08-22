import { useEffect, useMemo } from 'react';
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadEntries, loadSummary, setContractFilter } from '../store/entriesSlice';
import EntryCard from '../components/EntryCard';

export default function EntryListPage() {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { items, loading, contractFilter, error, summary } = useAppSelector((state) => state.entries);

  const contractNames = useMemo(
    () => summary.map((item) => item.contractName),
    [summary]
  );

  useEffect(() => {
    dispatch(loadSummary());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadEntries(contractFilter || undefined));
  }, [dispatch, contractFilter]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  }, [error, enqueueSnackbar]);

  const handleFilterChange = (value: string) => {
    dispatch(setContractFilter(value));
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Diary Entries
        </Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="contract-filter-label">Contract</InputLabel>
          <Select
            labelId="contract-filter-label"
            label="Contract"
            value={contractFilter}
            onChange={(event) => handleFilterChange(event.target.value)}
          >
            <MenuItem value="">All contracts</MenuItem>
            {contractNames.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {loading ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      ) : items.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" py={6}>
          No entries found. Add your first site diary entry.
        </Typography>
      ) : (
        items.map((entry) => <EntryCard key={entry.id} entry={entry} />)
      )}
    </Box>
  );
}
