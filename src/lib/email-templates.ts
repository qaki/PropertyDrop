/**
 * Email Templates for PropertyDrop
 * Branded, professional emails for clients and photographers
 */

// Client Receipt Email - sent after payment
export function generateClientReceiptEmail(data: {
  clientEmail: string;
  jobName: string;
  amount: string;
  photographerName: string;
  deliveryUrl: string;
  stripeReceiptUrl: string;
  photoCount: number;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px;">PropertyDrop</h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Payment Receipt</p>
          </div>
          
          <!-- Success Message -->
          <div style="padding: 40px 20px; text-align: center; background-color: #f0fdf4; border-bottom: 3px solid #22c55e;">
            <div style="display: inline-block; width: 60px; height: 60px; background-color: #22c55e; border-radius: 50%; margin-bottom: 20px; line-height: 60px; text-align: center;">
              <span style="color: white; font-size: 36px;">✓</span>
            </div>
            <h2 style="color: #166534; margin: 0 0 10px 0; font-size: 24px;">Payment Successful!</h2>
            <p style="color: #15803d; margin: 0; font-size: 16px;">Your photos are now unlocked and ready to download</p>
          </div>
          
          <!-- Order Details -->
          <div style="padding: 40px 20px;">
            <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px;">Order Details</h3>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 15px 0; color: #6b7280; font-size: 14px;">Property</td>
                <td style="padding: 15px 0; color: #1f2937; font-weight: 600; text-align: right;">${data.jobName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 15px 0; color: #6b7280; font-size: 14px;">Photos Included</td>
                <td style="padding: 15px 0; color: #1f2937; font-weight: 600; text-align: right;">${data.photoCount} high-resolution images</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 15px 0; color: #6b7280; font-size: 14px;">Photographer</td>
                <td style="padding: 15px 0; color: #1f2937; font-weight: 600; text-align: right;">${data.photographerName}</td>
              </tr>
              <tr style="border-bottom: 2px solid #1f2937;">
                <td style="padding: 15px 0; color: #1f2937; font-size: 16px; font-weight: 600;">Total Paid</td>
                <td style="padding: 15px 0; color: #4f46e5; font-size: 20px; font-weight: bold; text-align: right;">$${data.amount}</td>
              </tr>
            </table>
            
            <!-- CTA Buttons -->
            <div style="text-align: center; margin: 40px 0;">
              <a href="${data.deliveryUrl}" style="display: inline-block; background-color: #4f46e5; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; margin-bottom: 15px;">
                Download Your Photos
              </a>
              <br>
              <a href="${data.stripeReceiptUrl}" style="display: inline-block; color: #4f46e5; padding: 12px 24px; text-decoration: none; border: 2px solid #4f46e5; border-radius: 8px; font-size: 14px; font-weight: 600;">
                View Official Receipt (PDF)
              </a>
            </div>
            
            <!-- Info Box -->
            <div style="background-color: #f3f4f6; border-left: 4px solid #4f46e5; padding: 20px; margin-top: 30px;">
              <h4 style="color: #1f2937; margin: 0 0 10px 0; font-size: 16px;">📥 What's Included?</h4>
              <ul style="color: #4b5563; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>All ${data.photoCount} photos in high resolution</li>
                <li>MLS-optimized sizes for instant listing upload</li>
                <li>Original print-quality files</li>
                <li>Unlimited downloads (link never expires)</li>
              </ul>
            </div>
            
            <!-- Support Info -->
            <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
                <strong style="color: #1f2937;">Need help?</strong><br>
                Contact your photographer directly at <a href="mailto:${data.photographerName}" style="color: #4f46e5;">${data.photographerName}</a>
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0 0 10px 0;">
              This is an automated receipt from PropertyDrop
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © 2025 PropertyDrop. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Photographer Sales Alert - sent when client pays
export function generatePhotographerSalesAlertEmail(data: {
  photographerName: string;
  jobName: string;
  clientEmail: string;
  amount: string;
  photoCount: number;
  jobDashboardUrl: string;
  stripeReceiptUrl: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center;">
            <div style="display: inline-block; width: 80px; height: 80px; background-color: rgba(255,255,255,0.2); border-radius: 50%; margin-bottom: 20px; line-height: 80px;">
              <span style="color: white; font-size: 48px;">💰</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 32px;">Payment Received!</h1>
            <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">You've earned money</p>
          </div>
          
          <!-- Amount Display -->
          <div style="padding: 40px 20px; text-align: center; background-color: #ecfdf5; border-bottom: 3px solid #10b981;">
            <p style="color: #065f46; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Payment Amount</p>
            <h2 style="color: #047857; margin: 0; font-size: 48px; font-weight: bold;">$${data.amount}</h2>
            <p style="color: #059669; margin: 10px 0 0 0; font-size: 14px;">Transferred directly to your Stripe account</p>
          </div>
          
          <!-- Sale Details -->
          <div style="padding: 40px 20px;">
            <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px;">Sale Details</h3>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 15px 0; color: #6b7280; font-size: 14px;">Job Name</td>
                <td style="padding: 15px 0; color: #1f2937; font-weight: 600; text-align: right;">${data.jobName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 15px 0; color: #6b7280; font-size: 14px;">Client Email</td>
                <td style="padding: 15px 0; color: #1f2937; font-weight: 600; text-align: right;">${data.clientEmail}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 15px 0; color: #6b7280; font-size: 14px;">Photos Delivered</td>
                <td style="padding: 15px 0; color: #1f2937; font-weight: 600; text-align: right;">${data.photoCount} images</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 15px 0; color: #6b7280; font-size: 14px;">Payment Status</td>
                <td style="padding: 15px 0; text-align: right;">
                  <span style="background-color: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">PAID</span>
                </td>
              </tr>
            </table>
            
            <!-- CTA Buttons -->
            <div style="text-align: center; margin: 40px 0;">
              <a href="${data.jobDashboardUrl}" style="display: inline-block; background-color: #10b981; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; margin-bottom: 15px;">
                View Job in Dashboard
              </a>
              <br>
              <a href="${data.stripeReceiptUrl}" style="display: inline-block; color: #10b981; padding: 12px 24px; text-decoration: none; border: 2px solid #10b981; border-radius: 8px; font-size: 14px; font-weight: 600;">
                View Payment Receipt
              </a>
            </div>
            
            <!-- Info Box -->
            <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin-top: 30px;">
              <h4 style="color: #166534; margin: 0 0 10px 0; font-size: 16px;">💳 Payment Processing</h4>
              <p style="color: #15803d; font-size: 14px; line-height: 1.6; margin: 0;">
                This payment has been transferred directly to your Stripe Connect account. Funds typically appear in your bank account within 2-7 business days depending on your payout schedule.
              </p>
            </div>
            
            <!-- Stats Box -->
            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin-top: 20px;">
              <h4 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">📊 Keep Growing</h4>
              <p style="color: #78350f; font-size: 14px; line-height: 1.6; margin: 0;">
                Great job! Check your dashboard to see your total earnings, conversion rates, and upcoming jobs.
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0 0 10px 0;">
              Sales notification from PropertyDrop
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © 2025 PropertyDrop. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

