// External imports
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Local imports
import HomePage from '../page/Home';
import UserUpdateForm from '../components/UserUpdateForm';

// Component definition
function App() {
  return (
    <Routes>
      <Route path="/" element={<UserUpdateForm />} />
      <Route path="home" element={<HomePage />} />
    </Routes>
  );
}

// Default export
export default App;
