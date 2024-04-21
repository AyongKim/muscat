import Breadcrumb from '@src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '@src/components/container/PageContainer';
import CustomSelect from '@src/components/forms/theme-elements/CustomSelect'; 
const axios = require('axios');
import { API_URL } from '@pages/constant';
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText,  DialogTitle, Box, Button, Grid, InputAdornment, MenuItem, TextField, TextareaAutosize , Typography, FormControlLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';  
import { IconSearch } from '@tabler/icons-react';
import CheckStatus from './components/CheckStatus';
import InnerSystemEnable from './components/InnerSystemEnable';
import RadialbarChart from './components/RadialBar';
import RetrustStatus from './components/RetrustStatus';
import ConsigneeWidget from './components/ConsigneeWidget';
import VerticalBarWidget from './components/VerticalBarWidget';
import HorizontalBarWidget from './components/HorizontalBarWidget';
import Image from "next/image";
import Go0 from "public/images/img/go0.png";
import Go1 from "public/images/img/go1.png";
import Go2 from "public/images/img/go2.png";
import Go3 from "public/images/img/go3.png";
import Go4 from "public/images/img/go4.png";
import Go5 from "public/images/img/go5.png";
import Go6 from "public/images/img/go6.png";
import Go7 from "public/images/img/go7.png";
import DetailOn from "public/images/img/detail_on.png";
import DetailOff from "public/images/img/detail_off.png";
import ConsigneeStatus from './components/ConsigneeStatus';
import CustomCheckbox from '@src/components/forms/theme-elements/CustomCheckbox';

let goArray = [
  Go0,
  Go1,
  Go2,
  Go3,
  Go4,
  Go5,
  Go6,
  Go7,
]
const BCrumb = [
  {
    to: '/',
    title: '메인',
  },
  {
    title: '점검 및 결과',
  },
];

interface Props {
  consigneeData: any;
}

export default function EcomProductList({consigneeData}: Props ) {
  const [type, setType] = React.useState('status');
  const [stage, setStage] = React.useState(0);
  const [checkY, setCheckY] = React.useState(false);
  const [checkN, setCheckN] = React.useState(false);
  const [checkNA, setCheckNA] = React.useState(false);
  const [checkExcept, setCheckExcept] = React.useState(false);
  const [exceptType, setExceptType] = React.useState(0);
  const [exceptReason, setExceptReason] = React.useState('');
  const ar = [1, 2, 3, 4, 5, 6, 7];
  const exceptList = [{
    id: 1,
    name: 'PG사',
  }, {
    id: 2,
    name: '인증서 제출',
  }, {
    id: 3,
    name: '계약 종료',
  }, {
    id: 4,
    name: '점검 거부',
  }, {
    id: 5,
    name: '직접 입력',
  }]

  const [userType, setUserType] = React.useState(0);

  const [checklistData, setChecklistData] = React.useState([]);

  const fetchChecklist = async(type: any) => {
    let response = await axios.post(`${API_URL}/checkinfo/ListByProject`, {
      project_id: consigneeData.project_id
    });

    if (type == 1 && consigneeData.first_check_consignee_temp_data) {
      let dd = JSON.parse(consigneeData.first_check_consignee_temp_data);
      let newData: any[] = [];
  
      response.data.map((x: any) => {
        let d = dd.find((a:any) => a.id == x.id);
        
        x = {...x, ...d};
        console.log(x)
        newData.push(x)
      })
  
      setChecklistData(newData)
    }
    else
      setChecklistData(response.data);
  }

  React.useEffect(() => {
    const str = sessionStorage.getItem('user')
    const type = JSON.parse(str).type
    setUserType(type);

    
  }, [])

  React.useEffect(() => {
    console.log(consigneeData)
    if (consigneeData.project_id)
      fetchChecklist(type);
  }, [consigneeData]);

  React.useEffect(() => {
    let aa = (consigneeData.state - 1) * 3 + (consigneeData.sub_state - 1);
    aa += 2;
    if (aa == 2) {
      if (consigneeData.create_date) {
        if (consigneeData.status) aa = 2;
        else aa = 1;
      }
      else aa = 0;
    }

    setStage(aa)
  }, [consigneeData]);

  const onIssue = () => {

  }

  const [showModal, setShowModal] = React.useState(false)
  const [modalMsg, setModalMsg] = React.useState('')
  const onClose = () => {
    setShowModal(false)
  }

  const consigneeSubmit = async() => {
    let data: any = {
      id: consigneeData.id,
      sub_state: 2,
      first_check_consignee_temp_data: JSON.stringify(checklistData),
      first_check_data: JSON.stringify(checklistData)
    };

    if (!consigneeData.self_check_date)
      data.self_check_date = 1

    const response = await axios.post(`${API_URL}/project_detail/Update`, data);
    if (response.data.result == 'SUCCESS') {
      setModalMsg('정확히 제출되었습니다.')
      setShowModal(true)
    }
  }

  return (
    <PageContainer>
      <Grid container>
        <Grid xs={1}>
          <Box sx={{backgroundColor: '#7F7F7F', textAlign: 'center', borderRadius: 0, color: 'white'}}>
            최초점검점수
          </Box>
          <Box sx={{backgroundColor: '#D9D9D9', textAlign: 'center', borderRadius: 0, borderColor: '#797979', border: 1, height: 'calc(20vh)', marginBottom: 1, alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            <Typography sx={{color: 'red', fontSize: 20, marginRight: 1}}>-</Typography>
            <Typography sx={{fontSize: 20}}>점</Typography>
          </Box>
          <Box onClick={() => setType('status')} sx={{backgroundColor: type == 'status' ? '#EEE' : '#D9D9D9', textAlign: 'center', borderRadius: 0, borderColor: '#A5A5A5', border: 1, borderBottom: 0, height: 'calc(20vh)', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            <Typography sx={{fontSize: 16}}>일반 현황</Typography>
            
          </Box>
          <Box onClick={() => setType('check')} sx={{backgroundColor: type == 'check' ? '#EEE' : '#D9D9D9', textAlign: 'center', borderRadius: 0, borderColor: '#A5A5A5', border: 1, height: 'calc(20vh)', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            <Typography sx={{fontSize: 16}}>점검 수행</Typography>
            
          </Box>
        </Grid>
        <Grid xs={10} sx={{p:1}}>
        {type == 'status' ? (
          <Grid xs={12} container>
            <Grid item xs={12} justifyContent={'center'} display={'flex'}>
              <Box sx={{width: 700}}>
                <Box>
                  점검 진행현황
                </Box>
                <Box> 
                  {ar.map((x, i)=>{
                    if (x <= stage)
                      return  (
                        <Image key={i} src={goArray[x]} alt={"SavingsImg"} width="100" />
                      );
                    else 
                      return  (
                        <Image key={i} src={goArray[0]} alt={"SavingsImg"} width="100" />
                      );
                  })}
                </Box>
                <Box display={'flex'}>
                  <Typography sx={{width: 100, textAlign: 'center'}}>점검 시작</Typography>
                  <Typography sx={{width: 100, textAlign: 'center'}}>자가점검중</Typography>
                  <Typography sx={{width: 100, textAlign: 'center'}}>검수 중</Typography>
                  <Typography sx={{width: 100, textAlign: 'center'}}>최초 점검 완료</Typography>
                  <Typography sx={{width: 100, textAlign: 'center'}}>보완자료 요청</Typography>
                  <Typography sx={{width: 100, textAlign: 'center'}}>보완자료 제출</Typography>
                  <Typography sx={{width: 100, textAlign: 'center'}}>이행 점검 완료</Typography>
                </Box>
              </Box>
            </Grid>


            {stage >= 1 &&
            <Grid item xs={6} style={{padding:8}} width={16}> 
              <ConsigneeStatus isLoading={false}/>
            </Grid>
            }
            {(stage >= 1 && stage < 7) &&
            <Grid item xs={6} style={{padding:8, alignItems: 'center', justifyContent: 'center', display: 'flex'}} height={400}> 
              <Typography sx={{fontSize: 24, color: '#2F5597', fontWeight: 'bold'}}> >>> 점검 진행중입니다. >>> </Typography>
            </Grid>
            }

            {stage == 7 && 
              <Grid item xs={6} style={{padding:8}}>
                <ConsigneeWidget isLoading={false}></ConsigneeWidget>
              </Grid>
            }
            {stage == 7 && 
              <Grid item xs={6} style={{padding:8}}>
                <InnerSystemEnable isLoading={false}></InnerSystemEnable>
              </Grid>
            }
            {stage == 7 && 
              <Grid item xs={6} style={{padding:8}}>
                <RetrustStatus isLoading={false}></RetrustStatus>
              </Grid>
            }
            {stage == 7 && 
              <Grid item xs={6} style={{padding:8}}>
                <RadialbarChart ></RadialbarChart>
              </Grid>
            }
            {stage == 7 && 
              <Grid item xs={6} style={{padding:8}}>
                <RetrustStatus isLoading={false}></RetrustStatus>
              </Grid>
            }
            {stage == 7 && 
              <VerticalBarWidget/>
              
            
            }
            {stage == 7 && 
              <HorizontalBarWidget/>
            }
          </Grid>
        ) : (userType == 0 || userType == 3) ? (
          <>
              <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button
                  variant={'contained'}
                  color={"primary"}
                  sx={{width:160, ml:1}}
                >
                  수탁사 입력 활성화
                </Button> 

                <Button
                  variant={'contained'}
                  color={"primary"}
                  sx={{width:90, ml:1}}
                >
                  다운로드
                </Button> 
                <Button
                  variant={'contained'}
                  color={"primary"}
                  sx={{width:100, ml:1}}
                >
                  임시 저장
                </Button> 
                <Button
                  variant={'contained'}
                  color={"primary"}
                  sx={{width:100, ml:1}}
                >
                  보완 요청
                </Button> 
                <Button
                  variant={'contained'}
                  color={"primary"}
                  sx={{width:100, ml:1}}
                >
                  검수 완료
                </Button> 
              </Box>

              <Box sx={{display: 'flex', mt: 1}}>
                <Button
                  variant={'contained'}
                  color={"primary"}
                  sx={{width:150, ml:1, height: 40}}
                  onClick={onIssue}
                >
                  이슈 업체 등록
                </Button> 

                
                <Box sx={{ml: 'auto', border: 1, borderRadius: 0}}>
                  <Box sx={{borderRadius: 0, borderBottom: 1, display: 'flex', justifyContent: 'center', p: 1}}>
                    <FormControlLabel
                      sx={{mr:2}}
                      control={
                        <CustomCheckbox
                          color="success"
                          checked={checkExcept}
                          onChange={(e:any) => {setCheckExcept(e.target.checked);}}
                          inputProps={{ 'aria-label': 'checkbox with default color' }}
                        />
                      }
                      label="결과 제외"
                    />

                    <CustomSelect
                      labelId="month-dd"
                      id="month-dd"
                      size="small" 
                      value={exceptType}
                      sx={{width:150, mr:2}}
                      onChange = {(e:any) => {
                        setExceptType(e.target.value);
                      }}
                    >
                      {exceptList.map((x, index) => {
                        return (
                          <MenuItem value={x.id} key = {index}>{x.name}</MenuItem>
                        );
                      })
                      }
                    </CustomSelect>
                  </Box>
                  <Box sx={{p: 1}}>
                    <FormControlLabel
                      sx={{mr:2}}
                      control={
                        <CustomCheckbox
                          color="success"
                          checked={checkY}
                          onChange={(e:any) => {setCheckY(e.target.checked);}}
                          inputProps={{ 'aria-label': 'checkbox with default color' }}
                        />
                      }
                      label="Y"
                    />
                    <FormControlLabel
                      sx={{mr:2}}
                      control={
                        <CustomCheckbox
                          color="success"
                          checked={checkN}
                          onChange={(e:any) => {setCheckN(e.target.checked);}}
                          inputProps={{ 'aria-label': 'checkbox with default color' }}
                        />
                      }
                      label="N"
                    />
                    <FormControlLabel
                      sx={{mr:2}}
                      control={
                        <CustomCheckbox
                          color="success"
                          checked={checkNA}
                          onChange={(e:any) => {setCheckNA(e.target.checked);}}
                          inputProps={{ 'aria-label': 'checkbox with default color' }}
                        />
                      }
                      label="N/A"
                    />

                    <Button
                      variant={'contained'}
                      color={"primary"}
                      sx={{width:90, ml: 'auto'}}
                    >
                      일괄적용
                    </Button> 
                  </Box>
                </Box>
                
              </Box>
              
              {(consigneeData.sub_state >= 2 || consigneeData.state == 3) &&
                <TableContainer component={Paper}>
                  <Table>
                  <TableHead >
                    <TableRow sx={{backgroundColor:'success'}}> 
                      <TableCell style={{ textAlign: 'center'}}>영역</TableCell>
                      <TableCell style={{ textAlign: 'center'}}>분야</TableCell>
                      <TableCell style={{ textAlign: 'center'}}>항목</TableCell>
                      <TableCell style={{ textAlign: 'center'}}>세부 점검 항목</TableCell>
                      <TableCell style={{ textAlign: 'center'}}>점검결과</TableCell>
                      <TableCell style={{ textAlign: 'center'}}>중적첨부</TableCell> 
                      <TableCell style={{ textAlign: 'center'}}>검수결과</TableCell> 
                      <TableCell style={{ textAlign: 'center'}}>보완조치</TableCell> 
                      <TableCell style={{ textAlign: 'center'}}>최종결과</TableCell> 
                      <TableCell style={{ textAlign: 'center'}}>최근 수정 날짜</TableCell> 
                      <TableCell style={{ textAlign: 'center'}}>Lock</TableCell> 
                      <TableCell style={{ textAlign: 'center'}}>상세</TableCell> 
                    </TableRow>
                  </TableHead>
                    <TableBody>
                      {checklistData.map((row:any, rowIndex) => ( 
                        <TableRow key={row.id}>
                          {Object.keys(row).map((key, colIndex) => {
                            console.log(row)
                            return colIndex == 2 &&  row.merged1 !== 0 ?
                              (
                              <TableCell
                                key={colIndex}
                                style={{ textAlign: 'center', cursor: 'pointer' }}
                                rowSpan={row.merged1 > 0 ? row.merged1 : 1} 
                                sx={{width:200, pa:0}}
                              >

                                  <TextareaAutosize 
                                    value={row.area} 
                                    style={{ 
                                      width: "100%", 
                                      minHeight: 32, 
                                      resize: "none", 
                                      border: "none", 
                                      outline: "none",
                                      pointerEvents: "none" // 입력 비활성화
                                    }} 
                                  /> 
                              </TableCell>
                            )
                            : colIndex == 3 &&  row.merged2 !== 0 ?
                            (
                              <TableCell
                                key={colIndex}
                                style={{ textAlign: 'center', cursor: 'pointer'}}
                                rowSpan={row.merged2 > 0 ? row.merged2 : 1} 
                                sx={{width:250}}
                              >
                                  <TextareaAutosize 
                                    value={row.domain} 
                                    style={{ 
                                      width: "100%", 
                                      minHeight: 32, 
                                      resize: "none", 
                                      border: "none", 
                                      outline: "none",
                                      pointerEvents: "none" // 입력 비활성화
                                    }} 
                                  />  
                              </TableCell>
                            )
                            : colIndex == 4  ?
                            (
                              <TableCell
                                key={colIndex}
                                style={{ textAlign: 'center', cursor: 'pointer'}}
                                
                                sx={{width:250}}
                              >
                                  <TextareaAutosize 
                                  value={row.item} 
                                  style={{ 
                                    width: "100%", 
                                    minHeight: 32, 
                                    resize: "none", 
                                    border: "none", 
                                    outline: "none",
                                    pointerEvents: "none" // 입력 비활성화
                                  }} 
                                />
                              </TableCell>
                            ): colIndex == 5  ?
                              <TableCell
                                key={colIndex}
                                style={{ cursor: 'pointer'}}
                                sx={{width:700}}
                              >
                                  <TextareaAutosize 
                                    value={row.detail_item} 
                                    style={{ 
                                      width: "100%", 
                                      minHeight: 32, 
                                      resize: "none", 
                                      border: "none", 
                                      outline: "none",
                                      pointerEvents: "none" // 입력 비활성화
                                    }} 
                                  />
                                  {row.show_detail && (
                                    <>
                                      <Button
                                        variant={'contained'}
                                        color={"primary"}
                                        size={'small'}
                                        sx={{width:80}}
                                      >
                                        설명
                                      </Button> 
                                      <Typography sx={{mt: 1}}>현황</Typography>
                                      <TextField  
                                        fullWidth
                                        variant="outlined" 
                                        value={row.current_status}
                                      
                                        onChange={(e:any) => {
                                          let newData: any[] = [];
                                          checklistData.map((x) => {
                                            if (x.id == row.id) {
                                              x.current_status = e.target.value;
                                            }
                                            newData.push(x)
                                          })

                                          setChecklistData(newData)
                                        }}
                                        required
                                      /> 
                                      <Typography sx={{mt: 1}}>보완 요청 사항</Typography>
                                      <TextField  
                                        fullWidth
                                        variant="outlined" 
                                        value={row.modify_request}
                                      
                                        required
                                      /> 
                                      <Typography sx={{mt: 1}}>점검 결과 의견</Typography>
                                      <TextField  
                                        fullWidth
                                        variant="outlined" 
                                        value={row.check_suggestion}
                                      
                                        
                                        required
                                      /> 
                                    </>
                                  )}
                              </TableCell>
                              : colIndex == 6  ?
                              <TableCell
                                key={colIndex}
                                style={{ textAlign: 'center', cursor: 'pointer'}}
                                
                                sx={{width:100}}
                              >
                                {row.show_detail ? (
                                  <CustomSelect
                                    id="account-type-select"
                                    sx={{ width: 70 }}
                                    value={row.self_check_result} 
                                    onChange={(event:any) => {
                                      let newData: any[] = [];
                                      checklistData.map((x) => {
                                        if (x.id == row.id) {
                                          x.self_check_result = event.target.value;
                                        }
                                        newData.push(x)
                                      })

                                      setChecklistData(newData)
                                    }} 
                                  >
                                    <MenuItem value={'Y'}>Y</MenuItem>
                                    <MenuItem value={'N'}>N</MenuItem>
                                    <MenuItem value={'N/A'}>N/A</MenuItem>
                                  </CustomSelect>
                                ) : (
                                  <TextareaAutosize 
                                    value={row.self_check_result} 
                                    style={{ 
                                      width: "100%", 
                                      minHeight: 32, 
                                      resize: "none", 
                                      border: "none", 
                                      outline: "none",
                                      pointerEvents: "none" // 입력 비활성화
                                    }} 
                                  />
                                )}
                                  
                              </TableCell>
                              : colIndex == 7  ?
                              <TableCell
                                key={colIndex}
                                style={{ textAlign: 'center', cursor: 'pointer'}}
                              
                                sx={{width:100}}
                              > 
                                  <TextareaAutosize 
                                    value={row.attachment} 
                                    style={{ 
                                      width: "100%", 
                                      minHeight: 32, 
                                      resize: "none", 
                                      border: "none", 
                                      outline: "none",
                                      pointerEvents: "none" // 입력 비활성화
                                    }} 
                                  />
                              </TableCell>
                            : colIndex == 8  ?
                            <TableCell
                              key={colIndex}
                              style={{ textAlign: 'center', cursor: 'pointer'}}
                              
                              sx={{width:100}}
                            >
                                <TextareaAutosize 
                                  value={row.check_result} 
                                  style={{ 
                                    width: "100%", 
                                    minHeight: 32, 
                                    resize: "none", 
                                    border: "none", 
                                    outline: "none",
                                    pointerEvents: "none" // 입력 비활성화
                                  }} 
                                />
                            </TableCell>
                            : colIndex == 9  ?
                            <TableCell
                              key={colIndex}
                              style={{ textAlign: 'center', cursor: 'pointer'}}
                              
                              sx={{width:100}}
                            >
                                <TextareaAutosize 
                                  value={row.additional} 
                                  style={{ 
                                    width: "100%", 
                                    minHeight: 32, 
                                    resize: "none", 
                                    border: "none", 
                                    outline: "none",
                                    pointerEvents: "none" // 입력 비활성화
                                  }} 
                                />
                            </TableCell>
                            : colIndex == 10  ?
                            <TableCell
                              key={colIndex}
                              style={{ textAlign: 'center', cursor: 'pointer'}}
                              
                              sx={{width:100}}
                            >
                                <TextareaAutosize 
                                  value={row.result} 
                                  style={{ 
                                    width: "100%", 
                                    minHeight: 32, 
                                    resize: "none", 
                                    border: "none", 
                                    outline: "none",
                                    pointerEvents: "none" // 입력 비활성화
                                  }} 
                                />
                            </TableCell>
                            : colIndex == 11  ?
                            <TableCell
                              key={colIndex}
                              style={{ textAlign: 'center', cursor: 'pointer'}}
                              
                              sx={{width:120}}
                            >
                                <TextareaAutosize 
                                  value={row.modify_time} 
                                  style={{ 
                                    width: "100%", 
                                    minHeight: 32, 
                                    resize: "none", 
                                    border: "none", 
                                    outline: "none",
                                    pointerEvents: "none" // 입력 비활성화
                                  }} 
                                />
                            </TableCell>
                            : colIndex == 12  ?
                            <TableCell
                              key={colIndex}
                              style={{ textAlign: 'center', cursor: 'pointer'}}
                              onClick={() => {
                                let newData: any[] = [];
                                checklistData.map((x) => {
                                  if (x.id == row.id) {
                                    x.show_detail = !x.show_detail;
                                  }
                                  newData.push(x)
                                })

                                setChecklistData(newData)
                              }}
                              sx={{width:80}}
                            >
                              {row.show_detail ? (
                                <Image src={DetailOff} alt={"SavingsImg"} width="25" />
                              ): (
                                <Image src={DetailOn} alt={"SavingsImg"} width="25" />
                              )}
                            </TableCell>
                            : null;
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              }
            </>
          ) : (userType == 1) ? (
            <>
              <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>

                <Button
                  variant={'contained'}
                  color={"primary"}
                  sx={{width:100, ml:1}}
                >
                  임시 저장
                </Button> 
                <Button
                  variant={'contained'}
                  color={"primary"}
                  sx={{width:100, ml:1}}
                >
                  다운로드
                </Button> 
                <Button
                  variant={'contained'}
                  color={"primary"}
                  sx={{width:100, ml:1}}
                  onClick={() => {
                    consigneeSubmit();
                  }}
                >
                  제출
                </Button> 
              </Box>

              <TableContainer component={Paper}>
                <Table>
                <TableHead >
                  <TableRow sx={{backgroundColor:'success'}}> 
                    <TableCell style={{ textAlign: 'center'}}>영역</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>분야</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>항목</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>세부 점검 항목</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>점검결과</TableCell>
                    <TableCell style={{ textAlign: 'center'}}>중적첨부</TableCell> 
                    <TableCell style={{ textAlign: 'center'}}>검수결과</TableCell> 
                    <TableCell style={{ textAlign: 'center'}}>보완조치</TableCell> 
                    <TableCell style={{ textAlign: 'center'}}>최종결과</TableCell> 
                    <TableCell style={{ textAlign: 'center'}}>최근 수정 날짜</TableCell> 
                    <TableCell style={{ textAlign: 'center'}}>상세</TableCell> 
                  </TableRow>
                </TableHead>
                  <TableBody>
                    {checklistData.map((row:any, rowIndex) => ( 
                      <TableRow key={row.id}>
                        {Object.keys(row).map((key, colIndex) => {
                          const isEditing = false;
                        
                          return colIndex == 2 &&  row.merged1 !== 0 ?
                            (
                            <TableCell
                              key={colIndex}
                              style={{ textAlign: 'center', cursor: 'pointer' }}
                              rowSpan={row.merged1 > 0 ? row.merged1 : 1} 
                              sx={{width:200, pa:0}}
                            >

                                <TextareaAutosize 
                                  value={row.area} 
                                  style={{ 
                                    width: "100%", 
                                    minHeight: 32, 
                                    resize: "none", 
                                    border: "none", 
                                    outline: "none",
                                    pointerEvents: "none" // 입력 비활성화
                                  }} 
                                /> 
                            </TableCell>
                          )
                          : colIndex == 3 &&  row.merged2 !== 0 ?
                          (
                            <TableCell
                              key={colIndex}
                              style={{ textAlign: 'center', cursor: 'pointer'}}
                              rowSpan={row.merged2 > 0 ? row.merged2 : 1} 
                              sx={{width:250}}
                            >
                                <TextareaAutosize 
                                  value={row.domain} 
                                  style={{ 
                                    width: "100%", 
                                    minHeight: 32, 
                                    resize: "none", 
                                    border: "none", 
                                    outline: "none",
                                    pointerEvents: "none" // 입력 비활성화
                                  }} 
                                />  
                            </TableCell>
                          )
                          : colIndex == 4  ?
                          (
                            <TableCell
                              key={colIndex}
                              style={{ textAlign: 'center', cursor: 'pointer'}}
                              
                              sx={{width:250}}
                            >
                                <TextareaAutosize 
                                value={row.item} 
                                style={{ 
                                  width: "100%", 
                                  minHeight: 32, 
                                  resize: "none", 
                                  border: "none", 
                                  outline: "none",
                                  pointerEvents: "none" // 입력 비활성화
                                }} 
                              />
                            </TableCell>
                          ): colIndex == 5  ?
                            <TableCell
                              key={colIndex}
                              style={{ cursor: 'pointer'}}
                              sx={{width:700}}
                            >
                                <TextareaAutosize 
                                  value={row.detail_item} 
                                  style={{ 
                                    width: "100%", 
                                    minHeight: 32, 
                                    resize: "none", 
                                    border: "none", 
                                    outline: "none",
                                    pointerEvents: "none" // 입력 비활성화
                                  }} 
                                />
                                {row.show_detail && (
                                  <>
                                    <Button
                                      variant={'contained'}
                                      color={"primary"}
                                      size={'small'}
                                      sx={{width:80}}
                                    >
                                      설명
                                    </Button> 
                                    <Typography sx={{mt: 1}}>현황</Typography>
                                    <TextField  
                                      fullWidth
                                      variant="outlined" 
                                      value={row.current_status}
                                    
                                      onChange={(e:any) => {
                                        let newData: any[] = [];
                                        checklistData.map((x) => {
                                          if (x.id == row.id) {
                                            x.current_status = e.target.value;
                                          }
                                          newData.push(x)
                                        })

                                        setChecklistData(newData)
                                      }}
                                      required
                                    /> 
                                    <Typography sx={{mt: 1}}>보완 요청 사항</Typography>
                                    <TextField  
                                      fullWidth
                                      variant="outlined" 
                                      value={row.modify_request}
                                    
                                      required
                                    /> 
                                    <Typography sx={{mt: 1}}>점검 결과 의견</Typography>
                                    <TextField  
                                      fullWidth
                                      variant="outlined" 
                                      value={row.check_suggestion}
                                    
                                      
                                      required
                                    /> 
                                  </>
                                )}
                            </TableCell>
                            : colIndex == 6  ?
                            <TableCell
                              key={colIndex}
                              style={{ textAlign: 'center', cursor: 'pointer'}}
                              
                              sx={{width:100}}
                            >
                              {row.show_detail ? (
                                <CustomSelect
                                  id="account-type-select"
                                  sx={{ width: 70 }}
                                  value={row.self_check_result} 
                                  onChange={(event:any) => {
                                    let newData: any[] = [];
                                    checklistData.map((x) => {
                                      if (x.id == row.id) {
                                        x.self_check_result = event.target.value;
                                      }
                                      newData.push(x)
                                    })

                                    setChecklistData(newData)
                                  }} 
                                >
                                  <MenuItem value={'Y'}>Y</MenuItem>
                                  <MenuItem value={'N'}>N</MenuItem>
                                  <MenuItem value={'N/A'}>N/A</MenuItem>
                                </CustomSelect>
                              ) : (
                                <TextareaAutosize 
                                  value={row.self_check_result} 
                                  style={{ 
                                    width: "100%", 
                                    minHeight: 32, 
                                    resize: "none", 
                                    border: "none", 
                                    outline: "none",
                                    pointerEvents: "none" // 입력 비활성화
                                  }} 
                                />
                              )}
                                
                            </TableCell>
                            : colIndex == 7  ?
                            <TableCell
                              key={colIndex}
                              style={{ textAlign: 'center', cursor: 'pointer'}}
                            
                              sx={{width:100}}
                            > 
                                <TextareaAutosize 
                                  value={row.attachment} 
                                  style={{ 
                                    width: "100%", 
                                    minHeight: 32, 
                                    resize: "none", 
                                    border: "none", 
                                    outline: "none",
                                    pointerEvents: "none" // 입력 비활성화
                                  }} 
                                />
                            </TableCell>
                          : colIndex == 8  ?
                          <TableCell
                            key={colIndex}
                            style={{ textAlign: 'center', cursor: 'pointer'}}
                            
                            sx={{width:100}}
                          >
                              <TextareaAutosize 
                                value={row.check_result} 
                                style={{ 
                                  width: "100%", 
                                  minHeight: 32, 
                                  resize: "none", 
                                  border: "none", 
                                  outline: "none",
                                  pointerEvents: "none" // 입력 비활성화
                                }} 
                              />
                          </TableCell>
                          : colIndex == 9  ?
                          <TableCell
                            key={colIndex}
                            style={{ textAlign: 'center', cursor: 'pointer'}}
                            
                            sx={{width:100}}
                          >
                              <TextareaAutosize 
                                value={row.additional} 
                                style={{ 
                                  width: "100%", 
                                  minHeight: 32, 
                                  resize: "none", 
                                  border: "none", 
                                  outline: "none",
                                  pointerEvents: "none" // 입력 비활성화
                                }} 
                              />
                          </TableCell>
                          : colIndex == 10  ?
                          <TableCell
                            key={colIndex}
                            style={{ textAlign: 'center', cursor: 'pointer'}}
                            
                            sx={{width:100}}
                          >
                              <TextareaAutosize 
                                value={row.result} 
                                style={{ 
                                  width: "100%", 
                                  minHeight: 32, 
                                  resize: "none", 
                                  border: "none", 
                                  outline: "none",
                                  pointerEvents: "none" // 입력 비활성화
                                }} 
                              />
                          </TableCell>
                          : colIndex == 11  ?
                          <TableCell
                            key={colIndex}
                            style={{ textAlign: 'center', cursor: 'pointer'}}
                            
                            sx={{width:120}}
                          >
                              <TextareaAutosize 
                                value={row.modify_time} 
                                style={{ 
                                  width: "100%", 
                                  minHeight: 32, 
                                  resize: "none", 
                                  border: "none", 
                                  outline: "none",
                                  pointerEvents: "none" // 입력 비활성화
                                }} 
                              />
                          </TableCell>
                          : colIndex == 12  ?
                          <TableCell
                            key={colIndex}
                            style={{ textAlign: 'center', cursor: 'pointer'}}
                            onClick={() => {
                              let newData: any[] = [];
                              checklistData.map((x) => {
                                if (x.id == row.id) {
                                  x.show_detail = !x.show_detail;
                                }
                                newData.push(x)
                              })

                              setChecklistData(newData)
                            }}
                            sx={{width:80}}
                          >
                            {row.show_detail ? (
                              <Image src={DetailOff} alt={"SavingsImg"} width="25" />
                            ): (
                              <Image src={DetailOn} alt={"SavingsImg"} width="25" />
                            )}
                          </TableCell>
                          : null;
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <></>
          )}
        
        </Grid>
      </Grid>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}
      <Dialog open={showModal} onClose={onClose}>
        <DialogTitle></DialogTitle>
        <DialogContent sx={{width:300}} >
          <DialogContentText>{modalMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { onClose(); }}>OK</Button>
        </DialogActions>
      </Dialog> 
    </PageContainer>
  );
};
