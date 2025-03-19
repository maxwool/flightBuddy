import React, { useState } from 'react';
import '../styles/App.css';

const FlightSearch: React.FC = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState(new Date().toISOString().split('T')[0]);
  const [flightData, setFlightData] = useState<any[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setSearchAttempted(true);
    setError(null);
    if (flightNumber) {
      const apiKey = process.env.REACT_APP_API_KEY;
      if (!apiKey) {
        console.error('API key is missing');
        return;
      }

      const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}&flight_date=${flightDate}`;
      console.log('Request URL:', url);

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('API Response:', data);

        if (data.data && data.data.length > 0) {
          setFlightData(data.data);
        } else {
          setFlightData([]);
          setError('No flight information found for the given flight number.');
        }
      } catch (err) {
        console.error('Error fetching flight data:', err);
        setError('An error occurred while fetching flight data. Please try again later.');
      }
    }
  };

  const handleFlightSelection = (flight: any) => {
    setSelectedFlight(flight);
  };

  const formatLocalTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  return (
    <div className="FlightSearch-container">
      {!selectedFlight ? (
        <>
          <h2>Flight Search</h2>
          <input
            type="text"
            className="FlightSearch-input"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            placeholder="Enter flight number (e.g., AA1234)"
          />
          <input
            type="date"
            className="FlightSearch-input"
            value={flightDate}
            onChange={(e) => setFlightDate(e.target.value)}
          />
          <button className="FlightSearch-button" onClick={handleSearch}>Search</button>
          {error && <p className="FlightSearch-error">{error}</p>}
          {flightData.length > 0 && (
            <div className="FlightSearch-output">
              <div className="FlightSearch-options">
                {flightData.map((flight: any, index: number) => (
                  <div key={index} className="FlightSearch-option" onClick={() => handleFlightSelection(flight)}>
                    <p>{flight.flight.iata} - {flight.departure.airport} to {flight.arrival.airport}</p>
                    <p>{formatLocalTime(flight.departure.estimated || flight.departure.actual || flight.departure.scheduled)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {searchAttempted && flightData.length === 0 && !error && (
            <p className="FlightSearch-output">No flight information found for the given flight number.</p>
          )}
        </>
      ) : (
        <div className="FlightSearch-output">
          <h3>Flight Information</h3>
          <p>Flight Number: {selectedFlight.flight.iata}</p>
          <p>Status: {selectedFlight.flight_status}</p>
          <p>Departure Airport: {selectedFlight.departure.airport}</p>
          <p>Arrival Airport: {selectedFlight.arrival.airport}</p>
          <p>Airline: {selectedFlight.airline.name}</p>
          <p>Scheduled Departure: {formatLocalTime(selectedFlight.departure.scheduled)}</p>
          <p>Estimated Departure: {formatLocalTime(selectedFlight.departure.estimated)}</p>
          <p>Actual Departure: {formatLocalTime(selectedFlight.departure.actual)}</p>
          <p>Scheduled Arrival: {formatLocalTime(selectedFlight.arrival.scheduled)}</p>
          <p>Estimated Arrival: {formatLocalTime(selectedFlight.arrival.estimated)}</p>
          <p>Actual Arrival: {formatLocalTime(selectedFlight.arrival.actual)}</p>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;