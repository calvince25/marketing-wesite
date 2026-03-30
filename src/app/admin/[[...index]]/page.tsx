import { redirect } from 'next/navigation'

// Redirect /admin base to /studio (Sanity Studio)
export default function AdminIndexPage() {
  redirect('/studio')
}
