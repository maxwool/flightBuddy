import React from 'react';
import FlightSearch from './components/FlightSearch';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-left">flightBuddy</div>
        <div className="header-right">
          <a href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank">
            <img src="/images/linkedin-logo.png" alt="LinkedIn" className="linkedin-logo" />
          </a>
        </div>
      </header>
      <FlightSearch />
      <footer className="App-footer">
        <p>Thank you for using flightBuddy!</p>
      </footer>
    </div>
  );
};

export default App;