export default {
  name: 'lead',
  title: 'Leads (Form Submissions)',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', readOnly: true },
    { name: 'email', title: 'Email', type: 'string', readOnly: true },
    { name: 'phone', title: 'Phone', type: 'string', readOnly: true },
    { name: 'service', title: 'Service Interested In', type: 'string', readOnly: true },
    { name: 'message', title: 'Message', type: 'text', readOnly: true },
    { name: 'submittedAt', title: 'Submitted At', type: 'datetime', readOnly: true },
  ],
}
