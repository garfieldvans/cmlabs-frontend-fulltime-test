# 🍽️ Meals App

Aplikasi web untuk menjelajahi resep makanan, ingredients, dan kategori dari seluruh dunia. Dibangun dengan teknologi modern Next.js 16 dan React 19 dengan desain responsive yang sempurna untuk semua ukuran perangkat.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Instalasi](#instalasi)
- [Cara Menjalankan](#cara-menjalankan)
- [Struktur Project](#struktur-project)
- [Fitur & Pages](#fitur--pages)
- [API Integration](#api-integration)
- [Responsive Design](#responsive-design)

## ✨ Fitur Utama

- **Jelajahi Resep Makanan**: Browse ribuan resep dari seluruh dunia
- **Cari Berdasarkan Ingredients**: Temukan resep berdasarkan bahan yang Anda miliki
- **Detail Resep Lengkap**: 
  - Gambar makanan berkualitas tinggi
  - Daftar ingredients dengan jumlah yang tepat
  - Instruksi langkah-demi-langkah
  - Video tutorial (jika tersedia)
  - Tags dan kategori
- **Filter Ingredients**: Filter berdasarkan huruf awal dan opsi show items
- **Responsive Design**: Optimal di desktop, tablet, dan mobile
- **Pagination**: Navigasi mudah melalui hasil pencarian

## 🛠️ Tech Stack

- **Frontend Framework**: [Next.js 16.2.2](https://nextjs.org)
- **React**: 19.2.4
- **Styling**: 
  - Tailwind CSS 4
  - Custom CSS dengan media queries responsive
- **Type Safety**: TypeScript 5
- **Icons**: React Icons 5.6.0
- **Linting**: ESLint 9
- **Node**: 20+

## 📦 Instalasi

### Prerequisites
- Node.js 20+ dan npm atau yarn

### Steps

1. **Clone atau download project**
```bash
cd meals-app
```

2. **Install dependencies**
```bash
npm install
# atau
yarn install
```

## 🚀 Cara Menjalankan

### Development Mode
```bash
npm run dev
```
Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000)

### Build untuk Production
```bash
npm run build
```

### Run Production Build
```bash
npm start
```

### Lint Project
```bash
npm run lint
```

## 📁 Struktur Project

```
meals-app/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx              # Navigation bar
│   │   ├── Navbar.css
│   │   ├── HeroBanner.tsx           # Hero section
│   │   ├── HeroBanner.css
│   │   ├── Breadcrumb.tsx           # Breadcrumb navigation
│   │   ├── Breadcrumb.css
│   │   ├── Pagination.tsx           # Pagination controls
│   │   ├── Pagination.css
│   │   ├── meals/
│   │   │   ├── MealsList.tsx        # Meals grid list
│   │   │   ├── MealsList.css
│   │   │   ├── MealCard.tsx         # Individual meal card
│   │   │   └── MealCard.css
│   │   └── ingredients/
│   │       ├── IngredientsList.tsx  # Ingredients list with filters
│   │       ├── IngredientsList.css
│   │       ├── IngredientCard.tsx   # Individual ingredient card
│   │       └── IngredientCard.css
│   │
│   ├── foods/
│   │   ├── page.tsx                 # Foods list page
│   │   ├── Foods.css
│   │   └── [mealid]/
│   │       └── page.tsx             # Meal detail page
│   │
│   ├── ingredients/
│   │   ├── page.tsx                 # Ingredients page
│   │   └── [ingredients]/
│   │       └── page.tsx             # Ingredient detail page
│   │
│   ├── lib/
│   │   └── datadb.ts                # API calls & data fetching
│   │
│   ├── globals.css                  # Global styles
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Home page
│
├── public/
│   └── images/                      # Static images
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## 🌐 Fitur & Pages

### 1. **Home Page** (`/`)
- Hero banner dengan call-to-action
- Daftar ingredients populer
- Landing page yang menarik

### 2. **Foods Page** (`/foods`)
- Daftar resep makanan
- Pagination untuk navigasi
- Responsive grid layout (2-4 kolom)

### 3. **Meal Detail Page** (`/foods/[mealid]`)
- Gambar makanan dalam kualitas tinggi
- Daftar ingredients dengan ukuran
- Instruksi memasak terperinci
- Video tutorial (embedded YouTube)
- Kategori, tags, dan area asal
- Breadcrumb navigation

### 4. **Ingredients Page** (`/ingredients`)
- Daftar semua ingredients
- Filter berdasarkan huruf awal
- Opsi show items (12, 24, 36)
- Responsive grid

### 5. **Ingredient Detail Page** (`/ingredients/[ingredient]`)
- Informasi ingredients
- Resep yang menggunakan ingredient tersebut
- Grid layout responsive
- Breadcrumb navigation

## 🔌 API Integration

Project ini menggunakan **TheMealDB API** - database gratis berisi ribuan resep makanan.

### API Endpoints yang Digunakan:

```typescript
// Get semua kategori
GET /api/json/v1/1/categories.php

// Get semua ingredients
GET /api/json/v1/1/list.php?i=list

// Get meals by ingredient
GET /api/json/v1/1/filter.php?i={ingredient_name}

// Get meal by ID
GET /api/json/v1/1/lookup.php?i={meal_id}

// Get meals by first letter
GET /api/json/v1/1/search.php?f={letter}
```

**API Base URL**: `https://www.themealdb.com/`

### Data Caching Strategy:
- **Categories**: Revalidate setiap 1 jam
- **Ingredients**: Force cache (data jarang berubah)
- **Meals**: Revalidate setiap 1 jam

## 📱 Responsive Design

Aplikasi fully responsive dengan 3 breakpoint utama:

| Device | Breakpoint | Grid Meals | Grid Ingredients |
|--------|-----------|-----------|------------------|
| Mobile | ≤480px | 2 kolom | 1 kolom |
| Tablet | 481-768px | 2-3 kolom | 2 kolom |
| Desktop | ≥1024px | 4 kolom | 3 kolom |

### Font Sizing:
- **Mobile**: 13px base, h1 1.6rem, h2 1.3rem
- **Tablet**: 14px base, h1 1.8rem, h2 1.5rem
- **Desktop**: 16px base, h1 2.5rem, h2 1.75rem

Semua CSS telah dioptimalkan untuk mobile-first approach dengan media queries yang sempurna.

## 💡 Tips Penggunaan

1. **Browse Meals**: Kunjungi halaman Foods untuk melihat resep
2. **Search**: Gunakan search bar untuk mencari resep spesifik
3. **Filter by Ingredients**: Klik ingredient di home page untuk melihat resep yang memakainya
4. **Bookmark**: Simpan resep favorit Anda (fitur dapat ditambahkan)
5. **Share**: Share resep dengan teman

## 🐛 Development Notes

- Project menggunakan Next.js 16 dengan App Router
- Type-safe dengan TypeScript
- ESLint configured untuk code quality
- Custom CSS dengan Tailwind CSS integration
- Server-side rendering untuk performa optimal

## 📝 Environment Variables

Tidak ada environment variables yang diperlukan karena menggunakan public API.

## 🚀 Deployment

Project dapat di-deploy ke:
- **Vercel** (Recommended - creators of Next.js)
- **Netlify**
- **AWS**
- **Self-hosted server**

## 📄 License

Project ini adalah project pembelajaran dan open untuk digunakan.

## 🤝 Kontribusi

Untuk kontribusi, silakan:
1. Fork repository
2. Buat branch features
3. Commit changes
4. Push ke branch
5. Buat Pull Request

---

**Built with ❤️ using Next.js & React**
