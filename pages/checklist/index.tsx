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
    title: '점검항목 관리',
  },
];

export default function EcomProductList() {

  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="점검항목 관리" items={BCrumb} />
      
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}
       <CustomTable></CustomTable>
    </PageContainer>
  );
};



interface Cell {
  content: string;
  merged: number;
}

interface Row {
  id: number;
  sequence: number;
  data: Cell[];
}

interface SelectedCell {
  rowIndex: number;
  colIndex: number;
}

const initialRows: Row[] = [
  { id: 1, sequence: 1, data: [{ content: 'Row 1 Col 1', merged: 1 }, { content: 'Row 1 Col 2', merged: 1 }, { content: 'Row 1 Col 3', merged: 1 }] },
  { id: 2, sequence: 2, data: [{ content: 'Row 2 Col 1', merged: 1 }, { content: 'Row 2 Col 2', merged: 1 }, { content: 'Row 2 Col 3', merged: 1 }] },
  { id: 3, sequence: 3, data: [{ content: 'Row 3 Col 1', merged: 1 }, { content: 'Row 3 Col 2', merged: 1 }, { content: 'Row 3 Col 3', merged: 1 }] },
];

const CustomTable: React.FC = () => {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [editingCell, setEditingCell] = useState<SelectedCell | null>(null);

  const handleCellUpdate = (rowIndex: number, colIndex: number, content: string) => {
    const updatedRows = rows.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        const updatedData = row.data.map((cell, cIndex) => {
          if (cIndex === colIndex) {
            return { ...cell, content };
          }
          return cell;
        });
        return { ...row, data: updatedData };
      }
      return row;
    });
    setRows(updatedRows);
    setEditingCell(null);
  };

  const handleAddRow = () => {
    const newRow: Row = {
      id: rows.length > 0 ? rows[rows.length - 1].id + 1 : 1,
      sequence: rows.length > 0 ? rows[rows.length - 1].sequence + 1 : 1,
      data: new Array(3).fill(null).map((_, index) => ({ content: `Row ${rows.length + 1} Col ${index + 1}`, merged: 1 })),
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
    if (selectedCell) {
      const updatedRows = rows.filter((_, index) => index !== selectedCell.rowIndex);
      updatedRows.forEach((row, index) => (row.sequence = index + 1));
      setRows(updatedRows);
      setSelectedCell(null);
    }
  };

  const handleMerge = () => {
    if (!selectedCell) return;

    let mergeCount = 1; // 병합할 셀의 수를 추적합니다.
    let processing = true;
    rows.forEach((row, rowIndex) => {
      row.data.forEach((cell, colIndex) => {
        if (colIndex === selectedCell!.colIndex && rowIndex > selectedCell!.rowIndex) {
          if (cell.merged <= 1 && processing) {
            mergeCount++;
            if (cell.merged === 1)
              processing = false;
          }
        }
      });
    });

    processing = true;
    const updatedRows = rows.map((row, rowIndex) => {
      const newData = row.data.map((cell, colIndex) => {
        if (colIndex === selectedCell!.colIndex) {
          if (rowIndex === selectedCell!.rowIndex) {
            return { ...cell, merged: mergeCount };
          } else if (rowIndex > selectedCell!.rowIndex && cell.merged <= 1 && processing) {
            if (cell.merged === 1) 
              processing = false;
            return { ...cell, merged: 0 };
          }
        }
        return cell;
      });
      return { ...row, data: newData };
    });

    setRows(updatedRows);
  };

  const handleSplit = () => {
    if (!selectedCell) return;

    const updatedRows = rows.map(row => {
      const newData = row.data.map((cell, colIndex) => {
        if (colIndex === selectedCell!.colIndex) {
          return { ...cell, merged: 1 };
        }
        return cell;
      });
      return { ...row, data: newData };
    });

    setRows(updatedRows);
  };

  return (
    <>
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        <Button variant="contained" onClick={handleMerge} disabled={!selectedCell}>Merge</Button>
        <Button variant="contained" onClick={handleSplit} disabled={!selectedCell}>Split</Button>
        <Button variant="contained" onClick={handleAddRow}>Add Row</Button>
        <Button variant="contained" onClick={handleDeleteRow} disabled={!selectedCell}>Delete Row</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={row.id}>
                {row.data.map((cell, colIndex) => {
                  const isEditing = editingCell && editingCell.rowIndex === rowIndex && editingCell.colIndex === colIndex;
                  return cell.merged !== 0 ? (
                    <TableCell
                      key={colIndex}
                      style={{ textAlign: 'center', cursor: 'pointer', backgroundColor: !isEditing && selectedCell && selectedCell.rowIndex === rowIndex && selectedCell.colIndex === colIndex ? '#bde0fe' : '' }}
                      onClick={() => setSelectedCell({ rowIndex, colIndex })}
                      onDoubleClick={() => setEditingCell({ rowIndex, colIndex })}
                      rowSpan={cell.merged > 0 ? cell.merged : 1}
                      sx={{ p: 0 }}
                    >
                      {isEditing ? (
                        <TextField
                          autoFocus
                          defaultValue={cell.content}
                          onBlur={(e) => handleCellUpdate(rowIndex, colIndex, e.target.value)}
                          onKeyDown={(e: any) => { if (e.key === 'Enter') e.target.blur(); }}
                          fullWidth
                          sx={{ m: 1 }}
                        />
                      ) : (
                        <InputLabel sx={{ m: 1 }}>
                          {cell.content}
                        </InputLabel>
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
 

