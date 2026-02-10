import { Heart, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/10 glass">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500" /> for music lovers
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/burakkaygusuzoglu/Elite-Music-Platform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <p className="text-gray-400 text-sm">
              © 2024 Elite Music Platform
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
