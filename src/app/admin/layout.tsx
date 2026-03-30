import { getAuthUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import AdminNav from '@/components/AdminNav';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();

  return (
    <div className="admin-layout" style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {user && <AdminNav user={user} />}
      <main>
        {children}
      </main>
    </div>
  );
}
