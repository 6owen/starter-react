# Starter React

这是一个基于 `pnpm + Vite + React` 的单应用 Starter。

当前项目已经按照你的开发习惯整理好目录约定，重点是先把常用结构搭稳：

- `typings`：自动生成类型与声明文件
- `styles`：全局样式拆分
- `stores`：Zustand 模块化状态
- `setups`：应用启动配置
- `services`：Axios 与 API 层
- `routers`：自定义路由与路由拦截
- `libs`：基础工具
- `layouts`：页面布局
- `pages`：目录式约定路由页面，一级文件可直出，目录页使用 `page.tsx`
- `composables`：hooks
- `components`：业务组件与 UI 组件

## 技术栈

- `pnpm`
- `React 19`
- `Vite 8`
- `TypeScript`
- `React Router DOM 6`
- `vite-plugin-pages`
- `unplugin-auto-import`
- `Zustand`
- `Axios`
- `react-use`
- `shadcn/ui`
- `Tailwind CSS v4`
- `Iconify`
- `lucide-react`
- `ESLint + Prettier + simple-git-hooks + lint-staged`

## 架构说明

### 路由

- 页面路由使用 `vite-plugin-pages`
- 一级页面文件：自动扫描 `src/pages/*.tsx`
- 目录式页面：自动扫描 `src/pages/**/page.tsx`
- 自定义路由、路由守卫、路由布局装配放在 `src/routers`
- 当前提供两个 layout：
  - `default`
  - `fullscreen`

### 页面组织约定

- `src/pages/*.tsx` 这种一级文件仍然是页面
- `src/pages/**/page.tsx` 是目录式页面入口文件
- `src/pages/**/components/*` 是这个页面私有的子组件目录
- 页面优先就地拆分，先放在当前页面目录下，避免一开始就抽到全局 `src/components`
- 只有确认跨页面、跨场景稳定复用后，才提升到全局组件
- 目标是职责分离、单一使用、不过度复用

### 状态管理

- 使用 `Zustand`
- store 放在 `src/stores`
- 当前已拆成：
  - `modules/app`
  - `modules/route`

### 类型生成

- `unplugin-auto-import` 已接入
- 会自动导入：
  - `react`
  - `react-router-dom`
  - `react-use`
  - `src/composables`
- 生成文件放在：
  - `src/typings/auto-imports.d.ts`

### 样式

- `src/styles/tailwind.css`：Tailwind、shadcn、Iconify、主题变量
- `src/styles/global.css`：全局样式总入口
- `src/styles/scrollbar.css`：滚动条样式
- `src/styles/view-transition-api.css`：主题切换动效样式
- 组件样式优先使用 `Tailwind CSS`
- 优先使用主题 token，例如 `bg-background`、`text-muted-foreground`、`border-border`
- 尽量不要写死颜色、阴影、边框等视觉值
- 尽量不写自定义 CSS，也不要把组件私有样式堆进 `src/styles`
- 如果某个组件确实需要独立 CSS，优先和组件本身同目录共置，而不是污染全局样式目录

## 目录结构（树状注释版）

```txt
.
├─ src/                                # 应用源码
│  ├─ components/                      # 业务组件与 UI 组件
│  │  ├─ theme-provider.tsx            # 主题上下文
│  │  ├─ theme-toggle-button/          # 主题切换按钮
│  │  └─ ui/
│  │     └─ button.tsx                 # shadcn button
│  ├─ composables/                     # hooks 目录
│  │  └─ use-app-theme.ts              # 应用层主题 hook
│  ├─ layouts/                         # 页面布局
│  │  ├─ default.tsx                   # 默认布局
│  │  └─ fullscreen.tsx                # 全屏布局
│  ├─ libs/                            # 基础工具
│  │  └─ utils.ts                      # cn: clsx + tailwind-merge
│  ├─ pages/                           # 一级文件可直出，目录页使用 page.tsx
│  │  ├─ index.tsx                     # 根路由页面，可用于重定向或首页壳
│  │  ├─ about.tsx                     # 一级直出页面示例
│  │  ├─ home/
│  │  │  ├─ page.tsx                   # Home 页面
│  │  │  └─ components/                # Home 页面私有子组件
│  │  │     ├─ feature-card.tsx
│  │  │     └─ store-metric-card.tsx
│  │  └─ fullscreen/
│  │     └─ page.tsx                   # Fullscreen 页面
│  ├─ routers/                         # 自定义路由、守卫、meta、layout 装配
│  │  ├─ index.tsx                     # Router 入口
│  │  ├─ page-routes.tsx               # 约定式路由加工
│  │  ├─ routes.tsx                    # 自定义路由声明
│  │  ├─ guard.tsx                     # 路由守卫
│  │  ├─ custom-route.tsx              # 自定义路由示例
│  │  ├─ not-found.tsx                 # 404 页面
│  │  └─ types.ts                      # 路由类型
│  ├─ services/                        # 请求层
│  │  ├─ api/
│  │  │  ├─ appApi.ts                  # 示例 API
│  │  │  └─ index.ts                   # API 导出
│  │  ├─ request/
│  │  │  ├─ request.ts                 # Axios 实例工厂
│  │  │  └─ index.ts                   # 默认 request 实例
│  │  └─ index.ts                      # services 导出
│  ├─ setups/                          # 启动配置
│  │  ├─ index.ts                      # setup 汇总入口
│  │  └─ theme.ts                      # 首屏主题初始化
│  ├─ stores/                          # Zustand 状态目录
│  │  ├─ index.ts                      # store 导出
│  │  └─ modules/
│  │     ├─ app/
│  │     │  └─ index.ts                # 应用级状态
│  │     └─ route/
│  │        └─ index.ts                # 当前路由快照
│  ├─ styles/                          # 全局样式
│  │  ├─ global.css                    # 全局样式入口
│  │  ├─ tailwind.css                  # Tailwind / shadcn / Iconify 入口
│  │  ├─ scrollbar.css                 # 滚动条样式
│  │  └─ view-transition-api.css       # 主题切换动效样式
│  ├─ typings/                         # 自动生成与手写声明
│  │  ├─ auto-imports.d.ts             # auto-import 生成
│  │  ├─ env.d.ts                      # env 与浏览器补充声明
│  │  ├─ modules.d.ts                  # 模块声明
│  │  └─ route-meta.d.ts               # route meta 类型
│  ├─ App.tsx                          # 应用组件入口
│  └─ main.tsx                         # React 挂载入口
├─ components.json                     # shadcn 配置
├─ eslint.config.js                    # ESLint 配置
├─ index.html                          # Vite HTML 入口
├─ package.json                        # 项目依赖与脚本
├─ tailwind.config.ts                  # Tailwind / Iconify 配置
├─ tsconfig.json                       # TS 项目引用入口
├─ tsconfig.app.json                   # 应用编译配置
├─ tsconfig.node.json                  # Node 侧配置
├─ vite.config.ts                      # Vite、pages、auto-import 配置
└─ README.md                           # 项目说明
```

## 目录使用约定

- `pages`：一级 `.tsx` 文件直接参与路由生成，目录页则由 `page.tsx` 参与路由生成
- `pages/**/components`：放页面私有组件，默认不做全局复用
- `routers`：放自定义路由、守卫、meta 和 layout 处理
- `layouts`：放页面壳
- `stores`：放 Zustand 模块
- `services`：放 Axios、拦截器和 API
- `setups`：放应用启动时的一次性初始化逻辑
- `styles`：放全局样式拆分文件
- `typings`：放自动生成类型和手写声明
- `composables`：放 hooks
- `components`：放确认需要跨页面复用的组件和 UI 组件
- `libs`：放基础工具，目前主要是 `cn`

## 常用命令

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm format
```
