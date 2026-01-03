# Google Sheets Setup Guide

Follow these steps to set up Google Sheets as your database for the travel questionnaire.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Gallego Travel Responses" (or any name you prefer)
4. In the first row, add these column headers:
   ```
   Name | Email | Identity Type | Travel Time | Available Date Ranges | Departure City | Foreign City Entered | Continent | Selected Cities | Number of Travelers | Adventure Type | Submission Date
   ```

## Step 2: Set Up Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code in the editor
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Format the data for the spreadsheet
    const row = [
      data.name || '',
      data.email || '',
      data.identity || '',
      data.travelTime || '',
      JSON.stringify(data.availableDates || []),
      data.departure || '',
      data.foreignCity || '',
      data.continent || '',
      data.selectedCities ? data.selectedCities.join(', ') : '',
      data.travelers || '',
      data.adventureType || '',
      new Date().toISOString()
    ];
    
    // Append the row to the sheet
    sheet.appendRow(row);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully'
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click the **Save** icon (💾) and name the project "Travel Form Handler"

## Step 3: Deploy the Script

1. Click **Deploy > New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in the deployment settings:
   - **Description**: "Travel questionnaire form handler"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (this allows the form to submit data)
5. Click **Deploy**
6. Click **Authorize access** and follow the prompts to authorize the script
7. **IMPORTANT**: Copy the "Web app URL" - it will look like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
8. Save this URL - you'll need it in the next step

## Step 4: Update Your Website

Open `js/questionnaire.js` and find the line:
```javascript
const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
```

Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with the Web app URL you copied in Step 3.

## Step 5: Deploy to GitHub Pages

1. Commit all your changes to GitHub:
   ```bash
   git add .
   git commit -m "Switch to Google Sheets backend"
   git push
   ```

2. Go to your repository on GitHub
3. Click **Settings** > **Pages**
4. Under "Source", select **main** branch
5. Click **Save**
6. Your site will be live at: `https://gallego-c.github.io/gallego-travel-inc/`

## Testing

1. Open your deployed website
2. Fill out and submit the questionnaire
3. Check your Google Sheet - a new row should appear with the submitted data

## Security Notes

- The Google Apps Script is set to "Anyone" access, which means anyone with the URL can submit data
- If you want to add security, you can implement:
  - Rate limiting in the Apps Script
  - Domain restrictions
  - API key validation
  - CAPTCHA on the form

## Troubleshooting

**"Authorization required"**
- Make sure you authorized the script during deployment
- Redeploy the script and authorize again

**"No data appearing in the sheet"**
- Check the browser console for errors
- Verify the Google Sheets URL is correct in `questionnaire.js`
- Make sure the column headers match exactly

**"CORS error"**
- Google Apps Script automatically handles CORS, but make sure you're using the `/exec` URL (not `/dev`)
