import { Outlet } from 'react-router';
import { AuthProvider } from '../contexts/AuthContext';
import { BookmarkProvider } from '../contexts/BookmarkContext';

export function RootLayout() {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <Outlet />
      </BookmarkProvider>
    </AuthProvider>
  );
}
