import UserTabs from './UserTabs';
import OrganizationTabs from './OrganizationTabs';
import AdminTabs from './AdminTabs';

export default function RoleBasedTabs() {

  // ВРЕМЕННО — для теста
  // потом придёт из API / auth context
  const role = 'admin';
  // 'user'
  // 'organization'
  // 'admin'

  if (role === 'admin') return <AdminTabs />;
  if (role === 'organization') return <OrganizationTabs />;

  return <UserTabs />;
}
