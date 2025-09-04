import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { searchBooks } from '../state/books/bookAction';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import SingleBook from './SingleBook';




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  marginTop: 10,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.85),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.95),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  border: '2px solid black',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '50ch',
      '&:focus': {
        width: '60ch',
      },
    },
  },
}));


const BooksList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books) || [];
  const [searchText, setSearchText] = useState('');


  useEffect(() => {
    dispatch(searchBooks(searchText));
  }, [dispatch, searchText]);

  return (
    <>
      <Box sx={{ pt: 0, mt: 0 }}>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', mt: 0 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..........By book Name or By Author Name or By ISBN number"
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Search>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Grid container spacing={4}>
          {books.map((book) => (
            <SingleBook key={book.id} book={book} />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default BooksList;
