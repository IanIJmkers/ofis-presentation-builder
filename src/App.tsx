import { Routes, Route } from 'react-router-dom';
import Editor from './components/editor/Editor';
import PrintView from './components/print/PrintView';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Editor />} />
      <Route path="/print" element={<PrintView />} />
    </Routes>
  );
}
