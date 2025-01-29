function getMembers() {
  // Implement your server-side logic to fetch members
  // This is just an example implementation
  const users = getAllUsers(); // You'll need to implement this
  return users.map(user => ({
    name: user.name,
    email: user.email,
    roles: user.roles
  }));
} 