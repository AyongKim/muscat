import React, { useState, useEffect } from 'react';
import {
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Fab,
  TextField,
  Typography,
  Select,
  InputLabel,
  Box,
  FormControlLabel,
} from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import 'moment/locale/ko'; // 한국어 로케일
import Events from '@src/EventData';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import koLocale from 'date-fns/locale/ko';

import PageContainer from '@src/components/container/PageContainer';
import Breadcrumb from '@src/layouts/full/shared/breadcrumb/Breadcrumb';
import { IconCheck } from '@tabler/icons-react';
import BlankCard from '@src/components/shared/BlankCard'; 
import MenuItem from '@mui/material/MenuItem';
import { Label } from '@mui/icons-material';
import CustomSelect from '@src/components/forms/theme-elements/CustomSelect';
import CustomCheckbox from '@src/components/forms/theme-elements/CustomCheckbox';
const axios = require('axios');
import { API_URL } from '@pages/constant';

moment.locale('ko'); // 한국어로 설정
const localizer = momentLocalizer(moment);

type EvType = {
  title: string;
  allDay?: boolean;
  start?: Date;
  end?: Date;
  color?: string;
};

export default function BigCalendar() {
  const [calevents, setCalEvents] = React.useState<any>(Events);
  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [slot, setSlot] = React.useState<EvType>();
  const [start, setStart] = React.useState<any | null>();
  const [end, setEnd] = React.useState<any | null>();
  const [color, setColor] = React.useState<string>('default');
  const [update, setUpdate] = React.useState<EvType | undefined | any>();
  const [projects, setProjects] = useState([])
  const [project, setProject] = useState(0)
  const [schedule, setSchedule] = useState({
    create_from: '',
    create_to: '',
    self_check_from: '',
    self_check_to: '',
    imp_check_from: '',
    imp_check_to: ''
  })

  const fetchSchedule = async() => {
    if (project) {
      const response = await axios.post(`${API_URL}/project/Schedule`, {
        id: project
      });
      console.log(response.data)
      setSchedule(response.data)  
    }
  }
  useEffect(() => {
    fetchSchedule()
  }, [project])

  const fetchData = async() => {
    const response = await axios.post(`${API_URL}/project/List`);
    console.log(response.data)
    setProjects(response.data)
  }

  useEffect(() => {
    // 프로젝트 목록 가져오기
    fetchData();
    
    const str = sessionStorage.getItem('user')
  }, []);

  const customSlotPropGetter = (date: Date, resourceId?: number | string) => {
    if (date.getDate() === 7 || date.getDate() === 15)
      return {
        style: {
          backgroundColor: '#fec'
        }
      }
    else return {
      style: {
        height: 300
      }
    }
  }

  const ColorVariation = [
    {
      id: 1,
      eColor: '#1a97f5',
      value: 'default',
    },
    {
      id: 2,
      eColor: '#39b69a',
      value: 'green',
    },
    {
      id: 3,
      eColor: '#fc4b6c',
      value: 'red',
    },
    {
      id: 4,
      eColor: '#615dff',
      value: 'azure',
    },
    {
      id: 5,
      eColor: '#fdd43f',
      value: 'warning',
    },
  ];
  const addNewEventAlert = (slotInfo: EvType) => {
    setOpen(true);
    setSlot(slotInfo);
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
  };

  const editEvent = (event: any) => {
    setOpen(true);
    const newEditEvent = calevents.find((elem: EvType) => elem.title === event.title);
    setColor(event.color);
    setTitle(newEditEvent.title);
    setColor(newEditEvent.color);
    setStart(newEditEvent.start);
    setEnd(newEditEvent.end);
    setUpdate(event);
  };

  const updateEvent = (e: any) => {
    e.preventDefault();
    setCalEvents(
      calevents.map((elem: EvType) => {
        if (elem.title === update.title) {
          return { ...elem, title, start, end, color };
        }

        return elem;
      }),
    );
    setOpen(false);
    setTitle('');
    setColor('');
    setStart('');
    setEnd('');
    setUpdate(null);
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const selectinputChangeHandler = (id: string) => setColor(id);

  const submitHandler = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const newEvents = calevents;
    newEvents.push({
      title,
      start,
      end,
      color,
    });
    setOpen(false);
    e.target.reset();
    setCalEvents(newEvents);
    setTitle('');
    setStart(new Date());
    setEnd(new Date());
  };
  const deleteHandler = (event: EvType) => {
    const updatecalEvents = calevents.filter((ind: EvType) => ind.title !== event.title);
    setCalEvents(updatecalEvents);
  };

  const handleClose = () => {
    // eslint-disable-line newline-before-return
    setOpen(false);
    setTitle('');
    setStart(new Date());
    setEnd(new Date());
    setUpdate(null);
  };

  const eventColors = (event: EvType) => {
    if (event.color) {
      return { className: `event-${event.color}` };
    }

    return { className: `event-default` };
  };

  const handleStartChange = (newValue: any) => {
    setStart(newValue);
  };
  const handleEndChange = (newValue: any) => {
    setEnd(newValue);
  };
  const [managerName, setManagerName] = useState<string>('김하늘');
  const [projectName, setProjectName] = useState<string>('trustee');
  return (
    <PageContainer>
      <Breadcrumb title="일정관리"   />
      <Box display={'flex'} sx={{margin:1}} alignItems="center">
        <Typography sx={{mr:1}} >담당자 명</Typography>
        <CustomSelect
          id="account-type-select"
          sx={{mr:4}}
          value={managerName} 
          onChange={(event:any) => {
            setManagerName(event.target.value as string)}}
        >
          <MenuItem value="이예니">이예니</MenuItem>
          <MenuItem value="김하늘">김하늘</MenuItem>
        </CustomSelect>

        <Typography sx={{mr:1}} >프로젝트 명</Typography>
        <CustomSelect
          id="account-type-select"
          sx={{mr:4, width: 200}}
          value={project} 
          onChange={(event:any) => {
            setProject(event.target.value)}}
        >
          {projects.map((x, i) => {
            return (
              <MenuItem value={x.id}>{x.name}</MenuItem>
            );
          })}
        </CustomSelect>
        <FormControlLabel
          sx={{mr:4}}
          control={
            <CustomCheckbox
              defaultChecked
              color="success"
              inputProps={{ 'aria-label': 'checkbox with default color' }}
            />
          }
          label="모든 수탁사 현장점검 일정"
        />
        

        <Typography sx={{mr:1}} >수탁사</Typography>
        <CustomSelect
          id="account-type-select" 
          value={'www'} 
          onChange={(event:any) => {
            setProjectName(event.target.value as string)}}
        >
          <MenuItem value="www">수탁사1</MenuItem>
          <MenuItem value="222">수탁사2</MenuItem>
        </CustomSelect>
      </Box>
      
      <BlankCard>
      
        {/* ------------------------------------------- */}
        {/* Calendar */}
        {/* ------------------------------------------- */}
        <Calendar
          selectable
          events={calevents}
          defaultView="month"
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          localizer={localizer}
          style={{ height: 'calc(100vh - 350px)' }} // 스타일 속성 값에 닫는 괄호를 추가했습니다.
          onSelectEvent={(event) => editEvent(event)}
          onSelectSlot={(slotInfo: any) => addNewEventAlert(slotInfo)}
          eventPropGetter={(event: any) => eventColors(event)}
          slotPropGetter={(date: Date) => customSlotPropGetter(date)}
          messages={{
            allDay: '종일',
            previous: '이전',
            next: '다음',
            today: '오늘',
            month: '월',
            week: '주',
            day: '일',
            agenda: '일정',
            date: '날짜',
            time: '시간',
            event: '일정', // 여기에 더 많은 번역을 추가할 수 있습니다.
            noEventsInRange: '이 기간에 일정가 없습니다.',
            // 다른 문자열들도 필요에 따라 추가 및 번역
          }}
        />

        

      </BlankCard>
      {/* ------------------------------------------- */}
      {/* Add Calendar Event Dialog */}
      {/* ------------------------------------------- */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <form onSubmit={update ? updateEvent : submitHandler}>
          <DialogContent>
            {/* ------------------------------------------- */}
            {/* Add Edit title */}
            {/* ------------------------------------------- */}
            <Typography variant="h4" sx={{ mb: 2 }}>
              {update ? '일정 수정' : '일정 추가'}
            </Typography>
            <Typography mb={3} variant="subtitle2">
              {!update
                ? '일정를 추가하려면 제목을 입력하고 색상을 선택한 후 추가 버튼을 누르세요'
                : '일정를 수정/업데이트하려면 제목을 변경하고 색상을 선택한 후 업데이트 버튼을 누르세요'}
              {slot?.title}
            </Typography>

            <TextField
              id="Event Title"
              placeholder="일정 제목을 입력하세요"
              variant="outlined"
              fullWidth
              label="일정 제목"
              value={title}
              sx={{ mb: 3 }}
              onChange={inputChangeHandler}
            />
            {/* ------------------------------------------- */}
            {/* Selection of Start and end date */}
            {/* ------------------------------------------- */}
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}> 
              <DatePicker
                label="시작 날짜"
                inputFormat="yyyy-MM-dd"
                value={start}
                onChange={handleStartChange}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{ mb: 3 }}
                    error={Boolean(params.error)}
                    helperText={params.error ? '시작 날짜가 올바르지 않습니다.' : ''}
                  />
                )}
              /> 

              <DatePicker
                label="종료 날짜"
                inputFormat="yyyy-MM-dd"
                value={end}
                onChange={handleEndChange}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{ mb: 3 }}
                    error={start && end && start > end}
                    helperText={start && end && start > end ? '종료 날짜는 시작 날짜보다 늦어야 합니다.' : ''}
                  />
                )}
              />
            </LocalizationProvider>

            {/* ------------------------------------------- */}
            {/* Calendar Event Color*/}
            {/* ------------------------------------------- */}
            <Typography variant="h6" fontWeight={600} my={2}>
              일정 색상 선택
            </Typography>
            {/* ------------------------------------------- */}
            {/* colors for event */}
            {/* ------------------------------------------- */}
            {ColorVariation.map((mcolor) => {
              return (
                <Fab
                  color="primary"
                  style={{ backgroundColor: mcolor.eColor }}
                  sx={{
                    marginRight: '3px',
                    transition: '0.1s ease-in',
                    scale: mcolor.value === color ? '0.9' : '0.7',
                  }}
                  size="small"
                  key={mcolor.id}
                  onClick={() => selectinputChangeHandler(mcolor.value)}
                >
                  {mcolor.value === color ? <IconCheck width={16} /> : ''}
                </Fab>
              );
            })}
          </DialogContent>
          {/* ------------------------------------------- */}
          {/* Action for dialog */}
          {/* ------------------------------------------- */}
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleClose}>취소</Button>

            {update ? (
              <Button
                type="submit"
                color="error"
                variant="contained"
                onClick={() => deleteHandler(update)}
              >
                삭제
              </Button>
            ) : (
              ''
            )}
            <Button type="submit" disabled={!title} variant="contained">
              {update ? '일정 수정' : '일정 추가'}
            </Button>
          </DialogActions>
          {/* ------------------------------------------- */}
          {/* End Calendar */}
          {/* ------------------------------------------- */}
        </form>
      </Dialog>
    </PageContainer>
  );
};

