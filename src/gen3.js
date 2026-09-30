// v3：質感再升級 + 17 顆（含 7 顆開發中）。A「質感色磚」、B「品牌卡片」
const fs = require('fs'), path = require('path');
const BRAND = '#63ccca';
const MINT_SOFT = '#d6ede9', PEACH_SOFT = '#fbe3dc', CREAM = '#fdfbf7', INK = '#2b3942';
const SERIF_LAT = "'Playfair Display', Georgia, serif";
const SERIF_CJK = "'Noto Serif TC', 'PMingLiU', serif";
const MONO = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'monogram-b.png')).toString('base64');

const DIV = {
  div1:  { name: 'Div1 建立處・管理處',            color: '#5C6B76', zh: '石墨藍' },
  div2a: { name: 'Div2A 行銷處・數位/官網',        color: '#B85C7A', zh: '莓果' },
  div2b: { name: 'Div2B 行銷處・專櫃',             color: '#CF6F5A', zh: '陶土' },
  div3:  { name: 'Div3 財務處',                    color: '#4E8B62', zh: '松綠' },
  div4:  { name: 'Div4 生產處・訂單/採購/庫存',    color: '#AD8149', zh: '蜂蜜金' },
  div6:  { name: 'Div6 公共關係處・社群',          color: '#8E7CB8', zh: '藕紫' },
  div7:  { name: 'Div7 主管處・經企/數據',         color: '#3F9C98', zh: '薄荷（企業色系）' },
};

function mix(hex, to, t) {
  const h = x => parseInt(x, 16);
  const a = [1, 3, 5].map(i => h(hex.slice(i, i + 2)));
  const b = [1, 3, 5].map(i => h(to.slice(i, i + 2)));
  return '#' + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, '0')).join('');
}
const hexToUnit = hex => [1, 3, 5].map(i => (parseInt(hex.slice(i, i + 2), 16) / 255).toFixed(3));

// 雙色調 glyph：S=實白、T=半透明白、O=白描邊、A=點綴色描邊、ac=點綴色
const GLYPH = {
  coin_split: (S, T, O, A, ac) => `
    <circle cx="0" cy="-24" r="64" ${T}/><circle cx="0" cy="-24" r="64" stroke-width="15" ${O}/>
    <text x="0" y="6" text-anchor="middle" font-family="${SERIF_LAT}" font-weight="900" font-size="84" fill="#fff">$</text>
    <circle cx="-60" cy="82" r="13" fill="${ac}"/><circle cx="0" cy="82" r="13" fill="${ac}"/><circle cx="60" cy="82" r="13" fill="${ac}"/>`,
  bars: (S, T, O, A, ac) => `
    <rect x="-92" y="16" width="50" height="72" rx="10" fill="#fff" fill-opacity=".45"/>
    <rect x="-25" y="-30" width="50" height="118" rx="10" fill="#fff" fill-opacity=".8"/>
    <rect x="42" y="-88" width="50" height="176" rx="10" fill="${ac}"/>`,
  clipboard_check: (S, T, O, A) => `
    <rect x="-80" y="-78" width="160" height="170" rx="20" ${T}/><rect x="-80" y="-78" width="160" height="170" rx="20" stroke-width="13" ${O}/>
    <rect x="-34" y="-96" width="68" height="34" rx="12" ${S}/>
    <polyline points="-42,10 -10,42 44,-22" stroke-width="22" ${A}/>`,
  radar: (S, T, O, A, ac) => `
    <path d="M0,0 L48,-83 A96,96 0 0 1 96,0 Z" ${T}/>
    <circle cx="0" cy="0" r="96" stroke-width="15" ${O}/><circle cx="0" cy="0" r="48" stroke-width="11" ${O}/>
    <line x1="0" y1="0" x2="48" y2="-83" stroke-width="16" ${O}/>
    <circle cx="40" cy="44" r="15" fill="${ac}"/>`,
  exchange: (S, T, O, A) => `
    <circle cx="0" cy="4" r="98" fill="#fff" fill-opacity=".12"/>
    <line x1="-84" y1="-32" x2="76" y2="-32" stroke-width="24" ${O}/><polyline points="36,-72 76,-32 36,8" stroke-width="24" ${O}/>
    <line x1="84" y1="40" x2="-76" y2="40" stroke-width="24" ${A}/><polyline points="-36,0 -76,40 -36,80" stroke-width="24" ${A}/>`,
  box_search: (S, T, O, A) => `
    <g transform="translate(-14,0)">
    <polygon points="-20,-92 58,-48 -20,-4 -98,-48" ${S}/>
    <polygon points="-98,-48 -20,-4 -20,84 -98,40" fill="#fff" fill-opacity=".62"/>
    <polygon points="-20,-4 58,-48 58,40 -20,84" fill="#fff" fill-opacity=".38"/>
    <circle cx="78" cy="62" r="32" stroke-width="16" ${A}/><line x1="102" y1="86" x2="128" y2="112" stroke-width="20" ${A}/></g>`,
  briefcase: (S, T, O, A, ac) => `
    <rect x="-104" y="-42" width="208" height="132" rx="22" ${T}/><rect x="-104" y="-42" width="208" height="132" rx="22" stroke-width="13" ${O}/>
    <path d="M-42,-42 v-22 a18,18 0 0 1 18,-18 h48 a18,18 0 0 1 18,18 v22" stroke-width="16" ${O}/>
    <line x1="-104" y1="14" x2="104" y2="14" stroke-width="10" ${O}/>
    <rect x="-20" y="-2" width="40" height="32" rx="8" fill="${ac}"/>`,
  bubble_pulse: (S, T, O, A) => `
    <path d="M-70,-80 h140 a36,36 0 0 1 36,36 v78 a36,36 0 0 1 -36,36 h-96 l-42,34 v-34 a36,36 0 0 1 -36,-36 v-78 a36,36 0 0 1 34,-36 z" ${T}/>
    <path d="M-70,-80 h140 a36,36 0 0 1 36,36 v78 a36,36 0 0 1 -36,36 h-96 l-42,34 v-34 a36,36 0 0 1 -36,-36 v-78 a36,36 0 0 1 34,-36 z" stroke-width="13" ${O}/>
    <polyline points="-70,-4 -38,-4 -20,-36 0,28 18,-4 68,-4" stroke-width="16" ${A}/>`,
  flag: (S, T, O, A, ac) => `
    <path transform="translate(10,10)" d="M-68,-68 q36,-20 72,0 t72,0 v98 q-36,20 -72,0 t-72,0 z" fill="#fff" fill-opacity=".3"/>
    <line x1="-68" y1="-82" x2="-68" y2="94" stroke-width="18" ${O}/>
    <path d="M-68,-68 q36,-20 72,0 t72,0 v98 q-36,20 -72,0 t-72,0 z" ${S}/>
    <circle cx="-68" cy="-96" r="15" fill="${ac}"/>`,
  database: (S, T, O, A) => `
    <path d="M-94,-66 v128 a94,30 0 0 0 188,0 v-128" ${T}/>
    <path d="M-94,62 a94,30 0 0 0 188,0" stroke-width="12" ${O}/>
    <path d="M-94,-2 a94,30 0 0 0 188,0" stroke-width="14" ${A}/>
    <ellipse cx="0" cy="-66" rx="94" ry="30" ${S}/>`,
  tag_barcode: (S, T, O, A, ac) => `
    <path d="M-92,-72 h104 a14,14 0 0 1 10,4 l70,70 a10,10 0 0 1 0,14 l-70,70 a14,14 0 0 1 -10,4 h-104 a12,12 0 0 1 -12,-12 v-138 a12,12 0 0 1 12,-12 z" ${T}/>
    <path d="M-92,-72 h104 a14,14 0 0 1 10,4 l70,70 a10,10 0 0 1 0,14 l-70,70 a14,14 0 0 1 -10,4 h-104 a12,12 0 0 1 -12,-12 v-138 a12,12 0 0 1 12,-12 z" stroke-width="13" ${O}/>
    <circle cx="-66" cy="-38" r="12" fill="${ac}"/>
    <line x1="-52" y1="-6" x2="-52" y2="54" stroke-width="10" ${O}/><line x1="-30" y1="-6" x2="-30" y2="54" stroke-width="14" ${O}/><line x1="-6" y1="-6" x2="-6" y2="54" stroke-width="8" ${O}/><line x1="14" y1="-6" x2="14" y2="54" stroke-width="12" ${O}/>`,
  megaphone: (S, T, O, A) => `
    <rect x="-98" y="-32" width="46" height="64" rx="10" fill="#fff" fill-opacity=".55"/>
    <path d="M-56,-32 l96,-56 v176 l-96,-56 z" ${S}/>
    <path d="M62,-30 a42,42 0 0 1 0,60" stroke-width="14" ${A}/><path d="M84,-58 a76,76 0 0 1 0,116" stroke-width="11" ${A} stroke-opacity=".65"/>`,
  order_gear: (S, T, O, A, ac) => `
    <path d="M-80,-96 h136 v176 l-17,-14 l-17,14 l-17,-14 l-17,14 l-17,-14 l-17,14 l-17,-14 l-17,14 z" ${T}/>
    <path d="M-80,-96 h136 v176 l-17,-14 l-17,14 l-17,-14 l-17,14 l-17,-14 l-17,14 l-17,-14 l-17,14 z" stroke-width="12" ${O}/>
    <line x1="-52" y1="-58" x2="28" y2="-58" stroke-width="10" ${O}/><line x1="-52" y1="-28" x2="28" y2="-28" stroke-width="10" ${O}/><line x1="-52" y1="2" x2="-4" y2="2" stroke-width="10" ${O}/>
    <circle cx="66" cy="62" r="30" stroke-width="13" stroke-dasharray="11 9" ${A}/><circle cx="66" cy="62" r="9" fill="${ac}"/>`,
  receipt_cash: (S, T, O, A, ac) => `
    <path d="M-82,-96 h108 l52,52 v140 h-160 z" ${T}/><path d="M-82,-96 h108 l52,52 v140 h-160 z" stroke-width="12" ${O}/>
    <path d="M26,-96 v52 h52" stroke-width="12" ${O}/>
    <text x="-8" y="52" text-anchor="middle" font-family="${SERIF_LAT}" font-weight="900" font-size="90" fill="#fff">$</text>
    <circle cx="70" cy="74" r="28" fill="${ac}"/><polyline points="56,74 66,84 86,64" stroke-width="10" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  link: (S, T, O, A, ac) => `
    <g transform="rotate(-45)">
    <rect x="-100" y="-26" width="112" height="52" rx="26" ${T}/><rect x="-100" y="-26" width="112" height="52" rx="26" stroke-width="16" ${O}/>
    <rect x="-12" y="-26" width="112" height="52" rx="26" stroke-width="16" ${O}/>
    <line x1="-30" y1="0" x2="30" y2="0" stroke-width="14" ${A}/></g>`,
  trend: (S, T, O, A, ac) => `
    <path d="M-96,62 L-50,20 L-10,42 L40,-28 L90,-62 V92 H-96 Z" fill="#fff" fill-opacity=".28"/>
    <polyline points="-96,62 -50,20 -10,42 40,-28 90,-62" stroke-width="17" ${O}/>
    <polyline points="58,-66 90,-62 86,-30" stroke-width="14" ${O}/>
    <circle cx="90" cy="-62" r="14" fill="${ac}"/>`,
  calendar_check: (S, T, O, A, ac) => `
    <rect x="-92" y="-70" width="184" height="160" rx="22" ${T}/><rect x="-92" y="-70" width="184" height="160" rx="22" stroke-width="13" ${O}/>
    <path d="M-92,-26 h184" stroke-width="12" ${O}/>
    <line x1="-46" y1="-96" x2="-46" y2="-50" stroke-width="16" ${O}/><line x1="46" y1="-96" x2="46" y2="-50" stroke-width="16" ${O}/>
    <polyline points="-40,26 -12,54 44,-6" stroke-width="22" ${A}/>`,
  chat_link: (S, T, O, A, ac) => `
    <path d="M-96,-56 a24,24 0 0 1 24,-24 h96 a24,24 0 0 1 24,24 v52 a24,24 0 0 1 -24,24 h-70 l-30,26 v-26 a24,24 0 0 1 -20,-24 z" fill="#fff" fill-opacity=".4"/>
    <path d="M-30,-6 a24,24 0 0 1 24,-24 h96 a24,24 0 0 1 24,24 v52 a24,24 0 0 1 -24,24 h-20 v26 l-30,-26 h-46 a24,24 0 0 1 -24,-24 z" ${S}/>
    <circle cx="10" cy="20" r="9" fill="${ac}"/><circle cx="42" cy="20" r="9" fill="${ac}"/><circle cx="74" cy="20" r="9" fill="${ac}"/>`,
};

const TOOLS = [
  { id: 'dolly-funds',     title: 'Dolly助手｜資金分配',   div: 'div3',  glyph: 'coin_split',      label: '資金', status: 'live' },
  { id: 'counter-portal',  title: '專櫃報表 Portal',        div: 'div2b', glyph: 'bars',            label: '報表', status: 'live' },
  { id: 'counter-ops',     title: 'Div2B 專櫃櫃務小幫手',   div: 'div2b', glyph: 'clipboard_check', label: '櫃務', status: 'live' },
  { id: 'hpa-warroom',     title: 'HPA 戰情中心',           div: 'div7',  glyph: 'radar',           label: 'HPA',  status: 'live' },
  { id: 'b2b-dealer',      title: '逗寶 B2B 經銷商流程',    div: 'div4',  glyph: 'exchange',        label: 'B2B',  status: 'live' },
  { id: 'inventory',       title: '庫存速查與員購小幫手',   div: 'div4',  glyph: 'box_search',      label: '庫存', status: 'live' },
  { id: 'div1-helper',     title: 'Div1 管理處小幫手',      div: 'div1',  glyph: 'briefcase',       label: 'Div1', status: 'live' },
  { id: 'div6-monitor',    title: 'Div6 私群監測',          div: 'div6',  glyph: 'bubble_pulse',    label: '私群', status: 'live' },
  { id: 'ry27-target',     title: 'RY27 業績目標 SoT',      div: 'div7',  glyph: 'flag',            label: 'RY27', status: 'live' },
  { id: 'bi-datacenter',   title: 'MyPowerBI 數據中心',     div: 'div7',  glyph: 'database',        label: 'BI',   status: 'live' },
  { id: 'budget-check',    title: 'Div3 每月預算核對小幫手', div: 'div3',  glyph: 'calendar_check',  label: '預算', status: 'live' },
  { id: 'product-sot',     title: 'SoT 產品資料中心',       div: 'div7',  glyph: 'tag_barcode',     label: '產品', status: 'wip' },
  { id: 'counter-promo',   title: 'Div2B 專櫃促銷活動管理', div: 'div2b', glyph: 'megaphone',       label: '促銷', status: 'wip' },
  { id: 'order-auto',      title: 'Div4 訂單自動處理小幫手', div: 'div4', glyph: 'order_gear',      label: '訂單', status: 'wip' },
  { id: 'receipts',        title: 'Div3 總收款報表',        div: 'div3',  glyph: 'receipt_cash',    label: '收款', status: 'wip' },
  { id: 'utm',             title: 'Div2A UTM 分析',         div: 'div2a', glyph: 'link',            label: 'UTM',  status: 'wip' },
  { id: 'ads-traffic',     title: '官網廣告成效與流量分析', div: 'div2a', glyph: 'trend',           label: '廣告', status: 'wip' },
  { id: 'im-hub',          title: 'Div2B 即時通訊整合',     div: 'div2b', glyph: 'chat_link',       label: '通訊', status: 'wip' },
];

const isCJK = s => /[㐀-鿿]/.test(s);
function label(t, y, size, fill) {
  const cjk = isCJK(t.label);
  return `<text x="256" y="${y}" text-anchor="middle" font-family="${cjk ? SERIF_CJK : SERIF_LAT}" font-weight="900" font-size="${cjk ? Math.round(size * 0.9) : size}" letter-spacing="${cjk ? 6 : 1}" fill="${fill}">${t.label}</text>`;
}
function glyph(t, ac, scale, cy) {
  const S = 'fill="#fff"';
  const T = 'fill="#fff" fill-opacity=".3"';
  const O = 'stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  const A = `stroke="${ac}" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  return `<g transform="translate(256,${cy}) scale(${scale})">${GLYPH[t.glyph](S, T, O, A, ac)}</g>`;
}
const GRAIN = `<filter id="grain" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.11 0 0 0 0"/></filter>`;
const SHADOW = `<filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="7" stdDeviation="9" flood-color="#000" flood-opacity=".2"/></filter>`;
const tint = hex => { const [r, g, b] = hexToUnit(hex); return `<filter id="tint"><feColorMatrix values="0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  0 0 0 1 0"/></filter>`; };

// A「質感色磚」：柔光漸層 + 漂浮圓 + 花體 B 浮水印 + 暗角 + 紙紋 + 雙色調 glyph + 襯線短碼（含柔影）
function svgA(t) {
  const c = DIV[t.div].color, ac = t.div === 'div7' ? MINT_SOFT : BRAND;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${mix(c, '#ffffff', 0.18)}"/><stop offset="0.55" stop-color="${c}"/><stop offset="1" stop-color="${mix(c, '#000000', 0.12)}"/></linearGradient>
    <radialGradient id="vig" cx="0.5" cy="0.45" r="0.78"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.2"/></radialGradient>
    ${GRAIN}${SHADOW}${tint('#ffffff')}
  </defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <circle cx="404" cy="428" r="292" fill="#fff" fill-opacity="0.07"/>
  <circle cx="86" cy="58" r="150" fill="#fff" fill-opacity="0.05"/>
  <image href="${MONO}" x="286" y="250" width="300" filter="url(#tint)" opacity="0.10"/>
  <rect width="512" height="512" fill="url(#vig)"/>
  <rect width="512" height="512" filter="url(#grain)" opacity="0.6"/>
  <g filter="url(#sh)">${glyph(t, ac, 0.92, 194)}${label(t, 398, 80, '#fff')}</g>
</svg>`;
}

// B「品牌卡片」：奶油紙底 + 薄荷/蜜桃柔光 + 紙紋 + 花體 B 浮水印 + 浮起的雙圈圓章（漸層＋內光＋柔影）+ 墨藍襯線短碼
function svgB(t) {
  const c = DIV[t.div].color, ac = t.div === 'div7' ? MINT_SOFT : BRAND;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="w1" cx="0.18" cy="0.12" r="0.7"><stop offset="0" stop-color="${MINT_SOFT}"/><stop offset="1" stop-color="${MINT_SOFT}" stop-opacity="0"/></radialGradient>
    <radialGradient id="w2" cx="0.85" cy="0.92" r="0.6"><stop offset="0" stop-color="${PEACH_SOFT}"/><stop offset="1" stop-color="${PEACH_SOFT}" stop-opacity="0"/></radialGradient>
    <radialGradient id="seal" cx="0.35" cy="0.3" r="0.85"><stop offset="0" stop-color="${mix(c, '#ffffff', 0.22)}"/><stop offset="0.55" stop-color="${c}"/><stop offset="1" stop-color="${mix(c, '#000000', 0.16)}"/></radialGradient>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="16"/></filter>
    ${GRAIN}${tint(MINT_SOFT)}
  </defs>
  <rect width="512" height="512" fill="${CREAM}"/>
  <rect width="512" height="512" fill="url(#w1)"/>
  <rect width="512" height="512" fill="url(#w2)"/>
  <image href="${MONO}" x="300" y="262" width="290" filter="url(#tint)" opacity="0.9"/>
  <rect width="512" height="512" filter="url(#grain)" opacity="0.5"/>
  <circle cx="256" cy="190" r="130" fill="none" stroke="${c}" stroke-opacity="0.32" stroke-width="5"/>
  <circle cx="258" cy="204" r="112" fill="${c}" fill-opacity="0.38" filter="url(#blur)"/>
  <circle cx="256" cy="190" r="112" fill="url(#seal)"/>
  <circle cx="256" cy="190" r="100" fill="none" stroke="#fff" stroke-opacity="0.22" stroke-width="3"/>
  ${glyph(t, ac, 0.7, 190)}
  ${label(t, 414, 72, INK)}
</svg>`;
}

for (const [style, fn] of [['A', svgA], ['B', svgB]]) {
  const out = path.join(__dirname, 'svg3_' + style);
  fs.mkdirSync(out, { recursive: true });
  for (const t of TOOLS) fs.writeFileSync(path.join(out, t.id + '.svg'), fn(t), 'utf8');
}
fs.writeFileSync(path.join(__dirname, 'tools3.json'), JSON.stringify({ BRAND, DIV, TOOLS }, null, 2), 'utf8');
console.log('v3 svg written: A/B x', TOOLS.length);
