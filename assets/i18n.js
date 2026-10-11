/* ==========================================================================
   AlanLumier · 全站 i18n 运行时（共享）
   --------------------------------------------------------------------------
   为什么需要它：本站各页面的语言实现彼此不一致 ——
     · index / easter / status 用存储键 'yaule_lang'
     · works 总览页却用 'yaule_works_lang'（**不同的键**，
       于是在首页切换语言，作品页读不到，等于白切）
     · space 与 6 个作品详情页**完全没有 i18n**，也没有语言切换按钮

   本脚本统一这件事，用法与 theme.js 一致：
     1) 语言偏好只存一个键 'yaule_lang'，全站共用
     2) 页面上带 data-i18n="key" 的元素，按页面提供的字典自动翻译
     3) 页面若没有语言切换按钮，自动注入一个（自带内联 SVG，不依赖外部资源）
     4) 多标签页同步、跟随浏览器语言作为首次默认

   页面如何提供字典：在引入本脚本**之前**定义
       window.ALAN_I18N = { zh: { 'key': '译文' }, en: { ... } };
   之后本脚本会接管翻译与按钮。没有字典的页面只会得到一个可用但暂无译文的按钮，
   不会报错。
   ========================================================================== */
(function () {
  var KEY = 'yaule_lang';
  var root = document.documentElement;

  function readLang() {
    try {
      var v = localStorage.getItem(KEY);
      if (v === 'zh' || v === 'en') return v;
    } catch (e) {}
    // 首次访问：跟随浏览器语言
    try {
      var nav = (navigator.language || 'zh').toLowerCase();
      if (nav.indexOf('zh') === 0) return 'zh';
      if (nav.indexOf('en') === 0) return 'en';
    } catch (e) {}
    return 'zh';
  }

  function dict() {
    var d = window.ALAN_I18N || {};
    return d;
  }

  /* ------------------------------------------------------------------
     文本匹配模式（补充方案）
     很多页面（space、6 个作品详情页）**完全没有 data-i18n 标记**，
     逐段补标记既慢又容易出错。这里改为按「原文 → 译文」直接替换文本节点：
       window.ALAN_TEXT_I18N = { '首页': 'Home', '关于我': 'About', ... }
     首次进入时把每个文本节点的原文记在 Map 里，切回中文时按原文还原，
     所以来回切换不会丢字、也不会层层套娃。
     ------------------------------------------------------------------ */
  var originalText = new Map();

  function collectOriginals() {
    if (typeof document.createTreeWalker !== 'function') return;
    var walker = document.createTreeWalker(document.body || document.documentElement, 4 /* TEXT_NODE */, null);
    var node;
    while ((node = walker.nextNode())) {
      var parent = node.parentNode;
      if (!parent) continue;
      var tag = (parent.nodeName || '').toLowerCase();
      // 脚本、样式、可编辑区不参与翻译
      if (tag === 'script' || tag === 'style' || tag === 'noscript') continue;
      if (parent.isContentEditable) continue;
      var text = node.nodeValue;
      if (!text) continue;
      var trimmed = text.trim();
      if (!trimmed) continue;
      if (!originalText.has(node)) originalText.set(node, text);
    }
  }

  function translateByText(lang) {
    var table = (window.ALAN_TEXT_I18N || {})[lang];
    if (!table) {
      // 没有该语言的表：把已翻译的节点还原成原文（只做一次）
      if (lang === 'zh') {
        originalText.forEach(function (original, node) {
          if (node.nodeValue !== original) node.nodeValue = original;
        });
      }
      return 0;
    }
    var applied = 0;
    originalText.forEach(function (original, node) {
      if (!node.parentNode) return;                 // 节点已被移除
      var trimmed = original.trim();
      var value = table[trimmed];
      if (typeof value !== 'string') {
        if (node.nodeValue !== original) node.nodeValue = original;
        return;
      }
      // 保留原文前后的空白，避免破坏排版
      var lead = original.match(/^\s*/)[0];
      var tail = original.match(/\s*$/)[0];
      var next = lead + value + tail;
      if (node.nodeValue !== next) { node.nodeValue = next; applied += 1; }
    });
    return applied;
  }

  function translate(lang) {
    var table = dict()[lang];
    if (!table) return 0;
    var applied = 0;
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i += 1) {
      var node = nodes[i];
      var key = node.getAttribute('data-i18n');
      var value = table[key];
      if (typeof value !== 'string') continue;
      // 带 data-i18n-attr 的用来翻译属性（如 placeholder / title / aria-label）
      var attr = node.getAttribute('data-i18n-attr');
      if (attr) node.setAttribute(attr, value);
      else node.textContent = value;
      applied += 1;
    }
    // 需要整块替换属性的元素
    var attrNodes = document.querySelectorAll('[data-i18n-placeholder]');
    for (var j = 0; j < attrNodes.length; j += 1) {
      var k2 = attrNodes[j].getAttribute('data-i18n-placeholder');
      var v2 = table[k2];
      if (typeof v2 === 'string') { attrNodes[j].setAttribute('placeholder', v2); applied += 1; }
    }
    return applied;
  }

  var STYLE_ID = 'alan-lang-btn-style';
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = [
      '.alan-lang-btn{position:fixed;top:14px;right:62px;z-index:9998;',
      'min-width:40px;height:40px;display:inline-flex;align-items:center;justify-content:center;',
      'border-radius:999px;cursor:pointer;padding:0 10px;font-size:12.5px;font-weight:700;',
      'letter-spacing:.02em;font-family:inherit;',
      'border:1px solid var(--card-border,rgba(128,128,128,.35));',
      'background:var(--card-bg,#0a0a0a);color:var(--ink,#f5f5f5);',
      'transition:transform .2s ease,border-color .2s ease;}',
      '.alan-lang-btn:hover{transform:scale(1.08);border-color:var(--accent,#fff);}',
      '.alan-lang-btn:focus-visible{outline:2px solid var(--accent,#fff);outline-offset:3px;}',
      '@media (max-width:560px){.alan-lang-btn{top:10px;right:54px;height:36px;min-width:36px;font-size:11.5px;}}',
      /* 页面自带主题按钮时，把语言按钮挪到它左边，避免重叠 */
      'body:has(#themeToggle) .alan-lang-btn{right:62px;}',
    ].join('');
    document.head.appendChild(style);
  }

  function paint(button) {
    var lang = readLang();
    var label = lang === 'zh' ? 'EN' : '中';
    button.textContent = label;
    var title = lang === 'zh' ? 'Switch to English' : '切换到中文';
    button.setAttribute('title', title);
    button.setAttribute('aria-label', title);
  }

  function applyLang(lang) {
    root.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    try { window.dispatchEvent(new CustomEvent('alan:lang', { detail: { lang: lang } })); } catch (e) {}
  }

  function switchLang() {
    var next = readLang() === 'zh' ? 'en' : 'zh';
    try { localStorage.setItem(KEY, next); } catch (e) {}
    applyLang(next);
    translate(next);
    translateByText(next);
    // 页面自带的脚本也需要机会重绘（它们监听 alan:lang）
    var buttons = document.querySelectorAll('.alan-lang-btn');
    for (var i = 0; i < buttons.length; i += 1) paint(buttons[i]);
    return next;
  }

  function ensureButton() {
    // 页面自带的语言按钮优先，不重复注入
    if (document.getElementById('langToggle') || document.getElementById('langBtn')) return;
    if (document.querySelector('.alan-lang-btn')) return;
    injectStyle();
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'alan-lang-btn';
    paint(button);
    button.addEventListener('click', switchLang);
    document.body.appendChild(button);
  }

  function init() {
    var lang = readLang();
    collectOriginals();          // 先记住原文，之后才能来回切换
    applyLang(lang);
    translate(lang);
    translateByText(lang);
    ensureButton();
    /* 刻意**不**接管页面自带的语言按钮。
       实测教训：最初我在捕获阶段用 stopImmediatePropagation() 抢下点击，
       结果把页面自身那套已经能用的 i18n 脚本也一起挡掉了 ——
       表现是 <html lang> 变了、按钮也变了，但**页面文案一个字都没变**，
       等于把原本好用的功能弄坏。各页面自己的实现能正常工作，就不该去插手；
       本脚本只负责：统一存储键、给完全没有 i18n 的页面补一个按钮。 */
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // 多标签页同步
  window.addEventListener('storage', function (event) {
    if (event.key !== KEY) return;
    var lang = readLang();
    applyLang(lang);
    translate(lang);
    var buttons = document.querySelectorAll('.alan-lang-btn');
    for (var i = 0; i < buttons.length; i += 1) paint(buttons[i]);
  });

  window.AlanI18n = { lang: readLang, switch: switchLang, translate: translate, KEY: KEY };
})();
