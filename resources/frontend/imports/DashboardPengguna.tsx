import svgPaths from "./svg-1nz0ufbso8";
import imgImg from "figma:asset/ce8fa6af0e9c18f3c2f1fd4a3fe3f22002064d5d.png";

function Div() {
  return <div className="h-[64px] shrink-0 w-full" data-name="div" />;
}

function Div1() {
  return <div className="h-0 shrink-0 w-full" data-name="div" />;
}

function H() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="h1">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[40px] left-0 not-italic text-[36px] text-white top-[-2.44px] whitespace-nowrap">Halo, Siti Nurhaliza! 👋</p>
    </div>
  );
}

function P() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.8)] top-[-2.11px] whitespace-nowrap">Kelola catatan belajarmu dan lihat progres harian</p>
    </div>
  );
}

function Div3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72px] items-start left-0 top-0 w-[397.389px]" data-name="div">
      <H />
      <P />
    </div>
  );
}

function Plus() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Plus">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Plus">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 4.16667V15.8333" id="Vector_2" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Span() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#5d5ce6] text-[16px] top-[-2.11px] whitespace-nowrap">Buat Catatan</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[8px] h-[48px] items-center left-[1094.57px] px-[24px] rounded-[14px] top-[12px] w-[169.431px]" data-name="Link">
      <Plus />
      <Span />
    </div>
  );
}

function MotionDiv() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="motion.div">
      <Div3 />
      <Link />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#5d5ce6] h-[168px] items-start left-0 pt-[48px] px-[24px] to-[#8b5cf6] top-0 w-[1312px]" data-name="Container">
      <MotionDiv />
    </div>
  );
}

function StatIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="stat.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="stat.icon">
          <path d={svgPaths.pb47f400} id="Vector" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p17a13100} id="Vector_2" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M10 9H8" id="Vector_3" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 13H8" id="Vector_4" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 17H8" id="Vector_5" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#eff6ff] relative rounded-[14px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <StatIcon />
      </div>
    </div>
  );
}

function Div4() {
  return (
    <div className="absolute content-stretch flex h-[48px] items-center justify-between left-[24.89px] pr-[192.222px] top-[24.89px] w-[240.222px]" data-name="div">
      <Container3 />
    </div>
  );
}

function H1() {
  return (
    <div className="absolute h-[36px] left-[24.89px] top-[84.89px] w-[240.222px]" data-name="h3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[#101828] text-[30px] top-[-1.78px] whitespace-nowrap">45</p>
    </div>
  );
}

function P1() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[24.89px] top-[124.89px] w-[240.222px]" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[14px]">Total Catatan</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-white col-1 h-[169.778px] justify-self-stretch relative rounded-[16px] row-1 shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <Div4 />
      <H1 />
      <P1 />
    </div>
  );
}

function StatIcon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="stat.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="stat.icon">
          <path d={svgPaths.p3c563480} id="Vector" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3cccb600} id="Vector_2" stroke="var(--stroke-0, #00C950)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#f0fdf4] relative rounded-[14px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <StatIcon1 />
      </div>
    </div>
  );
}

function Div5() {
  return (
    <div className="absolute content-stretch flex h-[48px] items-center justify-between left-[24.89px] pr-[192.222px] top-[24.89px] w-[240.222px]" data-name="div">
      <Container5 />
    </div>
  );
}

function H2() {
  return (
    <div className="absolute h-[36px] left-[24.89px] top-[84.89px] w-[240.222px]" data-name="h3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[#101828] text-[30px] top-[-1.78px] whitespace-nowrap">40</p>
    </div>
  );
}

function P2() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[24.89px] top-[124.89px] w-[240.222px]" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[14px]">Catatan Publik</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white col-2 h-[169.778px] justify-self-stretch relative rounded-[16px] row-1 shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <Div5 />
      <H2 />
      <P2 />
    </div>
  );
}

function StatIcon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="stat.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="stat.icon">
          <path d={svgPaths.p3c61fe80} id="Vector" stroke="var(--stroke-0, #AD46FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[#faf5ff] relative rounded-[14px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <StatIcon2 />
      </div>
    </div>
  );
}

function Div6() {
  return (
    <div className="absolute content-stretch flex h-[48px] items-center justify-between left-[24.89px] pr-[192.222px] top-[24.89px] w-[240.222px]" data-name="div">
      <Container7 />
    </div>
  );
}

function H3() {
  return (
    <div className="absolute h-[36px] left-[24.89px] top-[84.89px] w-[240.222px]" data-name="h3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[#101828] text-[30px] top-[-1.78px] whitespace-nowrap">120</p>
    </div>
  );
}

function P3() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[24.89px] top-[124.89px] w-[240.222px]" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[14px]">Total Komentar</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-white col-3 h-[169.778px] justify-self-stretch relative rounded-[16px] row-1 shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <Div6 />
      <H3 />
      <P3 />
    </div>
  );
}

function StatIcon3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="stat.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="stat.icon">
          <path d={svgPaths.p6428280} id="Vector" stroke="var(--stroke-0, #FF6900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[#fff7ed] relative rounded-[14px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <StatIcon3 />
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div className="h-[31.986px] relative shrink-0 w-[32.958px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[32px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[24px]">🔥</p>
      </div>
    </div>
  );
}

function Div7() {
  return (
    <div className="absolute content-stretch flex h-[48px] items-center justify-between left-[24.89px] top-[24.89px] w-[240.222px]" data-name="div">
      <Container9 />
      <Span1 />
    </div>
  );
}

function H4() {
  return (
    <div className="absolute h-[36px] left-[24.89px] top-[84.89px] w-[240.222px]" data-name="h3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[#101828] text-[30px] top-[-1.78px] whitespace-nowrap">7</p>
    </div>
  );
}

function P4() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[24.89px] top-[124.89px] w-[240.222px]" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[14px]">Streak Hari</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-white col-4 h-[169.778px] justify-self-stretch relative rounded-[16px] row-1 shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <Div7 />
      <H4 />
      <P4 />
    </div>
  );
}

function MotionDiv1() {
  return (
    <div className="absolute gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[169.778px] left-[24px] top-0 w-[1232px]" data-name="motion.div">
      <Container2 />
      <Container4 />
      <Container6 />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="relative rounded-[16px] shrink-0 size-[64px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 137, 4) 0%, rgb(251, 44, 54) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#0a0a0a] text-[30px] whitespace-nowrap">🔥</p>
      </div>
    </div>
  );
}

function H5() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="h3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1.22px] whitespace-nowrap">Kamu luar biasa! Pertahankan streak-mu!</p>
    </div>
  );
}

function P5() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-h-px min-w-px not-italic relative text-[#4a5565] text-[0px] text-[14px]">
        <span className="leading-[20px]">{`Kamu sudah konsisten `}</span>
        <span className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#f54900]">7 hari</span>
        <span className="leading-[20px]">{` berturut-turut. Rekor terbaikmu: `}</span>
        <span className="font-['Inter:Bold',sans-serif] font-bold leading-[20px]">15 hari</span>
        <span className="leading-[20px]">{` 🎉`}</span>
      </p>
    </div>
  );
}

function Container11() {
  return (
    <div className="flex-[1_0_0] h-[52px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <H5 />
        <P5 />
      </div>
    </div>
  );
}

function TrendingUp() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="TrendingUp">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="TrendingUp">
          <path d={svgPaths.p26c56780} id="Vector" stroke="var(--stroke-0, #FF6900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p18cb7e80} id="Vector_2" stroke="var(--stroke-0, #FF6900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Div8() {
  return (
    <div className="content-stretch flex gap-[16px] h-[64px] items-center relative shrink-0 w-full" data-name="div">
      <Container10 />
      <Container11 />
      <TrendingUp />
    </div>
  );
}

function MotionDiv2() {
  return (
    <div className="absolute bg-gradient-to-r content-stretch flex flex-col from-[#fff7ed] h-[115.556px] items-start left-[24px] pb-[1.778px] pt-[25.778px] px-[25.778px] rounded-[16px] to-[#fef2f2] top-[201.78px] w-[1232px]" data-name="motion.div">
      <div aria-hidden="true" className="absolute border-[#ffd6a8] border-[1.778px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Div8 />
    </div>
  );
}

function Span2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[49.083px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[25.5px] not-italic text-[16px] text-center text-white top-[-2.11px] whitespace-nowrap">Semua</p>
      </div>
    </div>
  );
}

function Span3() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] h-[19.986px] relative rounded-[29826200px] shrink-0 w-[22.903px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[2px] relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">6</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#5d5ce6] h-[48px] relative rounded-[14px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0 w-[127.986px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[24px] relative size-full">
        <Span2 />
        <Span3 />
      </div>
    </div>
  );
}

function Span4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[45.097px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[23.5px] not-italic text-[#4a5565] text-[16px] text-center top-[-2.11px] whitespace-nowrap">Publik</p>
      </div>
    </div>
  );
}

function Span5() {
  return (
    <div className="bg-[#f3f4f6] h-[19.986px] relative rounded-[29826200px] shrink-0 w-[22.903px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[2px] relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[48px] relative rounded-[14px] shrink-0 w-[124px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[24px] relative size-full">
        <Span4 />
        <Span5 />
      </div>
    </div>
  );
}

function Span6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[41.444px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[21.5px] not-italic text-[#4a5565] text-[16px] text-center top-[-2.11px] whitespace-nowrap">Privat</p>
      </div>
    </div>
  );
}

function Span7() {
  return (
    <div className="bg-[#f3f4f6] h-[19.986px] relative rounded-[29826200px] shrink-0 w-[22.903px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[2px] relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[16px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[12px] text-center">1</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[48px] relative rounded-[14px] shrink-0 w-[120.347px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[24px] relative size-full">
        <Span6 />
        <Span7 />
      </div>
    </div>
  );
}

function Span8() {
  return (
    <div className="h-[24px] relative shrink-0 w-[75.972px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[38.5px] not-italic text-[#4a5565] text-[16px] text-center top-[-2.11px] whitespace-nowrap">Tervalidasi</p>
      </div>
    </div>
  );
}

function Span9() {
  return (
    <div className="bg-[#f3f4f6] h-[19.986px] relative rounded-[29826200px] shrink-0 w-[22.903px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[2px] relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center whitespace-nowrap">4</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[48px] relative rounded-[14px] shrink-0 w-[154.875px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[24px] relative size-full">
        <Span8 />
        <Span9 />
      </div>
    </div>
  );
}

function Div9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[48px] items-start overflow-clip relative shrink-0 w-full" data-name="div">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function MotionDiv3() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[65.778px] items-start left-[24px] pb-[0.889px] pt-[8.889px] px-[8.889px] rounded-[16px] top-[349.33px] w-[1232px]" data-name="motion.div">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <Div9 />
    </div>
  );
}

function FileText() {
  return (
    <div className="relative shrink-0 size-[64px]" data-name="FileText">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="FileText">
          <path d={svgPaths.p3f6fb600} id="Vector" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d={svgPaths.p29192380} id="Vector_2" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M26.6667 24H21.3333" id="Vector_3" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M42.6667 34.6667H21.3333" id="Vector_4" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M42.6667 45.3333H21.3333" id="Vector_5" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex h-[221px] items-center justify-center left-0 top-0 w-[392.889px]" data-name="Container" style={{ backgroundImage: "linear-gradient(150.642deg, rgba(93, 92, 230, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)" }}>
      <FileText />
    </div>
  );
}

function MoreVertical() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="MoreVertical">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="MoreVertical">
          <path d={svgPaths.p36e45a00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p150f5b00} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d6e5280} id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-0 rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] size-[32px] top-0" data-name="button">
      <MoreVertical />
    </div>
  );
}

function Edit() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[10px]" data-name="Edit">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Edit">
          <path d={svgPaths.p38f39800} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p85cdd00} id="Vector_2" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="button">
      <Edit />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[40px] not-italic text-[#364153] text-[14px] top-[7px] whitespace-nowrap">Edit</p>
    </div>
  );
}

function Trash() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[10px]" data-name="Trash2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Trash2">
          <path d="M2 4H14" id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p64eb800} id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56ef700} id="Vector_3" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 7.33333V11.3333" id="Vector_4" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_5" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="button">
      <Trash />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[40px] not-italic text-[#e7000b] text-[14px] top-[7px] whitespace-nowrap">Hapus</p>
    </div>
  );
}

function MotionDiv5() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[89.778px] items-start left-0 pb-[0.889px] pt-[8.889px] px-[0.889px] rounded-[14px] top-[40px] w-[160px]" data-name="motion.div">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)]" />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute left-[12px] size-[32px] top-[12px]" data-name="Container">
      <Button4 />
      <MotionDiv5 />
    </div>
  );
}

function Div10() {
  return (
    <div className="h-[221px] relative shrink-0 w-full" data-name="div">
      <Container13 />
      <Container14 />
    </div>
  );
}

function Span10() {
  return (
    <div className="absolute bg-[rgba(59,130,246,0.08)] content-stretch flex h-[23.986px] items-start left-0 px-[12px] py-[4px] rounded-[10px] top-0 w-[108.722px]" data-name="span">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#3b82f6] text-[12px] whitespace-nowrap">📐 Matematika</p>
    </div>
  );
}

function CheckCircle() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="CheckCircle2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_1_3423)" id="CheckCircle2">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 6L5.5 7L7.5 5" id="Vector_2" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_3423">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span11() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[56.986px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] whitespace-nowrap">Tervalidasi</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bg-[#dcfce7] content-stretch flex gap-[4px] h-[23.986px] items-center left-[116.72px] pl-[8px] rounded-[10px] top-0 w-[88.986px]" data-name="Container">
      <CheckCircle />
      <Span11 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute h-[23.986px] left-[24px] top-[24px] w-[344.889px]" data-name="Container">
      <Span10 />
      <Container16 />
    </div>
  );
}

function H6() {
  return (
    <div className="absolute h-[28px] left-[24px] overflow-clip top-[59.99px] w-[344.889px]" data-name="h3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1.22px] whitespace-nowrap">Rumus Trigonometri Lengkap</p>
    </div>
  );
}

function P6() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[95.99px] w-[344.889px]" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[-1px] w-[341px]">{`<h1>Rumus Trigonometri Dasar</h1> <h2>Sin, Cos, Tan</h2> <ul> <li>sin α = depan / miring</li> <li>cos α = samping / miring</li> <li>tan α = depan / samping</li> </ul> <h2>Identitas Trigonometri</h2> <ul> <li><strong>sin²α + cos²α = 1</strong></li> <li>1 + tan²α = sec²α</li> <li>1 + cot²α = csc²α</li> </ul> <h2>Rumus Sudut Rangkap</h2> <ul> <li>sin 2α = 2 sin α cos α</li> <li>cos 2α = cos²α - sin²α</li> </ul> <p><mark style="background-color: #FFD166;">💡 Tips: Hafalkan identitas dasar terlebih dahulu!</mark></p>`}</p>
    </div>
  );
}

function Globe() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Globe">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_3427)" id="Globe">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p21d23a70} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.16667 7H12.8333" id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_1_3427">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span12() {
  return (
    <div className="flex-[1_0_0] h-[15.986px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Publik</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[50.347px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Globe />
        <Span12 />
      </div>
    </div>
  );
}

function Eye() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Eye">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Eye">
          <path d={svgPaths.p18df500} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p4c1f200} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Span13() {
  return (
    <div className="flex-[1_0_0] h-[15.986px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">1234</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[43.875px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Eye />
        <Span13 />
      </div>
    </div>
  );
}

function MessageSquare() {
  return (
    <div className="flex-[1_0_0] h-[14px] min-h-px min-w-px relative" data-name="MessageSquare">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
              <path d={svgPaths.p35d10900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Span14() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[12.944px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">15</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[30.944px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <MessageSquare />
        <Span14 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[149.167px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container19 />
        <Container20 />
        <Container21 />
      </div>
    </div>
  );
}

function Span15() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[64.583px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">18 Feb 2026</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex h-[32.875px] items-center justify-between left-[24px] pt-[0.889px] top-[151.99px] w-[344.889px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t-[0.889px] inset-0 pointer-events-none" />
      <Container18 />
      <Span15 />
    </div>
  );
}

function Div11() {
  return (
    <div className="h-[208.861px] relative shrink-0 w-full" data-name="div">
      <Container15 />
      <H6 />
      <P6 />
      <Container17 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute bg-white h-[431.639px] left-0 rounded-[16px] top-0 w-[394.667px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[0.889px] relative rounded-[inherit] size-full">
        <Div10 />
        <Div11 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function FileText1() {
  return (
    <div className="relative shrink-0 size-[64px]" data-name="FileText">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="FileText">
          <path d={svgPaths.p3f6fb600} id="Vector" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d={svgPaths.p29192380} id="Vector_2" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M26.6667 24H21.3333" id="Vector_3" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M42.6667 34.6667H21.3333" id="Vector_4" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M42.6667 45.3333H21.3333" id="Vector_5" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex h-[221px] items-center justify-center left-0 top-0 w-[392.889px]" data-name="Container" style={{ backgroundImage: "linear-gradient(150.642deg, rgba(93, 92, 230, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)" }}>
      <FileText1 />
    </div>
  );
}

function MoreVertical1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="MoreVertical">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="MoreVertical">
          <path d={svgPaths.p36e45a00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p150f5b00} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d6e5280} id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[12px] rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] size-[32px] top-[12px]" data-name="button">
      <MoreVertical1 />
    </div>
  );
}

function Div12() {
  return (
    <div className="h-[221px] relative shrink-0 w-full" data-name="div">
      <Container23 />
      <Button7 />
    </div>
  );
}

function Span16() {
  return (
    <div className="absolute bg-[rgba(16,185,129,0.08)] content-stretch flex h-[23.986px] items-start left-0 px-[12px] py-[4px] rounded-[10px] top-0 w-[100.917px]" data-name="span">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#10b981] text-[12px] whitespace-nowrap">🔬 IPA (Sains)</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute h-[23.986px] left-[24px] top-[24px] w-[344.889px]" data-name="Container">
      <Span16 />
    </div>
  );
}

function H7() {
  return (
    <div className="absolute h-[28px] left-[24px] overflow-clip top-[59.99px] w-[344.889px]" data-name="h3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1.22px] whitespace-nowrap">Ringkasan Reaksi Redoks</p>
    </div>
  );
}

function P7() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[95.99px] w-[344.889px]" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[-1px] w-[324px]"># Reaksi Redoks ## Oksidasi - Pelepasan elektron - Kenaikan bilangan oksidasi ## Reduksi - Penerimaan elektron - Penurunan bilangan oksidasi</p>
    </div>
  );
}

function Lock() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Lock">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Lock">
          <path d={svgPaths.p1aca3780} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2b92b800} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Span17() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[29.722px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Privat</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[47.722px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Lock />
        <Span17 />
      </div>
    </div>
  );
}

function Eye1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Eye">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Eye">
          <path d={svgPaths.p18df500} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p4c1f200} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Span18() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[6.472px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">0</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[24.472px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Eye1 />
        <Span18 />
      </div>
    </div>
  );
}

function MessageSquare1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="MessageSquare">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="MessageSquare">
          <path d={svgPaths.pff358a0} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Span19() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[6.472px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">0</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[24.472px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <MessageSquare1 />
        <Span19 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[120.667px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container27 />
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function Span20() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[64.583px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">19 Feb 2026</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex h-[32.875px] items-center justify-between left-[24px] pt-[0.889px] top-[151.99px] w-[344.889px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t-[0.889px] inset-0 pointer-events-none" />
      <Container26 />
      <Span20 />
    </div>
  );
}

function Div13() {
  return (
    <div className="h-[208.861px] relative shrink-0 w-full" data-name="div">
      <Container24 />
      <H7 />
      <P7 />
      <Container25 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute bg-white h-[431.639px] left-[418.67px] rounded-[16px] top-0 w-[394.667px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[0.889px] relative rounded-[inherit] size-full">
        <Div12 />
        <Div13 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function FileText2() {
  return (
    <div className="relative shrink-0 size-[64px]" data-name="FileText">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="FileText">
          <path d={svgPaths.p3f6fb600} id="Vector" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d={svgPaths.p29192380} id="Vector_2" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M26.6667 24H21.3333" id="Vector_3" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M42.6667 34.6667H21.3333" id="Vector_4" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M42.6667 45.3333H21.3333" id="Vector_5" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex h-[221px] items-center justify-center left-0 top-0 w-[392.889px]" data-name="Container" style={{ backgroundImage: "linear-gradient(150.642deg, rgba(93, 92, 230, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)" }}>
      <FileText2 />
    </div>
  );
}

function MoreVertical2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="MoreVertical">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="MoreVertical">
          <path d={svgPaths.p36e45a00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p150f5b00} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d6e5280} id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[12px] rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] size-[32px] top-[12px]" data-name="button">
      <MoreVertical2 />
    </div>
  );
}

function Div14() {
  return (
    <div className="h-[221px] relative shrink-0 w-full" data-name="div">
      <Container31 />
      <Button8 />
    </div>
  );
}

function Span21() {
  return (
    <div className="absolute bg-[rgba(59,130,246,0.08)] content-stretch flex h-[23.986px] items-start left-0 px-[12px] py-[4px] rounded-[10px] top-0 w-[108.722px]" data-name="span">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#3b82f6] text-[12px] whitespace-nowrap">📐 Matematika</p>
    </div>
  );
}

function CheckCircle1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="CheckCircle2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_1_3423)" id="CheckCircle2">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 6L5.5 7L7.5 5" id="Vector_2" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_3423">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span22() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[56.986px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] whitespace-nowrap">Tervalidasi</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-[#dcfce7] content-stretch flex gap-[4px] h-[23.986px] items-center left-[116.72px] pl-[8px] rounded-[10px] top-0 w-[88.986px]" data-name="Container">
      <CheckCircle1 />
      <Span22 />
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute h-[23.986px] left-[24px] top-[24px] w-[344.889px]" data-name="Container">
      <Span21 />
      <Container33 />
    </div>
  );
}

function H8() {
  return (
    <div className="absolute h-[28px] left-[24px] overflow-clip top-[59.99px] w-[344.889px]" data-name="h3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1.22px] whitespace-nowrap">Perkalian dan Pembagian untuk Kelas 4</p>
    </div>
  );
}

function P8() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[95.99px] w-[344.889px]" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[-1px] w-[334px]">{`<h1>Cara Mudah Perkalian</h1> <h2>Perkalian 1-10</h2> <ul> <li>2 × 3 = 6</li> <li>5 × 4 = 20</li> <li>7 × 8 = 56</li> </ul> <p><mark>💡 Tips: Hafalkan tabel perkalian 1-10 dulu ya!</mark></p>`}</p>
    </div>
  );
}

function Globe1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Globe">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_3427)" id="Globe">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p21d23a70} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.16667 7H12.8333" id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_1_3427">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span23() {
  return (
    <div className="flex-[1_0_0] h-[15.986px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Publik</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[50.347px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Globe1 />
        <Span23 />
      </div>
    </div>
  );
}

function Eye2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Eye">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Eye">
          <path d={svgPaths.p18df500} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p4c1f200} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Span24() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[19.417px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">567</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[37.417px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Eye2 />
        <Span24 />
      </div>
    </div>
  );
}

function MessageSquare2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="MessageSquare">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="MessageSquare">
          <path d={svgPaths.pff358a0} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Span25() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[12.944px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">12</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[30.944px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <MessageSquare2 />
        <Span25 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[142.708px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container36 />
        <Container37 />
        <Container38 />
      </div>
    </div>
  );
}

function Span26() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[64.583px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">17 Feb 2026</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex h-[32.875px] items-center justify-between left-[24px] pt-[0.889px] top-[151.99px] w-[344.889px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t-[0.889px] inset-0 pointer-events-none" />
      <Container35 />
      <Span26 />
    </div>
  );
}

function Div15() {
  return (
    <div className="h-[208.861px] relative shrink-0 w-full" data-name="div">
      <Container32 />
      <H8 />
      <P8 />
      <Container34 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bg-white h-[431.639px] left-[837.33px] rounded-[16px] top-0 w-[394.667px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[0.889px] relative rounded-[inherit] size-full">
        <Div14 />
        <Div15 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function FileText3() {
  return (
    <div className="relative shrink-0 size-[64px]" data-name="FileText">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="FileText">
          <path d={svgPaths.p3f6fb600} id="Vector" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d={svgPaths.p29192380} id="Vector_2" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M26.6667 24H21.3333" id="Vector_3" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M42.6667 34.6667H21.3333" id="Vector_4" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M42.6667 45.3333H21.3333" id="Vector_5" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute content-stretch flex h-[221px] items-center justify-center left-0 top-0 w-[392.889px]" data-name="Container" style={{ backgroundImage: "linear-gradient(150.642deg, rgba(93, 92, 230, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)" }}>
      <FileText3 />
    </div>
  );
}

function MoreVertical3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="MoreVertical">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="MoreVertical">
          <path d={svgPaths.p36e45a00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p150f5b00} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d6e5280} id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[12px] rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] size-[32px] top-[12px]" data-name="button">
      <MoreVertical3 />
    </div>
  );
}

function Div16() {
  return (
    <div className="h-[221px] relative shrink-0 w-full" data-name="div">
      <Container40 />
      <Button9 />
    </div>
  );
}

function Span27() {
  return (
    <div className="absolute bg-[rgba(99,102,241,0.08)] content-stretch flex h-[23.986px] items-start left-0 px-[12px] py-[4px] rounded-[10px] top-0 w-[118.681px]" data-name="span">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6366f1] text-[12px] whitespace-nowrap">🇬🇧 Bahasa Inggris</p>
    </div>
  );
}

function CheckCircle2() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="CheckCircle2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_1_3423)" id="CheckCircle2">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 6L5.5 7L7.5 5" id="Vector_2" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_3423">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span28() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[56.986px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] whitespace-nowrap">Tervalidasi</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute bg-[#dcfce7] content-stretch flex gap-[4px] h-[23.986px] items-center left-[126.68px] pl-[8px] rounded-[10px] top-0 w-[88.986px]" data-name="Container">
      <CheckCircle2 />
      <Span28 />
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute h-[23.986px] left-[24px] top-[24px] w-[344.889px]" data-name="Container">
      <Span27 />
      <Container42 />
    </div>
  );
}

function H9() {
  return (
    <div className="absolute h-[28px] left-[24px] overflow-clip top-[59.99px] w-[344.889px]" data-name="h3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1.22px] whitespace-nowrap">Tenses Bahasa Inggris - Simple Present</p>
    </div>
  );
}

function P9() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[95.99px] w-[344.889px]" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[-1px] w-[343px]">{`<h1>Simple Present Tense</h1> <h2>Formula</h2> <ul> <li><strong>Positive:</strong> S + V1 (s/es) + O</li> <li><strong>Negative:</strong> S + do/does not + V1 + O</li> <li><strong>Question:</strong> Do/Does + S + V1 + O?</li> </ul> <h2>Contoh</h2> <ul> <li>I eat rice every day</li> <li>She studies English</li> </ul>`}</p>
    </div>
  );
}

function Globe2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Globe">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_3427)" id="Globe">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p21d23a70} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.16667 7H12.8333" id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_1_3427">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span29() {
  return (
    <div className="flex-[1_0_0] h-[15.986px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Publik</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[50.347px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Globe2 />
        <Span29 />
      </div>
    </div>
  );
}

function Eye3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Eye">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Eye">
          <path d={svgPaths.p18df500} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p4c1f200} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Span30() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[19.417px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">892</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[37.417px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Eye3 />
        <Span30 />
      </div>
    </div>
  );
}

function MessageSquare3() {
  return (
    <div className="flex-[1_0_0] h-[14px] min-h-px min-w-px relative" data-name="MessageSquare">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
              <path d={svgPaths.p35d10900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Span31() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[12.944px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">19</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[30.944px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <MessageSquare3 />
        <Span31 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[142.708px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container45 />
        <Container46 />
        <Container47 />
      </div>
    </div>
  );
}

function Span32() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[64.583px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">18 Feb 2026</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex h-[32.875px] items-center justify-between left-[24px] pt-[0.889px] top-[151.99px] w-[344.889px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t-[0.889px] inset-0 pointer-events-none" />
      <Container44 />
      <Span32 />
    </div>
  );
}

function Div17() {
  return (
    <div className="h-[208.861px] relative shrink-0 w-full" data-name="div">
      <Container41 />
      <H9 />
      <P9 />
      <Container43 />
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute bg-white h-[431.639px] left-0 rounded-[16px] top-[455.64px] w-[394.667px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[0.889px] relative rounded-[inherit] size-full">
        <Div16 />
        <Div17 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function FileText4() {
  return (
    <div className="relative shrink-0 size-[64px]" data-name="FileText">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="FileText">
          <path d={svgPaths.p3f6fb600} id="Vector" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d={svgPaths.p29192380} id="Vector_2" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M26.6667 24H21.3333" id="Vector_3" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M42.6667 34.6667H21.3333" id="Vector_4" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M42.6667 45.3333H21.3333" id="Vector_5" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex h-[221px] items-center justify-center left-0 top-0 w-[392.889px]" data-name="Container" style={{ backgroundImage: "linear-gradient(150.642deg, rgba(93, 92, 230, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)" }}>
      <FileText4 />
    </div>
  );
}

function MoreVertical4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="MoreVertical">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="MoreVertical">
          <path d={svgPaths.p36e45a00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p150f5b00} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d6e5280} id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[12px] rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] size-[32px] top-[12px]" data-name="button">
      <MoreVertical4 />
    </div>
  );
}

function Div18() {
  return (
    <div className="h-[221px] relative shrink-0 w-full" data-name="div">
      <Container49 />
      <Button10 />
    </div>
  );
}

function Span33() {
  return (
    <div className="absolute bg-[rgba(8,145,178,0.08)] content-stretch flex h-[23.986px] items-start left-0 px-[12px] py-[4px] rounded-[10px] top-0 w-[90.917px]" data-name="span">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0891b2] text-[12px] whitespace-nowrap">🗺️ Geografi</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute h-[23.986px] left-[24px] top-[24px] w-[344.889px]" data-name="Container">
      <Span33 />
    </div>
  );
}

function H10() {
  return (
    <div className="absolute h-[28px] left-[24px] overflow-clip top-[59.99px] w-[344.889px]" data-name="h3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1.22px] whitespace-nowrap">Sejarah Perang Dunia II</p>
    </div>
  );
}

function P10() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[95.99px] w-[344.889px]" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[-1px] w-[336px]">{`<h1>Perang Dunia II (1939-1945)</h1> <h2>Penyebab</h2> <ul> <li>Kegagalan Liga Bangsa-Bangsa</li> <li>Kebijakan ekspansi negara Axis</li> <li>Dendam akibat Perjanjian Versailles</li> </ul> <h2>Negara Sekutu vs Axis</h2> <p><strong>Sekutu:</strong> USA, UK, USSR, Prancis</p> <p><strong>Axis:</strong> Jerman, Jepang, Italia</p>`}</p>
    </div>
  );
}

function Globe3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Globe">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_3427)" id="Globe">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p21d23a70} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.16667 7H12.8333" id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_1_3427">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span34() {
  return (
    <div className="flex-[1_0_0] h-[15.986px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Publik</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[50.347px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Globe3 />
        <Span34 />
      </div>
    </div>
  );
}

function Eye4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Eye">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Eye">
          <path d={svgPaths.p18df500} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p4c1f200} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Span35() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[19.417px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">678</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[37.417px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Eye4 />
        <Span35 />
      </div>
    </div>
  );
}

function MessageSquare4() {
  return (
    <div className="flex-[1_0_0] h-[14px] min-h-px min-w-px relative" data-name="MessageSquare">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
              <path d={svgPaths.p35d10900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Span36() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[12.944px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">14</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[30.944px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <MessageSquare4 />
        <Span36 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[142.708px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container53 />
        <Container54 />
        <Container55 />
      </div>
    </div>
  );
}

function Span37() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[64.583px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">19 Feb 2026</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex h-[32.875px] items-center justify-between left-[24px] pt-[0.889px] top-[151.99px] w-[344.889px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t-[0.889px] inset-0 pointer-events-none" />
      <Container52 />
      <Span37 />
    </div>
  );
}

function Div19() {
  return (
    <div className="h-[208.861px] relative shrink-0 w-full" data-name="div">
      <Container50 />
      <H10 />
      <P10 />
      <Container51 />
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute bg-white h-[431.639px] left-[418.67px] rounded-[16px] top-[455.64px] w-[394.667px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[0.889px] relative rounded-[inherit] size-full">
        <Div18 />
        <Div19 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function FileText5() {
  return (
    <div className="relative shrink-0 size-[64px]" data-name="FileText">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="FileText">
          <path d={svgPaths.p3f6fb600} id="Vector" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d={svgPaths.p29192380} id="Vector_2" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M26.6667 24H21.3333" id="Vector_3" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M42.6667 34.6667H21.3333" id="Vector_4" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
          <path d="M42.6667 45.3333H21.3333" id="Vector_5" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="5.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute content-stretch flex h-[221px] items-center justify-center left-0 top-0 w-[392.889px]" data-name="Container" style={{ backgroundImage: "linear-gradient(150.642deg, rgba(93, 92, 230, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)" }}>
      <FileText5 />
    </div>
  );
}

function MoreVertical5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="MoreVertical">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="MoreVertical">
          <path d={svgPaths.p36e45a00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p150f5b00} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d6e5280} id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[12px] rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] size-[32px] top-[12px]" data-name="button">
      <MoreVertical5 />
    </div>
  );
}

function Div20() {
  return (
    <div className="h-[221px] relative shrink-0 w-full" data-name="div">
      <Container57 />
      <Button11 />
    </div>
  );
}

function Span38() {
  return (
    <div className="absolute bg-[rgba(37,99,235,0.08)] content-stretch flex h-[23.986px] items-start left-0 px-[12px] py-[4px] rounded-[10px] top-0 w-[80.194px]" data-name="span">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#2563eb] text-[12px] whitespace-nowrap">∑ Kalkulus</p>
    </div>
  );
}

function CheckCircle3() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="CheckCircle2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_1_3423)" id="CheckCircle2">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 6L5.5 7L7.5 5" id="Vector_2" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_1_3423">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span39() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[56.986px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] whitespace-nowrap">Tervalidasi</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute bg-[#dcfce7] content-stretch flex gap-[4px] h-[23.986px] items-center left-[88.19px] pl-[8px] rounded-[10px] top-0 w-[88.986px]" data-name="Container">
      <CheckCircle3 />
      <Span39 />
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute h-[23.986px] left-[24px] top-[24px] w-[344.889px]" data-name="Container">
      <Span38 />
      <Container59 />
    </div>
  );
}

function H11() {
  return (
    <div className="absolute h-[28px] left-[24px] overflow-clip top-[59.99px] w-[344.889px]" data-name="h3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1.22px] whitespace-nowrap">Turunan dan Integral - Kalkulus Dasar</p>
    </div>
  );
}

function P11() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[95.99px] w-[344.889px]" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[-1px] w-[337px]">{`<h1>Kalkulus I</h1> <h2>Turunan (Derivative)</h2> <p>Rumus dasar: d/dx (xⁿ) = n·xⁿ⁻¹</p> <ul> <li>Turunan fungsi konstan = 0</li> <li>Turunan fungsi linear = konstanta</li> </ul> <h2>Integral</h2> <p>Kebalikan dari turunan</p> <p>∫ xⁿ dx = (xⁿ⁺¹)/(n+1) + C</p>`}</p>
    </div>
  );
}

function Globe4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Globe">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_3427)" id="Globe">
          <path d={svgPaths.pc012c00} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p21d23a70} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.16667 7H12.8333" id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_1_3427">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span40() {
  return (
    <div className="flex-[1_0_0] h-[15.986px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="capitalize font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">Publik</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[50.347px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Globe4 />
        <Span40 />
      </div>
    </div>
  );
}

function Eye5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Eye">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Eye">
          <path d={svgPaths.p18df500} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p4c1f200} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Span41() {
  return (
    <div className="flex-[1_0_0] h-[15.986px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">1567</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[43.875px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Eye5 />
        <Span41 />
      </div>
    </div>
  );
}

function MessageSquare5() {
  return (
    <div className="flex-[1_0_0] h-[14px] min-h-px min-w-px relative" data-name="MessageSquare">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <div className="absolute inset-[-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
              <path d={svgPaths.p35d10900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Span42() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[12.944px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">31</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[30.944px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <MessageSquare5 />
        <Span42 />
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[149.167px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container62 />
        <Container63 />
        <Container64 />
      </div>
    </div>
  );
}

function Span43() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[64.583px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">16 Feb 2026</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute content-stretch flex h-[32.875px] items-center justify-between left-[24px] pt-[0.889px] top-[151.99px] w-[344.889px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t-[0.889px] inset-0 pointer-events-none" />
      <Container61 />
      <Span43 />
    </div>
  );
}

function Div21() {
  return (
    <div className="h-[208.861px] relative shrink-0 w-full" data-name="div">
      <Container58 />
      <H11 />
      <P11 />
      <Container60 />
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute bg-white h-[431.639px] left-[837.33px] rounded-[16px] top-[455.64px] w-[394.667px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[0.889px] relative rounded-[inherit] size-full">
        <Div20 />
        <Div21 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function MotionDiv4() {
  return (
    <div className="absolute h-[887.278px] left-[24px] top-[439.11px] w-[1232px]" data-name="motion.div">
      <Container12 />
      <Container22 />
      <Container30 />
      <Container39 />
      <Container48 />
      <Container56 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[1374.389px] left-[16px] top-[136px] w-[1280px]" data-name="Container">
      <MotionDiv1 />
      <MotionDiv2 />
      <MotionDiv3 />
      <MotionDiv4 />
    </div>
  );
}

function Div2() {
  return (
    <div className="h-[1510.389px] relative shrink-0 w-full" data-name="div" style={{ backgroundImage: "linear-gradient(130.979deg, rgba(93, 92, 230, 0.05) 0%, rgb(255, 255, 255) 50%, rgba(255, 209, 102, 0.05) 100%)" }}>
      <Container />
      <Container1 />
    </div>
  );
}

function Section() {
  return <div className="h-0 shrink-0 w-full" data-name="Section" />;
}

function O() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[799.111px] items-start left-0 top-0 w-[1312px]" data-name="o2">
      <Div />
      <Div1 />
      <Div2 />
      <Section />
    </div>
  );
}

function GrammarlyDesktopIntegration() {
  return <div className="absolute left-0 size-0 top-[799.11px]" data-name="Grammarly-desktop-integration" />;
}

function Span44() {
  return (
    <div className="h-[28px] relative shrink-0 w-[11.542px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1.22px] whitespace-nowrap">B</p>
      </div>
    </div>
  );
}

function Div23() {
  return (
    <div className="bg-gradient-to-b from-[#5d5ce6] relative rounded-[14px] shrink-0 size-[40px] to-[#8b5cf6]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.014px] relative size-full">
        <Span44 />
      </div>
    </div>
  );
}

function Span45() {
  return (
    <div className="h-[28px] relative shrink-0 w-[54.611px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="bg-clip-text font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[20px] text-[transparent] whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(93, 92, 230) 0%, rgb(139, 92, 246) 100%)" }}>
          Ba-Yu
        </p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[40px] relative shrink-0 w-[102.611px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Div23 />
        <Span45 />
      </div>
    </div>
  );
}

function ItemIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="item.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="item.icon">
          <path d={svgPaths.p275d2400} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p21a7e80} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Span46() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.11px] whitespace-nowrap">Beranda</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[40px] relative rounded-[14px] shrink-0 w-[119.778px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] relative size-full">
        <ItemIcon />
        <Span46 />
      </div>
    </div>
  );
}

function ItemIcon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="item.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="item.icon">
          <path d={svgPaths.pcddfd00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.5 17.5L13.9167 13.9167" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Span47() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.11px] whitespace-nowrap">Jelajahi</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="h-[40px] relative rounded-[14px] shrink-0 w-[113.403px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] relative size-full">
        <ItemIcon1 />
        <Span47 />
      </div>
    </div>
  );
}

function ItemIcon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="item.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_3380)" id="item.icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 10H13.3333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 6.66667V13.3333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_3380">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span48() {
  return (
    <div className="h-[24px] relative shrink-0 w-[33.139px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[16px] text-white top-[-2.11px] whitespace-nowrap">Buat</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="bg-gradient-to-b from-[#5d5ce6] h-[40px] relative rounded-[14px] shrink-0 to-[#8b5cf6] w-[93.139px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[16px] relative size-full">
        <ItemIcon2 />
        <Span48 />
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[40px] relative shrink-0 w-[342.319px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Link2 />
        <Link3 />
        <Link4 />
      </div>
    </div>
  );
}

function Img() {
  return (
    <div className="relative rounded-[29826200px] shrink-0 size-[32px]" data-name="img">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[29826200px] size-full" src={imgImg} />
    </div>
  );
}

function Span49() {
  return (
    <div className="h-[24px] relative shrink-0 w-[22.861px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[16px] text-white top-[-2.11px] whitespace-nowrap">Siti</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="bg-[#5d5ce6] flex-[1_0_0] h-[44px] min-h-px min-w-px relative rounded-[14px]" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[12px] relative size-full">
          <Img />
          <Span49 />
        </div>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[44px] relative shrink-0 w-[86.861px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Link5 />
      </div>
    </div>
  );
}

function Div22() {
  return (
    <div className="content-stretch flex h-[64px] items-center justify-between relative shrink-0 w-full" data-name="div">
      <Link1 />
      <Container65 />
      <Container66 />
    </div>
  );
}

function Nav() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col h-[64.889px] items-start left-0 pb-[0.889px] px-[40px] top-0 w-[1312px]" data-name="nav">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b-[0.889px] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Div22 />
    </div>
  );
}

export default function DashboardPengguna() {
  return (
    <div className="bg-white relative size-full" data-name="Dashboard Pengguna">
      <O />
      <GrammarlyDesktopIntegration />
      <Nav />
    </div>
  );
}