import './App.css';
import HomeLayout from './components/HomePageLayout/HomeLayout';
import Navbar from './components/Navbar/Navbar';
import Contact from './components/Footer/Contact';
import Recommend from './components/RecommendDoctor/Recommend';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router
      v7_startTransition={true}
      v7_relativeSplatPath={true}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/find-doctor" element={<Recommend />} />
      </Routes>
      <Contact />
    </Router>
  );
}

export default App;
