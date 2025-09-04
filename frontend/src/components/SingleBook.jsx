import React, { useState } from "react";
import {
  Box,  Chip,  Grid,  IconButton,  Paper,
  Tooltip,  Typography,} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import BookDetailModal from "./BookDetailModal";
import { getBookById } from "../state/books/bookAction";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...(theme?.typography?.body2),
  padding: theme?.spacing?.(2) ?? 16,
  textAlign: "center",
  color: theme?.palette?.text?.secondary ?? "#444",
  position: "relative",
  borderRadius: 8,
  boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
}));

const ImageContainer = styled(Box)({
  position: "relative",
  borderRadius: "5px",
  overflow: "hidden",
  "&:hover .overlay": {
    opacity: 1,
  },
});

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
  zIndex: 2,
});

// Helper to sanitize title
const sanitizeText = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

// Validate image URL
const isValidImageUrl = (url) => /^https?:\/\//i.test(url);

const SingleBook = ({ book }) => {
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleViewBook = (bookId) => {
    if (!bookId) return;
    setSelectedBookId(bookId);
    setModalOpen(true);
    dispatch(getBookById(bookId)); // Optional if modal fetches itself
  };

  const handleClose = () => setModalOpen(false);

  return (
    <Grid  size={3}>
      <Item>
        <ImageContainer>
          <Chip
            label={`Rs. ${book.price}`}
            variant="outlined"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              fontWeight: "bold",
              backgroundColor: "yellow",
              color: "#78350F",
              zIndex: 3,
            }}
          />

          {isValidImageUrl(book.imageLink) ? (
            <Box
              component="img"
              src={book.imageLink}
              alt={sanitizeText(book.title)}
              sx={{
                width: "100%",
                height: 200,
                objectFit: "cover",
              }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: 200,
                backgroundColor: "#eee",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#999",
              }}
            >
              Image Not Available
            </Box>
          )}

          <Overlay className="overlay">
            <Tooltip title="View Book">
              <IconButton
                sx={{ color: "#fff", backgroundColor: "#00000088" }}
                aria-label="View Book"
                onClick={() => handleViewBook(book.id)}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </Overlay>
        </ImageContainer>

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mt: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {sanitizeText(book.title)}
        </Typography>
      </Item>

      <BookDetailModal
        open={modalOpen}
        handleClose={handleClose}
        bookId={selectedBookId}
      />
    </Grid>
  );
};

export default SingleBook;
