/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPOTIFY_CLIENT_ID: string
  readonly VITE_SPOTIFY_CLIENT_SECRET: string
  readonly VITE_SPOTIFY_REDIRECT_URI: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_SPOTIFY_API_URL: string
  readonly VITE_SPOTIFY_AUTH_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
