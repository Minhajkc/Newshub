import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const placeholderImage = 'https://picsum.photos/seed/picsum/800/600';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'in',
            apiKey: 'b4048cbb82704fe4bd247e9ca6216430',
          },
        });
        setArticles(response.data.articles);
      } catch (error) {
        setError('Failed to fetch news articles');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  console.log(articles, 'aaa');

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center text-red-600 text-2xl mt-20 font-bold">{error}</div>
  );

  return (
    <div className=" min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-gray-800">Latest News from India</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img 
                src={article.urlToImage || placeholderImage} 
                alt={article.title || 'News image'} 
                className="w-full h-64 object-cover"
                onError={(e) => {e.target.src = placeholderImage}}
              />
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-4 line-clamp-2 text-gray-800">{article.title}</h2>
                <p className="text-lg text-gray-600 mb-6 line-clamp-3">{article.description}</p>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;