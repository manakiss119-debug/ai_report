import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, 
  Droplet, 
  Flame, 
  Wind, 
  Square, 
  CheckSquare, 
  Play, 
  ExternalLink, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  ChevronRight,
  ListTodo,
  TrendingUp,
  MapPin,
  RefreshCw,
  Award,
  Palette,
  Sparkles,
  Sliders,
  Moon,
  Sun,
  Bookmark
} from 'lucide-react';
import { manualData } from './data';
import { AppImage } from './components/AppImage';
import { Calculator } from './components/Calculator';

// 3가지 제안 시안 스타일 프리셋 정의
const stylesConfig = {
  minimalist: {
    appBg: "bg-[#f5f5f5]",
    containerBg: "bg-white border-x border-neutral-200",
    cardClass: "bg-white border border-neutral-900 rounded-none shadow-none p-6 space-y-5",
    headerBg: "bg-white border-b border-neutral-900 p-5 px-6 z-35",
    headerTitle: "text-neutral-950 font-mono tracking-tight",
    tabActive: "bg-neutral-950 text-white rounded-none border border-neutral-950 font-bold",
    tabInactive: "bg-white text-neutral-500 rounded-none border border-neutral-200 hover:bg-neutral-50",
    btnColor: "bg-neutral-950 text-white hover:bg-neutral-800 rounded-none",
    badge: "bg-neutral-100 text-neutral-900 border border-neutral-900 rounded-none px-2 py-0.5 text-[9px] font-mono",
    progressBg: "bg-neutral-100 h-1 rounded-none",
    progressBar: "bg-neutral-950 h-full",
    checkActive: "text-neutral-950",
    checkInactive: "text-neutral-300",
    timelineDot: "border-neutral-950 text-neutral-950 bg-white border-2 font-mono",
    timelineLine: "border-neutral-200",
    textPrimary: "text-neutral-900 font-mono font-bold",
    textSecondary: "text-neutral-700 font-mono",
    categoryClassActive: "bg-neutral-950 text-white border-neutral-950 rounded-none shadow-none",
    categoryClassInactive: "bg-white text-neutral-500 border-neutral-200 rounded-none shadow-none hover:bg-neutral-50"
  },
  vivid: {
    appBg: "bg-gradient-to-tr from-[#ede9fe] via-[#f5f3ff] to-[#fae8ff]",
    containerBg: "bg-white/95 backdrop-blur-md shadow-2xl relative border-x border-violet-100",
    cardClass: "bg-gradient-to-b from-white to-violet-50 rounded-3xl border border-violet-100/80 shadow-[0_12px_40px_rgba(124,58,237,0.08)] p-6 space-y-5",
    headerBg: "bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 text-white p-5 px-6 z-35 shadow-md",
    headerTitle: "text-white font-extrabold tracking-tight",
    tabActive: "bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-2xl shadow-md border-transparent font-bold",
    tabInactive: "bg-white text-slate-600 rounded-2xl border border-violet-100 hover:bg-violet-50",
    btnColor: "bg-gradient-to-r from-pink-500 to-violet-600 text-white hover:opacity-95 rounded-2xl",
    badge: "bg-pink-100 text-pink-700 font-black rounded-lg px-2 py-0.5 text-[9px]",
    progressBg: "bg-violet-100 h-2.5 rounded-full",
    progressBar: "bg-gradient-to-r from-violet-500 via-indigo-500 to-pink-500 h-full rounded-full",
    checkActive: "text-violet-600",
    checkInactive: "text-violet-200",
    timelineDot: "border-violet-600 text-violet-600 bg-violet-50 border-2 font-extrabold",
    timelineLine: "border-violet-100",
    textPrimary: "text-slate-900 font-black",
    textSecondary: "text-slate-600 font-medium",
    categoryClassActive: "bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 text-white border-transparent rounded-2xl shadow-md",
    categoryClassInactive: "bg-white text-slate-600 border-violet-100/60 rounded-2xl shadow-2xs hover:bg-violet-50/50"
  }
};

// 개인화 테마 유틸리티 함수
const getPersonalizedClasses = (color: string, mode: string) => {
  const isDark = mode === 'dark';
  const isSepia = mode === 'sepia';

  let colorClass = 'brand-blue';
  let colorBgClass = 'bg-brand-blue';
  let colorTextClass = 'text-brand-blue';
  let colorBorderClass = 'border-brand-blue';

  if (color === 'emerald') {
    colorBgClass = 'bg-emerald-500';
    colorTextClass = 'text-emerald-500';
    colorBorderClass = 'border-emerald-500';
    colorClass = 'emerald-500';
  } else if (color === 'rose') {
    colorBgClass = 'bg-rose-500';
    colorTextClass = 'text-rose-500';
    colorBorderClass = 'border-rose-500';
    colorClass = 'rose-500';
  } else if (color === 'amber') {
    colorBgClass = 'bg-amber-500';
    colorTextClass = 'text-amber-500';
    colorBorderClass = 'border-amber-500';
    colorClass = 'amber-500';
  } else if (color === 'purple') {
    colorBgClass = 'bg-purple-500';
    colorTextClass = 'text-purple-500';
    colorBorderClass = 'border-purple-500';
    colorClass = 'purple-500';
  }

  // Base background and text colors
  let containerBg = 'bg-white';
  let mainBg = 'bg-brand-bg';
  let borderClass = 'border-slate-100';
  let textMain = 'text-slate-900';
  let textSub = 'text-slate-500';
  let cardBg = 'bg-white border-slate-100/80';
  let headerClass = isDark ? 'bg-slate-900/90 border-slate-800' : isSepia ? 'bg-[#fbf6eb]/90 border-[#ede3cb]' : 'bg-white/90 border-slate-100';

  if (isDark) {
    mainBg = 'bg-slate-950';
    containerBg = 'bg-slate-900 border-x border-slate-800';
    borderClass = 'border-slate-800';
    textMain = 'text-slate-100';
    textSub = 'text-slate-400';
    cardBg = 'bg-slate-850 border border-slate-800';
  } else if (isSepia) {
    mainBg = 'bg-[#f4efe2]';
    containerBg = 'bg-[#fbf6eb] border-x border-[#ede3cb]';
    borderClass = 'border-[#ede3cb]';
    textMain = 'text-[#433422]';
    textSub = 'text-[#7e6950]';
    cardBg = 'bg-[#fdfbf7] border border-[#ede3cb]';
  }

  return {
    appBg: mainBg,
    containerBg: containerBg,
    cardClass: `${cardBg} rounded-3xl shadow-sm p-6 space-y-5`,
    headerBg: `${headerClass} border-b p-5 px-6 z-35`,
    headerTitle: `${textMain} font-extrabold tracking-tight`,
    tabActive: `${colorBgClass} text-white rounded-2xl shadow-xs border-transparent font-bold`,
    tabInactive: `${isDark ? 'bg-slate-800 text-slate-400 border-slate-800' : isSepia ? 'bg-[#f5eacf] text-[#7e6950] border-[#eedeb7]' : 'bg-slate-50 text-slate-500 border-slate-100'} rounded-2xl border hover:opacity-85`,
    btnColor: `${colorBgClass} text-white hover:opacity-90 rounded-2xl`,
    badge: `bg-opacity-15 ${colorBgClass} ${colorTextClass} font-bold rounded-lg px-2 py-0.5 text-[9px]`,
    progressBg: `${isDark ? 'bg-slate-800' : isSepia ? 'bg-[#ebdcb5]' : 'bg-slate-100'} h-2 rounded-full overflow-hidden`,
    progressBar: `${colorBgClass} h-full rounded-full`,
    checkActive: colorTextClass,
    checkInactive: isDark ? 'text-slate-700' : isSepia ? 'text-[#e6d0a1]' : 'text-slate-200',
    timelineDot: `${colorBorderClass} ${colorTextClass} bg-transparent border-2 font-extrabold`,
    timelineLine: isDark ? 'border-slate-800' : isSepia ? 'border-[#ede3cb]' : 'border-slate-100',
    textPrimary: textMain,
    textSecondary: textSub,
    categoryClassActive: `${colorBgClass} text-white border-transparent rounded-2xl shadow-xs`,
    categoryClassInactive: `${isDark ? 'bg-slate-800 text-slate-400 border-slate-800' : isSepia ? 'bg-[#eedeb7]/40 text-[#7e6950] border-[#ede3cb]' : 'bg-slate-50 text-slate-500 border-slate-100'} rounded-2xl border hover:bg-opacity-70`
  };
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeCat, setActiveCat] = useState<'dust' | 'hcl' | 'gas' | 'flow'>('dust');
  const [activeSec, setActiveSec] = useState<string>('equipment');

  // 오염물질별 준비물 자가체크리스트 상태 보존
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [logoError, setLogoError] = useState(false);

  // 🔮 3개 추천 디자인 시안 프리셋 선택 모델 🔮
  // 'minimalist' (미니멀) | 'vivid' (비비드 그라데이션) | 'personalized' (개인화 커스텀 테마)
  const [prototypeStyle, setPrototypeStyle] = useState<'minimalist' | 'vivid' | 'personalized'>('personalized');

  // 개인화 커스텀 테마용 세부 제어 상태
  const [persBg, setPersBg] = useState<string>('light'); // light (크림), dark (코스믹다크), sepia (눈보호 세피아)
  const [persColor, setPersColor] = useState<string>('blue'); // blue, emerald, rose, amber, purple

  // 최초 기동 스플래시 화면 지연
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // 대기오염 대상 카테고리 전환 시 하위 세션 탭 리셋
  useEffect(() => {
    const defaultSec = manualData[activeCat].tabs[0]?.id || 'equipment';
    setActiveSec(defaultSec);
  }, [activeCat]);

  // 로컬 보존 데이터 체크리스트 호출
  useEffect(() => {
    const saved = localStorage.getItem('keco_manual_checklist');
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleCheckItem = (cat: string, index: number) => {
    const key = `${cat}_${index}`;
    const updated = {
      ...checkedItems,
      [key]: !checkedItems[key]
    };
    setCheckedItems(updated);
    localStorage.setItem('keco_manual_checklist', JSON.stringify(updated));
  };

  const getActiveTabLabel = () => {
    switch (activeCat) {
      case 'dust': return '먼지 상대정확도';
      case 'hcl': return 'HCl 상대정확도';
      case 'gas': return '가스 상대정확도';
      case 'flow': return '유량 상대정확도';
      default: return '상대정확도 시험';
    }
  };

  // 실시간 선택된 디자인 스타일에 맞춰 렌더링 클래스 구조 로드
  const getStyleTheme = () => {
    if (prototypeStyle === 'minimalist') {
      return stylesConfig.minimalist;
    } else if (prototypeStyle === 'vivid') {
      return stylesConfig.vivid;
    } else {
      return getPersonalizedClasses(persColor, persBg);
    }
  };

  const activeTheme = getStyleTheme();

  // 리치 가이드 서식 및 미디어 렌더러
  const renderRichText = (text: string) => {
    if (!text) return null;

    const lines = text.split('\n');
    return (
      <div className="space-y-4">
        {lines.map((line, idx) => {
          // 사진 렌더링 및 대체 위젯 대응
          if (line.includes('[사진:')) {
            const match = line.match(/\[사진:([^|]+)\|([^\]]+)\]/);
            if (match) {
              return (
                <AppImage 
                  key={`img-${idx}`} 
                  src={match[1]} 
                  alt={match[2]} 
                />
              );
            }
          }

          // 유튜브 공식교육 영상 위젯
          if (line.includes('[유튜브:')) {
            const match = line.match(/\[유튜브:([^|]+)\|([^\]]+)\]/);
            if (match) {
              return (
                <div key={`video-${idx}`} className={`my-2 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs transition-all border ${
                  activeTheme.timelineLine
                } ${prototypeStyle === 'minimalist' ? 'bg-white rounded-none border-neutral-900' : 'bg-slate-50/50'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 text-red-500 rounded-full flex items-center justify-center shrink-0">
                      <Play size={18} fill="currentColor" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${activeTheme.textPrimary}`}>{match[2]}</div>
                      <div className="text-[10px] text-slate-400">환경공단 공식 현장 시공 교육 영상</div>
                    </div>
                  </div>
                  <a 
                    href={match[1]} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`inline-flex items-center gap-1 bg-red-500 text-white px-3.5 py-1.5 font-bold text-[11px] hover:bg-red-600 active:scale-95 transition-all shadow-xs ${
                      prototypeStyle === 'minimalist' ? 'rounded-none' : 'rounded-xl'
                    }`}
                  >
                    영상 보러가기 <ExternalLink size={12} />
                  </a>
                </div>
              );
            }
          }

          // 제목 서식
          if (line.trim().startsWith('➊') || line.trim().startsWith('➋') || line.trim().startsWith('※')) {
            return (
              <h4 key={idx} className={`font-extrabold text-xs pt-3 flex items-center gap-1.5 pb-1 ${activeTheme.textPrimary}`}>
                <span className={`w-1 h-3.5 bg-current rounded-full ${prototypeStyle === 'minimalist' ? 'rounded-none' : ''}`}></span> {line}
              </h4>
            );
          }

          // 리스트 리치 서식
          if (line.trim().startsWith('•') || line.trim().startsWith('①') || line.trim().startsWith('②') || line.trim().startsWith('③') || line.trim().startsWith('④') || line.trim().startsWith('⑤') || line.trim().startsWith('⑥') || line.trim().startsWith('⑦')) {
            return (
              <div key={idx} className={`text-xs leading-relaxed pl-3 border-l-2 py-0.5 ${activeTheme.timelineLine} ${activeTheme.textSecondary}`}>
                {line}
              </div>
            );
          }

          return line.trim() ? (
            <p key={idx} className={`text-xs leading-relaxed ${activeTheme.textSecondary}`}>
              {line}
            </p>
          ) : <div key={idx} className="h-2"></div>;
        })}
      </div>
    );
  };

  const currentManual = manualData[activeCat];

  // 준비물 자가체크 퍼센테이지 계측
  const getProgressPercentage = () => {
    const list = currentManual.equipment;
    if (!list || list.length === 0) return 0;
    const completedCount = list.filter((_, idx) => checkedItems[`${activeCat}_${idx}`]).length;
    return Math.round((completedCount / list.length) * 100);
  };

  return (
    <div className={`min-h-screen relative flex flex-col justify-start items-center overflow-x-hidden antialiased transition-colors duration-400 ${activeTheme.appBg}`}>
      
      {/* 🔮 INTUITIVE SPLASH SCREEN 🔮 */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            id="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center ${activeTheme.appBg}`}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex flex-col items-center"
            >
              {logoError ? (
                <div className="bg-brand-blue text-white font-black text-xl w-14 h-14 rounded-2xl flex items-center justify-center shadow-md mb-5 animate-pulse">
                  KECO
                </div>
              ) : (
                <img 
                  src="logo.gif" 
                  alt="한국환경공단 로고" 
                  onError={() => setLogoError(true)}
                  className="w-16 h-auto mb-5 drop-shadow-sm" 
                />
              )}
              <h2 className={`text-base font-black tracking-tight mb-1 ${activeTheme.textPrimary}`}>
                대기오염물질 총량관리 업무 매뉴얼
              </h2>
              <div className="h-0.5 w-6 bg-brand-blue my-3 rounded-full"></div>
              <p className="text-[10px] font-bold text-brand-blue tracking-widest uppercase">
                상대정확도 기동 시험 가이드
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📱 FULL-MOBILE VIEWPORT CONTAINER 📱 */}
      <div className={`w-full max-w-md min-h-screen flex flex-col relative transition-colors duration-400 ${activeTheme.containerBg}`}>
        
        {/* 🎖️ 수정 제안 디자인 시안 변경 컨트롤 패널 🎖️ */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-col gap-2.5 relative shadow-md z-40 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Palette size={15} className="text-amber-400 shrink-0 animate-pulse" />
              <span className="text-[11px] font-black tracking-tight text-slate-100">수정 제안 디자인 시안 스타일링 선택</span>
            </div>
            <span className="bg-emerald-500 text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded-sm tracking-wide">LIVE ACTIVE</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => setPrototypeStyle('minimalist')}
              className={`py-2 px-1.5 rounded-lg text-[10px] font-black transition-all ${
                prototypeStyle === 'minimalist'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15'
              }`}
            >
              시안 1: 미니멀리즘
            </button>
            <button
              onClick={() => setPrototypeStyle('vivid')}
              className={`py-2 px-1.5 rounded-lg text-[10px] font-black transition-all ${
                prototypeStyle === 'vivid'
                  ? 'bg-gradient-to-r from-violet-500 via-indigo-500 to-pink-500 text-white shadow-md'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15'
              }`}
            >
              시안 2: 비비드 칼라
            </button>
            <button
              onClick={() => setPrototypeStyle('personalized')}
              className={`py-2 px-1.5 rounded-lg text-[10px] font-black transition-all ${
                prototypeStyle === 'personalized'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15'
              }`}
            >
              시안 3: 개인화 커스텀
            </button>
          </div>

          {/* 시안 설명 라벨 */}
          <div className="text-[9px] text-slate-400 bg-black/30 p-2 rounded-md leading-relaxed font-medium">
            {prototypeStyle === 'minimalist' && "• 시안 1 [미니멀리즘]: 스위스 모던 스타일의 미니트 스케일링, 절제된 여백, 얇은 1px 레이아웃과 높은 가독성의 고대비 폰트 페어링."}
            {prototypeStyle === 'vivid' && "• 시안 2 [비비드 칼라]: 테크니컬한 그라데이션, 화려한 유리 광택 요소, 깊이감 있는 에어로 드롭 쉐도우와 역동적인 스태거 엘리먼트."}
            {prototypeStyle === 'personalized' && "• 시안 3 [개인화 커스텀]: 주야간 작업 보정 및 개인 선호 강조색을 지정할 수 있는 차세대 인터랙티브 플러그인 스타일."}
          </div>
        </div>

        {/* 🎨 시안 3 전용 실시간 커스터마이저 서랍 🎨 */}
        <AnimatePresence>
          {prototypeStyle === 'personalized' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-50 border-b border-slate-200/60 p-4 px-5 flex flex-col gap-3.5 z-30"
            >
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-800 flex items-center gap-1">
                  <Sliders size={13} className="text-blue-500" /> 개인화 커스텀 제어기
                </span>
                <span className="text-[9px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded font-black">스타일 즉시 대입</span>
              </div>
              
              {/* 테마 배경 모드 선택 */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-black text-slate-500 shrink-0">배경 스타일</span>
                <div className="flex gap-1.5 flex-1 justify-end">
                  {[
                    { id: 'light', label: '크림 라이트', icon: <Sun size={10} className="text-amber-500" /> },
                    { id: 'dark', label: '코스믹 다크', icon: <Moon size={10} className="text-indigo-400" /> },
                    { id: 'sepia', label: '종이 세피아', icon: <Bookmark size={10} className="text-amber-700" /> }
                  ].map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setPersBg(mode.id)}
                      className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-[9px] font-bold border transition-all ${
                        persBg === mode.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-250 hover:bg-slate-50'
                      }`}
                    >
                      {mode.icon}
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 강조 색상 선택 서식 */}
              <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-slate-200/50">
                <span className="text-[10px] font-black text-slate-500 shrink-0">사용자 퍼스널 컬러</span>
                <div className="flex gap-2.5">
                  {[
                    { id: 'blue', colorBg: 'bg-brand-blue', label: '블루' },
                    { id: 'emerald', colorBg: 'bg-emerald-500', label: '그린' },
                    { id: 'rose', colorBg: 'bg-rose-500', label: '로즈' },
                    { id: 'amber', colorBg: 'bg-amber-500', label: '골드' },
                    { id: 'purple', colorBg: 'bg-purple-500', label: '퍼플' }
                  ].map(col => (
                    <button
                      key={col.id}
                      onClick={() => setPersColor(col.id)}
                      className={`w-5.5 h-5.5 rounded-full flex items-center justify-center border transition-all ${
                        persColor === col.id
                          ? 'scale-120 ring-2 ring-slate-400 ring-offset-1 border-transparent'
                          : 'opacity-70 hover:opacity-100 border-slate-250'
                      }`}
                      title={col.label}
                    >
                      <span className={`w-3 h-3 rounded-full ${col.colorBg}`}></span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🏷️ STYLISH APP HEADER 🏷️ */}
        <header className={`sticky top-0 transition-colors duration-400 border-b border-opacity-40 p-5 px-6 z-30 ${activeTheme.headerBg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {logoError ? (
                <div className={`font-black text-[10px] px-2 py-1 rounded ${prototypeStyle === 'minimalist' ? 'border border-black' : 'bg-brand-blue text-white'}`}>
                  KECO
                </div>
              ) : (
                <img 
                  src="logo.gif" 
                  alt="로고" 
                  onError={() => setLogoError(true)}
                  className="h-6 w-auto object-contain" 
                />
              )}
              <h1 className={`text-xs font-black tracking-tight ${activeTheme.textPrimary}`}>
                대기오염물질 총량관리 매뉴얼
              </h1>
            </div>
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black tracking-tight ${
              prototypeStyle === 'minimalist' 
                ? 'border border-neutral-900 text-neutral-900 rounded-none' 
                : prototypeStyle === 'vivid'
                ? 'bg-pink-100 text-pink-600'
                : 'bg-slate-100 text-slate-700'
            }`}>
              <Award size={11} className="shrink-0" /> 수도권서부환경본부
            </div>
          </div>

          <div className="flex justify-between items-end mt-4">
            <div>
              <span className={`text-2xl font-black block transition-all duration-300 ${activeTheme.headerTitle}`}>
                {getActiveTabLabel()}
              </span>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                대기오염 배출공정의 효율적 계측 점검 수칙
              </p>
            </div>
          </div>
        </header>

        {/* 🧭 CATEGORY NAVIGATION (4 Columns Horizontal Scroll) 🧭 */}
        <nav className="category-nav p-4 px-5 flex gap-2.5 overflow-x-auto no-scrollbar border-b border-opacity-20 border-slate-200">
          {[
            { id: 'dust', label: '먼지', icon: <Cloud className="shrink-0" size={17} /> },
            { id: 'hcl', label: 'HCl', icon: <Droplet className="shrink-0" size={17} /> },
            { id: 'gas', label: '가스', icon: <Flame className="shrink-0" size={17} /> },
            { id: 'flow', label: '유량', icon: <Wind className="shrink-0" size={17} /> }
          ].map((cat) => {
            const isActive = activeCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id as any)}
                className={`flex-1 py-2.5 px-3 rounded-2xl flex flex-col items-center justify-center gap-1 font-bold text-xs transition-all duration-300 border ${
                  isActive 
                    ? activeTheme.categoryClassActive
                    : activeTheme.categoryClassInactive
                }`}
              >
                <div className={`p-1.5 rounded-xl ${isActive ? 'bg-white/10' : 'bg-white bg-opacity-20'}`}>
                  {cat.icon}
                </div>
                <span className="tracking-tight">{cat.label}</span>
              </button>
            );
          })}
        </nav>

        {/* 📋 SUB SECTION NAVIGATION WITH SLIDING UNDERLINE 📋 */}
        <div className="px-5 border-b border-opacity-10 border-slate-200">
          <div className="flex relative">
            {currentManual.tabs.map((tab) => {
              const isActive = activeSec === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSec(tab.id)}
                  className={`flex-1 text-center py-3.5 text-xs font-black relative transition-colors duration-200 ${
                    isActive ? activeTheme.checkActive : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div 
                      layoutId="subTabIndicator"
                      className={`absolute bottom-0 left-10 right-10 h-[3px] ${
                        prototypeStyle === 'minimalist' 
                          ? 'bg-neutral-900 rounded-none h-[2px]' 
                          : prototypeStyle === 'vivid'
                          ? 'bg-gradient-to-r from-violet-600 to-pink-500 rounded-t-full'
                          : 'bg-current rounded-t-full'
                      }`}
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 📂 MAIN PLAYGROUND MANIFEST CONTENT CARD 📂 */}
        <main className="flex-1 p-5 px-6 pb-24 overflow-y-auto bg-opacity-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCat}_${activeSec}_${prototypeStyle}_${persBg}_${persColor}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="space-y-4"
            >
              {/* 1. 준비물 자가검수 checklist */}
              {activeSec === 'equipment' && (
                <div className={activeTheme.cardClass}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-1 h-4 rounded-full ${prototypeStyle === 'minimalist' ? 'bg-black rounded-none h-3.5' : 'bg-current'}`}></div>
                      <h3 className={`font-black text-sm ${activeTheme.textPrimary}`}>현장 장비 준비물</h3>
                    </div>
                    <span className={activeTheme.badge}>
                      <ListTodo size={11} className="inline mr-0.5" /> Checked {getProgressPercentage()}%
                    </span>
                  </div>

                  {/* 준비 진척도 가로 막대바 */}
                  <div className={activeTheme.progressBg}>
                    <motion.div 
                      className={activeTheme.progressBar}
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressPercentage()}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="space-y-2.5">
                    {currentManual.equipment.map((item, idx) => {
                      const isChecked = !!checkedItems[`${activeCat}_${idx}`];
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleCheckItem(activeCat, idx)}
                          className={`flex items-start gap-3 p-3.5 border transition-all cursor-pointer ${
                            prototypeStyle === 'minimalist' ? 'rounded-none border-neutral-900' : 'rounded-2xl'
                          } ${
                            isChecked 
                              ? 'bg-slate-50/50 text-slate-400 border-opacity-30' 
                              : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/30'
                          }`}
                        >
                          <button className={`shrink-0 mt-0.5 ${activeTheme.checkActive}`}>
                            {isChecked ? (
                              <CheckSquare size={17} fill="currentColor" className={activeTheme.checkActive} />
                            ) : (
                              <Square size={17} className={activeTheme.checkInactive} />
                            )}
                          </button>
                          <div className={`text-xs font-semibold leading-relaxed ${activeTheme.textPrimary}`}>
                            <span className={isChecked ? 'line-through text-slate-400 font-normal' : activeTheme.textPrimary}>
                              {item}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {getProgressPercentage() === 100 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-4 border text-center ${
                        prototypeStyle === 'minimalist' 
                          ? 'border-neutral-900 rounded-none bg-neutral-50' 
                          : 'bg-emerald-50/60 border-emerald-100 rounded-2xl'
                      }`}
                    >
                      <div className="h-8 w-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                        <CheckCircle2 size={18} />
                      </div>
                      <div className="text-xs font-black text-emerald-800">모든 장비 패킹 완료!</div>
                      <p className="text-[10px] text-emerald-600 mt-0.5">상대정확도 시험을 개시할 수 있습니다.</p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* 2. 업무절차 수립 타임라인 */}
              {activeSec === 'procedure' && (
                <div className={activeTheme.cardClass}>
                  <div className="flex items-center gap-2">
                    <div className={`w-1 h-4 rounded-full ${prototypeStyle === 'minimalist' ? 'bg-black rounded-none h-3.5' : 'bg-current'}`}></div>
                    <h3 className={`font-black text-sm ${activeTheme.textPrimary}`}>상대정확도 기동 업무절차</h3>
                  </div>

                  {/* 타임라인 축 구조 */}
                  <div className={`relative border-l pl-4 space-y-6 ml-1.5 pb-2 ${activeTheme.timelineLine}`}>
                    {currentManual.procedure.map((item, idx) => {
                      const hasYoutube = item.includes('[유튜브:');
                      const hasImage = item.includes('[사진:');
                      
                      let displayTxt = item;
                      if (hasYoutube) {
                        displayTxt = displayTxt.replace(/\[유튜브:[^\]]+\]/g, '');
                      }
                      if (hasImage) {
                        displayTxt = displayTxt.replace(/\[사진:[^\]]+\]/g, '');
                      }

                      return (
                        <div key={idx} className="relative group">
                          {/* 타임라인 번호 원그림 */}
                          <div className={`absolute -left-[23.5px] top-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black shadow-3xs ${
                            activeTheme.timelineDot
                          } ${prototypeStyle === 'minimalist' ? 'rounded-none' : ''}`}>
                            {idx + 1}
                          </div>

                          <div className="space-y-2">
                            <p className={`text-xs leading-relaxed font-semibold ${activeTheme.textPrimary}`}>
                              {displayTxt}
                            </p>

                            {/* 유튜브 동영상 카드 */}
                            {hasYoutube && (
                              <div className={`p-3.5 flex items-center justify-between gap-2 mt-1.5 shadow-3xs border ${
                                activeTheme.timelineLine
                              } ${
                                prototypeStyle === 'minimalist' ? 'rounded-none border-neutral-900 bg-neutral-50' : 'rounded-2xl bg-red-50/50 border-red-100/50'
                              }`}>
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 bg-red-550 text-white rounded-full flex items-center justify-center shrink-0">
                                    <Play size={14} fill="currentColor" />
                                  </div>
                                  <div>
                                    <h5 className="text-[10px] font-bold text-slate-800">현장 시공 오디오 비디오 가이드</h5>
                                    <p className="text-[9px] text-slate-400">조작 검증 마스터 편</p>
                                  </div>
                                </div>
                                {(() => {
                                  const ytMatch = item.match(/\[유튜브:([^|]+)\|([^\]]+)\]/);
                                  return ytMatch ? (
                                    <a
                                      href={ytMatch[1]}
                                      target="_blank"
                                      rel="noreferrer"
                                      className={`inline-flex items-center gap-0.5 bg-red-500 text-white px-2.5 py-1 rounded-md font-bold text-[9px] hover:bg-red-650`}
                                    >
                                      열기 <ExternalLink size={9} />
                                    </a>
                                  ) : null;
                                })()}
                              </div>
                            )}

                            {/* 인라인 사진 프레임 */}
                            {hasImage && (
                              <div className="mt-2.5">
                                {(() => {
                                  const imgMatch = item.match(/\[사진:([^|]+)\|([^\]]+)\]/);
                                  return imgMatch ? (
                                    <AppImage 
                                      src={imgMatch[1]} 
                                      alt={imgMatch[2]} 
                                    />
                                  ) : null;
                                })()}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. 기기입력 설정값 매뉴얼 */}
              {activeSec === 'input' && (
                <div className={activeTheme.cardClass}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-1 h-4 rounded-full ${prototypeStyle === 'minimalist' ? 'bg-black rounded-none h-3.5' : 'bg-current'}`}></div>
                    <h3 className={`font-black text-sm ${activeTheme.textPrimary}`}>측정장비 설정 입력 매뉴얼</h3>
                  </div>
                  {renderRichText(currentManual.input.text)}
                </div>
              )}

              {/* 4. 유속 대표점 탭 산정 가이드 */}
              {activeSec === 'rep_point' && currentManual.rep_point && (
                <div className="space-y-4">
                  <div className={activeTheme.cardClass}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-1 h-4 rounded-full ${prototypeStyle === 'minimalist' ? 'bg-black rounded-none h-3.5' : 'bg-current'}`}></div>
                      <h3 className={`font-black text-sm ${activeTheme.textPrimary}`}>대표점 산정 지침</h3>
                    </div>
                    {renderRichText(currentManual.rep_point.text)}
                  </div>

                  <div className={activeTheme.cardClass}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-1 h-4 rounded-full ${prototypeStyle === 'minimalist' ? 'bg-black rounded-none h-3.5' : 'bg-current'}`}></div>
                      <h3 className={`font-black text-sm ${activeTheme.textPrimary}`}>대표점 수집 상세 단계</h3>
                    </div>

                    <div className={`relative border-l pl-4 space-y-6 ml-1.5 pb-2 ${activeTheme.timelineLine}`}>
                      {currentManual.rep_point.procedure.map((item, idx) => {
                        const hasImage = item.includes('[사진:');
                        let label = item;
                        if (hasImage) {
                          label = label.replace(/\[사진:[^\]]+\]/g, '');
                        }

                        return (
                          <div key={idx} className="relative">
                            <div className={`absolute -left-[23.5px] top-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black pointer-events-none ${
                              activeTheme.timelineDot
                            } ${prototypeStyle === 'minimalist' ? 'rounded-none' : ''}`}>
                              {idx + 1}
                            </div>
                            <div className="space-y-2">
                              <p className={`text-xs leading-relaxed font-semibold ${activeTheme.textPrimary}`}>
                                {label}
                              </p>
                              {hasImage && (
                                <div className="mt-2.5">
                                  {(() => {
                                    const imgMatch = item.match(/\[사진:([^|]+)\|([^\]]+)\]/);
                                    return imgMatch ? (
                                      <AppImage 
                                        src={imgMatch[1]} 
                                        alt={imgMatch[2]} 
                                      />
                                    ) : null;
                                  })()}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* 🧮 FLOATING CALCULATOR WIDGET 🧮 */}
        <Calculator />

        {/* 📑 BOTTOM ARCHITECTURAL FOOTER 📑 */}
        <footer className={`mt-auto p-5 text-center space-y-2 pb-10 z-10 transition-colors duration-400 ${
          isThemeSepia() ? 'bg-[#ede3cb]/30 border-t border-[#ede3cb]' : 'bg-slate-100 border-t border-slate-200/50'
        }`}>
          <div className="flex justify-center items-center gap-2">
            {logoError ? (
              <span className={`font-black text-[12px] tracking-wide ${activeTheme.textPrimary}`}>KECO</span>
            ) : (
              <img 
                src="logo.gif" 
                alt="로고" 
                onError={() => setLogoError(true)}
                className="h-4 w-auto object-contain shrink-0" 
              />
            )}
            <span className={`text-[10px] font-extrabold tracking-widest ${activeTheme.textSecondary}`}>
              수도권서부환경본부
            </span>
          </div>
          <p className="text-[9px] text-slate-400 tracking-tight font-medium">
            Copyright ⓒ Korea Environment Corporation. All Rights Reserved.
          </p>
          <div className="flex justify-center gap-2 pt-1.5">
            <span className={`text-[8px] px-2 py-0.5 rounded-md font-bold ${
              prototypeStyle === 'minimalist' ? 'border border-neutral-900 text-neutral-900 rounded-none' : 'text-emerald-700 bg-emerald-50'
            }`}>
              ● 현장 실무 전용
            </span>
            <span className={`text-[8px] px-2 py-0.5 rounded-md font-bold ${
              prototypeStyle === 'minimalist' ? 'border border-neutral-900 text-neutral-900 rounded-none' : 'text-indigo-600 bg-indigo-50'
            }`}>
              버전 3.0 (수정 시안 제안 모델)
            </span>
          </div>
        </footer>
      </div>
    </div>
  );

  function isThemeSepia() {
    return prototypeStyle === 'personalized' && persBg === 'sepia';
  }
}
