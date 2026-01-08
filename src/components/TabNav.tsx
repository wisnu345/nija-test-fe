interface TabNavProps {
  activeTab: 'all' | 'popular';
  onTabChange: (tab: 'all' | 'popular') => void;
}

export function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <div className="inline-flex items-center bg-background-tertiary rounded-sm p-0.5 gap-1 border border-border-secondary">
      <button
        onClick={() => onTabChange('all')}
        className={`px-4.5 py-0.5 transition-all text-lg ${
          activeTab === 'all'
            ? 'bg-card rounded font-semibold'
            : 'hover:text-foreground'
        }`}
      >
        All
      </button>
      <button
        onClick={() => onTabChange('popular')}
        className={`px-4.5 py-0.5 transition-all text-lg ${
          activeTab === 'popular'
            ? 'bg-card rounded font-semibold'
            : 'hover:text-foreground'
        }`}
      >
        Popular
      </button>
    </div>
  );
}