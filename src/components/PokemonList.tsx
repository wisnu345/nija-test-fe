import { useState, useMemo } from "react";
import { usePokemons } from "@/hooks/usePokemons";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";
import { useSearchPokemon } from "@/hooks/useSearchPokemon";
import { filterPokemonByTypes } from "@/services/pokemon.service";
import { PokemonHeader } from "@/components/PokemonHeader";
import { FilterSidebar } from "@/components/FilterSidebar";
import { TabNav } from "@/components/TabNav";
import { SearchInput } from "@/components/SearchInput";
import { PokemonCard } from "@/components/PokemonCard";
import { Pagination } from "@/components/Pagination";
import { PokemonModal } from "@/components/PokemonModal";
import { FilterButton } from "./FilterButton";
import { FilterModal } from "./FilterModal";

export function PokemonList() {
  const [page, setPage] = useState(1);
  const [selectedGeneration, setSelectedGeneration] = useState("all");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "popular">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(
    null
  );

  const generationId =
    selectedGeneration === "all" ? undefined : parseInt(selectedGeneration);

  const { data, isLoading, error } = usePokemons(page - 1, generationId);
  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
  } = useSearchPokemon(searchTerm);

  const { data: detailData, isLoading: detailLoading } =
    usePokemonDetail(selectedPokemonId);

  const filteredPokemons = useMemo(() => {
    if (searchTerm) {
      if (searchData) return [searchData];
      return [];
    }

    if (!data?.results) return [];
    return filterPokemonByTypes(data.results, selectedTypes);
  }, [data, selectedTypes, searchTerm, searchData]);

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchTerm(searchQuery.trim().toLowerCase());
    }
  };

  const handleGenerationChange = (gen: string) => {
    setSelectedGeneration(gen);
    setPage(1);
    setSearchTerm("");
    setSearchQuery("");
  };
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background-secondary">
      <PokemonHeader />

      <div className="container mx-auto px-4 pb-12">
        <div className="flex gap-8">
          {/* Desktop Sidebar - Hidden on mobile */}
          <div className="hidden md:block">
            <FilterSidebar
              selectedGeneration={selectedGeneration}
              selectedTypes={selectedTypes}
              onGenerationChange={handleGenerationChange}
              onTypeToggle={handleTypeToggle}
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div className="flex items-center gap-4 justify-between">
                <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
                {/* Mobile Filter Button */}
                <FilterButton onClick={() => setIsMobileFilterOpen(true)} />
              </div>
              <div className="w-full md:w-75">
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={handleSearch}
                />
              </div>
            </div>

            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSearchQuery("");
                }}
                className="mb-4 text-sm text-accent hover:underline"
              >
                ← Clear search
              </button>
            )}

            {isLoading || searchLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
              </div>
            ) : searchError ? (
              <div className="text-center py-20 text-red-600">
                Pokémon not found
              </div>
            ) : error ? (
              <div className="text-center py-20 text-red-600">
                Error loading Pokémon
              </div>
            ) : filteredPokemons.length === 0 ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-20 text-red-600">
                Error loading Pokémon
              </div>
            ) : filteredPokemons.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                No Pokémon found with selected filters
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredPokemons.map((pokemon) => (
                    <PokemonCard
                      key={pokemon.id}
                      id={pokemon.id}
                      name={pokemon.name}
                      types={pokemon.types.map((t) => t.type.name)}
                      onClick={() => setSelectedPokemonId(pokemon.id)}
                    />
                  ))}
                </div>

                {!searchTerm && (
                  <Pagination
                    currentPage={page}
                    totalPages={10}
                    onPageChange={setPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <FilterModal
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        selectedGeneration={selectedGeneration}
        selectedTypes={selectedTypes}
        onGenerationChange={handleGenerationChange}
        onTypeToggle={handleTypeToggle}
      />

      <PokemonModal
        pokemon={detailData || null}
        isLoading={detailLoading}
        onClose={() => setSelectedPokemonId(null)}
      />
    </div>
  );
}

export default PokemonList;
