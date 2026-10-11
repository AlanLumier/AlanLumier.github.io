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

/* ---------- 第 2 批：space 正文、时间线、游戏档案、装备、荣誉、留言、页脚 ---------- */
Object.assign(window.ALAN_TEXT_I18N.en, {
  'AlanLumier · 个人空间 | AlanLumier 的作品、荣誉与日常':
    "AlanLumier · Personal Space | Works, honors and everyday life",
  '感谢你的关注与支持，新项目上线时会第一时间提醒你，敬请期待精彩内容。':
    "Thanks for your support — you'll be the first to know when new projects go live.",
  '目前是一名在读初三学生，始终热衷于将脑海里碎片化的构想，一步步打磨、转化为可以实际运行的实体装置与可交付的程序作品。格外享受完整的从 0 到 1 的搭建闭环：从最初构思需求、拆解问题，到查阅资料选型、动手调试排错，再到最终看到想法真正落地可用，整个过程都能带来很强的成就感。我既沉浸在游戏世界带来的乐趣之中，喜欢钻研游戏内的战术逻辑、机制原理，热衷于在游戏里做创造与搭建，在虚拟环境里打磨策略、推演方案；同时也痴迷现实世界里的机械结构与编程代码，对硬件组装、机械传动、逻辑算法都抱有浓厚的好奇心。习惯用技术思维看待身边遇到的各类细碎问题，善于观察日常里的不便之处，尝试用代码、硬件组合的方式给出切实可行的解决方案。':
    "I'm a Grade 9 student who loves turning fragmented ideas into working devices and deliverable software. I especially enjoy the full zero-to-one loop: framing the problem, researching options, debugging, and finally seeing an idea become something usable. I'm equally drawn to games — studying tactics and mechanics, and building things inside them — and to mechanical structures and code in the real world; hardware assembly, drivetrains and algorithms all fascinate me. I tend to look at everyday annoyances with an engineer's eye and try to solve them with code and hardware.",

  /* 爱好描述 */
  '在旋律中寻找宁静与灵感，让节奏抚平心绪，沉浸在音符构筑的世界里。':
    'Finding calm and inspiration in melody, letting rhythm settle the mind.',
  '用脚步丈量世界，在路途中遇见更好的自己，享受自然风光与人文探索。':
    'Measuring the world on foot, meeting a better self along the way — nature and culture alike.',
  '骑行追风，感受速度与自由，在公路与山野间释放压力，热爱长距离骑行。':
    'Chasing the wind on two wheels — speed and freedom on road and trail, with a love of long rides.',
  '在虚拟世界中体验策略与创造，享受竞技的乐趣，专注CS与我的世界。':
    'Strategy and creativity in virtual worlds — competitive fun, focused on CS and Minecraft.',
  '运动挥洒汗水，团队协作铸就友谊与活力，日常坚持锻炼保持状态。':
    'Sweat, teamwork and friendship — staying in shape through daily training.',

  /* 照片说明补遗 */
  '市级VEX挑战赛，与团队并肩作战，从搭建到调试全程参与':
    'City VEX challenge — building and debugging alongside the team from start to finish',
  '从零搭建的自动化装置，红石电路与机械结构的完美结合':
    'An automated build made from scratch — redstone circuits meeting mechanical design',
  '新装备到位，ROG全家桶战斗力拉满，外设与主机的完美搭配':
    'New gear day — a full ROG setup, peripherals and tower in perfect match',

  /* 成长时间线 */
  '开启机械结构与C++编程学习，踏入机器人工程领域，从零基础开始系统学习电机控制、传感器读取与基础运动逻辑。':
    'Started learning mechanical design and C++ programming, entering robotics from the ground up: motor control, sensor reading and basic motion logic.',
  '2023 · 初探': '2023 · First steps',
  '完成第一个Python小工具': 'Built my first Python tool',
  '独立编写自动化脚本，体验从想法到落地的完整流程，掌握文件读写、数据处理与GUI界面开发，开始具备将日常需求转化为工具的能力。':
    'Wrote automation scripts independently and took ideas all the way to working tools: file I/O, data processing and GUI development.',
  '2023 · 竞技': '2023 · Competition',
  '入坑CS竞技': 'Getting into competitive CS',
  '专注枪法与战术打磨，享受回合制博弈的团队配合乐趣，开始系统性训练预瞄架点、投掷物运用与地图战术，在复盘中逐步提升竞技水平。':
    'Focused on aim and tactics, enjoying round-based teamwork: crosshair placement, utility usage and map strategy, improving through review.',
  '2024 · 落地': '2024 · Shipped',
  '开发兴华中学广播站系统': 'Built the Xinghua Middle School broadcasting system',
  '独立设计开发并投入校园实际使用，解决排班与播放管理问题，涵盖广播排班管理、播放日程控制、站点信息维护等核心功能，从需求调研到部署上线全程独立完成。':
    'Designed, built and put into real campus use to solve scheduling and playback management — from requirements research to deployment, all done independently.',
  '2024 · 进阶': '2024 · Levelling up',
  '接触RoboMaster机甲赛事': 'Discovering RoboMaster',
  '深入学习工程控制与视觉识别，拓展机器人技术边界，接触机甲工程结构设计、自动化控制程序开发与视觉识别技术，在团队协作中积累工程实践经验。':
    'Studying engineering control and computer vision to push the boundaries of robotics: structural design, automated control and vision recognition.',
  '2025 · 效率': '2025 · Efficiency',
  '开发自助记账系统': 'Built a self-service accounting system',
  '轻量化单文件本地工具，开箱即用，满足日常收支管理需求，支持收支记录、分类统计与数据可视化，无需安装即可本地运行，为个人财务管理提供便捷高效的解决方案。':
    'A lightweight single-file local tool that works out of the box: income and expense tracking, category stats and data visualisation, no installation required.',

  /* 游戏档案 */
  '在虚拟世界中体验策略、创造与竞技': 'Strategy, creativity and competition in virtual worlds',
  '游戏总时长': 'Total playtime',
  '小时': 'hours',
  'CS 系列': 'CS series',
  '我的世界': 'Minecraft',
  'CS系列': 'CS series',
  '游戏平台': 'Platform',
  '完美世界竞技平台': 'Perfect World Arena',
  '当前段位': 'Current rank',
  '普通A+': 'A+ (Standard)',
  '定位位置': 'Role',
  '步枪位': 'Rifler',
  '游戏模式': 'Mode',
  '竞技模式（5v5回合制）': 'Competitive (5v5, round-based)',
  '擅长武器': 'Preferred weapons',
  '游戏时长': 'Playtime',
  '累计超过 1200 小时': 'Over 1,200 hours',
  '专注枪法与团队战术配合，享受回合制博弈的乐趣，擅长中路突破与补枪，在复盘中持续提升竞技水平。':
    'Focused on aim and team tactics, enjoying round-based play; strong at mid pushes and trade kills, improving through review.',
  '游戏方向': 'Focus',
  '自由建造、红石电路、生存整合包': 'Free building, redstone circuits, survival modpacks',
  '偏好玩法': 'Preferred playstyle',
  '技术向、自动化': 'Technical, automation',
  '擅长内容': 'Strengths',
  '红石自动化装置、大型建筑建造、生存模式挑战': 'Redstone automation, large builds, survival challenges',
  '模组偏好': 'Mod preferences',
  '科技类模组、机械动力、应用能源': 'Tech mods, Create, Applied Energistics',
  '累计超过 800 小时': 'Over 800 hours',
  '喜欢用红石搭建自动化装置，享受从零搭建完整世界的成就感，偏好技术向玩法，在生存与创造中探索无限可能。':
    'I love building redstone automation and the feeling of creating a whole world from scratch, preferring technical play across survival and creative.',

  /* 装备 */
  '工欲善其事，必先利其器': 'Sharp tools make good work',
  '键盘': 'Keyboard',
  '支持蓝牙/2.4G/有线三模连接，热插拔轴体设计，RGB背光，客制化手感，长时间编程与游戏输入依旧舒适稳定。':
    'Tri-mode connection (Bluetooth / 2.4G / wired), hot-swappable switches and RGB backlight — comfortable through long coding and gaming sessions.',
  '鼠标': 'Mouse',
  '超轻量化机身设计，2.4G无线低延迟连接，高精度传感器，适合FPS游戏快速定位与长时间使用不累手。':
    'An ultra-light body, low-latency 2.4G wireless and a high-precision sensor — quick flicks in FPS without fatigue.',
  '显示器': 'Monitor',
  'ROG 超杀 27Pro 二代 (20周年典藏限定)': 'ROG Swift 27Pro 2nd gen (20th Anniversary Edition)',
  '540Hz超高刷新率电竞显示器，极低响应时间，画面流畅无拖影，在CS等竞技游戏中提供极致的视觉优势。':
    'A 540Hz esports monitor with extremely low response time and no visible ghosting — a real edge in games like CS.',
  '耳机': 'Headset',
  'ROG 棱镜 2': 'ROG Delta 2',
  '虚拟7.1环绕声道，精准听声辨位，舒适透气耳罩，长时间佩戴不压迫，在竞技游戏中提供出色的空间定位能力。':
    'Virtual 7.1 surround for accurate positional audio, with breathable ear cups that stay comfortable over long sessions.',
  '鼠标垫': 'Mousepad',
  '卓威专业电竞级鼠标垫，细腻布面提供稳定顺滑的移动手感，防滑橡胶底确保桌面稳固，是FPS玩家的首选装备。':
    'A ZOWIE esports-grade pad: fine cloth surface for smooth, consistent glide and a non-slip rubber base.',

  /* 机器人与工程 */
  '机器人与工程': 'Robotics & Engineering',
  '从机械结构到程序控制，探索机器人的无限可能':
    'From mechanical design to program control — exploring what robots can do',
  'VEX V5 机器人': 'VEX V5 robot',
  '机械结构搭建与动力学优化，包括底盘设计、传动系统选型与结构强度分析':
    'Mechanical build and dynamics tuning: chassis design, drivetrain selection and structural strength analysis',
  'C++程序编写与现场调试，涵盖电机PID控制、传感器数据融合与自主运动算法':
    'C++ development and on-site debugging: motor PID control, sensor fusion and autonomous motion algorithms',
  '比赛现场快速调试与战术策略调整，根据对手特点灵活优化机器人表现与配合':
    'Fast on-site debugging and tactical adjustment, adapting the robot to each opponent',
  '参与多项校级与市级VEX机器人赛事，在实战中积累经验并取得优异成绩':
    'Competed in school- and city-level VEX events, gaining hands-on experience and strong results',
  '机甲大师 RoboMaster': 'RoboMaster',
  '机甲工程结构设计与建模，包括装甲布局、悬挂系统与模块化部件的三维设计':
    'Engineering structure design and 3D modelling: armour layout, suspension and modular parts',
  '自动化控制程序开发，实现云台稳定追踪、弹丸发射控制与底盘全向移动协同':
    'Automated control programs: stable gimbal tracking, projectile firing control and omnidirectional chassis coordination',
  '视觉识别技术入门学习，基于OpenCV实现目标检测、颜色识别与距离估算功能':
    'An introduction to computer vision with OpenCV: object detection, colour recognition and distance estimation',
  '团队协作与赛事参与，在RoboMaster赛事中与队员分工配合，共同完成机甲研发与竞技':
    'Teamwork and competition — dividing work with teammates to build and compete with our robot',

  /* 荣誉 */
  '荣誉与奖项': 'Honors & Awards',
  '每一份荣誉都是努力的证明': 'Every honor is proof of the work behind it',
  '2025 · 机器人竞赛': '2025 · Robotics',
  '市级VEX机器人挑战赛 二等奖': 'City VEX Robotics Challenge — Second Prize',
  '在市级VEX机器人挑战赛中，与团队协作完成机器人设计、编程与现场调试，凭借稳定的赛场表现获得二等奖。':
    'Worked with the team on robot design, programming and on-site debugging, earning Second Prize for a steady performance.',
  '2024 · 编程开发': '2024 · Development',
  '青少年科技创新大赛 编程类三等奖':
    'Youth Science & Technology Innovation Competition — Third Prize (Programming)',
  '独立开发的编程项目参加青少年科技创新大赛，从需求分析到代码实现全程自主完成，获得编程类三等奖。':
    'Entered the competition with a self-developed project, handling everything from requirements analysis to implementation.',
  '2024 · 校园荣誉': '2024 · School honor',
  '校园科技创新之星 校级荣誉称号': 'Campus Tech Innovation Star — school-level title',
  '因在科技创新、机器人竞赛和编程开发方面的突出表现，获得校园科技创新之星校级荣誉称号。':
    'Awarded the school-level title for outstanding work in innovation, robotics and programming.',
  '2023 · 机器人竞赛': '2023 · Robotics',
  '校级VEX机器人联赛 一等奖': 'School VEX Robotics League — First Prize',
  '在校级VEX机器人联赛中，带领团队完成机器人搭建与战术制定，在多轮对抗中脱颖而出，获得一等奖。':
    'Led the team through robot assembly and tactics, standing out across multiple rounds to take First Prize.',
  '2023 · 编程开发': '2023 · Development',
  '信息学奥赛普及组 市级二等奖': 'Informatics Olympiad (Beginner) — City Second Prize',
  '参加信息学奥赛普及组比赛，在算法与数据结构方面展现扎实基础，获得市级二等奖。':
    'Competed in the beginner division, showing solid foundations in algorithms and data structures.',
  '2022 · 校园荣誉': '2022 · School honor',
  '优秀学生干部 校级荣誉': 'Outstanding Student Leader — school-level honor',
  '在担任学生干部期间，认真负责、积极组织各类活动，获得优秀学生干部校级荣誉。':
    'Recognised for responsibility and active organisation of activities while serving as a student leader.',

  /* 留言与联系 */
  '来过，便留下你的足迹': 'You came — leave your mark',
  '留下你的名字吧': 'Leave your name',
  '记住你の来过': 'Remember you were here',
  '提交留名': 'Submit',
  '访客名单': 'Visitor list',
  '0 人': '0 visitors',
  '加载中...': 'Loading…',
  '欢迎交流技术、游戏与一切有趣的话题': 'Happy to talk tech, games and anything interesting',
  '邮箱': 'Email',
  '欢迎添加交流': 'Feel free to add me',
  '个人网站': 'Website',

  /* 页脚 */
  '· 个人空间 · 用热爱打造每一行代码': '· Personal Space · Every line written with passion',
  '本站已平稳运行': 'This site has been running for',
  '天，本次停留': 'days. This visit:',
  '分': 'min',
  '秒。': 'sec.',
  '独立访客使用不蒜子插件进行统计 · 访客数': 'Unique visitors counted by Busuanzi · Visitors',
  '· 访问量': '· Page views',
});

/* ---------- 第 3 批：作品详情页的跨页共用文案（6 页同时生效）---------- */
Object.assign(window.ALAN_TEXT_I18N.en, {
  '正在打开作品…': 'Opening project…',
  '长按加速': 'Hold to speed up',
  '按住不放，加载更快': 'Hold to load faster',
  '返回标签页': 'Back to tabs',
  '精选作品': 'Featured works',
  '用户评分 · 满分 5.0': 'User rating · out of 5.0',
  '立即体验': 'Try it now',
  '下载文件': 'Download',
  '项目简介': 'Overview',
  '开发形式': 'Built with',
  '单文件 HTML': 'Single-file HTML',
  '数据存储': 'Data storage',
  '本地持久化': 'Local persistence',
  '核心功能': 'Key features',
  '技术细节': 'Technical details',
  '使用指南': 'How to use',
  '版本记录': 'Version history',
  '适用场景': 'Use cases',
  '· 一个藏在AlanLumier里的小作品': '· A small project living inside AlanLumier',
});

/* ---------- 第 4 批：作品详情页正文 —— accounting（自助记账系统）---------- */
Object.assign(window.ALAN_TEXT_I18N.en, {
  '自助记账系统 · AlanLumier 作品详情': 'Self-service Accounting System · AlanLumier project',
  '自助记账系统': 'Self-service Accounting System',
  '/ 自助记账系统': '/ Self-service Accounting System',
  '轻量化的单文件本地记账工具，收支分类、统计与可视化开箱即用。':
    'A lightweight single-file local bookkeeping tool — categorisation, stats and charts out of the box.',
  '效率工具': 'Productivity tool',
  '记账': 'Bookkeeping',
  '数据可视化': 'Data visualisation',
  '本地运行': 'Runs locally',
  '一个把「记账」这件事做简单的单文件工具：记录每一笔收入和支出，按分类自动汇总，并用图表直观呈现钱都去了哪里。所有数据都保存在本地，不依赖任何云端服务，隐私安全，导出方便。适合个人日常消费管理与月度复盘。':
    'A single-file tool that makes bookkeeping simple: record every income and expense, get automatic totals by category, and see clearly where the money went. All data stays on your device — no cloud service, private and easy to export. Great for personal spending management and monthly reviews.',
  '统计维度': 'Statistics',
  '分类 / 月度 / 趋势': 'Category / Monthly / Trend',
  '适用人群': 'Best for',
  '个人与家庭': 'Individuals and families',
  '收支记录：一键记一笔，支持收入 / 支出双类型与任意分类。':
    'Quick entry: record a transaction in one tap, supporting both income and expense with any category.',
  '分类统计：餐饮、交通、购物、娱乐等分类自动汇总，占比一目了然。':
    'Category totals: food, transport, shopping, entertainment and more are summed automatically, with shares at a glance.',
  '数据可视化：月度收支柱状图、分类占比图，趋势看得见。':
    'Visualisation: monthly income/expense bars and category share charts make trends visible.',
  '本地保存：所有数据仅存于本机，不联网、不上传，隐私安全。':
    'Stored locally: all data stays on your device — no network, no uploads.',
  '导出与重置：支持数据导出备份，随时清空重来。':
    'Export and reset: back up your data any time, or clear it and start over.',
  '单文件 HTML 实现，无需安装与联网，任何设备打开即用。':
    'A single HTML file — no install, no connection, ready on any device.',
  '记账数据采用本地存储结构，关闭页面不丢失，跨会话持续累积。':
    'Entries are kept in local storage, surviving page closes and accumulating across sessions.',
  '图表由原生绘制，无第三方库依赖，加载快、体积小。':
    'Charts are drawn natively with no third-party libraries — fast to load and small.',
  '内置月度结算逻辑：自动计算结余、环比与分类占比。':
    'Built-in monthly settlement: balance, month-over-month change and category shares calculated automatically.',
  '首次打开即进入记账页，输入金额、选择分类、点击保存即可完成一笔记录。':
    'It opens straight on the entry page: type an amount, pick a category and save.',
  '首页默认展示本月概览：总收入、总支出、结余与分类占比。':
    'The home view shows this month at a glance: total income, total expense, balance and category shares.',
  '右上角可切换历史月份，回看往月明细与图表。':
    'Switch months from the top right to revisit earlier details and charts.',
  '数据备份建议定期导出保存到本地，防止误清。':
    'Export regularly to keep a local backup in case of accidental clearing.',
  '当前版本：优化分类体系与月度对比视图，图表交互升级。':
    'Current version: improved category system and monthly comparison view, upgraded chart interaction.',
  '新增月度切换与数据导出功能。': 'Added month switching and data export.',
  '初版：仅支持收支记录与简单汇总。': 'First release: income/expense entry and simple totals.',
});

/* ---------- 第 5 批：作品详情页正文 —— chess（棋类合集）---------- */
Object.assign(window.ALAN_TEXT_I18N.en, {
  '棋类合集 · AlanLumier 作品详情': 'Board Game Collection · AlanLumier project',
  '棋类合集': 'Board Game Collection',
  '/ 棋类合集': '/ Board Game Collection',
  '五子棋与中国象棋同页双开，本地运行，无需联网。':
    'Gomoku and Chinese Chess on one page — runs locally, no connection needed.',
  '象棋': 'Chinese Chess',
  '五子棋': 'Gomoku',
  '本地对战': 'Local two-player',
  '一个把五子棋与中国象棋放在同一个页面里的棋类合集。无需联网、无需登录，打开就能和身边的朋友来一局。棋子、棋盘、规则判断全部本地实现，界面清爽，手感流畅，是聚会与课间的解闷利器。':
    'A board game collection that puts Gomoku and Chinese Chess on the same page. No connection, no login — open it and play a round with whoever is nearby. Pieces, board and rule checking are all implemented locally, with a clean interface and smooth feel. A great way to pass the time between classes or at a gathering.',
  '游戏数量': 'Games',
  '2 款': '2',
  '对战方式': 'Match type',
  '本地双人': 'Local two-player',
  '运行要求': 'Requirements',
  '浏览器即可': 'Just a browser',
  '五子棋：标准 15×15 棋盘，禁手之外的规则完整实现，支持悔棋。':
    'Gomoku: a standard 15×15 board with the full ruleset and undo support.',
  '中国象棋：完整棋规——马走日、象走田、蹩马腿、塞象眼、将帅对脸判定。':
    "Chinese Chess: complete rules — the horse's L-move, the elephant's 2×2 move, blocked-leg and blocked-eye checks, and the flying-general rule.",
  '同页切换：两款游戏一键互切，无需刷新页面。':
    'Switch in place: move between the two games with one click, no page reload.',
  '胜负判定自动完成：五子连珠、将军、绝杀即时提示。':
    'Automatic win detection: five in a row, check and checkmate are announced immediately.',
  '悔棋与复盘：下错可悔，结束后可回放整局。':
    'Undo and replay: take back a mistake, or replay the whole game afterwards.',
  '棋盘以 Canvas 渲染，落子动画流畅，移动端同样顺滑。':
    'The board is rendered on Canvas, with smooth piece animations that feel good on mobile too.',
  '象棋走法合法性校验完整覆盖，包含吃子与将军状态检测。':
    'Move legality for Chinese Chess is fully covered, including captures and check detection.',
  '规则引擎独立实现，不依赖任何第三方库。':
    'The rules engine is implemented from scratch with no third-party libraries.',
  '本地会话内保留对局状态，误刷新前可恢复。':
    'Game state is kept within the local session, so an accidental refresh is recoverable.',
  '打开页面后在顶部切换「五子棋 / 中国象棋」。':
    'Open the page and switch between Gomoku and Chinese Chess at the top.',
  '执黑 / 执红一方先手，点击棋盘落子。':
    'Black (or Red) moves first — click the board to place a piece.',
  '对局结束自动弹出胜负提示，可点击复盘或重新开始。':
    'When the game ends a result prompt appears, with options to replay or restart.',
  '「悔棋」按钮可回退上一步，适合友谊局。':
    'The Undo button takes back the last move — handy for friendly games.',
  '当前版本：修复象棋异常判断，新增悔棋与复盘。':
    'Current version: fixed an edge case in Chinese Chess adjudication, added undo and replay.',
  '初版：五子棋上线。': 'First release: Gomoku launched.',
  '新增中国象棋，双棋合璧。': 'Added Chinese Chess — two games in one.',
});
