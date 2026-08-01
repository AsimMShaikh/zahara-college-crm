# Google Sheet Setup Guide for Admissions

This guide will help you connect your Zahara College website admission form to your Google Sheet.

---

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like **"Zahara Admissions"**
4. Rename the first tab to **"Admissions"** (exact name, case-sensitive)

### Add Column Headers

In the first row, add these headers:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| **Submitted At** | **Name** | **Phone** | **Email** | **Course** | **City** | **Qualification** | **Message** | **Consent** |

---

## Step 2: Get Your Spreadsheet ID

From your Google Sheet URL, copy the Spreadsheet ID:

```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
                                       ^^^^^^^^^^^^^^^^^^^
                                       Copy this part
```

**Example:**
- URL: `https://docs.google.com/spreadsheets/d/1abc123xyz/edit`
- Spreadsheet ID: `1abc123xyz`

**Save this ID** - you'll need it in Step 4.

---

## Step 3: Deploy Google Apps Script

### 3.1 Open Apps Script Editor

1. From your Google Sheet, click **Extensions** → **Apps Script**
2. A new browser tab will open with the script editor
3. Delete any existing code in the editor

### 3.2 Paste the Script

Copy and paste this entire script:

```javascript
/*
 * Zahara College Admissions Webhook
 * Receives form submissions from the website and saves to Google Sheet
 */
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const expectedToken = PropertiesService.getScriptProperties().getProperty('ADMISSION_WEBHOOK_TOKEN');
  
  // Validate token
  if (!expectedToken || data.token !== expectedToken) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Get spreadsheet and sheet
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('Admissions');
  
  // Append the row
  sheet.appendRow([
    data.submittedAt,
    data.name,
    data.phone,
    data.email || '',
    data.course,
    data.city || '',
    data.qualification || '',
    data.message || '',
    data.consent
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
```

### 3.3 Save the Script

1. Click the **Save** icon (💾) or press `Ctrl+S`
2. Name your project: **"Zahara Admissions Webhook"**
3. Click **OK**

---

## Step 4: Configure Script Properties

### 4.1 Generate a Secure Token

Generate a random token (this acts as a password). You can use one of these methods:

**Option A: Use a password generator**
- Visit [passwordsgenerator.net](https://passwordsgenerator.net/)
- Generate a 32-character random string

**Option B: Use Node.js (if you have it)**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option C: Simple random string**
Create a long random string like: `zh_live_a9d8f7e6c5b4a3d2e1f0g9h8i7j6k5l4`

**Save this token** - you'll need it for both Google Apps Script AND your website.

### 4.2 Set Script Properties

1. In the Apps Script editor, click the **gear icon** (⚙️) on the left sidebar (Project Settings)
2. Scroll down to **Script Properties**
3. Click **Add script property**

**Add these TWO properties:**

| Property | Value |
|----------|-------|
| `SPREADSHEET_ID` | Your Spreadsheet ID from Step 2 |
| `ADMISSION_WEBHOOK_TOKEN` | Your random token from Step 4.1 |

**Example:**
```
Property: SPREADSHEET_ID
Value: 1abc123xyz456def789

Property: ADMISSION_WEBHOOK_TOKEN
Value: zh_live_a9d8f7e6c5b4a3d2e1f0g9h8i7j6k5l4
```

4. Click **Save script properties**

---

## Step 5: Deploy the Web App

### 5.1 Create Deployment

1. Click the **Deploy** button (top right) → **New deployment**
2. Click the gear icon next to "Select type" → Choose **Web app**

### 5.2 Configure Deployment Settings

Fill in these settings:

- **Description:** `Zahara Admissions Webhook v1`
- **Execute as:** `Me (your-email@gmail.com)`
- **Who has access:** `Anyone`

⚠️ **Important:** Must select "Anyone" for your website to access it.

3. Click **Deploy**

### 5.3 Authorize the Script

1. A popup will appear asking for permissions
2. Click **Authorize access**
3. Choose your Google account
4. Click **Advanced** → **Go to Zahara Admissions Webhook (unsafe)**
5. Click **Allow**

### 5.4 Copy the Deployment URL

After authorization, you'll see a **Web app URL** like:

```
https://script.google.com/macros/s/AKfycbzXXXXXXXXXXXXXXXXXX/exec
```

**Copy this entire URL** - you'll need it in Step 6.

---

## Step 6: Configure Your Website

### 6.1 Create Environment File

1. In your project root, create a file named **`.env.local`** (if it doesn't exist)

2. Add these two lines with your actual values:

```env
GOOGLE_ADMISSIONS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_URL_HERE/exec
GOOGLE_ADMISSIONS_WEBHOOK_TOKEN=your_random_token_here
```

**Example:**
```env
GOOGLE_ADMISSIONS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbzXXXXXXXXXXXXXXXXXX/exec
GOOGLE_ADMISSIONS_WEBHOOK_TOKEN=zh_live_a9d8f7e6c5b4a3d2e1f0g9h8i7j6k5l4
```

⚠️ **Important:** Use the SAME token you set in Google Apps Script properties!

### 6.2 Restart Development Server

If your dev server is running, restart it to load the new environment variables:

```bash
# Stop the current server (Ctrl+C)
# Then start again:
npm run dev
```

---

## Step 7: Test the Integration

### 7.1 Submit a Test Form

1. Open your website: `http://localhost:3000/admissions`
2. Fill out the admission form with test data:
   - Name: Test Student
   - Phone: 1234567890
   - Email: test@example.com
   - Course: Basic Computer
   - City: Mumbai
   - Qualification: 12th Pass
   - Message: This is a test submission
   - Check the consent box
3. Click **Submit admission enquiry**

### 7.2 Check Google Sheet

1. Go back to your Google Sheet
2. You should see a new row with your test data
3. If you see the data, **SUCCESS!** ✅

### 7.3 Troubleshooting

**If data doesn't appear:**

1. **Check environment variables:**
   - Open `.env.local` and verify both values are correct
   - Make sure there are no extra spaces or quotes
   - Restart your dev server

2. **Check browser console:**
   - Press F12 in your browser
   - Go to Console tab
   - Submit the form again
   - Look for any error messages

3. **Check Apps Script logs:**
   - Go to Apps Script editor
   - Click on **Executions** icon (⏱️) on the left sidebar
   - Look for recent executions and any errors

4. **Verify token match:**
   - Token in `.env.local` must EXACTLY match the token in Apps Script properties
   - They are case-sensitive

5. **Check sheet name:**
   - Make sure your sheet tab is named exactly "Admissions" (capital A)

---

## Step 8: Deploy to Vercel

When you're ready to deploy to production:

### 8.1 Add Environment Variables to Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:

| Name | Value |
|------|-------|
| `GOOGLE_ADMISSIONS_WEBHOOK_URL` | Your Apps Script deployment URL |
| `GOOGLE_ADMISSIONS_WEBHOOK_TOKEN` | Your random token |

5. Make sure to select all environments: **Production**, **Preview**, and **Development**
6. Click **Save**

### 8.2 Redeploy

After adding environment variables, redeploy your site for changes to take effect.

---

## Security Best Practices

✅ **DO:**
- Keep your token secret and secure
- Never commit `.env.local` to Git (it's already in `.gitignore`)
- Use a long, random token (32+ characters)
- Regularly check your Google Sheet for suspicious submissions

❌ **DON'T:**
- Share your deployment URL publicly
- Use simple tokens like "password123"
- Commit `.env.local` to version control
- Share your token in public channels

---

## Data Fields Reference

The form submission sends these fields to your sheet:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| submittedAt | DateTime | Yes | ISO timestamp of submission |
| name | String | Yes | Full name of student |
| phone | String | Yes | Mobile number |
| email | String | No | Email address |
| course | String | Yes | Selected course |
| city | String | No | City of residence |
| qualification | String | No | Highest qualification |
| message | String | No | Student's goals/message |
| consent | Boolean | Yes | Consent to contact |

---

## Quick Reference Checklist

- [ ] Google Sheet created with "Admissions" tab
- [ ] Column headers added to row 1
- [ ] Spreadsheet ID copied
- [ ] Apps Script code pasted
- [ ] Script saved with project name
- [ ] Script properties added (SPREADSHEET_ID and ADMISSION_WEBHOOK_TOKEN)
- [ ] Web app deployed with "Anyone" access
- [ ] Deployment URL copied
- [ ] `.env.local` created with both environment variables
- [ ] Dev server restarted
- [ ] Test submission successful
- [ ] Data appears in Google Sheet

---

## Need Help?

If you encounter issues:

1. Double-check each step above
2. Verify token matches in both places
3. Check Apps Script execution logs
4. Test with browser developer console open
5. Make sure sheet name is exactly "Admissions"

---

## Files Involved

**Your Project:**
- `.env.local` - Local environment variables (create this)
- `src/app/api/admissions/route.ts` - API endpoint that sends data
- `src/components/admissions/admission-form.tsx` - The form component

**Google Apps Script:**
- `integrations/google-apps-script/Code.gs` - Reference script (already in your repo)

---

**Last Updated:** August 1, 2026
