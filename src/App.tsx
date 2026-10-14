/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MAIN_QUESTION, BONUS_QUESTIONS, QuestionData, STAGES, DESPAIR_BUTTONS, TROLL_INSULTS } from './data/gameData';
import { sound } from './utils/audio';
import {
  SpikyBackgroundDoodles,
  SpikyBurstBadge,
  JaggedFrame,
  CrossOutScribble,
  ScratchCanvas,
} from './components/Scribbles';
import { FoolCertificate } from './components/FoolCertificate';
import { BlueScreen } from './components/BlueScreen';
import {
  Volume2,
  VolumeX,
  Edit3,
  Award,
  RefreshCw,
  Skull,
  HelpCircle,
  AlertTriangle,
  Flame,
  ChevronRight,
  ArrowRight,
  AlertOctagon,
  X,
} from 'lucide-react';

export default function App() {
  // Current active question
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData>(MAIN_QUESTION);
  // Track total attempts & selected option
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isWrongAnimation, setIsWrongAnimation] = useState<boolean>(false);
  // Current roast info
  const [currentInsult, setCurrentInsult] = useState<string>('');
  const [currentRoast, setCurrentRoast] = useState<string>('');
  const [currentTheory, setCurrentTheory] = useState<string>('');
  // Despair modal state
  const [despairResponse, setDespairResponse] = useState<{ title: string; msg: string } | null>(null);
  // Mute audio state
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // 3-second Scratch Mode & 2-second Blue Screen states
  const [isScratching, setIsScratching] = useState<boolean>(false);
  const [scratchTimer, setScratchTimer] = useState<number>(3);
  const [clearScratchTrigger, setClearScratchTrigger] = useState<number>(0);
  const [isBlueScreen, setIsBlueScreen] = useState<boolean>(false);
  const [blueScreenTimer, setBlueScreenTimer] = useState<number>(2);
  const [postBsodToast, setPostBsodToast] = useState<string | null>(null);

  // Certificate modal state
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  // Show bonus questions switcher
  const [showBonusQuestions, setShowBonusQuestions] = useState<boolean>(false);

  // Determine current stage & IQ based on attempt count
  const currentStage =
    STAGES.slice().reverse().find((s) => attemptCount >= s.count) || {
      count: 0,
      rank: 'Henüz İmtihan Edilmedi',
      iq: 100,
      color: 'text-zinc-400',
    };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.muted = nextMuted;
    if (!nextMuted) {
      sound.playClick();
    }
  };

  const handleSelectOption = (optionKey: 'optionA' | 'optionB') => {
    const opt = currentQuestion[optionKey];
    setSelectedOption(opt.value);
    setIsWrongAnimation(true);
    setAttemptCount((prev) => prev + 1);

    // Audio effects
    sound.playBuzzer();
    setTimeout(() => sound.playInsultBlast(), 120);

    // Pick dynamic insult from the prompt keywords: 'aptal', 'gerizekalı', 'ahmak', 'salak'
    const insultKeywords = ['APTAL!', 'GERİZEKALI!', 'AHMAK!', 'SALAK!'];
    // Cycle or randomize heavily among these required words
    const randomInsult = insultKeywords[Math.floor(Math.random() * insultKeywords.length)];
    setCurrentInsult(randomInsult);

    // Pick roast
    const randomRoast = opt.roasts[Math.floor(Math.random() * opt.roasts.length)];
    setCurrentRoast(randomRoast);
    setCurrentTheory(opt.theory);

    // Vibrate device if mobile supported
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([100, 50, 150]);
    }
  };

  const handleResetCurrent = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsWrongAnimation(false);
    setCurrentInsult('');
    setCurrentRoast('');
    setCurrentTheory('');
  };

  const handleFullReset = () => {
    sound.playClick();
    handleResetCurrent();
    setAttemptCount(0);
    setCurrentQuestion(MAIN_QUESTION);
    setShowCertificate(false);
    setDespairResponse(null);
  };

  // 3-second Scratch Timer effect
  useEffect(() => {
    if (!isScratching) return;

    if (scratchTimer > 0) {
      const timer = setTimeout(() => {
        setScratchTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Exactly 3 seconds finished -> switch to Blue Screen for 2 seconds
      setIsScratching(false);
      setIsBlueScreen(true);
      setBlueScreenTimer(2);
      sound.playBsodCrash();
    }
  }, [isScratching, scratchTimer]);

  // 2-second Blue Screen Timer effect
  useEffect(() => {
    if (!isBlueScreen) return;

    if (blueScreenTimer > 0) {
      const timer = setTimeout(() => {
        setBlueScreenTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Exactly 2 seconds BSOD finished -> back to game
      setIsBlueScreen(false);
      setPostBsodToast('SİSTEM YENİDEN BAŞLATILDI: Mavi ekran bile senin bu ahmaklığına dayanamayıp pes etti gerizekalı!');
      sound.playInsultBlast();
    }
  }, [isBlueScreen, blueScreenTimer]);

  const startScratchSession = () => {
    if (isScratching || isBlueScreen) return;
    sound.playClick();
    setClearScratchTrigger((prev) => prev + 1);
    setIsScratching(true);
    setScratchTimer(3);
    setPostBsodToast(null);
  };

  const handleTriggerDespair = (button: (typeof DESPAIR_BUTTONS)[0]) => {
    sound.playBoing();
    setDespairResponse({
      title: button.responseTitle,
      msg: button.responseMsg,
    });
  };

  return (
    <div className="relative min-h-screen bg-[#070b07] text-zinc-100 font-sans selection:bg-red-700 selection:text-white flex flex-col overflow-x-hidden">
      {/* Background Red-Green Radial Lighting & Doodles */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(circle at 15% 15%, rgba(220, 38, 38, 0.22) 0%, transparent 45%),
            radial-gradient(circle at 85% 85%, rgba(34, 197, 94, 0.18) 0%, transparent 45%),
            radial-gradient(circle at 50% 50%, rgba(132, 204, 22, 0.05) 0%, transparent 70%)
          `,
        }}
      />
      <SpikyBackgroundDoodles />

      {/* Interactive Scratch / Scribble Canvas (3 seconds only) */}
      <ScratchCanvas enabled={isScratching} clearTrigger={clearScratchTrigger} />

      {/* 3-Second Active Scratch Frenzy HUD */}
      {isScratching && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-11/12 max-w-lg">
          <div className="bg-red-950/95 border-2 border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.9)] p-3.5 text-center animate-violent-shake">
            <div className="font-marker text-xl sm:text-2xl text-yellow-300 tracking-wider">
              🔥 3 SANİYE BOYUNCA EKRANI KARALA!
            </div>
            <div className="font-mono-code text-xs text-lime-400 mt-1">
              KALAN SÜRE:{' '}
              <span className="font-black text-2xl text-white underline decoration-red-500">
                {scratchTimer} SANİYE
              </span>
            </div>
            <div className="text-[10px] text-zinc-400 mt-0.5">
              (Süre dolunca sistem 2 saniye boyunca mavi ekran verip çökecek...)
            </div>
          </div>
        </div>
      )}

      {/* Top Bar Contract (1 Row, 3 Zones) */}
      <header className="relative z-20 flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5 border-b border-red-900/40 bg-[#090e09]/90 backdrop-blur-md">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-marker text-xl sm:text-2xl text-red-500 tracking-wider whitespace-nowrap">
            TERS PSİKOLOJİ <span className="text-lime-400 font-sans font-black">1+1</span>
          </span>
        </div>

        {/* Zone 2: Navigation / Quick modes */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono-code">
          <button
            onClick={() => {
              sound.playClick();
              setCurrentQuestion(MAIN_QUESTION);
              handleResetCurrent();
            }}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-red-400 ${
              currentQuestion.id === MAIN_QUESTION.id ? 'text-lime-400 font-bold underline' : 'text-zinc-400'
            }`}
          >
            Ana Soru: 1 + 1
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setShowBonusQuestions(!showBonusQuestions);
            }}
            className="text-zinc-400 hover:text-lime-400 transition-colors whitespace-nowrap shrink-0"
          >
            Diğer Tuzaklar {showBonusQuestions ? '▲' : '▼'}
          </button>
          <button
            onClick={startScratchSession}
            disabled={isScratching || isBlueScreen}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isScratching ? 'text-red-400 font-bold animate-pulse' : 'text-zinc-400 hover:text-lime-400'
            }`}
          >
            {isScratching ? `✍️ Karalama: ${scratchTimer}s` : '✍️ Karalama Modu (3s)'}
          </button>
        </nav>

        {/* Zone 3: Primary Action / Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={toggleSound}
            className="p-2 border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-lime-400 hover:border-lime-500/50 transition-colors"
            title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
            aria-label="Ses Kontrolü"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-lime-400" />}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setShowCertificate(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-black bg-lime-400 hover:bg-lime-300 transition-colors uppercase whitespace-nowrap shadow-[0_0_12px_rgba(132,204,22,0.4)] cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ahmaklık</span> Belgesi
          </button>
        </div>
      </header>

      {/* Main Content Arena */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center justify-start">
        {/* Post-BSOD Recovery Toast */}
        {postBsodToast && (
          <div className="w-full mb-4 p-3 bg-red-950/90 border-2 border-red-500 text-xs font-mono-code text-white flex items-center justify-between gap-3 animate-violent-shake shadow-[0_0_25px_rgba(239,68,68,0.7)]">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-yellow-400 shrink-0 animate-bounce" />
              <span className="font-semibold">{postBsodToast}</span>
            </div>
            <button
              onClick={() => setPostBsodToast(null)}
              className="p-1 hover:text-yellow-300 text-zinc-300 shrink-0 cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bonus Questions Drawer (Collapsible) */}
        {showBonusQuestions && (
          <div className="w-full mb-6 p-3 bg-black/80 border border-lime-500/40 text-xs font-mono-code animate-fadeIn">
            <div className="text-lime-400 font-bold mb-2 flex items-center justify-between">
              <span>TERS PSİKOLOJİ CEHENNEMİ: DİĞER SORULAR</span>
              <button onClick={() => setShowBonusQuestions(false)} className="text-zinc-500 hover:text-zinc-300">
                [Gizle]
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setCurrentQuestion(MAIN_QUESTION);
                  handleResetCurrent();
                  setShowBonusQuestions(false);
                }}
                className={`p-2 border text-left transition-colors ${
                  currentQuestion.id === MAIN_QUESTION.id
                    ? 'border-red-500 bg-red-950/40 text-red-300'
                    : 'border-zinc-800 hover:border-zinc-600 text-zinc-400'
                }`}
              >
                1. 1 + 1 = ? (Ana Soru)
              </button>
              {BONUS_QUESTIONS.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    sound.playClick();
                    setCurrentQuestion(q);
                    handleResetCurrent();
                    setShowBonusQuestions(false);
                  }}
                  className={`p-2 border text-left transition-colors truncate ${
                    currentQuestion.id === q.id
                      ? 'border-lime-500 bg-lime-950/40 text-lime-300'
                      : 'border-zinc-800 hover:border-zinc-600 text-zinc-400'
                  }`}
                >
                  {idx + 2}. {q.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Psychological Status & Humiliation HUD */}
        <div className="w-full mb-6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code bg-[#0d140e]/80 border border-zinc-800 p-3 sm:p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Skull className="w-4 h-4 text-red-500" />
            <span className="text-zinc-400">Yanılma / Deneme:</span>
            <span className="font-bold text-red-400 text-sm tabular-nums">{attemptCount}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Teşhis:</span>
            <span className={`font-bold uppercase ${currentStage.color}`}>{currentStage.rank}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Tahmini IQ:</span>
            <span
              className={`font-black text-sm tabular-nums ${
                currentStage.iq <= 0 ? 'text-red-500 animate-pulse' : 'text-yellow-400'
              }`}
            >
              {currentStage.iq}
            </span>
          </div>
        </div>

        {/* Central Question Arena */}
        <div className="w-full relative">
          <JaggedFrame
            borderColor={selectedOption ? 'red' : 'mixed'}
            className={`transition-all duration-300 ${
              isWrongAnimation ? 'animate-violent-shake shadow-[0_0_40px_rgba(239,68,68,0.35)]' : ''
            }`}
          >
            {/* Header / Subtitle */}
            <div className="text-center mb-6">
              <div className="inline-block px-3 py-1 bg-red-950/50 border border-red-500/40 text-red-400 font-mono-code text-[11px] uppercase tracking-wider mb-2">
                Ters Psikoloji İmtihanı #01
              </div>
              <h1 className="font-marker text-4xl sm:text-6xl text-lime-400 tracking-wider text-anarchy mt-1">
                {currentQuestion.title}
              </h1>
              <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto font-mono-code">
                {currentQuestion.subtitle}
              </p>
            </div>

            {/* The Options Grid: Prompt requires 2 and 11 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6">
              {/* Option A: "2" */}
              <div className="relative group">
                <button
                  onClick={() => handleSelectOption('optionA')}
                  className={`w-full py-6 sm:py-8 px-6 text-center transition-all cursor-pointer relative overflow-hidden select-none border-2 ${
                    selectedOption === currentQuestion.optionA.value
                      ? 'bg-red-950/70 border-red-500 text-red-300'
                      : 'bg-zinc-950/90 border-lime-500/60 hover:border-lime-400 text-zinc-100 hover:bg-zinc-900 shadow-[0_0_20px_rgba(34,197,94,0.15)]'
                  }`}
                  style={{
                    clipPath: 'polygon(0% 8px, 8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%)',
                  }}
                >
                  <div className="text-xs font-mono-code text-zinc-400 uppercase tracking-widest mb-1">ŞIK A</div>
                  <div className="font-marker text-5xl sm:text-7xl text-lime-300 group-hover:scale-105 transition-transform duration-150">
                    {currentQuestion.optionA.label}
                  </div>
                  <div className="text-[11px] font-mono-code text-zinc-500 mt-2">
                    {currentQuestion.id === MAIN_QUESTION.id ? '(Klasik Matematik Cevabı)' : 'Seçenek 1'}
                  </div>

                  {/* Sharp corner accent */}
                  <div className="absolute top-0 right-0 w-3 h-3 bg-red-600" />
                </button>

                {/* If selected: violent scratch cross out */}
                {selectedOption === currentQuestion.optionA.value && <CrossOutScribble />}
              </div>

              {/* Option B: "11" */}
              <div className="relative group">
                <button
                  onClick={() => handleSelectOption('optionB')}
                  className={`w-full py-6 sm:py-8 px-6 text-center transition-all cursor-pointer relative overflow-hidden select-none border-2 ${
                    selectedOption === currentQuestion.optionB.value
                      ? 'bg-red-950/70 border-red-500 text-red-300'
                      : 'bg-zinc-950/90 border-red-500/60 hover:border-red-400 text-zinc-100 hover:bg-zinc-900 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                  }`}
                  style={{
                    clipPath: 'polygon(0% 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, 8px 100%, 0% calc(100% - 8px))',
                  }}
                >
                  <div className="text-xs font-mono-code text-zinc-400 uppercase tracking-widest mb-1">ŞIK B</div>
                  <div className="font-marker text-5xl sm:text-7xl text-red-400 group-hover:scale-105 transition-transform duration-150">
                    {currentQuestion.optionB.label}
                  </div>
                  <div className="text-[11px] font-mono-code text-zinc-500 mt-2">
                    {currentQuestion.id === MAIN_QUESTION.id ? '(String / Yan Yana Cevabı)' : 'Seçenek 2'}
                  </div>

                  {/* Sharp corner accent */}
                  <div className="absolute top-0 left-0 w-3 h-3 bg-lime-400" />
                </button>

                {/* If selected: violent scratch cross out */}
                {selectedOption === currentQuestion.optionB.value && <CrossOutScribble />}
              </div>
            </div>

            {/* When user answers: Explosive Insult & Reverse Psychology Gaslighting */}
            {selectedOption && (
              <div className="mt-8 pt-6 border-t border-red-800/40 text-center animate-fadeIn">
                {/* Spiky Starburst with Prompt's Insult Keywords */}
                <div className="flex justify-center">
                  <SpikyBurstBadge
                    text={currentInsult || 'APTAL!'}
                    subtext={`YANLIŞ SEÇİM: "${selectedOption}"`}
                    isRed={selectedOption === '2'}
                  />
                </div>

                {/* The Unhinged Roast Text */}
                <div className="max-w-xl mx-auto mt-4 p-4 bg-black/75 border-2 border-red-600/80 text-left relative shadow-[0_0_25px_rgba(239,68,68,0.25)]">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-red-400 font-bold mb-1">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    TERS PSİKOLOJİ CEVAP ANALİZİ:
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-zinc-100 leading-relaxed font-sans">
                    {currentRoast}
                  </p>

                  {/* Ludicrous Fake Scientific Theory */}
                  <div className="mt-3 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 font-mono-code">
                    💡 <strong className="text-lime-400">Neden Yanlış?:</strong> {currentTheory}
                  </div>
                </div>

                {/* Try Again / Switch Option Button */}
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => {
                      // Switch to other option immediately to get roasted again!
                      const other = selectedOption === '2' ? 'optionB' : 'optionA';
                      handleSelectOption(other);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 font-marker text-sm sm:text-base bg-red-700 hover:bg-red-600 text-white uppercase tracking-wider transition-transform active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                  >
                    <Flame className="w-4 h-4" />
                    {selectedOption === '2' ? 'O Zaman 11 Diyeyim (Tıkla da Gör!)' : 'O Zaman 2 Diyeyim (Tıkla da Gör!)'}
                  </button>

                  <button
                    onClick={handleResetCurrent}
                    className="inline-flex items-center gap-2 px-4 py-3 font-mono-code text-xs font-semibold bg-zinc-900 border border-zinc-700 hover:border-lime-400 text-zinc-300 hover:text-lime-300 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Seçimi Temizle
                  </button>
                </div>
              </div>
            )}
          </JaggedFrame>
        </div>

        {/* Despair / Tantrum Buttons ("Çaresizlik Butonları") */}
        <div className="w-full mt-8">
          <div className="text-xs font-mono-code text-zinc-400 mb-2 flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-lime-400" />
            <span>SİSTEME İTİRAZ ETME VE ÇARESİZLİK BUTONLARI:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {DESPAIR_BUTTONS.map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleTriggerDespair(btn)}
                className="px-3 py-2 text-xs font-mono-code text-left bg-zinc-950/70 border border-zinc-800 hover:border-red-500/80 hover:bg-red-950/20 text-zinc-300 hover:text-red-200 transition-colors truncate cursor-pointer"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tantrum / Despair Modal Response */}
        {despairResponse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-md">
              <JaggedFrame borderColor="red" className="border-2 shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                <div className="text-center">
                  <div className="font-marker text-2xl text-red-500 mb-2">{despairResponse.title}</div>
                  <p className="text-zinc-200 text-sm leading-relaxed font-sans mb-5">{despairResponse.msg}</p>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setDespairResponse(null);
                    }}
                    className="w-full py-2.5 font-mono-code text-xs font-bold uppercase bg-lime-400 hover:bg-lime-300 text-black transition-colors cursor-pointer"
                  >
                    Anladım, Ben Bir Ahmakım (Kapat)
                  </button>
                </div>
              </JaggedFrame>
            </div>
          </div>
        )}

        {/* Live Scratch Mood & Canvas Help Banner (3s Scratch -> 2s BSOD) */}
        <div className="w-full mt-6 p-3 bg-red-950/20 border border-red-900/40 text-[11px] font-mono-code text-zinc-400 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-lime-400" />
            <span>
              Öfkeni ekrana karalayarak çıkar:{' '}
              <strong className="text-zinc-200">Karalama Modu</strong> tam 3 saniye sürer ve ardından 2 saniye mavi ekran verir!
            </span>
          </div>
          <button
            onClick={startScratchSession}
            disabled={isScratching || isBlueScreen}
            className="px-3 py-1.5 bg-red-800 hover:bg-red-700 disabled:opacity-50 border border-red-500 text-white text-xs cursor-pointer font-bold shadow-[0_0_12px_rgba(239,68,68,0.5)] transition-all"
          >
            {isScratching ? `Karalanıyor (${scratchTimer}s)` : '3s Karala & Çökert!'}
          </button>
        </div>

        {/* Certificate Modal */}
        {showCertificate && (
          <FoolCertificate
            attemptCount={attemptCount}
            lastInsult={currentInsult || 'APTAL'}
            iqScore={currentStage.iq}
            rank={currentStage.rank}
            onClose={() => setShowCertificate(false)}
            onRestart={handleFullReset}
          />
        )}
      </main>

      {/* Blue Screen of Death Takeover (Lasts exactly 2 seconds) */}
      {isBlueScreen && <BlueScreen remainingSeconds={blueScreenTimer} />}

      {/* Footer */}
      <footer className="relative z-10 py-4 px-6 border-t border-zinc-900 text-center text-xs font-mono-code text-zinc-500 bg-[#070b07]">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span>Ters Psikoloji Simülasyonu © 2026</span>
          <span>·</span>
          <span className="text-red-400/80">Kırmızı & Yeşil Kaos Estetiği</span>
          <span>·</span>
          <span className="text-lime-400/80">Doğru Şık Aramayın, Yoktur</span>
        </div>
      </footer>
    </div>
  );
}
