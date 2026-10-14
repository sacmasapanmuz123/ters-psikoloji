import React, { useEffect, useState } from 'react';

interface BlueScreenProps {
  remainingSeconds: number;
}

export const BlueScreen: React.FC<BlueScreenProps> = ({ remainingSeconds }) => {
  const [percent, setPercent] = useState(42);

  useEffect(() => {
    const t = setInterval(() => {
      setPercent((p) => (p < 100 ? p + 29 : 100));
    }, 400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#0078d7] text-white flex flex-col justify-center items-start px-6 sm:px-20 md:px-32 select-none overflow-hidden cursor-none">
      {/* Huge Sad Face */}
      <div className="text-8xl sm:text-9xl font-light mb-8 font-sans leading-none">:(</div>

      {/* Primary Crash Header */}
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-light leading-snug">
          Cihazınız aşırı derecede <strong className="font-bold underline decoration-wavy">ahmakça</strong> bir işlemle
          karşılaştı ve kapatılması gerekiyor.
        </h1>
        <p className="text-sm sm:text-base text-blue-100 font-light leading-relaxed">
          Şu anda çaresizce hata bilgileri toplanıyor ve ardından yeniden başlatılacak. Sadece basit bir 1+1 sorusu
          çözecektiniz salak herif, işletim sistemini nasıl çökertmeyi başardın?!
        </p>
      </div>

      {/* Progress ticker */}
      <div className="mt-8 text-xl sm:text-2xl font-light">
        %{Math.min(100, percent)} tamamlandı{' '}
        <span className="text-xs font-mono text-blue-200">
          (Kalan süre: {remainingSeconds > 0 ? remainingSeconds : 1}s...)
        </span>
      </div>

      {/* QR Code and Stop Info */}
      <div className="mt-10 flex items-start gap-5 font-mono text-xs text-blue-100">
        {/* Mock QR Code in SVG */}
        <div className="w-20 h-20 bg-white p-1.5 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full text-black" fill="currentColor">
            <rect x="0" y="0" width="30" height="30" />
            <rect x="5" y="5" width="20" height="20" fill="white" />
            <rect x="10" y="10" width="10" height="10" />

            <rect x="70" y="0" width="30" height="30" />
            <rect x="75" y="5" width="20" height="20" fill="white" />
            <rect x="80" y="10" width="10" height="10" />

            <rect x="0" y="70" width="30" height="30" />
            <rect x="5" y="75" width="20" height="20" fill="white" />
            <rect x="10" y="80" width="10" height="10" />

            <rect x="40" y="10" width="10" height="20" />
            <rect x="55" y="25" width="10" height="15" />
            <rect x="35" y="45" width="30" height="10" />
            <rect x="45" y="65" width="15" height="25" />
            <rect x="70" y="50" width="20" height="20" />
            <rect x="75" y="80" width="15" height="15" />
          </svg>
        </div>

        <div className="space-y-1.5 leading-tight">
          <p className="text-white font-semibold">
            Bu sorun ve olası düzeltmeler hakkında daha fazla bilgi için şu adresi ziyaret edin:
          </p>
          <p className="text-blue-200 underline">https://www.ters-psikoloji.com/tescilli-salak</p>
          <div className="pt-2 text-[11px] text-blue-200 space-y-0.5">
            <div>Durdurma kodu: CRITICAL_PROCESS_DIED_FROM_STUPIDITY</div>
            <div>Başarısız olan: beynin_mantik_lobu.sys (0x00000SALAK)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
