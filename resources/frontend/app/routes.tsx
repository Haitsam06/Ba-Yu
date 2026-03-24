import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './pages/landing-page';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import UploadPage from './pages/UploadPage';
import NoteDetailPage from './pages/NoteDetailPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import EditProfilePage from './pages/EditProfilePage';
import PakarDashboard from './pages/PakarDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'explore',
        element: <ExplorePage />,
      },
      {
        path: 'note/:id',
        element: <NoteDetailPage />,
      },
      {
        // Protected Wrapper
        element: <ProtectedRoute />,
        children: [
          {
            path: 'home',
            element: <HomePage />,
          },
          {
            path: 'upload',
            element: <UploadPage />,
          },
          {
            path: 'notifications',
            element: <NotificationsPage />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'settings',
            element: <SettingsPage />,
          },
          {
            path: 'edit-profile',
            element: <EditProfilePage />,
          },
          {
            path: 'pakar',
            element: <PakarDashboard />,
          },
          {
            path: 'admin',
            element: <AdminDashboard />,
          },
        ]
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
], {
  basename: '/app',
});