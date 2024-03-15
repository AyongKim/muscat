import { useState, useEffect } from 'react';
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
  IconButton,
  Chip,
} from '@mui/material';
import PageContainer from '@src/components/container/PageContainer';
import Breadcrumb from '@src/layouts/full/shared/breadcrumb/Breadcrumb';
import DashboardCard from '@src/components/shared/DashboardCard'; 
import dynamic from "next/dynamic";
import CustomSelect from '@src/components/forms/theme-elements/CustomSelect';
import Link from 'next/link';   
import { AppDispatch, useDispatch, useSelector } from '@src/store/Store'; 
import { Delete as DeleteIcon } from '@mui/icons-material'; // 삭제 아이콘 추가
import { Row } from 'antd';
import { fetchProjects } from '@src/store/apps/ProjectSlice';
import { ProjectType } from '@src/types/apps/project'; 
import axios from 'axios'; 
import { apiUrl } from '@src/utils/commonValues';
// ReactQuill 동적 import
const ReactQuill: any = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill"); 
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
);

// Breadcrumb 경로
const BCrumb = [
  {
    to: '/noricelist',
    title: '공지사항',
  },
  {
    title: '글작성',
  },
];
interface SelectedFile {
  file: File;
  id: string;
}
export default function QuillEditor() {
  const dispatch: AppDispatch = useDispatch(); 
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [category, setCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null); 
  const projects: ProjectType[] = useSelector((state) => state.projectReducer.projects);

  const [create_by, setCreatedBy] = useState('');
  const [create_time, setCreateTime] = useState('');
  const [attachment, setAttachment] = useState('');
  const [views, setViews] = useState(0);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id') || ''; 
        const API_URL = `http://${apiUrl}notice`;
        const response = await axios.post(`${API_URL}/Detail`, { id: id });
        console.log(response);
        // 파라미터에서 받아온 공지사항 정보 설정
        setId(id);
        setTitle(response.data.title);
        setCategory(response.data.project_name);
        setContent(response.data.content);  

        setCreatedBy(response.data.create_by);  
        setCreateTime(response.data.create_time);  
        setAttachment(response.data.attachment);  
        setViews(response.data.views);   
      } catch (error) {
        console.error('Error fetching notice info:', error);
        // Handle error if necessary
      }
    };
    dispatch(fetchProjects());
    fetchDetail();
  }, []); // 페이지 로드시 한번만 실행 
  // 파라미터에서 공지사항 정보 추출 

  // 파일 변경 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile({
        file: file,
        id: Math.random().toString(36).substr(2, 9), // 각 파일에 고유한 ID 할당
      });
    }
  };

  const handleDelete = () => {
    setSelectedFile(null);
  };

  // 수정 모드로 변경
  const handleEdit = () => {
    setIsEditing(true);
  };

  // 저장 핸들러
  const handleSave = () => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }
  
    const formData = new FormData();
    
    formData.append('notice_id', id);
    formData.append('file', selectedFile.file);
    formData.append('project_id', category);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('change', 'string');
  
    fetch('http://localhost:5001/notice/Update', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => { 
        setContent('');
        setTitle('');
        setSelectedFile(null); 
      })
      .catch(error => {
        console.error("Failed to register the notice:", error);
      });
  };

  return (
    <PageContainer>
      <Breadcrumb title="글 작성" items={BCrumb} />
      <DashboardCard
        title="글 작성"
        action={
          <Box>
            {isEditing ? (
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
                      {isEditing ? (
                        <Input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          fullWidth
                        />
                      ) : (
                        <Typography variant="h6">{title}</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                      <Typography variant="h6">분류</Typography>
                    </TableCell>
                    <TableCell sx={{ borderColor: 'black' }}>
                      {isEditing ? (
                        <CustomSelect
                          labelId="month-dd"
                          id="month-dd"
                          size="small" 
                          value={category}
                          sx={{width:200, mr:1}}
                          onChange={(e:any) => setCategory(e.target.value)}
                        >
                          {projects.map((project: any) => (
                            <MenuItem key={project.id} value={project.id}>
                              {project.name}
                            </MenuItem>
                          ))}
                        </CustomSelect>
                      ) : (
                        <Typography variant="h6">전체</Typography>
                      )}
                    </TableCell>
                    {!isEditing && <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                      <Typography variant="h6">작성자</Typography>
                    </TableCell>}  
                    {!isEditing && <TableCell sx={{ borderColor: 'black' }}>
                      <Typography variant="h6">{create_by}</Typography>
                    </TableCell>}
                    {!isEditing &&   <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                      <Typography variant="h6">작성일</Typography>
                    </TableCell>}
                    {!isEditing &&   <TableCell sx={{ borderColor: 'black' }}>
                      <Typography variant="h6">{create_time}</Typography>
                    </TableCell>}
                    {!isEditing &&  <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                      <Typography variant="h6">조회</Typography>
                    </TableCell>}
                    {!isEditing  && <TableCell sx={{ borderColor: 'black' }}>
                      <Typography variant="h6">{views}</Typography>
                    </TableCell>}
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                      <Typography color={'dark'} variant="h6">첨부파일</Typography>
                    </TableCell>
                    <TableCell> 
                      {isEditing ? 
                      <Row align={'middle'}>
                      <InputLabel htmlFor="file-upload" style={{textAlign:'center', width:80, borderBottom: '1px solid black' }} component="label">
                        파일 선택
                      </InputLabel>
                      <Input
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                        inputProps={{
                          'aria-label': '첨부파일',
                        }}
                        style={{ display: 'none' }}
                      />
                      {selectedFile && (
                        <Chip
                          style={{ marginLeft: 2 }}
                          label={selectedFile.file.name}
                          onDelete={handleDelete}
                        />
                      )}
                      
                      
                      </Row>: 
                      <a href={`http://localhost:5001/notice/Attachment?id=${id}`}>{attachment}</a> 
                      }
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <ReactQuill
                        readOnly={!isEditing}
                        value={content}
                        onChange={(value: any) => setContent(value)}
                        placeholder="Type here..."
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginY: 2 }}>
            <Button component={Link} href="/noticelist" variant="contained" onClick={() => { }} sx={{ mr: 1 }}>
              목록
            </Button>
          </Box>
        </>
      </DashboardCard>
    </PageContainer>
  );
};