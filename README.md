# Gallego Travel Inc.

A Waynabox-style travel organizer website with an interactive questionnaire. Features a modern red color scheme, bilingual support (English/Spanish), and Google Sheets integration for data storage.

## Features

- 🎨 Modern, minimalist design with red color scheme
- 🌍 Bilingual: English/Spanish with language switcher
- 📝 Multi-step questionnaire with validation
- 📊 Google Sheets integration (no backend server needed!)
- 📱 Fully responsive design
- 🚀 Deploy to GitHub Pages

## Quick Start

### Option 1: Deploy to GitHub Pages (Recommended)

1. **Set up Google Sheets** (see [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md))
   - Create a Google Sheet
   - Set up Apps Script
   - Get your web app URL

2. **Update the configuration**
   - Open `js/questionnaire.js`
   - Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with your Google Apps Script URL

3. **Deploy to GitHub Pages**
   ```bash
   git add .
   git commit -m "Configure Google Sheets"
   git push
   ```
   - Go to repository Settings > Pages
   - Select `main` branch as source
   - Your site will be live at `https://gallego-c.github.io/gallego-travel-inc/`

### Option 2: Local Development with Node.js Server (Legacy)

If you want to run locally with the old CSV backend:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Open `http://localhost:3000` in your browser

## Project Structure

```
gallego-travel-inc/
├── index.html              # Landing page
├── questionnaire.html      # Multi-step questionnaire
├── GOOGLE_SHEETS_SETUP.md  # Google Sheets setup guide
├── .github/workflows/      # GitHub Actions for deployment
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
