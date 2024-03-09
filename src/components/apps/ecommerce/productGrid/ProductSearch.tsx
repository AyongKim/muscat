// material
import { TextField, InputAdornment } from '@mui/material';
import { IconSearch } from '@tabler/icons-react';

// redux
import { useDispatch } from '../../../../store/Store';
import { SearchProduct } from '../../../../store/apps/eCommerce/ECommerceSlice';

// ----------------------------------------------------------------------
export default function ProductSearch() {
  const dispatch = useDispatch();

  return (
    <>
      {/* ------------------------------------------- */}
      {/* Sort Button */}
      {/* ------------------------------------------- */}
      <TextField
        id="outlined-search"
        placeholder="검색"
        size="small"
        type="search"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconSearch size="14" />
            </InputAdornment>
          ),
        }}
        fullWidth
        onChange={(e) => dispatch(SearchProduct(e.target.value))}
      />
    </>
  );
}
