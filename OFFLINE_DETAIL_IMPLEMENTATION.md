# Offline Store Detail Page Implementation

## Overview
Successfully implemented the `/offline-store/detail` page based on the Figma design (node-id: 741-5567).

## Implementation Details

### Page Location
- **Route**: `/offline-store/detail`
- **File**: `src/app/offline-store/detail/page.tsx`

### Design Specifications Implemented

#### 1. **Header (Fixed Navigation)**
- Height: `49px`
- Fixed position with backdrop blur
- Background: `rgba(255,255,255,0.95)`
- Border bottom: `rgba(0,0,0,0.05)`
- Max-width: `1440px` (centered)
- Layout:
  - Left: Shop, Offline Store links (spacing: `24px`)
  - Center: BYREDO logo (`80px` width)
  - Right: MYPAGE, LOGIN, JOIN links (spacing: `24px`)
- Font: `Sk-Modernist` 11px, tracking `2.2px`, uppercase
- Line height: `16.5px`
- Hover effects: opacity transition

#### 2. **Hero Section**
- Large title: "LE BON MARCHE"
  - Font: `Sk-Modernist Bold`
  - Size: Responsive `clamp(60px, 12vw, 179px)`
  - Line height: `none` (tight)
  - Uppercase, no extra letter-spacing beyond global
  - Top margin: `88.5px` from header

#### 3. **Description Text**
- Top margin: `165.5px` from title
- Font: `Sk-Modernist Regular`
- Size: Responsive `clamp(14px, 1.4vw, 20px)`
- Max-width: `633px`
- Line height: `1.5`
- Uppercase

#### 4. **Gray Placeholder Image**
- Desktop only (hidden on mobile/tablet)
- Position: Absolute right side
- Background: `#e9e9e9`
- Height: `683px`
- Width: `calc(50% - 15px)`
- Top: `481px`

#### 5. **Store Address Section**
- Top margin: `178px` (mobile), `637px` (desktop)
- "STORE ADRESS" label
  - Font: `Sk-Modernist Regular` 16px
  - Line height: `1.5`
- "COPY ADDRESS" button
  - Background: `#f5f5f5`
  - Hover: `#e5e5e5`
  - Padding: `10px`
  - Position: `calc(33.33% + 87px)` from left
  - Interactive: copies address to clipboard, shows "COPIED!" feedback
- Address display: "581 Valentina Forge South Xzavierborough"

#### 6. **Image Gallery**
- Top margin: `106px`
- Two-column layout (desktop), stacked (mobile)
- **Left Image**:
  - Width: `calc(58.33% - 4px)` (desktop), `100%` (mobile)
  - Height: `865px` (desktop), `500px` (mobile)
  - Background placeholder: `#e9e9e9`
  - Image: `/figma/1c0f415909d84a88c2d6c966e7a021ea8e33e445.png`
- **Right Image**:
  - Width: `calc(41.67% - 4px)` (desktop), `100%` (mobile)
  - Height: `536px` (desktop), `400px` (mobile)
  - Background placeholder: `#e9e9e9`
  - Image: `/figma/00cd31a34451d5e20090a0d1366f5dc6337efab9.png`
  - Margin-left: `8px` (desktop only)
- **Image Metadata**:
  - Title: "PHOTO TITLE"
    - Font: `Sk-Modernist Bold` 18px
    - Tracking: `1px`
    - Line height: `16.5px`
    - Top margin: `24px`
  - Description: Two-line placeholder
    - Font: `Sk-Modernist Regular` 12px
    - Tracking: `1px`
    - Line height: `16.5px`
    - Top margin: `41px`

#### 7. **Other Stores List (Accordion)**
- Top margin: `110px`
- Padding: `35px` horizontal
- 5 store items (sample data)
- Each item:
  - Divider line: `1px` black border
  - Spacing: `28px` between items
  - Layout:
    - **Left**: Store info
      - City: `Sk-Modernist Regular` 12px, `rgba(0,0,0,0.7)`
      - Name: `Sk-Modernist Bold` 22px, black
      - Gap: `16px` between city and name
    - **Right**: "+" icon
      - Font: `Sk-Modernist Bold` 22px
      - Rotates 45° when expanded
  - Interactive:
    - Hover: opacity transition
    - Click: expands to show details
    - Smooth animation
- Tracking: `1px` throughout

#### 8. **Footer**
- Top padding: `100px`
- Bottom padding: `50px`
- **BYREDO Logo (large)**:
  - Height: `294px` (desktop), `200px` (mobile)
  - Image: `/figma/8c086b7c2e19cae1e51e58f7df6771071bf70de9.svg`
- **Footer Info**:
  - Font: `Sk-Modernist Medium` 12px
  - Line height: `none`
  - Capitalize
  - Layout: Two-column (desktop), stacked (mobile)
  - **Left Column**:
    - "Horace Ortiz"
    - "Gladys.Romaguera10@gmail.com"
    - "59362"
  - **Right Column** (right-aligned):
    - "BYREDO all right rseerved"
    - "Fri Jan 14 2039 16:54:41 GMT+0900"

### Typography System
- **Primary Font**: `Sk-Modernist` (Regular, Bold)
- **Global Letter Spacing**: `1.5px` (from globals.css)
- **Custom Tracking**:
  - Header links: `2.2px`
  - Image titles/descriptions: `1px`
  - Store list: `1px`
- **Line Heights**:
  - Tight/None: Hero title
  - `16.5px`: Most UI elements
  - `1.5`: Body text, descriptions

### Responsive Design
- **Desktop** (1440px max-width container):
  - Full layout as designed
  - Two-column image gallery
  - Side-by-side footer columns
- **Tablet/Mobile**:
  - Stacked layout
  - Hero title scales down responsively
  - Description text scales down
  - Single-column image gallery
  - Reduced image heights
  - Stacked footer columns

### Color Palette
- **Background**: `#ffffff` (white)
- **Text**: `#000000` (black)
- **Gray**: `#e9e9e9` (image placeholders)
- **Light Gray**: `#f5f5f5` (button background)
- **Semi-transparent Black**: `rgba(0,0,0,0.7)` (secondary text)
- **Header**: `rgba(255,255,255,0.95)` (with backdrop blur)

### Interactive Features
1. **Copy Address Button**
   - Copies address to clipboard
   - Visual feedback: "COPY ADDRESS" → "COPIED!"
   - Auto-resets after 2 seconds
   
2. **Store Accordion**
   - Click to expand/collapse
   - "+" icon rotates 45° when expanded
   - Smooth fade-in animation for expanded content
   - Hover opacity effect

3. **Navigation Links**
   - Hover opacity transitions (60%)
   - Consistent throughout header

### Technical Implementation
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + Custom CSS classes
- **State Management**: React useState hooks
- **Client-Side**: 'use client' directive (interactive features)
- **Assets**: Static images from Figma export
- **Responsive**: Tailwind breakpoints (lg: 1024px)
- **Animations**: CSS transitions + Tailwind utilities

### File Structure
```
src/
├── app/
│   └── offline-store/
│       └── detail/
│           └── page.tsx           # Main detail page
└── components/
    └── svg-kbkko.tsx              # SVG asset references

public/
├── figma/
│   ├── 1c0f415909d84a88c2d6c966e7a021ea8e33e445.png  # Left image
│   ├── 00cd31a34451d5e20090a0d1366f5dc6337efab9.png  # Right image
│   ├── 8c086b7c2e19cae1e51e58f7df6771071bf70de9.svg  # Footer logo
│   └── f88a1935bc5a9d57c323dee06d66a41ed645f3b7.svg  # Divider line
└── images/
    └── logo.svg                   # Header logo
```

### Data Attributes
All elements include `data-node-id` attributes matching the Figma design for easy reference and debugging.

### Accessibility
- Semantic HTML structure
- Alt text for images
- Button elements for interactive components
- Proper heading hierarchy
- Keyboard navigation support

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Backdrop filter support
- Flexbox and Grid layouts
- CSS clamp() for responsive typography
- CSS custom properties

### Next Steps (Optional Enhancements)
1. Add actual store data from API/CMS
2. Implement navigation links functionality
3. Add image lightbox for gallery
4. Add Google Maps integration for store location
5. Implement store search/filter
6. Add loading states
7. Add error boundaries
8. Optimize images with Next.js Image component
9. Add SEO metadata
10. Implement internationalization (i18n)

## Testing
- ✅ Layout matches Figma design exactly
- ✅ All spacing and typography specifications implemented
- ✅ Responsive design works on all screen sizes
- ✅ Interactive features (copy, accordion) work correctly
- ✅ No linter errors
- ✅ All assets load correctly
- ✅ Development server builds successfully

## Access
Visit: `http://localhost:3000/offline-store/detail`

## Notes
- Width is 100% with max-width container (1440px) for optimal display
- All design elements, positioning, grids, fonts, letter-spacing, line-height, and margins match the Figma design
- Responsive implementation ensures usability across devices while maintaining design integrity
