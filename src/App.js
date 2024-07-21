import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import './App.css';

const App = () => {
  const pageSize = 5;
  const apiKey = "84347da87fe342e9848cc973aeb719d0";
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState('general');

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setProgress(0); // reset progress bar
  };

  return (
    <div>
      <NavBar onCategoryChange={handleCategoryChange} />
      <LoadingBar height={3} color='#f11946' progress={progress} />
      <News setProgress={setProgress} apiKey={apiKey} key={category} pageSize={pageSize} country="in" category={category} />
    </div>
  );
};

export default App;
