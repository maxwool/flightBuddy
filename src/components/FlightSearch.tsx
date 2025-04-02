import React, { useState } from 'react'; // Removed `useEffect` as it is unused
import '../styles/App.css';

const FlightSearch: React.FC = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState(new Date().toLocaleDateString('en-CA'));
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

  const formatReadableTime = (time: string | null) => {
    if (!time) return 'N/A';
    try {
      const [, timePart] = time.split('T'); // Removed unused variable `_`
      const [hour, minute] = timePart.split(':'); // Extract hour and minute
      return `${parseInt(hour) % 12 || 12}:${minute} ${parseInt(hour) >= 12 ? 'PM' : 'AM'}`;
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Invalid Time';
    }
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
            placeholder="Enter flight number (e.g., UA2191)"
          />
          <input
            type="date"
            className="FlightSearch-input"
            value={flightDate}
            onChange={(e) => setFlightDate(e.target.value)}
          />
          <button className="FlightSearch-button" onClick={handleSearch}>
            Search
          </button>
          {error && <p className="FlightSearch-error">{error}</p>}
          {flightData.length > 0 && (
            <div className="FlightSearch-output">
              <div className="FlightSearch-options">
                {flightData.map((flight, index) => (
                  <div
                    key={index}
                    className="FlightSearch-option"
                    onClick={() => handleFlightSelection(flight)}
                    style={{ cursor: 'pointer', marginBottom: '10px' }}
                  >
                    <p>
                      {flight.flight?.iata} – {flight.departure?.airport} to{' '}
                      {flight.arrival?.airport}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {searchAttempted && flightData.length === 0 && !error && (
            <p className="FlightSearch-output">
              No flight information found for the given flight number on {flightDate}.
            </p>
          )}
        </>
      ) : (
        <div className="FlightSearch-output">
          <h3>Flight Information</h3>
          <p>Flight Number: {selectedFlight.flight?.iata}</p>
          <p>Airline: {selectedFlight.airline?.name}</p>
          <p>
            Departure Airport: {selectedFlight.departure?.airport}
          </p>
          <p>
            Arrival Airport:{' '} {selectedFlight.arrival?.airport}
          </p>
          <p>
            Departure Time:{' '}
            {formatReadableTime(
              new Date(
                new Date(selectedFlight.departure?.scheduled).getTime() +
                  (Number(selectedFlight.departure?.delay) || 0) * 60000
              ).toISOString()
            )}
          </p>
          <p>
            Arrival Time:{' '}
            {formatReadableTime(
              new Date(
                new Date(selectedFlight.arrival?.scheduled).getTime() +
                  (Number(selectedFlight.departure?.delay) || 0) * 60000
              ).toISOString()
            )}
          </p>
          <button onClick={() => setSelectedFlight(null)} style={{ marginTop: '1rem' }}>
            Back to Search
          </button>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
