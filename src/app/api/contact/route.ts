import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { writeClient } from "@/sanity/lib/write-client";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // 1. Save to Sanity (CMS)
    try {
      if (writeClient.config().token) {
        await writeClient.create({
          _type: 'lead',
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.service || 'General Inquiry',
          message: data.message,
          submittedAt: new Date().toISOString(),
        });
        console.log("Lead captured in Sanity");
      } else {
        console.warn("Sanity Write Token missing, skipping CMS capture");
      }
    } catch (sanityError) {
      console.error("Error saving lead to Sanity:", sanityError);
      // Continue even if Sanity fails, to ensure local backup
    }

    // 2. Save to local JSON file (Backup)
    const submissionsDir = path.join(process.cwd(), 'submissions');
    if (!fs.existsSync(submissionsDir)) {
      fs.mkdirSync(submissionsDir, { recursive: true });
    }

    const filename = `submission_${Date.now()}.json`;
    const filepath = path.join(submissionsDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify({ ...data, timestamp: new Date().toISOString() }, null, 2));

    // 3. Send to Zapier Webhook (Fire-and-forget)
    try {
      const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone || '',
            service: data.service || 'General Inquiry',
            budget: data.budget || '',
            message: data.message,
            submitted_at: new Date().toISOString(),
            source: 'growthlab.co.ke/contact'
          })
        });
      } else {
        console.warn("ZAPIER_WEBHOOK_URL environment variable is not defined");
      }
    } catch (webhookError) {
      // Silent fail — don't block the user
      console.error('Zapier Webhook error:', webhookError);
    }

    return NextResponse.json({ message: "Thank you! Your message has been sent." }, { status: 200 });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
