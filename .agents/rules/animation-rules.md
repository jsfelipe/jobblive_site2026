---
trigger: always_on
---


---

# animation-rules.md

```md id="8pr5vx"
# Performance Animation Rules

## Objective

Animations must improve:

- Perceived quality
- User experience
- Visual hierarchy
- Feedback
- Smoothness

Animations should NEVER harm performance.

---

# Core Principles

Always prioritize:

1. Performance
2. Subtlety
3. Clarity
4. Smoothness

---

# Preferred Animation Types

Prefer GPU-accelerated properties:

- transform
- opacity
- filter

---

# Avoid Animating

Never animate:

- width
- height
- top
- left
- margin
- padding

These cause layout recalculation.

---

# Animation Strategy

## Priority Order

1. CSS transitions
2. CSS keyframes
3. Scroll-driven animations
4. Framer Motion (only if necessary)

---

# Preferred Effects

Use subtle motion:

- fade
- translate
- scale
- blur
- stagger
- reveal

---

# Duration Rules

## Recommended durations:

```txt id="fj3vke"
150ms
200ms
300ms
500ms