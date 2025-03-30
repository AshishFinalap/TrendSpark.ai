

import React, { useState } from "react";  
import PropTypes from "prop-types";  
import styles from "./ProductReview.module.css"; // Using CSS Modules  

const Review = ({ review }) => (  
  <div className={styles.review}>  
    <strong>{review.username}:</strong> {review.comment} - <em>{review.rating}⭐</em>  
  </div>  
);  

Review.propTypes = {  
  review: PropTypes.shape({  
    username: PropTypes.string.isRequired,  
    comment: PropTypes.string.isRequired,  
    rating: PropTypes.number.isRequired,  
  }).isRequired,  
};  

const ProductReview = ({ product }) => {  
  // Provide a safe default for product  
  const safeProduct = product || { name: "", image: "", description: "", reviews: [] };  

  const [reviews] = useState(safeProduct.reviews);  

  const validateReview = (review) => {  
    return review.rating >= 1 && review.rating <= 5;  
  };  

  return (  
    <div className={styles.product}>  
      <h2>{safeProduct.name}</h2>  
      {safeProduct.image && <img src={safeProduct.image} alt={safeProduct.name} />}  
      <p>{safeProduct.description}</p>  
      <h3>Reviews:</h3>  
      <div className={styles.reviewSection}>  
        {reviews.map((review, index) =>  
          validateReview(review) ? <Review key={index} review={review} /> : null  
        )}  
      </div>  
    </div>  
  );  
};  

ProductReview.propTypes = {  
  product: PropTypes.shape({  
    name: PropTypes.string.isRequired,  
    image: PropTypes.string.isRequired,  
    description: PropTypes.string.isRequired,  
    reviews: PropTypes.arrayOf(  
      PropTypes.shape({  
        username: PropTypes.string.isRequired,  
        comment: PropTypes.string.isRequired,  
        rating: PropTypes.number.isRequired,  
      })  
    ),  
  }),  
};  

export default ProductReview;  