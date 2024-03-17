import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
  Typography,
} from '@mui/material';

// 예제로 사용할 addCompany 액션입니다.
// 실제로 이 액션을 사용하기 위해서는 해당 액션을 정의하고 Redux 스토어에 추가해야 합니다.
import { registerCompany,fetchCompanies } from '@src/store/apps/CompanySlice';
import { AppDispatch } from '@src/store/Store';

const AddCompany = () => { 
  const dispatch: AppDispatch = useDispatch(); // 여기에서 타입을 명시합니다.

  const [open, setOpen] = useState(false);
  const [registerNum, setRegisterNum] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} disableElevation color="primary" variant="contained" sx={{width:150}}>업체 등록</Button>
       
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h5" mb={2} fontWeight={700}>
            새로운 회사 등록
          </Typography>
          <DialogContentText>
            새로운 회사를 등록하기 위해 등록 번호와 회사 이름을 입력한 후, 제출 버튼을 눌러주세요.
          </DialogContentText>
          <TextField
            value={registerNum}
            onChange={(e) => setRegisterNum(e.target.value)}
            margin="normal"
            id="register-num"
            label="등록 번호"
            type="text"
            fullWidth
            size="small"
            variant="outlined"
          />
          <TextField
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            margin="normal"
            id="company-name"
            label="회사 이름"
            type="text"
            fullWidth
            size="small"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button
            disabled={!registerNum || !companyName} // 등록번호와 회사이름이 모두 입력되지 않으면 버튼 비활성화
            onClick={() => {
              // registerCompany 액션에 필요한 데이터 포맷으로 매개변수를 전달하고, 비동기 액션을 디스패치합니다. 
              dispatch(registerCompany(  { register_num: registerNum, company_name: companyName  }))
                .unwrap() // createAsyncThunk에서 반환된 promise 처리
                .then(() => {
                  dispatch(fetchCompanies());
                  // 액션 성공 시 실행할 로직
                  setOpen(false); // 다이얼로그 닫기
                  setRegisterNum(''); // 입력 필드 초기화
                  setCompanyName(''); // 입력 필드 초기화
                })
                .catch((error:any) => {
                  // 액션 실패 시 실행할 로직 (에러 처리)
                  console.error("Failed to register the company:", error);
                });
            }}
            variant="contained"
          >
            제출
          </Button>

        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddCompany;
