import { Outlet } from 'react-router';
import { AuthProvider } from '../contexts/AuthContext';
import { BookmarkProvider } from '../contexts/BookmarkContext';
import { ToastProvider } from '../contexts/ToastContext';

export function RootLayout() {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <ToastProvider>
          <Outlet />
        </ToastProvider>
      </BookmarkProvider>
    </AuthProvider>
  );
}
