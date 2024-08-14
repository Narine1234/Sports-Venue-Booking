import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './AccordionQnA.css';

const initialQuestions = [
  {
    question: 'In this book text book exercises are included',
    answer: "This book doesn't have exercises but has MCQs, very short, short, long, case study type of questions for a particular chapter.",
    customer: 'Ajit Gupta',
    verified: true,
    thumbsUp: 9,
    thumbsDown: 0,
  },
  {
    question: "It's only MCQ",
    answer: 'It has but very less.',
    customer: 'Flipkart Customer',
    verified: true,
    thumbsUp: 4,
    thumbsDown: 0,
  },
  {
    question: 'Is there solutions in this',
    answer: 'Yes.',
    customer: 'Anonymous',
    verified: true,
    thumbsUp: 3,
    thumbsDown: 0,
  },
  {
    question: 'Did it have all answers??',
    answer: 'Yes.',
    customer: 'Anonymous',
    verified: true,
    thumbsUp: 3,
    thumbsDown: 0,
  },
];

export default function QnASection() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLike = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].thumbsUp += 1;
    setQuestions(newQuestions);
  };

  const handleDislike = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].thumbsDown += 1;
    setQuestions(newQuestions);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className="qna-container">
      <Typography variant="h5" className="qna-header">Questions and Answers</Typography>
      <Paper component="form" className="qna-search-bar">
        <IconButton>
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Have a question? Search for answers"
          inputProps={{ 'aria-label': 'search questions' }}
          value={searchTerm}
          onChange={handleSearch}
        />
      </Paper>
      <Box className="qna-list">
        {filteredQuestions.map((item, index) => (
          <React.Fragment key={index}>
            <Box className="qna-item">
              <Typography variant="body1" className="qna-question">
                Q: {item.question}
              </Typography>
              <Typography variant="body2" className="qna-answer">
                A: {item.answer}
              </Typography>
              <Box className="qna-footer">
                <Box className="qna-customer">
                  <Typography variant="caption">{item.customer}</Typography>
                  {item.verified && (
                    <CheckCircleIcon fontSize="small" className="qna-verified" />
                  )}
                  <Typography variant="caption" color="textSecondary">
                    Certified Buyer
                  </Typography>
                </Box>
                <Box className="qna-voting">
                  <IconButton onClick={() => handleLike(index)} size="small">
                    <ThumbUpIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="caption">{item.thumbsUp}</Typography>
                  <IconButton onClick={() => handleDislike(index)} size="small">
                    <ThumbDownIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="caption">{item.thumbsDown}</Typography>
                </Box>
              </Box>
            </Box>
            {index < filteredQuestions.length - 1 && <hr className="qna-divider" />}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}
