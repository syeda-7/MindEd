import React, { useState, useEffect } from 'react';
import { Brain, MessageCircle, BookOpen, Heart, Menu, X, Phone } from 'lucide-react';
import ChatBot from './components/ChatBot';
import LearningHub from './components/LearningHub';
import MoodTracker from './components/MoodTracker';
import Resources from './components/Resources';

type ActiveTab = 'chat' | 'learning' | 'mood' | 'resources';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Request notification permission on load
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const tabs = [
    { id: 'chat' as ActiveTab, label: 'Therapy Chat', icon: MessageCircle },
    { id: 'learning' as ActiveTab, label: 'Learning Hub', icon: BookOpen },
    { id: 'mood' as ActiveTab, label: 'Mood Tracker', icon: Heart },
    { id: 'resources' as ActiveTab, label: 'Resources', icon: Phone }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatBot />;
      case 'learning':
        return <LearningHub />;
      case 'mood':
        return <MoodTracker />;
      case 'resources':
        return <Resources />;
      default:
        return <ChatBot />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-md border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-green-400 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  MindEd
                </h1>
                <p className="text-xs text-gray-400">Mental Wellness Hub</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-green-400/20 text-green-400 shadow-lg shadow-green-400/10'
                        : 'text-gray-400 hover:text-blue-400 hover:bg-blue-500/10'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-blue-400 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-blue-500/20">
            <nav className="px-4 py-2 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full px-3 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-green-400/20 text-green-400'
                        : 'text-gray-400 hover:text-blue-400 hover:bg-blue-500/10'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {renderActiveComponent()}
      </main>

      {/* Footer */}
      <footer className="bg-black/30 border-t border-blue-500/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              💙 Remember: You're not alone. If you're in crisis, please reach out to professional help immediately.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              This app provides educational content and emotional support but is not a substitute for professional mental health care.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;