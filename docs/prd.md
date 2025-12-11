---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
inputDocuments: []
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 0
  projectDocs: 0
workflowType: 'prd'
lastStep: 11
project_name: 'PropertyDrop'
user_name: 'qaki'
date: '2025-12-07'
---

# Product Requirements Document - PropertyDrop

**Author:** qaki
**Date:** 2025-12-07

## Executive Summary

PropertyDrop is a specialized Digital Asset Management (DAM) platform purpose-built for independent Real Estate Photographers. It addresses critical workflow inefficiencies—specifically payment collection delays, MLS compliance errors, and unprofessional delivery methods—by providing a secure, branded delivery portal with integrated payment enforcement and automated asset processing.

The platform's core value proposition is "Revenue Assurance & Automated Compliance," ensuring photographers get paid before assets are released while simultaneously solving technical delivery challenges for real estate agents.

### What Makes This Special

PropertyDrop differentiates itself through its hyper-focused approach to the real estate photography niche, solving three interconnected problems in a single workflow:

1.  **Paywall-Enforced Delivery:** Unlike generic file transfer tools (Dropbox, WeTransfer), PropertyDrop integrates payment directly into the delivery flow. Agents must pay the invoice via Stripe *before* unlocking the ability to download high-resolution assets, eliminating the need for photographers to chase payments.
2.  **Automated MLS Compliance:** The system automatically processes master files into MLS-compliant versions (resizing to specific dimensions like 1280px and file size limits <3MB) upon upload. This removes technical liability from the photographer and ensures agents always have the correct file format, reducing support requests and listing errors.
3.  **Professional White-Labeling:** Delivery portals are branded with the photographer's identity, replacing generic file links with a polished, high-end client experience that reinforces the photographer's professional brand during the critical handoff phase.

## Project Classification

**Technical Type:** SaaS B2B
**Domain:** Real Estate Tech / Digital Asset Management
**Complexity:** Medium
**Project Context:** Greenfield - new project

### Key Classification Signals
- **SaaS B2B:** Multi-tenant architecture for professional photographers serving business clients (agents).
- **Fintech Integration:** Stripe-based payment gating is a core dependency.
- **Image Processing:** Server-side manipulation (resizing/compression) required for MLS compliance.
- **Secure Delivery:** Requirement for secure, unauthenticated client access via unique hashes.

## Success Criteria

### User Success

**Photographer Success (Revenue & Efficiency)**
*   **Payment Speed:** Payment-to-Download Time (PTDT) $\le 30$ minutes for 95% of jobs. (Eliminates accounts receivable).
*   **Workflow Velocity:** Job-to-Delivery Time (JDT) $\le 5$ minutes (Time from upload complete to client notification).
*   **Portal Conversion:** Visit-to-Download Conversion Rate $\ge 98\%$ (High usability ensuring agents get their files).
*   **Time Savings:** Time Saved Per Job (TSPJ) $\ge 15$ minutes of billable time per job (resizing + admin).

**Agent Success (Compliance & Ease)**
*   **Compliance Reliability:** Compliance Support Ticket Rate = 0 tickets per 100 jobs (Perfect file formatting).
*   **User Effort:** Average Download Path Clicks (DPC) $\le 3$ clicks (Email -> Portal -> Pay/Unlock -> Download).
*   **MLS Success:** MLS Upload Success Rate near 100% (Files accepted by MLS on first try).

**Brand Professionalism**
*   **Repeat Business:** Repeat Agent Rate (RAR) $\ge 70\%$ (Agents returning for more jobs).

### Business Success

**Financial Targets**
*   **Recurring Revenue:** Achieve $2,000 MRR (Monthly Recurring Revenue).
*   **Customer Acquisition:** Acquire 45 paying photographer customers.
*   **Monetization Validation:** Validate willingness to pay for "Revenue Assurance" features.

### Technical Success

**System Performance & Reliability**
*   **Processing Speed:** Image resizing/compliance processing completes in $< 30$ seconds for typical job batches (e.g., 30-50 photos).
*   **Upload Reliability:** 99.9% successful upload rate for large media files (S3 direct upload).
*   **Payment Integrity:** 100% accuracy in unlocking assets upon Stripe webhook confirmation (Zero "paid but locked" errors).
*   **Security:** 100% prevention of unauthorized access (No access without valid hash or payment).

### Measurable Outcomes

*   **Launch:** MVP deployed to production with core payment/delivery loop working.
*   **First Dollar:** First real photographer successfully invoices and delivers a paid job.
*   **Scale:** First 10 active photographers processing $>5$ jobs/month each.

## Product Scope

### MVP - Minimum Viable Product
**Focus:** The "Happy Path" of Revenue Assurance.
1.  **Auth & User Model:** Photographer Sign-up/Login.
2.  **Job Management:** Create Job (Agent Email, Amount).
3.  **Secure Upload:** Drag-and-drop to S3.
4.  **Auto-Compliance:** Basic resizing function (Serverless) for MLS standards.
5.  **Client Portal:** Branded delivery page (Logo, Colors).
6.  **Payment Gating:** Stripe Checkout integration & Webhook handler (Unlock logic).
7.  **Download:** Secure link generation for unauthenticated Agent access.

### Growth Features (Post-MVP)
**Focus:** Expansion & Stickiness.
1.  **Deep Archiving:** Automated movement to S3 Glacier after 6 months.
2.  **Video Support:** Transcoding and streaming previews for video tours.
3.  **Agent Dashboard:** A dedicated login for Agents to view all past jobs.
4.  **Team Accounts:** Multi-user support for larger photography studios.
5.  **Marketing Kit Generation:** Auto-create flyers or social media tiles from uploaded photos.

### Vision (Future)
**Focus:** The Operating System for Real Estate Media.
*   **End-to-End Platform:** Booking, Scheduling, Invoicing, Delivery, and Marketing in one suite.
*   **AI Enhancement:** Auto-image tagging, room recognition, and description generation for MLS.
*   **Marketplace:** Connect photographers directly with agents looking for services.

## User Journeys

### Journey 1: The Photographer - The "Set and Forget" Workflow
**Persona:** Alex, a busy real estate photographer shooting 4 homes a day.
**Goal:** Deliver photos for 123 Main St, get paid, and move on to the next edit without administrative friction.

**Narrative:**
Alex finishes editing the photos for 123 Main St at 11:00 PM. Exhausted, the last thing he wants is to create a manual invoice, upload to Dropbox, email the link, and then remind the agent to pay in 3 days.

He logs into PropertyDrop. He clicks "New Job," enters the agent's email (`agent@example.com`) and the job amount (`$250`). He drags the folder of 40 high-res JPEGs into the upload zone.

**The "Aha!" Moment:** As the upload bar hits 100%, the job status flips to "Processing" and then "Ready." PropertyDrop automatically generates a unique, secure link. Alex copies the link (or lets the system auto-email it) and sends it to the agent. He goes to sleep, knowing that the photos are safe and, more importantly, *he hasn't given them away for free yet.*

**Resolution:** The next morning, Alex wakes up to a Stripe notification: "$250.00 Received." He checks the PropertyDrop dashboard and sees the job marked "Paid & Delivered." He spent 2 minutes on admin instead of 20, and the money is already in the bank.

**Requirements Revealed:**
*   Simple "New Job" form (Email, Amount).
*   Drag-and-drop S3 uploader.
*   Automatic status transitions (Uploading -> Processing -> Ready).
*   Dashboard view of Job Status (Unpaid/Paid).

### Journey 2: The Agent - Professional & Frictionless
**Persona:** Sarah, a top-producing real estate agent who needs photos *now* for an MLS listing deadline.
**Goal:** Get the photos, pay the invoice, and upload to MLS without technical errors.

**Narrative:**
Sarah receives an email: "Photos for 123 Main St are ready! - Delivered by PropertyDrop." She clicks the branded link. She sees a beautiful, professional landing page with Alex's logo and a blurred gallery preview of the home.

**The Challenge:** The "Download All" button is locked. A clear button says "Pay Invoice ($250) to Unlock."

**The Solution:** Sarah clicks "Pay," enters her credit card details in the secure Stripe modal. Instantly, the page refreshes. The lock icon unlocks. She sees two download options: "High-Res (Print)" and "MLS-Ready (Web)."

**Resolution:** She downloads the "MLS-Ready" zip file. She uploads it to the MLS. It works perfectly on the first try—no "file too large" errors. She looks professional to her sellers because the listing is up immediately. She bookmarks Alex as her "easy to work with" photographer.

**Requirements Revealed:**
*   Branded public landing page (Logo, Colors).
*   Stripe Checkout integration (Credit Card handling).
*   Conditional UI logic (Locked vs. Unlocked state).
*   Dual-format delivery (High-Res + Resized).

### Journey 3: The Admin - The "Payment Failed" Investigation
**Persona:** You (The Founder/Support).
**Goal:** Quickly resolve a dispute where an agent claims they paid, but the link is still locked.

**Narrative:**
You get a frantic email from Alex: "My agent Sarah says she was charged, but she can't download the files! Help!"

**Action:** You log into the PropertyDrop Admin Console. You search for the Job ID or Agent Email. You see the Job details. You check the "Event Log." You see:
1.  `Job Created` (10:00 AM)
2.  `Checkout Session Started` (10:15 AM)
3.  `Webhook: payment_intent.succeeded` (10:17 AM)
4.  `ERROR: DB Update Failed - Connection Timeout` (10:17 AM)

**Resolution:** You see the webhook fired but the database didn't update. You click a manual "Sync Payment Status" button in the admin panel. The job flips to "Paid." You email Alex: "Fixed! Tell Sarah to refresh." The crisis is averted in 30 seconds because you had visibility.

**Requirements Revealed:**
*   Admin Dashboard with Job Search.
*   Detailed Event Logging (especially for Webhooks).
*   Manual Override controls (Force Unlock/Mark Paid).

### Journey 4: The System - The Automation Worker
**Persona:** The Backend Worker Process.
**Goal:** Ensure assets are compliant and secure without human intervention.

**Narrative:**
**Trigger:** A new file upload hits the `/api/upload` endpoint.
**Action:** The System receives the `s3_key` of the master file. It triggers an async process (Lambda/Queue).
1.  **Fetch:** Downloads the master file from S3.
2.  **Process:** Resizes to `1280px` width. Compresses to `<3MB`.
3.  **Store:** Uploads the new version to S3 with suffix `_mls.jpg`.
4.  **Update:** Updates the Database record for that file, marking `mls_ready = true`.

**Trigger 2:** A Stripe Webhook hits `/api/webhooks`.
**Action:** The System verifies the signature. It finds the `job_id` in the metadata. It executes an atomic database update to set `is_paid = true`. It triggers an email notification service to send the "Receipt & Unlock" email to the Agent.

**Requirements Revealed:**
*   Async Task Queue (for image processing).
*   Serverless Image Processing function (Sharp/ImageMagick).
*   Robust Webhook Handler (Signature verification, Idempotency).
*   Email Service Integration (Postmark/SendGrid/AWS SES).

### Journey Requirements Summary

**Core Capabilities Needed:**
1.  **Job Lifecycle Management:** Create, Track, Update, Archive.
2.  **Financial Transaction Handling:** Invoice generation, Payment processing, Webhook reconciliation.
3.  **Asset Processing Pipeline:** Secure storage, automated resizing, dual-format delivery.
4.  **Client Access Control:** Token-based access (Hash), Payment-gated permissions.
5.  **Observability:** Admin logs for debugging async failures (Webhooks, Processing).

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. Revenue Assurance as a Feature (Fintech + DAM)**
PropertyDrop fundamentally shifts the photographer's business model from "Service Delivery -> Invoicing -> Chasing" to "Delivery -> Payment -> Unlock." By integrating the Point of Sale directly into the Asset Delivery mechanism, the platform acts as an active financial guardian rather than passive storage. This "Pay-to-Download" model is novel in the vertical because it replaces trust-based transactions with code-enforced transactions.

**2. The Compliance Guarantee (Technical + Financial)**
Unlike generic file transfer tools, PropertyDrop understands the asset it delivers. The innovation lies in coupling the *financial trigger* with the *technical transformation*. The agent pays not just for access, but for the guarantee of a compliant, MLS-ready asset. The system serves as both a payment collector and a quality assurance agent in one atomic transaction.

**3. The "Invisible Middle Layer" Workflow**
PropertyDrop innovates by abstracting away the friction between the creative input (High-Res Photos) and the rigid output requirements (MLS Specs). It serves as an invisible automation layer that handles the resizing, compression, and formatting asynchronously, allowing the photographer to treat the delivery process as "drag and drop" while the agent receives a technically perfect product.

### Market Context & Competitive Landscape

**Generic Competitors (Dropbox, WeTransfer, Google Drive):**
*   **Gap:** Purely passive storage. No payment integration. No domain awareness (MLS sizing).
*   **Advantage:** Ubiquitous, free/cheap.

**Vertical Competitors (Real Estate Media Delivery Platforms):**
*   **Gap:** Often bloated "All-in-One" suites (Booking + CRM + Delivery) that are expensive and complex.
*   **Advantage:** Feature richness.
*   **PropertyDrop's Edge:** Laser focus on the *delivery handoff* moment. We are unbundling the "Delivery" feature from the massive suites and making it the core value prop, solving the specific pain of payment delays better than the suites do.

### Validation Approach

*   **Metric:** "Payment-to-Download Time" (PTDT).
*   **Hypothesis:** If the innovation works, PTDT should drop from days (industry average) to minutes.
*   **Metric:** "Compliance Support Tickets."
*   **Hypothesis:** If the automated resizing works, tickets related to "file size too big" should drop to near zero.

### Risk Mitigation

*   **Risk:** Agents rejecting the paywall (refusing to pay before download).
    *   **Mitigation:** Professional branding and "Preview" galleries build trust. The value of immediate access (no waiting for manual unlock) counters the friction of payment.
*   **Risk:** MLS standards changing.
    *   **Mitigation:** The resizing logic is serverless and decoupled. We can update the compression parameters centrally without changing the core platform architecture.

## SaaS B2B Specific Requirements

### Project-Type Overview
PropertyDrop operates as a multi-tenant B2B SaaS where "Photographers" are the tenants and "Agents" are their end-users. The architecture prioritizes speed to market (MVP) while maintaining strict logical data separation and security.

### Technical Architecture Considerations

**Multi-tenancy Model**
*   **Strategy:** Shared Database, Shared Schema (Row-Level Tenancy).
*   **Implementation:** All tenant-scoped tables (`Jobs`, `Invoices`, `Clients`) MUST include a `photographer_id` foreign key.
*   **Enforcement:** Application-level middleware must enforce `where photographer_id = session.user.id` on all queries to prevent data leaks.

**Permission Model (RBAC)**
*   **Structure:** Simple Role-Based Access Control.
*   **Roles:**
    *   `Photographer`: Full CRUD on own resources.
    *   `Agent`: Unauthenticated, Token-based read-only access to specific resources (`/deliver/[hash]`).
    *   `Admin`: Superuser global access.
*   **Constraint:** No custom roles or granular permission editing for MVP.

**Subscription Logic**
*   **Model:** Single Flat Rate ("Pro Plan").
*   **Billing:** Recurring monthly subscription via Stripe Billing.
*   **Limits:** "Unlimited" jobs/storage for MVP (monitored for abuse manually).

### Implementation Considerations

**Critical Integrations**
1.  **Stripe Connect/Billing:** For platform subscription (Photographer paying PropertyDrop) AND Invoice processing (Agent paying Photographer). *Note: We need to decide if we are acting as a Platform (Connect) or just integrating Checkout for the Photographer.*
    *   *Decision:* For MVP, standard Stripe Checkout where funds go to the Photographer's connected Stripe account is preferred for "Revenue Assurance."
2.  **Transactional Email (Postmark):** Mission-critical for delivery links and receipts. Must have high deliverability and open tracking.
3.  **Cloud Storage (AWS S3):** Direct-to-S3 upload via signed URLs to handle large media files without burdening the application server.

**Compliance & Data Privacy**
*   **Role Definition:** PropertyDrop is the *Data Processor*; Photographer is the *Data Controller*.
*   **PII Handling:** Agent emails are strictly for transactional use.
*   **Retention:** System must support automated purging/archiving of Job data (and associated Agent PII) after a set retention period (e.g., 6 months active + 6 months archive).
*   **Security:**
    *   At-rest encryption for database.
    *   Secure hashing (Argon2) for passwords.
    *   Signed URLs with short expiration for all asset downloads.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Revenue MVP
**Philosophy:** Focus exclusively on the "Happy Path" of Revenue Assurance. The goal is to generate the "First Dollar" by solving the payment delay problem. Features that do not directly contribute to getting paid or delivering compliant files are cut.
**Resource Requirements:** Small Team (Solo Dev + Founder/PM).

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
1.  **Photographer:** Create Job -> Upload -> Get Paid.
2.  **Agent:** Receive Link -> Pay -> Download.
3.  **Admin:** Monitor Jobs -> Debug Payments.

**Must-Have Capabilities:**
1.  **Authentication & User Model:** Secure sign-up/login for photographers.
2.  **Job Creation & Tracking:** Core CRUD for Jobs (Agent Email, Amount, Status).
3.  **S3 Drag-and-Drop Upload:** Direct-to-S3 upload for speed and reliability.
4.  **MLS Auto-Resizer Function:** Serverless function to generate 1280px compliant assets.
5.  **Secure Delivery Page:** Unauthenticated, token-based access for Agents with basic branding.
6.  **Stripe Checkout & Webhook Handler:** The payment gating logic.
7.  **Transactional Email Integration:** Postmark integration for delivery links and receipts.
8.  **Basic Admin Dashboard:** With Event Log View for debugging webhook failures.

### Post-MVP Features

**Phase 2 (Growth - Stickiness):**
*   **Deep Archiving:** Automated S3 Glacier movement for cost savings.
*   **Marketing Kit Generation:** Auto-create flyers to upsell services.
*   **Agent Dashboard:** A "past jobs" view for repeat agents.

**Phase 3 (Expansion - Scale):**
*   **Video Support:** Full transcoding pipeline.
*   **Team Accounts:** RBAC for multi-photographer studios.
*   **Marketplace:** Directory to find photographers.

### Risk Mitigation Strategy

**Technical Risks:**
*   **Webhook Reliability:** Risk of "Paid but Locked" state. *Mitigation:* Robust logging and manual override tools in Admin Dashboard.
*   **Image Processing Failures:** Risk of resizing timeout. *Mitigation:* Async queue processing with retry logic.

**Market Risks:**
*   **Adoption Friction:** Agents refusing to pay via platform. *Mitigation:* Professional branding to build trust; ensure the UX is faster than writing a check.

**Resource Risks:**
*   **Solo Dev Bandwidth:** Risk of feature creep. *Mitigation:* Strict adherence to this MVP list. If it's not on the list, it's not in V1.
