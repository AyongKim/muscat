import Breadcrumb from '@src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@src/components/container/PageContainer';
import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box, TextField, InputLabel, MenuItem } from '@mui/material';
import CustomSelect from '@src/components/forms/theme-elements/CustomSelect';

const BCrumb = [
  {
    to: '/',
    title: '메인',
  },
  {
    title: '세부설정',
  },
];

export default function EcomProductList() {

  return (
    <PageContainer> 
      <Breadcrumb title="세부설정" items={BCrumb} /> 
       <CustomTable></CustomTable>
    </PageContainer>
  );
};

interface Row {
  id: number;
  sequence: number;
  standard_grade: string;
  intermediate_grade: string;
  item: string;
  categoryId: number;
  merged1: number;
  merged2: number;
}

interface SelectedCell {
  rowIndex: number;
  colIndex: number;
}

const initialRows: Row[] = [
  { id: 1, sequence: 1, standard_grade: '1등급', intermediate_grade: '고유식별정보', item: '주민등록번호', categoryId: 101, merged1: 1, merged2: 1 },
  { id: 2, sequence: 2, standard_grade: '2등급', intermediate_grade: '고유식별정보', item: '주민등록번호', categoryId: 102, merged1: 1, merged2: 1 },
  { id: 3, sequence: 3, standard_grade: '3등급', intermediate_grade: '고유식별정보', item: '주민등록번호', categoryId: 103, merged1: 1, merged2: 1 },
];
 
interface PrivacyItem {
  id: number;
  personal_category: string;
  description: string;
}
const initialPrivacy: PrivacyItem[] = [
  { id: 1,  personal_category: '1등급', description: '고유식별정보'},
  { id: 2,  personal_category: '2등급', description: '고유식별정보' },
  { id: 3,  personal_category: '3등급', description: '고유식별정보' },
];
const CustomTable: React.FC = () => {
  const [privacyItems, setPrivacyItems] = useState<PrivacyItem[]>(initialPrivacy);
  const [privacyItem, setPrivacyItem] = useState<PrivacyItem>({ id: 1,  personal_category: '1등급', description: '고유식별정보'},);
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [editingCell, setEditingCell] = useState<SelectedCell | null>(null);
  const [willSave, setWillSave] = useState<boolean>(false);

  const handleCellUpdate = (rowIndex: number, field: keyof Row, value: string | number) => {
    setWillSave(true);
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(updatedRows); 
  };
  const handleSave = () => {
    setWillSave(false);
  }

  const handleAddRow = () => {
    setWillSave(true);
    handleSplit();
    const newRow: Row = {
      id: rows.length + 1,
      sequence: rows.length + 1,
      standard_grade: '',
      intermediate_grade: '',
      item: '',
      categoryId: rows.length + 101,
      merged1: 1,
      merged2: 1,
    };

    if (selectedCell) {
      const updatedRows = [...rows];
      let insertAtIndex = selectedCell.rowIndex + 1; 
      if( selectedCell.colIndex == 2 ){
        for (let i = selectedCell.rowIndex+1 ; i < rows.length; i++) {
          const row = updatedRows[i];
          if (row.merged1 >= 1 ){
            insertAtIndex = i ; 
            break;
          } 
        }
      }else if( selectedCell.colIndex == 3 ){
        for (let i = selectedCell.rowIndex+1 ; i < rows.length; i++) {
          const row = updatedRows[i];
          if (row.merged2 >= 1 ){
            insertAtIndex = i ; 
            break;
          } 
        }
      }
      console.log(insertAtIndex)
      
      // 삽입위치 이후 행의 merged1 값을 수정
      for (let i = insertAtIndex ; i >= 0; i--) {
        const row = updatedRows[i];
        if (row.merged1 === 1 ){
          newRow.merged1 = 1 ;
          break;
        } 
        if (row.merged1 > 1 ) {
          updatedRows[i].merged1++;  
          newRow.merged1 = 0;
          break;
        }  
      }

      for (let i = insertAtIndex ; i >= 0; i--) {
        const row = updatedRows[i];
        if (row.merged2 === 1 ){
          newRow.merged2 = 1 ;
          break;
        }
        if (row.merged2 > 1 ) {
          updatedRows[i].merged2++;  
          newRow.merged2 = 0 ;
          break;
        }  
      }
      // 새로운 행 추가
      updatedRows.splice(insertAtIndex, 0, newRow);
      updatedRows.forEach((row, rowIndex) => {
        row.sequence = rowIndex + 1;  
      });
      setRows(updatedRows); 
    } else {
      setRows([...rows, newRow]);
    }
    
  };

  const handleDeleteRow = () => {
    if (selectedCell) { 
      setWillSave(true);
      const updatedRows = [...rows];
      updatedRows.splice(selectedCell.rowIndex, 1); 
      handleSplit();
      // let updatedRows = [...rows]; 
      // // 선택된 셀 아래에 있는 행 중 merged1 값이 0인 행을 모두 제거
      // for (let i = selectedCell.rowIndex ; i < updatedRows.length; i++) {
      //   if (updatedRows[i].merged1 === 0) {
      //     updatedRows.splice(i, 1); // merged1 값이 0이면 행을 제거
      //     i--; // 행이 제거되었으므로 index를 조정
      //   } else {
      //     break; // merged1 값이 0이 아니면 반복문 종료
      //   }
      // }
    
      // // 선택된 셀 아래에 있는 행 중 merged2 값이 0인 행을 모두 제거
      // for (let i = selectedCell.rowIndex ; i < updatedRows.length; i++) {
      //   if (updatedRows[i].merged2 === 0) {
      //     updatedRows.splice(i, 1); // merged1 값이 0이면 행을 제거
      //     i--; // 행이 제거되었으므로 index를 조정
      //   } else {
      //     break; // merged1 값이 0이 아니면 반복문 종료
      //   } 
      // } 
      updatedRows.forEach((row, index) => (row.sequence = index + 1));
      setRows(updatedRows);
      setSelectedCell(null);
    }
  };

  const handleMerge = () => {
    if (!selectedCell ) return;
    setWillSave(true);
    let mergeCount = 1; // 병합할 셀의 수를 추적합니다.
    let processing = true;
    
    // 병합할 셀의 수를 계산합니다.
    if( selectedCell.colIndex == 2 ){
      rows.forEach((row, rowIndex) => {
        if (rowIndex > selectedCell.rowIndex) {
          if (processing) {
            mergeCount++;
            if (row.merged1 === 1) processing = false;
          }
        }
      });
    
      processing = true;
      const updatedRows = rows.map((row, rowIndex) => {
        if (rowIndex === selectedCell.rowIndex) {
          return { ...row, merged1: mergeCount };
        } else if (rowIndex > selectedCell.rowIndex &&  processing) {
          if (row.merged1 === 1) processing = false;
          return { ...row, merged1: 0 };
        }
        return row;
      });
      setRows(updatedRows);
    }
    else if( selectedCell.colIndex == 3 && rows[selectedCell.rowIndex].merged1  >rows[selectedCell.rowIndex].merged2){
      rows.forEach((row, rowIndex) => {
        if (rowIndex > selectedCell.rowIndex) {
          if ( processing) {
            mergeCount++;
            if (row.merged2 === 1) processing = false;
          }
        }
      });
    
      processing = true;
      const updatedRows = rows.map((row, rowIndex) => {
        if (rowIndex === selectedCell.rowIndex) {
          return { ...row, merged2: mergeCount };
        } else if (rowIndex > selectedCell.rowIndex && processing) {
          if (row.merged2 === 1) processing = false;
          return { ...row, merged2: 0 };
        }
        return row;
      });
      setRows(updatedRows);
    }
    
  
    
  };
  
  const handleSplit = () => {
    if (!selectedCell) return;
    
    if( selectedCell.colIndex == 2 ){
      setWillSave(true);
      let processing = true;
      const updatedRows = rows.map((row, rowIndex) => {
        if (rowIndex === selectedCell.rowIndex) {
          return { ...row, merged1: 1 };
        } else if (rowIndex > selectedCell.rowIndex &&  processing) {
          if (row.merged1 >= 1) processing = false;
          return { ...row, merged1: 1 };
        }
        return row;
      }); 
    
      setRows(updatedRows);
    }else if( selectedCell.colIndex == 3 ){
      setWillSave(true);
      let processing = true;
      const updatedRows = rows.map((row, rowIndex) => {
        if (rowIndex === selectedCell.rowIndex) {
          return { ...row, merged2: 1 };
        } else if (rowIndex > selectedCell.rowIndex &&  processing) {
          if (row.merged2 >= 1) processing = false;
          return { ...row, merged2: 1 };
        }
        return row;
      }); 
      setRows(updatedRows);
    }
  };
  

  return (
    <>
      <Box sx={{ mb: 2, display: 'flex',justifyContent:'flex-end',  gap: 1 }}>
        <CustomSelect
          id="account-type-select"
          sx={{ mr: 4, width: 200 }}
          value={privacyItem} 
          onChange={(event:any) => {
            setPrivacyItem(event.target.value)}}
        >
          {privacyItems.map((x, i) => {
            return (
              <MenuItem key={i} value={x.id}>{x.personal_category}</MenuItem>
            );
          })
          }
        </CustomSelect>
        <Button variant="contained" onClick={handleMerge} disabled={!selectedCell}>셀 병합</Button>
        <Button variant="contained" onClick={handleSplit} disabled={!selectedCell}>셀 분할</Button>
        <Button variant="contained" onClick={handleAddRow}  >행 삽입</Button>
        <Button variant="contained" onClick={handleDeleteRow} disabled={!selectedCell || (rows[selectedCell.rowIndex].merged1 !==1) || (rows[selectedCell.rowIndex].merged2  !==1)  }>행 삭제</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {rows.map((row:Row, rowIndex) => (
           
              <TableRow key={row.id}>
                {Object.keys(row).map((key, colIndex) => {
                  const isEditing = editingCell && editingCell.rowIndex === rowIndex && editingCell.colIndex === colIndex;
                  return colIndex == 2 &&  row.merged1 !== 0 ?
                    (
                    <TableCell
                      key={colIndex}
                      style={{ textAlign: 'center', cursor: 'pointer', backgroundColor: !isEditing && selectedCell && selectedCell.rowIndex === rowIndex && selectedCell.colIndex === colIndex ? '#bde0fe' : '' }}
                      onClick={() => setSelectedCell({ rowIndex, colIndex })}
                      onDoubleClick={() => setEditingCell({ rowIndex, colIndex })}
                      rowSpan={row.merged1 > 0 ? row.merged1 : 1} 
                      sx={{width:100, pa:0}}
                    >
                      {isEditing ? (
                        <TextField
                          onKeyDown={(e: any) => { if (e.key === 'Enter') {
                            e.target.blur(); 
                            setEditingCell(null);
                          } }}
                          value={row[key as keyof Row]}
                          onChange={(e) => handleCellUpdate(rowIndex, key as keyof Row, e.target.value)}
                        />
                      ) : (
                        <InputLabel  >{row.sequence}-{row.merged1}</InputLabel>
                      )}
                    </TableCell>
                  )
                  : colIndex == 3 &&  row.merged2 !== 0 ?
                  (
                    <TableCell
                      key={colIndex}
                      style={{ textAlign: 'center', cursor: 'pointer', backgroundColor: !isEditing && selectedCell && selectedCell.rowIndex === rowIndex && selectedCell.colIndex === colIndex ? '#bde0fe' : '' }}
                      onClick={() => setSelectedCell({ rowIndex, colIndex })}
                      onDoubleClick={() => setEditingCell({ rowIndex, colIndex })}
                      rowSpan={row.merged2 > 0 ? row.merged2 : 1} 
                      sx={{width:100}}
                    >
                      {isEditing ? (
                        <TextField 
                          value={row[key as keyof Row]}
                          onChange={(e) => handleCellUpdate(rowIndex, key as keyof Row, e.target.value)}
                          onKeyDown={(e: any) => { if (e.key === 'Enter') {
                            e.target.blur(); 
                            setEditingCell(null);
                          } }}
                        />
                      ) : (
                        <InputLabel>{row.sequence}-{row.merged2}</InputLabel>
                      )}
                    </TableCell>
                  )
                  : colIndex == 4  ?
                  (
                    <TableCell
                      key={colIndex}
                      style={{ textAlign: 'center', cursor: 'pointer', backgroundColor: !isEditing && selectedCell && selectedCell.rowIndex === rowIndex && selectedCell.colIndex === colIndex ? '#bde0fe' : '' }}
                      onClick={() => setSelectedCell({ rowIndex, colIndex })}
                      onDoubleClick={() => setEditingCell({ rowIndex, colIndex })} 
                      
                      sx={{width:100}}
                    >
                      {isEditing ? (
                        <TextField  
                          value={row[key as keyof Row]}
                          onChange={(e) => handleCellUpdate(rowIndex, key as keyof Row, e.target.value)}
                          onKeyDown={(e: any) => { if (e.key === 'Enter') {
                            e.target.blur(); 
                            setEditingCell(null);
                          } }}
                        />
                      ) : (
                        <InputLabel>{row.item}</InputLabel>
                      )}
                    </TableCell>
                  ) : null;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display={'flex'} justifyContent={'flex-end'} marginTop={2}>
        <Button variant="contained" onClick={handleSave} disabled={!willSave}>저장</Button>
      </Box>
      
    </>
  );
};
