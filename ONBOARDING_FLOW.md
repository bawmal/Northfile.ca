# Northfile Property Onboarding Flow

## Overview
This document outlines the AI-guided onboarding flow that collects all contextual information needed to prepare accurate T776 forms for Ontario landlords.

---

## Entry Point: Properties Page

**"Add Property" Card Design:**
- Gradient blue-to-purple background with dashed border
- Sparkles icon (AI indicator)
- Heading: "Add New Property"
- Subheading: "I'll guide you through a few quick questions to set up your T776 correctly"
- Preview checklist showing what will be asked
- CTA button: "Start Setup (2 min)"

---

## Step-by-Step Onboarding Wizard

### **Step 1: Property Basics**

**AI Question:**
> "Let's start with the basics. What's the address of your rental property?"

**Fields:**
- Street address (text input)
- City (text input)
- Province (dropdown - defaults to ON)
- Postal code (text input with validation)

**AI Follow-up:**
> "Great! What type of property is this?"

**Property Type Options:**
- Single Family Home
- Duplex
- Triplex
- Apartment Building
- Condo
- Townhouse
- Basement Apartment
- Other

**Number of Units:**
- Numeric input (1-100)

**AI Confirmation:**
> "✓ Got it! 456 Oak Avenue, Ottawa - Single Family Home with 1 unit"

---

### **Step 2: Rental Period (Critical for Proration)**

**AI Question:**
> "When did you start renting out this property?"

**Date Picker:**
- Month dropdown
- Day dropdown  
- Year dropdown

**AI Smart Detection:**
If start date is mid-year (not January 1):
> "⚠️ I noticed you started renting on December 1, 2024. This means you only rented for 1 month in 2024.
>
> I'll automatically prorate your expenses so only the rental period is deductible on your T776.
>
> For example, if you paid $6,000 in property taxes for the full year, only $500 (1/12) will be deductible.
>
> Does this make sense? [Yes, continue] [Explain more]"

**Additional Question (if applicable):**
> "Was this property used for personal purposes before you started renting?"

Options:
- Yes, it was my principal residence
- Yes, it was a vacation property
- No, I purchased it specifically to rent

**AI Explanation (if personal use):**
> "Important! Since you used this property personally for 11 months, those expenses are NOT tax deductible. Only expenses from December 1st onward count.
>
> I'll track this automatically for you."

---

### **Step 3: Ownership Structure**

**AI Question:**
> "Do you own this property by yourself, or with someone else?"

**Options:**
- I own 100% (sole owner)
- I co-own with someone else

**If Co-Ownership Selected:**

**AI Follow-up:**
> "Who do you co-own this property with?"

**Co-Owner Details:**
- Name (text input)
- Relationship (dropdown):
  - Spouse
  - Common-law partner
  - Business partner
  - Family member
  - Other
- Your ownership percentage (slider: 0-100%)
- Their ownership percentage (auto-calculated)

**AI Important Notice:**
> "⚠️ Important for Tax Filing:
>
> Since you own 50% and Sarah owns 50%, you'll each file your OWN T776 form.
>
> Your T776 will show:
> - 50% of the rental income
> - 50% of the expenses
>
> Sarah will file a separate T776 with the same amounts.
>
> Would you like me to send Sarah an invite to Northfile so she can track her portion? [Yes] [No, I'll tell her]"

---

### **Step 4: Purchase Information**

**AI Question:**
> "When did you purchase this property?"

**Date Picker:**
- Month/Year

**Purchase Price:**
- Dollar amount input
- AI note: "This helps me calculate Capital Cost Allowance (CCA) for you"

**Land vs Building Value (Optional):**
> "Do you know how much of the purchase price was for the land vs the building?
>
> (This is usually on your lawyer's statement of adjustments)"

- Land value: $______
- Building value: $______
- Skip this (I'll estimate based on typical ratios)

**AI Explanation:**
> "💡 Why this matters: You can only claim CCA on the building, not the land. I'll use this to calculate your maximum CCA deduction."

---

### **Step 5: Mortgage Information (Optional but Recommended)**

**AI Question:**
> "Do you have a mortgage on this property?"

**Options:**
- Yes
- No (owned outright)

**If Yes:**

**Mortgage Details:**
- Lender name (text)
- Mortgage balance: $______
- Interest rate: ____%
- Monthly payment: $______

**AI Smart Calculation:**
> "Based on your mortgage details, I'll automatically split each payment into:
> - Interest (tax deductible) ✅
> - Principal (not deductible) ❌
>
> For your $2,500/month payment at 3.5% interest:
> - ~$1,500 interest (deductible)
> - ~$1,000 principal (not deductible)
>
> I'll track this automatically when you connect your bank account."

---

### **Step 6: Review & Confirm**

**AI Summary:**
> "Perfect! Here's what I've set up for you:"

**Property Summary Card:**
```
456 Oak Avenue, Ottawa ON
Single Family Home • 1 unit

Your Ownership: 50%
Co-owner: Sarah Johnson (50%)

Rental Period 2024:
Started: Dec 1, 2024
Days rented: 31 days (8.5% of year)

Purchase Info:
Purchased: 2019
Building value: $400,000
Land value: $100,000

Mortgage:
$2,500/month at 3.5% APR
~$1,500/month deductible interest
```

**AI Next Steps:**
> "✅ Property setup complete!
>
> Next steps to get your T776 ready:
> 1. Connect your bank account to import transactions
> 2. Upload receipts for expenses
> 3. I'll categorize everything and calculate your T776
>
> [Connect Bank Account] [Add Transactions Manually] [I'll do this later]"

---

## Post-Onboarding: Property Card Display

Once setup is complete, the property card shows all collected information:

**Property Card Layout:**
- Property image/gradient header
- Address & location
- Property type & units
- **Your ownership %** (not just "ownership")
- Purchase year

**Co-Ownership Section** (if applicable):
- Purple card showing split
- Lists all co-owners with percentages
- Note: "Filing separately - Each files own T776"

**Rental Period Section:**
- Blue card for full year
- Yellow card for partial year
- Shows start date, days rented, percentage
- Breakdown of personal vs rental use

**Mortgage Section** (if applicable):
- Shows monthly payment
- Interest/principal split
- YTD interest total
- APR badge

**Financial Summary:**
- YTD Income
- YTD Expenses  
- Net Income
- Transaction/receipt counts

---

## AI Guidance Throughout

### **Smart Alerts**
When user adds transactions for a partial-year property:
- Blue banner explains proration
- Shows example calculation
- Links to learn more

### **Inline Help**
On T776 preview:
- Tooltips (ⓘ) next to each line item
- "Ask AI" buttons in section headers
- Live calculation explanations

### **Chat Assistant**
Floating button on all pages:
- Answers specific questions
- Provides examples
- Explains CRA rules in plain language

---

## Key Design Principles

1. **Progressive Disclosure**: Only ask for information when needed
2. **Contextual Explanations**: Explain WHY we need each piece of data
3. **Smart Defaults**: Pre-fill based on typical scenarios
4. **Visual Feedback**: Show progress, confirmations, and warnings
5. **Plain Language**: No tax jargon without explanation
6. **Proactive Guidance**: Alert users to potential issues before they happen

---

## Technical Implementation Notes

### **Data Collection:**
```typescript
interface PropertyOnboarding {
  // Step 1: Basics
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  propertyType: PropertyType;
  units: number;
  
  // Step 2: Rental Period
  rentalStartDate: Date;
  rentalEndDate?: Date; // Optional for partial year
  previousUse: 'personal' | 'investment' | 'new_purchase';
  
  // Step 3: Ownership
  ownershipPercentage: number;
  coOwners?: Array<{
    name: string;
    relationship: string;
    percentage: number;
    email?: string;
  }>;
  
  // Step 4: Purchase
  purchaseDate: Date;
  purchasePrice: number;
  landValue?: number;
  buildingValue?: number;
  
  // Step 5: Mortgage
  hasMortgage: boolean;
  mortgage?: {
    lender: string;
    balance: number;
    interestRate: number;
    monthlyPayment: number;
  };
}
```

### **Proration Calculation:**
```typescript
function calculateProration(
  annualExpense: number,
  rentalStartDate: Date,
  rentalEndDate: Date,
  ownershipPercentage: number
): number {
  const totalDays = 365;
  const rentalDays = daysBetween(rentalStartDate, rentalEndDate);
  const rentalPercentage = rentalDays / totalDays;
  
  return annualExpense * rentalPercentage * (ownershipPercentage / 100);
}

// Example: $6,000 property tax, Dec 1-31 rental, 50% ownership
// = $6,000 × (31/365) × 0.5 = $255
```

### **AI Prompts:**
Store conversational prompts in database for easy A/B testing and updates without code changes.

---

## Success Metrics

**Onboarding Completion Rate:**
- Target: >90% complete all steps
- Track drop-off at each step

**Time to Complete:**
- Target: <3 minutes average
- Measure from start to final confirmation

**Data Quality:**
- % of users who provide optional mortgage info
- % of users who provide land/building split
- % of users who add co-owners

**User Understanding:**
- Survey: "Do you understand why we need rental start date?"
- Survey: "Do you understand proration?"
- Track "Explain more" clicks

---

This onboarding flow ensures Northfile collects ALL the contextual information needed to generate accurate T776 forms, while educating users about tax rules they may not know!
