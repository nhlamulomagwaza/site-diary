import { useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadSummary } from '../store/entriesSlice';

export default function SummaryPage() {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { summary, summaryLoading } = useAppSelector((state) => state.entries);

  useEffect(() => {
    dispatch(loadSummary())
      .unwrap()
      .catch(() => enqueueSnackbar('Failed to load summary', { variant: 'error' }));
  }, [dispatch, enqueueSnackbar]);

  const totalEntries = summary.reduce((acc, item) => acc + item.count, 0);

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={1}>
        Summary by Contract
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        {totalEntries} total {totalEntries === 1 ? 'entry' : 'entries'} across {summary.length}{' '}
        {summary.length === 1 ? 'contract' : 'contracts'}
      </Typography>

      {summaryLoading ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      ) : summary.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" py={6}>
          No entries to summarize yet.
        </Typography>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Contract Name</TableCell>
                <TableCell align="right">Entry Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {summary.map((row) => (
                <TableRow key={row.contractName} hover>
                  <TableCell>{row.contractName}</TableCell>
                  <TableCell align="right">{row.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
