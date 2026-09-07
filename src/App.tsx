/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { MenuSection } from './components/MenuSection';
import { ReviewsSection } from './components/ReviewsSection';
import { BlogSection } from './components/BlogSection';
import { AppDownloadSection } from './components/AppDownloadSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AccountDashboardModal } from './components/AccountDashboardModal';
import { EmailNotificationsModal } from './components/EmailNotificationsModal';
import { ChatSupportWidget } from './components/ChatSupportWidget';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const MainApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toastMessage } = useStore();

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const menuEl = document.getElementById('carta-menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-amber-600 selection:text-white">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Content */}
      <main className="flex-1">
        <HeroBanner onSelectCategory={handleSelectCategory} />
        <MenuSection
          searchQuery={searchQuery}
          selectedCategoryProp={selectedCategory}
        />
        <ReviewsSection />
        <BlogSection />
        <AppDownloadSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <AccountDashboardModal />
      <EmailNotificationsModal />
      <ChatSupportWidget />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 border border-stone-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}

