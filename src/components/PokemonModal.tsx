import React from "react";
import type { PokemonDetail } from "@/types/pokemon";

interface PokemonModalProps {
  pokemon: PokemonDetail | null;
  isLoading: boolean;
  onClose: () => void;
}

const STAT_COLORS: Record<string, string> = {
  hp: "var(--type-fighting)",
  attack: "var(--type-fire)",
  defense: "var(--type-grass)",
  "special-attack": "var(--type-poison)",
  "special-defense": "var(--type-bug)",
  speed: "var(--type-psychic)",
};

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Special Attack",
  "special-defense": "Special Defense",
  speed: "Speed",
};

export function PokemonModal({
  pokemon,
  isLoading,
  onClose,
}: PokemonModalProps) {
  const isOpen = isLoading || !!pokemon;

  const getTypeStyle = (type: string): React.CSSProperties => ({
    color: `var(--type-${type.toLowerCase()})`,
    borderColor: `var(--type-${type.toLowerCase()})`,
  });

  const totalStats =
    pokemon?.stats.reduce((sum, stat) => sum + stat.base_stat, 0) ?? 0;

  return (
    <div
      className={`
        fixed inset-0 z-150 flex items-center justify-center p-4
        transition-all duration-300
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      onClick={onClose}
    >
      {/* BACKDROP */}
      <div
        className={`
          absolute inset-0 bg-overlay
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* MODAL */}
      <div
        className={`
          relative bg-card rounded-xl shadow-xl
          max-w-3xl w-full max-h-[90vh] flex flex-col
          transition-all duration-300
          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* LOADING STATE */}
        {isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary mb-4" />
            <p className="text-card-foreground font-medium">
              Loading detail...
            </p>
          </div>
        )}

        {/* CONTENT */}
        {!isLoading && pokemon && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-[252px_1fr] gap-8">
              {/* LEFT - IMAGE */}
              <div className="flex items-start justify-center bg-background-tertiary rounded-sm h-fit p-4.5">
                <img
                  src={
                    pokemon.sprites.other["official-artwork"].front_default ||
                    pokemon.sprites.front_default
                  }
                  alt={pokemon.name}
                  className="w-54 h-54 object-contain"
                />
              </div>

              {/* RIGHT - DETAILS */}
              <div>
                <h2 className="text-3xl font-semibold capitalize mb-1">
                  {pokemon.name}
                </h2>

                <div className="flex gap-2 mb-4">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className="px-3 py-1 rounded-sm text-sm font-medium border capitalize"
                      style={getTypeStyle(type.type.name)}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-3 text-lg mb-6">
                  <p>
                    <span className="text-foreground">Height:</span>{" "}
                    {(pokemon.height / 10).toFixed(1)} m
                  </p>
                  <p>
                    <span className="text-foreground">Weight:</span>{" "}
                    {(pokemon.weight / 10).toFixed(1)} kg
                  </p>
                </div>

                <h3 className="font-semibold mb-3 text-xl">Stats</h3>

                <div className="space-y-3">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name}>
                      <div className="flex justify-between text-lg mb-1">
                        <span>
                          {STAT_LABELS[stat.stat.name]}
                        </span>
                        <span className="font-medium">
                          {stat.base_stat}
                        </span>
                      </div>

                      <div className="w-full h-4 bg-background-tertiary rounded-full">
                        <div
                          className="h-4 rounded-full transition-all"
                          style={{
                            width: `${Math.min(
                              (stat.base_stat / 120) * 100,
                              100
                            )}%`,
                            backgroundColor:
                              STAT_COLORS[stat.stat.name],
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="pt-4">
                    <div className="flex justify-between text-lg mb-1">
                      <span>Total</span>
                      <span>{totalStats}</span>
                    </div>
                    <div className="w-full h-4 bg-muted rounded-full">
                      <div
                        className="h-4 rounded-full bg-blue-500"
                        style={{
                          width: `${Math.min(totalStats, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-10">
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-sm bg-background-tertiary hover:bg-background-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
