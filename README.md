# Starter React

这是一个基于 `TanStack Start + TanStack Router + TanStack Query` 的单应用 Starter。

目标架构规范见 [docs/tanstack-start-architecture.md](./docs/tanstack-start-architecture.md)。

## 当前约定

- 路由根目录使用 `src/pages`
- 不使用 `features/`
- 页面私有组件、query、schema、form、table 配置都尽量和路由目录放在一起
- `services/` 继续负责请求、QueryClient、后续 `tRPC` client 等请求基础设施
- `stores/` 只放客户端状态，不放服务端数据

## 技术栈

- `TanStack Start`
- `TanStack Router`
- `TanStack Query`
- `React 19`
- `Vite 8`
- `TypeScript`
- `Zustand`
- `Axios`
- `react-use`
- `shadcn/ui`
- `Tailwind CSS v4`
- `ESLint + Prettier + simple-git-hooks + lint-staged`

## 目录概览

```txt
src/
  pages/            # TanStack 文件路由
  services/         # 请求层、QueryClient、后续 tRPC client
  stores/           # 本地 UI 状态
  components/       # 全局复用组件与 ui 组件
  composables/      # hooks
  lib/              # 纯工具
  styles/           # 全局样式
  setups/           # 启动和主题相关基础能力
```

## 常用命令

```bash
pnpm dev
pnpm generate-routes
pnpm typecheck
pnpm lint
pnpm build
```
