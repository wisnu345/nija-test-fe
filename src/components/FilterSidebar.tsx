import { useGenerations } from '@/hooks/useGenerations';

interface FilterSidebarProps {
  selectedGeneration: string;
  selectedTypes: string[];
  onGenerationChange: (gen: string) => void;
  onTypeToggle: (type: string) => void;
}

const TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

export function FilterSidebar({ 
  selectedGeneration, 
  selectedTypes, 
  onGenerationChange, 
  onTypeToggle 
}: FilterSidebarProps) {
  const { data: generations, isLoading } = useGenerations();
  
  const getTypeStyle = (type: string): React.CSSProperties => {
    const isSelected = selectedTypes.includes(type.toLowerCase());
    return {
      backgroundColor: isSelected ? `var(--type-${type.toLowerCase()})` : 'transparent',
      color: isSelected ? 'white' : `var(--type-${type.toLowerCase()})`,
      borderColor: `var(--type-${type.toLowerCase()})`,
    };
  };

  return (
    <div className="w-full md:w-65 bg-card rounded-[10px] border border-border-secondary p-6 sticky top-26">
      <h3 className="font-semibold text-lg text-card-foreground">Filters</h3>
      
      {/* Generation Filter */}
      <div className="mt-6 mb-3">
        <label className="text-sm font-semibold block">
          Generation
        </label>
        {isLoading ? (
          <div className="text-sm">Loading...</div>
        ) : (
          <select
            value={selectedGeneration}
            onChange={(e) => onGenerationChange(e.target.value)}
            className="w-full p-3 border border-border-primary rounded-sm bg-background-primary text-placeholder text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All</option>
            {generations?.map((gen, idx) => (
              <option key={gen.name} value={String(idx + 1)}>
                Generation {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'][idx]}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Type Filter */}
      <div>
        <label className="text-sm font-semibold mb-3 block">
          Type
        </label>
        <div className="flex flex-wrap gap-3">
          {TYPES.map(type => (
            <button
              key={type}
              onClick={() => onTypeToggle(type)}
              className="px-3 py-1 rounded-sm text-sm font-medium border transition-all capitalize"
              style={getTypeStyle(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}