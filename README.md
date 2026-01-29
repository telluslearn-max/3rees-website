
# 📝 README.md (v0.1.0)

# 📱 3rees Ecommerce Platform (v0.1.0)

> **The Apple-style marketplace for premium tech in Kenya.** > Built with Next.js 14, Tailwind CSS, and TypeScript. Optimized for high-conversion financing (BNPL) and Trade-ins.

---

## 🚀 Quick Start for Developers

### 1. Prerequisites

* **Node.js 18+** ([Download](https://nodejs.org/))
* **Git** ([Download](https://git-scm.com/))
* **VS Code** ([Download](https://code.visualstudio.com/))

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/telluslearn-max/3rees-website.git
cd 3rees-website

# Install dependencies
npm install

# Run development server
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to see the result.

---

## 🏗 Project Structure

```text
3rees-website/
├── app/               # Next.js App Router (Pages & Routing)
│   ├── shop/          # Dynamic product pages [slug]
│   ├── trade-in/      # Device evaluation tool
│   ├── swap-library/  # Gaming swap platform
│   ├── bnpl/          # Financing landing page
│   └── checkout/      # COD & Deposit handling
├── components/        # UI & Business Logic
│   ├── layout/        # Navbar & Footer
│   ├── sections/      # Homepage modular blocks
│   ├── ui/            # Buttons, Badges, Cards
│   └── BNPLCalculator.tsx # CORE LOGIC: Financing math
├── lib/               # Shared logic
│   ├── data.ts        # Mock product database (Switch to Strapi later)
│   └── utils.ts       # Formatting & Price helpers
└── docs/              # Detailed Team Documentation

```

---

## 💰 Financing (BNPL) Business Logic

The website uses custom behavioral triggers to lower "sticker shock." All logic is housed in `components/BNPLCalculator.tsx`.

### Tiered Deposit Rules:

| Brand | Base Deposit | Insurance | Min. Custom Deposit |
| --- | --- | --- | --- |
| **Apple** | 40% (Up to 50% for new) | 2% / mo | Ksh 51,000 |
| **Samsung** | 40% - 50% | 6% flat | Ksh 41,000 |
| **Android/Vivo** | 15% - 30% (Price-based) | 6% flat | Ksh 3,200 |

### Repayment Strategy:

* **Hyperbolic Discounting:** UI prioritizes "Price per Week" over "Total Price."
* **Anchor Pricing:** Always show the lowest possible weekly payment next to the full price.

---

## 🎨 Design System (Apple-Style)

We follow a clean, minimalist aesthetic to build premium trust.

* **Colors:** * Primary: `#0071e3` (Apple Blue)
* Success: `#34c759` (Trade-in/Success states)
* Background: `#f5f5f7` (Light Gray)


* **Typography:** System-based (Inter/SF Pro style). Headlines use tight tracking (`-0.022em`).
* **Components:** Pill-shaped buttons (`rounded-full`), generous whitespace, and subtle shadows.

---

## 🛠 Common Tasks

### Adding a New Product

Currently, 3rees uses a static data layer. To add products:

1. Open `lib/data.ts`.
2. Add a new object to the `products` array.
3. Ensure you include `id`, `name`, `price`, `condition`, and `image`.

### Deployment

To build for production:

```bash
npm run build

```

The output will be in the `.next` folder (for Vercel) or `dist` (if configured for static).

---

## 👥 Team Guidelines

* **Branching:** Never push directly to `main`. Use `feature/name` or `fix/name`.
* **Commits:** Use descriptive messages (e.g., `feat: add samsung interest logic`).
* **Styling:** Use Tailwind CSS exclusively. No custom CSS files unless in `globals.css`.

---

## 🆘 Troubleshooting

* **npm install fails:** Delete `node_modules` and `package-lock.json`, then run `npm install`.
* **Port in use:** Run `npm run dev -- -p 3001`.
* **Large File Error:** Ensure `.gitignore` includes `node_modules/` and `.next/`.

---

**Contact:** [Your Name/Email] | **Version:** 0.1.0 | **Private Repo**

---

### **How to add this to your GitHub now:**

1. Open your `README.md` file in VS Code.
2. Paste all the text above.
3. Save the file.
4. Run these commands in your terminal:

```bash
git add README.md
git commit -m "docs: upgrade README to v0.1.0 documentation"
git push origin main

```

Would you like me to generate the content for the `docs/STRAPI-SETUP.md` file next so your team knows how to transition from static data to a real database?
