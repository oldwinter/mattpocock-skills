# Deepening

在已知 dependencies 的情况下，如何安全 deepen 一组 shallow modules。假设使用 `/codebase-design` 中的 vocabulary：**module**、**interface**、**seam**、**adapter**。

## Dependency categories

评估 deepening candidate 时，对其 dependencies 进行分类。Category 决定 deepened module 如何跨 seam 被测试。

### 1. In-process

Pure computation、in-memory state、无 I/O。Always deepenable：merge modules，并直接通过 new interface test。无需 adapter。

### 2. Local-substitutable

拥有 local test stand-ins 的 dependencies（Postgres 用 PGLite、in-memory filesystem）。如果 stand-in 存在，就 deepenable。Deepened module 在 test suite 中配合 stand-in 运行测试。Seam 是 internal；module 的 external interface 上没有 port。

### 3. Remote but owned (Ports & Adapters)

你自己的跨 network boundary services（microservices、internal APIs）。在 seam 处定义一个 **port**（interface）。Deep module owns logic；transport 作为 **adapter** 注入。Tests 使用 in-memory adapter。Production 使用 HTTP/gRPC/queue adapter。

Recommendation shape: *“Define a port at the seam, implement an HTTP adapter for production and an in-memory adapter for testing, so the logic sits in one deep module even though it's deployed across a network.”*

### 4. True external (Mock)

你不 control 的 third-party services（Stripe、Twilio 等）。Deepened module 将 external dependency 作为 injected port；tests 提供 mock adapter。

## Seam discipline

- **One adapter means a hypothetical seam. Two adapters means a real one.** 除非至少两个 adapters justified（通常 production + test），否则不要引入 port。Single-adapter seam 只是 indirection。
- **Internal seams vs external seams.** Deep module 可以有 internal seams（implementation 私有，供自身 tests 使用），也可以有 interface 处的 external seam。不要因为 tests 使用 internal seams，就把它们暴露到 interface 上。

## Testing strategy: replace, don't layer

- 一旦 deepened module interface 上已有 tests，old unit tests on shallow modules 就成为 waste；delete them。
- 在 deepened module 的 interface 上写 new tests。**Interface is the test surface**。
- Tests 通过 interface assert observable outcomes，而不是 internal state。
- Tests 应 survive internal refactors；它们描述 behaviour，而不是 implementation。如果 implementation 变化时 test 必须改变，那它在 testing past the interface。
