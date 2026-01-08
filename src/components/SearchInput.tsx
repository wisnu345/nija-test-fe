interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchInput({ value, onChange, onSearch }: SearchInputProps) {
  return (
    <div className="relative w-full md:w-75">
      <span 
        onClick={onSearch}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-placeholder hover:text-placeholder"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            onSearch();
          }
        }}
        placeholder="Search"
        className="w-full pl-10 pr-10 py-2 border border-border-secondary rounded-sm bg-background-primary text-sm text-placeholder placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}