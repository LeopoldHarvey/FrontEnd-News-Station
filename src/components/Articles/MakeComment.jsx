import { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContexts";
import { postCommentByArticleId } from "../../api";

const MakeComment = ({ article_id, comments, setComments }) => {
    const { user } = useContext(UserContext);
    const [formInput, setFormInput] = useState("");
    const [isSubmitError, setIsSubmitError] = useState(false);
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  
    const handleChange = (event) => {
      setFormInput(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const copyComments = [...comments];
      setIsSubmitError(false);
      const currentDate = new Date().toJSON().slice(0, 10);
      const newComment = {
        comment_id: 1000,
        author: user,
        body: formInput,
        created_at: currentDate,
      };


      setComments((currComments) => {
        return [newComment, ...currComments];
      });


      setFormInput("");
      setIsSubmitSuccess(true);
      postCommentByArticleId(article_id, user, formInput).catch((err) => {
        setComments(copyComments);
        setIsSubmitSuccess(false);
        setIsSubmitError(true);
      });
      
    };
  
  
    return (
      <div className="comment-form">
        <h3>Lets add your thoughts on this breaking story!!!</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            name="comment-form-input"
            id="comment-form-input"
            type="text-area"
            placeholder="Enter your comment here. The minimum length - 10 characters"
            value={formInput}
            onChange={handleChange}
          />
          <br />
          <button disabled={formInput.length <= 9}>Submit comment</button>
          {formInput.length <= 9 ? (
            <p>Please submit a comment with at least 10 characters</p>
          ) : null}
        </form>
      </div>
    );
  };
  
  export default MakeComment;

  
  
  
  
  
  