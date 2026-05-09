/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import LocationGuard from './components/LocationGuard';
import VideoFeed from './components/VideoFeed';
import Header from './components/Header';
import Navigation, { TabType } from './components/Navigation';
import ExploreView from './components/ExploreView';
import UploadView from './components/UploadView';
import DownloadView from './components/DownloadView';
import ProfileView from './components/ProfileView';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <VideoFeed />;
      case 'explore':
        return <ExploreView />;
      case 'upload':
        return <UploadView />;
      case 'download':
        return <DownloadView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <VideoFeed />;
    }
  };

  return (
    <LocationGuard>
      <div className="relative h-screen w-full bg-charcoal selection:bg-saffron selection:text-charcoal overflow-hidden select-none">
        {/* Only show header on certain tabs or if not in home (where it overlaps) */}
        {activeTab !== 'upload' && activeTab !== 'profile' && <Header />}
        
        <main className="h-full w-full">
          {renderContent()}
        </main>

        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Brutalist accents - hide when they might overlap too much */}
        <div className="fixed top-20 right-0 w-1 h-32 bg-indian-green z-50 pointer-events-none opacity-30"></div>
        <div className="fixed bottom-24 left-0 w-1 h-16 bg-saffron z-50 pointer-events-none opacity-30"></div>
      </div>
    </LocationGuard>
  );
}
