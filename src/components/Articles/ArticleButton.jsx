import { useState } from "react";

import { patchArticleVotes } from "../../api";

const ArticleButton = ({ article, setIsVoteError, setArticle }) => {
  const [isDislikeButton, setIsLikeButtonisDislikeButton] = useState(false);
  const [isDislikeButtonisDislikeButton, setIsDislikeButtonisDislikeButton] = useState(false);

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
          setIsLikeButtonisDislikeButton(!isDislikeButton);
        } else {
          setIsDislikeButtonisDislikeButton(!isDislikeButtonisDislikeButton);
        }
      })
      .catch((error) => {
        setIsVoteError("Something went wrong. Please try again");
      });
  };
  return (
    <div>
      <button
        disabled={isDislikeButtonisDislikeButton}
        className={isDislikeButton ? "clicked-like" : null}
        onClick={() => {
          if (isDislikeButton) {
            changeLike(article, -1, "like");
          } else {
            changeLike(article, 1, "like");
          }
        }}
      >
        Like
      </button>
      <button
        className={isDislikeButtonisDislikeButton ? "clicked-dislike" : null}
        disabled={isDislikeButton}
        onClick={() => {
          if (isDislikeButtonisDislikeButton) {
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
