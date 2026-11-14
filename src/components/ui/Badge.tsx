interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'red' | 'dark';
  className?: string;
}

export default function Badge({ children, variant = 'gold', className = '' }: BadgeProps) {
  const variants = {
    gold: 'bg-luxury-gold text-luxury-black',
    red: 'bg-red-600 text-white',
    dark: 'bg-luxury-dark border border-luxury-border text-luxury-gold',
  };
  return (
    <span className={`inline-block text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
