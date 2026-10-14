import React, { useEffect, useRef } from 'react';

/**
 * Spiky, deformed, chaotic background doodles and scratches
 * Distinct reddish-green punk / horror / reverse-psychology aesthetic
 */
export const SpikyBackgroundDoodles: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 opacity-45 select-none">
      {/* Top Left Sharp Jagged Scribble Cluster */}
      <svg
        className="absolute -top-12 -left-12 w-96 h-96 text-red-600/35 animate-jitter"
        viewBox="0 0 300 300"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="M10,20 L60,80 L20,110 L90,140 L30,190 L120,200 L50,260 L180,240 L110,290 L240,250 L190,300" />
        <path d="M40,10 L90,50 L50,90 L130,80 L80,140 L170,120 L110,180 L220,160 L160,230 L270,190" stroke="#22c55e" strokeWidth="1.8" />
        <path d="M5,150 Q70,90 120,160 T250,80 T300,200" strokeDasharray="4 8" stroke="#ef4444" />
        <polygon points="150,40 160,70 190,65 170,85 185,115 155,100 135,120 140,90 115,80 140,65" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" />
      </svg>

      {/* Top Right Sharp Poison Green Scribble Thorns */}
      <svg
        className="absolute -top-8 -right-8 w-80 h-80 text-lime-500/30"
        viewBox="0 0 300 300"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M290,10 L220,60 L270,100 L190,130 L250,170 L160,200 L230,240 L130,260 L190,295" />
        <path d="M250,40 L180,80 L230,120 L150,150 L200,210 L120,230" stroke="#dc2626" strokeWidth="2.5" />
        {/* Violent cross-out scratches */}
        <line x1="160" y1="40" x2="280" y2="160" stroke="#ef4444" strokeWidth="3" />
        <line x1="280" y1="40" x2="160" y2="160" stroke="#ef4444" strokeWidth="3" />
        <line x1="170" y1="30" x2="270" y2="170" stroke="#84cc16" strokeWidth="1.5" />
      </svg>

      {/* Bottom Left Chaotic Scratches */}
      <svg
        className="absolute -bottom-16 -left-16 w-96 h-96 text-red-500/25"
        viewBox="0 0 300 300"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M10,290 L80,220 L30,180 L110,150 L60,100 L150,80 L90,20 L190,50 L160,5" />
        <path d="M30,270 L100,210 L60,160 L140,140 L90,90 L180,70 L130,10" stroke="#22c55e" strokeWidth="2" />
        <polygon points="120,220 140,200 135,170 160,180 180,150 170,190 200,210 165,220 170,250 140,235" fill="#ef4444" fillOpacity="0.12" stroke="#dc2626" />
      </svg>

      {/* Bottom Right Aggressive Spikes & Scribbles */}
      <svg
        className="absolute -bottom-10 -right-10 w-80 h-80 text-emerald-500/25 animate-jitter"
        viewBox="0 0 300 300"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M290,280 L210,230 L260,190 L170,170 L230,120 L140,110 L200,60 L110,50 L170,10" stroke="#84cc16" />
        <path d="M270,290 L200,210 L250,170 L160,150 L210,100 L120,90" stroke="#ef4444" strokeWidth="2.5" />
        {/* Wild scribble loop */}
        <path d="M150,180 C200,120 280,220 220,260 C160,300 130,210 180,160 C230,110 270,190 230,230" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>

      {/* Center Scattered Sharp Thorn Elements */}
      <div className="absolute top-1/4 left-1/12 w-24 h-24 rotate-12 opacity-30 text-lime-400">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10,50 L40,10 L50,45 L90,20 L60,60 L95,85 L50,75 L30,95 L35,60 Z" />
        </svg>
      </div>

      <div className="absolute top-1/3 right-1/12 w-28 h-28 -rotate-45 opacity-35 text-red-500">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5,50 L35,25 L45,55 L85,15 L65,65 L95,75 L55,85 L40,100 L35,70 Z" />
          <line x1="10" y1="10" x2="90" y2="90" stroke="#22c55e" strokeWidth="2.5" />
          <line x1="90" y1="10" x2="10" y2="90" stroke="#22c55e" strokeWidth="2.5" />
        </svg>
      </div>
    </div>
  );
};

/**
 * Spiky, deformed, multi-pointed starburst for screaming insults (APTAL!, GERİZEKALI!, etc.)
 */
export const SpikyBurstBadge: React.FC<{
  text: string;
  subtext?: string;
  isRed?: boolean;
}> = ({ text, subtext, isRed = true }) => {
  return (
    <div className="relative inline-flex items-center justify-center p-6 my-2 group">
      {/* Underlying sharp deformed starburst polygon */}
      <svg
        className={`w-72 h-44 sm:w-96 sm:h-52 drop-shadow-[0_0_25px_rgba(${isRed ? '239,68,68' : '34,197,94'},0.5)] animate-violent-shake`}
        viewBox="0 0 360 200"
        fill="none"
      >
        {/* Background shadow layer */}
        <polygon
          points="
            180,5 210,45 250,15 260,58 310,40 295,85 345,95 315,130 
            355,160 305,170 320,205 270,185 255,225 215,185 180,215 
            145,185 105,225 90,185 40,205 55,170 5,160 45,130 
            15,95 65,85 50,40 100,58 110,15 150,45
          "
          fill={isRed ? '#450a0a' : '#052e16'}
          stroke={isRed ? '#ef4444' : '#22c55e'}
          strokeWidth="4"
        />
        {/* Forefront jagged layer */}
        <polygon
          points="
            180,15 205,50 240,25 248,62 295,48 280,88 330,102 298,132 
            335,158 290,165 300,195 258,178 240,210 208,175 180,200 
            152,175 120,210 102,178 60,195 70,165 25,158 62,132 
            30,102 80,88 65,48 112,62 120,25 155,50
          "
          fill={isRed ? '#991b1b' : '#14532d'}
          stroke={isRed ? '#f87171' : '#4ade80'}
          strokeWidth="3"
        />
        {/* Extra jagged lightning slash through burst */}
        <path
          d="M30,100 L110,80 L160,120 L240,70 L330,110"
          stroke={isRed ? '#22c55e' : '#ef4444'}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="miter"
        />
        <path
          d="M50,140 L130,110 L190,150 L280,90"
          stroke="#fef08a"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Floating Insult Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none">
        <span
          className={`font-marker text-4xl sm:text-6xl font-black tracking-wider uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] ${
            isRed ? 'text-red-100 text-anarchy' : 'text-lime-200 text-anarchy'
          }`}
          style={{ transform: 'rotate(-2deg)' }}
        >
          {text}
        </span>
        {subtext && (
          <span className="font-mono-code text-xs sm:text-sm font-bold text-yellow-300 bg-black/80 px-2 py-0.5 mt-1 border border-red-500/80 -rotate-1">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Jagged hand-drawn frame border around cards or questions
 */
export const JaggedFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  borderColor?: 'red' | 'green' | 'mixed';
}> = ({ children, className = '', borderColor = 'mixed' }) => {
  const strokeClass =
    borderColor === 'red'
      ? 'border-red-600'
      : borderColor === 'green'
      ? 'border-emerald-500'
      : 'border-red-600/70 shadow-[inset_0_0_20px_rgba(34,197,94,0.15)]';

  return (
    <div
      className={`relative p-5 sm:p-7 bg-[#0b120c]/90 border-2 ${strokeClass} rounded-none backdrop-blur-md overflow-hidden ${className}`}
      style={{
        clipPath:
          'polygon(0% 4px, 4px 0%, calc(100% - 6px) 0%, 100% 5px, calc(100% - 2px) calc(100% - 7px), calc(100% - 8px) 100%, 7px 100%, 0% calc(100% - 5px))',
      }}
    >
      {/* Corner spiky accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-lime-400" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-lime-400" />

      {/* Decorative chaotic scratch top divider */}
      <svg
        className="absolute top-0 left-10 right-10 h-2 w-full text-red-500/60 pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 100 10"
      >
        <path d="M0,5 L20,0 L40,8 L60,2 L80,9 L100,4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>

      {children}
    </div>
  );
};

/**
 * Cross-out slash overlay when user clicks an answer
 */
export const CrossOutScribble: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
      <svg
        className="w-full h-full text-red-600 drop-shadow-[0_0_8px_rgba(239,68,68,0.9)] animate-violent-shake"
        viewBox="0 0 200 100"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Violent jagged double cross */}
        <path
          d="M10,15 L190,85 M20,10 L180,90 M15,20 L185,80"
          stroke="#ef4444"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M190,15 L10,85 M180,10 L20,90 M185,20 L15,80"
          stroke="#dc2626"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M15,50 L185,50 M5,45 L195,55"
          stroke="#22c55e"
          strokeWidth="3"
          strokeDasharray="6 4"
        />
      </svg>
    </div>
  );
};

/**
 * Interactive canvas allowing user to scratch, doodle, and vent their anger
 */
export const ScratchCanvas: React.FC<{ enabled: boolean; clearTrigger?: number }> = ({ enabled, clearTrigger = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Clear canvas whenever a new session starts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [clearTrigger]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!enabled) return;
    isDrawing.current = true;
    lastPoint.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!enabled || !isDrawing.current || !lastPoint.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentX = e.clientX;
    const currentY = e.clientY;

    // Reddish-green spiky jagged scratches
    const colors = ['#ef4444', '#dc2626', '#22c55e', '#84cc16', '#ff2a55', '#16a34a'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    ctx.strokeStyle = randomColor;
    ctx.lineWidth = Math.random() * 5 + 3;
    ctx.lineCap = 'square';
    ctx.lineJoin = 'miter';

    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    // Add jittery offset for spiky deformed look
    const jitterX = (Math.random() - 0.5) * 20;
    const jitterY = (Math.random() - 0.5) * 20;
    ctx.lineTo(currentX + jitterX, currentY + jitterY);
    ctx.stroke();

    lastPoint.current = { x: currentX, y: currentY };
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`fixed inset-0 z-40 transition-opacity ${
        enabled ? 'cursor-crosshair pointer-events-auto opacity-95' : 'pointer-events-none opacity-0'
      }`}
    />
  );
};
