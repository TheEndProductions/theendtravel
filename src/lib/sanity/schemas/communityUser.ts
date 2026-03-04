export default {
  name: 'communityUser', title: 'Community User', type: 'document',
  fields: [
    { name: 'email', title: 'Email', type: 'string', validation: (R: any) => R.required() },
    { name: 'displayName', title: 'Display Name', type: 'string' },
    { name: 'joinedAt', title: 'Joined At', type: 'datetime' },
    { name: 'lastActiveAt', title: 'Last Active', type: 'datetime' },
    { name: 'submissionCount', title: 'Submissions', type: 'number', initialValue: 0 },
  ],
  preview: { select: { title: 'email', subtitle: 'displayName' } },
};
