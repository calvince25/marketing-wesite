/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/lib/db';
import { client } from './client';

export const adminClient = {
  fetch: async <T = any>(query: string, params: Record<string, unknown> = {}): Promise<T> => {
    const q = query.replace(/\s+/g, ' ');

    // User registration / login fetches
    if (q.includes('count(*[_type == "adminUser"])') || q.includes("count(*[_type == 'adminUser'])")) {
      const users = db.read('users');
      return users.length as unknown as T;
    }

    if (q.includes('_type == "adminUser" && email == $email') || q.includes("_type == 'adminUser' && email == $email")) {
      const user = db.findOne('users', (u: any) => u.email === params.email);
      return user as unknown as T;
    }

    if (q.includes('*[_type == "adminUser"]') || q.includes("*[_type == 'adminUser']")) {
      const users = db.read('users');
      return users as unknown as T;
    }

    if (q.includes('*[_type == "post"]')) {
      const posts = db.read('posts');
      return posts as unknown as T;
    }

    return client.fetch<T>(query, params);
  },

  create: async (doc: Record<string, unknown>) => {
    let table = 'posts';
    if (doc._type === 'adminUser') table = 'users';
    else if (doc._type === 'post') table = 'posts';
    else if (doc._type === 'project') table = 'projects';
    else if (doc._type === 'service') table = 'services';
    else if (doc._type === 'lead') table = 'reviews';
    else if (doc._type === 'category') table = 'categories';

    return db.insert(table, doc);
  },

  delete: async (id: string) => {
    const deleted = db.delete('posts', id) || db.delete('users', id) || db.delete('projects', id) || db.delete('services', id);
    if (!deleted) {
      throw new Error('Document not found');
    }
    return { message: 'Document deleted successfully' };
  },

  patch: (id: string) => {
    return {
      set: (updates: Record<string, unknown>) => {
        return {
          commit: async () => {
            const tables = ['users', 'posts', 'projects', 'services', 'siteSettings'];
            for (const table of tables) {
              if (table === 'siteSettings') {
                const settings = db.read('siteSettings') as unknown as Record<string, unknown>;
                if (settings && (settings['id'] === id || settings['_id'] === id)) {
                  return db.update('siteSettings', id, updates);
                }
              } else {
                const record = db.findOne(table, (item: any) => item.id === id || item._id === id);
                if (record) {
                  return db.update(table, id, updates);
                }
              }
            }
            return null;
          }
        };
      }
    };
  }
};
