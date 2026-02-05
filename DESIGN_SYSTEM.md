# Northfile Design System

## Color Palette

### Primary Colors
- **Blue 600**: `#2563eb` - Primary actions, links
- **Blue 700**: `#1d4ed8` - Hover states
- **Blue 50**: `#eff6ff` - Light backgrounds
- **Blue 100**: `#dbeafe` - Subtle highlights

### Semantic Colors
- **Green 500**: `#22c55e` - Success, verified, complete
- **Yellow 400**: `#facc15` - Warning, pending review
- **Orange 500**: `#f97316` - Attention needed
- **Red 500**: `#ef4444` - Error, critical
- **Purple 600**: `#9333ea` - AI features, smart actions

### Neutral Colors
- **Slate 900**: `#0f172a` - Primary text
- **Slate 700**: `#334155` - Secondary text
- **Slate 600**: `#475569` - Tertiary text
- **Slate 400**: `#94a3b8` - Disabled text
- **Slate 200**: `#e2e8f0` - Borders
- **Slate 100**: `#f1f5f9` - Light backgrounds
- **Slate 50**: `#f8fafc` - Page backgrounds
- **White**: `#ffffff` - Cards, modals

## Typography

### Font Family
- **Primary**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- **Monospace**: `"Fira Code", "Courier New", monospace` (for amounts, codes)

### Font Sizes
- **xs**: `0.75rem` (12px) - Labels, captions
- **sm**: `0.875rem` (14px) - Body text, secondary
- **base**: `1rem` (16px) - Body text, primary
- **lg**: `1.125rem` (18px) - Subheadings
- **xl**: `1.25rem` (20px) - Card titles
- **2xl**: `1.5rem` (24px) - Section headings
- **3xl**: `1.875rem` (30px) - Page titles
- **4xl**: `2.25rem` (36px) - Hero text

### Font Weights
- **Light**: 300 - Large headings
- **Normal**: 400 - Body text
- **Medium**: 500 - Emphasis
- **Semibold**: 600 - Headings, buttons
- **Bold**: 700 - Strong emphasis

## Spacing Scale
- **0**: 0
- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **3**: 0.75rem (12px)
- **4**: 1rem (16px)
- **5**: 1.25rem (20px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **10**: 2.5rem (40px)
- **12**: 3rem (48px)
- **16**: 4rem (64px)

## Border Radius
- **sm**: 0.375rem (6px) - Small elements
- **md**: 0.5rem (8px) - Buttons, inputs
- **lg**: 0.75rem (12px) - Cards
- **xl**: 1rem (16px) - Large cards
- **2xl**: 1.5rem (24px) - Modals
- **full**: 9999px - Pills, avatars

## Shadows
- **sm**: `0 1px 2px 0 rgb(0 0 0 / 0.05)`
- **md**: `0 4px 6px -1px rgb(0 0 0 / 0.1)`
- **lg**: `0 10px 15px -3px rgb(0 0 0 / 0.1)`
- **xl**: `0 20px 25px -5px rgb(0 0 0 / 0.1)`

## Component Patterns

### Buttons
- **Primary**: Blue background, white text, shadow
- **Secondary**: White background, slate border, slate text
- **Danger**: Red background, white text
- **Ghost**: Transparent background, hover state

### Input Fields
- **Default**: White background, slate border, focus:blue border
- **Error**: Red border, red text
- **Success**: Green border, green icon
- **Disabled**: Slate background, slate text

### Cards
- **Default**: White background, slate border, rounded-lg
- **Hover**: Shadow transition, subtle scale
- **Selected**: Blue border, blue background tint

### Badges
- **Success**: Green background, green text
- **Warning**: Yellow background, yellow text
- **Error**: Red background, red text
- **Info**: Blue background, blue text
- **AI**: Purple background, purple text

### Status Indicators
- **Complete**: Green checkmark
- **Pending**: Yellow clock
- **Error**: Red X
- **AI Processing**: Purple sparkle icon

## Layout Grid
- **Max Width**: 1280px (max-w-7xl)
- **Padding**: 1.5rem (24px) on mobile, 2rem (32px) on desktop
- **Columns**: 12-column grid system
- **Gaps**: 1rem (16px) mobile, 1.5rem (24px) desktop

## Iconography
- **Library**: Lucide React
- **Size**: 16px (sm), 20px (md), 24px (lg)
- **Stroke Width**: 2px
- **Color**: Inherit from parent or semantic color
