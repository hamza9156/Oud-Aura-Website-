import { useState, useEffect } from 'react';
import { FilterState } from '../types';
import { brands, fragranceFamilies, MAX_PRICE } from '../data/products';
import { X, SlidersHorizontal } from 'lucide-react';

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
  onClear: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  totalResults: number;
}

const GENDERS = ['men', 'women', 'unisex'];
const CONCENTRATIONS = ['EDP', 'EDT', 'Parfum', 'EDC'];
const RATINGS = [4, 3, 2];

function CheckItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors
        ${checked ? 'bg-luxury-gold border-luxury-gold' : 'border-luxury-border group-hover:border-luxury-gold'}`}
        onClick={() => onChange(!checked)}>
        {checked && <div className="w-2 h-2 bg-luxury-black" />}
      </div>
      <span className="text-luxury-ivory/60 text-xs capitalize group-hover:text-luxury-ivory transition-colors">{label}</span>
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-luxury-border pb-5 mb-5 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between mb-4"
      >
        <span className="text-luxury-gold text-[10px] tracking-widest uppercase font-semibold">{title}</span>
        <span className="text-luxury-gold/50 text-sm">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="space-y-2.5">{children}</div>}
    </div>
  );
}

export default function ProductFilters({ filters, onFiltersChange, onClear, mobileOpen, onMobileClose, totalResults }: ProductFiltersProps) {
  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

  const hasActiveFilters = filters.genders.length > 0 || filters.brands.length > 0 ||
    filters.fragranceFamilies.length > 0 || filters.concentrations.length > 0 ||
    filters.minRating > 0 || filters.priceRange[0] > 0 || filters.priceRange[1] < MAX_PRICE;

  const content = (
    <div className="p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-serif text-lg text-luxury-ivory">Filters</h3>
          <p className="text-luxury-ivory/40 text-xs mt-0.5">{totalResults} products</p>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button onClick={onClear} className="text-luxury-gold text-[10px] tracking-wider uppercase hover:text-luxury-gold-light transition-colors">
              Clear All
            </button>
          )}
          <button onClick={onMobileClose} className="lg:hidden text-luxury-ivory/50 hover:text-luxury-gold ml-2">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Gender */}
      <Section title="Gender">
        {GENDERS.map(g => (
          <CheckItem
            key={g}
            label={g.charAt(0).toUpperCase() + g.slice(1)}
            checked={filters.genders.includes(g)}
            onChange={() => onFiltersChange({ ...filters, genders: toggleArray(filters.genders, g) })}
          />
        ))}
      </Section>

      {/* Price Range */}
      <Section title="Price Range">
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={MAX_PRICE}
            step={1000}
            value={filters.priceRange[1]}
            onChange={e => onFiltersChange({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
          />
          <div className="flex justify-between text-luxury-ivory/50 text-xs">
            <span>₨ 0</span>
            <span>₨ {filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </Section>

      {/* Brand */}
      <Section title="Brand">
        <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
          {brands.map((b: string) => (
            <CheckItem
              key={b}
              label={b}
              checked={filters.brands.includes(b)}
              onChange={() => onFiltersChange({ ...filters, brands: toggleArray(filters.brands, b) })}
            />
          ))}
        </div>
      </Section>

      {/* Fragrance Family */}
      <Section title="Fragrance Family">
        <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
          {fragranceFamilies.map((f: string) => (
            <CheckItem
              key={f}
              label={f}
              checked={filters.fragranceFamilies.includes(f)}
              onChange={() => onFiltersChange({ ...filters, fragranceFamilies: toggleArray(filters.fragranceFamilies, f) })}
            />
          ))}
        </div>
      </Section>

      {/* Concentration */}
      <Section title="Concentration">
        {CONCENTRATIONS.map(c => (
          <CheckItem
            key={c}
            label={c}
            checked={filters.concentrations.includes(c)}
            onChange={() => onFiltersChange({ ...filters, concentrations: toggleArray(filters.concentrations, c) })}
          />
        ))}
      </Section>

      {/* Rating */}
      <Section title="Min. Rating">
        {RATINGS.map(r => (
          <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
            <div
              className={`w-4 h-4 border flex-shrink-0 rounded-full flex items-center justify-center transition-colors
              ${filters.minRating === r ? 'bg-luxury-gold border-luxury-gold' : 'border-luxury-border group-hover:border-luxury-gold'}`}
              onClick={() => onFiltersChange({ ...filters, minRating: filters.minRating === r ? 0 : r })}
            >
              {filters.minRating === r && <div className="w-2 h-2 bg-luxury-black rounded-full" />}
            </div>
            <span className="text-luxury-ivory/60 text-xs group-hover:text-luxury-ivory transition-colors">{r}+ Stars</span>
          </label>
        ))}
      </Section>
    </div>
  );

  // Desktop sidebar
  return (
    <>
      <div className="hidden lg:block w-64 flex-shrink-0 bg-luxury-dark border border-luxury-border sticky top-24 self-start">
        {content}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-luxury-black/70 z-40 lg:hidden" onClick={onMobileClose} />
          <div className="fixed top-0 left-0 h-full w-72 bg-luxury-dark border-r border-luxury-border z-50 overflow-y-auto lg:hidden">
            {content}
          </div>
        </>
      )}
    </>
  );
}
