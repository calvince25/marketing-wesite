import { db } from './db';

export async function readProjects(): Promise<any[]> {
  await db.loadTable('projects');
  return db.read('projects');
}

export async function writeProjects(projects: any[]): Promise<void> {
  db.write('projects', projects);
}
