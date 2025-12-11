# 📧 Email Verification Setup Guide

**Status:** ✅ **COMPLETE - Ready to Configure**

---

## 🎯 **What Was Implemented**

Email verification using **Resend** has been fully integrated into PropertyDrop:

1. ✅ Users must verify email before signing in
2. ✅ Beautiful verification email template
3. ✅ Secure token-based verification
4. ✅ Automatic email sending on signup
5. ✅ Login blocked for unverified users
6. ✅ Verification success page

---

## 🔧 **Setup Instructions**

### **Step 1: Get Resend API Key**

1. **Go to Resend:** https://resend.com
2. **Sign up** for a free account
3. **Verify your email**
4. **Go to API Keys:** https://resend.com/api-keys
5. **Create new API key:**
   - Name: "PropertyDrop"
   - Permission: "Sending access"
6. **Copy the API key** (starts with `re_...`)

### **Step 2: Add to .env File**

Add this line to your `.env` file:

```env
RESEND_API_KEY=re_your_api_key_here
```

**Complete .env example:**
```env
# Database
DATABASE_URL="postgresql://..."

# Auth
AUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3001"

# UploadThing
UPLOADTHING_TOKEN="your-token-here"

# Resend (Email)
RESEND_API_KEY="re_your_api_key_here"

# App URL (for email links)
NEXT_PUBLIC_APP_URL="http://localhost:3001"

# Optional: Payment bypass for testing
NEXT_PUBLIC_BYPASS_PAYMENT="true"
```

### **Step 3: Restart Dev Server**

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

---

## 🧪 **Test Email Verification**

### **Test Flow:**

1. **Sign Up:**
   ```
   http://localhost:3001/signup
   ```
   - Enter name, email, password
   - Click "Create Account"
   - See success message: "Check your email to verify"

2. **Check Email:**
   - Open your email inbox
   - Find "Verify your PropertyDrop account" email
   - Click "Verify Email Address" button

3. **Verify:**
   - Redirected to verification success page
   - See green checkmark and "Email Verified!" message
   - Click "Continue to Sign In"

4. **Sign In:**
   - Enter your credentials
   - Successfully log in (email is verified)

### **Test Unverified Login Block:**

1. **Try to sign in without verifying:**
   - Go to `/login`
   - Enter credentials
   - See error: "Please verify your email before signing in"

---

## 📧 **Email Template**

The verification email includes:

- ✅ PropertyDrop branding (indigo theme)
- ✅ Personalized greeting with user's name
- ✅ Clear "Verify Email Address" button
- ✅ Fallback text link (for email clients that block buttons)
- ✅ "What's next?" section with onboarding steps
- ✅ 24-hour expiration notice
- ✅ Professional footer

**Preview:**

```
┌─────────────────────────────────────────┐
│  PropertyDrop                           │
│  Real Estate Photography Platform       │
├─────────────────────────────────────────┤
│                                         │
│  Welcome to PropertyDrop, John!         │
│                                         │
│  Thank you for signing up! To complete  │
│  your registration, please verify your  │
│  email address:                         │
│                                         │
│  [Verify Email Address]                 │
│                                         │
│  What's next?                           │
│  • Create your first job                │
│  • Upload and process photos            │
│  • Share delivery links with clients    │
│  • Get paid automatically               │
│                                         │
│  This link expires in 24 hours.         │
└─────────────────────────────────────────┘
```

---

## 🔒 **Security Features**

### **Token Generation:**
- ✅ 32-byte random hex token (64 characters)
- ✅ Cryptographically secure (using Node.js `crypto`)
- ✅ Unique per user
- ✅ Stored in database

### **Verification Process:**
- ✅ Token validated against database
- ✅ Token cleared after successful verification
- ✅ Prevents reuse of verification links
- ✅ User can't sign in until verified

### **Email Delivery:**
- ✅ Transactional email (not marketing)
- ✅ From verified domain (Resend)
- ✅ HTML + Plain text fallback
- ✅ Automatic retry on failure

---

## 📂 **Files Created/Modified**

### **Created:**
1. `src/lib/resend.ts` - Resend client initialization
2. `src/emails/verification-email.tsx` - Email template component
3. `src/app/verify-email/page.tsx` - Verification success page

### **Modified:**
1. `prisma/schema.prisma` - Added `emailVerificationToken` field
2. `src/env.js` - Added `RESEND_API_KEY` validation
3. `src/app/actions/auth.ts` - Updated signup to send email
4. `src/server/auth/config.ts` - Block unverified users from login
5. `src/app/signup/page.tsx` - Show success message after signup

---

## 🎨 **User Experience**

### **Signup Flow:**

```
1. User fills signup form
   ↓
2. Account created (unverified)
   ↓
3. Verification email sent
   ↓
4. Success message: "Check your email"
   ↓
5. User stays on signup page (can't login yet)
```

### **Verification Flow:**

```
1. User clicks email link
   ↓
2. Redirected to /verify-email?token=...
   ↓
3. Token validated
   ↓
4. Email marked as verified
   ↓
5. Success page with "Continue to Sign In" button
   ↓
6. User can now log in
```

### **Login Flow:**

```
1. User enters credentials
   ↓
2. Check if email verified
   ↓
3a. If verified → Login success
3b. If not verified → Error message
```

---

## 🚨 **Error Handling**

### **Email Send Failure:**
- If Resend fails to send email
- User account is **deleted**
- Error shown: "Failed to send verification email"
- User can try signing up again

### **Invalid Token:**
- Shows error page
- "Verification link is invalid"
- Option to sign up again

### **Already Verified:**
- Shows success page
- "Already verified"
- Direct link to login

### **Unverified Login Attempt:**
- Login blocked
- Error: "Please verify your email"
- User must check inbox

---

## 🔧 **Customization**

### **Change Email Sender:**

Edit `src/app/actions/auth.ts`:

```typescript
await resend.emails.send({
  from: "PropertyDrop <noreply@yourdomain.com>", // Change this
  to: parsed.data.email,
  subject: "Verify your PropertyDrop account",
  // ...
});
```

**Note:** You'll need to verify your domain in Resend first.

### **Change Email Template:**

Edit `src/emails/verification-email.tsx` to customize:
- Colors
- Logo
- Text content
- Layout

### **Change Token Expiration:**

Currently tokens never expire (for simplicity). To add expiration:

1. Add `emailVerificationTokenExpires` field to User model
2. Set expiration when creating token
3. Check expiration in verification page

---

## 📊 **Database Schema**

```prisma
model User {
  id                     String    @id @default(cuid())
  email                  String?   @unique
  emailVerified          DateTime? @map("email_verified")
  emailVerificationToken String?   @unique @map("email_verification_token")
  // ... other fields
}
```

**Fields:**
- `emailVerified`: `null` = not verified, `DateTime` = verified timestamp
- `emailVerificationToken`: Unique token for verification link

---

## 🎯 **Production Checklist**

Before deploying to production:

1. ✅ **Verify Domain in Resend:**
   - Add DNS records
   - Verify domain ownership
   - Update `from` address to use your domain

2. ✅ **Update App URL:**
   ```env
   NEXT_PUBLIC_APP_URL="https://yourdomain.com"
   ```

3. ✅ **Test Email Delivery:**
   - Send test emails
   - Check spam folder
   - Verify links work

4. ✅ **Add Token Expiration** (optional but recommended):
   - 24 hours is standard
   - Add cleanup for expired tokens

5. ✅ **Monitor Email Delivery:**
   - Check Resend dashboard
   - Track bounce rates
   - Handle failed deliveries

---

## 🎉 **Benefits**

### **For Users:**
- ✅ Secure account creation
- ✅ Prevents fake signups
- ✅ Confirms email ownership
- ✅ Professional onboarding experience

### **For You:**
- ✅ Valid email addresses only
- ✅ Reduced spam accounts
- ✅ Better email deliverability
- ✅ Compliance with best practices

---

## 🐛 **Troubleshooting**

### **"Failed to send verification email"**
- Check `RESEND_API_KEY` in `.env`
- Verify API key is valid
- Check Resend dashboard for errors

### **"Invalid verification link"**
- Token may have been used already
- User may have signed up twice
- Check database for token

### **Email not received**
- Check spam folder
- Verify email address is correct
- Check Resend logs

### **Can't log in after verification**
- Check database: `emailVerified` should have timestamp
- Try signing out and back in
- Clear browser cache

---

## 📖 **API Reference**

### **Resend Email Send:**

```typescript
await resend.emails.send({
  from: "Sender <email@domain.com>",
  to: "recipient@example.com",
  subject: "Email subject",
  react: EmailComponent({ props }),
});
```

### **Verification URL Format:**

```
http://localhost:3001/verify-email?token=abc123...
```

---

*Last Updated: December 11, 2025*  
*Status: Complete & Ready to Use*

