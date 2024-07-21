import React, { useEffect, useState, useCallback } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country = 'in', pageSize = 8, category = 'general', apiKey, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const sanitizeUrl = (url) => {
    // Function to sanitize and fix URLs if necessary
    try {
      let sanitizedUrl = new URL(url);
      return sanitizedUrl.href;
    } catch (e) {
      return null; // Return null if URL is invalid
    }
  };

  const updateNews = useCallback(async () => {
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=1&pageSize=${pageSize}`;
    setLoading(true);
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let parsedData = await response.json();
      setProgress(30);
      const sanitizedArticles = parsedData.articles.map(article => ({
        ...article,
        urlToImage: sanitizeUrl(article.urlToImage)
      }));
      setArticles(sanitizedArticles || []);
      setTotalResults(parsedData.totalResults || 0);
      setPage(1); // Reset page to 1 when category changes
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
      setProgress(100);
    }
  }, [country, category, apiKey, pageSize, setProgress]);

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NewsRealm`;
    updateNews();
  }, [category, updateNews]);

  const fetchMoreData = async () => {
    const newPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${newPage}&pageSize=${pageSize}`;
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let parsedData = await response.json();
      const sanitizedArticles = parsedData.articles.map(article => ({
        ...article,
        urlToImage: sanitizeUrl(article.urlToImage)
      }));
      setArticles((prevArticles) => prevArticles.concat(sanitizedArticles || []));
      setTotalResults(parsedData.totalResults || 0);
      setPage(newPage);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: `40px 0px`, marginTop: '90px' }}>
        NewsRealm - Top {capitalizeFirstLetter(category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title || "No Title"}
                  description={element.description || "No Description"}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
