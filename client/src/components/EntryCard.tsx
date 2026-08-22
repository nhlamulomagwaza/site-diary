import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import type { DiaryEntry } from '../types/entry';

interface EntryCardProps {
  entry: DiaryEntry;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function EntryCard({ entry }: EntryCardProps) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
          <Typography variant="h6" component="h2" fontWeight={600}>
            {entry.contractName}
          </Typography>
          <Chip
            icon={<CalendarTodayIcon />}
            label={formatDate(entry.date)}
            size="small"
            variant="outlined"
          />
        </Stack>
        <Stack direction="row" spacing={2} mb={2}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <WbSunnyIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {entry.weather}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <PersonIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {entry.authorName}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="body1" color="text.primary">
          {entry.notes}
        </Typography>
      </CardContent>
    </Card>
  );
}
