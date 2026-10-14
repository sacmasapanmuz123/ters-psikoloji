import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { JaggedFrame, SpikyBurstBadge } from './Scribbles';
import { Copy, Check, RotateCcw, X, ShieldAlert } from 'lucide-react';

interface CertificateProps {
  attemptCount: number;
  lastInsult: string;
  iqScore: number;
  rank: string;
  onClose: () => void;
  onRestart: () => void;
}

export const FoolCertificate: React.FC<CertificateProps> = ({
  attemptCount,
  lastInsult,
  iqScore,
  rank,
  onClose,
  onRestart,
}) => {
  const [userName, setUserName] = useState('Gafil Vatandaş');
  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    sound.playClick();
    const certText = `📜 [RESMİ TESCİLLİ AHMAKLIK BELGESİ]
İsim: ${userName}
Vaka: 1 + 1 = ? sorusunda hem 2'yi hem 11'i seçerek sistem tarafından madara edilmek.
Teşhis Derecesi: ${rank}
Hesaplanan IQ: ${iqScore}
Toplam Yanılma Sayısı: ${attemptCount}
Son Alınan Hakaret: ${lastInsult}
Karar: Şahsın akıl sağlığı ters psikoloji karşısında tamamen çökmüştür.`;

    navigator.clipboard.writeText(certText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-8">
        <JaggedFrame borderColor="red" className="border-4 shadow-[0_0_50px_rgba(239,68,68,0.4)]">
          {/* Close button */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-red-400 transition-colors z-30"
            aria-label="Kapat"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Spiky header */}
          <div className="text-center pt-2 pb-4 border-b border-red-500/40">
            <div className="inline-flex items-center gap-2 text-red-500 font-mono-code text-xs uppercase tracking-widest">
              <ShieldAlert className="w-4 h-4 animate-bounce text-lime-400" />
              Ters Psikoloji Evrensel Enstitüsü
            </div>
            <h2 className="font-marker text-2xl sm:text-3xl text-red-400 mt-2 tracking-wide uppercase">
              Tescilli Ahmaklık Beratı
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Bu belge, 1+1 sorusu karşısında çaresizce debelenen şahsa ithaf edilmiştir.
            </p>
          </div>

          {/* Certificate Body */}
          <div className="py-6 space-y-4 text-zinc-300 text-sm">
            <div className="bg-black/60 p-3 border border-red-900/60 rounded-none flex items-center justify-between gap-3">
              <span className="text-xs text-zinc-400 font-mono-code">MAĞDUR ADI / LAKABI:</span>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                maxLength={25}
                className="bg-zinc-900 border border-lime-500/50 text-lime-400 font-marker text-right px-2 py-1 text-sm focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono-code text-xs">
              <div className="bg-zinc-950/80 p-3 border border-zinc-800">
                <div className="text-zinc-500">Mevcut Seviye</div>
                <div className="text-lime-400 font-bold text-sm mt-1">{rank}</div>
              </div>
              <div className="bg-zinc-950/80 p-3 border border-zinc-800">
                <div className="text-zinc-500">Düşen IQ Skoru</div>
                <div className="text-red-400 font-bold text-sm mt-1 tabular-nums">{iqScore}</div>
              </div>
            </div>

            <div className="bg-red-950/30 border border-red-800/50 p-4 text-xs leading-relaxed text-zinc-300 relative">
              <div className="font-bold text-red-400 font-mono-code mb-1">DURUŞMA TUTANAĞI:</div>
              Yukarıda kimliği belirtilen zanlı, <strong className="text-yellow-300">"1 + 1 = ?"</strong> sorusuna{' '}
              <span className="text-red-400">2</span> diyerek <strong className="text-lime-300">APTAL</strong>, ardından{' '}
              <span className="text-red-400">11</span> diyerek <strong className="text-lime-300">GERİZEKALI</strong> damgası yemiştir.
              Toplam <span className="text-red-400 font-bold">{attemptCount}</span> defa şansını denemiş ve her seferinde
              daha da ahmak olduğunu kanıtlamıştır.
            </div>

            {/* Official Stamp with Spiky Insult */}
            <div className="flex items-center justify-around pt-2">
              <div className="transform -rotate-6">
                <div className="border-4 border-red-600 px-4 py-2 text-center text-red-500 font-marker text-lg uppercase tracking-widest drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">
                  ★ ONAYLI SALAK ★
                </div>
              </div>
              <div className="transform rotate-3 text-right">
                <div className="text-[11px] font-mono-code text-zinc-500">İMZA & MÜHÜR</div>
                <div className="font-marker text-lime-400 text-sm">Ters Psikoloji Heyeti</div>
                <div className="w-28 h-0.5 bg-red-600/70 ml-auto mt-1" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-red-500/40 flex flex-wrap gap-3 justify-end items-center">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-zinc-900 border border-lime-500/60 text-lime-300 hover:bg-lime-950/40 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-lime-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Kopyalandı!' : 'Sertifikayı Kopyala'}
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onRestart();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-red-700 hover:bg-red-600 text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Sıfırla ve Yeniden Dene
            </button>
          </div>
        </JaggedFrame>
      </div>
    </div>
  );
};
