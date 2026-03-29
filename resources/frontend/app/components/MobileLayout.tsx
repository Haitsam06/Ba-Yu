import { ReactNode, useState, useEffect } from 'react';
import { BottomNav } from './BottomNav';
import { SideNav } from './SideNav';
import { TopNav } from './TopNav';

interface MobileLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

export function MobileLayout({ children, showBottomNav = true }: MobileLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

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

  return (
    // Base layout: Full column structure.
    <div className="h-screen w-full flex flex-col bg-white text-gray-900 overflow-hidden selection:bg-primary/20 selection:text-primary">
      
      {/* 1. DESKTOP & TABLET TOP REGION */}
      <div className="hidden md:block w-full border-b border-gray-100/60 z-50 bg-white shrink-0 shadow-[0_2px_10px_rgb(0,0,0,0.02)] relative">
         <TopNav 
           isSidebarExpanded={isSidebarExpanded} 
           toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)} 
         />
      </div>

      {/* 2. MOBILE TOP BAR */}
      <div className="md:hidden w-full bg-white h-[60px] border-b border-gray-100 flex items-center justify-between px-5 z-40 shadow-sm shrink-0">
         <div className="flex items-center gap-2">
            <div className="w-[28px] h-[28px] bg-primary/10 rounded-[8px] flex items-center justify-center">
              <span className="text-[14px]">📚</span>
            </div>
            <span className="font-['Lexend_Deca'] font-extrabold text-[20px] text-gray-900 tracking-tight">Ba-Yu.</span>
         </div>
      </div>

      {/* 3. MAIN BODY SPLIT */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* SIDEBAR (Only desktop/tablet) */}
        <div 
          style={{ width: isSidebarExpanded ? '240px' : '0px', minWidth: isSidebarExpanded ? '240px' : '0px' }}
          className={`hidden md:flex flex-col flex-shrink-0 z-40 bg-white border-r transition-all duration-300 ease-in-out h-full overflow-hidden ${isSidebarExpanded ? 'border-gray-100/100 opacity-100' : 'border-gray-100/0 opacity-0'}`}
        >
           <SideNav 
             isExpanded={isSidebarExpanded} 
             toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)} 
           />
        </div>

        {/* MAIN SCROLLABLE CONTENT */}
        <div id="main-scroll-container" className="flex-1 overflow-y-auto overflow-x-hidden w-full h-full bg-white scroll-smooth relative">
           <div className={`transition-all duration-300 ${isMobile && showBottomNav ? 'pb-24' : 'pb-10 pt-2'}`}>
              {children}
           </div>
        </div>

      </div>

      {/* 4. MOBILE BOTTOM NAV */}
      {showBottomNav && (
        <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] pb-safe">
           <BottomNav />
        </div>
      )}

    </div>
  );
}
