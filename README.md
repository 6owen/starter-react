# Starter React

这是一个基于 `pnpm workspace + turbo` 的 React Starter Monorepo，当前已经按照项目约定整理成：

- `apps/web`：主应用
- `packages/ui`：共享 UI 组件与全局样式

整体目标不是做一个“大而全”的脚手架，而是先把常用的目录约定、状态管理、请求层、样式层、路由层、自动类型生成和共享 UI 结构搭好，方便后续直接往业务里填内容。

## 技术栈

- `React 19`
- `Vite 8`
- `TypeScript`
- `Zustand`
- `React Router DOM 6`
- `vite-plugin-pages`
- `unplugin-auto-import`
- `react-use`
- `Axios`
- `shadcn/ui`
- `Tailwind CSS v4`
- `@egoist/tailwindcss-icons`
- `Iconify JSON (carbon / solar)`
- `pnpm workspace`
- `turbo`
- `ESLint + Prettier + simple-git-hooks + lint-staged`

## 架构说明

### 1. Monorepo 分层

- 根目录负责 workspace 编排、统一脚本、lint/format/typecheck、git hooks。
- `apps/web` 负责实际业务应用。
- `packages/ui` 负责共享组件、共享样式、`cn` 工具以及 shadcn/ui 相关能力。

### 2. 路由方案

- 页面级路由使用 `vite-plugin-pages`，约定式扫描 `apps/web/src/pages`。
- 自定义路由、路由守卫、路由元信息处理放在 `apps/web/src/routers`。
- layout 不直接散落在页面里，而是由 router 层统一决定，当前支持：
  - `default`
  - `fullscreen`

### 3. 样式方案

- `packages/ui/src/styles/globals.css` 是共享基础样式入口。
- `apps/web/src/styles` 负责应用层全局样式拆分：
  - `global.css`
  - `tailwind.css`
  - `scrollbar.css`
  - `view-transition-api.css`

### 4. 状态管理方案

- 使用 `Zustand`
- `apps/web/src/stores` 按模块拆分
- 当前已整理成：
  - `stores/index.ts`
  - `stores/modules/app`
  - `stores/modules/route`

### 5. 类型生成方案

- `unplugin-auto-import` 会自动注入常用 hooks / router API / `react-use`
- 生成文件统一放在 `apps/web/src/typings`
- 当前自动生成：
  - `auto-imports.d.ts`
- 当前手写声明：
  - `env.d.ts`
  - `modules.d.ts`
  - `route-meta.d.ts`

## 目录结构（树状注释版）

```txt
.
├─ apps/
│  └─ web/                           # React 主应用
│     ├─ src/
│     │  ├─ components/              # 应用内业务组件
│     │  │  ├─ theme-provider.tsx    # 全局主题上下文
│     │  │  └─ theme-toggle-button/  # 主题切换按钮与动效
│     │  ├─ composables/             # 自定义 hooks，支持 auto-import 扫描
│     │  │  └─ use-app-theme.ts      # 主题逻辑的应用层封装
│     │  ├─ layouts/                 # 页面 layout
│     │  │  ├─ default.tsx           # 默认应用壳
│     │  │  └─ fullscreen.tsx        # 全屏布局
│     │  ├─ libs/                    # 应用内基础工具
│     │  │  └─ utils.ts              # 转出 cn，避免深层 workspace 引用
│     │  ├─ pages/                   # 约定式路由页面，vite-plugin-pages 自动扫描
│     │  │  ├─ index.tsx             # 首页
│     │  │  ├─ about.tsx             # About 页面
│     │  │  └─ fullscreen.tsx        # Fullscreen 示例页面
│     │  ├─ routers/                 # 自定义路由层、守卫、route meta、layout 装配
│     │  │  ├─ index.tsx             # Router 入口
│     │  │  ├─ page-routes.tsx       # 约定式路由补 meta
│     │  │  ├─ routes.tsx            # 自定义路由声明
│     │  │  ├─ guard.tsx             # 路由守卫
│     │  │  ├─ custom-route.tsx      # 自定义路由页面示例
│     │  │  ├─ not-found.tsx         # 404 页面
│     │  │  └─ types.ts              # 路由类型
│     │  ├─ services/                # Axios 与 API 封装
│     │  │  ├─ api/                  # 业务 API，文件命名尽量使用 xxxApi.ts
│     │  │  │  ├─ appApi.ts          # 示例 API 模块
│     │  │  │  └─ index.ts           # api 统一导出
│     │  │  ├─ request/              # Axios 实例与拦截器
│     │  │  │  ├─ request.ts         # createRequest
│     │  │  │  └─ index.ts           # 默认 request 实例
│     │  │  └─ index.ts              # services 统一导出
│     │  ├─ setups/                  # 应用启动阶段的一次性配置
│     │  │  ├─ index.ts              # setup 汇总入口
│     │  │  └─ theme.ts              # 首屏主题外观初始化
│     │  ├─ stores/                  # Zustand 状态目录
│     │  │  ├─ index.ts              # store 统一导出
│     │  │  └─ modules/              # 模块化 store
│     │  │     ├─ app/
│     │  │     │  └─ index.ts        # 应用级状态
│     │  │     └─ route/
│     │  │        └─ index.ts        # 当前路由快照
│     │  ├─ styles/                  # 应用层全局样式
│     │  │  ├─ global.css            # 全局样式入口
│     │  │  ├─ tailwind.css          # 引入共享 Tailwind 基础样式
│     │  │  ├─ scrollbar.css         # 滚动条样式
│     │  │  └─ view-transition-api.css
│     │  │                           # 主题切换动效样式
│     │  ├─ typings/                 # 自动生成与手写声明文件
│     │  │  ├─ auto-imports.d.ts     # unplugin-auto-import 自动生成
│     │  │  ├─ env.d.ts              # env 与浏览器补充声明
│     │  │  ├─ modules.d.ts          # 模块声明，如 ~react-pages
│     │  │  └─ route-meta.d.ts       # 路由 meta 类型
│     │  ├─ App.tsx                  # 应用组件入口，当前只挂 Router
│     │  └─ main.tsx                 # React 挂载入口
│     ├─ vite.config.ts              # Vite、pages、auto-import 配置
│     ├─ eslint.config.js            # web 应用 ESLint 配置
│     ├─ tsconfig.json               # TS 项目引用入口
│     ├─ tsconfig.app.json           # web 编译配置
│     └─ package.json                # web 应用依赖与脚本
├─ packages/
│  └─ ui/                            # 共享 UI 工作区
│     ├─ src/
│     │  ├─ components/              # shadcn/ui 共享组件
│     │  │  └─ button.tsx
│     │  ├─ lib/
│     │  │  └─ utils.ts              # clsx + tailwind-merge 组成的 cn
│     │  └─ styles/
│     │     └─ globals.css           # 共享全局样式与 Tailwind 主题变量
│     ├─ tailwind.config.ts          # Iconify collections 配置
│     ├─ components.json             # shadcn 配置
│     └─ package.json                # 共享 UI 包依赖
├─ package.json                      # workspace 根脚本
├─ pnpm-workspace.yaml               # pnpm workspace 配置
├─ turbo.json                        # turbo 任务编排
└─ README.md                         # 项目说明
```

### 目录使用约定

- `pages`：只放约定式页面文件。
- `routers`：放自定义路由、路由守卫、meta 和 layout 装配逻辑。
- `layouts`：放页面外壳，不直接耦合具体业务。
- `stores`：放 Zustand 模块，目录按 `modules/*` 扩展。
- `services`：放 Axios、请求拦截器和 API 模块。
- `setups`：放应用启动时的一次性初始化逻辑。
- `styles`：放应用层全局样式拆分文件。
- `typings`：放自动生成 typings 和手写声明。
- `composables`：放 hooks，并作为 auto-import 扫描目录。
- `components`：放只属于 `apps/web` 的组件。
- `packages/ui`：只放共享 UI 能力，不放业务逻辑。

## 自动导入说明

当前 `unplugin-auto-import` 已经接入：

- `react`
- `react-router-dom`
- `react-use`
- `src/composables`

生成文件：

- [apps/web/src/typings/auto-imports.d.ts](/Users/wangwenbo/Documents/wangwenbo/Mine/starter-react/apps/web/src/typings/auto-imports.d.ts)

当前你在 `apps/web` 内部可以直接使用一部分常见 API，而不必手写 import。

## 常用命令

### 安装依赖

```bash
pnpm install
```

### 启动 web

```bash
pnpm dev:web
```

### 构建 web

```bash
pnpm build:web
```

### 运行 lint

```bash
pnpm lint
```

### 运行格式化

```bash
pnpm format
```

## 当前约定总结

- `pages` 负责约定式页面
- `routers` 负责自定义路由与守卫
- `layouts` 负责页面壳
- `stores` 负责 Zustand 模块化状态
- `services` 负责 Axios 与 API 模块
- `setups` 负责启动配置
- `styles` 负责应用层全局样式
- `typings` 负责所有自动生成和手写声明文件
- `composables` 负责 hooks
- `components` 负责应用内组件
- `packages/ui` 负责共享 UI 能力

如果后续你还要继续往 Vue 那套习惯靠拢，下一步通常会是：

- 增加 `modules/auth`
- 增加更完整的 `route meta`
- 补一个统一的 `api` 分类规范
- 引入 Ant Design 到 `setups`
- 补页面级 loading / error / permission 处理
