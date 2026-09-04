import React from 'react';
import {
  Activity,
  BookOpen,
  Layers,
  Zap,
  Pill,
  Lock,
  Award,
  Highlighter,
  Home,
  Menu,
  X,
} from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { PWAInstallButton } from './PWAInstallButton';

interface TopNavProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  highlighterActive: boolean;
  setHighlighterActive: (active: boolean) => void;
  onReturnHome: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  highlighterActive,
  setHighlighterActive,
  onReturnHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const tabs = [
    { id: 1, label: 'Dashboard', icon: Activity },
    { id: 2, label: 'Notes & Tools', icon: BookOpen },
    { id: 3, label: 'Lab Values', icon: Layers },
    { id: 4, label: 'Interventions', icon: Zap },
    { id: 5, label: 'Drug Study', icon: Pill },
    { id: 6, label: '50-Item Test Bank', icon: Award, isShell: false },
  ];

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-black/5 backdrop-blur-md transition-colors"
      style={{ background: 'rgba(255, 255, 255, 0.3)' }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReturnHome}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
            title="Return to Landing Page"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shadow-xs group-hover:scale-105 transition-transform"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-main)] block leading-none">
                NURSE<span className="font-light opacity-80">REVIEWER</span>
              </span>
              <span className="text-[10px] uppercase font-medium tracking-wider text-[var(--subtle)] leading-none block mt-0.5">
                Oncology Clinical Specialist
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                id={`nav-tab-${tab.id}`}
                onClick={() => handleTabClick(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'text-white font-bold shadow-md scale-102'
                    : 'text-[var(--text-main)] hover:bg-black/5 hover:text-[var(--text-main)]'
                }`}
                style={
                  isActive
                    ? { backgroundColor: 'var(--accent)', color: '#FFFFFF' }
                    : {}
                }
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.isShell && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full border border-current opacity-80">
                    Shell
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Tools & Theme Switcher */}
        <div className="flex items-center gap-2">
          {/* In-App PWA Install Prompt (Category 22) */}
          <PWAInstallButton />

          {/* Highlighter Toggle */}
          <button
            type="button"
            id="btn-highlighter-toggle"
            onClick={() => setHighlighterActive(!highlighterActive)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              highlighterActive
                ? 'bg-amber-400 text-black border-amber-500 shadow-xs'
                : 'border-[var(--border-color)] text-[var(--text-main)] hover:bg-[var(--border-color)]/50'
            }`}
            title="Toggle Highlighter Tool: Click or drag over text to highlight key facts"
          >
            <Highlighter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Highlighter</span>
            <span
              className={`w-2 h-2 rounded-full ${
                highlighterActive ? 'bg-black' : 'bg-slate-400'
              }`}
            />
          </button>

          {/* Theme Switcher (Pastel, Sunset, Powder Blue, Dark Mode) */}
          <ThemeSwitcher />

          {/* Home Return Button (Mobile/Desktop) */}
          <button
            type="button"
            id="btn-nav-home"
            onClick={onReturnHome}
            className="p-2 rounded-lg text-[var(--text-main)] hover:bg-[var(--border-color)] transition-colors md:hidden"
            title="Home"
          >
            <Home className="w-4 h-4" />
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[var(--text-main)] hover:bg-[var(--border-color)] transition-colors md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-3 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-white font-bold shadow-xs'
                    : 'text-[var(--text-main)] hover:bg-black/5'
                }`}
                style={
                  isActive
                    ? { backgroundColor: 'var(--accent)', color: '#FFFFFF' }
                    : {}
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.isShell && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-current opacity-70">
                    Empty Shell
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
