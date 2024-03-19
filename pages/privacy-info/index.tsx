import Breadcrumb from '@src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@src/components/container/PageContainer';
import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box, TextField, InputLabel } from '@mui/material';

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
 

const CustomTable: React.FC = () => {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [editingCell, setEditingCell] = useState<SelectedCell | null>(null);

  const handleCellUpdate = (rowIndex: number, field: keyof Row, value: string | number) => {
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(updatedRows); 
  };

  const handleAddRow = () => {
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
      const insertAtIndex = selectedCell.rowIndex + 1;
      updatedRows.splice(insertAtIndex, 0, newRow);
      updatedRows.forEach((row, index) => (row.sequence = index + 1));
      setRows(updatedRows);
    } else {
      setRows([...rows, newRow]);
    }
  };

  const handleDeleteRow = () => {
    handleSplit();
    if (selectedCell) {
      const updatedRows = rows.filter((_, index) => index !== selectedCell.rowIndex);
      updatedRows.forEach((row, index) => (row.sequence = index + 1));
      setRows(updatedRows);
      setSelectedCell(null);
    }
  };

  const handleMerge = () => {
    if (!selectedCell ) return;
  
    let mergeCount = 1; // 병합할 셀의 수를 추적합니다.
    let processing = true;
    
    // 병합할 셀의 수를 계산합니다.
    if( selectedCell.colIndex == 2 ){
      rows.forEach((row, rowIndex) => {
        if (rowIndex > selectedCell.rowIndex) {
          if (row.merged1 <= 1 && processing) {
            mergeCount++;
            if (row.merged1 === 1) processing = false;
          }
        }
      });
    
      processing = true;
      const updatedRows = rows.map((row, rowIndex) => {
        if (rowIndex === selectedCell.rowIndex) {
          return { ...row, merged1: mergeCount };
        } else if (rowIndex > selectedCell.rowIndex && row.merged1 <= 1 && processing) {
          if (row.merged1 === 1) processing = false;
          return { ...row, merged1: 0 };
        }
        return row;
      });
      setRows(updatedRows);
    }
    else if( selectedCell.colIndex == 3 ){
      rows.forEach((row, rowIndex) => {
        if (rowIndex > selectedCell.rowIndex) {
          if (row.merged2 <= 1 && processing) {
            mergeCount++;
            if (row.merged2 === 1) processing = false;
          }
        }
      });
    
      processing = true;
      const updatedRows = rows.map((row, rowIndex) => {
        if (rowIndex === selectedCell.rowIndex) {
          return { ...row, merged2: mergeCount };
        } else if (rowIndex > selectedCell.rowIndex && row.merged2 <= 1 && processing) {
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
        <Button variant="contained" onClick={handleMerge} disabled={!selectedCell}>셀 병합</Button>
        <Button variant="contained" onClick={handleSplit} disabled={!selectedCell}>셀 분할</Button>
        <Button variant="contained" onClick={handleAddRow} disabled={(selectedCell! && (selectedCell.colIndex == 2 || selectedCell.colIndex == 3) 
          && (rows.at(selectedCell.rowIndex)!.merged1 != 1 || rows.at(selectedCell.rowIndex)!.merged2 != 1)) } >행 삽입</Button>
        <Button variant="contained" onClick={handleDeleteRow} disabled={!selectedCell}>행 삭제</Button>
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
                        <InputLabel  >{row[key as keyof Row]}</InputLabel>
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
                        <InputLabel>{row[key as keyof Row]}</InputLabel>
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
                        <InputLabel>{row[key as keyof Row]}</InputLabel>
                      )}
                    </TableCell>
                  ) : null;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
