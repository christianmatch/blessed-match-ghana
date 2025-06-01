
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BibleVerse {
  text: string;
  reference: string;
}

const verses: BibleVerse[] = [
  {
    text: "He who finds a wife finds what is good and receives favor from the Lord.",
    reference: "Proverbs 18:22"
  },
  {
    text: "Above all else, guard your heart, for everything you do flows from it.",
    reference: "Proverbs 4:23"
  },
  {
    text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.",
    reference: "1 Corinthians 13:4"
  },
  {
    text: "Two are better than one, because they have a good return for their labor.",
    reference: "Ecclesiastes 4:9"
  },
  {
    text: "And now these three remain: faith, hope and love. But the greatest of these is love.",
    reference: "1 Corinthians 13:13"
  }
];

export const BibleVerseWidget = () => {
  const [currentVerse, setCurrentVerse] = useState<BibleVerse>(verses[0]);

  useEffect(() => {
    // Get a different verse each day
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const verseIndex = dayOfYear % verses.length;
    setCurrentVerse(verses[verseIndex]);
  }, []);

  const getRandomVerse = () => {
    const randomIndex = Math.floor(Math.random() * verses.length);
    setCurrentVerse(verses[randomIndex]);
  };

  return (
    <Card className="bg-gradient-to-br from-christian-cream to-white dark:from-surface-dark-elevated dark:to-surface-dark border-christian-gold dark:border-christian-gold/50 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-christian-gold" />
            <h3 className="font-semibold text-christian-navy dark:text-white">Daily Verse</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={getRandomVerse}
            className="hover:bg-christian-gold/20"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        
        <blockquote className="text-lg font-playfair italic text-gray-700 dark:text-gray-300 mb-4">
          "{currentVerse.text}"
        </blockquote>
        
        <cite className="text-sm font-medium text-christian-blue dark:text-christian-blue">
          - {currentVerse.reference}
        </cite>
      </CardContent>
    </Card>
  );
};
