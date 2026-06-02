import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './pages/landing-page';
import LoginPage from './pages/Login';
import ResetPasswordPage from './pages/ResetPasswordPage';
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
import NotificationDetailPage from './pages/NotificationDetailPage';
import PakarDashboard from './pages/PakarDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LearningStatisticsPage from './pages/LearningStatisticsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFound from './pages/NotFound';
import SecurityPage from './pages/SecurityPage';
import PrivacySettingsPage from './pages/PrivacySettingsPage';
import FollowRequestsPage from './pages/FollowRequestsPage';
import HelpPage from './pages/HelpPage';
import CompleteProfilePage from './pages/CompleteProfilePage';
import VerifyEmailPage from './pages/auth/verify-email';
import ThemePage from './pages/ThemePage';
import AboutPage from './pages/AboutPage';
import StatusPage from './pages/StatusPage';
import CareersPage from './pages/CareersPage';
import BlogPage from './pages/BlogPage';
import CommunityGuidelinesPage from './pages/CommunityGuidelinesPage';
import LanguagePage from './pages/LanguagePage';

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
        path: 'reset-password/:token',
        element: <ResetPasswordPage />,
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
        path: 'terms',
        element: <TermsPage />,
      },
      {
        path: 'privacy',
        element: <PrivacyPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'status',
        element: <StatusPage />,
      },
      {
        path: 'careers',
        element: <CareersPage />,
      },
      {
        path: 'blog',
        element: <BlogPage />,
      },
      {
        path: 'guidelines',
        element: <CommunityGuidelinesPage />,
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
            path: 'complete-profile',
            element: <CompleteProfilePage />,
          },
          {
            path: 'verify-email',
            element: <VerifyEmailPage />,
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
            path: 'notifications/:id',
            element: <NotificationDetailPage />,
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
            path: 'settings/security',
            element: <SecurityPage />,
          },
          {
            path: 'settings/privacy',
            element: <PrivacySettingsPage />,
          },
          {
            path: 'settings/theme',
            element: <ThemePage />,
          },
          {
            path: 'settings/follow-requests',
            element: <FollowRequestsPage />,
          },
          {
            path: 'settings/language',
            element: <LanguagePage />,
          },
          {
            path: 'settings/help',
            element: <HelpPage />,
          },
          {
            path: 'pakar',
            element: <PakarDashboard />,
          },
          {
            path: 'admin',
            element: <AdminDashboard />,
          },
          {
            path: 'stats',
            element: <LearningStatisticsPage />,
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
}); // Trigger HMR