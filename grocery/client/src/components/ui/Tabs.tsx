import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode }[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'pills' | 'underline';
  className?: string;
}

export default function Tabs({ tabs, activeTab, onChange, variant = 'pills', className }: TabsProps) {
  if (variant === 'underline') {
    return (
      <div className={cn('flex border-b border-surface-200 dark:border-surface-700', className)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px',
              activeTab === tab.id
                ? 'text-primary-600 border-primary-600 dark:text-primary-400 dark:border-primary-400'
                : 'text-surface-500 border-transparent hover:text-surface-700 dark:hover:text-surface-300'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex p-1 rounded-xl bg-surface-100 dark:bg-surface-800',
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all',
            activeTab === tab.id
              ? 'bg-white text-primary-600 shadow-soft dark:bg-surface-700 dark:text-primary-400'
              : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
