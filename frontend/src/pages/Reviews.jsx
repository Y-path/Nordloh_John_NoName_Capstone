import ReviewForm from "../components/ReviewForm";
import React, { useState, useEffect } from 'react';


export const Reviews = function() {

    const [reviews, setReviews] = useState([]);

    
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const response = await fetch('http://localhost:5000/reviews'); 
          const data = await response.json();
          setReviews(data); 
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      };
  
      fetchReviews();
    }, []); 

    const handleReviewPosted = (newReview) => {
        
        setReviews((prevReviews) => [newReview, ...prevReviews]);
      };


    return (
    <div className="reviews-container flex w-full p-20">
    
    <div className="reviews-list w-full p-20">
    <h2>Latest Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="review mb-5 p-4 border-b ">
            <div className="review-header flex items-center mb-2">
              {/* <img
                // src={review.photoUrl} 
                alt={review.name}
                className="review-photo w-12 h-12 rounded-full mr-4"
              /> */}
              
              <div className="review-info">
                <h3 className="font-semibold">{review.name}</h3>
                <p className="text-sm text-white-500">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <p>{review.review}</p>
          </div>
        ))
      )}
    </div>

 
 <div className="review-form w-full p-20 bg-white-500 border-l">
        <ReviewForm onPost={handleReviewPosted}/>
      </div>
    </div>
  );
}
//     return(
//         <>
//         <h1>Reviews</h1>
//         <ReviewForm/>
//         </>
//     )
// }