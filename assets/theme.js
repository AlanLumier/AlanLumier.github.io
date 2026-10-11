/* ==========================================================================
   AlanLumier · 全站主题运行时（共享）
   --------------------------------------------------------------------------
   为什么需要它：本站 19 个页面里，原本只有 index.html 会设置
   data-theme="light"，其余 18 个页面根本不会 —— 于是在首页切到亮色，
   点进任何子页面都会变回暗色。

   这个脚本只做一件事：**在页面绘制前**把 <html data-theme> 设成用户的选择，
   从而让 assets/theme.css 里的那套变量生效。

   它刻意**不**接管点击事件：页面若自带切换按钮，仍由页面自己的脚本处理，
   避免两个处理器互相打架（首页的按钮有自己的图标与动效逻辑）。
   ========================================================================== */
(function () {
  var KEY = 'yaule-theme';
  var root = document.documentElement;

  function saved() {
    try {
      var value = localStorage.getItem(KEY);
      // 'auto' = 跟随系统。用户要求的第三档，与显式选择区分开：
      // 显式选择后就不该再被系统设置覆盖。
      if (value === 'dark' || value === 'light' || value === 'auto') return value;
    } catch (e) { /* 隐私模式下 localStorage 可能不可用 */ }
    return null;
  }

  function prefersLight() {
    try {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    } catch (e) { return false; }
  }

  function current() {
    // 优先级：显式选择（dark/light）> 跟随系统（auto 或从未选择过）
    var s = saved();
    if (s === 'dark' || s === 'light') return s;
    return prefersLight() ? 'light' : 'dark';
  }

  /* 三档循环：深色 → 浅色 → 跟随系统 → 深色
     之所以要有「跟随系统」这一档，是因为只有二档时，用户在系统层面
     切换深色模式后，本站不会跟着变。 */
  var MODES = ['dark', 'light', 'auto'];
  function mode() { return saved() || 'auto'; }
  function nextMode() {
    return MODES[(MODES.indexOf(mode()) + 1) % MODES.length];
  }
  function isAuto() { return mode() === 'auto'; }
  function modeLabel() {
    if (isAuto()) return '跟随系统（当前' + (prefersLight() ? '浅色' : '深色') + '）';
    return mode() === 'dark' ? '深色' : '浅色';
  }

  function setMode(next) {
    try { localStorage.setItem(KEY, next); } catch (e) {}
    apply(current());
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;   // 让滚动条、表单控件也跟着变
    // 通知自建按钮换图标（页面自带按钮自己管自己的图标）
    try {
      window.dispatchEvent(new CustomEvent('alan:theme', { detail: { theme: theme } }));
    } catch (e) {}
  }

  // 立即应用，避免先闪一下暗色再切亮色
  apply(current());

  // 页面自带的切换按钮
  function bindToggle() {
    var toggle = document.getElementById('themeToggle');
    if (!toggle || toggle.dataset.themeBound === '1') return;
    toggle.dataset.themeBound = '1';
    toggle.addEventListener('click', function (event) {
      // 有些页面（如 /pages/changelog.html）自己也会给这个按钮绑处理器。
      // 两个处理器各翻一次 = 翻回原样，表现就是「点了没反应、黑色圆形点了没用」。
      // 这里用捕获阶段抢在前面执行，并阻止后续处理器，确保只翻一次。
      event.stopImmediatePropagation();
      // 三档循环：深色 → 浅色 → 跟随系统 → 深色
      var next = nextMode();
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(current());
      // 页面自带的按钮要靠自己的 CSS 切图标，这里补两个提示属性
      toggle.setAttribute('data-theme-state', current());
      toggle.setAttribute('data-theme-mode', next);
      toggle.setAttribute('title', '切换主题（当前：' + modeLabel() + '）');
      toggle.setAttribute('aria-label', '切换主题（当前：' + modeLabel() + '）');
    }, true);
  }

  /* ------------------------------------------------------------------
     自建切换按钮
     有些页面（如 /space/）压根没有主题按钮，用户在那里无法切换深浅色；
     另一些页面（如 /pages/changelog.html）虽有按钮，但图标渲染不出来，
     只剩一个空的黑圆。这里统一补一个**自带图标**的按钮：
     图标用内联 SVG 直接写在脚本里，不依赖任何外部资源或页面样式，
     因此不会再出现「图标显示不出来」的情况。
     ------------------------------------------------------------------ */
  var GLOW_STYLE_ID = 'alan-theme-toggle-style';

  function injectStyle() {
    if (document.getElementById(GLOW_STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = GLOW_STYLE_ID;
    style.textContent = [
      '.alan-theme-btn{position:fixed;top:14px;right:14px;z-index:9998;',
      'width:40px;height:40px;display:inline-flex;align-items:center;justify-content:center;',
      'border-radius:999px;cursor:pointer;padding:0;',
      'border:1px solid var(--card-border,rgba(128,128,128,.35));',
      'background:var(--card-bg,#0a0a0a);color:var(--ink,#f5f5f5);',
      'transition:transform .2s ease,border-color .2s ease,background-color .2s ease;}',
      '.alan-theme-btn:hover{transform:scale(1.08);border-color:var(--accent,#fff);}',
      '.alan-theme-btn:focus-visible{outline:2px solid var(--accent,#fff);outline-offset:3px;}',
      '.alan-theme-btn svg{width:20px;height:20px;display:block;}',
      /* 跟随系统时在右下角点一个小圆点，与手动选择的两种状态区分开 */
      '.alan-theme-btn[data-auto="1"]::after{content:"";position:absolute;right:6px;bottom:6px;',
      'width:6px;height:6px;border-radius:50%;background:var(--accent,#fff);',
      'box-shadow:0 0 0 1.5px var(--card-bg,#0a0a0a);}',
      '.alan-theme-btn{position:fixed;}',
      /* 亮色下按钮用白底黑图标，暗色下黑底白图标 —— 只靠明度区分，不引入颜色 */
      '@media (max-width:560px){.alan-theme-btn{top:10px;right:10px;width:36px;height:36px;}}',
    ].join('');
    document.head.appendChild(style);
  }

  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">'
    + '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2'
    + 'M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    + '<path d="M20.5 14.6A8.6 8.6 0 1 1 9.4 3.5a6.9 6.9 0 0 0 11.1 11.1z"/></svg>';

  function paint(button) {
    // 当前是暗色 → 显示太阳（点了会变亮）；亮色 → 显示月亮
    button.innerHTML = current() === 'dark' ? SUN : MOON;
    // 跟随系统时在角上加一个小圆点，让「这一档和手动选的不一样」看得出来
    button.setAttribute('data-auto', isAuto() ? '1' : '0');
    var label = '切换主题（当前：' + modeLabel() + '，点击切到'
      + ({ dark: '浅色', light: '跟随系统', auto: '深色' })[mode()] + '）';
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
  }

  function ensureToggle() {
    if (document.getElementById('themeToggle')) return;      // 页面自带的优先
    if (document.querySelector('.alan-theme-btn')) return;   // 已注入
    injectStyle();
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'alan-theme-btn';
    paint(button);
    button.addEventListener('click', function () {
      setMode(nextMode());       // 三档循环：深色 → 浅色 → 跟随系统
      paint(button);
    });
    // 别的地方（如 storage 事件、页面自带按钮）改了主题，这里也要跟着换图标
    window.addEventListener('alan:theme', function () { paint(button); });
    document.body.appendChild(button);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { bindToggle(); ensureToggle(); });
  } else {
    bindToggle();
    ensureToggle();
  }

  // 跟随系统主题变化：在「跟随系统」这一档下（含从未选择过），系统切换时本站跟着变
  try {
    if (window.matchMedia) {
      var query = window.matchMedia('(prefers-color-scheme: light)');
      var listener = function () {
        if (isAuto()) {
          apply(current());
          var btn = document.querySelector('.alan-theme-btn');
          if (btn) paint(btn);
        }
      };
      if (query.addEventListener) query.addEventListener('change', listener);
      else if (query.addListener) query.addListener(listener);
    }
  } catch (e) {}

  // 多标签页同步：别的标签页切换后，这里跟着变
  window.addEventListener('storage', function (event) {
    if (event.key === KEY) apply(current());
  });

  /* ------------------------------------------------------------------
     光晕的鼠标坐标：**刻意不复位**
     我原先在 mouseout 时把 --mx / --my 清掉，想避免「光斑留在最后位置」。
     但实测副作用更糟：清掉坐标后，渐变会立刻跳回默认位置（50%），
     于是在淡出的那 0.28 秒里，光晕会先闪到元素正中再消失 ——
     用户看到的就是「离开后中间闪一下才没了」。
     实际上「离开后光晕残留」的真正原因是页面里那条
     .life-panel.active::before { opacity: 1 }（选中即常亮），
     已由 theme.css 的 opacity: 0/1 !important 规则解决，不靠这里复位。
     因此这段复位逻辑整体移除，光晕淡出时自然停在鼠标最后所在处。
     ------------------------------------------------------------------ */
  // （无 coordinate reset —— 见上方说明）

  // 供其它脚本查询
  window.AlanTheme = { current: current, apply: apply, KEY: KEY };
})();
