import React from 'react';
import './App.css';
import Employee from './components/Employee/Employee';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import demo from './components/training/demo';

function App() {
  return (
    <div className="App">
      <Header />
      <Employee />
      <Footer />
    </div>
  );
}

export default App;
