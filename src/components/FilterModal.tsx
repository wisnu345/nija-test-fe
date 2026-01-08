import { FilterSidebar } from './FilterSidebar';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGeneration: string;
  selectedTypes: string[];
  onGenerationChange: (gen: string) => void;
  onTypeToggle: (type: string) => void;
}

export function FilterModal({
  isOpen,
  onClose,
  selectedGeneration,
  selectedTypes,
  onGenerationChange,
  onTypeToggle,
}: FilterModalProps) {
  return (
    <div
      className={`
        fixed inset-0 z-50 md:hidden
        transition-opacity duration-300
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        bg-overlay
      `}
      onClick={onClose}
    >
      <div
        className={`
          absolute bottom-0 left-0 right-0
          bg-background rounded-t-2xl
          max-h-[80vh] overflow-y-auto overscroll-contain
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2">
          <div className="h-1 w-10 rounded-full bg-muted" />
        </div>

        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-4 flex justify-between items-center">
          <h3 className="font-semibold text-lg">Filters</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <FilterSidebar
            selectedGeneration={selectedGeneration}
            selectedTypes={selectedTypes}
            onGenerationChange={onGenerationChange}
            onTypeToggle={onTypeToggle}
          />
        </div>
      </div>
    </div>
  );
}
