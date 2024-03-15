
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { apiUrl } from '@src/utils/commonValues';

const AddInquiry = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [author, setAuthor] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowPasswordInput(false);
  };
  const handleSetPasswordClick = () => {
    setShowPasswordInput(true); // 비밀번호 입력 필드 표시
  };

  const handleSubmit = async () => {
    const inquiryData = {
      title,
      content,
      password,
      author,
      created_date: createdDate,
    };

    const API_URL = `http://${apiUrl}inquiry`;
    try {
      const response = await axios.post(`${API_URL}/register`, inquiryData);

      if (response.status === 200) {
        // Handle successful response
        console.log('Inquiry submitted successfully:', response.data);
        // Reset form and close dialog
        setOpen(false);
        setTitle('');
        setContent('');
        setPassword('');
        setAuthor('');
        setCreatedDate('');
      } else {
        // Handle non-200 responses
        console.error('Failed to submit the inquiry:', response.data);
      }
    } catch (error:any) {
      console.error('Error submitting the inquiry:', error.message);
    }
  };

  return (
    <>
      <Button onClick={handleClickOpen} disableElevation color="primary" variant="contained" sx={{ width: 150 }}>
        문의 추가
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h5" mb={2} fontWeight={700}>
            새로운 문의 등록
          </Typography>
          <DialogContentText>
            문의를 등록하기 위해 아래 정보를 입력해 주세요.
          </DialogContentText>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            id="inquiry-title"
            label="제목"
            type="text"
            fullWidth
            size="small"
            variant="outlined"
          />
          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
            id="inquiry-content"
            label="내용"
            type="text"
            fullWidth
            multiline
            rows={4}
            size="small"
            variant="outlined"
          />
          {showPasswordInput ? (
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              id="inquiry-password"
              label="비밀번호"
              type="password"
              fullWidth
              size="small"
              variant="outlined"
            />
          ) : (
            <Button onClick={handleSetPasswordClick} color="secondary" variant="outlined" sx={{ my: 2 }}>
              비밀번호 설정
            </Button>
          )}
          <TextField
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            margin="normal"
            id="inquiry-author"
            label="저자"
            type="text"
            fullWidth
            size="small"
            variant="outlined"
          />
          <TextField
            value={createdDate}
            onChange={(e) => setCreatedDate(e.target.value)}
            margin="normal"
            id="inquiry-created-date"
            label="생성 날짜"
            type="date"
            fullWidth
            size="small"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button
            onClick={handleSubmit}
            disabled={!title || !content || !password || !author || !createdDate}
            variant="contained"
          >
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddInquiry;
