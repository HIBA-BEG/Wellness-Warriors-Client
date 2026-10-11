export const canManage = (user) => user?.role === 'organizer' || user?.role === 'admin';
