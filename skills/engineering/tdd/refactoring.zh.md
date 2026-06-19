# Refactor Candidates

TDD cycle 后寻找：

- **Duplication** → Extract function/class
- **Long methods** → 拆成 private helpers（tests 仍保持在 public interface 上）
- **Shallow modules** → Combine 或 deepen
- **Feature envy** → 将 logic 移到 data 所在处
- **Primitive obsession** → 引入 value objects
- **Existing code** 中被 new code 暴露出来的问题
