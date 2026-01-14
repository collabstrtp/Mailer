import { transporter } from "@/lib/mailer";
import fs from "fs";
import path from "path";

export async function sendMailController(formData: FormData) {
  const toRaw = formData.get("to") as string;
  const subject = formData.get("subject") as string;
  const body = formData.get("body") as string;

  if (!toRaw || !subject || !body) {
    throw new Error("Missing required fields");
  }

  // split multiple emails
  const recipients = toRaw
    .split(",")
    .map((e) => e.trim())
    .filter((e) => e.length > 0);

  if (recipients.length === 0) {
    throw new Error("No valid recipients");
  }

  const resume = formData.get("resume") as File | null;
  const coverLetter = formData.get("coverLetter") as File | null;

  const attachments: any[] = [];

  async function saveFile(file: File) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), "tmp", file.name);
    fs.writeFileSync(filePath, buffer);
    return filePath;
  }

  if (resume && resume.size > 0) {
    const resumePath = await saveFile(resume);
    attachments.push({ filename: resume.name, path: resumePath });
  }

  if (coverLetter && coverLetter.size > 0) {
    const coverPath = await saveFile(coverLetter);
    attachments.push({ filename: coverLetter.name, path: coverPath });
  }

  await transporter.sendMail({
    from: `<${process.env.SMTP_EMAIL}>`,
    to: recipients,
    subject,
    text: body,
    attachments, // empty array is totally valid
  });

  return { success: true, sentTo: recipients.length };
}
