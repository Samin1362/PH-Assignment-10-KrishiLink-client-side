# 🌾 KrishiLink

**Connecting Farmers & Buyers Directly** | Revolutionizing Agriculture Through Digital Innovation

![React](https://img.shields.io/badge/React-18.x-61dafb?style=flat&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?style=flat&logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?style=flat&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff?style=flat&logo=vite)

## 🚀 What is KrishiLink?

KrishiLink is a modern agricultural marketplace that empowers farmers to sell their crops directly to buyers, eliminating middlemen and ensuring fair prices for everyone. Built with cutting-edge web technologies, it provides a seamless experience for listing, discovering, and trading agricultural products.

## ✨ Key Features

### For Farmers 🧑‍🌾
- **Easy Crop Listing** - List your crops with photos, pricing, and detailed descriptions
- **Manage Inventory** - Update availability and pricing in real-time
- **Direct Communication** - Receive interest notifications and connect with buyers
- **Profile Management** - Track all your listings and buyer interests

### For Buyers 🛒
- **Smart Search & Filters** - Find exactly what you need with advanced filtering
- **Detailed Crop Information** - High-quality images and comprehensive descriptions
- **Express Interest** - Contact farmers directly with your requirements
- **Save Favorites** - Track crops you're interested in

### Platform Features 🎯
- **Secure Authentication** - Firebase-powered login with Google OAuth support
- **Password Recovery** - Functional forgot password feature
- **Responsive Design** - Stunning UI that works perfectly on all devices
- **Real-time Updates** - Live notifications and data synchronization
- **Professional Theming** - Beautiful green theme optimized for agriculture

## 🎨 Design Highlights

- **Split-Screen Authentication** - Gorgeous login/register pages with branding
- **Interactive Dashboard** - Beautiful home page with latest crops and features
- **Detailed Crop Pages** - Immersive product views with sticky sidebar
- **Custom Toast Notifications** - Elegant success/error feedback system
- **Smooth Animations** - Professional transitions and micro-interactions

## 🛠️ Tech Stack

**Frontend Framework**
- React 18.x with Hooks
- Vite for lightning-fast development
- React Router DOM for navigation

**Styling**
- Tailwind CSS 3.x for utility-first styling
- DaisyUI for component library
- Custom green theme with Poppins font

**Authentication**
- Firebase Authentication
- Google OAuth integration
- Protected routes with context API

**Backend Integration**
- RESTful API communication
- Axios for HTTP requests
- Environment variable configuration

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd KrishiLink-client-side

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=your_api_url_here" > .env

# Start development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://your-api-url.vercel.app
```

## 📱 Pages & Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Home page with featured crops | Public |
| `/login` | User authentication | Public |
| `/register` | New user registration | Public |
| `/all-crops` | Browse all available crops | Public |
| `/crop/:id` | Detailed crop information | Public |
| `/add-crops` | List new crops for sale | Protected |
| `/my-posts` | Manage your crop listings | Protected |
| `/my-interests` | Track your buyer interests | Protected |
| `/edit-crop/:id` | Edit crop details | Protected |
| `/profile` | User profile management | Protected |

## 🌟 Unique Selling Points

1. **No Middlemen** - Direct farmer-to-buyer connections ensure fair pricing
2. **User-Friendly** - Intuitive interface designed for all age groups
3. **Mobile-First** - Perfect experience on smartphones and tablets
4. **Secure & Reliable** - Firebase authentication ensures data security
5. **Fast & Modern** - Built with latest web technologies for optimal performance

## 👥 Target Users

- **Small & Medium Farmers** - Sell crops directly without intermediaries
- **Agricultural Buyers** - Source fresh produce at competitive prices
- **Wholesalers** - Discover bulk crop availability
- **Local Markets** - Connect with nearby farmers

## 🎯 Future Enhancements

- Real-time chat between farmers and buyers
- Price comparison and market analytics
- Multi-language support
- Mobile app (React Native)
- Payment gateway integration
- Delivery tracking system
- Weather updates for farmers
- Crop health monitoring

## 📄 License

This project is part of an academic assignment and is intended for educational purposes.

## 👨‍💻 Developer

Built with ❤️ to revolutionize agricultural commerce and empower farming communities.

---

**KrishiLink** - *Bridging the gap between farms and markets* 🌾
