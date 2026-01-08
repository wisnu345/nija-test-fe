import { api, API_BASE_URL } from "@/lib/api";
import type {
  PokemonListResponse,
  PokemonDetail,
  Generation,
  GenerationDetail,
} from "@/types/pokemon";

type GetPokemonParams = {
  limit: number;
  offset: number;
};

// Fetch list dengan detail (untuk tampilkan types di card)
export async function getPokemons(
  params: GetPokemonParams
): Promise<{
  count: number;
  results: PokemonDetail[];
}> {
  const { data } = await api.get<PokemonListResponse>(
    "/pokemon",
    { params }
  );

  const detailPromises = data.results.map((pokemon) =>
    api.get<PokemonDetail>(pokemon.url).then((res) => res.data)
  );

  const results = await Promise.all(detailPromises);

  return {
    count: data.count,
    results,
  };
}

// Fetch detail pokemon untuk modal
export async function getPokemonDetail(
  identifier: string | number
): Promise<PokemonDetail> {
  const { data } = await api.get<PokemonDetail>(
    `/pokemon/${identifier}`
  );
  return data;
}

// Fetch list generations
export async function getGenerations(): Promise<Generation[]> {
  const { data } = await api.get<{ results: Generation[] }>("/generation");
  return data.results;
}

// Fetch pokemon by generation
export async function getPokemonByGeneration(
  generationId: number
): Promise<PokemonDetail[]> {
  const { data } = await api.get<GenerationDetail>(`/generation/${generationId}`);
  
  // Ambil hanya 20 pokemon pertama per generation
  const pokemonUrls = data.pokemon_species.slice(0, 20).map(p => 
    `${API_BASE_URL}/pokemon/${p.name}`
  );

  const detailPromises = pokemonUrls.map(url =>
    api.get<PokemonDetail>(url).then((res) => res.data)
  );

  return Promise.all(detailPromises);
}

// Search pokemon
export async function searchPokemon(
  searchTerm: string
): Promise<PokemonDetail> {
  const { data } = await api.get<PokemonDetail>(
    `/pokemon/${searchTerm.toLowerCase()}`
  );
  return data;
}

// Filter pokemon by types (client-side)
export function filterPokemonByTypes(
  pokemons: PokemonDetail[],
  types: string[]
): PokemonDetail[] {
  if (types.length === 0) return pokemons;
  
  return pokemons.filter(pokemon =>
    types.every(type =>
      pokemon.types.some(t => t.type.name === type)
    )
  );
}

export const pokemonService = {
  getPokemons,
  getPokemonDetail,
  getGenerations,
  getPokemonByGeneration,
  searchPokemon,
  filterPokemonByTypes,
};
