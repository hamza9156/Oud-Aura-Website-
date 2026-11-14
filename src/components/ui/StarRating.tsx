import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showCount?: boolean;
  count?: number;
}

export default function StarRating({ rating, size = 14, showCount, count }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(i => (
          <Star
            key={i}
            size={size}
            fill={i <= Math.round(rating) ? '#C6A15B' : 'transparent'}
            stroke={i <= Math.round(rating) ? '#C6A15B' : 'rgba(198,161,91,0.3)'}
          />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-luxury-ivory/40 text-xs ml-1">({count})</span>
      )}
    </div>
  );
}
