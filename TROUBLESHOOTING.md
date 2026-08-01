# Google Apps Script Integration - Troubleshooting Guide

## Current Issue: 502 Bad Gateway Error

The form submission is failing with a 502 error. The Google Apps Script endpoint is returning a "Page not found" error.

---

## Root Cause

The deployment URL might be incorrect or the Web App deployment needs to be reconfigured.

---

## Solution Steps

### Step 1: Verify Google Apps Script Deployment

1. Go to your Google Apps Script project
2. Click **Deploy** → **Manage deployments**
3. You should see your deployment listed
4. **Important:** Make sure the deployment is **ACTIVE**

### Step 2: Get the Correct Web App URL

There are TWO types of URLs in Google Apps Script:

❌ **WRONG URL** (this won't work):
```
https://script.google.com/macros/s/AKfyc.../dev
```

✅ **CORRECT URL** (use this one):
```
https://script.google.com/macros/s/AKfyc.../exec
```

**How to get the correct URL:**

1. In Apps Script editor, click **Deploy** → **Manage deployments**
2. Click on the **deployment** (not "Test deployments")
3. Look for **"Web app"** URL
4. Copy the **entire URL** that ends with `/exec`

### Step 3: Check Deployment Settings

Make sure your deployment has these exact settings:

- **Execute as:** Me (your email)
- **Who has access:** **Anyone**

⚠️ If "Who has access" is set to "Only myself", your website won't be able to call it!

### Step 4: Update Deployment (if needed)

If you made changes to the script or settings:

1. Click **Deploy** → **New deployment**
2. Click the gear icon → Select **Web app**
3. Fill in:
   - **Description:** `Zahara Admissions Webhook v2` (increment version)
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone`
4. Click **Deploy**
5. **Copy the NEW deployment URL**

### Step 5: Update .env.local

1. Open `.env.local` in your project
2. Replace the URL with the correct one:

```env
GOOGLE_ADMISSIONS_WEBHOOK_URL=YOUR_NEW_URL_HERE
GOOGLE_ADMISSIONS_WEBHOOK_TOKEN=Vastugunahuyan
```

3. **Restart the dev server:**
```bash
npm run dev
```

---

## Testing the Deployment Manually

### Test in Browser

Open this URL in your browser (replace with your actual URL):

```
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec
```

**Expected result:** You should see an error like:
```json
{"ok":false}
```

This means the script is running, but it's rejecting the request because there's no token (which is correct!).

**If you see:** "Page not found" or "Sorry, unable to open the file" → The deployment URL is wrong.

### Test with Sample Data

Try this command in Git Bash (replace with your values):

```bash
curl -X POST "YOUR_DEPLOYMENT_URL_HERE" \
  -H "Content-Type: text/plain;charset=utf-8" \
  -d '{"token":"Vastugunahuyan","name":"Test","phone":"1234567890","email":"test@test.com","course":"Basic Computer","submittedAt":"2026-08-01T07:00:00Z"}'
```

**Expected result:**
```json
{"ok":true}
```

If you get this, check your Google Sheet - you should see a new row!

---

## Common Issues

### Issue 1: "Page not found" or HTML response

**Cause:** Wrong deployment URL or deployment not active.

**Fix:** Follow Steps 2-4 above to get the correct URL.

### Issue 2: `{"ok":false}` response

**Cause:** Token mismatch.

**Fix:** 
1. Check the token in Google Apps Script properties
2. Check the token in `.env.local`
3. Make sure they match exactly (case-sensitive)

### Issue 3: Permission errors in Apps Script

**Cause:** Script not authorized.

**Fix:**
1. Run the script manually once (click the "Run" button in Apps Script)
2. Authorize when prompted
3. Then deploy again

### Issue 4: CORS errors in browser console

**Cause:** This is normal! Google Apps Script returns proper CORS headers.

**Fix:** This should not be an issue. If it persists, check deployment settings.

---

## Verification Checklist

Before testing the form again:

- [ ] Apps Script code is saved
- [ ] Script properties are set (SPREADSHEET_ID and ADMISSION_WEBHOOK_TOKEN)
- [ ] Deployment is created and **active**
- [ ] Deployment URL ends with `/exec` (not `/dev`)
- [ ] "Who has access" is set to **Anyone**
- [ ] Deployment URL is copied correctly to `.env.local`
- [ ] Token matches in both places (case-sensitive)
- [ ] Dev server has been restarted
- [ ] Manual curl test returns `{"ok":true}`

---

## Next Steps After Fix

Once you've updated the deployment URL:

1. **Restart dev server:**
   ```bash
   npm run dev
   ```

2. **Test the form:**
   - Go to http://localhost:3001/admissions (or :3000)
   - Fill out and submit the form
   - Check your Google Sheet for the new row

3. **Check for success message:**
   - You should see: "Thank you. Our admissions team will contact you soon."
   - Form should clear after successful submission

---

## Still Having Issues?

If the problem persists:

1. **Check Apps Script execution logs:**
   - Apps Script editor → Click **Executions** (⏱️ icon)
   - Look for recent POST requests
   - Check for any error messages

2. **Check Script Properties:**
   - Apps Script → Settings (⚙️)
   - Scroll to "Script Properties"
   - Verify both properties exist and have correct values

3. **Try a fresh deployment:**
   - Delete the old deployment
   - Create a completely new deployment
   - Use the new URL

---

## Current Configuration

**Your current settings:**

- Deployment URL: `https://script.google.com/macros/s/AKfycbxmzz8bY0jy_SZF721VUIpj-hoLkjjmNrAOWto6ftWJYFnVA6pjNbZsGNL5026RIJBV/exec`
- Token: `Vastugunahuyan`

**Status:** ❌ Deployment URL returning "Page not found"  
**Action needed:** Get correct deployment URL from Google Apps Script

---

**Last Updated:** August 1, 2026
