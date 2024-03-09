import React, { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  Typography,
  TextField,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Grid,
  MenuItem,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "../../../store/Store";
import { fetchNotes, SelectNote, DeleteNote, SearchNotes } from "../../../store/apps/notes/NotesSlice";
import { IconTrash } from "@tabler/icons-react";
import { NotesType } from "../../../types/apps/notes";
import CustomFormLabel from "../../forms/theme-elements/CustomFormLabel";
import CustomSelect from "../../forms/theme-elements/CustomSelect";

const NoteList = () => {
  const dispatch = useDispatch();
  const activeNote = useSelector((state) => state.notesReducer.notesContent);
  const searchTerm = useSelector((state) => state.notesReducer.noteSearch);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const filterNotes = (notes: NotesType[], nSearch: string) => {
    if (nSearch !== "")
      return notes.filter(
        (note) => 
          !note.deleted &&
          note.title!.toLowerCase().includes(nSearch.toLowerCase()) 
      );

    return notes.filter((note) => !note.deleted);
  };

  const notes = useSelector((state) =>
    filterNotes(state.notesReducer.notes, state.notesReducer.noteSearch)
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [country, setCountry] = React.useState('');
  const countries = [
    {
      value: 'india',
      label: '계약종료 확인 필요',
    },
    {
      value: 'uk',
      label: '담당자 연락 불가',
    },
    {
      value: 'srilanka',
      label: '점검 거부',
    },
    {
      value: 'srila',
      label: '기타',
    },
  ];
  const handleChange = (event: any) => {
    setCountry(event.target.value);
  };

  return (
    <>
      <Box p={3} px={2}>
      <Typography>발신사유</Typography> 
          
      <CustomSelect
        id="standard-select-currency"
        value={country}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      >
        {countries.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </CustomSelect>
      <Typography>위탁사 명</Typography> 
      <TextField
        id="search"
        value={searchTerm}
        placeholder="Search Notes"
        inputProps={{ "aria-label": "Search Notes" }}
        size="small"
        type="search"
        variant="outlined" 
        onChange={(e) => dispatch(SearchNotes(e.target.value))}
      />
      <Typography>수탁사 명</Typography> 
      <TextField
        id="search"
        value={searchTerm}
        placeholder="Search Notes"
        inputProps={{ "aria-label": "Search Notes" }}
        size="small"
        type="search"
        variant="outlined" 
        onChange={(e) => dispatch(SearchNotes(e.target.value))}
      />
      <Button variant="contained" color="primary">검색</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>발신사유</TableCell>
              <TableCell>위탁사 명</TableCell>
              <TableCell>수탁사 명</TableCell>
              <TableCell align="right">발신일</TableCell>
              <TableCell align="right">상세</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((note) => (
                <TableRow
                  key={note.id}
                  sx={{
                    backgroundColor: note.id === activeNote ? note.color : undefined,
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                  onClick={() => dispatch(SelectNote(note.id))}
                >
                  <TableCell component="th" scope="row">
                    {note.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {note.title}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {note.title}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {note.title}
                  </TableCell>
                  <TableCell align="right">
                    {new Date(note.datef).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Delete">
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={(event) => {
                          event.stopPropagation();
                          dispatch(DeleteNote(note.id));
                        }}
                      >
                        <IconTrash width={18} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={notes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default NoteList;
