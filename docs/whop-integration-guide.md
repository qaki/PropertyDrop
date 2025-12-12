# 🎉 Whop Payment Integration Guide

## ✅ What We Changed

### **Removed (Paddle)**
- ❌ Deleted `src/lib/paddle.ts`
- ❌ Deleted `src/app/actions/paddle.ts`
- ❌ Deleted `src/app/api/webhooks/paddle/route.ts`
- ❌ Removed `@paddle/paddle-node-sdk` from dependencies
- ❌ Removed all Paddle environment variables

### **Added (Whop)**
- ✅ Created `src/app/actions/whop.ts` - Whop checkout action
- ✅ Created `src/app/api/webhooks/whop/route.ts` - Whop webhook handler
- ✅ Updated delivery page to use Whop checkout button
- ✅ Added Whop environment variables to `src/env.js`

---

## 🔧 Setup Instructions

### **Step 1: Create Your Whop Product**

1. Go to [Whop Dashboard](https://dash.whop.com/)
2. Navigate to **Products** → **Create Product**
3. Set up your pricing (e.g., $15 per photo delivery)
4. Copy your **Product ID** (looks like: `plan_xxxxxxxxxx` or `prod_xxxxxxxxxx`)

### **Step 2: Get Your API Keys**

1. In Whop Dashboard, go to **Settings** → **API Keys**
2. Copy your **API Key**
3. Copy your **Webhook Secret** (you'll need this for Step 4)

### **Step 3: Update Environment Variables**

#### **Local Development (`.env` file):**

```env
# Whop Payment Gateway
WHOP_API_KEY=your_whop_api_key_here
WHOP_WEBHOOK_SECRET=your_whop_webhook_secret_here
NEXT_PUBLIC_WHOP_PRODUCT_ID=plan_xxxxxxxxxx
```

#### **Render.com Production:**

Go to your Render service → **Environment** tab and add:

| Key | Value |
|-----|-------|
| `WHOP_API_KEY` | `your_whop_api_key_here` |
| `WHOP_WEBHOOK_SECRET` | `your_whop_webhook_secret_here` |
| `NEXT_PUBLIC_WHOP_PRODUCT_ID` | `plan_xxxxxxxxxx` |

### **Step 4: Configure Whop Webhook**

1. In Whop Dashboard, go to **Settings** → **Webhooks**
2. Click **Add Webhook**
3. Set **Webhook URL** to:
   ```
   https://your-app.onrender.com/api/webhooks/whop
   ```
   Or for local testing:
   ```
   https://your-ngrok-url.ngrok.io/api/webhooks/whop
   ```
4. Select these events:
   - ✅ `payment.succeeded`
   - ✅ `membership.went_valid`
5. Click **Save**

---

## 🧪 Testing Locally

### **Option 1: Use Test Button**

The delivery page still has a **"[TEST] Mark as Paid"** button for quick testing without real payment.

### **Option 2: Test Whop Checkout**

1. Install [ngrok](https://ngrok.com/) for local webhook testing:
   ```bash
   ngrok http 3001
   ```

2. Update Whop webhook URL to your ngrok URL:
   ```
   https://your-random-id.ngrok.io/api/webhooks/whop
   ```

3. Click **"Unlock Photos"** button on delivery page
4. Complete checkout on Whop
5. Verify webhook is received and job is marked as paid

---

## 📋 How It Works

### **Payment Flow:**

1. **Client views delivery page** → Sees watermarked preview images
2. **Client clicks "Unlock Photos"** → Redirected to Whop checkout
3. **Client completes payment** → Whop processes payment
4. **Whop sends webhook** → Your app receives `payment.succeeded` event
5. **Job marked as paid** → Client can download full-resolution images

### **Webhook Payload:**

Whop sends webhooks like this:

```json
{
  "action": "payment.succeeded",
  "data": {
    "checkout_data": "{\"jobId\":\"clxxx\",\"jobName\":\"Beach House Photos\"}",
    "amount": 1500,
    "currency": "USD"
  }
}
```

Your webhook handler (`/api/webhooks/whop/route.ts`) extracts `jobId` and marks the job as paid.

---

## 🚀 Deployment Status

✅ **Code pushed to GitHub:** Commit `2ac4a53`  
⏳ **Render auto-deploying now...**  

This build should succeed because we removed all Paddle TypeScript errors!

---

## 📝 Next Steps

1. ✅ **Create Whop product** and get your Product ID
2. ✅ **Add environment variables** to Render dashboard
3. ✅ **Configure webhook** in Whop dashboard
4. ✅ **Test payment flow** end-to-end
5. ✅ **Remove test button** from production (optional)

---

## 🆘 Troubleshooting

### **Checkout button doesn't work:**
- Check that `NEXT_PUBLIC_WHOP_PRODUCT_ID` is set correctly
- Verify product ID format: `plan_xxxxx` or `prod_xxxxx`

### **Webhook not received:**
- Check Whop webhook logs in dashboard
- Verify webhook URL is correct (https://your-app.onrender.com/api/webhooks/whop)
- Make sure your app is deployed and accessible

### **Job not marked as paid:**
- Check Render logs for webhook errors
- Verify `checkout_data` contains `jobId`
- Check database to confirm job exists

---

## 💡 Pro Tips

1. **Dynamic Pricing:** Each job has a `jobAmount` field - you can create different Whop products for different price tiers
2. **Custom Data:** Pass additional data via `checkout_data` (e.g., client email, property address)
3. **Webhook Security:** Add signature verification to webhook handler for production
4. **Success URL:** Clients are redirected back to delivery page with `?payment=success` parameter

---

🎉 **You're all set!** Create your Whop product and add the environment variables to get started!

