import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";
import { corsHeaders } from '../corsHeaders.ts';

interface EmailPayload {
  sender: {
    name: string;
    email: string;
  };
  to: {
    name: string;
    email: string;
  }[];
  subject: string;
  htmlContent: string;
  notificationID: string;
}

// Helper function to validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate payload
const validatePayload = (payload: EmailPayload) => {
  const { sender, to, subject, htmlContent, notificationID } = payload;

  if (!sender || !sender.name || !isValidEmail(sender.email)) {
    return { valid: false, message: "Invalid sender information" };
  }

  if (!Array.isArray(to) || to.length === 0) {
    return { valid: false, message: "Recipient list cannot be empty" };
  }

  for (const recipient of to) {
    if (!recipient.name || !isValidEmail(recipient.email)) {
      return { valid: false, message: `Invalid recipient information for ${recipient.name || "unknown recipient"}` };
    }
  }

  if (!subject || subject.trim() === "") {
    return { valid: false, message: "Email subject cannot be empty" };
  }

  if (!htmlContent || htmlContent.trim() === "") {
    return { valid: false, message: "Email content cannot be empty" };
  }

  if (!notificationID || notificationID.trim() === "") {
    return { valid: false, message: "Notification ID is required" };
  }

  return { valid: true };
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get API key from headers
    const apiKey = req.headers.get("api-key");
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'API key is required',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Parse the payload
    const payload = await req.json() as EmailPayload;
    // Validate payload
    const validation = validatePayload(payload);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: validation.message,
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Make the request to Brevo API
    const data = await axiod.post("https://api.brevo.com/v3/smtp/email", payload, {
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
    });

    // Return success response with the Brevo response data
    return new Response(
      JSON.stringify({
        status: 'success',
        data: data,
        notificationID: payload.notificationID
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Error sending email:", error);

    // Return error response with the error message
    return new Response(
      JSON.stringify({
        status: 'error',
        message: error.message || 'An unknown error occurred',
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});
