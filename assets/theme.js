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
      if (value === 'dark' || value === 'light') return value;
    } catch (e) { /* 隐私模式下 localStorage 可能不可用 */ }
    return null;
  }

  function prefersLight() {
    try {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    } catch (e) { return false; }
  }

  function current() {
    // 优先级：用户显式选择 > 系统偏好 > 默认暗色
    return saved() || (prefersLight() ? 'light' : 'dark');
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;   // 让滚动条、表单控件也跟着变
  }

  // 立即应用，避免先闪一下暗色再切亮色
  apply(current());

  // 页面自带的切换按钮：只在它自己没绑定过的情况下兜底
  function bindToggle() {
    var toggle = document.getElementById('themeToggle');
    if (!toggle || toggle.dataset.themeBound === '1') return;
    toggle.dataset.themeBound = '1';
    toggle.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindToggle);
  } else {
    bindToggle();
  }

  // 跟随系统主题变化（仅当用户没有显式选择时）
  try {
    if (window.matchMedia) {
      var query = window.matchMedia('(prefers-color-scheme: light)');
      var listener = function () { if (!saved()) apply(current()); };
      if (query.addEventListener) query.addEventListener('change', listener);
      else if (query.addListener) query.addListener(listener);
    }
  } catch (e) {}

  // 多标签页同步：别的标签页切换后，这里跟着变
  window.addEventListener('storage', function (event) {
    if (event.key === KEY) apply(current());
  });

  // 供其它脚本查询
  window.AlanTheme = { current: current, apply: apply, KEY: KEY };
})();
