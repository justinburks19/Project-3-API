import './App.css'
import {Routes, Route} from 'react-router-dom';



import {Home} from '../components/pages/home.jsx';

export default function App() {
  function About() {
  return <h2>About Page</h2>;
}
function Services() {
  return <h2>Services Page</h2>;
}
function Contact() {
  return <h2>Contact Page</h2>;
}
  return (
    <>
       {/* Define application routes */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    </> 
  )
}

