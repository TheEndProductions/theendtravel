export default {
  name: 'kickstarterSignup', title: 'Kickstarter Signup', type: 'document',
  fields: [
    { name: 'email', title: 'Email', type: 'string', validation: (R: any) => R.required() },
    { name: 'signupDate', title: 'Signup Date', type: 'datetime', initialValue: () => new Date().toISOString() },
    { name: 'source', title: 'Source', type: 'string', options: { list: ['homepage', 'endless-page', 'footer', 'other'] } },
    { name: 'notified', title: 'Notified', type: 'boolean', initialValue: false },
  ],
  orderings: [{ title: 'Date (newest)', name: 'dateDesc', by: [{ field: 'signupDate', direction: 'desc' }] }],
  preview: { select: { title: 'email', subtitle: 'source' } },
};
