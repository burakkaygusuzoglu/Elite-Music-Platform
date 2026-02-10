# Elite Music Platform

A revolutionary music social platform that integrates with Spotify to provide deep music insights, AI-powered recommendations, and engaging social features.

## Features

- 🎵 Deep music statistics and analytics
- 🤖 AI-powered personalized recommendations
- 👥 Social features for sharing and competing with friends
- 🎮 Unique activities and challenges
- ✨ Elite, visually stunning UI
- 🏆 Gamification elements

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **State Management**: Zustand
- **API Integration**: Spotify Web API
- **Charts**: Recharts
- **UI Components**: shadcn/ui
- **Build Tool**: Vite

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Spotify Developer Account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/burakkaygusuzoglu/Elite-Music-Platform.git
cd Elite-Music-Platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Spotify API credentials

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Getting Spotify API Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new application
3. Add `http://localhost:3000/callback` to Redirect URIs
4. Copy your Client ID and Client Secret
5. Add them to your `.env` file

## Environment Variables

See `.env.example` for all required environment variables.

## Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
Elite-Music-Platform/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # Base UI components
│   │   ├── auth/       # Authentication components
│   │   ├── dashboard/  # Dashboard components
│   │   ├── stats/      # Statistics visualizations
│   │   ├── social/     # Social features
│   │   ├── activities/ # Games and activities
│   │   └── layout/     # Layout components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── hooks/          # Custom React hooks
│   ├── store/          # State management
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   └── styles/         # Global styles
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
