exports.getUserRole = () => {
  return Promise.resolve([
    {
      role: 'USER_MANAGER',
    },
    {
      role: 'USER_MANAGER1',
    },
    {
      role: 'USER_MANAGER2',
    },
  ])
}