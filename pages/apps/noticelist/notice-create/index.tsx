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
import PageContainer from '../../../../src/components/container/PageContainer';
import Breadcrumb from '../../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import DashboardCard from '../../../../src/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import CustomSelect from '../../../../src/components/forms/theme-elements/CustomSelect';
import Link from 'next/link';
import { AppDispatch, useDispatch, useSelector } from '../../../../src/store/Store';
import { fetchNotices, registerNotice } from '../../../../src/store/apps/NoticeSlice';
import { fetchProjects } from '../../../../src/store/apps/ProjectSlice';
import { Delete as DeleteIcon } from '@mui/icons-material'; // 삭제 아이콘 추가
import { ProjectType } from '../../../../src/types/apps/project';
import { Row } from 'antd';
import { Router, useRouter } from 'next/router';

interface SelectedFile {
  file: File;
  id: string;
}

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
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const theme = useTheme();
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const dispatch: AppDispatch = useDispatch(); 
  const projects: ProjectType[] = useSelector((state) => state.projectReducer.projects);
  useEffect(() => {
    // 프로젝트 목록 가져오기
    dispatch(fetchProjects());
  }, []);

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

  // const handleSave = () => {
  //   if (!selectedFile) {
  //     console.error("No file selected.");
  //     return;
  //   }

  //   dispatch(registerNotice({
  //     content: "content",
  //     create_by: 'string',
  //     file: {},
  //     project_id: category,
  //     title: title
  //   }))
  //     .unwrap()
  //     .then(() => {
  //       dispatch(fetchNotices());
  //       setContent('');
  //       setTitle('');
  //       setSelectedFile(null);
  //     })
  //     .catch((error: any) => {
  //       console.error("Failed to register the notice:", error);
  //     });
  // };

  const handleSave = () => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile.file);
    formData.append('project_id', category);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('create_by', 'string');
  
    fetch('http://localhost:5001/notice/Register', {
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
        dispatch(fetchNotices());
        setContent('');
        setTitle('');
        setSelectedFile(null);
        router.back();
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
            <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
              저장
            </Button>
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
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                      <Typography variant="h6">분류</Typography>
                    </TableCell>
                    <TableCell sx={{ borderColor: 'black' }}>
                      <CustomSelect
                        labelId="project-select-label"
                        id="project-select"
                        size="small"
                        value={category}
                        sx={{ width: 200, mr: 1 }}
                        onChange={(e: any) => setCategory(e.target.value)}
                      > 
                        {projects.map((project: any) => (
                          <MenuItem key={project.id} value={project.id}>
                            {project.name}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: "primary.light", borderColor: 'black' }}>
                      <Typography color={'dark'} variant="h6">첨부파일</Typography>
                    </TableCell>
                    <TableCell>
                      <Row align={'middle'}>
                      <InputLabel  htmlFor="file-upload" style={{ textAlign:'center', width:80, borderBottom: '1px solid black' }} component="label">
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
                      </Row>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <ReactQuill
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
            <Button component={Link} href="/apps/noticelist" variant="contained" onClick={() => { }} sx={{ mr: 1 }}>
              목록
            </Button>
          </Box>
        </>
      </DashboardCard>
    </PageContainer>
  );
};
