import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute -z-10 inset-0 h-full w-full bg-gradient-to-br from-blue-50 to-white"></div>
      {/* Contenido de la aplicación */}
      {children}
    </div>
  );
};

export default AppLayout;
