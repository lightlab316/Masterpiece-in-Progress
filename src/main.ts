/**
 * Masterpiece In Progress - Online Exhibition Orchestration
 * Pure Vanilla JavaScript/TypeScript to maximize portability and solve blank screen issues
 */

import './index.css';

// Global constant datasets for stories, poems, and proverbs
interface StoryStone {
  id: number;
  name: string;
  tagline: string;
  desc: string;
  reflection: string[];
  img: string;
  audioScript: string;
}

const STORY_STONES: StoryStone[] = [
  {
    id: 1,
    name: "大象石",
    tagline: "「尋找你真正的價值吧！」",
    desc: "從一般角度看，牠不過是一塊在荒野中經受風霜、起伏不平的不起眼巨石。但只要我們換個位置，從某個特定、正確的核心角度重新端廂，卻能驚喜地看見一隻昂首甩鼻、生動無比的宏偉大象形象。這件天然傑作啟迪我們：不論看人生、萬物還是自己，評價完全取決於你選擇站立的視角。",
    reflection: [
      "在一言一行或面臨選擇時，你是否常因他人的單一評價而懷疑自我的價值？",
      "如何站在更寬廣的智慧視角上，重新發掘出自己靈魂最棒的卓越形象？"
    ],
    img: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=800",
    audioScript: "您好，歡迎享受一號奇石大象石的傾聽。這顆奇石的輪廓酷似一頭健壯的大象。它告訴我們：當我們選擇正確的方向，頑石也將展現非凡的美。人也是一樣，評價的好壞常取決於視角，用包容、真實的角度來看待自己，能幫助我們活出最宏偉的大象形象。"
  },
  {
    id: 2,
    name: "老鷹石",
    tagline: "「展翅翱翔於崇山高空！」",
    desc: "這塊奇石形如一隻收翼歛羽、傲然兀立在陡峭絕壁頂端的雄鷹，正眺望著不可知的遠方。哪怕被狂風拍打、被冰雪覆蓋，牠依舊在等待最佳的風勢，隨時拍擊厚重的翅翼，將天地踏在足下。牠用挺拔的身軀告訴人們：生命的高度取決於我們內心燃燒的意志與格局。",
    reflection: [
      "回顧至今面臨的低谷與瓶頸，你是否能像老鷹一樣，站在高處重燃勇氣，俯瞰風浪？",
      "當時代的磨難與考驗來臨時，你是否做好了磨煉信念羽翼的準備，等待隨風翱翔？"
    ],
    img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800",
    audioScript: "您好，歡迎欣賞二號奇石老鷹石。這塊石頭形如站在懸崖邊隨時展翅的雄鷹。它用昂揚的姿態告訴我們：忍受高處的寒風，並非孤傲自憐，而是為了在大風起兮時，能乘風直上九霄。願我們都能在磨鍊中長出強健的羽翮。"
  },
  {
    id: 3,
    name: "駱駝石",
    tagline: "「負重致遠的堅毅旅人」",
    desc: "牠神似一隻跪伏在滾滾風沙、茫茫戈壁之中的健碩駱駝，雙峰高聳，溫順而敦實。駱駝背上承載著沉重的旅人背囊，忍受著烈日與缺水的煎熬，仍然踏踏實實踏出每一步，抵達綠洲。這顆奇石象徵著生命的造就離不開擔當，而擔當與負重正雕琢出靈魂的沉穩跟大器。",
    reflection: [
      "面臨看似無休止的漫長考驗或日常繁重任務時，你選擇的是怨懟還是視為磨練的契機？",
      "你是否能明白：此刻默默承載的責任和重擔，正在一步步把你塑造成一個能挑大梁的頂天大器？"
    ],
    img: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=800",
    audioScript: "您好，這裡是三號奇石駱駝石的介紹。這塊奇石如同荒漠中默默行走的駱駝。它啟示我們：偉大的事物需要持之以恆的忍耐與負重前行。每一步厚實的腳印，都是克服風沙的勳章，終將引導我們抵達豐盛的綠洲。"
  },
  {
    id: 4,
    name: "聚寶盆",
    tagline: "「內在發光的寶藏」",
    desc: "外貌不過是一顆樸實、粗糙、甚至帶著厚重泥沙的平凡戈壁原石，沒有半分引人注目的特徵。可一旦被切削開剖面，內裡卻蘊藏著流光溢彩、令人屏息的瑰麗紫色瑪瑙與璀璨奪目的水晶簇。牠對我們發出無聲的呼喚：休要被外在的面紗遮蔽。真正寶貴的，是靈魂深處被琢磨並修造出的美麗特質與良善。",
    reflection: [
      "我們是否常因不起眼的外表而自餒？如何把注意力挪向自我開發與修築真善美的內在上？",
      "在人生與環境中，你是否願意投入計畫性的造就，好讓內心與精神爆發出萬倍的光芒？"
    ],
    img: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=800",
    audioScript: "歡迎欣賞四號展品聚寶盆。這是一塊表面不修邊幅，內部卻藏有瑰美晶洞的奇石。它告訴我們：真正名貴的寶石，都在最深處發光。不要看自己平凡的外在而沮喪，要在心靈與格局中計畫性地造就自己，你就是發光的無價寶盆。"
  },
  {
    id: 5,
    name: "鯡魚石",
    tagline: "「魚躍龍門的永恆生命力」",
    desc: "長年沉潛於最冰冷深邃洋流中的生命痕跡，被完好不朽地拓印於這塊青灰岩石之上。那是魚兒在面對激流與狂潮時，竭盡所有靈魂氣力迎風一躍、擺尾向著光明騰空的優美姿態。牠象徵著戰勝沉寂的『復活精神』——即使四周寒冷一片，也能使內在念頭與信仰重新復活，走向高層次生活。",
    reflection: [
      "當周遭環境如同冰冷死水，你是否仍有勇氣和信心打破現狀、使自己昏沉的心靈復活起來？",
      "如何能在最平凡的每日生活裡，跳脫舊有不好的慣性習慣，向著美好的大方向躍開？"
    ],
    img: "https://images.unsplash.com/photo-1502481851512-e9e2529bbbf9?q=80&w=800",
    audioScript: "您好，這裡是五號展品鯡魚石的語音解說。這枚印刻在堅固岩石上的魚類化石，記錄了它躍出水面的一瞬間。它像徵著在任何冰冷和困境下都不屈不撓、使靈魂、信仰和想法復活的精神。只要下定決心向上跳躍，冰冷的生活必將因你的鬥志而重燃希望。"
  },
  {
    id: 6,
    name: "肉形石",
    tagline: "「經歷雕琢的極致典範」",
    desc: "天然碧石條理分明，經過工匠高超的順理巧雕：為肌理施色、為油脂開孔，將一塊冰冷頑固的石頭變化成了名動海內、令人讚不絕口的無價奇珍。這啟示著：不論多麼不完美的人或天生原石，一旦接受完美的管理與持之以恆的磨修實踐，就能實現超乎想像的命運重塑，彰顯完美榮耀。",
    reflection: [
      "好山、好水、好亭子，世上並無十全十美的地方。你是否願意動手『修造』與『開發』自己？",
      "人越是有秩序與計畫地造就、栽培靈與內心世界，就能使用得比未造就前更有價值千萬倍！"
    ],
    img: "./src/《肉形石》.jpg",
    audioScript: "歡迎聆聽六號展品肉形石的深度導讀。大自然的天然分層為它打好了底子，而工匠耐心的微雕和琢磨使其終能名揚世界。這告訴我們，主動的雕刻和管理至關重要，經歷智慧與意志的修造，普通的岩石也能變成最珍貴的存在。這也是我們自我的復活與命運雕刻。"
  }
];

interface Poem {
  id: number;
  frameTitle: string;
  title: string;
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
    name: "希望之鑽",
    icon: "🌱",
    glowClass: "shadow-[0_0_40px_rgba(245,158,11,0.7)] bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500",
    accentClass: "border-amber-400 text-amber-900 border-t-[#D97706]",
    quotes: [
      "「但那等候的必重新得力。他們必如鷹展翅上騰；他們奔跑卻不困倦，行走卻不疲乏。」",
      "「因為有盼望，你必得安息；你必在四圍巡查，坦然躺臥。」",
      "「看哪！我將要行一件新事，如今就要顯明。我必在荒原開道路，在極漠開山泉。」"
    ]
  },
  {
    id: "peace",
    name: "平安藍玉",
    icon: "🕊️",
    glowClass: "shadow-[0_0_40px_rgba(59,130,246,0.7)] bg-gradient-to-br from-blue-400 via-sky-400 to-cyan-500",
    accentClass: "border-sky-400 text-sky-900 border-t-[#2563EB]",
    quotes: [
      "「願福澤與你同在，保守你。使慈愛的榮光溫和地照亮你，賜恩給你，與你同享長遠平安。」",
      "「我留下平安給你們，我將我的平安賜給你們。這平安不像世人多變的施予。你們心不要憂愁，也不要懼怯。」",
      "「那出人意外的至美平安，必在一切行事與起心動念裡，深深地引領與守護你的心靈。」"
    ]
  },
  {
    id: "courage",
    name: "勇氣赭晶",
    icon: "⛰️",
    glowClass: "shadow-[0_0_40px_rgba(139,92,26,0.7)] bg-gradient-to-br from-yellow-600 via-amber-700 to-amber-900",
    accentClass: "border-amber-700 text-amber-950 border-t-[#78350F]",
    quotes: [
      "「凡事我都能做，因為藉著那源源注入信心加給我力量的，我能戰勝一切低谷考驗。」",
      "「我豈沒有吩咐你嗎？你當剛強壯膽！不要畏縮懼怕，也不要膽怯驚惶。不論你往哪裡去，智慧的真理必常與你同在。」",
      "「賜予我們的不是懦弱膽怯的心，而是包容、剛強、仁愛有自制紀律的強健身心靈。」"
    ]
  },
  {
    id: "love",
    name: "真愛紅珀",
    icon: "❤️",
    glowClass: "shadow-[0_0_40px_rgba(236,72,153,0.7)] bg-gradient-to-br from-rose-400 via-pink-400 to-rose-500",
    accentClass: "border-rose-400 text-rose-950 border-t-[#E11D48]",
    quotes: [
      "「愛是恆久忍耐，又有恩慈。不嫉妒、不自誇、不狂妄、不張揚。凡事包容，凡事相信，凡事盼望，凡事忍耐，愛永不熄滅。」",
      "「我們之所以能付出愛、撫慰他人，是因為我們先被無盡宏大的慈愛深沉厚實地擁抱和潤澤了。」",
      "「我以永恆長遠的熱烈之愛眷顧著你，因此我以大慈愛深深吸引著你。你必定是被疼愛的傑作。」"
    ]
  }
];

// Audio variables for Synthesizer Background Drone
let audioCtx: AudioContext | null = null;
let synthOscs: OscillatorNode[] = [];
let synthGain: GainNode | null = null;
let currentActiveGemId = "hope";

/**
 * Initialize BGM Synthesizer block playing a tranquil multi-frequency pad chord
 */
function initBGM() {
  if (audioCtx) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();

    // Create a smooth low pass filter to make the sound calming and serene
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, audioCtx.currentTime);

    synthGain = audioCtx.createGain();
    // Start very quietly
    synthGain.gain.setValueAtTime(0, audioCtx.currentTime);
    synthGain.gain.linearRampToValueAtTime(0.065, audioCtx.currentTime + 2.5);

    // Drone Chord Frequencies (C-G-C-E Pentatonic Chord block)
    const frequencies = [130.81, 196.00, 261.63, 329.63]; 

    frequencies.forEach((freq) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      // Triangle waves are perfect for warm, flute-like vintage synth sounds
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Add a slight frequency detune LFO (chorus effect)
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, audioCtx.currentTime);

      osc.connect(filter);
      synthOscs.push(osc);
      osc.start();
    });

    filter.connect(synthGain);
    synthGain.connect(audioCtx.destination);

    // Periodic windchime sound simulation (runs in background)
    setInterval(() => {
      playSereneBell();
    }, 9000);

  } catch (e) {
    console.warn("BGM initialization failed:", e);
  }
}

/**
 * Simulate a delicate meditative bell/chime strike
 */
function playSereneBell() {
  if (!audioCtx || audioCtx.state === "suspended" || !synthGain) return;
  
  try {
    // G pentatonic frequencies
    const bellFreqs = [523.25, 587.33, 659.25, 783.99, 880.00];
    const targetFreq = bellFreqs[Math.floor(Math.random() * bellFreqs.length)];

    const osc = audioCtx.createOscillator();
    const bellGain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(targetFreq, audioCtx.currentTime);

    bellGain.gain.setValueAtTime(0, audioCtx.currentTime);
    bellGain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.05);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.5);

    osc.connect(bellGain);
    bellGain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 4.0);
  } catch (err) {
    // Ignore minor Web Audio glitches
  }
}

/**
 * Stop/Resume Synthesizer with smooth linear ramp transitions
 */
function toggleBGM(turnOn: boolean) {
  if (turnOn) {
    initBGM();
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    if (synthGain && audioCtx) {
      synthGain.gain.cancelScheduledValues(audioCtx.currentTime);
      synthGain.gain.setValueAtTime(synthGain.gain.value, audioCtx.currentTime);
      synthGain.gain.linearRampToValueAtTime(0.065, audioCtx.currentTime + 1.5);
    }
    
    // UI changes
    const pulseDot = document.getElementById("bgm-pulse");
    const bgmIconOn = document.getElementById("bgm-icon-on");
    const bgmIconOff = document.getElementById("bgm-icon-off");
    const bgmBtn = document.getElementById("bgm-toggle-btn");

    if (pulseDot) {
      pulseDot.classList.remove("bg-stone-300");
      pulseDot.classList.add("bg-[#AF8F5C]", "animate-pulse");
    }
    if (bgmIconOn) bgmIconOn.classList.remove("hidden");
    if (bgmIconOff) bgmIconOff.classList.add("hidden");
    if (bgmBtn) {
      bgmBtn.classList.remove("bg-white", "text-stone-400");
      bgmBtn.classList.add("bg-[#FAF4E5]", "text-[#AF8F5C]", "border-[#AF8F5C]", "animate-pulse-glow");
    }
  } else {
    if (audioCtx && synthGain) {
      synthGain.gain.cancelScheduledValues(audioCtx.currentTime);
      synthGain.gain.setValueAtTime(synthGain.gain.value, audioCtx.currentTime);
      synthGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.2);
    }

    // UI changes
    const pulseDot = document.getElementById("bgm-pulse");
    const bgmIconOn = document.getElementById("bgm-icon-on");
    const bgmIconOff = document.getElementById("bgm-icon-off");
    const bgmBtn = document.getElementById("bgm-toggle-btn");

    if (pulseDot) {
      pulseDot.classList.add("bg-stone-300");
      pulseDot.classList.remove("bg-[#AF8F5C]", "animate-pulse");
    }
    if (bgmIconOn) bgmIconOn.classList.add("hidden");
    if (bgmIconOff) bgmIconOff.classList.remove("hidden");
    if (bgmBtn) {
      bgmBtn.classList.add("bg-white", "text-stone-400");
      bgmBtn.classList.remove("bg-[#FAF4E5]", "text-[#AF8F5C]", "border-[#AF8F5C]", "animate-pulse-glow");
    }
  }
}

/**
 * Text-to-Speech Narrator using native Web Speech Synthesis
 */
let synthSpeaker = window.speechSynthesis;
let activeUtterance: SpeechSynthesisUtterance | null = null;
let isLoudSpeakerEnabled = false;

function startTTS(title: string, text: string) {
  if (!synthSpeaker) return;
  
  // Stop current narration
  synthSpeaker.cancel();
  
  // Update floating indicator UI
  const floatBanner = document.getElementById("tts-floating-banner");
  const bannerTitle = document.getElementById("tts-tour-title");
  
  if (bannerTitle) bannerTitle.textContent = `聆聽導讀：${title}`;
  if (floatBanner) {
    floatBanner.classList.remove("opacity-0", "pointer-events-none", "scale-95");
    floatBanner.classList.add("opacity-100", "scale-100");
  }

  isLoudSpeakerEnabled = true;

  activeUtterance = new SpeechSynthesisUtterance(text);
  activeUtterance.lang = "zh-TW";
  activeUtterance.rate = 0.95; // peaceful speed
  activeUtterance.pitch = 1.0;

  activeUtterance.onend = () => {
    stopTTS();
  };
  activeUtterance.onerror = () => {
    stopTTS();
  };

  synthSpeaker.speak(activeUtterance);
}

function stopTTS() {
  if (synthSpeaker) {
    synthSpeaker.cancel();
  }
  isLoudSpeakerEnabled = false;

  // Clear float banner
  const floatBanner = document.getElementById("tts-floating-banner");
  if (floatBanner) {
    floatBanner.classList.add("opacity-0", "pointer-events-none", "scale-95");
    floatBanner.classList.remove("opacity-100", "scale-100");
  }
}

// Global active slide pointer for horizontal carousel
let activeCarouselIndex = 0;

/**
 * Updates the 6-stone Carousel Layout dynamically
 */
function renderCarousel() {
  const currentStone = STORY_STONES[activeCarouselIndex];
  
  // Cache targets
  const imgElement = document.getElementById("carousel-img") as HTMLImageElement;
  const nameElement = document.getElementById("carousel-stone-name");
  const taglineElement = document.getElementById("carousel-stone-tagline");
  const descElement = document.getElementById("carousel-stone-desc");
  const reflectionRoot = document.getElementById("carousel-reflection-list");
  const indicatorElement = document.getElementById("carousel-indicator-badge");

  if (!currentStone) return;

  // Render components
  if (imgElement) {
    imgElement.style.opacity = "0.2";
    setTimeout(() => {
      imgElement.src = currentStone.img;
      imgElement.alt = currentStone.name;
      imgElement.style.opacity = "1";
    }, 120);
  }

  if (nameElement) nameElement.textContent = currentStone.name;
  if (taglineElement) taglineElement.textContent = currentStone.tagline;
  if (descElement) descElement.textContent = currentStone.desc;
  if (indicatorElement) indicatorElement.textContent = `0${activeCarouselIndex + 1} / 06`;

  // Render reflection bullets with increased legibility text sizes
  if (reflectionRoot) {
    reflectionRoot.innerHTML = "";
    currentStone.reflection.forEach((q) => {
      const li = document.createElement("li");
      li.className = "flex items-start space-x-2 text-[15px] sm:text-[16px] leading-relaxed text-stone-700";
      li.innerHTML = `<span class="text-[#AF8F5C] mr-0.5 select-none">✦</span><span>${q}</span>`;
      reflectionRoot.appendChild(li);
    });
  }

  // Update dots indicator active states
  const dotsContainer = document.getElementById("carousel-dots-indicator");
  if (dotsContainer) {
    const dots = dotsContainer.querySelectorAll("button");
    dots.forEach((dot, index) => {
      if (index === activeCarouselIndex) {
        dot.className = "w-6 h-2 rounded-full bg-[#AF8F5C] transition-all duration-300";
      } else {
        dot.className = "w-2 h-2 rounded-full bg-stone-300 hover:bg-stone-400 transition-all duration-300 cursor-pointer";
      }
    });
  }

  // Update thumbnail high-contrast border focus
  const thumbnailItems = document.querySelectorAll(".carousel-thumb-btn");
  thumbnailItems.forEach((btn, index) => {
    if (index === activeCarouselIndex) {
      btn.className = "carousel-thumb-btn p-1 bg-[#FAF4E5] border-2 border-[#AF8F5C] rounded-sm transition-all duration-300 scale-102 shadow-xs cursor-pointer";
    } else {
      btn.className = "carousel-thumb-btn p-1 bg-white border border-stone-200 hover:border-stone-400 rounded-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer";
    }
  });
}

/**
 * Handle direct drawing of proverbs with crystal windchime noise feedback
 */
function drawProverb(category: string, isRedraw: boolean = false) {
  currentActiveGemId = category;
  const targetGem = GEMSTONES.find(g => g.id === category);
  if (!targetGem) return;

  // Play chime strike
  triggerGlassChimeBell();

  // Highlight selected Gem container border
  const gemButtons = document.querySelectorAll(".proverb-gem-card");
  gemButtons.forEach(btn => {
    const bId = btn.getAttribute("data-gem-id");
    if (bId === category) {
      btn.classList.add("scale-103", "ring-2", "ring-[#AF8F5C]");
    } else {
      btn.classList.remove("scale-103", "ring-2", "ring-[#AF8F5C]");
    }
  });

  // Pull random quote
  const randomIndex = Math.floor(Math.random() * targetGem.quotes.length);
  const selectedQuoteText = targetGem.quotes[randomIndex];

  const stageBox = document.getElementById("drawn-box-stage");
  const quotePanel = document.getElementById("drawn-quote-pnl");
  const badgeElement = document.getElementById("drawn-gem-badge");
  const textArea = document.getElementById("drawn-text-area");

  if (stageBox) stageBox.classList.remove("hidden");

  if (badgeElement) {
    badgeElement.innerHTML = `<span class="mr-1.5">${targetGem.icon}</span>${targetGem.name.toUpperCase()}`;
  }

  if (quotePanel) {
    // Theme border-top color dynamic matching
    let colorPrefix = "#AF8F5C";
    if (category === "peace") colorPrefix = "#3B82F6";
    if (category === "courage") colorPrefix = "#78350F";
    if (category === "love") colorPrefix = "#E11D48";
    quotePanel.style.borderTopColor = colorPrefix;
  }

  if (textArea) {
    textArea.classList.add("opacity-0", "translate-y-1");
    setTimeout(() => {
      textArea.textContent = selectedQuoteText;
      textArea.classList.remove("opacity-0", "translate-y-1");
    }, 180);
  }
}

/**
 * Web Audio sound engine representing an authentic crystal wine glass/windchime scale
 */
function triggerGlassChimeBell() {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    const tempCtx = new AudioContextClass();
    const osc1 = tempCtx.createOscillator();
    const osc2 = tempCtx.createOscillator();
    const gainNode = tempCtx.createGain();

    osc1.type = "sine";
    osc2.type = "sine";

    // Pitch paired high frequencies to simulate clean, glass resonant chime frequencies
    osc1.frequency.setValueAtTime(880, tempCtx.currentTime); // A5 harmonic
    osc2.frequency.setValueAtTime(1480, tempCtx.currentTime); // F#6 crystal resonance

    gainNode.gain.setValueAtTime(0, tempCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.12, tempCtx.currentTime + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, tempCtx.currentTime + 1.8);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(tempCtx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(tempCtx.currentTime + 2.0);
    osc2.stop(tempCtx.currentTime + 2.0);
  } catch (e) {
    console.warn("Glass audio strike failed:", e);
  }
}

// Make startTTS accessible globally for easy onclick attachment on buttons
(window as any).startTTS = startTTS;

// DOM Event triggers
document.addEventListener("DOMContentLoaded", () => {

  // FADE INTO INITIAL TAB VIEW ON LOAD
  const initialTab = "home";
  
  // Navigation mechanism
  const navBtns = document.querySelectorAll(".nav-btn");
  const roomSections = document.querySelectorAll(".room-section");

  function switchTab(targetId: string) {
    // De-activate current sound guide to make navigation clean
    stopTTS();

    roomSections.forEach((section) => {
      section.classList.add("hidden");
      section.classList.remove("animate-fade-in");
    });

    const activeSection = document.getElementById(`room-${targetId}`);
    if (activeSection) {
      activeSection.classList.remove("hidden");
      activeSection.classList.add("animate-fade-in");
    }

    // Nav list highlight adjustment
    navBtns.forEach((btn) => {
      const dataTab = btn.getAttribute("data-tab");
      const dot = btn.querySelector(".nav-dot");
      const icon = btn.querySelector("svg");

      if (dataTab === targetId) {
        btn.className = "nav-btn w-auto lg:w-full flex items-center space-x-3.5 px-4 py-3 rounded-xs transition-all duration-300 relative text-left text-[#8A6D3B] font-semibold bg-[#FAF4E5] shadow-[inset_1px_1px_0_rgba(255,255,255,1)] border border-[#E1D3B4]";
        if (dot) dot.classList.remove("hidden");
        if (icon) {
          icon.classList.remove("text-stone-400");
          icon.classList.add("text-[#AF8F5C]");
        }
      } else {
        btn.className = "nav-btn w-auto lg:w-full flex items-center space-x-3.5 px-4 py-3 rounded-xs transition-all duration-300 relative text-left text-[#6E5F4E] border border-transparent hover:bg-[#FAF6EE]/75";
        if (dot) dot.classList.add("hidden");
        if (icon) {
          icon.classList.remove("text-[#AF8F5C]");
          icon.classList.add("text-stone-400");
        }
      }
    });

    // Reset window scrolling
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Bind sidebar buttons
  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      if (target) switchTab(target);
    });
  });

  // Bind general redirect shortcuts inside pages
  document.addEventListener("click", (evt) => {
    const target = evt.target as HTMLElement;
    const gotoBtn = target.closest("[data-goto-tab]");
    if (gotoBtn) {
      const targetTab = gotoBtn.getAttribute("data-goto-tab");
      if (targetTab) switchTab(targetTab);
    }
  });

  // Bind specific home static buttons
  document.getElementById("btn-goto-intro")?.addEventListener("click", () => switchTab("intro"));
  document.getElementById("btn-goto-stories")?.addEventListener("click", () => switchTab("stories"));

  // BGM Toggling
  let bgmOn = false;
  document.getElementById("bgm-toggle-btn")?.addEventListener("click", () => {
    bgmOn = !bgmOn;
    toggleBGM(bgmOn);
  });

  // Hotspots marker logic on Home Screen Elephant Image
  const markers = document.querySelectorAll(".hero-marker");
  markers.forEach((marker) => {
    marker.addEventListener("click", (evt) => {
      evt.stopPropagation();
      const parent = marker.parentElement;
      const bubble = parent?.querySelector(".marker-bubble");
      const isVisible = bubble && !bubble.classList.contains("hidden");

      // Clear other open bubbles first
      document.querySelectorAll(".marker-bubble").forEach(b => b.classList.add("hidden"));

      if (bubble && !isVisible) {
        bubble.classList.remove("hidden");
      }
    });
  });

  // Global document click to close hovering visual bubbles
  document.addEventListener("click", () => {
    document.querySelectorAll(".marker-bubble").forEach(b => b.classList.add("hidden"));
  });

  // Stop TTS floating banner
  document.getElementById("tts-stop-btn")?.addEventListener("click", stopTTS);

  // Carousel Next / Prev arrows linking
  document.getElementById("carousel-btn-prev")?.addEventListener("click", () => {
    activeCarouselIndex = (activeCarouselIndex - 1 + STORY_STONES.length) % STORY_STONES.length;
    renderCarousel();
  });
  document.getElementById("carousel-btn-next")?.addEventListener("click", () => {
    activeCarouselIndex = (activeCarouselIndex + 1) % STORY_STONES.length;
    renderCarousel();
  });

  // Carousel inline sound narration button
  document.getElementById("carousel-play-narration")?.addEventListener("click", () => {
    const curStone = STORY_STONES[activeCarouselIndex];
    if (curStone) {
      startTTS(curStone.name, curStone.audioScript);
    }
  });

  // Draw carousel dots indicator navigation
  const dotsContainer = document.getElementById("carousel-dots-indicator");
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    STORY_STONES.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "w-2 h-2 rounded-full bg-stone-300 cursor-pointer";
      dot.title = `切換至第 ${index + 1} 展件`;
      dot.addEventListener("click", () => {
        activeCarouselIndex = index;
        renderCarousel();
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Draw carousel bottom thumbnails bar
  const thumbnailsRoot = document.getElementById("carousel-thumbnails-root");
  if (thumbnailsRoot) {
    thumbnailsRoot.innerHTML = "";
    STORY_STONES.forEach((stone, index) => {
      const btn = document.createElement("button");
      btn.className = "carousel-thumb-btn p-1 bg-white border border-stone-200 rounded-sm transition-all duration-300 hover:scale-102 cursor-pointer";
      btn.innerHTML = `
        <div class="aspect-square w-full rounded-xs overflow-hidden bg-stone-50">
          <img src="${stone.img}" alt="${stone.name}" class="w-full h-full object-cover grayscale-[3%] brightness-[97%] pointer-events-none" />
        </div>
        <span class="block text-[11px] font-zh-serif font-black text-stone-800 text-center mt-1 truncate">${stone.name}</span>
      `;
      btn.addEventListener("click", () => {
        activeCarouselIndex = index;
        renderCarousel();
      });
      thumbnailsRoot.appendChild(btn);
    });
  }

  // Render first slide
  renderCarousel();

  // Draw Spirit Poems Wall
  const poemsWallRoot = document.getElementById("poems-wall-grid");
  if (poemsWallRoot) {
    poemsWallRoot.innerHTML = "";
    POEMS.forEach((poem) => {
      const itemCard = document.createElement("button");
      // Outer elegant poster hanging borders representing authentic picture frame
      itemCard.className = "group text-left border-4 border-[#3A2A1A]/85 bg-white p-5 rounded-xs transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-2 cursor-pointer aspect-[3/4.2] flex flex-col justify-between glossy-sheen relative";
      itemCard.innerHTML = `
        <!-- Custom hanging hook graphic -->
        <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-stone-300 bg-stone-300 pointer-events-none z-10 flex items-center justify-center">
          <div class="w-1.5 h-1.5 rounded-full bg-[#8A6D3B]"></div>
        </div>

        <div class="border border-[#E9DDBB] bg-[#FCFAF5]/95 p-4.5 h-full flex flex-col justify-between rounded-xs">
          <div>
            <div class="flex items-center justify-between text-[#AF8F5C] border-b border-stone-100 pb-1.5 mb-3.5">
              <span class="text-[9px] font-bold tracking-[0.25em] font-serif uppercase">MIP POEM • 0${poem.id}</span>
              <span class="text-xs">📜</span>
            </div>
            
            <h4 class="text-base sm:text-lg font-zh-serif font-black text-[#2C241B] tracking-wide leading-relaxed group-hover:text-[#8A6D3B] transition-colors">
              ${poem.frameTitle}
            </h4>
            <p class="text-[14px] sm:text-[15px] text-stone-500 leading-relaxed font-zh-serif mt-3 text-justify line-clamp-5">
              ${poem.fullText.replace(/\\n/g, "\n")}
            </p>
          </div>

          <div class="pt-3 border-t border-stone-100 flex items-center justify-between">
            <span class="block text-[11px] text-[#A5998A] font-zh-serif leading-none font-bold uppercase tracking-widest">閱讀詩稿 &gt;</span>
            <span class="text-[10px] text-stone-400 font-serif tracking-wider font-semibold">${poem.scripture}</span>
          </div>
        </div>
      `;

      // Assign click triggers opening beautiful lightbox book scroll
      itemCard.addEventListener("click", () => {
        const lightbox = document.getElementById("poem-lightbox-layer");
        const scrollCard = document.getElementById("poem-inner-card");
        const titleTarget = document.getElementById("expanded-poem-title");
        const bodyTarget = document.getElementById("expanded-poem-body");
        const citarTarget = document.getElementById("expanded-poem-citation");
        const audioBtn = document.getElementById("expanded-poem-tts");

        if (titleTarget) titleTarget.textContent = poem.title;
        if (bodyTarget) bodyTarget.textContent = poem.fullText;
        if (citarTarget) citarTarget.textContent = poem.scripture;

        // Custom clean bindings for the TTS guide within lightbox
        if (audioBtn) {
          audioBtn.onclick = () => {
            const cleanText = `${poem.title}。${poem.fullText}。這首詩告訴我們智慧與安息。`;
            startTTS(poem.frameTitle, cleanText);
          };
        }

        if (lightbox) {
          lightbox.classList.remove("opacity-0", "pointer-events-none");
          lightbox.classList.add("opacity-100");
        }
        if (scrollCard) {
          scrollCard.classList.remove("scale-95");
          scrollCard.classList.add("scale-100");
        }
      });

      poemsWallRoot.appendChild(itemCard);
    });
  }

  // Lightbox close binds
  document.getElementById("poem-lightbox-close")?.addEventListener("click", () => {
    const lightbox = document.getElementById("poem-lightbox-layer");
    const scrollCard = document.getElementById("poem-inner-card");

    if (lightbox) {
      lightbox.classList.add("opacity-0", "pointer-events-none");
      lightbox.classList.remove("opacity-100");
    }
    if (scrollCard) {
      scrollCard.classList.add("scale-95");
      scrollCard.classList.remove("scale-100");
    }
    stopTTS();
  });

  // Lightbox close when clicking dim background overlay
  document.getElementById("poem-lightbox-layer")?.addEventListener("click", (evt) => {
    if (evt.target === document.getElementById("poem-lightbox-layer")) {
      document.getElementById("poem-lightbox-close")?.click();
    }
  });

  // Draw Proverbs Gemstones Row selector
  const gemsContainer = document.getElementById("proverb-gems-container");
  if (gemsContainer) {
    gemsContainer.innerHTML = "";
    GEMSTONES.forEach((gem) => {
      const card = document.createElement("button");
      card.className = "proverb-gem-card group p-6 bg-[#FCFAF6] border border-[#E9DDBB] hover:border-[#AF8F5C] rounded-xs text-center flex flex-col items-center justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1";
      card.setAttribute("data-gem-id", gem.id);
      
      card.innerHTML = `
        <div class="w-16 h-16 rounded-full flex items-center justify-center text-4xl mb-4 transition-all duration-500 hover:scale-110 ${gem.glowClass}">
          ${gem.icon}
        </div>
        <h4 class="text-[16px] font-zh-serif font-black text-stone-800 tracking-wider">
          ${gem.name}
        </h4>
        <span class="text-[10px] text-[#A5998A] font-serif font-bold tracking-widest mt-1 block uppercase">TAP TO DRAW</span>
      `;

      card.addEventListener("click", () => {
        drawProverb(gem.id);
      });

      gemsContainer.appendChild(card);
    });
  }

  // Bind Re-draw and TTS inside proverb drawn panel
  document.getElementById("btn-re-draw")?.addEventListener("click", () => {
    drawProverb(currentActiveGemId, true);
  });

  document.getElementById("btn-drawn-tts")?.addEventListener("click", () => {
    const textArea = document.getElementById("drawn-text-area");
    const curGem = GEMSTONES.find(g => g.id === currentActiveGemId);
    if (textArea && curGem) {
      startTTS(`${curGem.name}箴言`, textArea.textContent || "");
    }
  });

});
