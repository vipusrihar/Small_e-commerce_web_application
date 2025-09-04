import React, { useState } from "react";
import {
  Box,
  Chip,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBookById } from "../state/books/bookAction";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...(theme?.typography?.body2),
  padding: theme?.spacing?.(2) ?? 16,
  textAlign: "center",
  color: theme?.palette?.text?.secondary ?? "#444",
  position: "relative",
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

const SingleBook = ({ book }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleViewBook = (bookId) => {
    dispatch(getBookById(bookId));
    navigate(`/book/${bookId}`);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Grid size={3} key={book.id}>
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

            <Box
              component="img"
              src={book.imageLink}
              alt={book.title}
              sx={{
                width: "100%",
                height: 200,
                objectFit: "cover",
              }}
            />

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
            {book.title}
          </Typography>
        </Item>
      </Grid>
    </>
  );
};

export default SingleBook;
