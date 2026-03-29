import { Home, Search, Bookmark, User, LayoutDashboard, ChevronLeft, Hash, Star, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { mockNotes } from '../data/mockData';

interface SideNavProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

export function SideNav({ isExpanded, toggleSidebar }: SideNavProps) {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  // Assuming Pakar Choice is just some top rated notes.
  const pakarChoiceNotes = mockNotes.filter(n => n.rating === 5).slice(0, 3);

  const mainNavItems = [
    { path: '/home', icon: Home, label: 'Beranda' },
    { path: '/explore', icon: Search, label: 'Eksplorasi' },
    { path: '/profile?tab=bookmarks', icon: Bookmark, label: 'Tersimpan' },
    { path: '/profile', icon: User, label: 'Profil Saya' },
  ];

  if (user?.role === 'pakar') {
      mainNavItems.push({ path: '/pakar', icon: LayoutDashboard, label: 'Dashboard Pakar' });
  } else if (user?.role === 'admin') {
      mainNavItems.push({ path: '/admin', icon: LayoutDashboard, label: 'Sistem Admin' });
  }

  // Rendering constantly to allow smooth parent width transitions via overflow-hidden

  return (
    <aside className="w-60 h-full flex flex-col bg-transparent overflow-hidden whitespace-nowrap">
      
      {/* Main Links */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pt-4 pb-6 scrollbar-hide">
         
         <div className="px-3 space-y-1">
            {mainNavItems.map((item) => {
              // Exact match for /profile so it doesn't highlight when on /profile?tab=bookmarks
              const isProfileBase = item.path === '/profile' && location.pathname === '/profile' && !location.search;
              const isBookmarksTab = item.path === '/profile?tab=bookmarks' && location.pathname === '/profile' && location.search.includes('tab=bookmarks');
              const active = item.path === '/profile' ? isProfileBase : (item.path === '/profile?tab=bookmarks' ? isBookmarksTab : isActive(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-[7px] rounded-[8px] transition-all duration-200 w-full group ${
                    active 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200/60'
                  }`}
                >
                  <item.icon className={`shrink-0 transition-all duration-200 ${active ? 'w-[18px] h-[18px] text-primary scale-105' : 'w-[18px] h-[18px] text-gray-400 group-hover:text-gray-600'}`} strokeWidth={active ? 2.5 : 2} />
                  <span className={`font-['Manrope'] text-[14px] truncate mt-[1px] ${active ? 'font-bold' : 'font-medium'}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
         </div>

         {/* Stats Section */}
         <div className="mt-8 mb-2 px-6 text-[11px] font-['Lexend_Deca'] font-extrabold text-gray-400 tracking-wider">
            WAWASAN
         </div>
         <div className="px-3 space-y-1">
            <Link
              to="/stats"
              className={`flex items-center gap-3 px-3 py-[7px] rounded-[8px] transition-all duration-200 w-full group ${
                isActive('/stats') ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Hash className={`shrink-0 transition-all duration-200 ${isActive('/stats') ? 'w-[18px] h-[18px] text-primary scale-105' : 'w-[18px] h-[18px] text-gray-400 group-hover:text-gray-600'}`} strokeWidth={isActive('/stats') ? 2.5 : 2} />
              <span className={`font-['Manrope'] text-[14px] truncate mt-[1px] ${isActive('/stats') ? 'font-bold' : 'font-medium'}`}>Statistik Belajar</span>
            </Link>
         </div>

         {/* Curated / Pakar Choice */}
         <div className="mt-8 mb-2 px-6 flex items-center gap-1.5 selection-none">
            <span className="text-[11px] font-['Lexend_Deca'] font-extrabold text-gray-400 tracking-wider">PAKAR CHOICE</span>
            <Star className="w-[10px] h-[10px] text-amber-500 fill-amber-500 mb-[1px]" />
         </div>
         <div className="px-3 space-y-1">
            {pakarChoiceNotes.map((note) => (
              <Link
                key={note.id}
                to={`/note/${note.id}`}
                className="flex items-start gap-3 px-3 py-[7px] rounded-[8px] transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 group w-full"
              >
                <div className="mt-[2.5px]">
                  <FileText className="w-[16px] h-[16px] text-gray-300 group-hover:text-amber-500 transition-colors shrink-0" strokeWidth={2} />
                </div>
                <span className="font-['Manrope'] text-[14px] font-medium truncate overflow-hidden text-ellipsis w-full leading-tight">
                  {note.title}
                </span>
              </Link>
            ))}
         </div>
      </div>

    </aside>
  );
}
