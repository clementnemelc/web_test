import React, { useState, useEffect, useRef } from "react";
import {
  FlaskConical,
  Zap,
  ChevronRight,
  CheckCircle,
  Mail,
  MapPin,
  Menu,
  X,
  Factory,
  Microscope,
  ArrowRight,
  Globe,
  Monitor,
  Smartphone,
  ShieldCheck,
  Cpu,
  Leaf,
  Package,
  Layers,
  Settings,
  Wind,
  Sliders,
  PenTool,
  BarChart3,
  Info,
  Plane,
  Sun,
  Thermometer,
  ArrowDown,
  ChevronUp,
  ChevronDown,
  Activity,
  Database,
  List,
} from "lucide-react";

// ==========================================
// 1. 中央控制面板 (全域配置)
// ==========================================
const SITE_CONFIG = {
  branding: { name_zh: "越綾電材", name_en: "Silkonix" },
  contact: {
    email: "service@silkonix.tech",
    address: "浙江省餘姚市朗霞街道朗霞路2號",
  },
  theme: {
    heroTitle: "text-4xl md:text-6xl",
    sectionTitle: "text-3xl md:text-4xl",
    bodyText: "text-base md:text-lg",
    bubbleTitle: "text-base font-bold text-slate-900",
  },
  pageSections: {
    home: ["hero-sec", "about-sec", "bubble-sec"],
    products: ["prod-main"],
    quality: ["qual-main", "qual-smart"],
    custom: ["cust-main", "cust-lab"],
    contact: ["cont-main"],
  },
};

const IMAGES = {
  heroBg:
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000",
  productFabric:
    "https://images.unsplash.com/photo-1620647640243-7b566270632a?auto=format&fit=crop&q=80&w=800",
  productInjection:
    "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
  productComposite:
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
  customWire:
    "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800",
  factoryInterior: "/qa.png",
  rdLab: "/lab.png",
  // CSS Sprite 大圖路徑
  processSprites: "/process.png",
};

const LANG_DATA = {
  zh: {
    nav: {
      home: "首頁",
      products: "產品與解決方案",
      custom: "客製化服務",
      quality: "製程與產能",
      contact: "聯絡我們",
    },
    hero: {
      badge: "SilkoPly™ 電子級聚芳酯纖維布",
      title_pre: "輕量化趨勢首選",
      title_main: "基板客製化素材開發",
      desc: "受輕量化趨勢驅動，SilkoPly™ 是當今高頻高速複合材料基板成功的關鍵。我們團隊提供從紗線到織物成品的客製化服務。",
      btn_primary: "查看應用",
      btn_list: "產品列表",
    },
    home: {
      app_title: "關鍵應用領域",
      app_desc: "凡是涉及複合基板與元件輕量化需求的場景，都是我們的舞台。",
      app_1: "電路基板",
      app_1_desc: "CCL/ FCCL 核心基材",
      app_2: "載具應用",
      app_2_desc: "車載、航太與船舶輕量結構件",
      app_3: "機器人",
      app_3_desc: "傳動裝置與結構強化零組件",
    },
    about: {
      title: "關於越綾電材",
      philosophy_title: "企業理念",
      philosophy_desc:
        "電子材料是科技產品性能提升的基石。越綾電材透過產品創新與製程開發，致力於提供更輕、更強以及更低損耗的複合高分子纖維布。",
      service_title: "技術能力",
      service_1: "織物產品創新",
      service_1_desc: "配合客戶應用領域，研發織物與表面塗層材料。",
      service_2: "批次化量產服務",
      service_2_desc: "產線模組化，產能彈性化，滿足多樣化訂單需求。",
      service_3: "客製化開發",
      service_3_desc: "為客戶量身裁製織物產品，滿足終端精密的技術需求。",
    },
    products: {
      title: "產品與解決方案",
      subtitle: "全方位的複合聚芳酯纖維布供應體系",
      tab_fabric: "紗線原料",
      tab_injection: "胚布",
      tab_composite: "複合織物",
    },
    custom: {
      title: "客製化服務",
      desc: "Step 1~3 彈性搭配服務，量身訂製高強度或低介電需求。",
      subtitle: "專業客製能力",
      step_1: "紗線選擇",
      step_1_desc: "有機纖維、無機纖維、複合纖維",
      step_2: "編織工藝",
      step_2_desc: "平織、混紡",
      step_3: "功能塗層",
      step_3_desc: "耦合劑塗層、活性劑塗層",
    },
    quality: {
      title: "製程與產能",
      desc: "垂直整合體系，確保高品質一致性與供應穩定性。",
      section_process: "生產工藝流程",
      test_env_title: "量產模擬中心",
      test_env_desc: "模擬客戶端測試環境，量產前消除潛在風險。",
    },
  },
};

const BUBBLE_PRODUCTS = [
  {
    id: 1,
    name: "SilkoPly™ 纖維布",
    desc: "CCL/FCCL 應用\n高精密電子織物",
    img: IMAGES.productFabric,
  },
  {
    id: 2,
    name: "射出成型級材料",
    desc: "耐高溫連接器\n優異流動特性",
    img: IMAGES.productInjection,
  },
  {
    id: 3,
    name: "輕量化複合件",
    desc: "航空結構強化\n極致重量控制",
    img: IMAGES.productComposite,
  },
  {
    id: 4,
    name: "塗層開發服務",
    desc: "表面功能性改性\n絕緣與耐腐蝕",
    img: IMAGES.customWire,
  },
  {
    id: 5,
    name: "高頻低損耗基材",
    desc: "5G通訊應用\n訊號完整性保障",
    img: IMAGES.heroBg,
  },
];

const PRODUCTS_LIST = {
  fabric: [
    {
      id: "f1",
      name: "無機纖維紗線",
      params: { Denier: "20D ~ 400D" },
      desc: "成分：市售玻纖紗線、碳纖紗線",
      image: "/無機纖維紗線.png",
    },
    {
      id: "f2",
      name: " 有機纖維紗線",
      params: { Denier: "20D ~ 400D" },
      desc: "成分：市售LCP紗線、UHMPE紗線、PTFE紗線",
      image: "/有機纖維紗線.png",
    },
    {
      id: "f3",
      name: "有機無機複合纖維紗線",
      params: { Denier: "20D ~ 400D" },
      desc: "成分：自行開發的有機無機複合材料纖維紗線",
      image: "/自研混合紗線.png",
    },
  ],
  injection: [
    {
      id: "i1",
      name: "聚芳酯纖維布",
      params: { 布重: "20 g/m²", 布厚: "70 um" },
      desc: " 經紗與緯紗均為LCP纖維紗線，紗線丹數與編織密度可依客戶需求調整。",
      image: IMAGES.productFabric,
    },
    {
      id: "i2",
      name: "複合材料纖維布",
      params: { 布重: "30 g/m²", 布厚: "70 um" },
      desc: "經紗與緯紗均為有機無機複合材料紗線，紗線丹數與編織密度可依客戶需求調整",
      image: IMAGES.productInjection,
    },
    {
      id: "i3",
      name: "有機高分子混紡布",
      params: { 布重: "25 g/m²", 布厚: "100 um" },
      desc: "經紗與緯紗可選擇不同的有機高分子纖維紗線，紗線丹數與編織密度可依客戶需求調整。",
      image:
        "https://images.unsplash.com/photo-1528698725964-b5f7b88970ce?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "i4",
      name: "有機纖維無機纖維混紡布",
      params: { 布重: "35 g/m²", 布厚: "100 um" },
      desc: "經紗與緯紗可選擇不同的有機纖維紗線和無機纖維紗線，混合織成布面，紗線丹數與編織密度可依客戶需求調整。",
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400",
    },
  ],
  composite: [
    {
      id: "c1",
      name: "耦合劑塗層織物",
      params: { 布重: "TBD" },
      desc: "依據下游工序所需，預先在胚布表面塗布耦合劑，經烘乾定型後出貨。",
      image: IMAGES.productComposite,
    },
    {
      id: "c2",
      name: "活性劑塗層織物",
      params: { 布重: "TBD" },
      desc: "依據下游應用場域的需求，預先在織物表面塗布活性劑，經烘乾定型後出貨",
      image:
        "https://images.unsplash.com/photo-1621252179027-94459d27d3ee?auto=format&fit=crop&q=80&w=400",
    },
  ],
};

// ==========================================
// 關鍵修改：加入 Sprite 座標系統 (5x2 網格)
// ==========================================
const PROCESS_STEPS = [
  {
    id: 1,
    title: "原料 (線材)",
    icon: <Layers size={20} />,
    detail: "精選聚芳酯初始紗線，確保物理性能穩定。",
    spritePos: "0% 0%",
    cleanroom: false,
  },
  {
    id: 2,
    title: "整經",
    icon: <Settings size={20} />,
    detail: "將紗線平行捲繞至經軸，精準控制張力。",
    spritePos: "25% 0%",
    cleanroom: false,
  },
  {
    id: 3,
    title: "上漿",
    icon: <FlaskConical size={20} />,
    detail: "塗覆保護漿料增加紗線強度，利於後續織造。",
    spritePos: "50% 0%",
    cleanroom: false,
  },
  {
    id: 4,
    title: "穿線",
    icon: <Cpu size={20} />,
    detail: "精密穿過綜片與筘片，決定織物最終組織。",
    spritePos: "75% 0%",
    cleanroom: false,
  },
  {
    id: 5,
    title: "梭織",
    icon: <Factory size={20} />,
    detail: "高速噴氣織機交織，實現極致布面平整度。",
    spritePos: "100% 0%",
    cleanroom: false,
  },
  {
    id: 6,
    title: "退漿",
    icon: <Wind size={20} />,
    detail: "於無塵環境洗去漿料，保證材料純淨度。",
    spritePos: "0% 100%",
    cleanroom: true,
  },
  {
    id: 7,
    title: "烘乾",
    icon: <Sun size={20} />,
    detail: "恆溫熱烘處理，確保尺寸安定性與定型。",
    spritePos: "25% 100%",
    cleanroom: true,
  },
  {
    id: 8,
    title: "塗布",
    icon: <PenTool size={20} />,
    detail: "依需求塗覆導電、絕緣或增強偶合性塗層。",
    spritePos: "50% 100%",
    cleanroom: true,
  },
  {
    id: 9,
    title: "品檢",
    icon: <Microscope size={20} />,
    detail: "透過 AOI 自動光學檢測與人工覆檢確保品質。",
    spritePos: "75% 100%",
    cleanroom: true,
  },
  {
    id: 10,
    title: "封裝 (布料)",
    icon: <Package size={20} />,
    detail: "Class 100 環境下真空封裝，防潮防塵。",
    spritePos: "100% 100%",
    cleanroom: true,
  },
];

// ==========================================
// 2. 基礎組件
// ==========================================
const SilkonixLogo = ({ className = "h-8 md:h-10" }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <img
      src="/logo.png"
      alt="Silkonix Logo"
      className="h-full w-auto object-contain"
      onError={(e) => {
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "flex";
      }}
    />
    <div
      style={{ display: "none" }}
      className="flex flex-col justify-center text-left text-slate-900"
    >
      <span className="font-bold text-lg leading-none tracking-wide">
        越綾電材
      </span>
      <span className="text-[10px] font-bold text-slate-500 uppercase mt-0.5 tracking-widest italic">
        Silkonix
      </span>
    </div>
  </div>
);

const ProductBubbleWall = () => {
  const displayList = [...BUBBLE_PRODUCTS, ...BUBBLE_PRODUCTS];
  return (
    <div className="py-10 bg-slate-50 overflow-hidden relative">
      <div className="flex animate-scroll-left space-x-12 px-4 hover:[animation-play-state:paused]">
        {displayList.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="relative flex-shrink-0 group/bubble"
          >
            <div className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-white shadow-lg border border-slate-100 overflow-hidden transition-all duration-700 group-hover/bubble:scale-110 group-hover/bubble:border-blue-400 flex flex-col items-center justify-start relative p-2">
              <div className="w-full h-full rounded-full overflow-hidden transition-all duration-700 transform group-hover/bubble:-translate-y-12 group-hover/bubble:scale-[0.65] origin-center mt-2">
                <img
                  src={item.img}
                  className="w-full h-full object-cover rounded-full"
                  alt={item.name}
                />
              </div>
              <div className="absolute bottom-8 w-full px-6 text-center opacity-0 group-hover/bubble:opacity-100 transition-all duration-700 transform translate-y-4 group-hover/bubble:translate-y-0">
                <h4 className={SITE_CONFIG.theme.bubbleTitle}>{item.name}</h4>
                <p className="text-blue-600 text-[10px] font-semibold whitespace-pre-line mt-1.5">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-scroll-left { animation: scroll-left 45s linear infinite; }`,
        }}
      />
    </div>
  );
};

// ==========================================
// 3. 子分頁組件
// ==========================================

const HomePage = ({ text, setCurrentPage }) => {
  const scrollInsideHome = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <section
        id="hero-sec"
        className="snap-start relative bg-slate-900 h-screen flex items-center text-left text-white overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={IMAGES.heroBg}
            className="w-full h-full object-cover opacity-20"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/70 to-slate-900"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold mb-6">
              {text.hero.badge}
            </div>
            <h1
              className={`${SITE_CONFIG.theme.heroTitle} font-extrabold mb-6 leading-tight`}
            >
              {text.hero.title_pre}
              <br />
              <span className="text-blue-400">{text.hero.title_main}</span>
            </h1>
            <p
              className={`${SITE_CONFIG.theme.bodyText} text-slate-300 mb-10 max-w-2xl leading-relaxed`}
            >
              {text.hero.desc}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => scrollInsideHome("bubble-sec")}
                className="bg-blue-600 px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-blue-500 transition-all flex items-center gap-2 group"
              >
                {text.hero.btn_primary}{" "}
                <ArrowDown
                  size={18}
                  className="group-hover:translate-y-1 transition-transform"
                />
              </button>
              <button
                onClick={() => setCurrentPage("products")}
                className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-xl font-bold border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 group"
              >
                {text.hero.btn_list}{" "}
                <List
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about-sec"
        className="snap-start min-h-screen py-16 px-6 bg-white flex items-center overflow-hidden border-b"
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2 text-left animate-in fade-in slide-in-from-left-12 duration-1000 text-slate-900">
              <h1 className="text-3xl md:text-5xl font-bold mb-8">
                {text.about.title}
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {text.about.philosophy_desc}
              </p>
              <div className="bg-blue-50 p-6 rounded-2xl border-l-8 border-blue-500 shadow-sm">
                <h4 className="font-bold text-blue-900 mb-2">
                  {text.about.philosophy_title}
                </h4>
                <p className="italic text-blue-800 text-sm">
                  "落實創新，深耕服務，越綾電材賦能客戶提升其終端產品性能。"
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-4 animate-in fade-in slide-in-from-right-12 duration-1000 text-slate-900">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex gap-5 p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md transition-all text-left"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-600 text-white">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">
                      {text.about[`service_${i}`]}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {text.about[`service_${i}_desc`]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="bubble-sec"
        className="snap-start py-20 min-h-screen bg-slate-50 flex flex-col justify-center overflow-hidden"
      >
        <div className="container mx-auto px-6 mb-12 text-center text-slate-900 animate-in fade-in duration-1000">
          <h2 className={SITE_CONFIG.theme.sectionTitle}>
            {text.home.app_title}
          </h2>
          <p className="text-slate-500 mt-2 text-sm italic">
            {text.home.app_desc}
          </p>
        </div>
        <ProductBubbleWall />
      </section>
    </div>
  );
};

const ProductsPage = ({ text, activeTab, setActiveTab }) => (
  <div className="w-full">
    <section
      id="prod-main"
      className="snap-start min-h-screen py-24 px-6 bg-slate-50 text-slate-900"
    >
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {text.products.title}
        </h1>
        <p className="text-slate-500 text-lg mb-12">{text.products.subtitle}</p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {Object.keys(PRODUCTS_LIST).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === key ? "bg-blue-600 text-white shadow-lg scale-105" : "bg-white text-slate-500 border"}`}
            >
              {text.products[`tab_${key}`]}
            </button>
          ))}
        </div>

        <div className="grid gap-8 max-w-6xl mx-auto">
          {(PRODUCTS_LIST[activeTab] || []).map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row border border-slate-100 animate-in fade-in duration-700 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
                <img
                  src={p.image}
                  className="w-full h-full object-cover"
                  alt={p.name}
                />
              </div>
              <div className="md:w-3/5 p-12 flex flex-col justify-center text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {p.name}
                </h3>
                <p className="text-slate-600 mb-6">{p.desc}</p>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(p.params || {}).map(([k, v]) => (
                    <div
                      key={k}
                      className="px-3 py-1 bg-slate-50 border rounded-lg text-xs text-slate-500"
                    >
                      <b>{k}:</b> {v}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);
const QualityPage = ({ text, hoverStepId, setHoverStepId }) => (
  <div className="w-full">
    <section
      id="qual-main"
      className="snap-start min-h-screen py-24 px-6 bg-white text-slate-900"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {text.quality.title}
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            {text.quality.desc}
          </p>
        </div>

        <div className="text-left" onMouseLeave={() => setHoverStepId(null)}>
          <h2 className="text-2xl font-bold mb-12 border-l-4 border-slate-800 pl-4">
            {text.quality.section_process}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {PROCESS_STEPS.slice(0, 5).map((step) => (
              <div key={step.id} className="relative group">
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-[100] transition-all duration-300 pointer-events-none ${hoverStepId === step.id ? "opacity-100 translate-y-0 visible scale-100" : "opacity-0 translate-y-4 invisible scale-95"}`}
                >
                  {/* --- 畫質優化修改點 --- */}
                  <div
                    className="aspect-square w-full bg-slate-100"
                    style={{
                      backgroundImage: `url(${IMAGES.processSprites})`,
                      backgroundSize: "500% 200%",
                      backgroundPosition: step.spritePos,
                      backgroundRepeat: "no-repeat",
                      /* 關鍵 CSS：提升縮放畫質 */
                      imageRendering: "-webkit-optimize-contrast",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "translateZ(0)",
                    }}
                  />

                  <div className="p-4 text-left">
                    <h3 className="text-base font-bold mb-1 text-blue-600">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-[10px] leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-slate-200 shadow-sm"></div>
                </div>

                <div
                  onMouseEnter={() => setHoverStepId(step.id)}
                  className={`bg-white p-6 rounded-2xl border transition-all h-full flex flex-col items-center cursor-help ${hoverStepId === step.id ? "border-blue-500 shadow-lg ring-2 ring-blue-50 scale-105 z-20" : "border-slate-100"}`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${hoverStepId === step.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-[9px] font-bold text-slate-300 mb-1 uppercase">
                    Step 0{step.id}
                  </span>
                  <h4 className="font-bold text-xs text-center">
                    {step.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center my-8">
            <div className="h-4 w-px bg-gradient-to-b from-slate-200 to-blue-200"></div>
            <div className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[9px] font-bold flex items-center gap-2">
              <Wind size={10} /> Class 1000 無塵作業區
            </div>
            <div className="h-4 w-px bg-gradient-to-b from-blue-200 to-blue-400"></div>
          </div>

          <div className="bg-blue-50/30 p-6 rounded-[2.5rem] border border-blue-100 shadow-inner">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {PROCESS_STEPS.slice(5, 10).map((step) => (
                <div key={step.id} className="relative group">
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-[100] transition-all duration-300 pointer-events-none ${hoverStepId === step.id ? "opacity-100 translate-y-0 visible scale-100" : "opacity-0 translate-y-4 invisible scale-95"}`}
                  >
                    {/* --- 畫質優化修改點 --- */}
                    <div
                      className="aspect-square w-full bg-slate-100"
                      style={{
                        backgroundImage: `url(${IMAGES.processSprites})`,
                        backgroundSize: "500% 200%",
                        backgroundPosition: step.spritePos,
                        backgroundRepeat: "no-repeat",
                        imageRendering: "-webkit-optimize-contrast",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "translateZ(0)",
                      }}
                    />

                    <div className="p-4 text-left">
                      <h3 className="text-base font-bold mb-1 text-blue-600">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 text-[10px] leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-slate-200 shadow-sm"></div>
                  </div>
                  <div
                    onMouseEnter={() => setHoverStepId(step.id)}
                    className={`bg-white p-4 rounded-2xl border transition-all h-full flex flex-col items-center cursor-help ${hoverStepId === step.id ? "border-blue-500 shadow-lg ring-2 ring-blue-50 scale-105 z-20" : "border-blue-50"}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${hoverStepId === step.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}
                    >
                      {step.icon}
                    </div>
                    <span className="text-[9px] font-bold text-blue-300 mb-1 uppercase">
                      Step 0{step.id}
                    </span>
                    <h4 className="font-bold text-xs text-blue-900 text-center">
                      {step.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      id="qual-smart"
      className="snap-start min-h-screen py-24 px-6 bg-slate-50 flex items-center text-slate-900"
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 text-left animate-in fade-in duration-1000">
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-bold mb-6">
            ISO 9000 & 14000 認證工廠
          </div>
          <h2 className="text-4xl font-bold mb-8">智慧工廠即時監控</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            {text.quality.test_env_desc}
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl border shadow-sm text-left">
              <Database className="text-blue-500 mb-2" size={32} />
              <h4 className="font-bold">LIMS 數據溯源</h4>
              <p className="text-xs text-slate-400">完整生產履歷與品保紀錄</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border shadow-sm text-left">
              <ShieldCheck className="text-emerald-500 mb-2" size={32} />
              <h4 className="font-bold">CIS 自動檢測</h4>
              <p className="text-xs text-slate-400">AOI 自動檢測覆蓋率 100%</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <img
            src={IMAGES.factoryInterior}
            className="rounded-[3rem] shadow-2xl"
            alt="Factory"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800";
            }}
          />
        </div>
      </div>
    </section>
  </div>
);

const CustomPage = ({ text }) => (
  <div className="w-full">
    <section
      id="cust-main"
      className="snap-start min-h-screen py-24 px-6 bg-slate-900 text-white flex items-center overflow-hidden"
    >
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {text.custom.title}
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-20">
          {text.custom.desc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-10 rounded-3xl bg-slate-800/50 border border-slate-700 hover:border-blue-500 transition-all text-left group"
            >
              <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 font-bold text-xl group-hover:scale-110 transition-transform">
                0{i}
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {text.custom[`step_${i}`]}
              </h3>
              <p className="text-slate-500 leading-relaxed">
                {text.custom[`step_${i}_desc`]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section
      id="cust-lab"
      className="snap-start min-h-screen py-24 px-6 bg-white flex items-center overflow-hidden"
    >
      <div className="container mx-auto flex flex-col lg:flex-row-reverse items-center gap-16 text-slate-900">
        <div className="lg:w-1/2 text-left animate-in fade-in duration-1000">
          <h2 className="text-4xl font-bold mb-8">協同開發實驗室支援</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            自有應用實驗室、化學分析實驗室與物理測試實驗室，配備專業儀器設備與技術團隊，提供客戶材料性能測試、失效分析與應用驗證服務。
            我們不僅是材料供應商，更是您的研發夥伴。針對特殊應用場景提供
            Step-by-Step 的材料改性建議與實測驗證，縮短開發週期。
          </p>
          <div className="flex gap-10">
            <div className="text-center">
              <span className="block text-4xl font-extrabold text-blue-600">
                5 days
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                快速打樣
              </span>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <img
            src={IMAGES.rdLab}
            className="rounded-[3rem] shadow-2xl"
            alt="Lab"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800";
            }}
          />
        </div>
      </div>
    </section>
  </div>
);

const ContactPage = ({ text }) => (
  <div className="w-full text-slate-900">
    <section
      id="cont-main"
      className="snap-start min-h-screen py-24 px-6 bg-slate-900 flex items-center"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="text-white text-left animate-in slide-in-from-left-12 duration-1000">
          <h2 className="text-5xl font-bold mb-8">聯絡我們</h2>
          <p className="text-slate-400 text-lg mb-12">
            專屬工程團隊為您提供材料應用與設計建議。
          </p>
          <div className="space-y-8">
            <div className="flex gap-5 items-center">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-left">
                  電子郵箱
                </p>
                <p className="font-bold text-xl text-left">
                  {SITE_CONFIG.contact.email}
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-left">
                  工廠位置
                </p>
                <p className="font-bold text-sm text-slate-300 text-left whitespace-pre-line">
                  {SITE_CONFIG.contact.address}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl animate-in slide-in-from-right-12 duration-1000">
          <form className="space-y-4 text-left">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase">
                客戶姓名
              </label>
              <input
                className="w-full p-2.5 bg-slate-50 rounded-lg mt-1 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 border"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase">
                電子郵箱
              </label>
              <input
                className="w-full p-2.5 bg-slate-50 rounded-lg mt-1 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 border"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase">
                留言內容
              </label>
              <textarea
                className="w-full p-2.5 bg-slate-50 rounded-lg mt-1 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 border"
                rows="3"
                placeholder="請詳述您的材料應用需求"
              />
            </div>
            <button className="w-full bg-blue-600 text-white font-extrabold py-3.5 rounded-xl shadow-lg hover:bg-blue-700 transition-all active:scale-[0.98] mt-2">
              送出技術諮詢申請
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
);

// ==========================================
// 4. 網站主容器
// ==========================================
const SilkonixSite = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [activeTab, setActiveTab] = useState("fabric");
  const [hoverStepId, setHoverStepId] = useState(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const scrollerRef = useRef(null);

  const text = LANG_DATA.zh;
  const sections = SITE_CONFIG.pageSections[currentPage] || [];

  const scrollToSection = (index) => {
    if (index < 0 || index >= sections.length) return;
    const targetId = sections[index];
    const element = document.getElementById(targetId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target.id);
            if (index !== -1) setCurrentSectionIndex(index);
          }
        });
      },
      { root: scroller, threshold: 0.55 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [currentPage, sections]);

  useEffect(() => {
    if (scrollerRef.current)
      scrollerRef.current.scrollTo({ top: 0, behavior: "instant" });
    setCurrentSectionIndex(0);
  }, [currentPage]);

  return (
    <div className="flex flex-col h-screen overflow-hidden text-slate-900 bg-white font-sans">
      <nav className="h-16 md:h-20 bg-white/95 backdrop-blur-md z-[100] border-b shadow-sm flex-shrink-0">
        <div className="container mx-auto px-6 h-full flex justify-between items-center text-slate-900">
          <div
            className="cursor-pointer"
            onClick={() => setCurrentPage("home")}
          >
            <SilkonixLogo />
          </div>
          <div className="hidden lg:flex items-center gap-8 font-bold">
            {Object.entries(text.nav).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCurrentPage(key)}
                className={`text-sm transition-all ${currentPage === key ? "text-blue-600 underline underline-offset-8 decoration-2" : "hover:text-blue-600"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 側邊導航鈕 */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[200]">
        <button
          onClick={() => scrollToSection(currentSectionIndex - 1)}
          disabled={currentSectionIndex === 0}
          className={`p-3 rounded-full bg-white shadow-xl border transition-all ${currentSectionIndex === 0 ? "opacity-20 cursor-not-allowed" : "hover:bg-blue-600 hover:text-white active:scale-90 text-slate-900"}`}
        >
          <ChevronUp size={20} />
        </button>
        <div className="flex flex-col gap-2 items-center py-2">
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(i)}
              className={`w-1.5 rounded-full transition-all duration-500 ${currentSectionIndex === i ? "bg-blue-600 h-8 shadow-lg" : "bg-slate-300 h-1.5 hover:bg-slate-400"}`}
            ></button>
          ))}
        </div>
        <button
          onClick={() => scrollToSection(currentSectionIndex + 1)}
          disabled={currentSectionIndex === sections.length - 1}
          className={`p-3 rounded-full bg-white shadow-xl border transition-all ${currentSectionIndex === sections.length - 1 ? "opacity-20 cursor-not-allowed" : "hover:bg-blue-600 hover:text-white active:scale-90 text-slate-900"}`}
        >
          <ChevronDown size={20} />
        </button>
      </div>

      <main
        ref={scrollerRef}
        className="flex-grow overflow-y-auto snap-y snap-mandatory scroll-smooth pt-0 bg-white"
      >
        <div key={currentPage}>
          {currentPage === "home" && (
            <HomePage text={text} setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "products" && (
            <ProductsPage
              text={text}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}
          {currentPage === "quality" && (
            <QualityPage
              text={text}
              hoverStepId={hoverStepId}
              setHoverStepId={setHoverStepId}
            />
          )}
          {currentPage === "custom" && <CustomPage text={text} />}
          {currentPage === "contact" && <ContactPage text={text} />}
        </div>
        <footer className="snap-start bg-slate-950 text-slate-600 py-16 px-6 text-center border-t border-slate-900 flex-shrink-0">
          <div className="container mx-auto">
            <div className="mb-8 opacity-20 grayscale flex justify-center">
              <SilkonixLogo />
            </div>
            <p className="text-[9px] tracking-widest opacity-40 uppercase font-medium">
              © 2026 {SITE_CONFIG.branding.name_en} Materials Co., Ltd. Global
              Engineering Partner.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      <SilkonixSite />
    </div>
  );
}
