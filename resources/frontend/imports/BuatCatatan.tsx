import svgPaths from "./svg-o0b9palg25";
import imgBn from "figma:asset/ce8fa6af0e9c18f3c2f1fd4a3fe3f22002064d5d.png";

function Bn() {
  return <div className="h-[64px] shrink-0 w-full" data-name="bn" />;
}

function Bn1() {
  return <div className="h-0 shrink-0 w-full" data-name="bn" />;
}

function Bn2() {
  return <div className="absolute h-[64px] left-0 top-0 w-[1312px]" data-name="bn" />;
}

function Bn3() {
  return <div className="absolute h-0 left-0 top-[64px] w-[1312px]" data-name="bn" />;
}

function Tx1() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Tx">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[40px] left-[423.74px] not-italic text-[#101828] text-[36px] text-center top-[-2.44px] whitespace-nowrap">Buat Catatan Baru ✨</p>
    </div>
  );
}

function Tx2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Tx">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[424.75px] not-italic text-[#4a5565] text-[16px] text-center top-[-2.11px] whitespace-nowrap">Bagikan catatan belajarmu dan bantu teman-teman lainnya</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72px] items-start left-[24px] top-0 w-[848px]" data-name="Container">
      <Tx1 />
      <Tx2 />
    </div>
  );
}

function Label() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-0 w-[782.222px]" data-name="Label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Judul Catatan *</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute h-[51.556px] left-0 rounded-[14px] top-[28px] w-[782.222px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[16px] py-[12px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(10,10,10,0.5)] whitespace-nowrap">Judul catatan...</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.778px] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute content-stretch flex h-[15.986px] items-start left-0 top-[83.56px] w-[782.222px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">0 / 200 karakter</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[99.542px] relative shrink-0 w-full" data-name="Container">
      <Label />
      <TextInput />
      <Paragraph />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-0 size-[16px] top-[3.61px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pa568080} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 6.66667V10.6667" id="Vector_2" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p34e88d80} id="Vector_3" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Label1() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[782.222px]" data-name="Label">
      <Icon />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[24px] not-italic text-[#364153] text-[14px] top-[-1px] whitespace-nowrap">Tingkat Pendidikan *</p>
    </div>
  );
}

function Tx4() {
  return (
    <div className="absolute h-[40px] left-[16px] top-[16px] w-[151px]" data-name="Tx">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[40px] left-[75.78px] not-italic text-[#0a0a0a] text-[36px] text-center top-[-2.44px] whitespace-nowrap">🎒</p>
    </div>
  );
}

function Tx5() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[16px] top-[64px] w-[151px]" data-name="Tx">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px] text-center">SD</p>
    </div>
  );
}

function Tx6() {
  return (
    <div className="absolute content-stretch flex h-[15.986px] items-start left-[16px] top-[88px] w-[151px]" data-name="Tx">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px] text-center">6 tingkat</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[1.778px] border-solid h-[123.542px] left-0 rounded-[14px] top-0 w-[186.556px]" data-name="Button">
      <Tx4 />
      <Tx5 />
      <Tx6 />
    </div>
  );
}

function Tx7() {
  return (
    <div className="absolute h-[40px] left-[16px] top-[16px] w-[151px]" data-name="Tx">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[40px] left-[75.78px] not-italic text-[#0a0a0a] text-[36px] text-center top-[-2.44px] whitespace-nowrap">📚</p>
    </div>
  );
}

function Tx8() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[16px] top-[64px] w-[151px]" data-name="Tx">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px] text-center">SMP</p>
    </div>
  );
}

function Tx9() {
  return (
    <div className="absolute content-stretch flex h-[15.986px] items-start left-[16px] top-[88px] w-[151px]" data-name="Tx">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px] text-center">3 tingkat</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[1.778px] border-solid h-[123.542px] left-[198.56px] rounded-[14px] top-0 w-[186.556px]" data-name="Button">
      <Tx7 />
      <Tx8 />
      <Tx9 />
    </div>
  );
}

function Tx10() {
  return (
    <div className="absolute h-[40px] left-[16px] top-[16px] w-[151px]" data-name="Tx">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[40px] left-[75.78px] not-italic text-[#0a0a0a] text-[36px] text-center top-[-2.44px] whitespace-nowrap">🎓</p>
    </div>
  );
}

function Tx11() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[16px] top-[64px] w-[151px]" data-name="Tx">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px] text-center">SMA/SMK</p>
    </div>
  );
}

function Tx12() {
  return (
    <div className="absolute content-stretch flex h-[15.986px] items-start left-[16px] top-[88px] w-[151px]" data-name="Tx">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px] text-center">3 tingkat</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[1.778px] border-solid h-[123.542px] left-[397.11px] rounded-[14px] top-0 w-[186.556px]" data-name="Button">
      <Tx10 />
      <Tx11 />
      <Tx12 />
    </div>
  );
}

function Tx13() {
  return (
    <div className="absolute h-[40px] left-[16px] top-[16px] w-[151px]" data-name="Tx">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[40px] left-[75.78px] not-italic text-[#0a0a0a] text-[36px] text-center top-[-2.44px] whitespace-nowrap">🏛️</p>
    </div>
  );
}

function Tx14() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[16px] top-[64px] w-[151px]" data-name="Tx">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px] text-center">Kuliah/Universitas</p>
    </div>
  );
}

function Tx15() {
  return (
    <div className="absolute content-stretch flex h-[15.986px] items-start left-[16px] top-[88px] w-[151px]" data-name="Tx">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px] text-center">8 tingkat</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[1.778px] border-solid h-[123.542px] left-[595.67px] rounded-[14px] top-0 w-[186.556px]" data-name="Button">
      <Tx13 />
      <Tx14 />
      <Tx15 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute h-[123.542px] left-0 top-[32px] w-[782.222px]" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute content-stretch flex h-[15.986px] items-start left-0 top-[163.54px] w-[782.222px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px]">Pilih tingkat pendidikanmu untuk melihat pilihan kelas</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[179.528px] relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Container5 />
      <Paragraph1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Isi Catatan *</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[16.67%] left-1/4 right-[20.83%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 12">
            <path d={svgPaths.p36e30a00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[16.67%_20.83%_83.33%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-11.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.33333 1.33333">
            <path d="M6.66667 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[83.33%_41.67%_16.67%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-11.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.33333 1.33333">
            <path d="M6.66667 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-6.25%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33369 12.0004">
            <path d={svgPaths.p2cdaf460} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[33.33%] left-1/4 right-1/4 top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
            <path d={svgPaths.pf781a80} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[83.33%_16.67%_16.67%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 1.33333">
            <path d="M0.666667 0.666667H11.3333" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-start left-[8px] pr-[0.889px] top-[8px] w-[112.889px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r-[0.889px] border-solid inset-0 pointer-events-none" />
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[16.67%] right-1/2 top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 1.33333">
            <path d="M0.666667 0.666667H6" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[16.67%] right-[83.33%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33333 9.33333">
            <path d="M0.666667 8.66667V0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-1/2 right-1/2 top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33333 9.33333">
            <path d="M0.666667 8.66667V0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[70.83%] right-[16.67%] top-[41.67%]" data-name="Vector">
        <div className="absolute inset-[-12.5%_-33.33%_-12.5%_-33.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.3334 6.66667">
            <path d={svgPaths.pb537240} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[16.67%] right-1/2 top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 1.33333">
            <path d="M0.666667 0.666667H6" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[16.67%] right-[83.33%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33333 9.33333">
            <path d="M0.666667 8.66667V0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-1/2 right-1/2 top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33333 9.33333">
            <path d="M0.666667 8.66667V0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[70.83%] right-[12.5%] top-[42.74%]" data-name="Vector">
        <div className="absolute inset-[-12.92%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.00004 6.495">
            <path d={svgPaths.p11e5c500} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[16.67%] right-1/2 top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 1.33333">
            <path d="M0.666667 0.666667H6" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[16.67%] right-[83.33%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33333 9.33333">
            <path d="M0.666667 8.66667V0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-1/2 right-1/2 top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33333 9.33333">
            <path d="M0.666667 8.66667V0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[42.07%_12.5%_41.67%_72.92%]" data-name="Vector">
        <div className="absolute inset-[-25.63%_-28.57%_-25.62%_-28.58%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.66677 3.93506">
            <path d={svgPaths.p11d6b7c0} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_12.5%_24.25%_70.83%]" data-name="Vector">
        <div className="absolute inset-[-23.93%_-25%_-23.94%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.00004 4.12">
            <path d={svgPaths.pb968780} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-start left-[124.89px] pr-[0.889px] top-[8px] w-[112.889px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r-[0.889px] border-solid inset-0 pointer-events-none" />
      <Button7 />
      <Button8 />
      <Button9 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[12.5%] right-[87.46%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.34 1.33333">
            <path d="M0.666667 0.666667H0.673333" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[12.5%] right-[87.46%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.34 1.33333">
            <path d="M0.666667 0.666667H0.673333" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[12.5%] right-[87.46%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.34 1.33333">
            <path d="M0.666667 0.666667H0.673333" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[33.33%] right-[12.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1.33333">
            <path d="M0.666667 0.666667H9.33333" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[33.33%] right-[12.5%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1.33333">
            <path d="M0.666667 0.666667H9.33333" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1.33333">
            <path d="M0.666667 0.666667H9.33333" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[41.67%] right-[12.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-9.09%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.66667 1.33333">
            <path d="M0.666667 0.666667H8" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[41.67%] right-[12.5%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-9.09%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.66667 1.33333">
            <path d="M0.666667 0.666667H8" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[41.67%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-9.09%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.66667 1.33333">
            <path d="M0.666667 0.666667H8" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[58.33%] left-[16.67%] right-3/4 top-[41.67%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66667 1.33333">
            <path d="M0.666667 0.666667H2" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[58.33%] left-[16.67%] right-[79.17%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-25%_-100%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
            <path d={svgPaths.p39273870} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[16.67%] right-3/4 top-[57.52%]" data-name="Vector">
        <div className="absolute inset-[-23.83%_-50%_-23.83%_-50.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66681 4.13083">
            <path d={svgPaths.p2cce7ad0} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-start left-[241.78px] pr-[0.889px] top-[8px] w-[76.889px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r-[0.889px] border-solid inset-0 pointer-events-none" />
      <Button10 />
      <Button11 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[12.5%] right-[37.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 1.33333">
            <path d="M8.66667 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[12.5%] right-[29.17%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 1.33333">
            <path d="M10 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 1.33333">
            <path d="M12.6667 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[29.17%] right-[29.17%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 1.33333">
            <path d="M7.33333 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[20.83%] right-[20.83%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 1.33333">
            <path d="M10 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 1.33333">
            <path d="M12.6667 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[37.5%] right-[12.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 1.33333">
            <path d="M8.66667 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[29.17%] right-[12.5%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 1.33333">
            <path d="M10 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 1.33333">
            <path d="M12.6667 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-start left-[322.67px] pr-[0.889px] top-[8px] w-[112.889px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-r-[0.889px] border-solid inset-0 pointer-events-none" />
      <Button12 />
      <Button13 />
      <Button14 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_37.5%_16.67%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-11.11%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 7.33333">
            <path d={svgPaths.p2530c800} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_8.33%_28.45%_36.78%]" data-name="Vector">
        <div className="absolute inset-[-7.59%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.1145 10.1145">
            <path d={svgPaths.pb22d100} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.61%_8.57%_37.48%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-7.73%_-8.37%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.29575 9.95911">
            <path d={svgPaths.p3fda2140} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.48%_41.67%_8.61%_8.57%]" data-name="Vector">
        <div className="absolute inset-[-7.73%_-8.37%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.29575 9.95911">
            <path d={svgPaths.p1b1f280} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/4 left-[66.67%] right-[8.33%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 9.33333">
            <path d={svgPaths.p3ec8f700} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[8.33%] right-[66.67%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 9.33333">
            <path d={svgPaths.p69910e0} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button17() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon14 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
            <path d={svgPaths.p3b86be00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_54.17%_54.17%_29.17%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p2b1c1400} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-1/4 right-[12.5%] top-[47.2%]" data-name="Vector">
        <div className="absolute inset-[-10.34%_-6.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.3333 7.78105">
            <path d={svgPaths.p14dd1bc0} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[10px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon15 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[32px] items-start left-[439.56px] top-[8px] w-[140px]" data-name="Container">
      <Button15 />
      <Button16 />
      <Button17 />
      <Button18 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#e5e7eb] border-b-[0.889px] border-solid h-[48.889px] left-[1.78px] top-[1.78px] w-[778.667px]" data-name="Container">
      <Container8 />
      <Container9 />
      <Container10 />
      <Container11 />
      <Container12 />
    </div>
  );
}

function Container13() {
  return <div className="absolute h-[300px] left-[1.78px] top-[50.67px] w-[778.667px]" data-name="Container" />;
}

function Icon16() {
  return (
    <div className="absolute left-[41.79px] size-[12px] top-[4.33px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2471b880} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p336b1100} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1e4c1300} id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[16.333px] relative shrink-0 w-[164.208px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-0 whitespace-nowrap">{`💡 Klik `}</p>
        <Icon16 />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[53.79px] not-italic text-[#6a7282] text-[12px] top-0 whitespace-nowrap">{` untuk insert gambar`}</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[15.986px] relative shrink-0 w-[96.194px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] whitespace-nowrap">0 / 50000 karakter</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex h-[33.222px] items-center justify-between left-[1.78px] pt-[0.889px] px-[16px] top-[350.67px] w-[778.667px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t-[0.889px] inset-0 pointer-events-none" />
      <Text />
      <Text1 />
    </div>
  );
}

function Cx() {
  return (
    <div className="h-[385.667px] relative rounded-[14px] shrink-0 w-full" data-name="Cx">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container7 />
        <Container13 />
        <Container14 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.778px] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[413.667px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Cx />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Mata Pelajaran *</p>
    </div>
  );
}

function Option() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option1() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option2() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option3() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option4() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option5() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option6() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option7() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option8() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option9() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option10() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option11() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option12() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option13() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option14() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option15() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option16() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option17() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option18() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option19() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option20() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option21() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option22() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option23() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option24() {
  return <div className="absolute left-[-264.89px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Dropdown() {
  return (
    <div className="bg-white h-[51.556px] relative rounded-[14px] shrink-0 w-full" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.778px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Option />
      <Option1 />
      <Option2 />
      <Option3 />
      <Option4 />
      <Option5 />
      <Option6 />
      <Option7 />
      <Option8 />
      <Option9 />
      <Option10 />
      <Option11 />
      <Option12 />
      <Option13 />
      <Option14 />
      <Option15 />
      <Option16 />
      <Option17 />
      <Option18 />
      <Option19 />
      <Option20 />
      <Option21 />
      <Option22 />
      <Option23 />
      <Option24 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute h-[16px] left-[16px] top-[24px] w-[15.097px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0972 16">
        <g id="Icon">
          <path d="M3.14525 8H11.952" id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2581" />
          <path d="M7.54861 3.59664V12.4034" id="Vector_2" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2581" />
        </g>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="bg-[#f3f4f6] h-[64px] relative rounded-[14px] shrink-0 w-full" data-name="Button">
      <Icon17 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[136.58px] not-italic text-[#364153] text-[16px] text-center top-[5.89px] w-[169px]">Tambah Mata Pelajaran Baru</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[151.556px] items-start left-0 top-0 w-[250.069px]" data-name="Container">
      <Label3 />
      <Dropdown />
      <Button19 />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Kelas *</p>
    </div>
  );
}

function Option25() {
  return <div className="absolute left-[-530.96px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Dropdown1() {
  return (
    <div className="bg-white h-[51.556px] relative rounded-[14px] shrink-0 w-full" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.778px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Option25 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[151.556px] items-start left-[266.07px] top-0 w-[250.069px]" data-name="Container">
      <Label4 />
      <Dropdown1 />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Semester *</p>
    </div>
  );
}

function Option26() {
  return <div className="absolute left-[-797.03px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option27() {
  return <div className="absolute left-[-797.03px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Option28() {
  return <div className="absolute left-[-797.03px] size-0 top-[-1137.63px]" data-name="Option" />;
}

function Dropdown2() {
  return (
    <div className="bg-white h-[51.556px] relative rounded-[14px] shrink-0 w-full" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.778px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Option26 />
      <Option27 />
      <Option28 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[151.556px] items-start left-[532.14px] top-0 w-[250.083px]" data-name="Container">
      <Label5 />
      <Dropdown2 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[151.556px] relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container17 />
      <Container18 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p338f2df0} id="Vector" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3b27f100} id="Vector_2" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2.11px] whitespace-nowrap">Publik</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] whitespace-nowrap">Semua orang bisa melihat catatan ini</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph2 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[44px] items-center left-0 top-0 w-[259.986px]" data-name="Container">
      <Icon18 />
      <Container22 />
    </div>
  );
}

function Container23() {
  return <div className="bg-white h-[24px] rounded-[29826200px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container" />;
}

function Button20() {
  return (
    <div className="absolute bg-[#5d5ce6] content-stretch flex flex-col h-[32px] items-start left-[674.67px] pl-[28px] pr-[4px] pt-[4px] rounded-[29826200px] top-[6px] w-[56px]" data-name="Button">
      <Container23 />
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Button20 />
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-[#f9fafb] h-[95.556px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.778px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col items-start pb-[1.778px] pt-[25.778px] px-[25.778px] relative size-full">
        <Container20 />
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_3208)" id="Icon">
          <path d={svgPaths.p24941500} id="Vector" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M16.6667 2.5V5.83333" id="Vector_2" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M18.3333 4.16667H15" id="Vector_3" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M3.33333 14.1667V15.8333" id="Vector_4" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M4.16667 15H2.5" id="Vector_5" stroke="var(--stroke-0, #5D5CE6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_3208">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2.11px] whitespace-nowrap">Ajukan ke Pakar</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] whitespace-nowrap">Dapatkan validasi dari pakar untuk meningkatkan kredibilitas</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph4 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[44px] items-center left-0 top-0 w-[407.444px]" data-name="Container">
      <Icon19 />
      <Container27 />
    </div>
  );
}

function Container28() {
  return <div className="bg-white h-[24px] rounded-[29826200px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container" />;
}

function Button21() {
  return (
    <div className="absolute bg-[#d1d5dc] content-stretch flex flex-col h-[32px] items-start left-[674.67px] pl-[4px] pr-[28px] pt-[4px] rounded-[29826200px] top-[6px] w-[56px]" data-name="Button">
      <Container28 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <Button21 />
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-gradient-to-r from-[rgba(255,209,102,0.1)] h-[95.556px] relative rounded-[14px] shrink-0 to-[rgba(93,92,230,0.1)] w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.778px] border-[rgba(255,209,102,0.3)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col items-start pb-[1.778px] pt-[25.778px] px-[25.778px] relative size-full">
        <Container25 />
      </div>
    </div>
  );
}

function Button22() {
  return (
    <div className="flex-[1_0_0] h-[59.556px] min-h-px min-w-px relative rounded-[14px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[1.778px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[192.78px] not-italic text-[#364153] text-[16px] text-center top-[15.67px] whitespace-nowrap">Batal</p>
      </div>
    </div>
  );
}

function Button23() {
  return (
    <div className="bg-gradient-to-b flex-[1_0_0] from-[#5d5ce6] h-[59.556px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] to-[#8b5cf6]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[190.71px] not-italic text-[16px] text-center text-white top-[15.67px] whitespace-nowrap">Publikasikan Catatan</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex gap-[16px] h-[75.556px] items-start pt-[16px] relative shrink-0 w-full" data-name="Container">
      <Button22 />
      <Button23 />
    </div>
  );
}

function Tx3() {
  return (
    <div className="h-[1318.958px] relative shrink-0 w-full" data-name="Tx">
      <div className="content-stretch flex flex-col gap-[24px] items-start pt-[32px] px-[32px] relative size-full">
        <Container3 />
        <Container4 />
        <Container6 />
        <Container15 />
        <Container19 />
        <Container24 />
        <Container29 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-white h-[1320.736px] left-[24px] rounded-[24px] top-[104px] w-[848px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[0.889px] relative rounded-[inherit] size-full">
        <Tx3 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.889px] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Tx16() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Tx">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-0 not-italic text-[#1c398e] text-[18px] top-[-1.11px] whitespace-nowrap">💡 Tips Membuat Catatan Berkualitas</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#193cb8] text-[14px]">• Gunakan judul yang jelas dan deskriptif</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#193cb8] text-[14px]">• Susun materi dengan struktur yang rapi</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#193cb8] text-[14px]">• Tambahkan contoh soal jika memungkinkan</p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#193cb8] text-[14px]">• Ajukan ke Pakar untuk mendapat feedback dan badge validasi</p>
    </div>
  );
}

function Tx17() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[92px] items-start relative shrink-0 w-full" data-name="Tx">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex flex-col gap-[8px] h-[178.556px] items-start left-[24px] pb-[1.778px] pt-[25.778px] px-[25.778px] rounded-[16px] top-[1448.74px] w-[848px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[1.778px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Tx16 />
      <Tx17 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[1627.292px] left-[208px] top-[144px] w-[896px]" data-name="Container">
      <Container1 />
      <Container2 />
      <Container30 />
    </div>
  );
}

function Tx() {
  return (
    <div className="h-[1819.292px] relative shrink-0 w-full" data-name="Tx" style={{ backgroundImage: "linear-gradient(125.798deg, rgba(93, 92, 230, 0.05) 0%, rgb(255, 255, 255) 50%, rgba(255, 209, 102, 0.05) 100%)" }}>
      <Bn2 />
      <Bn3 />
      <Container />
    </div>
  );
}

function Section() {
  return <div className="h-0 shrink-0 w-full" data-name="Section" />;
}

function O() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[799.111px] items-start left-0 top-0 w-[1312px]" data-name="o2">
      <Bn />
      <Bn1 />
      <Tx />
      <Section />
    </div>
  );
}

function GrammarlyDesktopIntegration() {
  return <div className="absolute left-0 size-0 top-[799.11px]" data-name="Grammarly-desktop-integration" />;
}

function Text2() {
  return (
    <div className="h-[28px] relative shrink-0 w-[11.542px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1.22px] whitespace-nowrap">B</p>
      </div>
    </div>
  );
}

function Bn5() {
  return (
    <div className="bg-gradient-to-b from-[#5d5ce6] relative rounded-[14px] shrink-0 size-[40px] to-[#8b5cf6]" data-name="bn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.014px] relative size-full">
        <Text2 />
      </div>
    </div>
  );
}

function Bn6() {
  return (
    <div className="h-[28px] relative shrink-0 w-[54.611px]" data-name="bn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="bg-clip-text font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[20px] text-[transparent] whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(93, 92, 230) 0%, rgb(139, 92, 246) 100%)" }}>
          Ba-Yu
        </p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[40px] relative shrink-0 w-[102.611px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Bn5 />
        <Bn6 />
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p275d2400} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p21a7e80} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Bn7() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="bn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.11px] whitespace-nowrap">Beranda</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-[40px] relative rounded-[14px] shrink-0 w-[119.778px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] relative size-full">
        <Icon20 />
        <Bn7 />
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pcddfd00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.5 17.5L13.9167 13.9167" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Bn8() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="bn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.11px] whitespace-nowrap">Jelajahi</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[40px] relative rounded-[14px] shrink-0 w-[113.403px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] relative size-full">
        <Icon21 />
        <Bn8 />
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_3276)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 10H13.3333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 6.66667V13.3333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_3276">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Bn9() {
  return (
    <div className="h-[24px] relative shrink-0 w-[33.139px]" data-name="bn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[16px] text-white top-[-2.11px] whitespace-nowrap">Buat</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="bg-gradient-to-b from-[#5d5ce6] h-[40px] relative rounded-[14px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0 to-[#8b5cf6] w-[93.139px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[16px] relative size-full">
        <Icon22 />
        <Bn9 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[40px] relative shrink-0 w-[342.319px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Link1 />
        <Link2 />
        <Link3 />
      </div>
    </div>
  );
}

function Bn10() {
  return (
    <div className="relative rounded-[29826200px] shrink-0 size-[32px]" data-name="bn">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[29826200px] size-full" src={imgBn} />
    </div>
  );
}

function Bn11() {
  return (
    <div className="h-[24px] relative shrink-0 w-[22.861px]" data-name="bn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.11px] whitespace-nowrap">Siti</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative rounded-[14px]" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[12px] relative size-full">
          <Bn10 />
          <Bn11 />
        </div>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[44px] relative shrink-0 w-[86.861px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Link4 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex h-[64px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Link />
      <Container32 />
      <Container33 />
    </div>
  );
}

function Bn4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col h-[64.889px] items-start left-0 pb-[0.889px] px-[40px] top-0 w-[1312px]" data-name="bn">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b-[0.889px] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Container31 />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[28px] relative shrink-0 w-[11.542px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[18px] text-white top-[-1.22px] whitespace-nowrap">B</p>
      </div>
    </div>
  );
}

function Bn13() {
  return (
    <div className="bg-gradient-to-b from-[#5d5ce6] relative rounded-[14px] shrink-0 size-[40px] to-[#8b5cf6]" data-name="bn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.014px] relative size-full">
        <Text3 />
      </div>
    </div>
  );
}

function Bn14() {
  return (
    <div className="h-[28px] relative shrink-0 w-[54.611px]" data-name="bn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="bg-clip-text font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[20px] text-[transparent] whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(93, 92, 230) 0%, rgb(139, 92, 246) 100%)" }}>
          Ba-Yu
        </p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="h-[40px] relative shrink-0 w-[102.611px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Bn13 />
        <Bn14 />
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p275d2400} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p21a7e80} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Bn15() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="bn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.11px] whitespace-nowrap">Beranda</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="h-[40px] relative rounded-[14px] shrink-0 w-[119.778px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] relative size-full">
        <Icon23 />
        <Bn15 />
      </div>
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pcddfd00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.5 17.5L13.9167 13.9167" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Bn16() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="bn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.11px] whitespace-nowrap">Jelajahi</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="h-[40px] relative rounded-[14px] shrink-0 w-[113.403px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] relative size-full">
        <Icon24 />
        <Bn16 />
      </div>
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_3276)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 10H13.3333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 6.66667V13.3333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_1_3276">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Bn17() {
  return (
    <div className="h-[24px] relative shrink-0 w-[33.139px]" data-name="bn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[16px] text-white top-[-2.11px] whitespace-nowrap">Buat</p>
      </div>
    </div>
  );
}

function Link8() {
  return (
    <div className="bg-gradient-to-b from-[#5d5ce6] h-[40px] relative rounded-[14px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0 to-[#8b5cf6] w-[93.139px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[16px] relative size-full">
        <Icon25 />
        <Bn17 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[40px] relative shrink-0 w-[342.319px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Link6 />
        <Link7 />
        <Link8 />
      </div>
    </div>
  );
}

function Bn18() {
  return (
    <div className="relative rounded-[29826200px] shrink-0 size-[32px]" data-name="bn">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[29826200px] size-full" src={imgBn} />
    </div>
  );
}

function Bn19() {
  return (
    <div className="h-[24px] relative shrink-0 w-[22.861px]" data-name="bn">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#4a5565] text-[16px] top-[-2.11px] whitespace-nowrap">Siti</p>
      </div>
    </div>
  );
}

function Link9() {
  return (
    <div className="flex-[1_0_0] h-[44px] min-h-px min-w-px relative rounded-[14px]" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[12px] relative size-full">
          <Bn18 />
          <Bn19 />
        </div>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[44px] relative shrink-0 w-[86.861px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Link9 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex h-[64px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Link5 />
      <Container35 />
      <Container36 />
    </div>
  );
}

function Bn12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col h-[64.889px] items-start left-0 pb-[0.889px] px-[40px] top-0 w-[1312px]" data-name="bn">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b-[0.889px] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Container34 />
    </div>
  );
}

export default function BuatCatatan() {
  return (
    <div className="bg-white relative size-full" data-name="Buat Catatan">
      <O />
      <GrammarlyDesktopIntegration />
      <Bn4 />
      <Bn12 />
    </div>
  );
}