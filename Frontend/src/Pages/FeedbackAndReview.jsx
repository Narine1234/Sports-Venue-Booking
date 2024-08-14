import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  AspectRatio,
} from '@mui/joy';
import ThumbUp from '@mui/icons-material/ThumbUp';
import ReportProblem from '@mui/icons-material/ReportProblem';
import Rating from '@mui/material/Rating';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { Form } from 'react-bootstrap';
import ph1 from '../th(1).jpeg';
import ph2 from '../th(2).jpeg';
import ph3 from '../th(3).jpeg';
import ph4 from '../th(4).jpeg';
import ph5 from '../th(5).jpeg';
import ph6 from '../th(6).jpeg';

const photosData = [ph1, ph2, ph3, ph4, ph5, ph6];

const initialReviewsData = [
  {
    name: 'John Doe',
    rating: 5,
    title: 'Great service!',
    content: 'I really enjoyed the experience.',
    helpful: 12,
    profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Jane Smith',
    rating: 4,
    title: 'Good service',
    content: 'Good service but room for improvement.',
    helpful: 8,
    profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Bob Brown',
    rating: 3,
    title: 'Average experience',
    content: 'It was okay.',
    helpful: 5,
    profilePic: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Alice Johnson',
    rating: 4,
    title: 'Pretty good!',
    content: 'Would come again.',
    helpful: 9,
    profilePic: 'https://randomuser.me/api/portraits/women/56.jpg',
  },
  {
    name: 'Chris Evans',
    rating: 2,
    title: 'Not what I expected',
    content: 'Could be better.',
    helpful: 3,
    profilePic: 'https://randomuser.me/api/portraits/men/14.jpg',
  },
  {
    name: 'Emma White',
    rating: 5,
    title: 'Exceptional service',
    content: 'Friendly staff!',
    helpful: 15,
    profilePic: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
];

export default function FeedbackAndReview() {
  const [reviewName, setReviewName] = useState('');
  const [photoIndex, setPhotoIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [likedReviews, setLikedReviews] = useState({});
  const [file, setFile] = useState(null);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewsData, setReviewsData] = useState(initialReviewsData);

  const handleNextPhoto = () => {
    setPhotoIndex((prevIndex) => (prevIndex + 1) % photosData.length);
  };

  const handlePreviousPhoto = () => {
    setPhotoIndex((prevIndex) => (prevIndex - 1 + photosData.length) % photosData.length);
  };

  const handleLikeReview = (index) => {
    setLikedReviews((prevLikes) => ({
      ...prevLikes,
      [index]: !prevLikes[index],
    }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    const newReview = {
      name: reviewName,
      rating,
      title: reviewTitle,
      content: reviewContent,
      profilePic: 'https://randomuser.me/api/portraits/men/32.jpg', // Replace this with actual profile picture URL
      helpful: 0, // Initial helpful count
    };

    try {
      const response = await fetch('http://localhost:8088/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        console.log('Review submitted successfully');
        // Reset form fields after successful submission
        setReviewName('');
        setRating(0);
        setReviewTitle('');
        setReviewContent('');
        // Update reviewsData state with the new review
        setReviewsData((prevReviews) => [newReview, ...prevReviews]);
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', px: 2, py: 4, textAlign: 'left', mx: 7 }}>
      <Typography
        level="h4"
        sx={{
          fontSize: '1.5rem',
          borderBottom: '2px solid #007bff',
          paddingBottom: '5px',
          marginBottom: '2rem',
          color: '#232f3e',
        }}
      >
        Customer Reviews
      </Typography>

      {/* Review Summary */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating value={4.4} precision={0.1} readOnly sx={{ fontSize: '2rem' }} />
          <Typography level="body1" sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 } }}>
            4.4 out of 5 stars
          </Typography>
        </Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 0 }}
        >
          {photosData.slice(photoIndex, photoIndex + 3).map((photo, index) => (
            <AspectRatio key={index} ratio="1" sx={{ width: '100px', height: '100px', mx: 1 }}>
              <img src={photo} alt={`Review photo ${photoIndex + index + 1}`} />
            </AspectRatio>
          ))}
          <IconButton onClick={handlePreviousPhoto} sx={{ ml: 1 }}>
            <ArrowBackIos />
          </IconButton>
          <IconButton onClick={handleNextPhoto} sx={{ ml: 1 }}>
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Box>

      {/* Reviews */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
          maxHeight: '400px',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: '#888 #e0e0e0',
        }}
      >
        {reviewsData.map((review, index) => (
          <Card
            key={index}
            variant="outlined"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, mb: 2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AspectRatio ratio="1" sx={{ width: 60, borderRadius: '50%', overflow: 'hidden', mr: 2 }}>
                  <img src={review.profilePic} alt={review.name} />
                </AspectRatio>
                <Box>
                  <Typography level="body1" fontWeight="bold">
                    {review.name}
                  </Typography>
                  <Rating value={review.rating} readOnly sx={{ mt: 0.5 }} />
                </Box>
              </Box>
            </Box>
            <CardContent sx={{ flex: 1 }}>
              <Typography level="body2" sx={{ mb: 1 }}>
                {review.content}
              </Typography>
            </CardContent>
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  color={likedReviews[index] ? 'primary' : 'neutral'}
                  onClick={() => handleLikeReview(index)}
                >
                  <ThumbUp />
                </IconButton>
                <Typography level="body2">
                  {likedReviews[index] ? parseInt(review.helpful) + 1 : review.helpful}
                </Typography>
              </Box>
              <Button variant="outlined" color="warning" startIcon={<ReportProblem />}>
                Report
              </Button>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Leave Your Feedback Form */}
      <Box sx={{ mt: 4, borderTop: '2px solid #007bff', pt: 2 }}>
        <Typography level="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Leave Your Feedback
        </Typography>
        <Form onSubmit={handleReviewSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              precision={0.5}
              required
            />
          </Form.Group>

          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Review title"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your review here"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile">
            <Form.Label>Upload Image (optional)</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit Review
          </Button>
        </Form>
      </Box>
    </Box>
  );
}
