# PropertyDrop MVP - Testing Checklist

## ✅ Authentication Flow

- [ ] **Sign Up**
  - [ ] Create new account with email/password
  - [ ] Verify account is created in database
  - [ ] Automatically logged in after signup

- [ ] **Sign In**
  - [ ] Log in with existing credentials
  - [ ] Wrong password shows error
  - [ ] Redirects to dashboard after login

- [ ] **Session Management**
  - [ ] Stay logged in after page refresh
  - [ ] Sign out works correctly
  - [ ] Can't access dashboard when logged out

---

## ✅ Job Creation & Management

- [ ] **Create Job**
  - [ ] Fill in job name (e.g., "123 Main St")
  - [ ] Add agent email
  - [ ] Set job amount (e.g., $150)
  - [ ] Job appears in dashboard immediately
  - [ ] Verify job in database (Prisma Studio)

- [ ] **View Jobs**
  - [ ] All jobs show in dashboard
  - [ ] Most recent jobs appear first
  - [ ] Job details are correct (name, email, amount)

- [ ] **Job Details Page**
  - [ ] Click on a job to view details
  - [ ] See upload dropzone
  - [ ] See "View Delivery Page" link

---

## ✅ File Upload Flow

- [ ] **Upload Images**
  - [ ] Drag and drop 1 image
  - [ ] Drag and drop multiple images (3-5)
  - [ ] Upload button works (click to select)
  - [ ] Large files work (5MB+)
  - [ ] Different formats work (JPG, PNG)

- [ ] **Upload Status**
  - [ ] See upload progress indicator
  - [ ] Images appear in asset list immediately
  - [ ] Status shows "Processing" initially
  - [ ] Status changes to "READY" after processing

- [ ] **Asset Storage**
  - [ ] Verify assets in database (Prisma Studio)
  - [ ] originalKey has UploadThing URL
  - [ ] mlsKey is populated (if auto-resize active)
  - [ ] File metadata is correct (size, dimensions)

---

## ✅ Delivery Portal - Unpaid State

- [ ] **Access Delivery Page**
  - [ ] Click "View Delivery Page" from job details
  - [ ] URL has unique hash (not job ID)
  - [ ] Page loads without login required

- [ ] **Watermark Verification**
  - [ ] See "PREVIEW ONLY" watermark (center, large)
  - [ ] See "UNPAID" badge (top-left, red)
  - [ ] See "LOCKED" badge (bottom-right, red)
  - [ ] Watermarks visible on ALL images

- [ ] **Security Checks**
  - [ ] Right-click is blocked on images
  - [ ] Cannot drag images
  - [ ] "Save As" still shows watermarks
  - [ ] Image URLs go through `/api/asset/[id]/preview`
  - [ ] Direct access to `/api/asset/[id]` returns 402 error

- [ ] **Payment Button**
  - [ ] See test button: "🧪 [TEST] Mark as Paid"
  - [ ] Button is clickable
  - [ ] Warning text shows about payment disabled

---

## ✅ Delivery Portal - Paid State

- [ ] **Mark as Paid**
  - [ ] Click test "Mark as Paid" button
  - [ ] Page refreshes automatically
  - [ ] Job marked as paid in database

- [ ] **Watermark Removal**
  - [ ] NO watermarks visible
  - [ ] NO "UNPAID" or "LOCKED" badges
  - [ ] Images are clear and unobstructed

- [ ] **Download Features**
  - [ ] See "All Paid & Unlocked!" message
  - [ ] Green success banner appears
  - [ ] Hover over image shows "Download" button
  - [ ] Click download on individual image works
  - [ ] Right-click is enabled again

- [ ] **ZIP Download**
  - [ ] Click "Download All Assets (ZIP)" button
  - [ ] See "Preparing ZIP..." loading state
  - [ ] ZIP file downloads automatically
  - [ ] ZIP filename includes job name
  - [ ] Open ZIP and verify all images inside
  - [ ] Images in ZIP are full quality (no watermarks)
  - [ ] File names are sequential (job_1.jpg, job_2.jpg, etc.)

---

## ✅ Edge Cases & Error Handling

- [ ] **Empty States**
  - [ ] Dashboard with no jobs shows "No jobs yet"
  - [ ] Job with no photos shows "No photos uploaded yet"

- [ ] **Invalid URLs**
  - [ ] Wrong delivery hash shows 404
  - [ ] Non-existent job ID shows 404

- [ ] **Large Datasets**
  - [ ] Upload 20+ images at once
  - [ ] Create 10+ jobs
  - [ ] All perform reasonably fast

- [ ] **Browser Compatibility**
  - [ ] Test in Chrome
  - [ ] Test in Firefox (if available)
  - [ ] Test in Safari (if available)

- [ ] **Mobile Responsiveness**
  - [ ] Open delivery page on mobile browser
  - [ ] Layout looks good on small screens
  - [ ] Watermarks visible on mobile
  - [ ] Download works on mobile

---

## ✅ Database Integrity

- [ ] **Open Prisma Studio**
  - Run: `npx prisma studio`
  - Check all tables have correct data

- [ ] **Verify Relationships**
  - [ ] Jobs link to correct photographer (user)
  - [ ] Assets link to correct job
  - [ ] `isPaid` field updates correctly

- [ ] **Data Consistency**
  - [ ] No orphaned assets (assets without jobs)
  - [ ] No duplicate entries
  - [ ] Timestamps are correct

---

## ✅ Performance & Reliability

- [ ] **Page Load Times**
  - [ ] Dashboard loads in < 2 seconds
  - [ ] Delivery page loads in < 2 seconds
  - [ ] Upload completes in reasonable time

- [ ] **Console Errors**
  - [ ] No JavaScript errors in browser console
  - [ ] No 404 errors for missing resources
  - [ ] No CORS errors

- [ ] **Server Logs**
  - [ ] Check terminal for errors
  - [ ] Prisma queries execute successfully
  - [ ] No uncaught exceptions

---

## 📊 Test Results Summary

**Date:** _____________

**Total Tests:** ___ passed / ___ total

**Critical Issues Found:** 
- _______________________

**Minor Issues Found:**
- _______________________

**Notes:**
_______________________
_______________________

---

## 🚀 Ready for Next Phase When:

- [ ] All critical features work
- [ ] No blocking bugs
- [ ] Watermark security confirmed
- [ ] Download flow tested with 20+ images
- [ ] Tested on at least 2 browsers
- [ ] Database integrity verified

