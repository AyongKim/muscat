import { useState } from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TableHead,
  Box,
  useTheme,
  InputLabel,
  Input,
  Button,
  Card, 
  MenuItem,
} from '@mui/material';
import PageContainer from '../../../../src/components/container/PageContainer';
import Breadcrumb from '../../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../src/components/shared/DashboardCard'; 
import dynamic from "next/dynamic";
import CustomSelect from '../../../../src/components/forms/theme-elements/CustomSelect';
import Link from 'next/link'; 
const ReactQuill: any = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill"); 
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
);

const BCrumb = [
  {
    to: '/apps/noricelist',
    title: '공지사항',
  },
  {
    title: '글작성',
  },
];

export default function QuillEditor() {

  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to manage editing mode
  const theme = useTheme();
  const borderColor = theme.palette.divider;
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    // 첫 번째 선택된 파일을 가져옵니다.
    const file = event.target.files[0]; 
    if (file) {
      setSelectedFile(file);
      // 파일 처리 로직 추가 (예: 파일을 서버에 업로드)
    } else {
      // 파일이 선택되지 않았을 경우의 처리
      console.log("No file selected.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true); // Set editing mode to true when edit button is clicked
  };

  const handleSave = () => {
    setIsEditing(false); // Set editing mode to false when save button is clicked
    // Here you can add logic to save the changes, like sending a request to the server
  };

  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="글 작성" items={BCrumb} />
      <DashboardCard
        title="글 작성"
        action={
          <Box>
            {isEditing ? ( // Render different actions based on editing mode
              <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
                저장
              </Button>
            ) : (
              <Button variant="contained" onClick={handleEdit} sx={{ mr: 1 }}>
                수정
              </Button>
            )}
          </Box>
        }
      >
        <>
          <Card sx={{ p: 0, border: 1, borderColor: 'black' }} elevation={9} variant={'outlined'}>
            <TableContainer sx={{ borderColor: 'black' }}>
              <Table
                aria-label="simple table"
                sx={{
                  whiteSpace: 'nowrap',
                  borderColor: 'black'
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                      <Typography color={'dark'} variant="h6">제목</Typography>
                    </TableCell>
                    <TableCell width={'100%'} sx={{ borderColor: 'black' }} colSpan={7}>
                      {isEditing ? ( // Render input field if editing mode is true
                        <Input
                          value="첫번째 공지사항입니다."
                          onChange={(e) => {}} // Add onChange handler to update the state
                          fullWidth
                        />
                      ) : (
                        <Typography variant="h6">첫번째 공지사항입니다.</Typography>
                      )}
                    </TableCell>

                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                      <Typography variant="h6">분류</Typography>
                    </TableCell>
                    <TableCell sx={{ borderColor: 'black' }}>
                    {isEditing ? ( // Render input field if editing mode is true
                        <CustomSelect
                        labelId="month-dd"
                        id="month-dd"
                        size="small" 
                        value={1}
                        sx={{width:200, mr:1}}
                      >
                        <MenuItem value={1}>제목</MenuItem>
                        <MenuItem value={2}>제목+내용</MenuItem>
                        <MenuItem value={3}>작성자</MenuItem>
                      </CustomSelect>
                      ) : (
                        <Typography variant="h6">전체</Typography>
                      )}
                     
                    </TableCell>
                    {!isEditing && <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                      <Typography variant="h6">작성자</Typography>
                    </TableCell>}
                    {!isEditing && <TableCell sx={{ borderColor: 'black' }}>
                      <Typography variant="h6">ooo</Typography>
                    </TableCell>}
                    {!isEditing &&   <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                      <Typography variant="h6">작성일</Typography>
                    </TableCell>}
                    {!isEditing &&   <TableCell sx={{ borderColor: 'black' }}>
                      <Typography variant="h6">yyyy-mm-dd hh:mm:ss</Typography>
                    </TableCell>}
                    {!isEditing &&  <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                      <Typography variant="h6">조회</Typography>
                    </TableCell>}
                    {!isEditing  && <TableCell sx={{ borderColor: 'black' }}>
                      <Typography variant="h6">52</Typography>
                    </TableCell>}
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                      <Typography color={'dark'} variant="h6">첨부파일</Typography>
                    </TableCell>
                    <TableCell width={'100%'} sx={{ borderColor: 'black' }} colSpan={7}  >
                      <Box display={'flex'} alignItems="center">
                        <InputLabel
                          htmlFor="file-upload"
                          component="label"
                          sx={{
                            borderRadius: '4px',
                            display: 'inline-block',
                            mr: 3
                          }}
                        >
                          파일 선택
                        </InputLabel>
                        { isEditing && <Input
                          id="file-upload"
                          type="file"
                          onChange={handleFileChange}
                          inputProps={{
                            'aria-label': '첨부파일',
                          }}
                          style={{ display: 'none' }}
                        />}
                        {selectedFile && <Typography> </Typography>}
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                <ReactQuill
                  readOnly={!isEditing} // Make the Quill editor read-only if not in editing mode
                  value={text}
                  onChange={(value: any) => {
                    setText(value);
                  }} 
                  placeholder="Type here..."
                />
                </TableBody>
              </Table>
            </TableContainer>

          </Card>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginY: 2 }}>
            <Button component={Link} href="/apps/noticelist" variant="contained" onClick={() => { }} sx={{ mr: 1 }}>
              목록
            </Button>
          </Box>
        </>
      </DashboardCard>
    </PageContainer>


  );
};
