/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * MASTERPIECE IN PROGRESS - Virtual online art exhibition and Museum guide
 * Fully redesigned to fulfill exact design reference specifications.
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  Home, 
  BookOpen, 
  Sparkles, 
  Bookmark, 
  RotateCcw,
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Compass, 
  MapPin, 
  Layers,
  Heart,
  Calendar,
  Waves,
  ArrowRight
} from "lucide-react";

// Web Audio API Synthesizer and Audio Effects Engine
class InteractiveSynth {
  private ctx: AudioContext | null = null;
  private droneOscs: OscillatorNode[] = [];
  private droneGain: GainNode | null = null;
  private chimeTimeout: any = null;
  public isBgmPlaying: boolean = false;
  private masterVolume: number = 0.3;

  constructor() {}

  startBGM() {
    if (this.isBgmPlaying) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();
    this.isBgmPlaying = true;

    // Create soothing stereo master drone gain
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    this.droneGain.gain.linearRampToValueAtTime(this.masterVolume * 0.2, this.ctx.currentTime + 3.0);
    this.droneGain.connect(this.ctx.destination);

    // Deep warm earth tones (G major spiritual chord G2 - D3 - G3 - B3)
    const tones = [98.00, 146.83, 196.00, 246.94];
    tones.forEach((freq, index) => {
      if (!this.ctx || !this.droneGain) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.detune.setValueAtTime((index - 1.5) * 3, this.ctx.currentTime); // Chorus micro-tuning

      oscGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.droneGain);
      osc.start();
      this.droneOscs.push(osc);
    });

    // Schedule peaceful celestial chimes
    const scheduleChime = () => {
      if (!this.isBgmPlaying || !this.ctx) return;
      
      const pentatonic = [392.00, 493.88, 587.33, 783.99, 987.77]; // G4, B4, D5, G5, B5 meditation scale
      const randomTone = pentatonic[Math.floor(Math.random() * pentatonic.length)];

      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();

      chimeOsc.type = "sine";
      chimeOsc.frequency.setValueAtTime(randomTone, this.ctx.currentTime);

      chimeGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
      chimeGain.gain.linearRampToValueAtTime(this.masterVolume * 0.1, this.ctx.currentTime + 0.1);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 4.0);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);

      chimeOsc.start();
      chimeOsc.stop(this.ctx.currentTime + 4.2);

      this.chimeTimeout = setTimeout(scheduleChime, 7000 + Math.random() * 8000);
    };

    this.chimeTimeout = setTimeout(scheduleChime, 2500);
  }

  stopBGM() {
    this.isBgmPlaying = false;
    if (this.chimeTimeout) clearTimeout(this.chimeTimeout);
    
    if (this.droneGain && this.ctx) {
      try {
        this.droneGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.5);
      } catch (e) {}
    }

    setTimeout(() => {
      this.droneOscs.forEach(o => {
        try { o.stop(); } catch(e) {}
      });
      if (this.ctx) {
        try { this.ctx.close(); } catch(e) {}
      }
      this.ctx = null;
      this.droneOscs = [];
    }, 1600);
  }

  // Pure glass sacred chime played instantly on interactions
  playGlassChime() {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    try {
      const tempCtx = this.ctx || new AudioContextClass();
      
      // High frequency glass chime
      const osc1 = tempCtx.createOscillator();
      const osc2 = tempCtx.createOscillator();
      const gainNode = tempCtx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(880, tempCtx.currentTime); // A5 reference
      
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(1320, tempCtx.currentTime); // E6 harmonic fifth
      
      gainNode.gain.setValueAtTime(0.0, tempCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.12, tempCtx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, tempCtx.currentTime + 2.0);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(tempCtx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(tempCtx.currentTime + 2.1);
      osc2.stop(tempCtx.currentTime + 2.1);
    } catch (e) {
      console.warn("Glass chime error:", e);
    }
  }
}

// Global Static Data to perfectly match target designs
const IMAGES = {
  elephantHero: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=800", // majestic vertical sandstones
  meatStone: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=800", // red polished Jasper layers
  grandmaStone: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?q=80&w=800", // textured aged rock
  riverValley: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800", // watercolor-like misty woodland stream
  rocks: [
    "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=800", // Elephant
    "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800", // Eagle
    "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=800", // Camel
    "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=800", // Amethyst Geode
    "https://images.unsplash.com/photo-1502481851512-e9e2529bbbf9?q=80&w=800", // Fossil
    "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=800"  // Meat Jasper
  ]
};

interface ClassicStone {
  title: string;
  sub: string;
  desc: string;
  img: string;
}

const CLASSIC_STONES: ClassicStone[] = [
  {
    title: "肉形石 (Meat Jasper)",
    sub: "清代宮廷巧雕珍品 • 人與美石的對話",
    desc: "一塊渾然天成的碧石瑪瑙，工匠敏銳捕捉其深淺交錯的水平層理，由上至下染出醬油滷汁般的潤澤光斑。最完美之處在於其頂部細密的毛細孔極為神似剛起鍋的東坡肉。這是大自然對人類無限智慧的啟迪，昭示著原石與刻琢的極致融合。",
    img: IMAGES.meatStone
  },
  {
    title: "歲月／老奶奶石 (Grandmother)",
    sub: "內蒙古蘇宏圖戈壁瑪瑙 • 億萬年星霜刻蝕",
    desc: "歷經數億年地殼運動、強烈風沙磨礪與劇烈晝夜溫差。石表自然形成了眼窩深嵌、額骨突出的老者面容，髮絲與皺紋歷歷在目。這是一尊完全由歲月與自然親手磨礪出的永恆雕塑，將風霜和智慧凝固在岩石之中。",
    img: IMAGES.grandmaStone
  }
];

interface StoryStone {
  id: number;
  name: string;
  tagline: string;
  desc: string;
  reflection: string[];
  img: string;
}

const STORY_STONES: StoryStone[] = [
  {
    id: 1,
    name: "大象石",
    tagline: "尋找你真正的價值吧！",
    desc: "從一般角度看，牠不過是一塊在荒野中經受風霜、起伏不平的不起眼巨石。但只要我們換個位置，從某個特定、正確的核心角度重新端詳，卻能驚喜地看見一隻昂首甩鼻、生動無比的宏偉大象形象。這件天然傑作啟迪我們：不論看人生、萬物還是自己，評價完全取決於你選擇站立的視角。",
    reflection: [
      "在一言一行或面臨選擇時，你是否常因他人的單一評價而懷疑自我的價值？",
      "如何站在造物主的愛與更寬廣的視角上，重新發掘出自己靈魂最棒的卓越形象？"
    ],
    img: IMAGES.rocks[0]
  },
  {
    id: 2,
    name: "老鷹石",
    tagline: "展翅翱翔於崇山高空！",
    desc: "這塊奇石形如一隻收翼歛羽、傲然兀立在陡峭絕壁頂端的雄鷹，正眺望著不可知的遠方。哪怕被狂風拍打、被冰雪覆蓋，牠依舊在等待最佳的風勢，隨時拍擊厚重的翅翼，將天地踏在足下。牠用挺拔的身軀告訴人們：生命的高度取決於我們內心燃燒的意志與格局。",
    reflection: [
      "回顧至今面臨的低谷與瓶頸，你是否能像老鷹一樣，站在高處重燃勇氣，俯瞰風浪？",
      "當時代的寒冬與考驗來臨時，你是否做好了磨煉信念羽翼的準備，等待隨風翱翔？"
    ],
    img: IMAGES.rocks[1]
  },
  {
    id: 3,
    name: "駱駝石",
    tagline: "負重致遠的堅毅旅人",
    desc: "牠神似一隻跪伏在滾滾風沙、茫茫戈壁之中的健碩駱駝，雙峰高聳，溫順而敦實。駱駝背上承載著沉重的旅人背囊，忍受著烈日與缺水的煎熬，仍然踏踏實實踏出每一步，抵達綠洲。這顆奇石象徵著生命的造就離不開擔當，而擔當與負重正雕琢出靈魂的沉穩跟大器。",
    reflection: [
      "面臨看似無休止的漫長考驗或日常繁重任務時，你選擇的是怨懟還是視為磨修的契機？",
      "你是否能明白：此刻默默承載的責任和重擔，正在一點一滴把你塑造成一個可以託付宏大福氣的偉大形象？"
    ],
    img: IMAGES.rocks[2]
  },
  {
    id: 4,
    name: "聚寶盆",
    tagline: "內在發光的寶藏",
    desc: "外貌不過是一顆樸實、粗糙、甚至帶著厚重泥沙的平凡戈壁原石，沒有半分引人注目的特徵。可一旦被切削開剖面，內裡卻蘊藏著流光溢彩、令人屏息的瑰麗紫色瑪瑙與璀璨奪目的水晶簇。牠對我們發出無聲的呼喚：休要被外在的面紗遮蔽。真正寶貴的，是靈魂深處被琢磨並修造出的美麗特質與良善。",
    reflection: [
      "我們是否常因不起眼的外表而自餒？如何把注意力挪向自我開發與修築真善美的內在上？",
      "在人生與環境中，你是否願意投入計畫性的造就，好讓內心與精神爆發出萬倍的光芒？"
    ],
    img: IMAGES.rocks[3]
  },
  {
    id: 5,
    name: "鯡魚石",
    tagline: "魚躍龍門的永恆生命力",
    desc: "長年沉潛於最冰冷深邃洋流中的生命痕跡，被完好不朽地拓印於這塊青灰岩石之上。那是魚兒在面對激流與狂潮時，竭盡所有靈魂氣力迎風一躍、擺尾向著光明騰空的優美姿態。牠象徵著戰勝沉寂的『復活精神』——即使四周寒冷一片，也能使內在念頭與信仰重新復活，走向高層次生活。",
    reflection: [
      "當周遭環境如同冰冷死水，你是否仍有勇氣和信心打破現狀、使自己昏沉的心靈復活起來？",
      "如何能在最平凡的每日生活裡，跳脫舊有不好的習慣習慣，向著美好的大方向躍開？"
    ],
    img: IMAGES.rocks[4]
  },
  {
    id: 6,
    name: "肉形石",
    tagline: "經歷雕琢的極致典範",
    desc: "天然碧石條理分明，經過工匠高超的順理巧雕：為肌理施色、為油脂開孔，將一塊冰冷頑固的石頭變化成了名動海內、令人讚不絕口的無價奇珍。這啟示著：不論多麼不完美的人或天生原石，一旦接受完美的管理與持之以恆的磨修實踐，就能實現超乎想像的命運重塑，彰顯完美榮耀。",
    reflection: [
      "好山、好水、好亭子，世上並無十全十美的地方。你是否願意動手『修造』與『開發』自己？",
      "人越是有秩序與計畫地造就、栽培靈與內心世界，就能使用得比未造就前更有價值千萬倍！"
    ],
    img: IMAGES.rocks[5]
  }
];

interface Poem {
  id: number;
  title: string;
  frameTitle: string;
  fullText: string;
  scripture: string;
}

const POEMS: Poem[] = [
  {
    id: 1,
    frameTitle: "在風中 仍舊堅定",
    title: "《在風中 仍舊堅定》",
    fullText: "不論風吹得有多麼猛烈，\n深藏在岩石之中的樹根，\n依然頑強地緊抓大地，不曾有半分動搖。\n你要相信：你的內在意志也要如此，\n在生活的碎石、風沙和驚濤駭浪的挑戰中，\n昂首微笑，依然懷抱希望，仍舊堅定不移。",
    scripture: "── 心靈的奠樹"
  },
  {
    id: 2,
    frameTitle: "祢的愛 永不停止",
    title: "《祢的愛 永不停止》",
    fullText: "祢的愛永不改變，\n在我最軟弱無助的時候，\n祢的雙手仍緊緊將我摟入懷中。\n在我最迷失方向、四處徬徨的時候，\n祢用那溫煦如春風的呼喚，\n牽引我重新回到充滿光芒的港灣。\n祢的愛，地老天荒，永不停止。",
    scripture: "── 耶利米書 31:3"
  },
  {
    id: 3,
    frameTitle: "我知道誰 掌管明天",
    title: "《我知道誰掌管明天》",
    fullText: "黑夜雖令人戰慄迷茫，\n但璀璨的朝霞終究吹響了凱旋的黎明。\n不要為未曾謀面的明天而充滿惶恐和憂慮，\n因為那雙溫柔雕琢繁星的萬物巨手，\n早已為你預備了最芬芳溫暖的晨光。\n我深深知道，是誰在溫柔掌管著明天。",
    scripture: "── 信心之行"
  },
  {
    id: 4,
    frameTitle: "在曠野中 我不孤單",
    title: "《在曠野中 我不孤單》",
    fullText: "哪怕此刻孤身行走在乾涸漫長、枯寂無聲的曠野，\n烈日炙烤著，身旁看來荒涼一無所有，\n但微風拂面時，那是祢同在的悄悄細語。\n堅固的磐石下，正汩汩湧出甜美的生命活水。\n這片看似孤獨的天地，其實充滿了神最深沉的愛，\n所以，我並不孤單。",
    scripture: "── 曠野的泉源"
  },
  {
    id: 5,
    frameTitle: "祢的恩典 夠我用",
    title: "《祢的恩典 夠我用》",
    fullText: "別再因為身上那令人隱隱作痛的刺而感到挫敗和眼淚，\n因為正是那些磨礪、那些看似缺遺的不完美，\n成了柔和光芒射入我們荒蕪心靈、使生命重生的奇妙裂隙。\n在極大的軟弱與淚水中，祂的能力顯得最為完全，\n在安靜的感恩中，靈魂正得享不可言喻的富足。\n祢的宏大恩典，這一生必夠我用。",
    scripture: "── 哥林多後書 12:9"
  },
  {
    id: 6,
    frameTitle: "祢是 我的避難所",
    title: "《祢是 我的避難所》",
    fullText: "當暴怒的狂風驟雨無情席捲著、拍打遍地，\n當疲憊脆弱的心靈尋不著一處安全的歸航，\n那裡矗立著一座用磐石起造的堅固避風塔，\n正永恆地閃耀著溫暖澄黃的火光，敞開大門。\n快投奔進去吧，在那裡你將洗淨征塵，\n真切體會到：祢是的我永恆避難所。",
    scripture: "── 避風的港灣"
  },
  {
    id: 7,
    frameTitle: "心靈的 安息之處",
    title: "《心靈的 安息之處》",
    fullText: "拍拍衣服上的塵埃，放下一切焦慮和複雜的心思意念，\n靜下心聆聽微風拂過山坡、溪水潺潺流下深谷的私語。\n在天地一隅，那一座青蔥無暇的松濤林間，\n讓疲憊的精魂慢慢地躺臥、閉上眼睛。\n每一次深呼吸都是光明的洗禮，\n這個地方，便是神親自賞賜給你的心靈安息所。",
    scripture: "── 綠蔭下的歌聲"
  },
  {
    id: 8,
    frameTitle: "在祢裡面 得著力量",
    title: "《在祢裡面 得著力量》",
    fullText: "精疲力竭、在漫漫長途中步履蹣跚的旅人啊，\n請再度抬頭望向巍峨矗立的崇山峻嶺！\n那位用耐心雕琢大地奇峰的至高造物主，\n正源源不斷將最甘甜勇毅的情懷，注入你乾涸乾渴的心靈脈搏。\n如鷹一般重新展開閃光的羽翼、乘風翱翔，\n在祢深沉的愛與話語中，我再次得著不竭的力量。",
    scripture: "── 翱翔晴空"
  }
];

interface GemStone {
  id: string;
  name: string;
  icon: string;
  glowClass: string;
  accentClass: string;
  quotes: string[];
}

const GEMSTONES: GemStone[] = [
  {
    id: "hope",
    name: "希望",
    icon: "🌱",
    glowClass: "shadow-[0_0_35px_rgba(245,158,11,0.65)] bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500",
    accentClass: "border-amber-400 text-amber-800",
    quotes: [
      "「但那等候耶和華的必重新得力。他們必如鷹展翅上騰；他們奔跑卻不困倦，行走卻不疲乏。」 ── 以賽亞書 40:31",
      "「因為有盼望，你必得安息；你必在四圍巡查，坦然躺臥。」 ── 約伯記 11:18",
      "「看哪！我將要行一件新事，如今就要顯明。我必在曠野開道路，在沙漠開江河。」 ── 以賽亞書 43:19"
    ]
  },
  {
    id: "peace",
    name: "平安",
    icon: "🕊️",
    glowClass: "shadow-[0_0_35px_rgba(59,130,246,0.65)] bg-gradient-to-br from-blue-400 via-sky-400 to-cyan-500",
    accentClass: "border-sky-400 text-sky-800",
    quotes: [
      "「願主賜福給你，保護你。願主使祂的臉光照你，賜恩給你。願主向你顯聖，賜你平安。」 ── 民數記 6:24-26",
      "「我留下平安給你們，我將我的平安賜給你們。我所賜的，不像世人所賜的。你們心裡不要憂愁，也不要膽怯。」 ── 約翰福音 14:27",
      "「神所賜、出人意外的平安必在基督耶穌裡保守你們的心懷意念。」 ── 腓立比書 4:7"
    ]
  },
  {
    id: "courage",
    name: "勇氣",
    icon: "⛰️",
    glowClass: "shadow-[0_0_35px_rgba(139,92,26,0.65)] bg-gradient-to-br from-yellow-600 via-amber-700 to-amber-900",
    accentClass: "border-amber-700 text-amber-900",
    quotes: [
      "「凡事我都能做，因為藉著那加給我力量的，我凡事都能做。」 ── 腓立比書 4:13",
      "「我豈沒有吩咐你嗎？你當剛強壯膽！不要懼怕，也不要驚惶；因為你無論往哪裡去，耶和華你的神必與你同在。」 ── 約書亞記 1:9",
      "「因為神賜給我們，不是膽怯的心，乃是剛強、仁愛、謹守的心。」 ── 提摩太後書 1:7"
    ]
  },
  {
    id: "love",
    name: "愛",
    icon: "❤️",
    glowClass: "shadow-[0_0_35px_rgba(236,72,153,0.65)] bg-gradient-to-br from-rose-400 via-pink-400 to-rose-500",
    accentClass: "border-rose-400 text-rose-800",
    quotes: [
      "「愛是恆久忍耐，又有恩慈；愛是不嫉妒；愛是不自誇，不張狂... 凡事包容，凡事相信，凡事盼望，凡事忍耐。愛是永不止息。」 ── 哥林多前書 13:4-8",
      "「我們愛，因為神先愛我們。」 ── 約翰一書 4:19",
      "「我以永遠的愛愛你，因此我以慈愛吸引你。」 ── 耶利米書 11:3"
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "intro" | "stories" | "poems" | "proverbs">("home");
  
  // Immersive sound states
  const [bgmActive, setBgmActive] = useState(false);
  const synthRef = useRef<InteractiveSynth | null>(null);

  // Audio narrator (TTS) states
  const [isNarrating, setIsNarrating] = useState(false);
  const [narratingText, setNarratingText] = useState("");
  const [narratingTitle, setNarratingTitle] = useState("");

  // Stories Carousel states
  const [currentStoneIdx, setCurrentStoneIdx] = useState(0);

  // Poems Wall states
  const [openedPoem, setOpenedPoem] = useState<Poem | null>(null);

  // Proverb game states
  const [selectedGemId, setSelectedGemId] = useState<string | null>(null);
  const [drawnQuote, setDrawnQuote] = useState<string>("");
  const [drawnQuoteIndex, setDrawnQuoteIndex] = useState(0);

  // Home Hero visual dot highlight details
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  // Init Synth instance
  useEffect(() => {
    synthRef.current = new InteractiveSynth();
    return () => {
      if (synthRef.current) {
        synthRef.current.stopBGM();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleBGM = () => {
    if (!synthRef.current) return;
    if (bgmActive) {
      synthRef.current.stopBGM();
      setBgmActive(false);
    } else {
      synthRef.current.startBGM();
      setBgmActive(true);
    }
  };

  // Text narrator function with visual indicator
  const startNarrative = (title: string, textToRead: string) => {
    if (!('speechSynthesis' in window)) {
      alert("您的瀏覽器暫不支持語音朗讀特色語音服務，推薦使用 Chrome 體驗最佳效果。");
      return;
    }

    window.speechSynthesis.cancel();

    if (isNarrating && narratingTitle === title) {
      setIsNarrating(false);
      setNarratingTitle("");
      setNarratingText("");
      return;
    }

    if (synthRef.current) {
      // Play a quick satisfying bell chime before speech guide starts
      synthRef.current.playGlassChime();
    }

    // Prepare speech guide
    const introPrompt = `這件奇石的作品名稱叫作：${title}。特別為您導覽：${textToRead}`;
    const utterance = new SpeechSynthesisUtterance(introPrompt);
    utterance.lang = "zh-TW";
    utterance.rate = 0.92; // Serene pace
    utterance.pitch = 1.05; // Slightly clear and warm pitch

    utterance.onend = () => {
      setIsNarrating(false);
      setNarratingTitle("");
      setNarratingText("");
    };

    utterance.onerror = (e) => {
      console.warn("TTS state completed or cancelled", e);
      setIsNarrating(false);
    };

    setIsNarrating(true);
    setNarratingTitle(title);
    setNarratingText(textToRead);
    window.speechSynthesis.speak(utterance);
  };

  const stopNarrative = () => {
    window.speechSynthesis.cancel();
    setIsNarrating(false);
    setNarratingTitle("");
    setNarratingText("");
  };

  // Stone drawing activation
  const harvestGemstoneProverb = (gem: GemStone) => {
    if (synthRef.current) {
      synthRef.current.playGlassChime();
    }
    setSelectedGemId(gem.id);
    
    // Pick a random code
    const randIdx = Math.floor(Math.random() * gem.quotes.length);
    setDrawnQuote(gem.quotes[randIdx]);
    setDrawnQuoteIndex(randIdx);
  };

  const reDrawProverb = () => {
    if (!selectedGemId) return;
    const gem = GEMSTONES.find(g => g.id === selectedGemId);
    if (!gem) return;

    if (synthRef.current) {
      synthRef.current.playGlassChime();
    }

    // Draw a different quote
    let nextIdx = drawnQuoteIndex;
    if (gem.quotes.length > 1) {
      while (nextIdx === drawnQuoteIndex) {
        nextIdx = Math.floor(Math.random() * gem.quotes.length);
      }
    }
    setDrawnQuote(gem.quotes[nextIdx]);
    setDrawnQuoteIndex(nextIdx);
  };

  const handleEnterExhibition = () => {
    if (synthRef.current && !bgmActive) {
      synthRef.current.startBGM();
      setBgmActive(true);
    }
    setActiveTab("intro");
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-[#FAF6ED] text-[#2C241B] font-sans antialiased overflow-x-hidden selection:bg-[#EAE1D0] selection:text-[#8A6D3B] transition-colors duration-500">
      
      {/* Decorative watercolor blurry washes simulating ancient luxurious art paper stains */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-radial from-[#F5EAD4] to-transparent opacity-45 -translate-x-[20%] -translate-y-[20%] pointer-events-none z-0" />
      <div className="absolute bottom-12 right-0 w-[600px] h-[600px] rounded-full bg-radial from-[#EDE4D5] to-transparent opacity-45 translate-x-[20%] translate-y-[2%] pointer-events-none z-0" />
      <div className="absolute top-[35%] left-[20%] w-[350px] h-[350px] rounded-full bg-radial from-[#F4ECC] to-transparent opacity-35 blur-[100px] pointer-events-none z-0" />

      {/* FIXED SIDE NAVIGATION BAR (Beige Parchment theme with golden leaf lines) */}
      <aside className="w-full md:w-80 md:min-h-screen md:sticky md:top-0 bg-[#FDFBF7] border-b md:border-b-0 md:border-r border-[#E8DFC2] px-6 py-6 md:py-10 flex flex-col justify-between z-40 shrink-0 shadow-xs">
        <div>
          {/* Logo Heading Section */}
          <div className="flex flex-col items-center md:items-start space-y-2 mb-8 select-none">
            <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#AF8F5C] font-serif font-semibold">ONLINE EXHIBITION</span>
            <h1 className="text-xl md:text-2xl font-serif tracking-[0.1em] font-bold text-center md:text-left text-[#2C241B]">
              MASTERPIECE
            </h1>
            <h1 className="text-[16px] md:text-[18px] font-serif tracking-[0.15em] text-[#AF8F5C] -mt-1 font-semibold">
              IN PROGRESS
            </h1>
            <div className="flex items-center space-x-2 my-1">
              <span className="h-[1px] w-6 bg-[#AF8F5C] opacity-60"></span>
              <span className="text-xs text-[#6E5F4E] font-medium tracking-widest font-zh-serif">奇石・詩・箴言展</span>
              <span className="h-[1px] w-6 bg-[#AF8F5C] opacity-60"></span>
            </div>
          </div>

          {/* Nav Item Selector List */}
          <nav className="flex flex-row md:flex-col flex-wrap justify-center md:justify-start gap-1 py-3 md:py-2 select-none">
            {[
              { id: "home", label: "展覽首頁", en: "HOME", icon: <Home className="w-[15px] h-[15px]" /> },
              { id: "intro", label: "展覽介紹", en: "ORIENTATION", icon: <Layers className="w-[15px] h-[15px]" /> },
              { id: "stories", label: "形象石故事", en: "STONE STORIES", icon: <Compass className="w-[15px] h-[15px]" /> },
              { id: "poems", label: "靈感的詩", en: "SPIRIT POEMS", icon: <BookOpen className="w-[15px] h-[15px]" /> },
              { id: "proverbs", label: "箴言話語", en: "SOUL CHIMES", icon: <Sparkles className="w-[15px] h-[15px]" /> }
            ].map(item => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-auto md:w-full flex items-center space-x-3 px-4 py-2.5 rounded-sm transition-all duration-300 relative text-left ${
                    active 
                      ? "text-[#8A6D3B] font-semibold bg-[#FAF4E5] shadow-[inset_1px_1px_0_rgba(255,255,255,1),_0_1px_2px_rgba(138,109,59,0.08)] border border-[#E1D3B4]" 
                      : "text-[#6E5F4E] hover:text-[#2C241B] hover:bg-[#FAF6EE]/50 border border-transparent"
                  }`}
                >
                  <span className={`transition-colors duration-300 ${active ? 'text-[#AF8F5C]' : 'text-stone-400'}`}>
                    {item.icon}
                  </span>
                  <div className="text-xs md:text-sm tracking-wide">
                    <span className="block font-zh-serif leading-none">{item.label}</span>
                    <span className="block text-[8px] md:text-[9px] text-[#A5998A] tracking-wider leading-none mt-1 font-serif opacity-75">{item.en}</span>
                  </div>
                  {active && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#AF8F5C]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Ambient Synthesizer Interactive Controller in Footer of Sidebar */}
        <div className="mt-6 md:mt-8 pt-4 border-t border-[#E8DFC2]/80 flex flex-col space-y-3 p-3 bg-[#FAF6EE]/40 rounded-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${bgmActive ? 'bg-[#AF8F5C] animate-ping' : 'bg-stone-300'}`} />
              <span className="text-[10px] md:text-xs text-[#6E5F4E] tracking-wider font-zh-serif">展廳靜謐背景樂</span>
            </div>
            <button
              onClick={toggleBGM}
              className={`p-1.5 rounded-full border transition-all duration-300 ${
                bgmActive 
                  ? "bg-[#AF8F5C]/15 border-[#AF8F5C] text-[#8A6D3B] scale-105" 
                  : "bg-white border-stone-200 text-stone-400 hover:text-stone-700"
              }`}
              title={bgmActive ? "暫停音樂" : "開啟音樂"}
            >
              {bgmActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>
          <span className="text-[9px] text-stone-400 font-serif leading-relaxed text-justify">
            「萬籟俱寂，唯有晶錘輕落。點選上方按鈕，即時渲染大提琴與鋼片琴神聖空靈的背景編織。」
          </span>
        </div>
      </aside>

      {/* MAIN VIEWPORT BODY */}
      <main className="flex-1 min-h-screen py-10 px-4 sm:px-8 md:px-12 relative z-10 flex flex-col justify-between">
        
        {/* TOP STATUS VOICE HEADSET BAR (Pops up when active guidance narrations are speaking) */}
        {isNarrating && (
          <div className="fixed top-4 right-4 left-4 md:left-auto md:w-96 bg-[#FFFDF9] border border-[#E6D9BD] p-4 rounded-sm shadow-lg z-50 animate-fade-in flex items-start space-x-3.5">
            <span className="w-8 h-8 rounded-full bg-[#AF8F5C]/10 flex items-center justify-center shrink-0 border border-[#AF8F5C]/30 text-[#8A6D3B]">
              <Waves className="w-4 h-4 animate-pulse text-[#AF8F5C]" />
            </span>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase text-[#AF8F5C] tracking-widest font-semibold">美術館 數位語音引導</span>
                <button onClick={stopNarrative} className="text-stone-400 hover:text-[#2C241B] transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs font-semibold text-[#2C241B] tracking-wide mt-1 truncate">正在聽講：{narratingTitle}</p>
              <div className="flex items-center space-x-1 mt-2">
                <span className="w-1.5 h-3 bg-[#AF8F5C] rounded-full animate-[bounce_0.6s_infinite_100ms]" />
                <span className="w-1.5 h-4 bg-[#AF8F5C] rounded-full animate-[bounce_0.6s_infinite_200ms]" />
                <span className="w-1.5 h-2.5 bg-[#AF8F5C] rounded-full animate-[bounce_0.6s_infinite_300ms]" />
                <span className="w-1.5 h-4.5 bg-[#AF8F5C] rounded-full animate-[bounce_0.6s_infinite_400ms]" />
                <span className="w-1.5 h-1.5 bg-[#AF8F5C] rounded-full animate-[bounce_0.6s_infinite_500ms]" />
                <span className="text-[9px] text-[#8A6D3B] ml-2 font-zh-serif">心靈朗讀中，安靜、溫柔、被鼓勵...</span>
              </div>
            </div>
          </div>
        )}

        {/* =======================================================
            TAB 1: 首頁 (HOME)
            ======================================================= */}
        {activeTab === "home" && (
          <div className="w-full flex-1 flex flex-col justify-between space-y-12 animate-fade-in">
            {/* Top row with Title block on the left and vertical majestic painting structure on the right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
              <div className="lg:col-span-5 flex flex-col space-y-6 text-center lg:text-left">
                <div className="space-y-1.5 select-none">
                  <span className="text-[11px] font-semibold text-[#AF8F5C] tracking-[0.4em] block">THE REDESIGNED IMMERSIVE EXHIBITION</span>
                  <h1 className="text-4xl md:text-5xl font-serif text-[#2C241B] tracking-wide leading-tight uppercase font-medium">
                    MASTERPIECE
                  </h1>
                  <h1 className="text-3xl md:text-4xl font-serif text-[#AF8F5C] tracking-[0.16em] leading-tight font-semibold -mt-1">
                    IN PROGRESS
                  </h1>
                  <h2 className="text-lg md:text-xl font-zh-serif text-[#6E5F4E] tracking-[0.25em] pt-1 font-semibold">
                    奇石・詩・箴言展
                  </h2>
                </div>

                <div className="h-[2px] w-24 bg-[#E2D5BE] mx-auto lg:mx-0"></div>

                <div className="relative p-2.5 bg-white/20 border border-[#E8DFC2]/40 rounded-sm">
                  {/* Elegant Golden border box */}
                  <div className="border border-[#EBDCB7] p-5 md:p-6 bg-[#FCFAF6]/90 rounded-sm text-center lg:text-left relative shadow-xs">
                    <div className="absolute top-2 left-2 text-[10px] text-[#A5998A] tracking-wider">M.I.P</div>
                    <p className="text-[#3A3226] font-zh-serif font-semibold text-[15px] sm:text-[17px] leading-relaxed tracking-wider py-4 select-text">
                      「石頭、萬物、人，<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;都是神親手雕刻的傑作品。」
                    </p>
                    <div className="text-right">
                      <span className="text-[10px] tracking-widest text-[#AF8F5C] font-zh-serif font-semibold block mt-1">── 核心標語 CORE SLOGAN</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <button
                    onClick={handleEnterExhibition}
                    className="group flex items-center justify-center space-x-2 px-9 py-3.5 bg-gradient-to-r from-[#B0905D] to-[#917548] text-white text-xs tracking-widest rounded-sm shadow-md hover:shadow-lg hover:from-[#9B7D4F] hover:to-[#7E653C] transition-all duration-300 font-semibold"
                  >
                    <span className="font-zh-serif tracking-[0.2em] text-sm">進入展覽</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 text-amber-200" />
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("stories");
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-3.5 border border-[#AF8F5C] text-[#8A6D3B] text-xs font-semibold tracking-widest bg-white/55 hover:bg-white rounded-sm hover:text-[#5E4A28] transition-all duration-300 block font-zh-serif text-sm"
                  >
                    瀏覽形象石
                  </button>
                </div>
              </div>

              {/* Majestic vertical artwork representing the visual mountain (大象石) */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="relative max-w-sm sm:max-w-md w-full border border-[#E3D6C1] p-5 sm:p-6 bg-white poster-mounted-shadow rounded-sm glossy-sheen">
                  <span className="absolute top-2 left-3 text-[9px] text-[#A5998A] font-serif tracking-widest">EXHIBITION VISUAL CARD</span>
                  <span className="absolute bottom-2 right-3 text-[9px] text-[#A5998A] font-serif tracking-widest">© MASTERPIECE</span>
                  
                  {/* Photo with responsive markers */}
                  <div className="relative aspect-[3/4] w-full rounded-sm border border-stone-200 overflow-hidden group">
                    <img
                      src={IMAGES.elephantHero}
                      alt="奇石形象"
                      className="w-full h-full object-cover grayscale-[3%] brightness-[97%] transition-transform duration-1000 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />

                    {/* Interactive Marker 1 */}
                    <div className="absolute top-[28%] left-[45%] z-20">
                      <button
                        onMouseEnter={() => setHoveredDot(1)}
                        onMouseLeave={() => setHoveredDot(null)}
                        onClick={() => startNarrative("經歷時間的雕琢", "每一顆奇石，都經歷了漫長歲月。每一個人，也都有屬於自己的故事。")}
                        className="w-5 h-5 rounded-full bg-[#AF8F5C] border-2 border-white flex items-center justify-center text-[10px] text-white font-bold cursor-help shadow-lg animate-pulse"
                      >
                        1
                      </button>
                      {(hoveredDot === 1) && (
                        <div className="absolute top-6 left-0 bg-[#FFFDF9] border border-[#AF8F5C] text-stone-800 text-xs py-1.5 px-3 rounded-sm shadow-md min-w-[150px] z-30 pointer-events-none font-zh-serif leading-relaxed">
                          每一片條理，都是風沙與時間深刻的雕琢。點擊聆聽。
                        </div>
                      )}
                    </div>

                    {/* Interactive Marker 2 */}
                    <div className="absolute top-[52%] left-[68%] z-20">
                      <button
                        onMouseEnter={() => setHoveredDot(2)}
                        onMouseLeave={() => setHoveredDot(null)}
                        onClick={() => startNarrative("等待被發現的形象", "大象石，根本形象其實是大象。要從正確的角度深度端詳，就能發現最寶貴、最美麗的形象。")}
                        className="w-5 h-5 rounded-full bg-[#AF8F5C] border-2 border-white flex items-center justify-center text-[10px] text-white font-bold cursor-help shadow-lg animate-pulse"
                      >
                        2
                      </button>
                      {(hoveredDot === 2) && (
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#FFFDF9] border border-[#AF8F5C] text-stone-800 text-xs py-1.5 px-3 rounded-sm shadow-md min-w-[160px] z-30 pointer-events-none font-zh-serif leading-relaxed">
                          大象的輪廓完美隱身在岩石結構之中。點擊聆聽。
                        </div>
                      )}
                    </div>

                    {/* Interactive Marker 3 */}
                    <div className="absolute top-[75%] left-[30%] z-20">
                      <button
                        onMouseEnter={() => setHoveredDot(3)}
                        onMouseLeave={() => setHoveredDot(null)}
                        onClick={() => startNarrative("獨一無二的傑作", "石頭經過萬里歲月的洗禮和外在力量塑造成形，就像我們在心靈與人格中全心修行、將自己造就完全一樣。")}
                        className="w-5 h-5 rounded-full bg-[#AF8F5C] border-2 border-white flex items-center justify-center text-[10px] text-white font-bold cursor-help shadow-lg animate-pulse"
                      >
                        3
                      </button>
                      {(hoveredDot === 3) && (
                        <div className="absolute top-6 right-0 bg-[#FFFDF9] border border-[#AF8F5C] text-stone-800 text-xs py-1.5 px-3 rounded-sm shadow-md min-w-[150px] z-30 pointer-events-none font-zh-serif leading-relaxed">
                          人生，會隨著你如何雕琢與造就而決定其發光價值。
                        </div>
                      )}
                    </div>

                    {/* Floating tag */}
                    <div className="absolute bottom-4 left-4 bg-white/95 px-3.5 py-2.5 border-l-4 border-[#AF8F5C] shadow-sm select-none">
                      <h4 className="text-xs font-serif font-bold tracking-widest text-[#2C241B]">大象石 • ELEPHANT</h4>
                      <p className="text-[9px] text-[#AF8F5C] tracking-wide mt-0.5">MIP Classic Exhibit #04</p>
                    </div>
                  </div>

                  {/* Caption underneath visual */}
                  <div className="mt-3.5 pt-2 border-t border-[#E8DFC2]/60 flex items-center justify-between text-[11px] text-[#6E5F4E] font-zh-serif tracking-wide select-none">
                    <span>藝術展櫃 No. G04</span>
                    <span>天然石與生命的呼應</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider Ribbon (經歷歲月的印記) */}
            <div className="py-6 border-y border-[#E8DFC2]/85 text-center px-4 max-w-2xl mx-auto select-none">
              <span className="inline-block text-[#AF8F5C] text-xs mb-1">🌿 🌿 🌿</span>
              <p className="text-[#4E3F30] font-zh-serif text-[13px] sm:text-[15px] leading-relaxed tracking-[0.16em]">
                「每一顆奇石，都經歷了漫長歲月。每一個人，也都有屬於自己的故事。」
              </p>
              <span className="block text-[10px] text-stone-400 mt-2 font-serif tracking-widest uppercase">── NATURAL GRACE AND INDIVIDUAL CHRONICLES</span>
            </div>

            {/* Bottom: 4 Entryway cards to other spaces with hover effects */}
            <div className="space-y-4 select-none">
              <h3 className="text-center text-[11px] tracking-[0.3em] font-serif font-semibold text-[#AF8F5C] uppercase">
                導覽展區入口 • CAROUSEL OF GALLERY SPACES
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-6">
                {[
                  {
                    tab: "intro",
                    num: "I",
                    title: "展覽介紹",
                    desc: "認識奇石與生命造就之光",
                    icon: "⚖️"
                  },
                  {
                    tab: "stories",
                    num: "II",
                    title: "形象石故事",
                    desc: "六顆形象石頭，六個生命提醒",
                    icon: "🧭"
                  },
                  {
                    tab: "poems",
                    num: "III",
                    title: "靈感的詩",
                    desc: "八首雋永詩篇，懸掛牆上的撫慰",
                    icon: "📜"
                  },
                  {
                    tab: "proverbs",
                    num: "IV",
                    title: "箴言話語",
                    desc: "尋找今天心靈的寶貴指引與提醒",
                    icon: "💎"
                  }
                ].map(entry => (
                  <button
                    key={entry.tab}
                    onClick={() => {
                      setActiveTab(entry.tab as any);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-5 bg-white border border-[#E8DFC2] hover:border-[#AF8F5C] rounded-sm text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[#AF8F5C] border-b border-[#FAF6EE] pb-2 mb-3">
                        <span className="text-[10px] font-bold tracking-widest font-serif">SECTION 0{entry.num}</span>
                        <span className="text-base group-hover:scale-12s duration-300">{entry.icon}</span>
                      </div>
                      <h4 className="text-sm font-zh-serif font-bold text-[#2C241B] group-hover:text-[#8A6D3B] transition-colors">
                        {entry.title}
                      </h4>
                      <p className="text-[11px] text-[#6E5F4E] leading-relaxed mt-1 font-zh-serif">
                        {entry.desc}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-[#AF8F5C] mt-4 self-end text-[10px] font-serif tracking-widest uppercase">
                      <span>ENTER</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 duration-300" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =======================================================
            TAB 2: 展覽介紹 (ORIENTATION)
            ======================================================= */}
        {activeTab === "intro" && (
          <div className="w-full flex-1 space-y-12 animate-fade-in pt-2">
            
            {/* Title ornament */}
            <div className="text-center py-4 select-none">
              <span className="inline-block text-[#AF8F5C] text-xs">❦ 展 覽 介 紹 ❦</span>
              <h2 className="text-2xl sm:text-3xl font-zh-serif tracking-[0.2em] font-semibold text-[#2C241B] mt-1.5">
                奇石・詩・箴言展
              </h2>
              <p className="text-[10px] text-stone-400 font-serif tracking-widest uppercase mt-0.5">THE TIME-LESS SOUL & ROCK EXHIBITION</p>
            </div>

            {/* Introductory Wall Banner Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#E8DFC2] p-6 md:p-8 rounded-sm shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-[#F5EAD4] to-transparent opacity-35" />
              
              <div className="lg:col-span-7 flex flex-col space-y-4">
                <span className="text-[11px] font-bold text-[#AF8F5C] tracking-widest uppercase font-serif">WALL NO. 01 • ORIENTATION WALL</span>
                <h3 className="text-lg md:text-xl font-zh-serif font-bold text-[#2C241B]">「奇石是什麼？」</h3>
                
                <div className="h-[1px] w-20 bg-[#E2D5BE]"></div>

                <div className="text-xs sm:text-sm leading-relaxed text-[#3A3226] space-y-3.5 font-zh-serif select-text text-justify">
                  <p>
                    「奇石」是大自然歷經無比漫長的時間磨礪，經受狂沙、地殼斷裂、風雪吹拂、水流沖積、以及地下礦物重重沉澱，在偶然與奇蹟中，自豪生長出的萬千姿態。每一顆形狀生動、紋理細膩的奇石，均是自然界最珍貴的藝術品。
                  </p>
                  <p>
                    本展覽正是利用奇石無聲而磅礴的啟示，向在喧擾日常中步履不停的您，傳達一個溫柔而深刻的信念：
                  </p>
                  <p className="font-semibold text-[#8A6D3B] bg-[#FAF5EBE]/60 p-3 border-l-2 border-[#AF8F5C] italic">
                    「石頭在千般風沙和漫長外力琢磨下，一朝被認出其驚人非凡的特徵而身價百倍。每一個人也是如此：只要在心靈與人格中全力修造、充實學習並造就自我至完全，也必將成為閃亮如繁星的至寶生命。」
                  </p>
                </div>
              </div>

              {/* Decorative watercolor-like woodland stream representing water crystallization / weathered origin */}
              <div className="lg:col-span-5 relative w-full h-64 lg:h-76 overflow-hidden rounded-sm border border-stone-200">
                <img
                  src={IMAGES.riverValley}
                  alt="奇石之源 溪谷與水流"
                  className="w-full h-full object-cover grayscale-[3%] brightness-[96%]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xs font-zh-serif font-bold tracking-wider">千山溪壑，歲月無聲</h4>
                  <p className="text-[9px] text-stone-200 mt-1"> weathering, hydraulic force, mineral crust</p>
                </div>
              </div>
            </div>

            {/* Classic Stone Exhibition cabinets (肉形石 & 老奶奶石) */}
            <div className="space-y-6">
              <div className="text-center select-none">
                <div className="inline-block h-[1px] w-12 bg-[#AF8F5C]/40 align-middle"></div>
                <h3 className="inline-block text-xs uppercase tracking-[0.2em] font-serif font-bold text-[#AF8F5C] mx-3">
                  經典奇石展櫃 • EXQUISITE EXHIBITION GLASS CASES
                </h3>
                <div className="inline-block h-[1px] w-12 bg-[#AF8F5C]/40 align-middle"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 select-none">
                {CLASSIC_STONES.map((item, idx) => (
                  <div key={idx} className="bg-[#FFFDF9] border border-[#E8DFC2] p-5 sm:p-6 rounded-sm flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#AF8F5C]/60 transition-all duration-300">
                    <div className="space-y-4">
                      {/* Realistic Golden Frame like image in orientation wall */}
                      <div className="relative aspect-[4/3] w-full rounded-sm border border-stone-200 overflow-hidden bg-stone-50">
                        <img 
                          src={item.img} 
                          alt={item.title} 
                          className="w-full h-full object-cover grayscale-[2%] hover:scale-102 transition-transform duration-700 hover:brightness-102"
                          referrerPolicy="no-referrer" 
                        />
                        <div className="absolute inset-0 shadow-[inset_0_2px_6px_rgba(0,0,0,0.1)] pointer-events-none" />
                        <span className="absolute bottom-3 right-3 bg-stone-900/80 text-white text-[8px] sm:text-[9px] px-2 py-0.5 rounded-sm tracking-wider">
                          MUSEUM CASE 0{idx + 1}
                        </span>
                      </div>

                      <div className="space-y-1 pb-1 border-b border-stone-100">
                        <h4 className="text-base font-zh-serif font-bold text-[#2C241B]">
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-[#AF8F5C] tracking-wide font-zh-serif">
                          {item.sub}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-[#4E3F30] leading-relaxed font-zh-serif select-text text-justify h-32 overflow-y-auto pr-1">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-100">
                      <span className="text-[9px] text-[#A5998A] tracking-wider font-serif uppercase">NATURAL CRUST AGATE Study</span>
                      <button
                        onClick={() => startNarrative(item.title, item.desc)}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 border border-[#AF8F5C]/50 rounded-sm text-xs font-zh-serif transition-colors ${
                          narratingTitle === item.title 
                            ? "bg-[#AF8F5C] text-white border-transparent animate-pulse" 
                            : "hover:bg-[#FAF4E5] text-[#8A6D3B]"
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{narratingTitle === item.title ? "語音導覽中" : "聆聽導覽"}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer invite button */}
            <div className="text-center pt-4">
              <button
                onClick={() => {
                  setActiveTab("stories");
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 px-9 py-3.5 bg-[#8A6D3B] text-white text-xs font-bold tracking-widest rounded-sm hover:bg-[#6E5F4E] shadow-sm transition-all duration-300 font-zh-serif"
              >
                <span>進入重點：六顆形象石故事</span>
                <Compass className="w-4 h-4 text-amber-200" />
              </button>
            </div>
          </div>
        )}

        {/* =======================================================
            TAB 3: 形象石故事 (STONE STORIES - THE HEART OF WEBPAGE)
            ======================================================= */}
        {activeTab === "stories" && (
          <div className="w-full flex-1 space-y-8 animate-fade-in pt-2">
            
            {/* Title with decorative golden details resembling the mockup image */}
            <div className="text-center select-none">
              <span className="inline-block text-[#AF8F5C] text-xs">🌿 六 顆 石 頭，六 個 提 醒 🌿</span>
              <h2 className="text-2xl sm:text-3xl font-zh-serif tracking-[0.2em] font-semibold text-[#2C241B] mt-1">
                形象石故事
              </h2>
              <p className="text-[10px] text-stone-400 font-serif tracking-widest uppercase mt-0.5">THE ONLINE STATUE GALLERY CAROUSEL</p>
            </div>

            {/* MAIN EXHIBITION STAGE: Focus Stone Details Block */}
            <div className="bg-white border border-[#E8DFC2] p-5 sm:p-7 rounded-sm shadow-xs relative">
              <div className="absolute top-2.5 left-3.5 text-[9px] text-[#A5998A] tracking-wider uppercase font-serif">ACTIVE MASTERPIECE EXHIBIT SCREEN</div>
              <div className="absolute bottom-2.5 right-3.5 text-[9px] text-[#A5998A] tracking-wider font-serif">EXHIBIT STATUS {currentStoneIdx + 1}/6</div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 select-none">
                
                {/* Active stone featured photo frame (Left) */}
                <div className="lg:col-span-6 flex flex-col items-center">
                  <div className="relative aspect-[3/4] w-full max-w-sm sm:max-w-md rounded-sm border border-stone-200 bg-stone-50 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300">
                    <img
                      src={STORY_STONES[currentStoneIdx].img}
                      alt={STORY_STONES[currentStoneIdx].name}
                      className="w-full h-full object-cover grayscale-[2%] brightness-[97%] transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Inner frame shadow overlay */}
                    <div className="absolute inset-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] pointer-events-none" />
                    
                    {/* Floating label */}
                    <div className="absolute top-4 left-4 bg-stone-900/80 text-orange-100 text-[10px] px-2.5 py-1 tracking-wider font-semibold rounded-sm">
                      天然奇石形象 No. 10{STORY_STONES[currentStoneIdx].id}
                    </div>
                  </div>
                </div>

                {/* Active stone text, dialogue prompts and Audio toggle (Right) */}
                <div className="lg:col-span-6 flex flex-col space-y-5 justify-between">
                  <div className="space-y-4">
                    <div className="space-y-1 pb-2 border-b border-stone-100">
                      <h3 className="text-2xl sm:text-3xl font-zh-serif font-bold text-[#2C241B]">
                        {STORY_STONES[currentStoneIdx].name}
                      </h3>
                      <p className="text-sm font-semibold tracking-wide text-[#AF8F5C] font-zh-serif">
                        {STORY_STONES[currentStoneIdx].tagline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#4E3F30] leading-relaxed font-zh-serif text-justify select-text py-1">
                      {STORY_STONES[currentStoneIdx].desc}
                    </p>

                    {/* Reflexion Prompt Blocks explicitly requested in prompt */}
                    <div className="p-4 bg-[#FAF6EE] border-l-2 border-[#AF8F5C]/60 rounded-sm space-y-2">
                      <h4 className="text-[10px] sm:text-xs font-bold text-[#8A6D3B] tracking-wider uppercase font-serif flex items-center space-x-1">
                        <span>🕵️ 引導思考 REFLECTION PROMPT</span>
                      </h4>
                      <ul className="text-xs text-stone-700 space-y-2 font-zh-serif leading-relaxed text-justify list-disc pl-3">
                        {STORY_STONES[currentStoneIdx].reflection.map((refLine, idx) => (
                          <li key={idx} className="select-text">{refLine}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-3">
                    <button
                      onClick={() => startNarrative(STORY_STONES[currentStoneIdx].name, STORY_STONES[currentStoneIdx].desc)}
                      className={`flex-1 flex items-center justify-center space-x-2 px-5 py-3 border border-[#AF8F5C] font-zh-serif text-xs sm:text-sm tracking-widest rounded-sm transition-all duration-300 ${
                        narratingTitle === STORY_STONES[currentStoneIdx].name
                          ? "bg-[#AF8F5C]/15 border-[#AF8F5C] text-[#8A6D3B] animate-pulse"
                          : "hover:bg-[#FAF4E5] text-[#8A6D3B] bg-white"
                      }`}
                    >
                      <Volume2 className="w-4 h-4 text-[#AF8F5C]" />
                      <span>{narratingTitle === STORY_STONES[currentStoneIdx].name ? "⏸️ 暫停故事語音" : "🔊 聆聽導覽故事"}</span>
                    </button>
                    
                    <div className="flex space-x-2 shrink-0 justify-center">
                      <button
                        onClick={() => {
                          if (currentStoneIdx > 0) {
                            setCurrentStoneIdx(prev => prev - 1);
                          } else {
                            setCurrentStoneIdx(5); // Wrap and cycle
                          }
                          stopNarrative();
                        }}
                        className="w-11 h-11 border border-[#E8DFC2] hover:border-[#AF8F5C] rounded-full flex items-center justify-center bg-white hover:bg-[#FAF4E5] text-stone-600 hover:text-[#8A6D3B] transition-colors"
                        title="上一個奇石"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          if (currentStoneIdx < 5) {
                            setCurrentStoneIdx(prev => prev + 1);
                          } else {
                            setCurrentStoneIdx(0); // Wrap and cycle
                          }
                          stopNarrative();
                        }}
                        className="w-11 h-11 border border-[#E8DFC2] hover:border-[#AF8F5C] rounded-full flex items-center justify-center bg-white hover:bg-[#FAF4E5] text-stone-600 hover:text-[#8A6D3B] transition-colors"
                        title="下一個奇石"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation Row (Displays small photo buttons with titles below active block) */}
            <div className="space-y-4 select-none">
              <p className="text-center text-[10px] sm:text-xs text-[#A5998A] tracking-[0.25em] font-serif font-semibold">
                👈 👉 點擊下方縮圖列，看見牠的故事
              </p>

              {/* Grid of the 6 thumbnails */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 pt-1">
                {STORY_STONES.map((stone, idx) => {
                  const active = currentStoneIdx === idx;
                  return (
                    <button
                      key={stone.id}
                      onClick={() => {
                        setCurrentStoneIdx(idx);
                        stopNarrative();
                      }}
                      className={`p-2 bg-white rounded-sm border transition-all duration-300 transform text-center relative flex flex-col items-center ${
                        active
                          ? "border-[#AF8F5C] ring-2 ring-[#AF8F5C]/25 shadow-sm scale-102"
                          : "border-[#E8DFC2] hover:border-slate-400 hover:scale-101"
                      }`}
                    >
                      <div className="relative aspect-[3/4] w-full rounded-xs overflow-hidden bg-stone-100">
                        <img
                          src={stone.img}
                          alt={stone.name}
                          className="w-full h-full object-cover grayscale-[3%]"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-[11px] font-zh-serif font-bold text-[#2C241B] block mt-2 tracking-wider truncate w-full">
                        {stone.name}
                      </span>
                      {active && (
                        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#AF8F5C] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dots navigation indicator */}
              <div className="flex justify-center space-x-1.5 pt-1.5">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentStoneIdx(idx);
                      stopNarrative();
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentStoneIdx === idx ? "bg-[#AF8F5C] w-4" : "bg-stone-300 hover:bg-[#AF8F5C]/60"
                    }`}
                  />
                ))}
              </div>
            </div>
            
          </div>
        )}

        {/* =======================================================
            TAB 4: 靈感的詩 (SPIRIT POEMS - THE POEM WALL)
            ======================================================= */}
        {activeTab === "poems" && (
          <div className="w-full flex-1 space-y-8 animate-fade-in pt-1">
            
            {/* Title with exhibition metadata */}
            <div className="text-center select-none">
              <span className="inline-block text-[#AF8F5C] text-xs">📜 八 首 詩，八 段 心 靈 的 旅 程 📜</span>
              <h2 className="text-2xl sm:text-3xl font-zh-serif tracking-[0.2em] font-semibold text-[#2C241B] mt-1">
                靈感的詩
              </h2>
              <p className="text-[10px] text-stone-400 font-serif tracking-widest uppercase mt-0.5">THE MUSEUM POETRY STUDIO WALL</p>
            </div>

            {/* ART GALLERY WALL BACKDROP (Warm plaster texture with ambient glow spotlight) */}
            <div className="relative plaster-wall rounded-sm border border-[#C5B499]/60 p-6 sm:p-9 shadow-[inset_0_8px_30px_rgb(0,0,0,0.06),_0_2px_12px_rgba(40,30,10,0.06)] overflow-hidden select-none">
              
              {/* Radial spotlight from ceiling hanging down */}
              <div className="absolute top-0 inset-x-0 h-96 ceiling-spotlight pointer-events-none z-0" />

              <div className="text-center mb-6 relative z-10">
                <span className="text-[10px] tracking-[0.3em] text-[#AF8F5C] font-semibold border border-[#AF8F5C]/40 px-3.5 py-1 bg-[#E1D3B4]/30 rounded-xs uppercase">
                  MIP GALLERY DEPT: SOUTH STUDIO WALL
                </span>
                <p className="text-[#6E5F4E] text-xs font-zh-serif tracking-widest mt-2">
                  👉 點擊詩畫框，閱讀完整詩篇。在歲月與墨香中，重新找回最初的前行動能。
                </p>
              </div>

              {/* Grid of the 8 framed poetry boards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 relative z-10">
                {POEMS.map((poem, index) => (
                  <button
                    key={poem.id}
                    onClick={() => setOpenedPoem(poem)}
                    className="p-4 bg-[#FDFBF7] hover:bg-[#FAF4E5] border-[4px] border-[#3E2D20] text-left transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-lg active:scale-98 relative group"
                    style={{ boxShadow: "0 6px 15px rgba(0,0,0,0.15)" }}
                  >
                    {/* Backside mounting cord simulation */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-[#3E2D20] rounded-t-sm" />

                    <div className="flex flex-col justify-between h-36 border border-stone-200/90 rounded-xs p-2 bg-[#FCFAF6]">
                      <div className="flex justify-between items-center text-[8px] text-stone-400 font-serif tracking-widest">
                        <span>POEM #0{poem.id}</span>
                        <span>MIP</span>
                      </div>

                      <div className="text-center py-2">
                        <span className="block text-[8px] text-[#AF8F5C] mb-1">☘️</span>
                        <h4 className="text-sm font-zh-serif font-bold text-stone-800 tracking-wide leading-relaxed truncate group-hover:text-[#8A6D3B]">
                          {poem.frameTitle}
                        </h4>
                        <span className="block text-[9px] text-[#A5998A] mt-1 font-zh-serif leading-none opacity-80">閱讀詩稿 &gt;</span>
                      </div>

                      <div className="text-center pt-1 border-t border-stone-100 text-[8px] text-stone-400 tracking-wide font-zh-serif uppercase">
                        EXHIBITION MOVEMENT
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ARTWORK PARCHMENT BOOKLET OVERLAY MODAL (Looks like an elegant open old booklet with quill) */}
            {openedPoem && (
              <div className="fixed inset-0 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in select-none">
                <div 
                  className="bg-[#FCFAF6] border-2 border-[#DCD0B7] p-6 sm:p-10 rounded-sm max-w-lg w-full relative poster-mounted-shadow animate-scale-up border-double"
                  style={{ backgroundImage: "radial-gradient(ellipse at 50% 50%, #FFFDF9 0%, #FAFAF4 100%)" }}
                >
                  
                  {/* Antique header seal ribbon */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#AF8F5C]/25 text-[#8A6D3B] text-[8px] flex items-center justify-center border-b border-x border-[#AF8F5C]/50 rounded-b-xs tracking-wider">
                    POEM FILE
                  </div>

                  <button
                    onClick={() => {
                      setOpenedPoem(null);
                      stopNarrative();
                    }}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full border border-stone-200 hover:border-[#AF8F5C] hover:bg-[#FAF4E5] flex items-center justify-center text-[#2C241B] hover:text-[#8A6D3B] transition-colors"
                    title="關閉"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-6 pt-2">
                    
                    {/* Poem Header Title */}
                    <div className="text-center pb-3 border-b border-stone-200/50 space-y-1">
                      <span className="text-[10px] text-[#AF8F5C] tracking-[0.25em] font-serif font-bold uppercase">MIP MEMORIAL BOOKLET</span>
                      <h3 className="text-xl sm:text-2xl font-zh-serif font-bold text-[#2C241B] tracking-wide pt-1">
                        {openedPoem.title}
                      </h3>
                    </div>

                    {/* True elegant handwritten parchment calligraphy print */}
                    <div className="py-2 flex justify-center text-center">
                      <div className="text-slate-800 font-zh-serif text-sm sm:text-base leading-loose tracking-[0.16em] whitespace-pre-line select-text max-h-[300px] overflow-y-auto px-4 border-l-2 border-[#AF8F5C]/20 border-r-2 pr-4 italic">
                        {openedPoem.fullText}
                      </div>
                    </div>

                    {/* Metadata & Scripture citation */}
                    <div className="flex justify-between items-center pt-4 border-t border-stone-250/50 text-[11px] text-[#AF8F5C] font-zh-serif font-semibold">
                      <span>{openedPoem.scripture}</span>
                      
                      <button
                        onClick={() => startNarrative(openedPoem.title, openedPoem.fullText)}
                        className={`inline-flex items-center space-x-1.5 px-3.5 py-1 border border-[#AF8F5C]/50 rounded-full text-xs transition-colors ${
                          narratingTitle === openedPoem.title 
                            ? "bg-[#AF8F5C] text-white border-transparent" 
                            : "hover:bg-[#FAF4E5] text-[#8A6D3B]"
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{narratingTitle === openedPoem.title ? "語音朗誦中" : "聆聽詩朗誦"}</span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* =======================================================
            TAB 5: 箴言話語 (PROVERBS - SPIRITUAL GEMSTONE DRAWING)
            ======================================================= */}
        {activeTab === "proverbs" && (
          <div className="w-full flex-1 space-y-8 animate-fade-in pt-1">
            
            {/* Title ornament */}
            <div className="text-center select-none">
              <span className="inline-block text-[#AF8F5C] text-xs">💎 互 動 式 心 靈 抽 籤 💎</span>
              <h2 className="text-2xl sm:text-3xl font-zh-serif tracking-[0.2em] font-semibold text-[#2C241B] mt-1">
                箴言話語
              </h2>
              <p className="text-[10px] text-stone-400 font-serif tracking-widest uppercase mt-0.5">THE HEART SHAPED INSIGHT ALCHEMIST</p>
            </div>

            {/* INTERACTIVE ALTARE / STAND (Holding the 4 glowing gemstones) */}
            <div className="bg-[#FFFDF9] border border-[#E8DFC2] p-6 sm:p-9 rounded-sm shadow-xs select-none text-center">
              
              <div className="max-w-xl mx-auto space-y-3 mb-8">
                <span className="text-[11px] font-bold text-[#AF8F5C] tracking-[0.25em] block uppercase">DAILY CARD DRAW</span>
                <p className="text-base sm:text-lg text-[#2C241B] font-zh-serif font-bold">
                  「今天，你想聽見什麼提醒呢？」
                </p>
                <p className="text-xs text-[#6E5F4E] font-zh-serif leading-relaxed">
                  請點擊下方四顆懸浮發光的心靈寶石之一。點按時會聽見來自遠古的清涼玻璃自鳴，並為你抽出對應此刻心境的智慧箴言。
                </p>
              </div>

              {/* The Platform holding 1 of the 4 gemstones (Glow and hover states) */}
              <div className="relative p-6 bg-gradient-to-b from-[#FAF8F2] to-[#ECE3D5] rounded-sm border border-stone-200 shadow-inner max-w-2xl mx-auto mb-8">
                
                {/* Platform shelf edge background */}
                <div className="absolute bottom-0 inset-x-0 h-4 bg-[#C8BC9E] border-t border-[#A89C7E] rounded-b-xs" />

                <div className="flex justify-around items-end pt-4 pb-8 relative z-10">
                  {GEMSTONES.map((gem) => {
                    const active = selectedGemId === gem.id;
                    return (
                      <button
                        key={gem.id}
                        onClick={() => harvestGemstoneProverb(gem)}
                        className="flex flex-col items-center space-y-3 transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer focus:outline-none"
                      >
                        {/* Glowing orb of gemstones */}
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl sm:text-3xl border-2 border-white/60 transition-all duration-500 hover:scale-110 ${
                          active 
                            ? `${gem.glowClass} scale-110 ring-4 ring-[#AF8F5C]/15` 
                            : "bg-white/90 border-[#DFD3BA] shadow-md group-hover:shadow-lg hover:border-slate-300"
                        }`}>
                          <span className={`${active ? 'animate-bounce' : 'group-hover:animate-pulse'}`}>{gem.icon}</span>
                        </div>
                        
                        {/* Label */}
                        <span className={`text-xs sm:text-sm font-zh-serif font-bold transition-colors ${
                          active ? "text-[#8A6D3B] font-extrabold" : "text-stone-500 group-hover:text-[#2C241B]"
                        }`}>
                          {gem.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Parchment Display stand card drawing result block */}
              {selectedGemId ? (
                <div className="max-w-xl mx-auto bg-[#FDFBF7] p-6 sm:p-9 border border-[#AF8F5C] rounded-sm poster-mounted-shadow relative overflow-hidden select-none animate-fade-in">
                  
                  {/* Corner water-color stains */}
                  <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-[#AF8F5C]/10 blur-[15px]" />
                  <div className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full bg-[#AF8F5C]/10 blur-[15px]" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#E8DFC2] pb-2 text-[10px] text-[#A5998A] font-serif font-medium uppercase tracking-widest">
                      <span>DRAWN MIP WISDOM MAXIM</span>
                      <span className="text-[#AF8F5C] font-semibold font-zh-serif">已抽出 • {GEMSTONES.find(g => g.id === selectedGemId)?.name}主題</span>
                    </div>

                    <div className="py-4 text-center">
                      <p className="text-[#2C241B] font-zh-serif text-sm sm:text-base leading-loose tracking-wider select-text italic px-1">
                        {drawnQuote}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-[#E8DFC2] gap-4">
                      
                      <button
                        onClick={() => startNarrative(`${GEMSTONES.find(g => g.id === selectedGemId)?.name}箴言`, drawnQuote)}
                        className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 border border-[#AF8F5C]/40 rounded-sm text-xs font-zh-serif transition-colors text-[#8A6D3B] bg-white ${
                          narratingTitle.startsWith(`${GEMSTONES.find(g => g.id === selectedGemId)?.name}`)
                            ? "bg-[#AF8F5C] text-white border-transparent"
                            : "hover:bg-[#FAF4E5]"
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{narratingTitle.startsWith(`${GEMSTONES.find(g => g.id === selectedGemId)?.name}`) ? "語音宣讀中" : "聽講箴言"}</span>
                      </button>

                      <button
                        onClick={reDrawProverb}
                        className="flex items-center space-x-1.5 px-4 py-1.5 bg-gradient-to-r from-[#B0905D] to-[#917548] text-white text-xs tracking-widest rounded-sm font-semibold hover:from-[#9B7D4F] hover:to-[#7E653C] shadow-sm transition-all duration-300 font-zh-serif"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-white" />
                        <span>再抽一句</span>
                      </button>

                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-xl mx-auto py-12 px-6 border border-dashed border-stone-200 rounded-sm text-stone-400 font-zh-serif text-xs sm:text-sm">
                  📢 尚未觸摸靈性的寶石。點擊上方任何一顆石頭來獲得您今日特別的關懷勉勵心語。
                </div>
              )}

            </div>

            {/* Platform quote signature watermark */}
            <div className="text-center py-2 select-none">
              <span className="text-xs tracking-widest text-[#AF8F5C] font-zh-serif italic block">
                「神的話語，如磐石扎根在心靈，照亮你的每一天。」
              </span>
            </div>

          </div>
        )}

        {/* =======================================================
            COMMON APPFOOTER
            ======================================================= */}
        <footer className="mt-12 py-5 border-t border-[#E8DFC2]/80 text-center select-none text-[11px] text-[#A5998A] tracking-wider leading-relaxed">
          <p className="font-serif uppercase">
            MASTERPIECE IN PROGRESS • 奇石 ․ 詩 ․ 箴言展
          </p>
          <p className="mt-1.5 font-zh-serif">
            「石頭、萬物、人，都是神親手雕刻的傑作品。」• 藝術、生命與心靈修煉的展廳探索
          </p>
          <p className="mt-1">
            © 2026 Virtual Exhibition. Crafted in Minimalist Ivory Parchment Theme.
          </p>
        </footer>

      </main>
    </div>
  );
}
