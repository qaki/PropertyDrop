import * as React from "react";

interface VerificationEmailProps {
  name: string;
  verificationUrl: string;
}

export const VerificationEmail: React.FC<VerificationEmailProps> = ({
  name,
  verificationUrl,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
    <div style={{ backgroundColor: "#4f46e5", padding: "40px 20px", textAlign: "center" }}>
      <h1 style={{ color: "white", margin: 0, fontSize: "32px" }}>PropertyDrop</h1>
      <p style={{ color: "#e0e7ff", margin: "10px 0 0 0" }}>Real Estate Photography Platform</p>
    </div>
    
    <div style={{ padding: "40px 20px", backgroundColor: "#ffffff" }}>
      <h2 style={{ color: "#1f2937", marginBottom: "20px" }}>
        Welcome to PropertyDrop, {name}!
      </h2>
      
      <p style={{ color: "#4b5563", fontSize: "16px", lineHeight: "1.6" }}>
        Thank you for signing up! We're excited to have you on board.
      </p>
      
      <p style={{ color: "#4b5563", fontSize: "16px", lineHeight: "1.6" }}>
        To complete your registration and start uploading photos, please verify your email address by clicking the button below:
      </p>
      
      <div style={{ textAlign: "center", margin: "40px 0" }}>
        <a
          href={verificationUrl}
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            padding: "16px 32px",
            textDecoration: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            display: "inline-block",
          }}
        >
          Verify Email Address
        </a>
      </div>
      
      <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.6" }}>
        Or copy and paste this link into your browser:
      </p>
      
      <p style={{
        backgroundColor: "#f3f4f6",
        padding: "12px",
        borderRadius: "6px",
        fontSize: "14px",
        color: "#4b5563",
        wordBreak: "break-all",
      }}>
        {verificationUrl}
      </p>
      
      <div style={{
        marginTop: "40px",
        paddingTop: "20px",
        borderTop: "1px solid #e5e7eb",
      }}>
        <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.6" }}>
          <strong>What's next?</strong>
        </p>
        <ul style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.8" }}>
          <li>Create your first job</li>
          <li>Upload and process photos</li>
          <li>Share delivery links with clients</li>
          <li>Get paid automatically</li>
        </ul>
      </div>
    </div>
    
    <div style={{
      backgroundColor: "#f9fafb",
      padding: "30px 20px",
      textAlign: "center",
      borderTop: "1px solid #e5e7eb",
    }}>
      <p style={{ color: "#6b7280", fontSize: "12px", margin: "0 0 10px 0" }}>
        This link will expire in 24 hours.
      </p>
      <p style={{ color: "#9ca3af", fontSize: "12px", margin: 0 }}>
        If you didn't create an account with PropertyDrop, you can safely ignore this email.
      </p>
      <p style={{ color: "#9ca3af", fontSize: "12px", marginTop: "20px" }}>
        © 2025 PropertyDrop. All rights reserved.
      </p>
    </div>
  </div>
);

export default VerificationEmail;

