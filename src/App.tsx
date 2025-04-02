import React from 'react';
import FlightSearch from './components/FlightSearch';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App-content">
        <FlightSearch />
      </div>
    </div>
  );
};

export default App;