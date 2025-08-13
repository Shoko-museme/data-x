# Data-X Dashboard 

基于原型项目一比一还原的React + TypeScript仪表板应用。

## 技术栈

- **React 18** - 现代化前端框架
- **TypeScript** - 类型安全的开发体验
- **Vite** - 快速的构建工具
- **Tailwind CSS** - 实用优先的CSS框架
- **shadcn/ui** - 高质量的UI组件库
- **Recharts** - 数据可视化图表库
- **Lucide React** - 现代化图标库

## 功能特性

### 🏠 总览页面 (Overview)
- **KPI概览横幅** - 实时安全评分、报警统计、危险作业等关键指标
- **实时事件流** - 显示最新的安全事件，支持位置点击交互
- **重点区域监控** - 危险作业和AI巡查情况实时监控
- **风险热力图** - 工厂区域风险可视化，支持区域高亮显示
- **安全数据分析** - 隐患趋势图和类型分布饼图

### 🗺️ 地图页面 (Maps)
- 工厂平面图显示
- 图层控制（摄像头、传感器、报警区域等）
- 当前报警实时显示
- 设备状态监控

### 📊 项目页面 (Projects)
- 项目列表管理
- 状态跟踪和进度监控
- 责任人分配和优先级管理
- 筛选和导出功能

## 项目结构

```
src/
├── components/           # React组件
│   ├── ui/              # shadcn/ui基础组件
│   ├── NavBar.tsx       # 导航栏组件
│   ├── DashboardV2.tsx  # 仪表板主组件
│   ├── KPISummaryBanner.tsx     # KPI概览横幅
│   ├── RealTimeEventStream.tsx  # 实时事件流
│   ├── FocusAreaMonitoring.tsx  # 重点区域监控
│   ├── RiskHeatMap.tsx          # 风险热力图
│   ├── SafetyAnalytics.tsx      # 安全数据分析
│   ├── EntriesTable.tsx         # 项目表格
│   └── MapsPage.tsx             # 地图页面
├── types/               # TypeScript类型定义
│   ├── dashboard.ts     # 仪表板相关类型
│   ├── projects.ts      # 项目管理相关类型
│   ├── ui.ts           # UI组件相关类型
│   └── index.ts        # 类型导出文件
├── lib/                # 工具库
│   └── utils.ts        # 通用工具函数
├── App.tsx             # 应用主入口
└── main.tsx            # 应用启动文件
```

## 开发指导

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 设计原则

1. **避免紫色主题** - 根据用户规则，UI设计避免使用紫色背景色
2. **类型安全** - 所有数据结构都有对应的TypeScript类型定义
3. **组件化** - 高度模块化的组件设计，便于维护和扩展
4. **响应式设计** - 适配不同屏幕尺寸的用户界面
5. **交互友好** - 支持位置点击、区域高亮等交互功能

## 数据结构

项目包含完整的TypeScript类型定义，覆盖：
- Dashboard数据类型（KPI、事件、监控等）
- 项目管理数据类型
- UI组件Props类型
- 通用API响应类型

## 注意事项

- 本项目为原型项目的一比一还原实现
- 图表数据为模拟数据，实际使用时需要连接真实数据源
- 地图组件预留了集成接口，可以集成实际的地图服务
- 所有组件都支持暗色模式（通过CSS变量控制）

## 开发环境要求

- Node.js >= 18
- npm >= 9