import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const blogPosts = [
  // ... (keep the existing blog posts)
];

function BlogPosts() {
  const { t } = useTranslation();
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  const togglePost = (index: number) => {
    setExpandedPost(expandedPost === index ? null : index);
  };

  return (
    <div className="space-y-12 text-white">
      <h2 className="text-3xl font-light mb-8">{t('astrology_blog')}</h2>
      {blogPosts.map((post, index) => (
        <article key={index} className="mb-12 bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h3 className="text-2xl font-light mb-4">{post.title}</h3>
            <p className="text-gray-300 leading-relaxed">
              {expandedPost === index ? post.content : `${post.content.substring(0, 200)}...`}
            </p>
            <button 
              onClick={() => togglePost(index)}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              {expandedPost === index ? t('read_less') : t('read_more')}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default BlogPosts;