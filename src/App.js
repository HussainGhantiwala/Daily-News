import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavigationBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [mode, setMode] = useState("light");
  const [pageSize] = useState(8);
  const [progress, setProgress] = useState(0);
  let apiKey = process.env.REACT_APP_NEWS_API_KEY

  const toggleColor = () => {
   if(mode==='light'){
    setMode('dark')
    document.body.style.backgroundColor='#1E1E1E'
   }
   else{
    setMode('light')
    document.body.style.backgroundColor='white'
   }
  };

  return (
    <Router>
      <NavBar mode={mode} toggleMode={toggleColor} />
      <LoadingBar color={mode === 'light' ? '#f11946' : '#fff'} progress={progress} height={3} />

      <Routes>
        <Route exact path='/' element={<News setProgress={setProgress} key="general" mode={mode} apiKey={apiKey} categories="general" pageSize={pageSize} />} />
        <Route exact path='/home' element={<News setProgress={setProgress} key="home" mode={mode} apiKey={apiKey} categories="general" pageSize={pageSize} />} />
        <Route exact path='/entertainment' element={<News setProgress={setProgress} key="entertainment" mode={mode} apiKey={apiKey} pageSize={pageSize} categories="entertainment" />} />
        <Route exact path='/health' element={<News setProgress={setProgress} key="health" mode={mode} apiKey={apiKey} pageSize={pageSize} categories="health" />} />
        <Route exact path='/sports' element={<News setProgress={setProgress} key="sports" mode={mode} apiKey={apiKey} pageSize={pageSize} categories="sports" />} />
        <Route exact path='/business' element={<News setProgress={setProgress} key="business" mode={mode} apiKey={apiKey} pageSize={pageSize} categories="business" />} />
        <Route exact path='/science' element={<News setProgress={setProgress} key="science" mode={mode} apiKey={apiKey} categories="science" />} />
        <Route exact path='/technology' element={<News setProgress={setProgress} key="technology" mode={mode} apiKey={apiKey} pageSize={pageSize} categories="technology" />} />
      </Routes>
    </Router>
  );
};

export default App;
