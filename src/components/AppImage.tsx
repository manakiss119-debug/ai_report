import React, { useState } from 'react';
import { 
  Settings, 
  Cpu, 
  Tv, 
  HelpCircle, 
  Sliders, 
  FileSpreadsheet, 
  Database, 
  Wifi, 
  Thermometer, 
  Activity, 
  FolderSync, 
  HardDriveUpload,
  Layers,
  Network
} from 'lucide-react';

interface AppImageProps {
  src: string;
  alt: string;
}

export const AppImage: React.FC<AppImageProps> = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  // 로딩 실패 또는 로컬 테스트 시 멋진 시뮬레이터 LCD 뷰어 렌더링
  const renderFallbackWidget = () => {
    // 1. 먼지 배출 설정 (dust3_1)
    if (src.includes('dust3_1')) {
      return (
        <div className="bg-slate-900 text-cyan-400 font-mono p-5 rounded-2xl border-4 border-slate-700 shadow-xl max-w-sm mx-auto text-left">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
            <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
              <Settings size={14} className="text-cyan-500 animate-spin" /> DSP-707S : STACK CONFIG
            </span>
            <span className="bg-emerald-500 text-slate-900 text-[10px] px-1.5 py-0.5 rounded font-bold">READY</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 bg-slate-800/40 px-2 rounded">
              <span>Xw (수분값)</span>
              <span className="text-emerald-400 font-semibold">9.8 %</span>
            </div>
            <div className="flex justify-between py-1 bg-slate-800/40 px-2 rounded">
              <span>Height (배출구 높이)</span>
              <span className="text-emerald-400 font-semibold">32.4 m</span>
            </div>
            <div className="flex justify-between py-1 bg-slate-800/40 px-2 rounded">
              <span>Ds (굴뚝내경)</span>
              <span className="text-emerald-400 font-semibold">1450 mm</span>
            </div>
            <div className="flex justify-between py-1 bg-slate-800/40 px-2 rounded">
              <span>Cp (피토계수)</span>
              <span className="text-emerald-400 font-semibold">0.845</span>
            </div>
            <div className="flex justify-between py-1 bg-slate-800/40 px-2 rounded">
              <span>r0 (습가스 밀도)</span>
              <span className="text-amber-400 font-semibold">1.30 kg/㎥</span>
            </div>
          </div>
        </div>
      );
    }

    // 2. 추천 노즐 (dust3_2)
    if (src.includes('dust3_2')) {
      return (
        <div className="bg-slate-900 text-cyan-400 font-mono p-5 rounded-2xl border-4 border-slate-700 shadow-xl max-w-sm mx-auto text-left">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
            <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
              <Sliders size={14} className="text-amber-500" /> RECOMMENDED NOZZLE
            </span>
            <span className="bg-cyan-500 text-slate-900 text-[10px] px-1.5 py-0.5 rounded font-bold">AUTO CALC</span>
          </div>
          <div className="text-center p-3 bg-slate-800/50 rounded-xl border border-slate-700 mb-3">
            <div className="text-slate-400 text-[11px] mb-1">추천 노즐 크기 (Est Dn)</div>
            <div className="text-3xl font-extrabold text-amber-400 tracking-wider">8.0 mm</div>
            <div className="text-[10px] text-emerald-400 mt-1">▲ 등속 흡인율 범위 충족</div>
          </div>
          <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-950 p-2 rounded">
            ※ 원활한 등속흡인 작업을 위해 굴뚝 유속에 가장 적합한 직경 8.0mm 노즐을 장착하십시오.
          </div>
        </div>
      );
    }

    // 3. 노즐 및 측정 파라미터 (dust3_3)
    if (src.includes('dust3_3')) {
      return (
        <div className="bg-slate-900 text-cyan-400 font-mono p-5 rounded-2xl border-4 border-slate-700 shadow-xl max-w-sm mx-auto text-left">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
            <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
              <Cpu size={14} className="text-emerald-500" /> PARAMETER SETTING
            </span>
            <span className="bg-[#aa1122] text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Manual</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 bg-slate-800/60 rounded">
              <span className="text-slate-400 block">Dn (노즐직경)</span>
              <span className="text-amber-400 font-bold text-sm">8.0 mm</span>
            </div>
            <div className="p-2 bg-slate-800/60 rounded">
              <span className="text-slate-400 block">Mode</span>
              <span className="text-emerald-400 font-bold text-sm">Auto (or Manual)</span>
            </div>
            <div className="p-2 bg-slate-800/60 rounded col-span-2">
              <span className="text-slate-400 block">Vmst (흡입 목표유랑)</span>
              <span className="text-emerald-400 font-bold text-sm">9999.0 L (최대 지정)</span>
            </div>
            <div className="p-2 bg-slate-800/60 rounded">
              <span className="text-slate-400 block">t (흡인 시간)</span>
              <span className="text-emerald-400 font-bold text-sm">40 min (or 5분 단위)</span>
            </div>
            <div className="p-2 bg-slate-800/60 rounded">
              <span className="text-slate-400 block">Pump Mode</span>
              <span className="text-amber-400 font-bold text-sm">External (or Internal)</span>
            </div>
          </div>
        </div>
      );
    }

    // 4. 가열 온도 (dust3_4)
    if (src.includes('dust3_4')) {
      return (
        <div className="bg-slate-900 text-red-400 font-mono p-5 rounded-2xl border-4 border-slate-700 shadow-xl max-w-sm mx-auto text-left">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
            <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
              <Thermometer size={14} className="text-red-500 animate-pulse" /> HEATING TEMP
            </span>
            <span className="bg-amber-500 text-slate-900 text-[10px] px-1.5 py-0.5 rounded font-bold">WARMING UP</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl mb-2">
            <div>
              <div className="text-[10px] text-slate-400">Heating Probe Temp</div>
              <div className="text-2xl font-extrabold text-red-500">120.4℃</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400">Target Temp</div>
              <div className="text-xs font-bold text-slate-300">120.0℃ (이상)</div>
            </div>
          </div>
          <div className="text-[10px] text-emerald-400 text-center bg-slate-950 p-1.5 rounded animate-pulse">
            ● 가열 상태 적정 - 결로 및 응축수 발생 방지 작동 중
          </div>
        </div>
      );
    }

    // 5. 등속흡인 테스트 결과 (dust3_5)
    if (src.includes('dust3_5')) {
      return (
        <div className="bg-slate-900 text-emerald-400 font-mono p-5 rounded-2xl border-4 border-slate-700 shadow-xl max-w-sm mx-auto text-left">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
            <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
              <Activity size={14} className="text-emerald-500" /> ISOKINETIC STATUS (I %)
            </span>
            <span className="bg-emerald-500 text-slate-900 text-[10px] px-1.5 py-0.5 rounded font-bold">MEASURING PASS</span>
          </div>
          <div className="text-center p-3 bg-[#064e3b]/40 rounded-xl border border-emerald-800 mb-3">
            <div className="text-emerald-300 text-[11px] mb-1">등속흡인계수 (I) 결과값</div>
            <div className="text-3xl font-black text-emerald-300 tracking-wider animate-pulse">101.4 %</div>
            <div className="text-[10px] text-emerald-400 mt-1">기준정상 범위: 90% ~ 110% 이내</div>
          </div>
          <div className="text-[10px] text-center text-slate-400 bg-slate-950 p-2 rounded">
            * 오염공정시험기준 부합 - 금일 측정 데이터 유효
          </div>
        </div>
      );
    }

    // 6. USB 자료 백업 (dust3_6)
    if (src.includes('dust3_6')) {
      return (
        <div className="bg-slate-900 text-sky-400 font-mono p-5 rounded-2xl border-4 border-slate-700 shadow-xl max-w-sm mx-auto text-left">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
            <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
              <HardDriveUpload size={14} className="text-sky-400" /> USB BACKUP SYSTEM
            </span>
            <span className="bg-sky-500 text-slate-900 text-[10px] px-1.5 py-0.5 rounded font-bold">EXPORT SUCCESS</span>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-lg text-center mb-2">
            <div className="text-xs text-slate-300">MEASURED_DUST_LOG_2026.csv</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Size: 42.8 KB (5회 측정 완결 데이터)</div>
          </div>
          <div className="text-[10px] text-slate-400 text-center">
            장비 USB 포트에 업무용 저장장치를 연결하여 기생성된 백업파일 전송이 100% 완료되었습니다.
          </div>
        </div>
      );
    }

    // 7. 가스 전처리 및 도관 연결 (gas2_1)
    if (src.includes('gas2_1')) {
      return (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center max-w-sm mx-auto shadow-sm">
          <div className="bg-brand-blue-light text-brand-blue p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
            <Layers size={24} />
          </div>
          <h4 className="text-slate-900 font-bold text-sm mb-1">가스 전처리 가열관 도관 연결 구상도</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            굴뚝 측정공에서 ⇢ 시료 전처리 장치 ⇢ 가스 분리기 ⇢ PG-350A 본체 순서로 최단 거리로 도관을 배치하여 결로가 생기지 않도록 견고히 조임 체결합니다.
          </p>
        </div>
      );
    }

    // 8. IP 설정 마법사 (gas2_2 ~ gas2_4)
    if (src.includes('gas2_2') || src.includes('gas2_3') || src.includes('gas2_4')) {
      return (
        <div className="bg-neutral-800 text-neutral-200 font-mono p-5 rounded-2xl border-4 border-neutral-700 shadow-xl max-w-sm mx-auto text-left">
          <div className="flex justify-between items-center bg-neutral-900 -mx-5 -mt-5 px-5 py-2 rounded-t-xl border-b border-neutral-700">
            <span className="text-[11px] font-bold flex items-center gap-1">
              <Network size={14} className="text-brand-blue" /> WINDOWS IP CONFIGURATION
            </span>
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="space-y-2 text-xs mt-3 bg-neutral-950 p-3 rounded-lg border border-neutral-700">
            <div className="text-rose-400 text-[10px] mb-1">■ 로컬 영역 연결 속성</div>
            <div className="flex justify-between">
              <span className="text-neutral-400">IP 주소 (PC):</span>
              <span className="text-brand-blue font-bold">192.168.1.101</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">비교기 IP 주소:</span>
              <span className="text-emerald-400 font-bold">192.168.1.100</span>
            </div>
            <div className="flex justify-between border-t border-neutral-800 pt-1">
              <span className="text-neutral-400">서브넷 마스크:</span>
              <span>255.255.255.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">기본 게이트웨이:</span>
              <span>192.168.1.1</span>
            </div>
          </div>
          <div className="text-[9px] text-neutral-400 mt-2 text-center bg-neutral-900 p-1 rounded">
            ※ PC의 IP 끝자리(101)를 측정장비 끝자리(100)보다 1 크게 지정하세요.
          </div>
        </div>
      );
    }

    // 9. 가스 파일 저장 설정 (gas2_5)
    if (src.includes('gas2_5')) {
      return (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center max-w-sm mx-auto shadow-sm">
          <div className="bg-brand-blue-light text-brand-blue p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
            <Sliders size={24} />
          </div>
          <h4 className="text-slate-900 font-bold text-sm mb-1">PG-300 저장 파일 설정 마법사</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed mb-1">
            프로그램 상단의 <b>[파일 설정]</b> 아이콘 클릭 후, 경로(`C:\Keco_Data\`) 및 출장 사업장명을 매칭한 형식으로 파일 이름을 구성하여 확인을 누릅니다.
          </p>
        </div>
      );
    }

    // 10. 가스 데이터 수집 (gas2_6)
    if (src.includes('gas2_6')) {
      return (
        <div className="bg-slate-900 text-teal-400 font-mono p-4 rounded-2xl border-4 border-slate-700 shadow-xl max-w-sm mx-auto text-left">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
            <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
              <FileSpreadsheet size={14} className="text-emerald-500" /> PG-300 DATA LOG
            </span>
            <span className="bg-emerald-500 text-slate-900 text-[9px] px-1 py-0.5 rounded font-bold">5M AVG</span>
          </div>
          <div className="space-y-1 text-[10px]">
            <div className="grid grid-cols-4 text-slate-500 border-b border-slate-800 pb-1 font-bold">
              <span>Time</span><span>SO₂</span><span>NOx</span><span>O₂</span>
            </div>
            <div className="grid grid-cols-4">
              <span className="text-slate-400">14:05</span><span>12.4 ppm</span><span>45.2 ppm</span><span className="text-emerald-400">8.42%</span>
            </div>
            <div className="grid grid-cols-4">
              <span className="text-slate-400">14:10</span><span>12.6 ppm</span><span>44.8 ppm</span><span className="text-emerald-400">8.41%</span>
            </div>
            <div className="grid grid-cols-4">
              <span className="text-slate-400">14:15</span><span>12.3 ppm</span><span>45.0 ppm</span><span className="text-emerald-400">8.40%</span>
            </div>
          </div>
          <div className="text-[9px] text-emerald-400 text-center mt-2 border-t border-slate-800 pt-1.5 animate-pulse">
            ● 5분 평균자료 자동 생성 중 & Excel 변환가능상태
          </div>
        </div>
      );
    }

    // 11. 퍼지 상태 (gas2_7 ~ gas2_8)
    if (src.includes('gas2_7') || src.includes('gas2_8')) {
      return (
        <div className="bg-slate-900 text-sky-400 font-mono p-5 rounded-2xl border-4 border-slate-700 shadow-xl max-w-sm mx-auto text-left">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
            <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
              <Activity size={14} className="text-sky-400" /> SYSTEM PURGE ACTIVE
            </span>
            <span className="bg-sky-500 text-slate-900 text-[10px] px-1.5 py-0.5 rounded font-bold">AIR INTAKE</span>
          </div>
          <div className="flex items-center justify-center p-3 bg-slate-800/50 rounded-xl mb-1">
            <div className="text-center">
              <div className="text-[10px] text-slate-400">Purging remaining gas with Clean Air</div>
              <div className="text-lg font-extrabold text-sky-300 animate-pulse">Draining Condensate...</div>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 text-center">
            배가스 잔류 성분을 깨끗한 공기로 세척하고 필터를 청소 중입니다.
          </div>
        </div>
      );
    }

    // Default Fallback
    return (
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-center max-w-sm mx-auto shadow-sm flex flex-col items-center">
        <div className="bg-brand-blue-light text-brand-blue p-2.5 rounded-full w-10 h-10 flex items-center justify-center mb-3">
          <Tv size={20} />
        </div>
        <h4 className="text-slate-800 font-bold text-xs mb-1">현장 가이드 이미지 / 화면 안내</h4>
        <p className="text-[10px] text-slate-500 leading-normal max-w-xs">
          <b>[{alt}]</b> 가이드 스크린샷 및 구성 일러스트입니다. 현장 기계 화면 수치 지침을 정확히 준수해주십시오.
        </p>
      </div>
    );
  };

  if (hasError) {
    return renderFallbackWidget();
  }

  return (
    <div className="image-container bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-full h-auto rounded-xl object-contain bg-slate-50 max-h-64"
      />
      <div className="image-caption text-xs text-brand-secondary font-medium mt-2">{alt}</div>
    </div>
  );
};
