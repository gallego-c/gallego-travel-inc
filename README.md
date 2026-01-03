# Gallego Travel Inc.

A Waynabox-style travel organizer website with an interactive questionnaire. Features a modern red color scheme, bilingual support (English/Spanish), and server-side data persistence.

## Features

- 🎨 Modern, minimalist design with red color scheme
- 🌍 Bilingual: English/Spanish with language switcher
- 📝 Multi-step questionnaire with validation
- 📊 Server-side CSV data storage
- 📱 Fully responsive design

## Setup & Installation

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web server framework
- `cors` - Enable cross-origin requests
- `nodemon` - Auto-restart during development (optional)

### 2. Start the Server

```bash
npm start
```

Server will run at `http://localhost:3000`

For development with auto-restart:
```bash
npm run dev
```

### 3. Open the Website

Visit `http://localhost:3000` in your browser

## Project Structure

```
gallego-travel-inc/
├── index.html              # Landing page
├── questionnaire.html      # Multi-step questionnaire
├── server.js               # Express backend server
├── package.json            # Node.js dependencies
├── css/
│   └── styles.css          # Waynabox-inspired styling
├── js/
│   ├── main.js             # Landing page interactions
│   ├── questionnaire.js    # Form logic & API calls
│   └── translations.js     # Bilingual translations
├── images/                 # Images folder (add your images here)
└── data/
    └── responses.csv       # Questionnaire responses (auto-updated)
```

## How It Works

1. Users complete the questionnaire through 10+ interactive steps
2. Data is validated on each step
3. On completion, data is sent via POST request to `/api/save-response`
4. Server appends the response to `data/responses.csv`
5. All responses are stored in one central CSV file

## CSV Data Format

The CSV includes:
- Name & Email
- Identity Type (Gerard or Random Person)
- Travel timing preference
- 5+ available date ranges
- Departure location
- Destination continent & cities
- Number of travelers
- Adventure type
- Submission timestamp

## Development

- **Frontend**: Vanilla JavaScript, CSS3, HTML5
- **Backend**: Node.js + Express
- **Data Storage**: CSV file (`data/responses.csv`)

## Notes

- Images need to be added to the `images/` folder
- Server must be running for form submission to work
- Language preference is saved in localStorage
- CSV file is automatically created if it doesn't exist
Regal amic invisible
