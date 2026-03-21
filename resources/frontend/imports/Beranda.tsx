import svgPaths from "./svg-3yr305hfhd";
import imgMotionImg from "figma:asset/d26095b2bde26f9a212ea26cfda7d42f5c13f6aa.png";
import imgMotionImg1 from "figma:asset/36f7803cc5261c34f4431ea5acce821a1b1301e5.png";
import imgMotionImg2 from "figma:asset/888fad2733a75bb1f64cdfb44d8e99183706da1b.png";
import imgMotionImg3 from "figma:asset/dc7d8bc384d0ddb62612dacb9555356248544506.png";
import imgMotionImg4 from "figma:asset/d7fb038cf8a6fbc3f690a1e84b5d9f8163191d8c.png";

function Div1() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="div">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-[145.1px] not-italic text-[30px] text-center text-white top-[-1.78px] whitespace-nowrap">100%</p>
    </div>
  );
}

function Div2() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="div">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(255,255,255,0.8)] text-center">Gratis Selamanya</p>
    </div>
  );
}

function MotionDiv() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[4px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="motion.div">
      <Div1 />
      <Div2 />
    </div>
  );
}

function Div3() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="div">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-[145.96px] not-italic text-[30px] text-center text-white top-[-1.78px] whitespace-nowrap">24/7</p>
    </div>
  );
}

function Div4() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="div">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(255,255,255,0.8)] text-center">Akses Tanpa Batas</p>
    </div>
  );
}

function MotionDiv1() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[4px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="motion.div">
      <Div3 />
      <Div4 />
    </div>
  );
}

function Div5() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="div">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-[145.86px] not-italic text-[30px] text-center text-white top-[-1.78px] whitespace-nowrap">Unlimited</p>
    </div>
  );
}

function Div6() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="div">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(255,255,255,0.8)] text-center">Upload Catatan</p>
    </div>
  );
}

function MotionDiv2() {
  return (
    <div className="col-3 content-stretch flex flex-col gap-[4px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="motion.div">
      <Div5 />
      <Div6 />
    </div>
  );
}

function Div7() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="div">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-[144.65px] not-italic text-[30px] text-center text-white top-[-1.78px] whitespace-nowrap">Pakar</p>
    </div>
  );
}

function Div8() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="div">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(255,255,255,0.8)] text-center">Validasi Terpercaya</p>
    </div>
  );
}

function MotionDiv3() {
  return (
    <div className="col-4 content-stretch flex flex-col gap-[4px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="motion.div">
      <Div7 />
      <Div8 />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute bg-[#4f3ff0] gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[124px] left-0 px-[40px] py-[32px] top-[1043.61px] w-[1312px]" data-name="Section">
      <MotionDiv />
      <MotionDiv1 />
      <MotionDiv2 />
      <MotionDiv3 />
    </div>
  );
}

function Star() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[10px]" data-name="Star">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Star">
          <path d={svgPaths.p17f48400} id="Vector" stroke="var(--stroke-0, #4F3FF0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Span() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[40px] top-[8px] w-[95.139px]" data-name="span">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4f3ff0] text-[14px] text-center whitespace-nowrap">Fitur Unggulan</p>
    </div>
  );
}

function MotionDiv4() {
  return (
    <div className="absolute bg-[#eef0ff] h-[36px] left-[540.43px] rounded-[29826200px] top-0 w-[151.139px]" data-name="motion.div">
      <Star />
      <Span />
    </div>
  );
}

function Span1() {
  return (
    <div className="absolute content-stretch flex h-[48px] items-start left-[719.28px] top-[-4.44px] w-[170.958px]" data-name="span">
      <p className="bg-clip-text font-['Inter:Bold',sans-serif] font-bold leading-[40px] not-italic relative shrink-0 text-[36px] text-[transparent] text-center whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(79, 63, 240) 0%, rgb(123, 104, 238) 100%)" }}>
        Belajarmu
      </p>
    </div>
  );
}

function MotionH1() {
  return (
    <div className="absolute h-[40px] left-0 top-[52px] w-[1232px]" data-name="motion.h2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[40px] left-[530.76px] not-italic text-[#0a0a0a] text-[36px] text-center top-[-2.44px] whitespace-nowrap">{`Fitur yang Membantu `}</p>
      <Span1 />
    </div>
  );
}

function MotionP() {
  return (
    <div className="absolute h-[56px] left-[280px] top-[108px] w-[672px]" data-name="motion.p">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-[336px] not-italic text-[#717182] text-[18px] text-center top-[-1.22px] w-[613px]">Semua yang kamu butuhkan untuk membuat catatan belajar lebih efektif dan terorganisir</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[164px] relative shrink-0 w-full" data-name="Container">
      <MotionDiv4 />
      <MotionH1 />
      <MotionP />
    </div>
  );
}

function MotionDiv5() {
  return <div className="bg-[#d1d5dc] h-[8px] rounded-[29826200px] shrink-0 w-full" data-name="motion.div" />;
}

function Button() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[552px] size-[8px] top-0" data-name="button">
      <MotionDiv5 />
    </div>
  );
}

function MotionDiv6() {
  return <div className="bg-[#d1d5dc] h-[8px] rounded-[29826200px] shrink-0 w-full" data-name="motion.div" />;
}

function Button1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[568px] size-[8px] top-0" data-name="button">
      <MotionDiv6 />
    </div>
  );
}

function MotionDiv7() {
  return <div className="bg-[#d1d5dc] h-[8px] rounded-[29826200px] shrink-0 w-full" data-name="motion.div" />;
}

function Button2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[584px] size-[8px] top-0" data-name="button">
      <MotionDiv7 />
    </div>
  );
}

function MotionDiv8() {
  return <div className="bg-[#d1d5dc] h-[8px] rounded-[29826200px] shrink-0 w-full" data-name="motion.div" />;
}

function Button3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[600px] size-[8px] top-0" data-name="button">
      <MotionDiv8 />
    </div>
  );
}

function MotionDiv9() {
  return <div className="bg-[#4f3ff0] h-[8px] rounded-[29826200px] shrink-0 w-full" data-name="motion.div" />;
}

function Button4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[8px] items-start left-[616px] top-0 w-[48px]" data-name="button">
      <MotionDiv9 />
    </div>
  );
}

function MotionDiv10() {
  return <div className="bg-[#d1d5dc] h-[8px] rounded-[29826200px] shrink-0 w-full" data-name="motion.div" />;
}

function Button5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[672px] size-[8px] top-0" data-name="button">
      <MotionDiv10 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[8px] left-0 top-[587.56px] w-[1232px]" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function FeatureIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="feature.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="feature.icon">
          <path d="M10 5.83333V17.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p25713000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Div9() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[75.89px] rounded-[10px] size-[40px] top-[16px]" data-name="div" style={{ backgroundImage: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <FeatureIcon />
    </div>
  );
}

function P() {
  return (
    <div className="absolute content-stretch flex h-[15.986px] items-start left-[16px] top-[64px] w-[159.778px]" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[12px] text-center">Catatan Terstruktur</p>
    </div>
  );
}

function MotionButton() {
  return (
    <div className="absolute bg-white border-[1.778px] border-[rgba(0,0,0,0.1)] border-solid h-[99.542px] left-0 rounded-[14px] top-0 w-[195.333px]" data-name="motion.button">
      <Div9 />
      <P />
    </div>
  );
}

function FeatureIcon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="feature.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_2942)" id="feature.icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3e012060} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_2942">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Div10() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[75.89px] rounded-[10px] size-[40px] top-[16px]" data-name="div" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 201, 80) 0%, rgb(0, 166, 62) 100%)" }}>
      <FeatureIcon1 />
    </div>
  );
}

function P1() {
  return (
    <div className="absolute content-stretch flex h-[15.986px] items-start left-[16px] top-[64px] w-[159.778px]" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[12px] text-center">Validasi Pakar</p>
    </div>
  );
}

function MotionButton1() {
  return (
    <div className="absolute bg-white border-[1.778px] border-[rgba(0,0,0,0.1)] border-solid h-[99.542px] left-[207.33px] rounded-[14px] top-0 w-[195.333px]" data-name="motion.button">
      <Div10 />
      <P1 />
    </div>
  );
}

function FeatureIcon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="feature.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="feature.icon">
          <path d={svgPaths.p245c2480} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1b9ecd80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p30483c80} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p37f93a00} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p26fdf80} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Div11() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[75.89px] rounded-[10px] size-[40px] top-[16px]" data-name="div" style={{ backgroundImage: "linear-gradient(135deg, rgb(173, 70, 255) 0%, rgb(152, 16, 250) 100%)" }}>
      <FeatureIcon2 />
    </div>
  );
}

function P2() {
  return (
    <div className="absolute content-stretch flex h-[15.986px] items-start left-[16px] top-[64px] w-[159.778px]" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[12px] text-center">{`Berbagi & Diskusi`}</p>
    </div>
  );
}

function MotionButton2() {
  return (
    <div className="absolute bg-white border-[1.778px] border-[rgba(0,0,0,0.1)] border-solid h-[99.542px] left-[414.67px] rounded-[14px] top-0 w-[195.333px]" data-name="motion.button">
      <Div11 />
      <P2 />
    </div>
  );
}

function FeatureIcon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="feature.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="feature.icon">
          <path d={svgPaths.p92a8700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Div12() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[75.89px] rounded-[10px] size-[40px] top-[16px]" data-name="div" style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 105, 0) 0%, rgb(251, 44, 54) 100%)" }}>
      <FeatureIcon3 />
    </div>
  );
}

function P3() {
  return (
    <div className="absolute content-stretch flex h-[15.986px] items-start left-[16px] top-[64px] w-[159.778px]" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[12px] text-center">Streak Harian</p>
    </div>
  );
}

function MotionButton3() {
  return (
    <div className="absolute bg-white border-[1.778px] border-[rgba(0,0,0,0.1)] border-solid h-[99.542px] left-[622px] rounded-[14px] top-0 w-[195.333px]" data-name="motion.button">
      <Div12 />
      <P3 />
    </div>
  );
}

function FeatureIcon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="feature.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_2965)" id="feature.icon">
          <path d={svgPaths.p18544000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p312978e0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M3.33333 18.3333H16.6667" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae07a80} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ba6af80} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p31ca8d80} id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_2965">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Div13() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[75.89px] rounded-[10px] size-[40px] top-[16px]" data-name="div" style={{ backgroundImage: "linear-gradient(135deg, rgb(240, 177, 0) 0%, rgb(254, 154, 0) 100%)" }}>
      <FeatureIcon4 />
    </div>
  );
}

function P4() {
  return (
    <div className="absolute content-stretch flex h-[15.986px] items-start left-[16px] top-[64px] w-[159.778px]" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-h-px min-w-px not-italic relative text-[#4f3ff0] text-[12px] text-center">Leaderboard</p>
    </div>
  );
}

function MotionButton4() {
  return (
    <div className="absolute bg-[rgba(79,63,240,0.05)] border-[#4f3ff0] border-[1.778px] border-solid h-[99.542px] left-[829.33px] rounded-[14px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-0 w-[195.333px]" data-name="motion.button">
      <Div13 />
      <P4 />
    </div>
  );
}

function FeatureIcon5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="feature.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="feature.icon">
          <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pae3c380} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Div14() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[75.89px] rounded-[10px] size-[40px] top-[16px]" data-name="div" style={{ backgroundImage: "linear-gradient(135deg, rgb(97, 95, 255) 0%, rgb(21, 93, 252) 100%)" }}>
      <FeatureIcon5 />
    </div>
  );
}

function P5() {
  return (
    <div className="absolute content-stretch flex h-[15.986px] items-start left-[16px] top-[64px] w-[159.778px]" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[12px] text-center">Komunitas Aktif</p>
    </div>
  );
}

function MotionButton5() {
  return (
    <div className="absolute bg-white border-[1.778px] border-[rgba(0,0,0,0.1)] border-solid h-[99.542px] left-[1036.67px] rounded-[14px] top-0 w-[195.333px]" data-name="motion.button">
      <Div14 />
      <P5 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[99.542px] left-0 top-[619.56px] w-[1232px]" data-name="Container">
      <MotionButton />
      <MotionButton1 />
      <MotionButton2 />
      <MotionButton3 />
      <MotionButton4 />
      <MotionButton5 />
    </div>
  );
}

function Div15() {
  return <div className="absolute bg-[rgba(255,255,255,0.3)] blur-[64px] left-[1100.44px] rounded-[29826200px] size-[256px] top-[-128px]" data-name="div" />;
}

function Div16() {
  return <div className="absolute bg-[rgba(255,255,255,0.2)] blur-[64px] left-[-128px] rounded-[29826200px] size-[256px] top-[424px]" data-name="div" />;
}

function CurrentFeatureIcon() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="currentFeature.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="currentFeature.icon">
          <path d={svgPaths.p23968100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p4cb7f80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d="M6.66667 36.6667H33.3333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.pf7c4700} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p1aea11c0} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p2b4f6500} id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function MotionDiv12() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 rounded-[16px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] size-[80px] top-0" data-name="motion.div" style={{ backgroundImage: "linear-gradient(135deg, rgb(240, 177, 0) 0%, rgb(254, 154, 0) 100%)" }}>
      <CurrentFeatureIcon />
    </div>
  );
}

function MotionH2() {
  return (
    <div className="absolute h-[40px] left-0 top-[104px] w-[424px]" data-name="motion.h3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[40px] left-0 not-italic text-[#0a0a0a] text-[36px] top-[-2.44px] whitespace-nowrap">Leaderboard</p>
    </div>
  );
}

function MotionP1() {
  return (
    <div className="absolute h-[87.75px] left-0 top-[160px] w-[424px]" data-name="motion.p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[29.25px] left-0 not-italic text-[#717182] text-[18px] top-[-1.22px] w-[411px]">Lihat ranking pelajar dan pakar paling aktif. Kompetisi sehat membuatmu lebih semangat untuk terus berkontribusi di komunitas.</p>
    </div>
  );
}

function CurrentFeatureIcon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="currentFeature.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_3064)" id="currentFeature.icon">
          <path d={svgPaths.p18544000} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p312978e0} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M3.33333 18.3333H16.6667" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae07a80} id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ba6af80} id="Vector_5" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p31ca8d80} id="Vector_6" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_3064">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[104.944px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">Ranking System</p>
      </div>
    </div>
  );
}

function Div18() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] content-stretch flex gap-[8px] h-[41.778px] items-center left-0 pl-[16.889px] pr-[0.889px] py-[0.889px] rounded-[14px] top-0 w-[166.722px]" data-name="div">
      <div aria-hidden="true" className="absolute border-[0.889px] border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <CurrentFeatureIcon1 />
      <Span2 />
    </div>
  );
}

function Div19() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] border-[0.889px] border-[rgba(255,255,255,0.4)] border-solid h-[41.778px] left-[178.72px] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-0 w-[127.694px]" data-name="div">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[16px] not-italic text-[#0a0a0a] text-[14px] top-[7.67px] whitespace-nowrap">✨ Kompetitif</p>
    </div>
  );
}

function MotionDiv13() {
  return (
    <div className="absolute h-[41.778px] left-0 top-[271.75px] w-[424px]" data-name="motion.div">
      <Div18 />
      <Div19 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute h-[313.528px] left-0 top-[55.24px] w-[424px]" data-name="Container">
      <MotionDiv12 />
      <MotionH2 />
      <MotionP1 />
      <MotionDiv13 />
    </div>
  );
}

function CurrentFeatureIcon2() {
  return (
    <div className="h-[192px] overflow-clip relative shrink-0 w-full" data-name="currentFeature.icon">
      <div className="absolute bottom-[62.5%] left-[8.33%] right-3/4 top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-15%_-18.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.1086 52">
            <path d={svgPaths.p20df9440} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="12" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[62.5%] left-3/4 right-[8.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-15%_-18.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.1086 52">
            <path d={svgPaths.p225e2e80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="12" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[91.67%_16.67%_8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-6px_-4.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 140.434 12">
            <path d="M6 6H134.434" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="12" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[61.08%_58.33%_8.33%_29.17%]" data-name="Vector">
        <div className="absolute inset-[-10.22%_-24.92%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.0814 70.72">
            <path d={svgPaths.pefac660} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="12" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[61.08%_29.17%_8.33%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-10.22%_-24.92%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.0814 70.72">
            <path d={svgPaths.p288c3880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="12" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.77%_-6.23%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 108.326 116">
            <path d={svgPaths.p3485bf00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="12" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MotionDiv15() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-[192.651px]" data-name="motion.div">
      <CurrentFeatureIcon2 />
    </div>
  );
}

function MotionDiv16() {
  return <div className="absolute bg-[rgba(255,255,255,0.3)] left-[93.57px] opacity-62 rounded-[29826200px] size-[12px] top-[104.43px]" data-name="motion.div" />;
}

function MotionDiv17() {
  return <div className="absolute bg-[rgba(255,255,255,0.3)] left-[142.49px] opacity-31 rounded-[29826200px] size-[12px] top-[203.54px]" data-name="motion.div" />;
}

function MotionDiv18() {
  return <div className="absolute bg-[rgba(255,255,255,0.3)] left-[209.94px] opacity-39 rounded-[29826200px] size-[12px] top-[276.69px]" data-name="motion.div" />;
}

function MotionDiv19() {
  return <div className="absolute bg-[rgba(255,255,255,0.3)] left-[251.81px] opacity-51 rounded-[29826200px] size-[12px] top-[102.31px]" data-name="motion.div" />;
}

function MotionDiv20() {
  return <div className="absolute bg-[rgba(255,255,255,0.3)] left-[346.36px] opacity-63 rounded-[29826200px] size-[12px] top-[174.04px]" data-name="motion.div" />;
}

function MotionDiv21() {
  return <div className="absolute bg-[rgba(255,255,255,0.3)] left-[369.12px] opacity-75 rounded-[29826200px] size-[12px] top-[257.88px]" data-name="motion.div" />;
}

function Div20() {
  return (
    <div className="absolute border-8 border-[rgba(255,255,255,0.5)] border-solid left-0 overflow-clip rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-[424px] top-0" data-name="div" style={{ backgroundImage: "linear-gradient(135deg, rgb(240, 177, 0) 0%, rgb(254, 154, 0) 100%)" }}>
      <div className="absolute flex items-center justify-center left-[106.38px] size-[195.247px] top-[106.38px]" style={{ "--transform-inner-width": "1180", "--transform-inner-height": "128" } as React.CSSProperties}>
        <div className="flex-none rotate-[-0.78deg]">
          <MotionDiv15 />
        </div>
      </div>
      <MotionDiv16 />
      <MotionDiv17 />
      <MotionDiv18 />
      <MotionDiv19 />
      <MotionDiv20 />
      <MotionDiv21 />
    </div>
  );
}

function Shield() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Shield">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Shield">
          <path d={svgPaths.p25fc4100} id="Vector" stroke="var(--stroke-0, #4F3FF0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Span3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[113.139px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#0a0a0a] text-[16px] top-[-2.11px] whitespace-nowrap">Fitur Unggulan</p>
      </div>
    </div>
  );
}

function Div21() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="div">
      <Shield />
      <Span3 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[51.556px] items-start left-[247.31px] pb-[1.778px] pt-[13.778px] px-[25.778px] rounded-[16px] top-[388.44px] w-[192.694px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.778px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)]" />
      <Div21 />
    </div>
  );
}

function MotionDiv14() {
  return (
    <div className="absolute left-[472px] size-[424px] top-0" data-name="motion.div">
      <Div20 />
      <Container6 />
    </div>
  );
}

function Div17() {
  return (
    <div className="absolute h-[424px] left-[166.22px] top-[64px] w-[896px]" data-name="div">
      <Container5 />
      <MotionDiv14 />
    </div>
  );
}

function MotionDiv11() {
  return (
    <div className="absolute border-[1.778px] border-[rgba(0,0,0,0.1)] border-solid h-[555.556px] left-0 overflow-clip rounded-[24px] top-0 w-[1232px]" data-name="motion.div" style={{ backgroundImage: "linear-gradient(155.728deg, rgb(254, 252, 232) 0%, rgb(255, 251, 235) 100%)" }}>
      <Div15 />
      <Div16 />
      <Div17 />
    </div>
  );
}

function ChevronLeft() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ChevronLeft">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ChevronLeft">
          <path d="M15 18L9 12L15 6" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[16px] rounded-[29826200px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] size-[48px] top-[253.78px]" data-name="button">
      <ChevronLeft />
    </div>
  );
}

function ChevronRight() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ChevronRight">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ChevronRight">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex items-center justify-center left-[1168px] rounded-[29826200px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] size-[48px] top-[253.78px]" data-name="button">
      <ChevronRight />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[555.556px] left-0 overflow-clip rounded-[24px] top-0 w-[1232px]" data-name="Container">
      <MotionDiv11 />
      <Button6 />
      <Button7 />
    </div>
  );
}

function Container7() {
  return <div className="absolute bg-[#00c950] left-[11.28px] rounded-[29826200px] size-[9.443px] top-[9.26px]" data-name="Container" />;
}

function MotionDiv22() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] h-[27.986px] left-[1121.96px] rounded-[29826200px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[16px] w-[94.042px]" data-name="motion.div">
      <Container7 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[28px] not-italic text-[#4a5565] text-[12px] top-[6px] whitespace-nowrap">Auto-play</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[719.097px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
      <Container4 />
      <MotionDiv22 />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[64px] h-[947.097px] items-start left-[16px] px-[24px] top-[1247.61px] w-[1280px]" data-name="Section">
      <Container />
      <Container1 />
    </div>
  );
}

function Sparkles() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[10px]" data-name="Sparkles">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_3013)" id="Sparkles">
          <path d={svgPaths.p874e300} id="Vector" stroke="var(--stroke-0, #4F3FF0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 2V4.66667" id="Vector_2" stroke="var(--stroke-0, #4F3FF0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 3.33333H12" id="Vector_3" stroke="var(--stroke-0, #4F3FF0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 11.3333V12.6667" id="Vector_4" stroke="var(--stroke-0, #4F3FF0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M3.33333 12H2" id="Vector_5" stroke="var(--stroke-0, #4F3FF0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_3013">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span4() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[40px] top-[8px] w-[122.167px]" data-name="span">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#4f3ff0] text-[14px] whitespace-nowrap">Editor Notion-Style</p>
    </div>
  );
}

function Div23() {
  return (
    <div className="absolute bg-[rgba(79,63,240,0.1)] h-[36px] left-0 rounded-[29826200px] top-0 w-[178.167px]" data-name="div">
      <Sparkles />
      <Span4 />
    </div>
  );
}

function Span5() {
  return (
    <div className="absolute h-[88px] left-0 top-[-4.44px] w-[590.611px]" data-name="span">
      <p className="absolute bg-clip-text font-['Inter:Bold',sans-serif] font-bold leading-[40px] left-0 not-italic text-[36px] text-[transparent] top-[2px] w-[591px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(79, 63, 240) 0%, rgb(123, 104, 238) 100%)" }}>
        Notion, Tapi Lebih Mudah!
      </p>
    </div>
  );
}

function H() {
  return (
    <div className="absolute h-[80px] left-0 top-[52px] w-[592px]" data-name="h2">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[40px] left-0 not-italic text-[#0a0a0a] text-[36px] top-[-2.44px] whitespace-nowrap">{`Buat Catatan Kayak di `}</p>
      <Span5 />
    </div>
  );
}

function P6() {
  return (
    <div className="absolute h-[56px] left-0 top-[156px] w-[592px]" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[#717182] text-[18px] top-[-1.22px] w-[575px]">WYSIWYG editor yang super intuitif - tinggal klik toolbar dan langsung keliatan hasilnya. Format text, insert gambar, semua dalam 1 tempat! ✨</p>
    </div>
  );
}

function ItemIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="item.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="item.icon">
          <path d={svgPaths.p2250fb80} id="Vector" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M7.5 16.6667H12.5" id="Vector_2" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 3.33333V16.6667" id="Vector_3" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Div25() {
  return (
    <div className="bg-[rgba(93,92,230,0.08)] relative rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0 size-[40px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <ItemIcon />
      </div>
    </div>
  );
}

function H1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="h4">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2.11px] whitespace-nowrap">Format Visual Langsung</p>
    </div>
  );
}

function P7() {
  return (
    <div className="h-[22.75px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#717182] text-[14px] top-[-0.22px] whitespace-nowrap">Klik Bold langsung bold, klik Heading langsung gede. No coding!</p>
    </div>
  );
}

function Div26() {
  return (
    <div className="flex-[1_0_0] h-[50.75px] min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <H1 />
        <P7 />
      </div>
    </div>
  );
}

function MotionDiv24() {
  return (
    <div className="h-[82.75px] relative rounded-[14px] shrink-0 w-full" data-name="motion.div">
      <div className="content-stretch flex gap-[12px] items-start pt-[16px] px-[16px] relative size-full">
        <Div25 />
        <Div26 />
      </div>
    </div>
  );
}

function ItemIcon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="item.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="item.icon">
          <path d={svgPaths.p1cec7ff0} id="Vector" stroke="var(--stroke-0, #FFD166)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p38772900} id="Vector_2" stroke="var(--stroke-0, #FFD166)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p27fa8ca0} id="Vector_3" stroke="var(--stroke-0, #FFD166)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Div27() {
  return (
    <div className="bg-[rgba(255,209,102,0.08)] relative rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0 size-[40px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <ItemIcon1 />
      </div>
    </div>
  );
}

function H2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="h4">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2.11px] whitespace-nowrap">Insert Gambar Bebas</p>
    </div>
  );
}

function P8() {
  return (
    <div className="h-[22.75px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#717182] text-[14px] top-[-0.22px] whitespace-nowrap">{`Upload foto di mana aja dalam catatan - mix text & gambar sebebasnya`}</p>
    </div>
  );
}

function Div28() {
  return (
    <div className="flex-[1_0_0] h-[50.75px] min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <H2 />
        <P8 />
      </div>
    </div>
  );
}

function MotionDiv25() {
  return (
    <div className="h-[82.75px] relative rounded-[14px] shrink-0 w-full" data-name="motion.div">
      <div className="content-stretch flex gap-[12px] items-start pt-[16px] px-[16px] relative size-full">
        <Div27 />
        <Div28 />
      </div>
    </div>
  );
}

function ItemIcon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="item.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="item.icon">
          <path d={svgPaths.p3a2fa580} id="Vector" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Div29() {
  return (
    <div className="bg-[rgba(139,92,246,0.08)] relative rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0 size-[40px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <ItemIcon2 />
      </div>
    </div>
  );
}

function H3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="h4">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2.11px] whitespace-nowrap">Toolbar Lengkap</p>
    </div>
  );
}

function P9() {
  return (
    <div className="h-[22.75px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#717182] text-[14px] top-[-0.22px] whitespace-nowrap">{`Headings, Lists, Highlight, Link, Code - semua ada & gampang dipakai`}</p>
    </div>
  );
}

function Div30() {
  return (
    <div className="flex-[1_0_0] h-[50.75px] min-h-px min-w-px relative" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <H3 />
        <P9 />
      </div>
    </div>
  );
}

function MotionDiv26() {
  return (
    <div className="h-[82.75px] relative rounded-[14px] shrink-0 w-full" data-name="motion.div">
      <div className="content-stretch flex gap-[12px] items-start pt-[16px] px-[16px] relative size-full">
        <Div29 />
        <Div30 />
      </div>
    </div>
  );
}

function Div24() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[280.25px] items-start left-0 top-[244px] w-[592px]" data-name="div">
      <MotionDiv24 />
      <MotionDiv25 />
      <MotionDiv26 />
    </div>
  );
}

function MotionDiv23() {
  return (
    <div className="absolute h-[524.25px] left-0 top-0 w-[592px]" data-name="motion.div">
      <Div23 />
      <H />
      <P6 />
      <Div24 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14399c80} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function MotionDiv28() {
  return (
    <div className="bg-white relative rounded-[10px] shrink-0 size-[32px]" data-name="motion.div">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.889px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M12.6667 2.66667H6.66667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 13.3333H3.33333" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 2.66667L6 13.3333" id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function MotionDiv29() {
  return (
    <div className="bg-white relative rounded-[10px] shrink-0 size-[32px]" data-name="motion.div">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.889px] relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pb1d0ec0} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 13.3333H13.3333" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function MotionDiv30() {
  return (
    <div className="bg-white relative rounded-[10px] shrink-0 size-[32px]" data-name="motion.div">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.889px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2.66667 8H8" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 12V4" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 12V4" id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p29a7ff00} id="Vector_4" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function MotionDiv31() {
  return (
    <div className="bg-white relative rounded-[10px] shrink-0 size-[32px]" data-name="motion.div">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.889px] relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2 8H2.00667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 12H2.00667" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H2.00667" id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 8H14" id="Vector_4" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 12H14" id="Vector_5" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 4H14" id="Vector_6" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function MotionDiv32() {
  return (
    <div className="bg-white relative rounded-[10px] shrink-0 size-[32px]" data-name="motion.div">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.889px] relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19d57600} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2fe1fe40} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2c494540} id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function MotionDiv33() {
  return (
    <div className="bg-white relative rounded-[10px] shrink-0 size-[32px]" data-name="motion.div">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.889px] relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Div31() {
  return (
    <div className="bg-[#f9fafb] h-[56.889px] relative shrink-0 w-full" data-name="div">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b-[0.889px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[8px] items-start pb-[0.889px] pl-[12px] pt-[12px] relative size-full">
        <MotionDiv28 />
        <MotionDiv29 />
        <MotionDiv30 />
        <MotionDiv31 />
        <MotionDiv32 />
        <MotionDiv33 />
      </div>
    </div>
  );
}

function MotionDiv34() {
  return <div className="absolute bg-gradient-to-r from-[#4f3ff0] h-[24px] left-[24px] rounded-[4px] to-[rgba(79,63,240,0.6)] top-[24px] w-[460.889px]" data-name="motion.div" />;
}

function MotionDiv35() {
  return <div className="absolute bg-[#e5e7eb] h-[12px] left-[24px] rounded-[4px] top-[60px] w-[542.222px]" data-name="motion.div" />;
}

function MotionDiv36() {
  return <div className="absolute bg-[#e5e7eb] h-[12px] left-[24px] rounded-[4px] top-[84px] w-[515.111px]" data-name="motion.div" />;
}

function ImageIcon() {
  return (
    <div className="absolute left-[45.03px] size-[32px] top-0" data-name="ImageIcon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="ImageIcon">
          <path d={svgPaths.p1efeac80} id="Vector" stroke="var(--stroke-0, #FFD166)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1fa1e400} id="Vector_2" stroke="var(--stroke-0, #FFD166)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1fa89080} id="Vector_3" stroke="var(--stroke-0, #FFD166)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Div33() {
  return (
    <div className="h-[60px] relative shrink-0 w-[122.069px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <ImageIcon />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[61.5px] not-italic text-[#bb4d00] text-[12px] text-center top-[37.44px] whitespace-nowrap">Klik untuk upload foto</p>
      </div>
    </div>
  );
}

function MotionDiv37() {
  return (
    <div className="absolute content-stretch flex h-[96px] items-center justify-center left-[24px] pl-[1.778px] pr-[1.792px] py-[1.778px] rounded-[14px] top-[108px] w-[542.222px]" data-name="motion.div" style={{ backgroundImage: "linear-gradient(169.96deg, rgba(255, 209, 102, 0.3) 0%, rgba(255, 209, 102, 0.2) 50%, rgba(255, 209, 102, 0.1) 100%)" }}>
      <div aria-hidden="true" className="absolute border-[1.778px] border-[rgba(255,209,102,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Div33 />
    </div>
  );
}

function MotionDiv38() {
  return <div className="absolute bg-[#e5e7eb] h-[12px] left-[24px] rounded-[4px] top-[216px] w-[422.931px]" data-name="motion.div" />;
}

function MotionDiv39() {
  return <div className="absolute bg-[rgba(255,209,102,0.6)] h-[12px] left-[24px] rounded-[4px] top-[240px] w-[325.333px]" data-name="motion.div" />;
}

function Div32() {
  return (
    <div className="h-[276px] relative shrink-0 w-full" data-name="div">
      <MotionDiv34 />
      <MotionDiv35 />
      <MotionDiv36 />
      <MotionDiv37 />
      <MotionDiv38 />
      <MotionDiv39 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-white h-[334.667px] left-0 rounded-[24px] top-0 w-[592px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[0.889px] relative rounded-[inherit] size-full">
        <Div31 />
        <Div32 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

function Sparkles1() {
  return (
    <div className="absolute left-[0.06px] size-[20px] top-0" data-name="Sparkles">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_2958)" id="Sparkles">
          <path d={svgPaths.p24941500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M16.6667 2.5V5.83333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M18.3333 4.16667H15" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M3.33333 14.1667V15.8333" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M4.16667 15H2.5" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_2958">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span6() {
  return (
    <div className="absolute content-stretch flex h-[25.754px] items-start left-[27.89px] top-[-2.44px] w-[68.377px]" data-name="span">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">WYSIWYG</p>
    </div>
  );
}

function Div34() {
  return (
    <div className="h-[28.194px] relative shrink-0 w-full" data-name="div">
      <Sparkles1 />
      <Span6 />
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[#4f3ff0] content-stretch flex flex-col h-[48px] items-start pb-[1.778px] pt-[14.926px] px-[14.926px] relative rounded-[16px] w-[122px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.778px] border-solid border-white inset-0 pointer-events-none rounded-[16px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)]" />
      <Div34 />
    </div>
  );
}

function CheckCircle() {
  return (
    <div className="absolute left-[-0.04px] size-[24px] top-0" data-name="CheckCircle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CheckCircle">
          <path d={svgPaths.p1f023100} id="Vector" stroke="var(--stroke-0, #BB4D00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M9 11L12 14L22 4" id="Vector_2" stroke="var(--stroke-0, #BB4D00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Span7() {
  return (
    <div className="absolute h-[33.59px] left-[31.88px] top-[2.79px] w-[112.752px]" data-name="span">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-[-1.98px] not-italic text-[#7b3306] text-[16px] top-[-2.12px] whitespace-nowrap">Easy Peasy! 🎉</p>
    </div>
  );
}

function Div35() {
  return (
    <div className="h-[36.379px] relative shrink-0 w-full" data-name="div">
      <CheckCircle />
      <Span7 />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#ffd166] content-stretch flex flex-col h-[60px] items-start pb-[1.778px] pt-[19.26px] px-[19.26px] relative rounded-[16px] w-[179px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.778px] border-solid border-white inset-0 pointer-events-none rounded-[16px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)]" />
      <Div35 />
    </div>
  );
}

function MotionDiv27() {
  return (
    <div className="absolute h-[334.667px] left-[640px] top-[94.79px] w-[592px]" data-name="motion.div">
      <Container8 />
      <div className="absolute flex h-[58.45px] items-center justify-center left-[-17.64px] top-[-21.45px] w-[125.719px]" style={{ "--transform-inner-width": "1180", "--transform-inner-height": "43" } as React.CSSProperties}>
        <div className="-rotate-5 flex-none">
          <Container9 />
        </div>
      </div>
      <div className="absolute flex h-[75.373px] items-center justify-center left-[434.91px] top-[291.2px] w-[183.548px]" style={{ "--transform-inner-width": "1180", "--transform-inner-height": "43" } as React.CSSProperties}>
        <div className="flex-none rotate-5">
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Div22() {
  return (
    <div className="h-[524.25px] relative shrink-0 w-full" data-name="div">
      <MotionDiv23 />
      <MotionDiv27 />
    </div>
  );
}

function Section2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[684.25px] items-start left-0 pt-[80px] px-[40px] top-[2274.71px] w-[1312px]" data-name="section" style={{ backgroundImage: "linear-gradient(152.457deg, rgba(238, 240, 255, 0.5) 0%, rgb(255, 255, 255) 50%, rgba(255, 209, 102, 0.05) 100%)" }}>
      <Div22 />
    </div>
  );
}

function BookOpen() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="BookOpen">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="BookOpen">
          <path d="M12 7V21" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p38e00000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Div37() {
  return (
    <div className="bg-[#4f3ff0] relative rounded-[14px] shrink-0 size-[40px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <BookOpen />
      </div>
    </div>
  );
}

function Span8() {
  return (
    <div className="h-[31.986px] relative shrink-0 w-[65.542px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="bg-clip-text font-['Inter:Bold',sans-serif] font-bold leading-[32px] not-italic relative shrink-0 text-[24px] text-[transparent] whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(79, 63, 240) 0%, rgb(123, 104, 238) 100%)" }}>
          Ba-Yu
        </p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[40px] items-center left-0 top-0 w-[272px]" data-name="Link">
      <Div37 />
      <Span8 />
    </div>
  );
}

function P10() {
  return (
    <div className="absolute h-[48px] left-0 top-[56px] w-[272px]" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] top-[-2.11px] w-[247px]">Platform catatan belajar terstruktur untuk pelajar Indonesia</p>
    </div>
  );
}

function Twitter() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Twitter">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Twitter">
          <path d={svgPaths.p36786300} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function A() {
  return (
    <div className="bg-white relative rounded-[29826200px] shrink-0 size-[40px]" data-name="a">
      <div aria-hidden="true" className="absolute border-[0.889px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[29826200px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.889px] relative size-full">
        <Twitter />
      </div>
    </div>
  );
}

function Instagram() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Instagram">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_3008)" id="Instagram">
          <path d={svgPaths.p22916300} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2c68500} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M11.6667 4.33333H11.6733" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_3008">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function A1() {
  return (
    <div className="bg-white relative rounded-[29826200px] shrink-0 size-[40px]" data-name="a">
      <div aria-hidden="true" className="absolute border-[0.889px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[29826200px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.889px] relative size-full">
        <Instagram />
      </div>
    </div>
  );
}

function Github() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Github">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Github">
          <path d={svgPaths.pe485a00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28ae6680} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function A2() {
  return (
    <div className="bg-white relative rounded-[29826200px] shrink-0 size-[40px]" data-name="a">
      <div aria-hidden="true" className="absolute border-[0.889px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[29826200px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[0.889px] relative size-full">
        <Github />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-start left-0 top-[128px] w-[272px]" data-name="Container">
      <A />
      <A1 />
      <A2 />
    </div>
  );
}

function Container12() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Link />
      <P10 />
      <Container13 />
    </div>
  );
}

function H4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="h4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#0a0a0a] text-[16px] top-[-2.11px] whitespace-nowrap">Produk</p>
    </div>
  );
}

function Li() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="li">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] top-[-2.11px] whitespace-nowrap">Jelajahi Catatan</p>
    </div>
  );
}

function Li1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="li">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] top-[-2.11px] whitespace-nowrap">Dashboard</p>
    </div>
  );
}

function Li2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="li">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] top-[-2.11px] whitespace-nowrap">Fitur</p>
    </div>
  );
}

function Ul() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[96px] items-start relative shrink-0 w-full" data-name="ul">
      <Li />
      <Li1 />
      <Li2 />
    </div>
  );
}

function Container14() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <H4 />
      <Ul />
    </div>
  );
}

function H5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="h4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#0a0a0a] text-[16px] top-[-2.11px] whitespace-nowrap">Sumber Daya</p>
    </div>
  );
}

function Li3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="li">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] top-[-2.11px] whitespace-nowrap">Panduan</p>
    </div>
  );
}

function Li4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="li">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] top-[-2.11px] whitespace-nowrap">Blog</p>
    </div>
  );
}

function Li5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="li">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] top-[-2.11px] whitespace-nowrap">Bantuan</p>
    </div>
  );
}

function Ul1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[96px] items-start relative shrink-0 w-full" data-name="ul">
      <Li3 />
      <Li4 />
      <Li5 />
    </div>
  );
}

function Container15() {
  return (
    <div className="col-3 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <H5 />
      <Ul1 />
    </div>
  );
}

function H6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="h4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#0a0a0a] text-[16px] top-[-2.11px] whitespace-nowrap">Perusahaan</p>
    </div>
  );
}

function Li6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="li">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] top-[-2.11px] whitespace-nowrap">Tentang Kami</p>
    </div>
  );
}

function Li7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="li">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] top-[-2.11px] whitespace-nowrap">Karir</p>
    </div>
  );
}

function Li8() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="li">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] top-[-2.11px] whitespace-nowrap">Kontak</p>
    </div>
  );
}

function Ul2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[96px] items-start relative shrink-0 w-full" data-name="ul">
      <Li6 />
      <Li7 />
      <Li8 />
    </div>
  );
}

function Container16() {
  return (
    <div className="col-4 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <H6 />
      <Ul2 />
    </div>
  );
}

function Container11() {
  return (
    <div className="gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[168px] relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container14 />
      <Container15 />
      <Container16 />
    </div>
  );
}

function P11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[283.958px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">© 2026 Ba-Yu (BelajarYuk). All rights reserved.</p>
      </div>
    </div>
  );
}

function A3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[102.5px]" data-name="a">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">Kebijakan Privasi</p>
      </div>
    </div>
  );
}

function A4() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="a">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">{`Syarat & Ketentuan`}</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[20px] relative shrink-0 w-[246px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">
        <A3 />
        <A4 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex h-[52.889px] items-center justify-between pt-[0.889px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-solid border-t-[0.889px] inset-0 pointer-events-none" />
      <P11 />
      <Container18 />
    </div>
  );
}

function Div36() {
  return (
    <div className="h-[396.889px] relative shrink-0 w-full" data-name="div">
      <div className="content-stretch flex flex-col gap-[48px] items-start pt-[64px] px-[24px] relative size-full">
        <Container11 />
        <Container17 />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bg-[#f8f9ff] content-stretch flex flex-col h-[397.778px] items-start left-0 pt-[0.889px] px-[16px] top-[3670.74px] w-[1312px]" data-name="footer">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-solid border-t-[0.889px] inset-0 pointer-events-none" />
      <Div36 />
    </div>
  );
}

function Div38() {
  return <div className="absolute h-[962.722px] left-0 top-0 w-[1312px]" data-name="div" style={{ backgroundImage: "linear-gradient(143.729deg, rgba(79, 63, 240, 0.05) 0%, rgb(255, 255, 255) 50%, rgb(238, 240, 255) 100%)" }} />;
}

function Div39() {
  return <div className="absolute h-[962.722px] left-0 top-0 w-[1312px]" data-name="div" style={{ backgroundImage: "linear-gradient(36.2706deg, rgba(0, 0, 0, 0) 0%, rgba(250, 245, 255, 0.3) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function MotionDiv40() {
  return <div className="absolute blur-[64px] left-[684.73px] rounded-[29826200px] size-[539.195px] top-[44.72px]" data-name="motion.div" style={{ backgroundImage: "linear-gradient(135deg, rgba(79, 63, 240, 0.1) 0%, rgba(233, 212, 255, 0.2) 100%)" }} />;
}

function MotionDiv41() {
  return <div className="absolute blur-[64px] left-[90.61px] rounded-[29826200px] size-[468.022px] top-[471.72px]" data-name="motion.div" style={{ backgroundImage: "linear-gradient(45deg, rgba(255, 209, 102, 0.15) 0%, rgba(219, 234, 254, 0.2) 100%)" }} />;
}

function Zap() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Zap">
      <div className="absolute inset-[8.32%_12.49%]" data-name="Vector">
        <div className="absolute inset-[-5%_-5.55%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3379 14.6701">
            <path d={svgPaths.p8553a00} id="Vector" stroke="var(--stroke-0, #4F3FF0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-[16px]" data-name="Container">
      <Zap />
    </div>
  );
}

function Span9() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[46px] top-[10px] w-[255.361px]" data-name="span">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#4f3ff0] text-[14px] whitespace-nowrap">Platform Belajar Terpercaya di Indonesia</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-gradient-to-r border-[0.889px] border-[rgba(93,92,230,0.2)] border-solid from-[rgba(79,63,240,0.1)] h-[41.778px] left-0 rounded-[29826200px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] to-[rgba(173,70,255,0.1)] top-0 w-[323.139px]" data-name="Container">
      <div className="absolute flex items-center justify-center left-[19.76px] size-[16.487px] top-[11.76px]" style={{ "--transform-inner-width": "1180", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[-1.77deg]">
          <Container20 />
        </div>
      </div>
      <Span9 />
    </div>
  );
}

function Span10() {
  return (
    <div className="absolute content-stretch flex h-[95.111px] items-start left-0 top-[71.19px] w-[227.667px]" data-name="span">
      <p className="bg-clip-text font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[79.2px] not-italic relative shrink-0 text-[72px] text-[transparent] tracking-[-1.8px] whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(79, 63, 240) 0%, rgb(152, 16, 250) 50%, rgb(79, 63, 240) 100%)" }}>
        Cerdas
      </p>
    </div>
  );
}

function Span11() {
  return (
    <div className="absolute content-stretch flex h-[95.111px] items-start left-0 top-[229.58px] w-[388.167px]" data-name="span">
      <p className="bg-clip-text font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[79.2px] not-italic relative shrink-0 text-[72px] text-[transparent] tracking-[-1.8px] whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(255, 209, 102) 0%, rgb(254, 154, 0) 50%, rgb(255, 209, 102) 100%)" }}>
        Terstruktur
      </p>
    </div>
  );
}

function MotionH() {
  return (
    <div className="absolute h-[316.778px] left-0 top-0 w-[584px]" data-name="motion.h1">
      <p className="absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[79.2px] left-0 not-italic text-[#0a0a0a] text-[72px] top-[-4px] tracking-[-1.8px] whitespace-nowrap">{`Belajar Lebih `}</p>
      <Span10 />
      <p className="absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[79.2px] left-0 not-italic text-[#0a0a0a] text-[72px] top-[154.39px] tracking-[-1.8px] whitespace-nowrap">{`Lebih `}</p>
      <Span11 />
    </div>
  );
}

function MotionP2() {
  return (
    <div className="absolute h-[97.5px] left-0 top-[332.78px] w-[576px]" data-name="motion.p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32.5px] left-0 not-italic text-[#717182] text-[20px] top-[-2.33px] w-[537px]">Platform manajemen catatan belajar yang membantu pelajar Indonesia mengorganisir, berbagi, dan mendiskusikan materi pembelajaran dengan lebih efektif.</p>
    </div>
  );
}

function Div41() {
  return (
    <div className="absolute h-[430.278px] left-0 top-[73.78px] w-[584px]" data-name="div">
      <MotionH />
      <MotionP2 />
    </div>
  );
}

function ItemIcon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="item.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_2946)" id="item.icon">
          <path d={svgPaths.p34e03900} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f2c5400} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_1_2946">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Span12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[109.181px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#008236] text-[14px] whitespace-nowrap">Gratis Selamanya</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41.778px] items-center left-0 pl-[16.889px] pr-[0.889px] py-[0.889px] rounded-[29826200px] top-0 w-[166.958px]" data-name="Container" style={{ backgroundImage: "linear-gradient(165.951deg, rgb(240, 253, 244) 0%, rgb(236, 253, 245) 100%)" }}>
      <div aria-hidden="true" className="absolute border-[0.889px] border-[rgba(229,231,235,0.5)] border-solid inset-0 pointer-events-none rounded-[29826200px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <ItemIcon3 />
      <Span12 />
    </div>
  );
}

function ItemIcon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="item.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="item.icon">
          <path d="M8 4.66667V14" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p8c8fb00} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Span13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[111.972px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#1447e6] text-[14px] whitespace-nowrap">Upload Unlimited</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41.778px] items-center left-[178.96px] pl-[16.889px] pr-[0.889px] py-[0.889px] rounded-[29826200px] top-0 w-[169.75px]" data-name="Container" style={{ backgroundImage: "linear-gradient(166.174deg, rgb(239, 246, 255) 0%, rgb(236, 254, 255) 100%)" }}>
      <div aria-hidden="true" className="absolute border-[0.889px] border-[rgba(229,231,235,0.5)] border-solid inset-0 pointer-events-none rounded-[29826200px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <ItemIcon4 />
      <Span13 />
    </div>
  );
}

function ItemIcon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="item.icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="item.icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f197700} id="Vector_3" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3bf3e100} id="Vector_4" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Span14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[86.792px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#8200db] text-[14px] whitespace-nowrap">Validasi Pakar</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[41.778px] items-center left-[360.71px] pl-[16.889px] pr-[0.889px] py-[0.889px] rounded-[29826200px] top-0 w-[144.569px]" data-name="Container" style={{ backgroundImage: "linear-gradient(163.882deg, rgb(250, 245, 255) 0%, rgb(253, 242, 248) 100%)" }}>
      <div aria-hidden="true" className="absolute border-[0.889px] border-[rgba(229,231,235,0.5)] border-solid inset-0 pointer-events-none rounded-[29826200px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <ItemIcon5 />
      <Span14 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute h-[41.778px] left-0 top-[536.06px] w-[584px]" data-name="Container">
      <Container22 />
      <Container23 />
      <Container24 />
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="absolute left-[123.28px] size-[16px] top-[20px]" data-name="ArrowRight">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ArrowRight">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-[#4f3ff0] h-[56px] left-0 rounded-[14px] shadow-[0px_10px_15px_0px_rgba(79,63,240,0.25),0px_4px_6px_0px_rgba(79,63,240,0.25)] top-0 w-[155.278px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-[62px] not-italic text-[16px] text-center text-white top-[13.89px] whitespace-nowrap">Mulai Gratis</p>
      <ArrowRight />
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute bg-white border-[1.778px] border-[rgba(0,0,0,0.1)] border-solid h-[56px] left-[171.28px] rounded-[14px] top-0 w-[140.667px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[69px] not-italic text-[#0a0a0a] text-[16px] text-center top-[12.11px] whitespace-nowrap">Lihat Fitur</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute h-[56px] left-0 top-[609.83px] w-[584px]" data-name="Container">
      <Button8 />
      <Button9 />
    </div>
  );
}

function MotionImg() {
  return (
    <div className="absolute left-0 rounded-[29826200px] size-[48px] top-0" data-name="motion.img">
      <div aria-hidden="true" className="absolute inset-0 rounded-[29826200px]">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[29826200px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[29826200px] size-full" src={imgMotionImg} />
      </div>
      <div aria-hidden="true" className="absolute border-[2.667px] border-solid border-white inset-0 rounded-[29826200px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function MotionImg1() {
  return (
    <div className="absolute left-[36px] rounded-[29826200px] size-[48px] top-0" data-name="motion.img">
      <div aria-hidden="true" className="absolute inset-0 rounded-[29826200px]">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[29826200px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[29826200px] size-full" src={imgMotionImg1} />
      </div>
      <div aria-hidden="true" className="absolute border-[2.667px] border-solid border-white inset-0 rounded-[29826200px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function MotionImg2() {
  return (
    <div className="absolute left-[72px] rounded-[29826200px] size-[48px] top-0" data-name="motion.img">
      <div aria-hidden="true" className="absolute inset-0 rounded-[29826200px]">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[29826200px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[29826200px] size-full" src={imgMotionImg2} />
      </div>
      <div aria-hidden="true" className="absolute border-[2.667px] border-solid border-white inset-0 rounded-[29826200px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function MotionImg3() {
  return (
    <div className="absolute left-[108px] rounded-[29826200px] size-[48px] top-0" data-name="motion.img">
      <div aria-hidden="true" className="absolute inset-0 rounded-[29826200px]">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[29826200px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[29826200px] size-full" src={imgMotionImg3} />
      </div>
      <div aria-hidden="true" className="absolute border-[2.667px] border-solid border-white inset-0 rounded-[29826200px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Div42() {
  return (
    <div className="h-[48px] relative shrink-0 w-[156px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid pointer-events-none relative size-full">
        <MotionImg />
        <MotionImg1 />
        <MotionImg2 />
        <MotionImg3 />
      </div>
    </div>
  );
}

function Star1() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Star">
      <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.24%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6679 14.048">
            <path d={svgPaths.p1416a00} fill="var(--fill-0, #FFD166)" id="Vector" stroke="var(--stroke-0, #FFD166)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MotionDiv43() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="motion.div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Star1 />
      </div>
    </div>
  );
}

function Star2() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Star">
      <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.24%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6679 14.048">
            <path d={svgPaths.p1416a00} fill="var(--fill-0, #FFD166)" id="Vector" stroke="var(--stroke-0, #FFD166)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MotionDiv44() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="motion.div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Star2 />
      </div>
    </div>
  );
}

function Star3() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Star">
      <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.24%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6679 14.048">
            <path d={svgPaths.p1416a00} fill="var(--fill-0, #FFD166)" id="Vector" stroke="var(--stroke-0, #FFD166)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MotionDiv45() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="motion.div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Star3 />
      </div>
    </div>
  );
}

function Star4() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Star">
      <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.24%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6679 14.048">
            <path d={svgPaths.p1416a00} fill="var(--fill-0, #FFD166)" id="Vector" stroke="var(--stroke-0, #FFD166)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MotionDiv46() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="motion.div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Star4 />
      </div>
    </div>
  );
}

function Star5() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Star">
      <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.24%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6679 14.048">
            <path d={svgPaths.p1416a00} fill="var(--fill-0, #FFD166)" id="Vector" stroke="var(--stroke-0, #FFD166)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MotionDiv47() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="motion.div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Star5 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex gap-[4px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <MotionDiv43 />
      <MotionDiv44 />
      <MotionDiv45 />
      <MotionDiv46 />
      <MotionDiv47 />
    </div>
  );
}

function P12() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#717182] text-[0px] text-[14px] whitespace-nowrap">
        <span className="leading-[20px]">{`Dipercaya oleh `}</span>
        <span className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] text-[#0a0a0a]">5,000+</span>
        <span className="leading-[20px]">{` pelajar`}</span>
      </p>
    </div>
  );
}

function Div43() {
  return (
    <div className="h-[40px] relative shrink-0 w-[191px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container27 />
        <P12 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex gap-[20px] h-[72.889px] items-center left-0 pt-[0.889px] top-[697.83px] w-[584px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-solid border-t-[0.889px] inset-0 pointer-events-none" />
      <Div42 />
      <Div43 />
    </div>
  );
}

function MotionDiv42() {
  return (
    <div className="absolute h-[770.722px] left-0 top-0 w-[584px]" data-name="motion.div">
      <Container19 />
      <Div41 />
      <Container21 />
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container28() {
  return <div className="absolute h-[760px] left-[584px] top-0 w-0" data-name="Container" />;
}

function Container29() {
  return <div className="absolute h-[760px] left-[584px] top-0 w-0" data-name="Container" />;
}

function Container30() {
  return <div className="absolute h-[760px] left-[584px] top-0 w-0" data-name="Container" />;
}

function Container31() {
  return <div className="absolute h-[760px] left-[584px] top-0 w-0" data-name="Container" />;
}

function MotionImg4() {
  return (
    <div className="absolute h-[744px] left-0 rounded-[32px] top-0 w-[496px]" data-name="motion.img">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none rounded-[32px] size-full" src={imgMotionImg4} />
    </div>
  );
}

function Container32() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.05)] h-[744px] left-0 to-[rgba(0,0,0,0)] top-0 w-[496px]" data-name="Container" />;
}

function Div44() {
  return (
    <div className="absolute bg-[#f3f4f6] border-8 border-[#f3f4f6] border-solid h-[760px] left-[72px] overflow-clip rounded-[40px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-0 w-[512px]" data-name="div">
      <MotionImg4 />
      <Container32 />
    </div>
  );
}

function BookOpen1() {
  return (
    <div className="relative shrink-0 size-[28.001px]" data-name="BookOpen">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.0009 28.0008">
        <g id="BookOpen">
          <path d="M14.0004 8.16691V24.5007" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3334" />
          <path d={svgPaths.p31f53c40} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3334" />
        </g>
      </svg>
    </div>
  );
}

function Container34() {
  return (
    <div className="relative rounded-[14px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0 size-[56.002px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(79, 63, 240) 0%, rgb(152, 16, 250) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <BookOpen1 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex h-[31.987px] items-start left-0 top-0 w-[116.643px]" data-name="Container">
      <p className="font-['Inter:Black',sans-serif] font-black leading-[32px] not-italic relative shrink-0 text-[#0a0a0a] text-[24px] whitespace-nowrap">Unlimited</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex h-[20.001px] items-start left-0 top-[31.99px] w-[116.643px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#717182] text-[14px]">Upload Catatan</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[51.988px] relative shrink-0 w-[116.643px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container36 />
        <Container37 />
      </div>
    </div>
  );
}

function Div45() {
  return (
    <div className="content-stretch flex gap-[16px] h-[56.002px] items-center relative shrink-0 w-full" data-name="div">
      <Container34 />
      <Container35 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] content-stretch flex flex-col h-[98px] items-start left-0 pb-[0.889px] pl-[20.89px] pr-[20.889px] pt-[20.89px] rounded-[16px] top-[36.72px] w-[230px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)]" />
      <Div45 />
    </div>
  );
}

function Shield1() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Shield">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Shield">
          <path d={svgPaths.p1b228440} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div className="relative rounded-[14px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0 size-[56px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 209, 102) 0%, rgb(254, 154, 0) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Shield1 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex h-[31.986px] items-start left-0 top-0 w-[120.097px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Black',sans-serif] font-black leading-[32px] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[24px]">Pakar</p>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[31.99px] w-[120.097px]" data-name="Container">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">Validasi Terpercaya</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[51.986px] relative shrink-0 w-[120.097px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container41 />
        <Container42 />
      </div>
    </div>
  );
}

function Div46() {
  return (
    <div className="content-stretch flex gap-[16px] h-[56px] items-center relative shrink-0 w-full" data-name="div">
      <Container39 />
      <Container40 />
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] content-stretch flex flex-col h-[98px] items-start left-[350.13px] pb-[0.889px] pt-[20.889px] px-[20.889px] rounded-[16px] top-[620.43px] w-[234px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)]" />
      <Div46 />
    </div>
  );
}

function CheckCircle1() {
  return (
    <div className="absolute left-[10.49px] size-[24px] top-[0.21px]" data-name="CheckCircle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CheckCircle">
          <path d={svgPaths.p1f023100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M9 11L12 14L22 4" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex h-[16.839px] items-start left-[-0.54px] top-[27.99px] w-[44.896px]" data-name="Container">
      <p className="font-['Inter:Black',sans-serif] font-black leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white uppercase whitespace-nowrap">Gratis</p>
    </div>
  );
}

function Div47() {
  return (
    <div className="h-[44.834px] relative shrink-0 w-full" data-name="div">
      <CheckCircle1 />
      <Container44 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col h-[68px] items-start pt-[12.228px] px-[12.228px] relative rounded-[14px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] w-[69px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135.418deg, rgb(0, 201, 80) 0%, rgb(0, 153, 102) 100%)" }}>
      <Div47 />
    </div>
  );
}

function Star6() {
  return (
    <div className="absolute left-[3.72px] size-[24px] top-0" data-name="Star">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Star">
          <path d={svgPaths.p9b81900} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute content-stretch flex h-[15.986px] items-start left-0 top-[28px] w-[31.458px]" data-name="Container">
      <p className="font-['Inter:Black',sans-serif] font-black leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">4.9/5</p>
    </div>
  );
}

function Div48() {
  return (
    <div className="h-[43.986px] relative shrink-0 w-full" data-name="div">
      <Star6 />
      <Container46 />
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex flex-col h-[68px] items-start left-[-32px] pt-[12px] px-[12px] rounded-[14px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] top-[383.28px] w-[55px]" data-name="Container" style={{ backgroundImage: "linear-gradient(128.967deg, rgb(255, 185, 0) 0%, rgb(255, 105, 0) 100%)" }}>
      <Div48 />
    </div>
  );
}

function MotionDiv48() {
  return (
    <div className="absolute h-[760px] left-[648px] top-[5.36px] w-[584px]" data-name="motion.div">
      <Container28 />
      <Container29 />
      <Container30 />
      <Container31 />
      <Div44 />
      <Container33 />
      <Container38 />
      <div className="absolute flex h-[69.312px] items-center justify-center left-[546.56px] top-[189.34px] w-[70.292px]" style={{ "--transform-inner-width": "1180", "--transform-inner-height": "43" } as React.CSSProperties}>
        <div className="flex-none rotate-[1.1deg]">
          <Container43 />
        </div>
      </div>
      <Container45 />
    </div>
  );
}

function Div40() {
  return (
    <div className="absolute h-[770.722px] left-[40px] top-[80px] w-[1232px]" data-name="div">
      <MotionDiv42 />
      <MotionDiv48 />
    </div>
  );
}

function Section3() {
  return (
    <div className="absolute h-[962.722px] left-0 overflow-clip top-[80.89px] w-[1312px]" data-name="section">
      <Div38 />
      <Div39 />
      <MotionDiv40 />
      <MotionDiv41 />
      <Div40 />
    </div>
  );
}

function Div49() {
  return <div className="absolute bg-gradient-to-b from-[#4f3ff0] h-[583.778px] left-0 to-[#eef0ff] top-0 via-1/2 via-[#7b68ee] w-[1312px]" data-name="div" />;
}

function Div50() {
  return <div className="absolute bg-gradient-to-t from-[rgba(79,63,240,0.2)] h-[583.778px] left-0 to-[rgba(0,0,0,0)] top-0 via-1/2 via-[rgba(0,0,0,0)] w-[1312px]" data-name="div" />;
}

function MotionDiv49() {
  return <div className="absolute bg-[rgba(255,255,255,0.2)] blur-[64px] left-[127.32px] opacity-16 rounded-[29826200px] size-[407.748px] top-[76.13px]" data-name="motion.div" />;
}

function MotionDiv50() {
  return <div className="absolute bg-[rgba(255,209,102,0.15)] blur-[64px] left-[633.11px] opacity-17 rounded-[29826200px] size-[514.188px] top-[61.68px]" data-name="motion.div" />;
}

function MotionImg5() {
  return (
    <div className="absolute left-0 rounded-[29826200px] size-[32px] top-0" data-name="motion.img">
      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[29826200px] size-full" src={imgMotionImg} />
      <div aria-hidden="true" className="absolute border-[1.778px] border-[rgba(255,255,255,0.5)] border-solid inset-0 rounded-[29826200px]" />
    </div>
  );
}

function MotionImg6() {
  return (
    <div className="absolute left-[24px] rounded-[29826200px] size-[32px] top-0" data-name="motion.img">
      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[29826200px] size-full" src={imgMotionImg1} />
      <div aria-hidden="true" className="absolute border-[1.778px] border-[rgba(255,255,255,0.5)] border-solid inset-0 rounded-[29826200px]" />
    </div>
  );
}

function MotionImg7() {
  return (
    <div className="absolute left-[48px] rounded-[29826200px] size-[32px] top-0" data-name="motion.img">
      <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[29826200px] size-full" src={imgMotionImg2} />
      <div aria-hidden="true" className="absolute border-[1.778px] border-[rgba(255,255,255,0.5)] border-solid inset-0 rounded-[29826200px]" />
    </div>
  );
}

function Div51() {
  return (
    <div className="absolute h-[32px] left-[20px] pointer-events-none top-[12px] w-[80px]" data-name="div">
      <MotionImg5 />
      <MotionImg6 />
      <MotionImg7 />
    </div>
  );
}

function Span15() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[112px] top-[18px] w-[222.222px]" data-name="span">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Bergabung dengan 12,500+ pelajar</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] border-[0.889px] border-[rgba(255,255,255,0.2)] border-solid h-[57.778px] left-[246px] rounded-[29826200px] top-0 w-[356px]" data-name="Container">
      <Div51 />
      <Span15 />
    </div>
  );
}

function MotionH3() {
  return (
    <div className="absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold h-[150px] leading-[75px] left-0 not-italic text-[60px] text-center text-white top-[89.78px] w-[848px] whitespace-nowrap" data-name="motion.h2">
      <p className="-translate-x-1/2 absolute left-[424.88px] top-[-3.67px]">Siap Mulai Belajar</p>
      <p className="-translate-x-1/2 absolute left-[424.15px] top-[71.33px]">Lebih Efektif?</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute bg-white h-[56px] left-[282.94px] rounded-[14px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] top-[271.78px] w-[282.111px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-[141px] not-italic text-[#4f3ff0] text-[18px] text-center top-[12.78px] whitespace-nowrap">Mulai Gratis Sekarang</p>
    </div>
  );
}

function MotionDiv51() {
  return (
    <div className="absolute h-[327.778px] left-[232px] top-[128px] w-[848px]" data-name="motion.div">
      <Container47 />
      <MotionH3 />
      <Button10 />
    </div>
  );
}

function Section4() {
  return (
    <div className="absolute h-[583.778px] left-0 overflow-clip top-[2958.96px] w-[1312px]" data-name="section">
      <Div49 />
      <Div50 />
      <MotionDiv49 />
      <MotionDiv50 />
      <MotionDiv51 />
    </div>
  );
}

function Div() {
  return (
    <div className="bg-white h-[4068.514px] relative shrink-0 w-full" data-name="div">
      <Section />
      <Section1 />
      <Section2 />
      <Footer />
      <Section3 />
      <Section4 />
    </div>
  );
}

function Section5() {
  return <div className="h-0 shrink-0 w-full" data-name="Section" />;
}

function SM() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[799.111px] items-start left-0 top-0 w-[1312px]" data-name="sM">
      <Div />
      <Section5 />
    </div>
  );
}

function GrammarlyDesktopIntegration() {
  return <div className="absolute left-0 size-0 top-[799.11px]" data-name="Grammarly-desktop-integration" />;
}

function BookOpen2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="BookOpen">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="BookOpen">
          <path d="M12 7V21" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p38e00000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Div53() {
  return (
    <div className="bg-[#4f3ff0] relative rounded-[14px] shrink-0 size-[40px]" data-name="div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <BookOpen2 />
      </div>
    </div>
  );
}

function Span16() {
  return (
    <div className="flex-[1_0_0] h-[31.986px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="bg-clip-text font-['Inter:Bold',sans-serif] font-bold leading-[32px] not-italic relative shrink-0 text-[24px] text-[transparent] whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(79, 63, 240) 0%, rgb(123, 104, 238) 100%)" }}>
          Ba-Yu
        </p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[40px] relative shrink-0 w-[113.542px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Div53 />
        <Span16 />
      </div>
    </div>
  );
}

function A5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[33.264px]" data-name="a">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#0a0a0a] text-[16px] top-[-2.11px] whitespace-nowrap">Fitur</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[53.403px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#0a0a0a] text-[16px] top-[-2.11px] whitespace-nowrap">Jelajahi</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative size-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center whitespace-nowrap">Masuk</p>
        </div>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-[#4f3ff0] h-[36px] relative rounded-[8px] shadow-[0px_10px_15px_0px_rgba(79,63,240,0.25),0px_4px_6px_0px_rgba(79,63,240,0.25)] shrink-0 w-[71.986px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Daftar</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[36px] relative shrink-0 w-[328.458px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[32px] items-center relative size-full">
        <A5 />
        <Link2 />
        <Button11 />
        <Button12 />
      </div>
    </div>
  );
}

function Div52() {
  return (
    <div className="h-[80px] relative shrink-0 w-full" data-name="div">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] relative size-full">
          <Link1 />
          <Container48 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col h-[80.889px] items-start left-0 pb-[0.889px] px-[16px] top-0 w-[1312px]" data-name="nav">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.889px] border-solid inset-0 pointer-events-none" />
      <Div52 />
    </div>
  );
}

export default function Beranda() {
  return (
    <div className="bg-white relative size-full" data-name="Beranda">
      <SM />
      <GrammarlyDesktopIntegration />
      <Nav />
    </div>
  );
}