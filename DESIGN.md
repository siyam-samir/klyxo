# KLYXO Design System

## Visual Direction
Luxury cinematic maximalism. Premium, memorable, bold. Ultra-dark substrate with golden highlights and dark red ambient glow.

## Palette (OKLCH)
| Token | Value | Usage |
|-------|-------|-------|
| Background | 0.05 0 0 | Ultra-dark #050505 base |
| Foreground | 0.88 0 0 | Primary text, ~#ddd |
| Primary (Gold) | 0.67 0.15 90 | #E2B159 buttons, accents, glow |
| Secondary (Dark) | 0.12 0 0 | Card backgrounds |
| Muted | 0.12 0 0 | Disabled, secondary UI |
| Accent (Red) | 0.35 0.12 10 | Dark red cinema glow |

## Typography
| Layer | Font | Usage |
|-------|------|-------|
| Display/Logo | Cinzel Decorative | KLYXO branding, main titles |
| Body | DM Sans | Body text, descriptions |
| Headers | Pacifico | Section headers (groovy script style) |
| Hero Stencil | Oswald + letter-spacing: 0.15em | Movie titles in hero section |
| Ratings | Rubik Dirt | Star ratings, distressed style |
| Metadata | Share Tech Mono | WEB-DL, runtime, technical labels |

## Elevation & Depth
- **Glow Shadows**: Golden glow `0 0 15px rgba(226,177,89,0.3)` on hover/focus
- **Hero Ambient**: Dark red radial gradient `radial-gradient(ellipse, rgba(80,0,0,0.4) 0%, transparent 70%)` behind featured content
- **Founder Photo**: 2px solid gold border + `0 0 12px rgba(226,177,89,0.5)` glow
- **Cards**: Borderless with poster images, smooth scale transform on hover

## Structural Zones
| Zone | Background | Border | Treatment |
|------|-----------|--------|-----------|
| Header | 0.08 0 0 | 0.15 0 0 | Founder photo + KLYXO logo |
| Hero | 0.05 0 0 + red glow | None | Featured movie with stencil title + CTA |
| Content Cards | 0.08 0 0 | None | Borderless, poster-driven, hover scale |
| Navigation (Mobile) | 0.08 0 0 | 0.15 0 0 | 60px bottom bar, 5 icons |
| Sidebar (Desktop/TV) | 0.08 0 0 | 0.15 0 0 | Left-fixed 280px (mobile), 320px (TV) |

## Responsive Breakpoints
- **Mobile**: Single column, 60vh hero, 160px wide cards, 60px bottom nav
- **Tablet (md 768px)**: 2–3 column grids, sidebar appears inline
- **Desktop (lg 1024px)**: Fixed 280px sidebar, 4–6 column grids, 1024px content max-width
- **TV (2xl 1536px+)**: Fixed 320px sidebar, large typography, min 44px touch targets

## Component Patterns
- **Movie Cards**: Image + overlay on hover (genre tags, rating, title)
- **Buttons**: Golden background, dark text, golden glow on hover, 12px padding (mobile), 16px (desktop)
- **Focus States**: TV: `outline 2px solid #E2B159; outline-offset: 2px`
- **Links**: Gold underline, hover glow

## Motion & Animation
- **Default Transition**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` (smooth easing)
- **Card Hover**: Scale 1 → 1.05 over 0.3s
- **Fade In**: 0.4s ease-out for page load and modals
- **Hero Autoplay**: Subtle fade between backdrop images, ~5s interval

## Spacing & Rhythm
- **Base Unit**: 8px grid
- **Mobile**: 16px outer padding, 12px inner gaps
- **Desktop**: 24px outer padding, 16px grid gaps
- **TV**: 32px outer padding, 20px grid gaps

## Signature Detail
Founder identity card: circular photo with golden border + glow, name "Alvee Noor Siyam", title "Frontend Engineer" as link, social icons (WhatsApp, Facebook, LinkedIn, Portfolio) in header. Accessible on all screen sizes.
