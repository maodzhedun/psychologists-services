# 🧠 Psychologists.Services

A modern web application for finding and booking appointments with professional psychologists. The platform allows users to browse available specialists, filter them by various criteria, save favorites, and schedule consultations.

## 🔗 Links

- 🌐 **Live Demo:** [Vercel Deployment](https://psychologists-services-three-liart.vercel.app/)
- 🎨 **Design:** [Figma Mockup](https://www.figma.com/file/I5vjNb0NsJOpQRnRpMloSY/Psychologists.Services?type=design&node-id=0-1&mode=design&t=4zfT2zFANRbp1fCK-0k)
- 📋 **Technical Specification:** [Google Docs](https://docs.google.com/document/d/1PrTxBn6HQbb0Oz17g5_zvyLGIOZg0TIP3HPaEEp6ZLs/edit?tab=t.0)

---

## ✨ Key Features

### 🏠 Home Page (`/`)
- Hero section with engaging call-to-action
- Platform statistics (experienced psychologists count)
- Smooth animations and responsive design

### 👨‍⚕️ Psychologists Page (`/psychologists`)
- Catalog of professional psychologists from Firebase Realtime Database
- **Advanced Filtering:**
  - Sort A-Z / Z-A by name
  - Sort by price (ascending/descending)
  - Sort by rating (popular/not popular)
- **Pagination:** "Load More" functionality for efficient data loading
- **Interactive Cards:** Detailed profiles with avatar, rating, price, specialization, and reviews

### ❤️ Favorites Page (`/favorites`)
- Personal collection of saved psychologists
- **Cloud Sync:** Favorites stored in Firebase, persist across devices
- **Protected Route:** Accessible only to authenticated users

### 🔐 Authentication
- **Modal-based UI:** Seamless Login and Registration experience
- **Form Validation:** React Hook Form + Yup schema validation
- **Firebase Auth:** Secure user management with display names

### 📝 Appointment Booking
- Book consultations directly from psychologist cards
- Custom time slot selection
- Form validation for contact details

---

## 🛠 Technologies

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 15+ (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Backend** | Firebase (Auth + Realtime Database) |
| **Forms** | React Hook Form + Yup |
| **State** | React Context API |

---


## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/maodzhedun/psychologists-services
cd psychologists-services
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**

Create `.env.local` in the root directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project.firebasedatabase.app
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open in browser:**
```
http://localhost:3000
```


### Authentication
- Enable **Email/Password** provider in Firebase Console

