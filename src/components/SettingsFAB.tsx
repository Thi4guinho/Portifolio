import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Moon, Sun, Languages, Check } from 'lucide-react';
import { Language, translations } from '../translations';

interface SettingsFABProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const SettingsFAB = ({ currentLanguage, onLanguageChange }: SettingsFABProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const t = translations[currentLanguage].settings;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full glass flex items-center justify-center text-foreground shadow-lg"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Settings className="w-6 h-6" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
            className="absolute bottom-16 left-0 glass p-4 rounded-2xl shadow-2xl min-w-[200px] space-y-4"
          >
            {/* Theme Toggle */}
            <div className="space-y-2">
              <p className="text-[10px] uppercase text-foreground/40 tracking-widest font-heading">{t.theme}</p>
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-foreground/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <span className="text-sm">{theme === 'dark' ? t.dark : t.light}</span>
                </div>
                <div className={`w-8 h-4 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-accent' : 'bg-foreground/20'}`}>
                  <motion.div
                    animate={{ x: theme === 'dark' ? 16 : 2 }}
                    className="absolute top-1 w-3 h-2 bg-white rounded-full"
                  />
                </div>
              </button>
            </div>

            {/* Language Switcher */}
            <div className="space-y-2">
              <p className="text-[10px] uppercase text-foreground/40 tracking-widest font-heading">{t.language}</p>
              <div className="space-y-1">
                {(['pt', 'en', 'es'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => onLanguageChange(lang)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-foreground/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Languages className="w-4 h-4 opacity-40" />
                      <span className="text-sm uppercase">{lang}</span>
                    </div>
                    {currentLanguage === lang && <Check className="w-4 h-4 text-accent" />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
