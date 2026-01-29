# Changelog

## [1.1.0] - 2024-01-29

### Added
- **Dual BNPL Plan System**
  - Standard Plans: Apple, Samsung, Vivo with fixed deposit rates
  - Custom Plans: User-defined deposit (15-70%) with 15K minimum device value
  
- **Provider-Specific Logic**
  - Apple: 40% deposit (returning), 50% deposit (new clients on 4-6 months)
  - Samsung: 40% (1-3mo), 45% (4-5mo returning), 50% (6mo/4-6mo new)
  - Vivo: 15-30% tiered, with 16% minimum deposit amount enforcement
  
- **Client Type Differentiation**
  - Returning clients: Lower deposit rates, VIP treatment
  - New clients: Standard rates, higher deposit for extended terms
  
- **Insurance Integration**
  - Apple: 2% monthly on financed amount
  - Samsung: 8% monthly on financed amount
  - Vivo/Custom: 5% monthly on financed amount

### Changed
- Replaced static BNPL calculator with dynamic React state management
- Updated `/bnpl` page with tabbed interface (Standard vs Custom)
- Modified `BNPLWidget` to support real-time calculation
- Removed minimum financing restrictions from Standard Plans (now any amount works)

### Files Added
- `types/bnpl.ts` - TypeScript interfaces and provider configs
- `types/customPlan.ts` - Custom plan type definitions
- `lib/customPlanCalculator.ts` - Custom deposit calculation engine

### Files Modified
- `lib/bnplCalculator.ts` - Removed validation, added Vivo 16% rule
- `app/bnpl/page.tsx` - Complete refactor with dual plan support
- `components/sections/BNPLWidget.tsx` - Dynamic calculation integration
