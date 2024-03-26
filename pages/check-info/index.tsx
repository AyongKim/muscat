import Breadcrumb from '@src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@src/components/container/PageContainer';
import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box, TextField, InputLabel, MenuItem, TableHead } from '@mui/material';
import CustomSelect from '@src/components/forms/theme-elements/CustomSelect';
import { apiUrl } from '@src/utils/commonValues';
import axios from 'axios'; 

interface CheckInfo{
  id: number;
  sequence: number;
  area: string;
  domain: string;
  item: string;
  detail_item: string;
  description: string;
  attatchment: string;
  categoryId: number;
  merged1: number;
  merged2: number;
}
interface SelectedCell {
  rowIndex: number;
  colIndex: number;
}

const initialRows: CheckInfo[] = [
  { id: 1, sequence: 1, area: '1등급', domain: '고유식별정보', item: '주민등록번호', detail_item: '주민등록번호', description: '주민등록번호', attatchment: '주민등록번호', categoryId: 101, merged1: 1, merged2: 1 },
  { id: 2, sequence: 2, area: '2등급', domain: '고유식별정보', item: '주민등록번호',detail_item: '주민등록번호', description: '주민등록번호', attatchment: '주민등록번호',  categoryId: 102, merged1: 1, merged2: 1 },
  { id: 3, sequence: 3, area: '3등급', domain: '고유식별정보', item: '주민등록번호', detail_item: '주민등록번호', description: '주민등록번호', attatchment: '주민등록번호', categoryId: 103, merged1: 1, merged2: 1 },
];
 
interface ChecklistItem {
  id: number;
  checklist_item: string;
  description: string;
}

interface CheckProps {
  selectedItem: ChecklistItem;
  initChecklistItems: ChecklistItem[];
  onClose?: () => void;
}
const API_URL = `http://${apiUrl}privacyInfo`;
const CheckInfoTable: React.FC<CheckProps> = ({selectedItem, initChecklistItems, onClose }) => {
  const [ChecklistItems, setChecklistItems] = useState<ChecklistItem[]>(initChecklistItems);
  const [ChecklistItem, setChecklistItem] = useState<ChecklistItem>(selectedItem);
  const [checkInfos, setCheckInfos] = useState<CheckInfo[]>(initialRows);
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [editingCell, setEditingCell] = useState<SelectedCell | null>(null);
  const [willSave, setWillSave] = useState<boolean>(false);

  const fetchCheckInfo = async () => {
    try {
      const response = await axios.post(`${API_URL}/List`);
      if (response.status === 200) {
        setCheckInfos(response.data);
         
      } else {
        console.error('Failed to fetch items');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchCheckInfo();
  }, []);


  const handleCellUpdate = (rowIndex: number, field: keyof CheckInfo, value: string | number) => {
    setWillSave(true);
    const updatedRows = checkInfos.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setCheckInfos(updatedRows); 
  };
  

  const handleAddRow = () => {
    setWillSave(true);
    handleSplit();
    const newRow: CheckInfo = {
      id: checkInfos.length + 1,
      sequence: checkInfos.length + 1,
      area:'',
      domain:'',
      description:'',
      detail_item:'',
      attatchment: '', 
      item: '',
      categoryId: checkInfos.length + 101,
      merged1: 1,
      merged2: 1,
    };

    if (selectedCell) {
      const updatedRows = [...checkInfos];
      let insertAtIndex = selectedCell.rowIndex + 1; 
      if( selectedCell.colIndex == 2 ){
        for (let i = selectedCell.rowIndex+1 ; i < checkInfos.length+1; i++) {
          if( i == checkInfos.length){
            insertAtIndex = i ; 
            break;
          }
          const row = updatedRows[i];
          if (row.merged1 >= 1 ){
            insertAtIndex = i ; 
            break;
          } 
        }
      }else if( selectedCell.colIndex == 3 ){
        for (let i = selectedCell.rowIndex+1 ; i < checkInfos.length+1; i++) {
          if( i == checkInfos.length){
            insertAtIndex = i ; 
            break;
          }
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
        if( i == checkInfos.length){
          break;
        }
        if( updatedRows[insertAtIndex].merged1 == 0  ){
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
       
      }

      for (let i = insertAtIndex ; i >= 0; i--) {
        if( i == checkInfos.length){
          break;
        }
        if( updatedRows[insertAtIndex].merged2 == 0  ){
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
        
      }
      // 새로운 행 추가
      updatedRows.splice(insertAtIndex, 0, newRow);
      updatedRows.forEach((row, rowIndex) => {
        row.sequence = rowIndex + 1;  
      });
      setCheckInfos(updatedRows); 
    } else {
      setCheckInfos([...checkInfos, newRow]);
    }
    
  };

  const handleDeleteRow = () => {
    if (selectedCell) { 
      setWillSave(true);
      const updatedRows = [...checkInfos];
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
      setCheckInfos(updatedRows);
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
      checkInfos.forEach((row, rowIndex) => {
        if (rowIndex > selectedCell.rowIndex) {
          if (processing) {
            mergeCount++;
            if (row.merged1 === 1) processing = false;
          }
        }
      });
    
      processing = true;
      const updatedRows = checkInfos.map((row, rowIndex) => {
        if (rowIndex === selectedCell.rowIndex) {
          return { ...row, merged1: mergeCount };
        } else if (rowIndex > selectedCell.rowIndex &&  processing) {
          if (row.merged1 === 1) processing = false;
          return { ...row, merged1: 0 };
        }
        return row;
      });
      setCheckInfos(updatedRows);
    }
    else if( selectedCell.colIndex == 3  ){ 
      checkInfos.forEach((row, rowIndex) => {
        if (rowIndex > selectedCell.rowIndex) {
          if ( processing) {
            mergeCount++;
            if (row.merged2 === 1) processing = false;
          }
        }
      }); 
      processing = true;
      const updatedRows = checkInfos.map((row, rowIndex) => {
        if (rowIndex === selectedCell.rowIndex) {
          return { ...row, merged2: mergeCount };
        } else if (rowIndex > selectedCell.rowIndex && processing) {
          if (row.merged2 === 1) processing = false;
          return { ...row, merged2: 0 };
        }
        return row;
      });
      setCheckInfos(updatedRows);
    }
    
  
    
  };
  
  const handleSplit = () => {
    if (!selectedCell) return;
    
    if( selectedCell.colIndex == 2 ){
      setWillSave(true);
      let processing = true;
      const updatedRows = checkInfos.map((row, rowIndex) => {
        if (rowIndex === selectedCell.rowIndex) {
          return { ...row, merged1: 1 };
        } else if (rowIndex > selectedCell.rowIndex &&  processing) {
          if (row.merged1 >= 1) processing = false;
          return { ...row, merged1: 1 };
        }
        return row;
      }); 
    
      setCheckInfos(updatedRows);
    }else if( selectedCell.colIndex == 3 ){
      setWillSave(true);
      let processing = true;
      const updatedRows = checkInfos.map((row, rowIndex) => {
        if (rowIndex === selectedCell.rowIndex) {
          return { ...row, merged2: 1 };
        } else if (rowIndex > selectedCell.rowIndex &&  processing) {
          if (row.merged2 >= 1) processing = false;
          return { ...row, merged2: 1 };
        }
        return row;
      }); 
      setCheckInfos(updatedRows);
    }
  };
  const handleImport = () => {
    
  };
  const handleSave = () => {
    setWillSave(false);
  }

  return (
    <> 
      <Breadcrumb title="세부 점검 항목"  />   
      <Box sx={{ mb: 2, display: 'flex',justifyContent:'space-between'  }}>
        <Button sx={{  width: 100 }} variant="contained" onClick={onClose} >목록</Button>
        <Box sx={{ display: 'flex',justifyContent:'flex-end',  gap: 1 }}>
          <CustomSelect
            id="account-type-select"
            sx={{ mr: 4, width: 200 }}
            value={ChecklistItem.id} 
            onChange={(event:any) => {
              setChecklistItem(event.target.value)}}
          >
            {ChecklistItems.map((x, i) => {
              return (
                <MenuItem key={i} value={x.id}>{x.checklist_item}</MenuItem>
              );
            })
            }
          </CustomSelect>
          <Button variant="contained" color='secondary' sx={{ mr: 4, width: 200 }} onClick={handleImport}  >불러오기</Button>

          <Button variant="contained" onClick={handleMerge} disabled={!selectedCell}>셀 병합</Button>
          <Button variant="contained" onClick={handleSplit} disabled={!selectedCell}>셀 분할</Button>
          <Button variant="contained" onClick={handleAddRow}  >행 삽입</Button>
          <Button variant="contained" onClick={handleDeleteRow} disabled={!selectedCell || (checkInfos[selectedCell.rowIndex].merged1 !==1) || (checkInfos[selectedCell.rowIndex].merged2  !==1)  }>행 삭제</Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
        <TableHead >
          <TableRow sx={{backgroundColor:'success'}}> 
            <TableCell style={{ textAlign: 'center'}}>영역</TableCell>
            <TableCell style={{ textAlign: 'center'}}>분야</TableCell>
            <TableCell style={{ textAlign: 'center'}}>항목</TableCell>
            <TableCell style={{ textAlign: 'center'}}>세부 점검 항목</TableCell>
            <TableCell style={{ textAlign: 'center'}}>설명</TableCell>
            <TableCell style={{ textAlign: 'center'}}>첨부파일 양식</TableCell> 
          </TableRow>
        </TableHead>
          <TableBody>
            {checkInfos.map((row:CheckInfo, rowIndex) => ( 
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
                          value={row[key as keyof CheckInfo]}
                          onChange={(e) => handleCellUpdate(rowIndex, key as keyof CheckInfo, e.target.value)}
                        />
                      ) : (
                        <InputLabel  >{row.area}</InputLabel>
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
                          value={row[key as keyof CheckInfo]}
                          onChange={(e) => handleCellUpdate(rowIndex, key as keyof CheckInfo, e.target.value)}
                          onKeyDown={(e: any) => { if (e.key === 'Enter') {
                            e.target.blur(); 
                            setEditingCell(null);
                          } }}
                        />
                      ) : (
                        <InputLabel>{row.domain}</InputLabel>
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
                          value={row[key as keyof CheckInfo]}
                          onChange={(e) => handleCellUpdate(rowIndex, key as keyof CheckInfo, e.target.value)}
                          onKeyDown={(e: any) => { if (e.key === 'Enter') {
                            e.target.blur(); 
                            setEditingCell(null);
                          } }}
                        />
                      ) : (
                        <InputLabel>{row.item}</InputLabel>
                      )}
                    </TableCell>
                  ): colIndex == 5  ?
                    <TableCell
                      key={colIndex}
                      style={{ textAlign: 'center', cursor: 'pointer', backgroundColor: !isEditing && selectedCell && selectedCell.rowIndex === rowIndex && selectedCell.colIndex === colIndex ? '#bde0fe' : '' }}
                      onClick={() => setSelectedCell({ rowIndex, colIndex })}
                      onDoubleClick={() => setEditingCell({ rowIndex, colIndex })} 
                      
                      sx={{width:100}}
                    >
                      {isEditing ? (
                        <TextField  
                          value={row[key as keyof CheckInfo]}
                          onChange={(e) => handleCellUpdate(rowIndex, key as keyof CheckInfo, e.target.value)}
                          onKeyDown={(e: any) => { if (e.key === 'Enter') {
                            e.target.blur(); 
                            setEditingCell(null);
                          } }}
                        />
                      ) : (
                        <InputLabel>{row.detail_item}</InputLabel>
                      )}
                    </TableCell>
                    : colIndex == 6  ?
                    <TableCell
                      key={colIndex}
                      style={{ textAlign: 'center', cursor: 'pointer', backgroundColor: !isEditing && selectedCell && selectedCell.rowIndex === rowIndex && selectedCell.colIndex === colIndex ? '#bde0fe' : '' }}
                      onClick={() => setSelectedCell({ rowIndex, colIndex })}
                      onDoubleClick={() => setEditingCell({ rowIndex, colIndex })} 
                      
                      sx={{width:100}}
                    >
                      {isEditing ? (
                        <TextField  
                          value={row[key as keyof CheckInfo]}
                          onChange={(e) => handleCellUpdate(rowIndex, key as keyof CheckInfo, e.target.value)}
                          onKeyDown={(e: any) => { if (e.key === 'Enter') {
                            e.target.blur(); 
                            setEditingCell(null);
                          } }}
                        />
                      ) : (
                        <InputLabel>{row.description}</InputLabel>
                      )}
                    </TableCell>
                    : colIndex == 7  ?
                    <TableCell
                      key={colIndex}
                      style={{ textAlign: 'center', cursor: 'pointer', backgroundColor: !isEditing && selectedCell && selectedCell.rowIndex === rowIndex && selectedCell.colIndex === colIndex ? '#bde0fe' : '' }}
                      onClick={() => setSelectedCell({ rowIndex, colIndex })}
                      onDoubleClick={() => setEditingCell({ rowIndex, colIndex })} 
                      
                      sx={{width:100}}
                    >
                      {isEditing ? (
                        <TextField  
                          value={row[key as keyof CheckInfo]}
                          onChange={(e) => handleCellUpdate(rowIndex, key as keyof CheckInfo, e.target.value)}
                          onKeyDown={(e: any) => { if (e.key === 'Enter') {
                            e.target.blur(); 
                            setEditingCell(null);
                          } }}
                        />
                      ) : (
                        <InputLabel>{row.attatchment}</InputLabel>
                      )}
                    </TableCell>
                   : null;
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
export default CheckInfoTable;