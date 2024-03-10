// src/components/DeleteCompanies.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'; 
import { deleteCompanies } from '../../../store/apps/CompanySlice';
import { AppDispatch } from '../../../store/Store';

interface DeleteCompaniesProps {
  selectedCompanyIds: string;
  onClose?: () => void;
}

const DeleteCompanies: React.FC<DeleteCompaniesProps> = ({ selectedCompanyIds, onClose }) => {
  const dispatch: AppDispatch = useDispatch(); // 여기에서 타입을 명시합니다.

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
    if (onClose) onClose();
  };

  const handleDelete = (): void => {
    if (selectedCompanyIds.length > 0) {
      dispatch(deleteCompanies(selectedCompanyIds))
        .unwrap()
        .then(() => {
          console.log("Companies successfully deleted");
          handleClose();
        })
        .catch((error: any) => {
          console.error("Failed to delete companies:", error);
        });
    }
  };

  return (
    <>
      <Button variant="contained" color="error"  sx={{width:150, mr:1}} onClick={handleClickOpen} disabled={selectedCompanyIds.length === 0}>
        업체 삭제
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>업체 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            선택한 업체들을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleDelete} color="error">삭제</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteCompanies;
