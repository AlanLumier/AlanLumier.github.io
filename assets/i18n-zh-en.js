/* ==========================================================================
   AlanLumier · 中英对照表（按「原文 → 译文」匹配，无需在 HTML 里加标记）
   --------------------------------------------------------------------------
   用法：本文件在 assets/i18n.js **之前**引入。i18n.js 会在首次进入时记住
   每个文本节点的原文，切到 en 时按下表替换，切回 zh 时按原文还原，
   所以来回切换不会丢字。

   分批推进中：每一批补一批页面/板块。未收录的条目保持原文（中文），
   不会变成空白或乱码 —— 这是刻意设计，宁可留中文也不要半吊子机翻。
   ========================================================================== */
window.ALAN_TEXT_I18N = window.ALAN_TEXT_I18N || {};
window.ALAN_TEXT_I18N.en = Object.assign(window.ALAN_TEXT_I18N.en || {}, {
  /* ---------- 第 1 批：space 个人空间 · 导航 / 首屏 / 板块标题 ---------- */
  '首页': 'Home',
  '关于我': 'About',
  '个人爱好': 'Hobbies',
  '技能树': 'Skills',
  '生活瞬间': 'Moments',
  '成长轨迹': 'Journey',
  '游戏档案': 'Gaming',
  '设备配置': 'Gear',
  '机器人竞赛': 'Robotics',
  '荣誉奖项': 'Awards',
  '留下名字': 'Leave your name',
  '联系我': 'Contact',

  '欢迎来到我的个人空间': 'Welcome to my space',
  'AlanLumier · 个人空间': 'AlanLumier · Personal Space',
  '初三学生 | 编程爱好者 | 游戏玩家': 'Grade 9 student · Programmer · Gamer',
  '一名热爱技术与创造的初三学生': 'A Grade 9 student who loves technology and making things',
  '你好，我是AlanLumier 👋': "Hi, I'm AlanLumier 👋",
  '向下滚动': 'Scroll down',

  '游戏竞技': 'Competitive Gaming',
  '机器人工程': 'Robotics',
  '工具开发': 'Tool Development',
  '机械搭建': 'Mechanical Build',
  '电路调试': 'Circuit Debugging',
  '算法入门': 'Algorithms',
  '红石设计': 'Redstone Design',
  '编程开发': 'Development',
  '工具设计': 'Tool Design',
  '结构设计': 'Structural Design',
  '传动系统': 'Transmission',
  '传感器': 'Sensors',
  'CS竞技': 'CS Competitions',
  '自动化': 'Automation',
  'Web开发': 'Web Development',

  '技能树 · 学习路径': 'Skills · Learning Path',
  '从中心向外延伸，每一条分支都是成长的足迹':
    'Every branch out from the centre marks a step of growth',
  '技术成长时间线': 'Tech growth timeline',
  '记录每一步成长的脚印': 'Every step of the journey',
  '2022 · 起点': '2022 · The beginning',
  '首次接触VEX机器人': 'First contact with VEX robotics',

  /* ---------- 爱好与照片说明 ---------- */
  '生活不只有代码，还有热爱与远方': 'Life is more than code',
  '代码之外，还有热爱与生活': "Beyond code, there's passion and life",
  '音乐': 'Music',
  '电子': 'Electronic',
  '纯音乐': 'Instrumental',
  '游戏原声': 'Game soundtracks',
  '旅行': 'Travel',
  '自然风光': 'Nature',
  '人文探索': 'Culture',
  '自行车': 'Cycling',
  '公路骑行': 'Road cycling',
  '山地越野': 'Mountain biking',
  '长距离': 'Long distance',
  '游戏': 'Games',
  '竞技射击': 'Tactical shooters',
  '沙盒创造': 'Sandbox',
  '体育': 'Sports',
  '球类运动': 'Ball sports',
  '团队协作': 'Teamwork',
  '日常锻炼': 'Daily training',

  '机器人比赛现场': 'Robot competition venue',
  '周末追风，享受速度与自由': 'Chasing the wind on weekends',
  '深夜编程': 'Late-night coding',
  'AlanLumier里，代码与星光同在': 'Where code meets starlight',
  'MC红石作品': 'Minecraft redstone build',
  '音乐时光': 'Music time',
  '旋律抚平心绪，灵感随之而来': 'A melody calms the mind, and inspiration follows',
  '设备升级': 'Equipment upgrade',
  '与队友一起攻克技术难题，每一次突破都是成长的印记':
    'Solving hard problems with teammates — every breakthrough counts',
  '获奖瞬间': 'Award moment',
  '努力终有回报，汗水浇灌出的荣誉时刻': 'Hard work pays off',
  '旅行时光': 'Travel time',
  '用脚步丈量世界，在路途中遇见更好的自己':
    'Measuring the world on foot, meeting a better self along the way',

  /* ---------- 通用交互 ---------- */
  '关注成功': 'Followed',
  '已关注，作品发布后第一时间通知': "You'll be notified as soon as new work is published",
  '知道了': 'Got it',
  '深夜模式已开启': 'Night mode is on',
});
