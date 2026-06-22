# Visual Styling Bugs Documentation (BEFORE FIX)

**Date**: Task 1 - Bug Condition Documentation
**Purpose**: Document styling deviations from reference design (https://www.emorasuara.com/)
**Status**: UNFIXED CODE - These bugs confirm the root cause analysis

---

## Bug Category 1: Background Colors (Requirements 1.1, 2.1)

### Bug 1.1: Global Background Uses White Instead of Cream
**File**: `src/index.css`
**Current Code**:
```css
body {
  @apply font-sans text-gray-900 bg-white;
}
```
**Issue**: Uses `bg-white` (#ffffff) instead of `bg-brand-50` (#faf8f5 cream/beige)
**Expected**: Should use `@apply bg-brand-50` for cream background
**Impact**: Entire site has stark white background instead of warm cream tone

### Bug 1.2: Duplicate Conflicting Background Declaration
**File**: `src/index.css`
**Current Code**:
```css
body {
  @apply bg-stone-50 text-stone-800;
}
```
**Issue**: Uses `bg-stone-50` (#fafaf9) which is a cool gray, not warm cream
**Expected**: Should use `bg-brand-50` (#faf8f5)
**Impact**: Creates color inconsistency and wrong base tone

### Bug 1.3: AboutSection Uses White Background
**File**: `src/components/AboutSection.tsx`
**Current Code**: `className="py-24 px-6 bg-white"`
**Issue**: Uses `bg-white` instead of `bg-brand-50`
**Expected**: Should use `bg-brand-50` for cream background
**Impact**: Section has stark white background instead of warm cream

### Bug 1.4: ServicesSection Uses Stone-50 Background
**File**: `src/components/ServicesSection.tsx`
**Current Code**: `className="py-24 bg-stone-50"`
**Issue**: Uses `bg-stone-50` (cool gray) instead of `bg-brand-50` (warm cream)
**Expected**: Should use `bg-brand-50`
**Impact**: Section has cool gray tone instead of warm cream aesthetic

---

## Bug Category 2: Text Colors (Requirements 1.2, 2.2)

### Bug 2.1: Global Text Uses Gray-900 Instead of Brand-900
**File**: `src/index.css`
**Current Code**: `@apply font-sans text-gray-900 bg-white`
**Issue**: Uses `text-gray-900` (#111827 cool gray) instead of `text-brand-900` (#32281b dark brown)
**Expected**: Should use `text-brand-900` for warm dark brown text
**Impact**: All text has cool gray tone instead of warm brown aesthetic

### Bug 2.2: Duplicate Text Color Uses Stone-800
**File**: `src/index.css`
**Current Code**: `@apply bg-stone-50 text-stone-800`
**Issue**: Uses `text-stone-800` (#1c1917) instead of `text-brand-900` or `text-brand-800`
**Expected**: Should use brand color palette for text
**Impact**: Text color inconsistency with cool stone tones

### Bug 2.3: Nav Links Use Gray-700
**File**: `src/components/Nav.tsx`
**Current Code**: `text-gray-700` in linkClass and mobileLinkClass
**Issue**: Uses `text-gray-700` (cool gray) instead of `text-brand-800` (warm brown)
**Expected**: Should use `text-brand-800` for navigation links
**Impact**: Navigation text has cool gray tone instead of warm brown

### Bug 2.4: AboutSection Uses Stone Color Palette
**File**: `src/components/AboutSection.tsx`
**Current Issues**:
- Heading: `text-stone-900` instead of `text-brand-900`
- Body text: `text-stone-700` instead of `text-brand-800`
- Credentials: `text-stone-600` instead of `text-brand-700`
- Button: `border-stone-800 text-stone-800 hover:bg-stone-800` instead of brand colors
**Expected**: All text should use brand color palette (brand-900, brand-800, brand-700)
**Impact**: Section uses cool stone tones instead of warm brown aesthetic

### Bug 2.5: ServicesSection Uses Stone-900
**File**: `src/components/ServicesSection.tsx`
**Current Code**: `text-stone-900` for heading
**Issue**: Uses cool stone color instead of warm `text-brand-900`
**Expected**: Should use `text-brand-900`
**Impact**: Heading has cool tone instead of warm brown

### Bug 2.6: CoachingCard Uses Stone Color Palette
**File**: `src/components/CoachingCard.tsx`
**Current Issues**:
- Card background: `bg-white` (acceptable for cards on cream background)
- Card text: `text-stone-800` instead of `text-brand-900`
- Title: `text-stone-900` instead of `text-brand-900`
- Description: `text-stone-600` instead of `text-brand-700`
- Benefits: `text-stone-600` instead of `text-brand-700`
- Button: `border-stone-800 text-stone-800 hover:bg-stone-800` instead of brand colors
**Expected**: All text should use brand color palette
**Impact**: Cards use cool stone tones throughout

### Bug 2.7: BlogCard Uses Stone Color Palette
**File**: `src/components/BlogCard.tsx`
**Current Issues**:
- Date: `text-stone-500` instead of `text-brand-600`
- Title: `text-stone-900` instead of `text-brand-900`
- Excerpt: `text-stone-600` instead of `text-brand-700`
- Link: `text-stone-800 hover:text-stone-600` instead of brand colors
**Expected**: All text should use brand color palette
**Impact**: Blog cards use cool stone tones

### Bug 2.8: TestimonialCard Uses Stone Color Palette
**File**: `src/components/TestimonialCard.tsx`
**Current Issues**:
- Quote: `text-stone-700` instead of `text-brand-800`
- Name: `text-stone-900` instead of `text-brand-900`
- Border: `border-stone-200` instead of `border-brand-200`
**Expected**: All text and borders should use brand color palette
**Impact**: Testimonials use cool stone tones

---

## Bug Category 3: Navigation Styling (Requirements 1.5, 2.5)

### Bug 3.1: Nav Header Has Shadow
**File**: `src/components/Nav.tsx`
**Current Code**: `className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"`
**Issue**: Uses `shadow-sm` which adds visual weight
**Expected**: Should remove shadow for minimal elegant styling
**Impact**: Navigation has unnecessary visual weight

### Bug 3.2: Nav Header Uses White Background
**File**: `src/components/Nav.tsx`
**Current Code**: `bg-white` in header
**Issue**: Uses stark white instead of `bg-brand-50` or `bg-transparent`
**Expected**: Should use `bg-brand-50` or minimal transparent background
**Impact**: Navigation doesn't blend with cream background aesthetic

### Bug 3.3: Active Nav Links Have Heavy Border
**File**: `src/components/Nav.tsx`
**Current Code**: `border-b-2 border-brand-600` in linkClass when active
**Issue**: Uses thick bottom border for active state
**Expected**: Should use more subtle active state indication or remove border
**Impact**: Active links have heavy visual weight, not minimal/elegant

### Bug 3.4: Mobile Menu Has Border
**File**: `src/components/Nav.tsx`
**Current Code**: `className="md:hidden border-t border-gray-100 bg-white"`
**Issue**: Uses `border-t border-gray-100` which adds visual separation
**Expected**: Should minimize or remove border for cleaner aesthetic
**Impact**: Mobile menu has unnecessary visual weight

---

## Bug Category 4: Component Visual Weight (Requirements 1.6, 2.6)

### Bug 4.1: AboutSection Image Has Shadow
**File**: `src/components/AboutSection.tsx`
**Current Code**: `className="w-full rounded-sm object-cover shadow-sm aspect-[3/4]"`
**Issue**: Uses `shadow-sm` which adds visual weight
**Expected**: Should remove shadow for clean aesthetic
**Impact**: Image has unnecessary shadow creating visual separation

### Bug 4.2: CoachingCard Has Border
**File**: `src/components/CoachingCard.tsx`
**Current Code**: `border border-stone-200` in cardClass
**Issue**: Uses border which adds visual weight and separation
**Expected**: Should minimize or remove border for borderless aesthetic
**Impact**: Cards have visual boundaries instead of clean minimal design

### Bug 4.3: TestimonialCard Has Border
**File**: `src/components/TestimonialCard.tsx`
**Current Code**: `border border-stone-200` in figure element
**Issue**: Uses border which adds visual weight
**Expected**: Should minimize or remove border for borderless aesthetic
**Impact**: Testimonial cards have visual boundaries instead of clean design

### Bug 4.4: TestimonialCard Has Internal Border
**File**: `src/components/TestimonialCard.tsx`
**Current Code**: `border-t border-stone-200` in figcaption
**Issue**: Uses top border to separate name from quote
**Expected**: Should use spacing instead of borders for separation
**Impact**: Internal border adds visual weight

---

## Bug Category 5: Typography Weights (Requirements 1.3, 2.3)

### Bug 5.1: Typography Weights Are Mostly Correct
**Files**: Various components
**Observation**: Most components already use `font-light` (300) for headings and body text
**Examples**:
- HeroSection: `font-light` ✓
- AboutSection: `font-light` ✓
- ServicesSection: `font-light` ✓
- CoachingCard: `font-light` ✓
- BlogCard: `font-light` ✓
- TestimonialCard: `font-light` ✓

**Minor Issue**: Footer uses `font-semibold` for section headings
**File**: `src/components/Footer.tsx`
**Current Code**: `className="text-sm font-semibold uppercase tracking-wider text-brand-300 mb-4"`
**Note**: This is acceptable for footer contrast, but could be lighter

**Conclusion**: Typography weights are generally correct and elegant. No major bugs in this category.

---

## Bug Category 6: Spacing Consistency (Requirements 1.4, 2.4)

### Bug 6.1: Spacing Is Generally Consistent
**Observation**: Most sections use generous spacing:
- Sections: `py-24` ✓
- Heading margins: `mb-20`, `mb-16`, `mb-12` ✓
- Grid gaps: `gap-16`, `gap-12` ✓
- Component padding: `p-10`, `p-8` ✓

**Conclusion**: Spacing is generally good and follows generous whitespace principles. No major bugs in this category.

---

## Summary of Counterexamples Found

### Critical Bugs (Must Fix):
1. **Global background is white/stone-50 instead of cream (#faf8f5)** - Affects entire site aesthetic
2. **Global text is gray-900/stone-800 instead of brand-900/brand-800** - Wrong color tone throughout
3. **All components use stone/gray color palette instead of brand palette** - Inconsistent with design system
4. **Navigation has shadow-sm and white background** - Adds unnecessary visual weight
5. **Active nav links have border-b-2** - Too heavy for minimal aesthetic
6. **Cards and components have borders (border-stone-200)** - Creates visual separation instead of borderless design
7. **AboutSection image has shadow-sm** - Adds unnecessary visual weight

### Color Palette Issues:
- **Stone colors used**: stone-50, stone-200, stone-500, stone-600, stone-700, stone-800, stone-900
- **Gray colors used**: gray-100, gray-700, gray-900
- **Should use**: brand-50, brand-200, brand-600, brand-700, brand-800, brand-900

### Files Requiring Changes:
1. `src/index.css` - Global background and text colors
2. `src/components/Nav.tsx` - Background, shadow, borders, text colors
3. `src/components/AboutSection.tsx` - Background, text colors, button colors, image shadow
4. `src/components/ServicesSection.tsx` - Background, text colors
5. `src/components/CoachingCard.tsx` - Text colors, button colors, borders
6. `src/components/BlogCard.tsx` - Text colors
7. `src/components/TestimonialCard.tsx` - Text colors, borders

---

## Expected Outcome Confirmation

✅ **EXPECTED OUTCOME ACHIEVED**: Documentation reveals multiple styling deviations

This documentation confirms the bugs exist on unfixed code. The counterexamples demonstrate:
- Wrong color palette (white/stone/gray instead of cream/brand)
- Unnecessary visual weight (shadows, borders)
- Inconsistent use of design system

These findings validate the root cause analysis in the design document and establish baseline counterexamples that will be resolved when the fix is implemented.

---

**Next Steps**: 
- Task 2: Document existing functionality (preservation testing)
- Task 3: Implement fixes to resolve all documented bugs
- Task 3.6: Re-run this inspection to verify bugs are fixed
