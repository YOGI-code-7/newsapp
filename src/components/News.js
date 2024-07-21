import React, { useEffect, useState } from 'react';

const News = ({ setProgress, apiKey, pageSize, country, category }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      setProgress(30);
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(parsedData.articles);
      setProgress(100);
    };
    fetchNews();
  }, [category, setProgress, apiKey, pageSize, country]);

  return (
    <div>
      <h2>Top {category.charAt(0).toUpperCase() + category.slice(1)} Headlines</h2>
      <div>
        {articles.map(article => (
          <div key={article.url}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
