# ⚡ Quick Setup: Email Verification with Resend

## 🚀 **3-Step Setup**

### **1. Get Resend API Key**
```
1. Go to: https://resend.com
2. Sign up (free)
3. Create API key
4. Copy the key (starts with "re_...")
```

### **2. Add to .env**
```env
RESEND_API_KEY=re_your_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### **3. Restart Server**
```bash
npm run dev
```

---

## ✅ **What You Get**

- ✅ Users must verify email before login
- ✅ Beautiful branded verification emails
- ✅ Secure token-based verification
- ✅ Professional onboarding experience

---

## 🧪 **Test It**

1. **Sign up:** http://localhost:3001/signup
2. **Check email:** Look for "Verify your PropertyDrop account"
3. **Click link:** Verify your email
4. **Sign in:** Now you can log in!

---

## 📧 **Email Preview**

```
From: PropertyDrop <onboarding@resend.dev>
Subject: Verify your PropertyDrop account

Welcome to PropertyDrop, John!

[Verify Email Address Button]

What's next?
• Create your first job
• Upload and process photos
• Share delivery links
• Get paid automatically
```

---

## 🔒 **Security**

- ✅ 64-character random tokens
- ✅ Tokens cleared after use
- ✅ Login blocked until verified
- ✅ Automatic account cleanup on email failure

---

## 📂 **What Was Built**

**New Files:**
- `src/lib/resend.ts` - Email client
- `src/emails/verification-email.tsx` - Email template
- `src/app/verify-email/page.tsx` - Success page

**Updated:**
- Database: Added `emailVerificationToken` field
- Signup: Sends verification email
- Login: Blocks unverified users

---

## 🎯 **User Flow**

```
Sign Up → Email Sent → Check Inbox → Click Link → Verified → Login ✅
```

---

## 🐛 **Troubleshooting**

**Email not sending?**
- Check `RESEND_API_KEY` in `.env`
- Restart dev server

**Can't log in?**
- Check email for verification link
- Error will say "Please verify your email"

**Email not received?**
- Check spam folder
- Try signing up again

---

## 🎉 **Done!**

Email verification is now fully integrated! Users must verify their email before they can access the dashboard.

For detailed documentation, see: `docs/EMAIL_VERIFICATION_SETUP.md`

