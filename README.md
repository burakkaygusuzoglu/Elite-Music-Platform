# Elite Music Platform

<div align="center">
  
![Elite Music Platform](https://github.com/user-attachments/assets/bb1c2a09-0cb3-40fe-9b04-ec3b46b7cc13)

**A revolutionary music social platform that reimagines your music journey**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0.11-646CFF?logo=vite)](https://vitejs.dev/)

</div>

## ✨ Features

- 🎵 **Deep Music Statistics** - Comprehensive analytics about your listening habits
- 🤖 **AI-Powered Recommendations** - Smart suggestions tailored to your taste
- 👥 **Social Features** - Connect with friends and share your music journey
- 🎮 **Interactive Games** - Fun challenges like "Guess the Song" and "Music Bingo"
- 📊 **Beautiful Visualizations** - Stunning charts and graphs with your music data
- 🎨 **Elite UI/UX** - Dark theme with glassmorphism and smooth animations
- 📱 **Fully Responsive** - Works flawlessly on mobile, tablet, and desktop

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS + Framer Motion for animations
- **State Management**: Zustand
- **API Integration**: Spotify Web API
- **Charts/Visualizations**: Recharts
- **UI Components**: Custom shadcn/ui components
- **Build Tool**: Vite
- **Authentication**: OAuth 2.0 for Spotify

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Spotify Developer Account

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/burakkaygusuzoglu/Elite-Music-Platform.git
cd Elite-Music-Platform
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables**
   - Copy \`.env.example\` to \`.env\`
   - Fill in your Spotify API credentials

\`\`\`bash
cp .env.example .env
\`\`\`

4. **Configure Spotify API**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new application
   - Add \`http://localhost:3000/callback\` to Redirect URIs
   - Copy your Client ID and Client Secret to \`.env\`

5. **Run the development server**
\`\`\`bash
npm run dev
\`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Building for Production

\`\`\`bash
npm run build
npm run preview
\`\`\`

## 🎯 Getting Spotify API Credentials

1. Visit [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create an App"
4. Fill in the app details
5. Add \`http://localhost:3000/callback\` to Redirect URIs
6. Copy your Client ID and Client Secret to \`.env\`

## 📚 Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
Made with ❤️ for music lovers everywhere
</div>
