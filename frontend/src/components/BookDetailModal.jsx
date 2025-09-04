import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack, Modal, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBookById } from "../state/books/bookAction";
import CloseIcon from "@mui/icons-material/Close";

// Sanitize text to prevent XSS
const sanitizeText = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

const BookDetailModal = ({ open, handleClose, bookId }) => {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (bookId) dispatch(getBookById(bookId));
  }, [dispatch, bookId]);

  const book = useSelector((state) => state.books.selectedBook);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="book-detail-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: { xs: 2, md: 4 },
          width: { xs: "90%", md: "50%" },
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {!book ? (
          <Typography variant="h6" textAlign="center" mt={4}>
            Loading...
          </Typography>
        ) : (
          <Grid container spacing={4} alignItems="center">
            <Grid >
              <Box
                component="img"
                src={book.imageLink}
                alt={sanitizeText(book.title)}
                sx={{
                  width: "100%",
                  height: { xs: 300, md: 450 },
                  objectFit: "cover",
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.3s",
                  transform: hovered ? "scale(1.05)" : "scale(1)",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              />
            </Grid>

            <Grid >
              <Stack spacing={2}>
                <Typography variant="h4" fontWeight="bold">
                  {sanitizeText(book.title)}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary">
                  by {sanitizeText(book.author)}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary">
                  Rs. {sanitizeText(book.price)}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {sanitizeText(book.description) || "No description available."}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        )}
      </Box>
    </Modal>
  );
};

export default BookDetailModal;
