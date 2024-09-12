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
}

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
