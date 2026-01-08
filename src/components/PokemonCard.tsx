interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  onClick: () => void;
}

export function PokemonCard({ id, name, types, onClick }: PokemonCardProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const getTypeStyle = (type: string): React.CSSProperties => {
    return {
      color: `var(--type-${type.toLowerCase()})`,
      borderColor: `var(--type-${type.toLowerCase()})`,
    };
  };

  return (
    <div 
      className="bg-card rounded-md border border-border-secondary p-4 cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-all"
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <div className="w-full md:aspect-square flex items-center justify-center mb-4 bg-background-tertiary rounded-sm">
          <img 
            src={imageUrl}
            alt={name}
            className="w-54 h-54 md:w-full md:h-full object-contain"
            loading="lazy"
          />
        </div>
        <h3 className="text-base font-semibold capitalize text-center mb-2 text-card-foreground">
          {name}
        </h3>
        <div className="flex gap-2 flex-wrap justify-center">
          {types.map((type) => (
            <span 
              key={type}
              className="px-3 py-1 rounded-sm text-sm font-medium border transition-all capitalize bg-transparent"
              style={getTypeStyle(type)}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}