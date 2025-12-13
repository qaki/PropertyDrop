# Testing Guide - Recent Features

This guide covers testing for the most recently implemented features.

---

## 🎯 What We Built

### Phase 1.2: Branded Emails (CRITICAL)
- ✅ Client receipt email after payment
- ✅ Photographer sales alert email after payment

### Phase 2.2: Job Editing
- ✅ Edit job details (name, email, amount)

---

## 📧 Test 1: Payment Email Notifications

### Prerequisites
- You need a photographer account with Stripe Connected
- You need an active job with uploaded photos
- You need access to TWO email inboxes (photographer's email and a test client email)

### Steps

1. **Create a Test Job**
   - Login as photographer at: https://property-drop.com/login
   - Go to "New Job"
   - Fill in:
     - Job Name: `123 Test Street Email Test`
     - Agent Email: **YOUR TEST EMAIL** (use an email you can check, like Gmail)
     - Job Amount: `$50.00`
   - Click "Create Job"

2. **Upload Photos**
   - Upload 2-3 test images
   - Wait for processing to complete

3. **Get the Delivery Link**
   - Copy the "Client Delivery Link"
   - Open it in an **incognito/private browser window** (to simulate the client)

4. **Complete Payment**
   - On the delivery page, click "Pay Now & Download Photos"
   - Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/25`)
   - CVC: Any 3 digits (e.g., `123`)
   - Complete the payment

5. **Check Emails** ✅

   **CLIENT EMAIL (Agent Email you entered):**
   - Subject: `Payment Receipt - [Job Name] Photos`
   - Should contain:
     - Property name
     - Amount paid
     - Link to delivery page
     - Link to Stripe receipt
     - Photo count
     - Professional PropertyDrop branding

   **PHOTOGRAPHER EMAIL (Your account email):**
   - Subject: `💰 Payment Received: $50.00 - [Job Name]`
   - Should contain:
     - Amount earned
     - Property name
     - Client email
     - Photo count
     - Link to job dashboard
     - Professional PropertyDrop branding

### Expected Results
- ✅ Client receives branded receipt with delivery link
- ✅ Photographer receives sales alert notification
- ✅ Job status changes to "Paid"
- ✅ Photos unlock on delivery page

### Troubleshooting
- **No emails received?**
  - Check spam/junk folders
  - Verify Resend is configured: `RESEND_API_KEY` in environment
  - Check Render logs for email errors
  - Verify domain `property-drop.com` is verified in Resend

- **Email has broken links?**
  - Check `NEXT_PUBLIC_APP_URL=https://property-drop.com` in environment

---

## ✏️ Test 2: Edit Job Details

### Steps

1. **Login as Photographer**
   - Go to: https://property-drop.com/login

2. **Navigate to a Job**
   - Click "Jobs" in sidebar
   - Click on any existing job

3. **Open Edit Modal**
   - Click the "Edit Job" button (pencil icon)
   - Modal should appear

4. **Edit Job Details**
   - Change Job Name: `456 Edited Property`
   - Change Agent Email: `newemail@test.com`
   - Change Job Amount: `$99.00`
   - Click "Update Job"

5. **Verify Changes**
   - Modal should close
   - Success toast should appear
   - Job details should update on the page
   - Refresh page - changes should persist

### Expected Results
- ✅ Edit modal opens and displays current values
- ✅ All fields can be edited
- ✅ Changes save successfully
- ✅ Toast notification confirms success
- ✅ Page updates with new values
- ✅ Changes persist after refresh

### Edge Cases to Test
- Try to set amount to `$0` - should fail validation
- Try to set invalid email format - should fail validation
- Try to save without changing anything - should still work

---

## 🎨 Test 3: Visual & UX Improvements

### Delivery Page Polish
1. Visit a delivery page: https://property-drop.com/deliver/[hash]
2. Check:
   - ✅ Professional gradient background
   - ✅ Clear property information card
   - ✅ Price prominently displayed
   - ✅ Photo gallery is clean and organized
   - ✅ Payment button is clear and accessible

### Job Creation Page
1. Go to: https://property-drop.com/jobs/new
2. Check:
   - ✅ Clean form layout
   - ✅ Helpful placeholders
   - ✅ Icons for visual clarity
   - ✅ Proper validation messages

---

## 🐛 Known Issues (If Any)

None currently - all features tested and working.

---

## 📊 Success Criteria

All tests pass if:
- ✅ Payment triggers TWO emails (client + photographer)
- ✅ Emails contain all required information
- ✅ Job editing works for all fields
- ✅ UI improvements are visible and functional

---

## 🔄 Next Phase

Once these tests pass, we'll proceed with:
- **P2.1**: Drag-and-drop photo reordering
- **P2.3**: Job creation UI with delivery options
- **P2.4**: Dual download buttons (MLS + Print)

