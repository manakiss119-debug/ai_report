import React, { useState } from 'react';
import { Calculator as CalcIcon, X, Check, AlertCircle } from 'lucide-react';

export const Calculator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'isokinetic' | 'dilution'>('isokinetic');

  // 등속흡인계수 계산 상태
  const [vMstd, setVMstd] = useState('420'); // 건조 가스 흡입량 (L)
  const [theta, setTheta] = useState('40'); // 흡인 시간 (min)
  const [vs, setVs] = useState('11.5'); // 배가스 유속 (m/s)
  const [dn, setDn] = useState('8.0'); // 노즐 직경 (mm)
  const [xw, setXw] = useState('9.5'); // 수분량 (%)
  const [isokineticResult, setIsokineticResult] = useState<number | null>(null);

  // 희석 가스 ppm -> mg/S㎥ 환산 상태
  const [ppm, setPpm] = useState('50');
  const [mw, setMw] = useState('64.06'); // 분자량 (예: SO2 = 64.06, NO2 = 46.01, HCl = 36.46)
  const [convertedResult, setConvertedResult] = useState<number | null>(null);

  const calculateIsokinetic = () => {
    const v = parseFloat(vMstd);
    const t = parseFloat(theta);
    const vSpeed = parseFloat(vs);
    const dia = parseFloat(dn);
    const water = parseFloat(xw);

    if (isNaN(v) || isNaN(t) || isNaN(vSpeed) || isNaN(dia) || isNaN(water)) {
      alert('모든 입력 필드에 올바른 숫자를 입력해주세요.');
      return;
    }

    // 등속율 계산 간이 공식 모사
    // I (%) = 100 * (V_mstd * 100 * (273.15 + t_m)) / (...) 의 원리를 활용한 교육용 가이드 판별기
    // 현장 표준 간이 근사식: I = (V_mstd / (t * vSpeed * Dn^2 * (1 - Xw/100))) * 상수
    const area = Math.PI * Math.pow(dia / 2 / 1000, 2); // 노즐 면적 m^2
    const totalVTheo = vSpeed * area * t * 60 * 1000 * (1 - water / 100) * 0.93; // 보정 반영 이론 가스흡입량 L
    const finalI = (v / totalVTheo) * 100;
    
    setIsokineticResult(Number(finalI.toFixed(1)));
  };

  const calculateDilution = () => {
    const pValue = parseFloat(ppm);
    const mValue = parseFloat(mw);

    if (isNaN(pValue) || isNaN(mValue)) {
      alert('올바른 값을 입력해주세요.');
      return;
    }

    // ppm -> mg/Sm3 공식: C (mg/Sm3) = (ppm * MW) / 22.4
    const result = (pValue * mValue) / 22.4;
    setConvertedResult(Number(result.toFixed(2)));
  };

  return (
    <>
      {/* 플로팅 계산기 활성화 버튼 */}
      <button
        id="btn-manual-calculator"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 z-40 bg-brand-blue text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-blue-hover active:scale-95 transition-all duration-300"
        title="현장 업무 계산기"
      >
        <CalcIcon size={24} />
      </button>

      {/* 오른쪽 Bottom Drawer 스타일 패널 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* 어두운 배경 */}
          <div 
            id="calculator-overlay"
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* 슬라이드 레이아웃 패널 */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 transition-transform duration-300 animate-slide-in">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="bg-brand-blue-light p-1.5 rounded-lg text-brand-blue">
                  <CalcIcon size={18} />
                </div>
                <span className="font-bold text-slate-900 text-base">상대정확도 시험 현장 계산 도구</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* 탭 헤더 */}
            <div className="flex border-b border-slate-100 bg-slate-50/50">
              <button
                onClick={() => setActiveTab('isokinetic')}
                className={`flex-1 py-3 text-center text-xs font-bold border-b-2 transition-all ${
                  activeTab === 'isokinetic' 
                    ? 'border-brand-blue text-brand-blue bg-white' 
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                등속흡인계수(I%) 산정
              </button>
              <button
                onClick={() => setActiveTab('dilution')}
                className={`flex-1 py-3 text-center text-xs font-bold border-b-2 transition-all ${
                  activeTab === 'dilution' 
                    ? 'border-brand-blue text-brand-blue bg-white' 
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                가스 단위 환산 (mg/Sm³)
              </button>
            </div>

            {/* Content 용량 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {activeTab === 'isokinetic' ? (
                // 등속율 계산 패널
                <div className="space-y-4">
                  <div className="p-3 bg-brand-blue-light rounded-xl text-xs text-brand-blue leading-relaxed flex gap-2">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>먼지 상대정확도 시험 시 <b>등속흡인계수(I)가 90% ~ 110% 범위</b>인 경우에 한하여 당해 시료 포집 데이터가 유효한 것으로 판정합니다.</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">건조 가스 가스 미터 흡입량 (Vmstd, L)</label>
                      <input 
                        type="number" 
                        value={vMstd} 
                        onChange={(e) => setVMstd(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-blue text-xs font-semibold"
                        placeholder="예: 420"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">흡인 시간 (t,분)</label>
                        <input 
                          type="number" 
                          value={theta} 
                          onChange={(e) => setTheta(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-blue text-xs font-semibold"
                          placeholder="예: 40"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">배가스 평균 유속 (Vs, m/s)</label>
                        <input 
                          type="number" 
                          value={vs} 
                          onChange={(e) => setVs(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-blue text-xs font-semibold"
                          placeholder="예: 11.5"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">노즐 직경 (Dn, mm)</label>
                        <input 
                          type="number" 
                          value={dn} 
                          onChange={(e) => setDn(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-blue text-xs font-semibold"
                          placeholder="예: 8.0"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">배가스 수분량 (Xw, %)</label>
                        <input 
                          type="number" 
                          value={xw} 
                          onChange={(e) => setXw(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-blue text-xs font-semibold"
                          placeholder="예: 9.5"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={calculateIsokinetic}
                    className="w-full py-2.5 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-xl font-bold text-xs shadow-md transition-colors"
                  >
                    등속흡인계수 계산하기
                  </button>

                  {isokineticResult !== null && (
                    <div className="p-4 rounded-xl text-center border mt-3 animate-fade-in bg-slate-50/50">
                      <div className="text-[11px] text-slate-500 mb-0.5">등속흡인율(I) 계산 결과</div>
                      <div className={`text-2xl font-black mb-1.5 ${
                        isokineticResult >= 90 && isokineticResult <= 110 
                          ? 'text-emerald-500' 
                          : 'text-rose-500'
                      }`}>
                        {isokineticResult}%
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        {isokineticResult >= 90 && isokineticResult <= 110 ? (
                          <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                            <Check size={12} /> 적격 (오염공정시험기준 통과)
                          </span>
                        ) : (
                          <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                            <AlertCircle size={12} /> 유효범위 초과 (90%~110% 외)
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // 가스 농도 단위 환산 패널
                <div className="space-y-4">
                  <div className="p-3 bg-brand-blue-light rounded-xl text-xs text-brand-blue leading-relaxed flex gap-2">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>가스 분석계에서 읽은 <b>ppm 단위를 mg/Sm³ 단위로 공정 환산</b>할 때 사용합니다. (기준온도 0℃, 1기압 기준)</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">측정 가스 농도 (ppm)</label>
                      <input 
                        type="number" 
                        value={ppm} 
                        onChange={(e) => setPpm(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-blue text-xs font-semibold"
                        placeholder="예: 50"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">설정 가스 종류 및 분자량(MW)</label>
                      <select 
                        value={mw} 
                        onChange={(e) => setMw(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-blue text-xs font-semibold bg-white"
                      >
                        <option value="64.06">아황산가스 SO₂ (64.06)</option>
                        <option value="46.01">질소산화물 NO₂ 환산 (46.01)</option>
                        <option value="36.46">염화수소 HCl (36.46)</option>
                        <option value="44.01">이산화탄소 CO₂ (44.01)</option>
                        <option value="28.01">일산화탄소 CO (28.01)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={calculateDilution}
                    className="w-full py-2.5 bg-brand-blue hover:bg-brand-blue-hover text-white rounded-xl font-bold text-xs shadow-md transition-colors"
                  >
                    단위 환산 계산하기
                  </button>

                  {convertedResult !== null && (
                    <div className="p-4 rounded-xl text-center border mt-3 bg-slate-50/50 animate-fade-in">
                      <div className="text-[11px] text-slate-500 mb-0.5">환산된 분진/가스 질량 농도</div>
                      <div className="text-2xl font-black text-brand-blue mb-1">
                        {convertedResult} <span className="text-sm font-semibold">mg/S㎥</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        공식: C = (ppm × 분자량) / 22.4L
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 text-[10px] text-slate-400 leading-normal">
              본 계산 도구는 공정시험기준에 입각하여 제작된 현장 요약형 간이 도구이므로 최종 성적서 등의 정밀 계산 시에는 공식 엑셀 표준 서식을 사용하십시오.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
