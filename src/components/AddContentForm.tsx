import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface BlogPost {
  id: number;
  title: string;
  author?: string;
  date?: string;
  readTime?: string;
  image?: string;
  content?: string;
  type: 'blog';
}

interface Podcast {
  id: number;
  title: string;
  host?: string;
  date?: string;
  duration?: string;
  audioUrl?: string;
  description?: string;
  type: 'podcast';
}

type Content = BlogPost | Podcast;

interface AddContentFormProps {
  onAddContent: (content: Content) => void;
  onCancel: () => void;
}

const AddContentForm: React.FC<AddContentFormProps> = ({ onAddContent, onCancel }) => {
  const { t } = useTranslation();
  const [contentType, setContentType] = useState<'blog' | 'podcast'>('blog');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [readTime, setReadTime] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [host, setHost] = useState('');
  const [duration, setDuration] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContent: Content = contentType === 'blog'
      ? {
          id: Date.now(),
          title,
          author: author || undefined,
          date: date || undefined,
          readTime: readTime || undefined,
          image: image || undefined,
          content: content || undefined,
          type: 'blog'
        }
      : {
          id: Date.now(),
          title,
          host: host || undefined,
          date: date || undefined,
          duration: duration || undefined,
          audioUrl: audioUrl || undefined,
          description: description || undefined,
          type: 'podcast'
        };
    onAddContent(newContent);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 p-6 rounded-lg mb-8">
      <h3 className="text-2xl font-light mb-4">{t('add_new_content')}</h3>
      <div className="mb-4">
        <label className="block mb-2">
          <input
            type="radio"
            value="blog"
            checked={contentType === 'blog'}
            onChange={() => setContentType('blog')}
            className="mr-2"
          />
          Blog Post
        </label>
        <label className="block">
          <input
            type="radio"
            value="podcast"
            checked={contentType === 'podcast'}
            onChange={() => setContentType('podcast')}
            className="mr-2"
          />
          Podcast
        </label>
      </div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 bg-white bg-opacity-20 rounded"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 mb-4 bg-white bg-opacity-20 rounded"
      />
      {contentType === 'blog' ? (
        <>
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 mb-4 bg-white bg-opacity-20 rounded"
          />
          <input
            type="text"
            placeholder="Read Time (e.g., 5 min read)"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            className="w-full p-2 mb-4 bg-white bg-opacity-20 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, setImage)}
            className="w-full p-2 mb-4 bg-white bg-opacity-20 rounded"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 mb-4 bg-white bg-opacity-20 rounded"
            rows={6}
          ></textarea>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Host"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="w-full p-2 mb-4 bg-white bg-opacity-20 rounded"
          />
          <input
            type="text"
            placeholder="Duration (e.g., 30 min)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 mb-4 bg-white bg-opacity-20 rounded"
          />
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => handleFileUpload(e, setAudioUrl)}
            className="w-full p-2 mb-4 bg-white bg-opacity-20 rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-4 bg-white bg-opacity-20 rounded"
            rows={4}
          ></textarea>
        </>
      )}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300"
        >
          Add Content
        </button>
      </div>
    </form>
  );
};

export default AddContentForm;