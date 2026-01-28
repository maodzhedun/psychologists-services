interface IconProps {
  name: 
    | 'arrow'
    | 'users'
    | 'user'
    | 'check'
    | 'close'
    | 'close-sm'
    | 'star'
    | 'heart'
    | 'heart-filled'
    | 'clock'
    | 'chevron-down'
    | 'info'
    | 'loader'
    | 'menu'
    | 'question';
  size?: number;
  className?: string;
}

export default function Icon({ name, size = 24, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <use href={`/sprite.svg#icon-${name}`} />
    </svg>
  );
}
