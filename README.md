# Starter React

这是一个基于 `Vite + React + Tailwindcss + TanStack Router + TanStack Query` 的单应用 Starter。

这份 `README.md` 不是一句话简介，而是当前仓库的主说明文档。后续看目录规范、路由分组、请求层、状态层、主题层，优先以这份 README 为准。

当前项目按下面这套规则：

- 路由根目录固定使用 `src/pages`
- 路由分组自己的壳子，直接写在各自的 `route.tsx`
- 页面私有组件、schema、query、form、table 列定义，优先和页面目录放在一起
- `services/` 负责所有请求相关内容，包括 `http`、`query-client`、后续 `tRPC client`
- `stores/` 只放客户端本地状态，不放服务端数据缓存

## 技术栈

- `pnpm`
- `TanStack Start`
- `TanStack Router`
- `TanStack Query`
- `React 19`
- `Vite 8`
- `TypeScript 6`
- `Zustand`
- `Axios`
- `react-use`
- `shadcn/ui`
- `Tailwind CSS v4`
- `ESLint + Prettier + simple-git-hooks + lint-staged`

## 当前项目的最终约定

### 1. 路由目录就是 `src/pages`

虽然 TanStack 官方文档大量使用 `src/routes`，但本项目统一使用 `src/pages`。

当前配置已经固定：

- `tsr.config.json`
- `vite.config.ts`

关键配置如下：

```json
{
  "routesDirectory": "./src/pages",
  "generatedRouteTree": "./src/routeTree.gen.ts",
  "routeFileIgnorePrefix": "-"
}
```

对应到 Vite 插件里也是同一套配置：

```ts
tanstackStart({
  srcDirectory: 'src',
  router: {
    generatedRouteTree: './routeTree.gen.ts',
    routeFileIgnorePrefix: '-',
    routesDirectory: './pages',
  },
})
```

这意味着：

- 所有文件路由都从 `src/pages` 生成
- `src/routeTree.gen.ts` 是自动生成文件
- `-components`、`-schema.ts`、`-queries.ts` 这类以 `-` 开头的文件或目录不会参与路由生成

### 2. 不使用 `src/features`

这个项目明确不使用 `src/features`。

原因很简单：

- 习惯就是按页面和路由目录收拢代码
- TanStack Router 天然支持路由目录下 colocate 非路由文件
- 当前目标是减少目录跳转和分散感，而不是为了抽象而抽象

所以这里的基本原则是：

- 一个页面，就是一个页面目录
- 这个页面要用到的私有组件、私有 schema、私有 query、私有表格列定义，都优先放在当前页面目录下
- 只有确认是跨页面、跨场景稳定复用的东西，才提升到全局目录

### 3. 不再单独维护 `src/layouts`

这条是当前仓库已经落地的结论。

现在的思路不是：

- `pages/route.tsx` 只选 layout
- `src/layouts/*` 里再放一层实现

而是：

- 路由分组自己的壳子，直接写在自己的 `route.tsx`
- 路由组共享的 header / footer / navigation 放在当前分组目录下

例如：

- `src/pages/_app/route.tsx` 直接是营销页壳子
- `src/pages/_app/-components/app-header.tsx`、`app-footer.tsx` 是 `_app` 组共享壳子组件
- `src/pages/_auth/route.tsx` 是 auth 路由组边界
- `src/pages/_immersive/route.tsx` 直接是 fullscreen 壳子

这样做的好处是：

- 结构更贴近路由边界
- 不需要在 `pages` 和 `layouts` 之间来回跳
- 更符合你现在这套“按路由组织壳子、按页面组织业务”的习惯

### 4. 页面私有代码默认就地共置

默认命名约定：

- `index.tsx`：页面入口
- `route.tsx`：路由组入口、壳子、守卫边界
- `-components/`：页面私有组件
- `-schema.ts`：页面私有 `zod` schema
- `-queries.ts`：页面私有 `queryOptions`
- `-form.ts`：页面私有 `TanStack Form` 配置
- `-columns.tsx`：页面私有 `TanStack Table` 列定义
- `-utils.ts`：页面私有辅助函数

注意两点：

- `-components` 可以放在页面目录下，也可以放在路由分组目录下
- 但分组级 `-components` 只放“这个分组共享的壳子组件”，不要把叶子页面私有组件堆回父级目录

正确例子：

```txt
src/pages/_app/
  -components/
    app-header.tsx
    app-footer.tsx
  home/
    index.tsx
    -components/
      studio-tool-landing.tsx
```

错误例子：

```txt
src/pages/_app/
  -components/
    home-card.tsx
    about-intro.tsx
    contact-form.tsx
```

上面这种会把多个页面的私有实现重新堆回父级目录，后面会越来越乱。

### 5. `services/` 是所有请求相关能力的归属目录

这一条不要改。

凡是和“远端通信”直接相关的内容，都应该放在 `src/services`：

- `http.ts`
- `query-client.ts`
- Axios 实例、拦截器、鉴权 header
- REST API 封装
- 后续 `tRPC client / provider / links`

所以这些内容都不应该放到 `lib/`：

- `http.ts` 不放 `lib/`
- `query-client.ts` 不放 `lib/`
- `tRPC client` 不放 `lib/`

`lib/` 只放纯工具函数。

### 6. `stores/` 只管客户端本地状态

当前约定非常明确：

- `stores/` 放本地 UI 状态、交互状态、轻量客户端状态
- 服务端数据获取、缓存、重试、失效、同步，统一交给 `TanStack Query`

也就是说：

- 页面列表数据、详情数据、用户资料这种服务端数据，不要放 `Zustand`
- 请求缓存、`isLoading`、`isFetching`、`staleTime` 这些，交给 `TanStack Query`

## 路由规则

### 1. 文件角色

当前项目里，路由相关文件的职责如下：

- `src/pages/__root.tsx`
  - 根文档结构
  - 根级 `beforeLoad`
  - 全局 `ThemeProvider`
  - Router / Query Devtools
  - 全局错误页与 404
- `src/pages/**/route.tsx`
  - 路由分组边界
  - 共享壳子
  - `beforeLoad`
  - 守卫
  - `Outlet`
- `src/pages/**/index.tsx`
  - 具体叶子页面

### 2. `_` 前缀路由组

像这些目录：

- `_app`
- `_auth`
- `_immersive`
- `_authed`
- `_admin`

它们在这里的主要作用不是做 URL 片段，而是做“路由分组边界”。

在当前项目中，这些目录主要承担：

- layout 壳子边界
- 认证守卫边界
- 权限守卫边界
- 结构分组边界

例如：

- `src/pages/_app/home/index.tsx` 的实际访问路径是 `/home`
- `src/pages/_auth/login/index.tsx` 的实际访问路径是 `/login`

### 3. `-` 前缀非路由文件

由于 `routeFileIgnorePrefix` 配置成了 `-`，所以这些都不会被当成路由文件：

- `-components/`
- `-navigation.ts`
- `-schema.ts`
- `-queries.ts`
- `-form.ts`

这是当前项目最重要的共置约定之一。

### 4. 自动生成文件

当前自动生成文件是：

- `src/routeTree.gen.ts`

规则：

- 需要时执行 `pnpm generate-routes`
- `pnpm build` 和 `pnpm typecheck` 也会自动触发生成
- 不要手改 `src/routeTree.gen.ts`

## 当前目录结构（树状注释版）

```txt
.
├─ src/
│  ├─ components/                             # 全局复用组件与 UI 组件
│  │  ├─ theme-provider.tsx                  # 主题 Provider
│  │  ├─ theme-toggle-button/                # 主题切换按钮
│  │  └─ ui/
│  │     ├─ button.tsx
│  │     ├─ input.tsx
│  │     └─ label.tsx
│  ├─ composables/                           # 组合式 hooks
│  │  └─ use-app-theme.ts                    # 主题切换 hook
│  ├─ lib/                                   # 当前推荐的纯工具目录
│  │  └─ utils.ts                            # cn: clsx + tailwind-merge
│  ├─ libs/                                  # 兼容目录，当前只做 re-export
│  │  └─ utils.ts
│  ├─ pages/                                 # TanStack 文件路由根目录
│  │  ├─ __root.tsx                          # 根文档、全局 Provider、错误页
│  │  ├─ _app/                               # 营销页/普通页面分组
│  │  │  ├─ route.tsx                        # _app 路由组壳子
│  │  │  ├─ index.tsx                        # / -> /home 重定向
│  │  │  ├─ -navigation.ts                   # _app 组共享导航配置
│  │  │  ├─ -components/
│  │  │  │  ├─ app-header.tsx                # _app 组共享 header
│  │  │  │  └─ app-footer.tsx                # _app 组共享 footer
│  │  │  ├─ home/
│  │  │  │  ├─ index.tsx                     # /home
│  │  │  │  └─ -components/
│  │  │  │     └─ studio-tool-landing.tsx    # Home 私有组件
│  │  │  ├─ features/
│  │  │  │  └─ index.tsx                     # /features
│  │  │  ├─ process/
│  │  │  │  └─ index.tsx                     # /process
│  │  │  ├─ work/
│  │  │  │  └─ index.tsx                     # /work
│  │  │  ├─ contact/
│  │  │  │  └─ index.tsx                     # /contact
│  │  │  ├─ about/
│  │  │  │  ├─ index.tsx                     # /about
│  │  │  │  └─ -schema.ts                    # About 页面私有 schema
│  │  │  ├─ custom-route/
│  │  │  │  └─ index.tsx                     # 自定义页面示例
│  │  │  ├─ unauthorized/
│  │  │  │  └─ index.tsx                     # 无权限页面
│  │  │  └─ _authed/                         # 登录守卫分组
│  │  │     ├─ route.tsx                     # requireAuth 边界
│  │  │     ├─ dashboard/
│  │  │     │  └─ index.tsx                  # 登录后页面示例
│  │  │     └─ _admin/                       # 角色守卫分组
│  │  │        ├─ route.tsx                  # requireRole(['admin']) 边界
│  │  │        └─ admin/
│  │  │           ├─ route.tsx               # admin 区域分组
│  │  │           └─ users/
│  │  │              └─ index.tsx            # /admin/users
│  │  ├─ _auth/                              # 独立认证页分组
│  │  │  ├─ route.tsx                        # auth 分组边界
│  │  │  └─ login/
│  │  │     ├─ index.tsx                     # /login，全屏登录页
│  │  │     └─ -components/
│  │  │        └─ studio-login-form.tsx      # 登录页私有组件
│  │  └─ _immersive/                         # 全屏沉浸式页面分组
│  │     ├─ route.tsx                        # fullscreen 壳子
│  │     └─ fullscreen/
│  │        └─ index.tsx                     # /fullscreen
│  ├─ routeTree.gen.ts                       # TanStack Router 自动生成
│  ├─ router.tsx                             # Router 创建与 Query 集成
│  ├─ routers/                               # 路由辅助能力
│  │  ├─ auth.ts                             # auth snapshot、角色工具
│  │  └─ guards.ts                           # requireAuth / requireRole
│  ├─ services/                              # 所有请求相关能力
│  │  ├─ api/
│  │  │  ├─ app.ts                           # 示例 server function
│  │  │  └─ index.ts
│  │  ├─ http.ts                             # Axios 实例与拦截器
│  │  ├─ query-client.ts                     # TanStack QueryClient 工厂
│  │  └─ index.ts
│  ├─ setups/                                # 启动初始化与主题初始化
│  │  ├─ index.ts
│  │  └─ theme.ts
│  ├─ stores/                                # Zustand 本地状态
│  │  ├─ app.ts
│  │  └─ index.ts
│  ├─ styles/                                # 全局样式入口与拆分样式
│  │  ├─ global.css
│  │  ├─ tailwind.css
│  │  ├─ scrollbar.css
│  │  └─ view-transition-api.css
│  └─ typings/                               # 手写类型声明
│     └─ env.d.ts
├─ components.json                           # shadcn 配置
├─ docs/                                     # 迁移/架构文档
├─ eslint.config.js                          # ESLint 配置
├─ package.json                              # 脚本与依赖
├─ tsr.config.json                           # TanStack Router 文件路由配置
├─ tsconfig.json                             # TS 项目入口
├─ vite.config.ts                            # Vite + TanStack Start 配置
└─ README.md                                 # 当前主说明文档
```

## 分层职责

### `src/pages`

这里放所有和“路由边界”直接相关的东西：

- route group
- `route.tsx`
- 叶子页面 `index.tsx`
- `beforeLoad`
- `validateSearch`
- `Outlet`
- 页面私有组件
- 页面私有 schema / query / form / table 配置

一句话：

`pages/` 负责页面和路由边界本身。

### `src/routers`

这里不再单独注册整套路由树。

当前职责是路由辅助能力：

- `auth.ts`
  - `AuthSnapshot`
  - `AppRole`
  - 当前 demo auth 解析
  - `getCurrentAuthSnapshot`
  - `hasRole` / `hasAnyRole`
- `guards.ts`
  - `requireAuth`
  - `requireRole`
  - 统一处理重定向

一句话：

`routers/` 放“路由辅助逻辑”，不是放“页面路由本身”。

### `src/services`

这里放所有请求相关能力。

当前已经有：

- `http.ts`
  - Axios 实例工厂
  - request interceptor
  - response interceptor
  - token 注入
- `query-client.ts`
  - `QueryClient` 工厂
  - 默认 `staleTime`
- `api/app.ts`
  - 示例 `createServerFn`

一句话：

`services/` 负责“怎么和远端通信”，哪怕现在还只是占位结构。

### `src/stores`

这里只放客户端状态。

当前示例：

- `stores/app.ts`
  - `appName`
  - `appDescription`
  - `demoCount`
  - 一些本地交互 action

一句话：

`stores/` 只负责客户端本地状态，不替代服务端数据层。

### `src/components`

这里放跨页面、跨场景复用的组件。

当前主要包括：

- 主题 Provider
- 主题切换按钮
- shadcn `ui` 组件

如果一个组件只是某个页面自己使用，不要急着放进这里，优先放到对应页面目录下的 `-components/`。

### `src/composables`

放 hooks。

当前示例：

- `use-app-theme.ts`

### `src/lib`

放纯工具。

当前推荐目录是：

- `src/lib`

当前仓库里还保留了：

- `src/libs/utils.ts`

它现在只是一个兼容 re-export。新代码统一优先用：

```ts
import { cn } from '@/lib/utils'
```

### `src/setups`

放应用启动时的一次性初始化逻辑。

当前主要是：

- `setupThemeAppearance`
- 首屏主题同步
- `THEME_STORAGE_KEY`
- 内联主题初始化脚本

### `src/styles`

放全局样式拆分文件：

- `global.css`
- `tailwind.css`
- `scrollbar.css`
- `view-transition-api.css`

推荐原则：

- 优先使用 Tailwind 和主题 token
- 不要轻易把页面私有样式堆进全局样式目录
- 如果样式只属于一个页面或一个组件，优先就近共置

## 当前路由分组说明

### `__root`

文件：

- `src/pages/__root.tsx`

职责：

- 根文档结构
- 全局样式挂载
- `ThemeProvider`
- Router Devtools
- React Query Devtools
- 根级 `beforeLoad`
- 获取 `auth` 上下文

### `_app`

文件：

- `src/pages/_app/route.tsx`

职责：

- 普通页面和营销页共用壳子
- 组内共享 `header` / `footer`
- 默认内容区域 `pt-[83px]`

当前放在 `_app` 里的共享文件：

- `-components/app-header.tsx`
- `-components/app-footer.tsx`
- `-navigation.ts`

### `_auth`

文件：

- `src/pages/_auth/route.tsx`
- `src/pages/_auth/login/index.tsx`

职责：

- 独立 auth 分组
- 认证页面不继承 `_app` 的营销页壳子
- 登录页是独立全屏页面

### `_immersive`

文件：

- `src/pages/_immersive/route.tsx`

职责：

- fullscreen / immersive 路由组
- 自带独立背景和全屏容器

### `_authed`

文件：

- `src/pages/_app/_authed/route.tsx`

职责：

- 登录守卫边界
- `beforeLoad` 里调用 `requireAuth`

### `_admin`

文件：

- `src/pages/_app/_authed/_admin/route.tsx`

职责：

- 角色守卫边界
- `beforeLoad` 里调用 `requireRole(['admin'])`

## 路由守卫与 Auth 上下文

当前 auth 流程如下：

1. `src/router.tsx` 创建 `QueryClient`，并把 `auth` 与 `queryClient` 放进 Router context。
2. `src/pages/__root.tsx` 的 `beforeLoad` 调用 `getCurrentAuthSnapshot()`，解析当前 auth snapshot。
3. `_authed/route.tsx` 在 `beforeLoad` 里调用 `requireAuth()`。
4. `_admin/route.tsx` 在 `beforeLoad` 里调用 `requireRole(['admin'])`。

当前重定向规则：

- 未登录时跳转 `/login`
- 角色不满足时跳转 `/unauthorized`
- 都会带上 `search.redirect`，保存用户原始目标地址

这也是为什么：

- header 里的 `Login` 按钮会带 `search.redirect`
- `/login` 页面会读取 redirect 参数

## `Axios` 和 `TanStack Query` 的分工

这两个不是重复关系，而是上下层关系。

### `Axios` 负责什么

`Axios` 是请求客户端，负责：

- 发起 HTTP 请求
- 统一 `baseURL`
- 注入 token
- 统一 request / response 拦截器
- 统一错误格式

当前实现就在：

- `src/services/http.ts`

### `TanStack Query` 负责什么

`TanStack Query` 不负责“怎么发请求”，它负责“怎么管理服务端数据状态”：

- 缓存
- 重试
- 去重
- 失效
- 重新获取
- loading / fetching 状态
- SSR / Router 集成

当前实现就在：

- `src/services/query-client.ts`
- `src/router.tsx`

### 当前项目里应该怎么放

推荐组合方式：

- `services/http.ts`：Axios 实例
- `services/api/*.ts`：具体接口函数或 server function
- `services/query-client.ts`：QueryClient
- 页面目录下的 `-queries.ts`：当前页面私有的 `queryOptions`

一句话：

- `Axios` 解决“请求怎么发”
- `TanStack Query` 解决“服务端数据怎么管”

## 状态管理约定

当前状态分层建议如下：

- 远端数据：`TanStack Query`
- 本地 UI 状态：`Zustand`
- 路由权限：`routers/auth.ts + guards.ts`
- 主题状态：`ThemeProvider + useAppTheme`

不要把下面这些混在一起：

- 用 `Zustand` 当服务端缓存
- 用 `lib/` 放请求客户端
- 用页面父级 `-components` 存叶子页面私有组件

## 主题与样式约定

当前主题系统主要由这些文件组成：

- `src/components/theme-provider.tsx`
- `src/composables/use-app-theme.ts`
- `src/setups/theme.ts`

当前样式入口：

- `src/styles/global.css`
  - 统一引入 `tailwind.css`
  - 统一引入 `view-transition-api.css`
  - 统一引入 `scrollbar.css`

补充说明：

- 根文档会通过内联脚本先同步主题，避免首屏闪烁
- 当前主题 Provider 支持 `light / dark / system`
- `useAppTheme()` 提供 `toggleTheme()`
- 键盘按 `d` 可以在明暗主题之间切换

## 新增页面时的推荐写法

### 1. 新增一个普通营销页

比如新增 `/pricing`：

```txt
src/pages/_app/pricing/
  index.tsx
  -components/
    pricing-hero.tsx
    pricing-faq.tsx
  -schema.ts
```

这里不需要额外写 `route.tsx`，因为它已经处在 `_app` 壳子下。

### 2. 新增一个独立 auth 页

比如新增 `/register`：

```txt
src/pages/_auth/register/
  index.tsx
  -components/
    register-form.tsx
```

这样它天然和 `/login` 一样，不会走 `_app` 的 header / footer。

### 3. 新增一个需要登录的页面

比如新增 `/dashboard/projects`：

```txt
src/pages/_app/_authed/dashboard/projects/
  index.tsx
  -components/
    project-list.tsx
  -queries.ts
```

这样页面天然处在 `requireAuth` 保护下。

### 4. 新增一个需要管理员权限的页面

比如新增 `/admin/roles`：

```txt
src/pages/_app/_authed/_admin/admin/roles/
  index.tsx
  -components/
    role-table.tsx
  -queries.ts
```

这样页面天然处在：

- `_authed`
- `_admin`

两层守卫下面。

## 环境变量

当前项目里已经用到的环境变量：

- `VITE_APP_TITLE`
  - 浏览器标题
- `VITE_API_BASE_URL`
  - Axios `baseURL`
- `VITE_BASE_URL`
  - 预留类型声明

当前在：

- `src/typings/env.d.ts`

## 常用命令

```bash
pnpm install
pnpm dev
pnpm generate-routes
pnpm typecheck
pnpm lint
pnpm format
pnpm build
pnpm start
```

补充说明：

- `pnpm dev`：本地开发
- `pnpm generate-routes`：重新生成 `src/routeTree.gen.ts`
- `pnpm typecheck`：生成路由树后执行 TS 检查
- `pnpm build`：生成路由树、构建客户端/服务端并执行 TS 编译
- `pnpm start`：运行 `.output/server/index.mjs`

## 当前项目里不要做的事情

- 不要重新引入 `src/features`
- 不要再新建 `src/layouts`
- 不要把 `http.ts`、`query-client.ts` 挪到 `lib/`
- 不要手改 `src/routeTree.gen.ts`
- 不要把多个页面的私有组件重新堆回父级 `-components`
- 不要用 `Zustand` 替代 `TanStack Query`

## 一句话总结

当前这套 Starter 的核心思路就是：

- 用 `src/pages` 管路由
- 用路由分组自己的 `route.tsx` 管壳子和守卫
- 用页面目录就近收拢私有实现
- 用 `services/` 管请求和服务端数据基础设施
- 用 `stores/` 管客户端本地状态

这样目录不会散，路由边界也很清晰，后面继续加 `query`、`form`、`table`、`auth`、`tRPC` 都有稳定落点。
