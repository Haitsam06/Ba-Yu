import { Outlet } from 'react-router';
import { AuthProvider } from '../contexts/AuthContext';
import { BookmarkProvider } from '../contexts/BookmarkContext';
import { ToastProvider } from '../contexts/ToastContext';
import { ThemeProvider } from '../contexts/ThemeContext';

export function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookmarkProvider>
          <ToastProvider>
            <Outlet />
          </ToastProvider>
        </BookmarkProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
