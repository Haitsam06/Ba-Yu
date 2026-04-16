import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './pages/landing-page';
import LoginPage from './pages/Login';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import PublicExplorePage from './pages/PublicExplorePage';
import UploadPage from './pages/UploadPage';
import NoteDetailPage from './pages/NoteDetailPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import PublicProfilePage from './pages/PublicProfilePage';
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
        element: <LoginPage />,
      },
      {
        path: 'explore',
        element: <ExplorePage />,
      },
      {
        path: 'katalog',
        element: <PublicExplorePage />,
      },
      {
        path: 'note/:id',
        element: <NoteDetailPage />,
      },
      {
        path: 'profile/:id',
        element: <PublicProfilePage />,
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