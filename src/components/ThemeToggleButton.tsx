import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-background text-foreground rounded-full hover:bg-background transition-all"
    >
      {theme === 'light' ? (
        <Moon />
      ) : (
        <Sun />
      )}
    </button>
  );
};

export default ThemeToggleButton;
