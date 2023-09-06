import { useState } from "react";

import { patchArticleVotes } from "../../api";

const ArticleButton = ({ article, setIsVoteError, setArticle }) => {
  const [isLikedButton, setIsLikedButton] = useState(false);

  const [isDislikeButton, setIsDislikeButton] = useState(false);

  const addLike = (article, num) => {
    const copyArticle = { ...article };
    copyArticle.votes++;
    setArticle(copyArticle);

    setIsVoteError(null);
    patchArticleVotes(article.article_id, num)
      .then(() => {
        setIsLikedButton(true);
      })

      .catch((error) => {
        setIsVoteError("Something went wrong. Please try again");
      });
  };

  const removeAddedLike = (article, num) => {
    const copyArticle = { ...article };
    copyArticle.votes--;
    setArticle(copyArticle);
    setIsVoteError(null);

    patchArticleVotes(article.article_id, num)
      .then(() => {
        setIsLikedButton(false);
      })
      .catch((error) => {
        setIsVoteError("Something went wrong. Please try again");
      });
  };

  const removeTakenLike = (article, num) => {
    const copyArticle = { ...article };
    copyArticle.votes++;
    setArticle(copyArticle);
    setIsVoteError(null);
    patchArticleVotes(article.article_id, num)
      .then(() => {
        setIsDislikeButton(false);
      })

      .catch((error) => {
        setIsVoteError("Something went wrong. Please try again");
      });
  };

  const takeLike = (article, num) => {
    const copyArticle = { ...article };
    copyArticle.votes--;
    setArticle(copyArticle);
    setIsVoteError(null);
    patchArticleVotes(article.article_id, num)
      .then(() => {
        setIsDislikeButton(true);
      })
      .catch((error) => {
        setIsVoteError("Something went wrong. Please try again");
      });
  };

  return (
    <div>
      <button
        disabled={isDislikeButton}
        className={isLikedButton ? "likeButton" : null}
        onClick={() => {
          if (isLikedButton) {
            removeAddedLike(article, -1);
          } else {
            addLike(article, 1);
          }
        }}
      >
        Like
      </button>
      <button
        className={isDislikeButton ? "dislikeButton" : null}
        disabled={isLikedButton}
        onClick={() => {
          if (isDislikeButton) {
            removeTakenLike(article, 1);
          } else {
            takeLike(article, -1);
          }
        }}
      >
        Dislike
      </button>
    </div>
  );
};

export default ArticleButton;
