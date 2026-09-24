import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { ToastContainer } from '../common/ToastContainer';
import { LiveChatWidget } from '../common/LiveChatWidget';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Toast notifications */}
      <ToastContainer />

      {/* Floating Live Concierge Chat Widget */}
      <LiveChatWidget />

      {/* Dark Navy Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area with Desktop Sidebar Offset */}
      <div className="lg:pl-72 flex flex-col flex-1 min-h-screen">
        <Header />
        
        <main className="flex-1 bg-white">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};
