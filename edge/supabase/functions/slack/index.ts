import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";
import { corsHeaders } from '../corsHeaders.ts';

interface SlackPayload {
  text: string;
  channel: string;
  notificationID: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
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

    const payload = await req.json() as SlackPayload;
    // Validate payload
    if (!payload.text || !payload.channel) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Payload must include "text" and "channel"',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const response = await axiod.post("https://slack.com/api/chat.postMessage", payload, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${apiKey}`
      },
    });
    console.log(response.data);
    if (!response.data.ok) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: response.data.error || 'Slack API error',
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({
        status: 'success',
        notificationID: payload.notificationID,
        data: response.data,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error sending message to Slack:", error);

    return new Response(
      JSON.stringify({
        status: 'error',
        message: error.response?.data?.error || error.message || 'An unknown error occurred',
      }),
      { status: 500, headers: corsHeaders }
    );
  }

})
