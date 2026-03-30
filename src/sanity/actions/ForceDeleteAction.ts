import { DocumentActionProps } from 'sanity'

export function ForceDeleteAction(props: DocumentActionProps) {
  // Only show delete for existing documents
  if (!props.draft && !props.published) {
    return null;
  }

  return {
    label: '🗑️ Delete Document (Admin)',
    onHandle: async () => {
      if (confirm(`Are you sure you want to permanently delete this document?`)) {
        try {
          const res = await fetch(`/api/admin/posts/${props.id}`, { method: 'DELETE' });
          if (res.ok) {
            alert('Document deleted successfully! Please refresh or navigate back.');
            window.location.href = '/studio'; // Navigate back safely
          } else {
            const data = await res.json();
            alert('Error deleting: ' + (data.error || 'Unknown error'));
          }
        } catch (e: any) {
          alert('Error: ' + e.message);
        }
      }
    }
  }
}
