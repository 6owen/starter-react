# TanStack Start 目标架构规范

这份文档定义当前项目迁移到 `TanStack Start + TanStack Router + TanStack Query` 后的目录与分层约定。

这是一份目标规范，不是对当前仓库现状的描述。

## 目标

- 路由壳子按 `TanStack Router` 组织
- 页面私有代码尽量和路由目录放在一起
- 不引入 `features/` 这类通用业务目录
- 所有请求相关能力继续归属 `services/`
- 目录不要分散，优先就近收拢

## 最终结论

### 1. 路由根目录使用 `src/pages`

虽然 TanStack 官方默认目录名是 `src/routes`，但本项目统一使用 `src/pages`。

- 目录名沿用现有习惯
- 路由能力仍然完全按 `TanStack Router` 规则工作
- 后续通过 `tsr.config.json` 或 TanStack Start 插件配置把路由目录指向 `src/pages`

推荐配置：

```json
{
  "routesDirectory": "./src/pages",
  "generatedRouteTree": "./src/routeTree.gen.ts",
  "routeFileIgnorePrefix": "-"
}
```

### 2. 不使用 `features/`

本项目明确不建立 `src/features`。

原因很简单：

- 你当前的开发习惯就是按页面和路由目录收拢代码
- TanStack Router 支持在路由目录下 colocate 非路由文件
- 当前项目目标是减少跳转和分散感，而不是追求抽象上的“领域模块化”

以后如果有用户页、订单页、设置页，它们的私有组件、查询定义、表单定义、表格列定义，都优先跟着各自路由目录走。

补充约束：

- 叶子页面优先使用目录形式，而不是直接写成 `about.tsx`
- 推荐写法是 `pages/.../xxx/index.tsx`
- 这个页面自己的私有文件继续放在同目录下的 `-components`、`-queries.ts`、`-schema.ts` 等
- 不要把多个页面的私有实现堆回父级目录，比如不要放在 `pages/_app/-components`

### 2.1 layout 实现和 route 文件分开

这一条现在恢复明确约定：

- `src/pages/**/route.tsx` 只负责 TanStack 路由入口和 layout 选择
- 真正的 layout 实现放 `src/layouts/<layout-name>/`
- 一个 layout 一个目录
- layout 自己的 `header`、`footer`、`sidebar` 等放在该 layout 目录下的 `components/`

推荐模式：

```txt
src/layouts/
  studio-tool/
    index.tsx
    components/
      studio-tool-header.tsx
      studio-tool-footer.tsx
```

对应 route 文件保持很薄：

```txt
src/pages/_app/route.tsx
```

这里的职责边界是：

- `pages/` 决定“这个路由组用哪个 layout”
- `layouts/` 负责“这个 layout 本身怎么渲染”

### 3. 页面私有文件和路由目录放在一起

页面相关代码统一放在对应路由目录下，不提前抽到全局目录。

推荐命名：

- `-components/`：页面私有组件
- `-queries.ts`：页面私有 `queryOptions`
- `-schema.ts`：页面私有 `zod` schema
- `-form.ts`：页面私有 `TanStack Form` 配置
- `-columns.tsx`：页面私有 `TanStack Table` 列定义
- `-utils.ts`：页面私有辅助函数

这里使用 `-` 前缀，是为了让 TanStack Router 的文件路由生成器忽略这些非路由文件。

例如：

```txt
src/pages/_app/home/
  index.tsx
  -components/
    hero-card.tsx
    stat-card.tsx
  -queries.ts
  -schema.ts
```

### 4. `services/` 继续作为所有请求相关内容的归属目录

这一条明确保留，不改。

`services/` 的职责包括：

- `http.ts`
- 请求 client、拦截器、鉴权 header
- `query-client.ts`
- `tRPC` client / provider / link 配置
- REST API 封装
- 与远端通信直接相关的类型适配

也就是说：

- `http.ts` 不放 `lib/`
- `query-client.ts` 不放 `lib/`
- `tRPC client` 不放 `lib/`

`lib/` 只放纯工具，不放请求体系。

## 目录规范

推荐目录：

```txt
src/
  pages/
    __root.tsx
    _app/
      route.tsx
      index.tsx
      home/
        index.tsx
        -components/
          feature-card.tsx
          store-metric-card.tsx
        -queries.ts
      about/
        index.tsx
        -schema.ts
      custom-route/
        index.tsx
      login/
        index.tsx
      unauthorized/
        index.tsx
      users/
        route.tsx
        index.tsx
        $userId.tsx
        -components/
          user-table.tsx
          user-filters.tsx
          user-form.tsx
        -queries.ts
        -schema.ts
        -form.ts
        -columns.tsx
      settings/
        route.tsx
        profile.tsx
        security.tsx
        -components/
  layouts/
    studio-tool/
      index.tsx
      navigation.ts
      components/
        studio-tool-header.tsx
        studio-tool-footer.tsx
    immersive/
      index.tsx
  services/
    http.ts
    query-client.ts
    api/
      app.ts
      user.ts
      auth.ts
    trpc/
      client.ts
      provider.tsx
  components/
    ui/
  composables/
  routers/
    auth.ts
    guards.ts
  setups/
  stores/
    ui.ts
    auth.ts
  styles/
  typings/
  lib/
    utils.ts
```

## 分层职责

### `pages/`

放所有与路由直接相关的代码：

- route file
- layout route
- `loader`
- `beforeLoad`
- `validateSearch`
- error boundary
- not found
- 页面私有组件和页面私有 schema/query/form/table 定义

一句话：`pages/` 负责页面壳子和页面就近逻辑。

补充：

- route 文件可以组合 `Outlet`
- route 文件可以导入 `src/layouts/*`
- 但不建议把完整 header/footer/mobile nav 逻辑长期堆在 `route.tsx` 里

### `layouts/`

放可复用或明确命名的布局实现。

适合放：

- marketing layout
- app layout
- dashboard layout
- immersive/fullscreen layout
- 这些 layout 的 header/footer/sidebar/nav 组件

推荐约定：

- 一个 layout 一个目录
- layout 入口文件统一用 `index.tsx`
- layout 私有组件放 `components/`

一句话：`layouts/` 负责“壳子怎么长什么样”，`pages/` 负责“哪个路由组使用哪个壳子”。

### `routers/`

放路由辅助能力，但不再负责单独注册路由树。

适合放：

- `guards.ts`
- `auth.ts`
- 权限判断 helper
- redirect helper

不适合再放：

- 旧 `react-router-dom` 风格的集中式 routes 注册
- 独立于文件路由系统之外的路由装配层

一句话：`routers/` 继续保留，但它现在是 guard/helper 层，不是 route tree 层。

### `services/`

放所有与远端请求直接相关的代码：

- 请求 client
- 请求基础配置
- REST API 封装
- tRPC client
- QueryClient

一句话：`services/` 负责“怎么请求数据”。

### `stores/`

只放客户端状态，不放服务端数据。

适合放：

- 主题
- sidebar 展开状态
- modal 开关
- 登录态快照

不适合放：

- 列表数据
- 详情数据
- 服务端分页结果

这些由 `TanStack Query` 负责。

### `lib/`

只放纯工具：

- `cn`
- 日期工具
- URL 处理
- 字符串处理
- 与请求体系无关的纯函数

## REST / Axios 方案

如果使用 REST 或 Axios，请按下面方式拆分：

- `src/services/http.ts`：axios/fetch client
- `src/services/api/*.ts`：远端接口封装
- `src/pages/**/-queries.ts`：页面使用的 `queryOptions`

职责边界：

- `services/api/user.ts` 只负责请求用户相关接口
- `pages/_app/users/-queries.ts` 只负责这个页面需要的 query key、query options、页面级预取逻辑

不要把页面特有的 query key 全塞进 `services/api/*.ts`。

## tRPC 方案

如果后面接入 `tRPC`，目录仍然不变，只是在 `services/` 下增加 `trpc/`：

```txt
src/services/
  query-client.ts
  trpc/
    client.ts
    provider.tsx
```

推荐职责：

- `services/trpc/client.ts`：`createTRPCContext`、`useTRPC`、client/link 初始化
- `services/trpc/provider.tsx`：把 `TRPCProvider` 和 `QueryClientProvider` 包起来
- `services/query-client.ts`：创建和复用 `QueryClient`

页面层仍然就近放自己的查询与表单逻辑：

- `pages/**/-queries.ts`
- `pages/**/-form.ts`
- `pages/**/-schema.ts`

也就是说，接入 `tRPC` 后仍然不引入 `features/`。

## Query 约定

统一原则：

- 请求 client 在 `services/`
- `QueryClient` 在 `services/`
- 页面专属的 `queryOptions` 放在当前页面目录

推荐模式：

```txt
pages/_app/users/
  index.tsx
  -queries.ts
```

其中：

- `index.tsx` 负责页面渲染
- `-queries.ts` 负责该页面的 `queryOptions`
- `loader` 中使用 `context.queryClient.ensureQueryData(...)`

## Form 约定

`TanStack Form` 默认也采用页面就近策略。

推荐模式：

```txt
pages/_app/users/
  index.tsx
  -form.ts
  -schema.ts
  -components/
```

其中：

- `-schema.ts`：`zod` schema
- `-form.ts`：`useForm` 配置或表单工厂
- `-components/`：页面专属表单组件

## Table 约定

`TanStack Table` 是页面状态模型，不是全局 store。

推荐模式：

```txt
pages/_app/users/
  index.tsx
  -columns.tsx
  -components/
```

其中：

- `-columns.tsx` 放列定义
- 表格 UI 组件优先放页面目录下
- 只有多个页面都稳定复用的表格壳组件，才提升到 `components/`

## 状态管理约定

本项目以后默认采用下面的状态边界：

- 路由状态：`TanStack Router`
- 服务端数据：`TanStack Query`
- 表单状态：`TanStack Form`
- 表格状态：`TanStack Table`
- 纯客户端 UI 状态：`Zustand`

不要再额外创建“路由快照 store”去重复维护当前路由信息。

## 需要和 TanStack 保持一致的部分

下面这些不是“个人习惯”问题，而是建议尽量不要逆着 TanStack 走。

### 1. 路由文件命名规则

虽然路由根目录我们改成 `src/pages`，但路由文件规则仍然保持 TanStack Router 的心智：

- `__root.tsx`：根路由
- `route.tsx`：目录壳子路由
- `index.tsx`：索引页
- `$userId.tsx`：动态参数路由
- `_app/`：pathless layout route
- `-components/`、`-queries.ts` 这类 `-` 前缀文件：非路由文件

也就是说，只改目录名，不改路由语义。

### 2. 路由守卫要用 `beforeLoad`

以后不要再单独维护一层类似旧 `routers/guard.tsx` 的自定义运行时守卫体系。

推荐：

- 鉴权
- 权限
- 首屏依赖准备
- route context 注入

统一走：

- `beforeLoad`
- pathless layout route
- `Route.useRouteContext()`

### 3. 页面数据预取要走 `loader + Query`

推荐保持 TanStack 官方组合方式：

- `loader` 负责预取
- 页面组件里用 `useSuspenseQuery` 或 `useQuery`
- `QueryClient` 通过 router context 注入

标准心智是：

- `loader` 中 `ensureQueryData(...)`
- 组件中消费同一个 `queryOptions`

不要回到“页面 `useEffect` 里手写请求，再塞全局 store”的旧模式。

### 4. URL 状态优先放 search params

这点非常重要。

下面这些状态，优先和 URL 同步，而不是先丢进 Zustand：

- 分页
- 排序
- 筛选条件
- tab
- 视图模式

推荐走：

- `validateSearch`
- `Route.useSearch()`
- `navigate({ search })`

不要把这类可分享、可恢复的页面状态只保存在本地 store。

### 5. 服务端数据不要进 Zustand

这条和 TanStack Query 的边界要保持一致：

- 服务端列表
- 详情
- 远端统计
- 远端分页结果

都归 `TanStack Query`。

`Zustand` 只保留本地 UI 状态和少量客户端状态。

### 6. 根路由文档结构要用 Start 的方式

如果启用 TanStack Start，不要再沿用纯 Vite SPA 的根挂载思路。

根路由里要按 Start 的方式组织：

- `<html>`
- `<head>`
- `<HeadContent />`
- `<body>`
- `<Scripts />`

也就是说，`__root.tsx` 会成为真正的应用文档壳子，而不是简单的 React 页面容器。

### 7. SSR 安全边界要收紧

你现在仓库里有不少直接用 `window`、`localStorage`、`sessionStorage` 的写法。

如果启用 TanStack Start 的 SSR / loader / server 能力，需要统一改成 SSR-safe：

- 浏览器对象只在 client 侧访问
- 初始化逻辑尽量放 effect 或受控的 client provider
- 认证、首屏依赖、预取逻辑优先走 `beforeLoad`、`loader`、server function

否则迁移后最容易踩的就是 hydration 和 server runtime 报错。

### 8. 错误页和 404 要挂在路由体系里

不要额外维护一套脱离 Router 的错误兜底页体系。

推荐统一使用：

- `errorComponent`
- `notFoundComponent`

这样 search params 校验错误、loader 错误、普通运行时路由错误，都会落在同一套机制下。

### 9. QueryClient 要作为基础设施注入

`QueryClient` 虽然放在 `services/query-client.ts`，但使用方式要保持 TanStack 的标准姿势：

- 单独创建 `QueryClient`
- 在 root provider 注入
- 通过 router context 传给 route loader

不要让各页面各自 new 一个 `QueryClient`。

### 10. 如果接入 tRPC，也继续走 TanStack Query 模式

tRPC 接进来以后，也不要绕过 Query 单独搞一套数据流。

推荐方式：

- `services/trpc/client.ts` 提供 `useTRPC`
- 页面里继续生成 `queryOptions` / `mutationOptions`
- loader 里继续预取
- 页面里继续 `useQuery` / `useMutation`

也就是说，tRPC 只是“请求来源和类型系统”变了，不改变 Router + Query 的主干。

## 命名约定

推荐坚持下面这套：

- 路由目录：`src/pages`
- 根路由：`__root.tsx`
- pathless layout：`_app/route.tsx`
- 页面入口：`index.tsx`
- 动态路由：`$userId.tsx`
- 页面私有目录：`-components/`
- 页面私有文件：`-queries.ts`、`-schema.ts`、`-form.ts`、`-columns.tsx`

## 迁移时要删除的旧分层

迁移到 TanStack Start 后，当前这几层不再保留：

- `src/pages/**/page.tsx` 这种旧入口约定
- `src/routers` 里旧 `react-router-dom` 风格的集中路由注册代码
- 通过 `react-router-dom + vite-plugin-pages` 组装路由的旧方式

要保留的有：

- `src/layouts`
- `src/layouts/<layout-name>/components`
- `src/routers/auth.ts`
- `src/routers/guards.ts`
- 其他只负责权限判断、redirect helper、auth 上下文解析的辅助文件

这些辅助能力继续存在，但不再承担 route tree 注册职责。

## 一句话版本

最终原则只有两句：

- 页面相关内容，尽量跟着页面目录走，不要分散。
- 所有请求相关内容，统一放 `services/`，不要塞进 `lib/`。
