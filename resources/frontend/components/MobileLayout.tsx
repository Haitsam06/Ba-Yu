import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { SideNav } from './SideNav';

interface MobileLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

export function MobileLayout({ children, showBottomNav = true }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex justify-center md:justify-start">
      {/* Background decorative circles (Optional, primarily for mobile looks) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden hidden md:block z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden md:hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-blue-400/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-36 h-36 bg-yellow-400/15 rounded-full blur-3xl"></div>
      </div>

      {/* Desktop Sidebar */}
      <SideNav />

      {/* Mobile container / Desktop Content Area */}
      {/* On mobile: max-w-[430px] and centered. On desktop: pushes to the right by 64 (the SideNav width margin) and expands */}
      <div className="relative w-full max-w-[430px] md:max-w-none md:ml-64 md:flex-1 min-h-screen bg-transparent shadow-2xl md:shadow-none z-10 transition-all duration-300">
          
        {/* The main content area where pages inject themselves. */}
        <div className={`md:max-w-7xl md:mx-auto md:p-8 ${showBottomNav ? 'pb-20 md:pb-8' : ''}`}>
           {/* In mobile mode, backgrounds might be purely white inside the container. We can handle it on page levels */}
           {/* Wrap children in a container that handles desktop layout limits cleanly */}
           <div className="md:bg-transparent min-h-screen md:min-h-0 bg-[#FAFAFA] rounded-none md:rounded-3xl shadow-none">
              {children}
           </div>
        </div>

        {/* Bottom Navigation for Mobile */}
        {showBottomNav && (
            <div className="md:hidden">
                <BottomNav />
            </div>
        )}
      </div>
    </div>
  );
}
