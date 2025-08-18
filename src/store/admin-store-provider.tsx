'use client';

import { Provider } from 'react-redux';
import { adminStore } from './admin-store';

export default function AdminStoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={adminStore}>{children}</Provider>;
}
