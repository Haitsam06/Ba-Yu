import { ReactNode, useState, useEffect } from 'react';
import { BottomNav } from './BottomNav';
import { SideNav } from './SideNav';

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
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row w-full overflow-hidden">
      
      {/* DESKTOP SIDEBAR (Hidden on mobile) */}
      <div className={`hidden md:block flex-shrink-0 z-50 transition-[width] duration-300 ease-out ${isSidebarExpanded ? 'w-72' : 'w-24'}`}>
         <SideNav isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      </div>

      {/* MOBILE TOP BAR (Hidden on desktop) - Keeps the brand visible */}
      <div className="md:hidden w-full bg-white h-16 border-b border-gray-100 flex items-center px-4 sticky top-0 z-40 shadow-sm justify-between">
         <div className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <span className="font-['Lexend_Deca'] font-bold text-lg text-primary tracking-tight">BestLearning</span>
         </div>
      </div>

      {/* MAIN CONTENT AREA */}
      {/* 
        Fully responsive structure that utilizes the remaining width on desktop 
        and full width on mobile. No more rigid 430px bounds! 
      */}
      <div className={`relative flex-1 w-full bg-[#FAFAFA] h-[calc(100vh-64px)] md:h-screen overflow-y-auto transition-all duration-300 ${isMobile && showBottomNav ? 'pb-20' : 'pb-8'}`}>
        
        {/* Dynamic Inner Container: Keeps contents horizontally constrained on giant screens (e.g. max-w-7xl) for readability, but fully fluid otherwise */}
        <div className="mx-auto w-full max-w-7xl">
           <div className="bg-[#FAFAFA] md:bg-transparent min-h-full rounded-none">
              {children}
           </div>
        </div>

      </div>

      {/* MOBILE BOTTOM NAV */}
      {showBottomNav && (
        <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200">
           <BottomNav />
        </div>
      )}

    </div>
  );
}
