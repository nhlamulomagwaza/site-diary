import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const routes = [
  { path: '/', label: 'Entries' },
  { path: '/add', label: 'Add Entry' },
  { path: '/summary', label: 'Summary' },
];

export default function Layout() {
  const location = useLocation();
  const currentTab = routes.findIndex((route) => route.path === location.pathname);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <MenuBookIcon sx={{ mr: 1.5 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Site Diary
          </Typography>
        </Toolbar>
        <Tabs
          value={currentTab === -1 ? 0 : currentTab}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          {routes.map((route) => (
            <Tab
              key={route.path}
              label={route.label}
              component={RouterLink}
              to={route.path}
            />
          ))}
        </Tabs>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
