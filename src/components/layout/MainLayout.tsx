
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '@/contexts/ThemeContext';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, subtitle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, themes } = useTheme();
  
  const currentTheme = themes.find(t => t.name === theme);
  const gradientClass = currentTheme?.gradient || 'from-slate-900 via-purple-900 to-slate-900';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradientClass} flex neural-bg transition-all duration-500`}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title={title} 
          subtitle={subtitle}
          onMenuToggle={() => setIsSidebarOpen(true)}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
