import { Grid, InputAdornment, Button, MenuItem, Divider, Typography, RadioGroup, FormControlLabel, Tabs, Tab, Autocomplete,  TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomFormLabel from '../../src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../src/components/forms/theme-elements/CustomTextField';
import CustomOutlinedInput from '../../src/components/forms/theme-elements/CustomOutlinedInput';
import CustomSelect from '../../src/components/forms/theme-elements/CustomSelect';
import CustomRadio from '../../src/components/forms/theme-elements/CustomRadio';
import { Paper,InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Select,  InputLabel, FormControl, Chip,  Box } from '@mui/material';
import { apiUrl } from '@src/utils/commonValues';
import axios from 'axios';

const API_URL = `http://${apiUrl}personal_category`;
interface PrivacyItem {
  id: number;
  personal_category: string;
  description: string;
}
const StatusLayout = () => {
  const [companyName, setCompanyName] = useState<string>('주(바다원)-로그인한 수탁사명');
  const [registrationNumber, setRegistrationNumber] = useState<string>('000-11-22222');
  const [address, setAddress] = useState<string>('서울시 관악구 승방길7 201호');
  const [contractContent, setContractContent] = useState<string>('');
  const [contractStartDate, setContractStartDate] = useState<string>('');
  const [contractEndDate, setContractEndDate] = useState<string>('');
  const [representativeIndustry, setRepresentativeIndustry] = useState<string>('');
  const [totalEmployees, setTotalEmployees] = useState<string>('');
  const [privacyHandlers, setPrivacyHandlers] = useState<string>('');
  const [personalInformationProcessors, setPersonalInformationProcessors] = useState<string>('');
  const [annualPersonalInformation, setAnnualPersonalInformation] = useState<string>('');
  const [systemUsageStatus, setSystemUsageStatus] = useState<string>('');
  const [retrustStatus, setRetrustStatus] = useState<string>('');
  const [thirdPartyStatus, setThirdPartyStatus] = useState<string>('');
  const [personInChargeName, setPersonInChargeName] = useState<string>('');
  const [personInChargeContact, setPersonInChargeContact] = useState<string>('');

  const [selectedItems, setSelectedItems] = useState<PrivacyItem[]>([]);
  const [currentItem, setCurrentItem] = useState<PrivacyItem>();
  const [submissionFailed, setSubmissionFailed] = useState<boolean>(true);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');

  const [privacyItems, setPrivacyItems] = useState<PrivacyItem[]>([]);
  const fetchPrivacyItems = async () => {
    try {
      const response = await axios.post(`${API_URL}/List`);
      if (response.status === 200) {
        setPrivacyItems(response.data); 
      } else {
        console.error('Failed to fetch items');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchPrivacyItems();
  }, []);
  const handleDelete = (itemToDelete: PrivacyItem) => () => {
    setSelectedItems((items) => items.filter((item) => item.id !== itemToDelete.id));
  };

  const handleSubmit = () => {
    if (
      companyName && registrationNumber && address && contractContent &&
      contractStartDate && contractEndDate && representativeIndustry &&
      totalEmployees && personalInformationProcessors && annualPersonalInformation &&
      systemUsageStatus && retrustStatus && thirdPartyStatus &&
      personInChargeName && personInChargeContact
    ) {
      setSubmissionFailed(true);
      // Proceed to my page or submit the form
      console.log('All fields are valid. Submitting the form...');
    } else {
      // Display an error message or highlight the fields with errors
      console.log('Please fill in all required fields.');
    }
  };

  const handleSelectChange = (value: PrivacyItem) => { 
    if(value==null) return;
    setCurrentItem(value);
    setSelectedItems([...selectedItems, value]);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button variant="contained" sx={{ mr: 2 }} onClick={handleSubmit}>
            수정
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            저장
          </Button>
        </Grid>
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            업체명*
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <InputLabel>{companyName}</InputLabel>
        </Grid>
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            사업자 등록번호*
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <InputLabel>{registrationNumber}</InputLabel>
        </Grid>
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
        <CustomFormLabel sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            주소*
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <InputLabel>{'서울시 관악구 승방길7 201호'}</InputLabel>
        </Grid>
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            계약내용*
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={8}>
          <CustomTextField
            id="bl-message"
            placeholder=" "
            multiline
            fullWidth
            value={contractContent}
            onChange={(e:any) => setContractContent(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="fs-date" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            계약기간
          </CustomFormLabel>
        </Grid>
        <Grid item xs={3} sm={3}>
          <CustomTextField
            type="date"
            id="fs-date"
            sx={{width:200}}
            value={contractStartDate}
            onChange={(e:any) => setContractStartDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={3} sm={5}>
          <CustomTextField
            type="date"
            id="fs-date" 
            sx={{width:200}}
            value={contractEndDate}
            onChange={(e:any) => setContractEndDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-work" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            대표 업종*
          </CustomFormLabel>
        </Grid>
        <Grid item sm={9}>
          <CustomOutlinedInput
            id="bl-work"
             sx={{width:200}}
            value={representativeIndustry}
            onChange={(e:any) => setRepresentativeIndustry(e.target.value)}
          />
        </Grid>
        <Grid item sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-people" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            전체 직원 수*
          </CustomFormLabel>
        </Grid>
        <Grid item sm={9}>
          <CustomOutlinedInput
            id="bl-people"
            sx={{width:200}}
            value={totalEmployees}
            onChange={(e:any) => setTotalEmployees(e.target.value)}
            startAdornment={<InputAdornment position="start">총</InputAdornment>}
            endAdornment={<InputAdornment position="end">명</InputAdornment>}
          />
        </Grid>
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-priv" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            개인정보취급자 수*
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <CustomOutlinedInput
            id="bl-priv"
            sx={{width:200}}
            value={privacyHandlers}
            onChange={(e:any) => setPrivacyHandlers(e.target.value)}
            endAdornment={<InputAdornment position="end">명</InputAdornment>}
          />
        </Grid>
        <Grid item xs={12} sm={3} display="flex" alignItems="start">
          <CustomFormLabel htmlFor="privacy-item-select-label" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            개인정보 처리량*
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <RadioGroup row name="delivery-opt" value={value2} onChange={(event) => setValue2(event.target.value)}>
            <FormControlLabel value="radio1" control={<CustomRadio />} label="1천명 이하" />
            <FormControlLabel value="radio2" control={<CustomRadio />} label="1천명 이상" />
            <FormControlLabel value="radio3" control={<CustomRadio />} label="1만명 이상" />
            <FormControlLabel value="radio4" control={<CustomRadio />} label="5만명 이상" />
            <FormControlLabel value="radio5" control={<CustomRadio />} label="10만명 이상" />
            <FormControlLabel value="radio6" control={<CustomRadio />} label="100만명 이상" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={3} display="flex" alignItems="start">
          <CustomFormLabel htmlFor="privacy-item-select-label" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            개인정보취급 항목*
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
        <Autocomplete
            id="privacy-item-select"
            options={privacyItems}
            getOptionLabel={(option) => option.personal_category}
            value={currentItem}
            sx={{width:200}}
            onChange={(event, newValue) => handleSelectChange(newValue)}
            renderInput={(params) => <TextField {...params} label="" />}
          />
          <Box mt={1}>
            {selectedItems.map((item, index) => (
              <Chip
                key={item.id}
                sx={{ml:1}}
                label={item.personal_category}
                onDelete={handleDelete(item)}
              />
            ))} 
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-inner" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            자체처리시스템 사용 현황
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9} display="flex" alignItems="center" justifyContent="start">
          <RadioGroup row name="system-opt" value={value3} onChange={(event) => setValue3(event.target.value)}>
            <FormControlLabel value="radio1" control={<CustomRadio />} label="미사용" />
            <FormControlLabel value="radio2" control={<CustomRadio />} label="사용" />
          </RadioGroup>
          {value3 === 'radio2' && (
            <CustomTextField id="bl-inner" placeholder="시스템 명" sx={{width:600}} />
          )}
        </Grid>
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-re" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            재위탁 현황
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9} display="flex" alignItems="center" justifyContent="start">
          <RadioGroup row name="reconsign-opt" value={value4} onChange={(event) => setValue4(event.target.value)}>
            <FormControlLabel value="radio1" control={<CustomRadio />} label="미사용" />
            <FormControlLabel value="radio2" control={<CustomRadio />} label="사용" />
          </RadioGroup>
          {value4 === 'radio2' && (
            <CustomTextField id="bl-re" sx={{width:600}} placeholder="재위탁사 명(위탁업무)"   />
          )}
          
        </Grid>
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-thid" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            제3자제공 현황
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9} display="flex" alignItems="center" justifyContent="start">
          <RadioGroup row name="thirdparty-opt" value={value5} onChange={(event) => setValue5(event.target.value)}>
            <FormControlLabel value="radio1" control={<CustomRadio />} label="미사용" />
            <FormControlLabel value="radio2" control={<CustomRadio />} label="사용" />
          </RadioGroup>
          {value5 === 'radio2' && (
            <CustomTextField id="bl-thid" placeholder="제3자제공 업체 명(제공내역)" sx={{width:600}} />
          )}
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ mx: '-24px' }} />
          <Typography variant="h6" mt={2}>
            수탁사 담당자 정보
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-name" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            담당자명
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <CustomTextField id="bl-name" placeholder="홍길동"   sx={{width:200}} />
        </Grid>
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-phone" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            담당자 연락처
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <CustomTextField id="bl-phone" placeholder="412 2150 451" sx={{width:200}} />
        </Grid>
      </Grid>
    </div>
  );
};

export default StatusLayout;