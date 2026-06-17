import { db } from './db';

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

const isKV = !!(KV_URL && KV_TOKEN);

export async function readProjects(): Promise<any[]> {
  if (!isKV) {
    return db.read('projects');
  }

  try {
    const res = await fetch(`${KV_URL}/get/projects`, {
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.warn('Vercel KV read failed, falling back to local database.');
      return db.read('projects');
    }

    const data = await res.json();
    if (data.result) {
      return JSON.parse(data.result);
    }

    // If KV is empty, initialize it with the local backup data
    const localProjects = db.read('projects');
    if (localProjects.length > 0) {
      await writeProjects(localProjects);
    }
    return localProjects;
  } catch (e) {
    console.error('Vercel KV read projects error:', e);
    return db.read('projects');
  }
}

export async function writeProjects(projects: any[]): Promise<void> {
  // Always update the local backup JSON database
  try {
    db.write('projects', projects);
  } catch (err) {
    // Fail silently locally if filesystem is read-only (production Vercel)
  }

  if (!isKV) return;

  try {
    const res = await fetch(`${KV_URL}/set/projects`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
      },
      body: JSON.stringify(projects),
    });

    if (!res.ok) {
      console.error('Vercel KV write failed:', res.statusText);
    }
  } catch (e) {
    console.error('Vercel KV write projects error:', e);
  }
}
