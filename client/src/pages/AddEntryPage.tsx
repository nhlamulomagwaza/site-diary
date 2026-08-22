import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addEntry } from '../store/entriesSlice';
import { isValidationError } from '../services/entryApi';

interface FormState {
  date: string;
  contractName: string;
  weather: string;
  notes: string;
  authorName: string;
}

interface FormErrors {
  date?: string;
  contractName?: string;
  weather?: string;
  notes?: string;
  authorName?: string;
}

const initialForm: FormState = {
  date: new Date().toISOString().split('T')[0],
  contractName: '',
  weather: '',
  notes: '',
  authorName: '',
};

export default function AddEntryPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const submitting = useAppSelector((state) => state.entries.submitting);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateClient = (): FormErrors => {
    const next: FormErrors = {};
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const selected = new Date(form.date);

    if (!form.date) {
      next.date = 'Date is required';
    } else if (selected > today) {
      next.date = 'Date may not be in the future';
    }

    if (!form.contractName.trim()) {
      next.contractName = 'Contract name is required';
    }

    if (!form.weather.trim()) {
      next.weather = 'Weather is required';
    }

    if (!form.notes.trim()) {
      next.notes = 'Notes are required';
    } else if (form.notes.length > 500) {
      next.notes = 'Notes must not exceed 500 characters';
    }

    if (!form.authorName.trim()) {
      next.authorName = 'Author name is required';
    }

    return next;
  };

  const handleChange = (field: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    try {
      await dispatch(addEntry(form)).unwrap();
      enqueueSnackbar('Entry created successfully', { variant: 'success' });
      setForm({ ...initialForm, date: new Date().toISOString().split('T')[0] });
      navigate('/');
    } catch (error) {
      if (isValidationError(error)) {
        const serverErrors: FormErrors = {};
        error.errors.forEach((item) => {
          serverErrors[item.field as keyof FormErrors] = item.message;
        });
        setErrors(serverErrors);
        enqueueSnackbar('Please fix validation errors', { variant: 'error' });
      } else {
        enqueueSnackbar('Failed to create entry', { variant: 'error' });
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Add Diary Entry
      </Typography>
      <Stack spacing={2.5}>
        <TextField
          label="Date"
          type="date"
          value={form.date}
          onChange={handleChange('date')}
          error={Boolean(errors.date)}
          helperText={errors.date}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
        />
        <TextField
          label="Contract Name"
          value={form.contractName}
          onChange={handleChange('contractName')}
          error={Boolean(errors.contractName)}
          helperText={errors.contractName}
          fullWidth
          required
        />
        <TextField
          label="Weather"
          value={form.weather}
          onChange={handleChange('weather')}
          error={Boolean(errors.weather)}
          helperText={errors.weather}
          fullWidth
          required
        />
        <TextField
          label="Author Name"
          value={form.authorName}
          onChange={handleChange('authorName')}
          error={Boolean(errors.authorName)}
          helperText={errors.authorName}
          fullWidth
          required
        />
        <TextField
          label="Notes"
          value={form.notes}
          onChange={handleChange('notes')}
          error={Boolean(errors.notes)}
          helperText={errors.notes ?? `${form.notes.length}/500`}
          fullWidth
          required
          multiline
          minRows={4}
          inputProps={{ maxLength: 500 }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={submitting}
        >
          {submitting ? 'Saving...' : 'Save Entry'}
        </Button>
      </Stack>
    </Box>
  );
}
