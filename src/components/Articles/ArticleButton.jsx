import { useState } from "react";

import { patchArticleVotes } from "../../api";

const ArticleButton = ({ article, setIsVoteError, setArticle }) => {
  const [isLikeButton, setIsLikeButton] = useState(false);
  const [isDislikeButton, setIsDislikeButton] = useState(false);

  const changeLike = (article, num, button) => {
    const copyArticle = { ...article };
    if (num === 1) {
      copyArticle.votes++;
    } else {
      copyArticle.votes--;
    }
    setArticle(copyArticle);
    setIsVoteError(null);
    patchArticleVotes(article.article_id, num)
      .then(() => {
        if (button === "like") {
          setIsLikeButton(!isLikeButton);
        } else {
          setIsDislikeButton(!isDislikeButton);
        }
      })
      .catch((error) => {
        setIsVoteError("Something went wrong. Please try again");
      });
  };
  return (
    <div>
      <button
        disabled={isDislikeButton}
        className={isLikeButton ? "clicked-like" : null}
        onClick={() => {
          if (isLikeButton) {
            changeLike(article, -1, "like");
          } else {
            changeLike(article, 1, "like");
          }
        }}
      >
        Like
      </button>
      <button
        className={isDislikeButton ? "clicked-dislike" : null}
        disabled={isLikeButton}
        onClick={() => {
          if (isDislikeButton) {
            changeLike(article, 1, "dislike");
          } else {
            changeLike(article, -1, "dislike");
          }
        }}
      >
        Dislike
      </button>
    </div>
  );
};
export default ArticleButton;
