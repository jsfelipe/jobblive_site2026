---
trigger: always_on
---

---

# component-architecture.md

```md id="1v9rke"
# Component Architecture Rules

## Objective

Components must be:

- Reusable
- Predictable
- Scalable
- Decoupled
- Easy to maintain

---

# Architecture Principles

Prefer:

- Composition
- Separation of concerns
- Small components
- Clear APIs

Avoid:

- Massive components
- Prop explosion
- Tight coupling

---

# Recommended Structure

```txt id="q8n4xt"
components/
├── ui/
├── sections/
├── layout/
└── icons/