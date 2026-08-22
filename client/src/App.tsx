import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import EntryListPage from './pages/EntryListPage';
import AddEntryPage from './pages/AddEntryPage';
import SummaryPage from './pages/SummaryPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<EntryListPage />} />
        <Route path="/add" element={<AddEntryPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Route>
    </Routes>
  );
}
