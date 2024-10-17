import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, User, Mic } from 'lucide-react';
import AddContentForm from './AddContentForm';

interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
  type: 'blog';
}

interface Podcast {
  id: number;
  title: string;
  host: string;
  date: string;
  duration: string;
  audioUrl: string;
  description: string;
  type: 'podcast';
}

type Content = BlogPost | Podcast;

const initialContent: Content[] = [
  {
    id: 1,
    title: "The Influence of Mercury Retrograde on Communication",
    author: "Astro Alice",
    date: "2024-03-15",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1518558997970-4ddc236affcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: "Mercury retrograde is a phenomenon that occurs when the planet Mercury appears to move backwards in its orbit. This optical illusion has been associated with communication mishaps, technology glitches, and general confusion. In this post, we'll explore how Mercury retrograde affects our daily lives and provide tips on how to navigate this challenging astrological period.",
    type: 'blog'
  },
  {
    id: 2,
    title: "Understanding Your Moon Sign",
    author: "Luna Lovegood",
    date: "2024-03-20",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: "While most people know their sun sign, fewer are aware of the significance of their moon sign. Your moon sign represents your emotional self, your instincts, and your subconscious mind. In this comprehensive guide, we'll delve into the meaning of each moon sign and how it influences your personality and relationships.",
    type: 'blog'
  },
  {
    id: 3,
    title: "The Power of Solar Returns in Astrology",
    author: "Sol Seeker",
    date: "2024-03-25",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: "A solar return is the annual return of the Sun to its exact position at the time of your birth. This astrological event is believed to set the tone for the coming year of your life. In this post, we'll explore how to calculate your solar return, interpret its chart, and use this powerful tool for personal growth and self-reflection.",
    type: 'blog'
  },
  {
    id: 4,
    title: "Exploring the 12 Houses of the Zodiac",
    host: "House Hunter Harry",
    date: "2024-03-30",
    duration: "45 min",
    audioUrl: "https://example.com/podcasts/12-houses-zodiac.mp3",
    description: "In this episode, we take a deep dive into the 12 houses of the zodiac. Each house represents a different area of life, from personal identity to career and relationships. Join us as we explore the significance of each house and how they interact with the planets and signs in your birth chart.",
    type: 'podcast'
  },
  {
    id: 5,
    title: "The Role of Fixed Stars in Astrology",
    host: "Stella Stargazer",
    date: "2024-04-05",
    duration: "30 min",
    audioUrl: "https://example.com/podcasts/fixed-stars-astrology.mp3",
    description: "While most astrology focuses on the planets and zodiac signs, fixed stars also play a crucial role in astrological interpretations. In this podcast, we'll discuss some of the most important fixed stars, their meanings, and how they can influence your natal chart and life events.",
    type: 'podcast'
  }
];

function BlogPosts() {
  const { t } = useTranslation();
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [content, setContent] = useState<Content[]>(initialContent);
  const [showAddForm, setShowAddForm] = useState(false);

  const togglePost = (index: number) => {
    setExpandedPost(expandedPost === index ? null : index);
  };

  const handleAddContent = (newContent: Content) => {
    setContent([newContent, ...content]);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-12 text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-light mb-8">{t('blog_posts_and_podcasts')}</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Add New Content
        </button>
      </div>

      {showAddForm && (
        <AddContentForm onAddContent={handleAddContent} onCancel={() => setShowAddForm(false)} />
      )}

      {content.map((item, index) => (
        <article key={item.id} className="mb-12 bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          {item.type === 'blog' && item.image && (
            <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
          )}
          <div className="p-6">
            <h3 className="text-2xl font-light mb-4">{item.title}</h3>
            <div className="flex items-center text-sm text-gray-300 mb-4">
              {item.type === 'blog' ? (
                <>
                  {item.author && (
                    <>
                      <User size={16} className="mr-2" />
                      <span className="mr-4">{item.author}</span>
                    </>
                  )}
                  {item.date && (
                    <>
                      <Calendar size={16} className="mr-2" />
                      <span className="mr-4">{item.date}</span>
                    </>
                  )}
                  {item.readTime && (
                    <>
                      <Clock size={16} className="mr-2" />
                      <span>{item.readTime}</span>
                    </>
                  )}
                </>
              ) : (
                <>
                  {item.host && (
                    <>
                      <Mic size={16} className="mr-2" />
                      <span className="mr-4">{item.host}</span>
                    </>
                  )}
                  {item.date && (
                    <>
                      <Calendar size={16} className="mr-2" />
                      <span className="mr-4">{item.date}</span>
                    </>
                  )}
                  {item.duration && (
                    <>
                      <Clock size={16} className="mr-2" />
                      <span>{item.duration}</span>
                    </>
                  )}
                </>
              )}
            </div>
            {item.type === 'blog' ? (
              <p className="text-gray-300 leading-relaxed">
                {expandedPost === index ? item.content : `${item.content.substring(0, 300)}...`}
              </p>
            ) : (
              <>
                <p className="text-gray-300 leading-relaxed mb-4">{item.description}</p>
                {item.audioUrl && (
                  <audio controls className="w-full">
                    <source src={item.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </>
            )}
            {item.type === 'blog' && item.content && item.content.length > 300 && (
              <button 
                onClick={() => togglePost(index)}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                {expandedPost === index ? t('read_less') : t('read_more')}
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export default BlogPosts;