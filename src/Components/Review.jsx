import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Review() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [feedbackList, setFeedbackList] = useState([]);
  
    const handleRatingChange = (ratingValue) => setRating(ratingValue);
  
    const handleHoverEnter = (ratingValue) => setHover(ratingValue);
  
    const handleHoverLeave = () => setHover(null);
  
    const handleFeedbackChange = (e) => setFeedback(e.target.value);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (rating && feedback.trim()) {
        const newFeedback = { id: Date.now(), rating, feedback };
        setFeedbackList([newFeedback, ...feedbackList]);
        setRating(null);
        setFeedback("");
      } else {
        alert("Please provide both a rating and feedback!");
      }
    };
  
    return (
      <div className="container my-4">
        <h2 className="text-center mb-4 text-primary fw-bold">We Value Your Feedback</h2>
        <div className="d-flex justify-content-center mb-4">
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  style={{ display: "none" }}
                  value={ratingValue}
                  onClick={() => handleRatingChange(ratingValue)}
                />
                <FaStar
                  size={50}
                  className={`me-1 ${
                    ratingValue <= (hover || rating) ? "text-warning" : "text-secondary"
                  } hover-effect`}
                  onMouseEnter={() => handleHoverEnter(ratingValue)}
                  onMouseLeave={handleHoverLeave}
                />
              </label>
            );
          })}
        </div>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <textarea
              placeholder="Share your thoughts here..."
              value={feedback}
              onChange={handleFeedbackChange}
              className="form-control border-primary shadow-sm"
              rows="4"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary px-5 py-2 shadow">Submit Feedback</button>
          </div>
        </form>
        <div>
          <h3 className="mb-3 text-success">User Feedback</h3>
          <div className="row g-3">
            {feedbackList.map((entry) => (
              <div key={entry.id} className="col-md-4">
                <div className="card border-0 shadow-lg">
                  <div className="card-body">
                    <div className="mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={20}
                          className={i < entry.rating ? "text-warning" : "text-secondary"}
                        />
                      ))}
                    </div>
                    <p className="card-text text-muted">{entry.feedback}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default Review;
