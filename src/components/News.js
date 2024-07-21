import React, { useEffect, useState } from 'react';

const News = ({ setProgress, apiKey, pageSize, country, category }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setProgress(30);
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.articles) {
          setArticles(data.articles);
        } else {
          throw new Error('No articles found');
        }
        setProgress(100);
      } catch (error) {
        setError(error.message);
        setProgress(100);
      }
    };
    fetchNews();
  }, [category, setProgress, apiKey, pageSize, country]);

  return (
    <div>
      <h2>Top {category.charAt(0).toUpperCase() + category.slice(1)} Headlines</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {articles.length > 0 ? (
            articles.map(article => (
              <div key={article.url}>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
              </div>
            ))
          ) : (
            <p>No articles available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default News;
