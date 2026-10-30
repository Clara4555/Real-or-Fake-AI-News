interface BlinkyProps {
  message?: string;
  mood?: 'happy' | 'thinking' | 'excited' | 'detective';
  size?: 'sm' | 'md' | 'lg';
}

const moodEmojis: Record<string, string> = {
  happy: '😊',
  thinking: '🤔',
  excited: '🤩',
  detective: '🔍',
};

export default function Blinky({ message, mood = 'happy', size = 'md' }: BlinkyProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const eyeSize = {
    sm: 'w-2.5 h-2.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="flex items-start gap-3 animate-fade-up">
      <div className={`relative ${sizeClasses[size]} flex-shrink-0`}>
        <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl shadow-lg shadow-blue-200 animate-float" />
        {/* Antenna */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-blue-400 rounded-full" />
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse-soft" />
        {/* Face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
          <div className="flex gap-2">
            <div className={`${eyeSize[size]} bg-white rounded-full flex items-center justify-center`}>
              <div className={`w-1.5 h-1.5 ${size === 'lg' ? 'w-2 h-2' : ''} bg-gray-800 rounded-full`} />
            </div>
            <div className={`${eyeSize[size]} bg-white rounded-full flex items-center justify-center`}>
              <div className={`w-1.5 h-1.5 ${size === 'lg' ? 'w-2 h-2' : ''} bg-gray-800 rounded-full`} />
            </div>
          </div>
          <div className="text-xs">{moodEmojis[mood]}</div>
        </div>
        {/* Cheeks */}
        <div className="absolute bottom-3 left-1 w-2 h-2 bg-coral-300 rounded-full opacity-60" style={{ background: '#fca5a5' }} />
        <div className="absolute bottom-3 right-1 w-2 h-2 rounded-full opacity-60" style={{ background: '#fca5a5' }} />
      </div>
      {message && (
        <div className="flex-1 bg-white border-2 border-sky-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm relative mt-2">
          <div className="absolute -left-1.5 top-3 w-3 h-3 bg-white border-l-2 border-b-2 border-sky-200 transform rotate-45" />
          <p className="text-sm text-gray-700 leading-relaxed font-body">{message}</p>
        </div>
      )}
    </div>
  );
}
