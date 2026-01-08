export function PokemonHeader() {
  return (
    <div className="relative overflow-hidden mb-8 w-full h-33.75 md:h-65.25">
        <div className="absolute inset-0 bg-center bg-no-repeat bg-cover" style={{
          backgroundImage: `url("/banner.png")`
        }} />
    </div>
  );
}