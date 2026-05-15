import { ReactNode, useState, useEffect } from 'react';
import { BottomNav } from './BottomNav';
import { SideNav } from './SideNav';
import { TopNav } from './TopNav';
import ApplicationLogo from './ApplicationLogo';
import AvatarNotifications from './ui/avatar-notifications';
import { Edit3, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

interface MobileLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
  hideTopNav?: boolean;
}

export function MobileLayout({ children, showBottomNav = true, hideTopNav = false }: MobileLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 1024 && window.innerWidth >= 768) {
         setIsSidebarExpanded(false);
      } else if (window.innerWidth >= 1024) {
         setIsSidebarExpanded(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isAdmin = user?.role === 'admin';

  return (
    // Base layout: Full column structure.
    <div className="h-screen w-full flex flex-col bg-white dark:bg-[#13111C] text-slate-900 dark:text-[#E8E6F0] overflow-hidden selection:bg-indigo-600/20 selection:text-indigo-600">
      
      {/* 1. DESKTOP & TABLET TOP REGION */}
      {!hideTopNav && (
        <div className="hidden md:block w-full border-b border-slate-100/60 dark:border-white/5 z-50 bg-white dark:bg-[#13111C] shrink-0 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:shadow-none relative">
           <TopNav 
             isSidebarExpanded={isSidebarExpanded} 
             toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)} 
           />
        </div>
      )}

      {/* 2. MOBILE TOP BAR */}
      {!hideTopNav && (
        <div className="md:hidden w-full bg-white/90 dark:bg-[#13111C]/90 backdrop-blur-md h-[60px] border-b border-slate-100 dark:border-white/5 flex items-center justify-between px-5 z-40 shadow-sm dark:shadow-none shrink-0">
           <Link to="/home" className="flex items-center gap-2 shrink-0 group outline-none">
              <ApplicationLogo className="w-7 h-7" />
              <span className="font-['Lexend_Deca'] font-extrabold text-[20px] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-[#7B7BFF] dark:to-[#A78BFA]">
                 Ba-Yu
              </span>
           </Link>
           
           <div className="flex items-center gap-4">
              <button onClick={() => navigate('/explore')} className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-primary transition-colors rounded-full hover:bg-indigo-50 dark:hover:bg-white/5 outline-none">
                <Search className="w-[22px] h-[22px]" strokeWidth={2} />
              </button>
              <div className="mt-1">
                <AvatarNotifications />
              </div>
           </div>
        </div>
      )}

      {/* 3. MAIN BODY SPLIT */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* SIDEBAR (Only desktop/tablet) */}
        <div 
          style={{ width: isSidebarExpanded ? '240px' : '0px', minWidth: isSidebarExpanded ? '240px' : '0px' }}
          className={`hidden md:flex flex-col flex-shrink-0 z-20 bg-white dark:bg-[#13111C] border-r transition-all duration-300 ease-in-out h-full overflow-hidden ${isSidebarExpanded ? 'border-slate-100/100 dark:border-white/5 opacity-100' : 'border-slate-100/0 opacity-0'}`}
        >
           <SideNav 
             isExpanded={isSidebarExpanded} 
             toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)} 
           />
        </div>

        {/* MAIN SCROLLABLE CONTENT */}
        <div id="main-scroll-container" className="flex-1 overflow-y-auto overflow-x-hidden w-full h-full bg-white dark:bg-[#13111C] scroll-smooth">
           <div className={`transition-all duration-300 ${isMobile && showBottomNav ? 'pb-24' : 'pb-10 pt-2'}`}>
              {children}
           </div>
        </div>

      </div>

      {/* 4. MOBILE BOTTOM NAV & FAB */}
      {/* FLOATING ACTION BUTTON (Upload) - Hidden for admins */}
      {!isAdmin && (
        <Link 
          to="/upload" 
          className={`md:hidden fixed right-5 z-50 flex items-center justify-center w-[54px] h-[54px] bg-indigo-600 dark:bg-primary text-white rounded-[20px] shadow-lg shadow-indigo-600/30 dark:shadow-primary/20 hover:bg-indigo-700 dark:hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all outline-none border border-indigo-500/50 dark:border-primary/30 ${showBottomNav ? 'bottom-[90px]' : 'bottom-6'}`}
        >
          <Edit3 className="w-[24px] h-[24px]" strokeWidth={2.5} />
        </Link>
      )}

      {showBottomNav && (
        <div className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-white dark:bg-[#1C1A29] border-t border-slate-200 dark:border-white/5 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] dark:shadow-none pb-safe">
           <BottomNav />
        </div>
      )}

    </div>
  );
}