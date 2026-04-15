import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RegistrationPayload {
  club_name: string;
  primary_sport: string;
  phone_number: string;
  mpesa_code: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body: RegistrationPayload = await req.json();
    const { club_name, primary_sport, phone_number, mpesa_code } = body;

    if (!club_name || !primary_sport || !phone_number || !mpesa_code) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Club Registration</h1>
          <p style="color: #fef3c7; margin: 6px 0 0 0; font-size: 14px;">ASMG Africa - Club Affiliation</p>
        </div>
        <div style="padding: 24px; background: #fffbeb;">
          <h2 style="color: #92400e; font-size: 16px; margin-top: 0;">Registration Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #fde68a;">
              <td style="padding: 10px 0; font-weight: bold; color: #78350f; width: 40%;">Coach / Club Name</td>
              <td style="padding: 10px 0; color: #1f2937;">${club_name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #fde68a;">
              <td style="padding: 10px 0; font-weight: bold; color: #78350f;">Primary Sport</td>
              <td style="padding: 10px 0; color: #1f2937;">${primary_sport}</td>
            </tr>
            <tr style="border-bottom: 1px solid #fde68a;">
              <td style="padding: 10px 0; font-weight: bold; color: #78350f;">Phone Number</td>
              <td style="padding: 10px 0; color: #1f2937;">${phone_number}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #78350f;">M-Pesa Transaction Code</td>
              <td style="padding: 10px 0; color: #1f2937; font-family: monospace; font-size: 16px; font-weight: bold;">${mpesa_code.toUpperCase()}</td>
            </tr>
          </table>
        </div>
        <div style="padding: 16px 24px; background: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; color: #6b7280; font-size: 13px;">Please verify the M-Pesa transaction code and contact the coach to confirm affiliation.</p>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ASMG Registration <onboarding@resend.dev>",
        to: ["info@asmgafrica.com"],
        subject: `New Club Registration: ${club_name} - ${primary_sport}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: errText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Internal server error", details: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
