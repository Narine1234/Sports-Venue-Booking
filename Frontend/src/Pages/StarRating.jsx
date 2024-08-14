import React from 'react';
import IconButton from '@mui/joy/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <IconButton
            type="button"
            key={index}
            className={index <= rating ? "text-warning" : "text-muted"}
            onClick={() => setRating(index)}
          >
            {index <= rating ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        );
      })}
    </div>
  );
};

export default StarRating;
