# Stripe Connect Setup Guide

## ✅ What I've Built

I've implemented complete **Stripe Connect** integration so photographers receive payments **directly** from their clients!

### Key Features:
- 💰 **Money goes directly to photographer's bank account**
- 🔒 **Secure payment processing by Stripe**
- ⚡ **Automatic photo unlocking on payment**
- 🎯 **Custom pricing per job**
- 📊 **Full payment tracking in Stripe dashboard**

---

## 🔧 What You Need to Do

### **Step 1: Update Your .env File**

Add these three lines to your `.env` file:

```env
# Stripe API Keys (from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_51RyepoClLcfrqM2r...  # Your secret key from Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51RyepoClLcfrqM2r...  # Your publishable key

# Webhook secret (you'll add this in Step 3)
STRIPE_WEBHOOK_SECRET=
```

### **Step 2: Update Database Schema**

Once you have database access (VPN off or database awake):

```bash
npx prisma db push
```

This adds `stripeAccountId` and `stripeAccountStatus` fields to the User table.

### **Step 3: Start Development Server**

```bash
npm run dev
```

---

## 📋 How It Works

### **For Photographers:**

1. **Connect Stripe (One Time)**
   - Go to Settings → Payment Settings
   - Click "Connect Stripe Account"
   - Complete Stripe onboarding (5 minutes)
   - ✅ Ready to receive payments!

2. **Create Jobs as Usual**
   - Create job with client email
   - Set price (e.g., $25.00)
   - Upload photos
   - Get delivery link

3. **Send Link to Client**
   - Client clicks "Unlock Photos - $25.00"
   - Redirected to Stripe checkout
   - Client pays with card

4. **Receive Money Directly**
   - Payment goes straight to photographer's Stripe account
   - Photos unlock automatically
   - Money arrives in bank in 2-7 days

### **For Clients:**

1. Receive delivery link from photographer
2. See watermarked previews
3. Click "Unlock Photos - $XX.XX"
4. Pay with card on secure Stripe page
5. Automatically redirected back
6. Photos unlocked! Can download all

---

## 🚀 Testing Locally

### **Test Cards:**
- **Success:** `4242 4242 4242 4242`
- **Declined:** `4000 0000 0000 0002`
- Use any future expiry date (e.g., 12/34)
- Use any 3-digit CVC

### **Test Flow:**
1. Sign up as a photographer
2. Go to Settings → Connect Stripe (will be in test mode)
3. Create a job with price $25.00
4. Upload some photos
5. Open delivery link in incognito window (act as client)
6. Click "Unlock Photos"
7. Use test card `4242 4242 4242 4242`
8. Complete payment
9. Photos unlock automatically!

---

## 🌐 Production Setup (After Deployment)

### **1. Switch to Live Mode**

In Stripe Dashboard:
- Go to https://dashboard.stripe.com/settings/connect
- Toggle "View test data" OFF
- Get your **live** API keys from https://dashboard.stripe.com/apikeys

Update `.env` on Render:
```env
STRIPE_SECRET_KEY=sk_live_xxxxx  # Change from sk_test_
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx  # Change from pk_test_
```

### **2. Set Up Webhook**

After deploying to Render:

1. Go to: https://dashboard.stripe.com/webhooks
2. Click **"Add endpoint"**
3. Endpoint URL: `https://property-drop.com/api/webhooks/stripe`
4. Description: "PropertyDrop payment notifications"
5. **Select events to listen to:**
   - ✅ `checkout.session.completed`
   - ✅ `account.updated`
6. Click "Add endpoint"
7. Copy the **Signing secret** (starts with `whsec_...`)

Update `.env` on Render:
```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

Redeploy the app.

### **3. Test in Production**

1. Create a real Stripe account (not test mode)
2. Connect it to PropertyDrop
3. Create a test job with small price ($0.50)
4. Pay with your real card
5. Verify photos unlock
6. Check money in Stripe dashboard

---

## 💰 Money Flow

```
Client pays $25.00
  ↓
Stripe Processing Fee: -$1.03 (2.9% + $0.30)
  ↓
PropertyDrop Commission: $0.00 (YOU CURRENTLY TAKE $0)
  ↓
Photographer Receives: $23.97
  ↓
Money hits photographer's bank in 2-7 days
```

### **To Take a Commission (Optional):**

In `src/app/actions/stripe.ts`, change:

```typescript
application_fee_amount: 0, // Currently $0

// To take $2.50 per transaction:
application_fee_amount: 250, // $2.50 in cents
```

The money you take goes to YOUR Stripe account, not the photographer's.

---

## 🔍 What Happened to Whop?

I **removed** the Whop integration and replaced it with Stripe Connect because:

✅ **Stripe is industry standard** (used by Uber, Airbnb, Shopify)  
✅ **Better for your use case** (direct photographer payouts)  
✅ **More professional** (checkout stays on your domain)  
✅ **Automatic webhook support** (photos unlock instantly)  
✅ **Full control** (you can add fees later if you want)

---

## 📊 Photographer Dashboard

Photographers can see everything in their Stripe dashboard:
- Total earnings
- Pending payouts
- Transaction history
- Bank account info
- Tax forms (1099-K)

---

## 🆘 Troubleshooting

### **"Photographer hasn't set up payment processing yet"**
- Photographer needs to go to Settings → Payment Settings → Connect Stripe

### **"Setup Incomplete"**
- Photographer started but didn't finish Stripe onboarding
- Click "Complete Setup" in Settings

### **Webhook not working**
- Check webhook secret is correct in `.env`
- Check webhook URL is correct: `https://property-drop.com/api/webhooks/stripe`
- Check events include `checkout.session.completed`

### **Database can't be reached**
- Turn off VPN
- Wait for Neon database to wake up (free tier sleeps after inactivity)
- Try again in 1-2 minutes

---

## 📝 Next Steps

1. ✅ Add Stripe keys to `.env`
2. ✅ Push database schema: `npx prisma db push`
3. ✅ Test locally with test cards
4. ✅ Deploy to Render
5. ✅ Set up webhook in production
6. ✅ Switch to live mode
7. ✅ Test with real payment

---

## 🎉 You're Done!

Photographers can now:
- Connect their Stripe account
- Receive payments directly from clients
- Get money in their bank in 2-7 days

Clients can:
- Pay securely with any card
- Photos unlock automatically
- Download high-res images

**PropertyDrop makes money from:**
- Photographer subscriptions (you said $X/month)
- Optional: Commission per transaction (currently $0)

---

## 💡 Pro Tips

1. **Test mode vs Live mode**: Always test with test keys first!
2. **Stripe fees**: Factor in 2.9% + $0.30 per transaction
3. **Payout timing**: 2 days for established accounts, 7 days for new ones
4. **Tax reporting**: Stripe automatically issues 1099-K forms
5. **Disputes**: Clients can dispute charges - photographer handles refunds

---

**Need help?** Check the Stripe docs: https://stripe.com/docs/connect

