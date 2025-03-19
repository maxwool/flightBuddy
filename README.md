NOTES:
Make it so you can chose to either use to (1) make your own flight, (2) or to pickup a friend
(1) if this is picked, pick the day, put in flight number, and it will show you flights that havent taken off yet for the day, when you select one, it will show the gate, 
(2)
# Flight Tracker App

## Overview
The Flight Tracker App is a React application that allows users to search for flight information using flight numbers. It fetches data from the AviationStack API and displays relevant flight details.

## Project Structure
```
flight-tracker-app
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── components
│   │   └── FlightSearch.tsx # Component for searching flights
│   ├── App.tsx             # Main application component
│   ├── index.tsx           # Entry point for the React application
│   └── types
│       └── index.ts        # TypeScript types and interfaces
├── .gitignore              # Files and directories to ignore in Git
├── .env                    # Environment variables (API keys, etc.)
├── package.json            # npm configuration file
├── tsconfig.json           # TypeScript configuration file
└── README.md               # Project documentation
```

## Setup Instructions
1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd flight-tracker-app
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Create a `.env` file:**
   In the root of the project, create a `.env` file and add your API key:
   ```
   REACT_APP_API_KEY=your_api_key_here
   ```

4. **Run the application:**
   ```
   npm start
   ```

## Usage
- Open the application in your browser.
- Enter a flight number in the search input and click the "Search" button to fetch flight information.
- Click on a flight to view detailed information about that flight.

## Contributing
Feel free to submit issues or pull requests for improvements or bug fixes. 

## License
This project is licensed under the MIT License.