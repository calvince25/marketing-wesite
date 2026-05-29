import { createClient } from 'next-sanity';
import bcrypt from 'bcryptjs';

const client = createClient({
  projectId: 'xwr2s2jf',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function test() {
  // Clear any existing users for clean test
  const users = await client.fetch('*[_type == "adminUser"]');
  for (const user of users) {
    await client.delete(user._id);
  }
  console.log('Cleared existing users');

  // Register first user
  const firstUser = {
    _type: 'adminUser',
    name: 'Admin One',
    email: 'admin1@example.com',
    password: await bcrypt.hash('password123', 10),
    isAdmin: true,
    isApproved: true,
    createdAt: new Date().toISOString(),
  };

  const res1 = await client.create(firstUser);
  console.log('First user registered:', res1.email, 'Admin:', res1.isAdmin, 'Approved:', res1.isApproved);

  // Register second user
  const secondUser = {
    _type: 'adminUser',
    name: 'User Two',
    email: 'user2@example.com',
    password: await bcrypt.hash('password123', 10),
    isAdmin: false,
    isApproved: false,
    createdAt: new Date().toISOString(),
  };

  const res2 = await client.create(secondUser);
  console.log('Second user registered:', res2.email, 'Admin:', res2.isAdmin, 'Approved:', res2.isApproved);
}

test().catch(console.error);
