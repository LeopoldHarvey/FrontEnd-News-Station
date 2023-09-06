import { useState, useEffect } from "react";
import { getArticles } from "../../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Articles = () => {
  const [total, setTotal] = useState(0);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isVoteError, setIsVoteError] = useState(null);

  const navigate = useNavigate();
  const navigateToArticle = (id) => {
    navigate(`/articles/${id}`);
  };

  useEffect(() => {
    setIsLoading(true);
    getArticles()
      .then(({ articles, total_count }) => {
        setArticles(articles);
        setTotal(total_count);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error. This has not worked </h1>;

  return (
    <>
      <ul className="articles-container">
        {articles.map((article) => {
          return (
            <li
             
            onClick={() => {
              navigateToArticle(article.article_id);
            }}
            key={article.article_id}
            className="article"
          >
            <Link
                to={`/articles/${article.article_id}`}
                className="article-title"
              >
                <h2>{article.title}</h2>
              </Link>
              <div className="article-info">
                <div className="creation-facts">
                  <p className="article-author">{article.author}</p>
                  <p className="article-creation">
                    {article.created_at.slice(0, 10)}
                  </p>
                </div>
                <div className="article-votes-comments">
                  <p>Comments: {article.comment_count}</p>
                  <p>Votes: {article.votes}</p>
                </div>
                <img
                  className="article-img"
                  src={article.article_img_url}
                ></img>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Articles;