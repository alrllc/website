import { promises as fs } from "fs";
import path from "path";

export type ConsultationSubmission = {
  name: string;
  email: string;
  goal: string;
  message: string;
  receivedAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const submissionsPath = path.join(dataDir, "consultations.json");

export async function saveConsultationSubmission(
  submission: ConsultationSubmission,
) {
  await fs.mkdir(dataDir, { recursive: true });

  let submissions: ConsultationSubmission[] = [];

  try {
    const file = await fs.readFile(submissionsPath, "utf8");
    submissions = JSON.parse(file) as ConsultationSubmission[];
  } catch {
    submissions = [];
  }

  submissions.unshift(submission);
  await fs.writeFile(submissionsPath, `${JSON.stringify(submissions, null, 2)}\n`);
}

export async function getConsultationSubmissions() {
  try {
    const file = await fs.readFile(submissionsPath, "utf8");
    return JSON.parse(file) as ConsultationSubmission[];
  } catch {
    return [];
  }
}
