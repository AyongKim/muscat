import { Grid, InputAdornment, Button, MenuItem, Divider, Typography, RadioGroup, FormControlLabel, Tabs, Tab } from '@mui/material';
import React, { useState } from 'react';
import CustomFormLabel from '../theme-elements/CustomFormLabel';
import CustomTextField from '../theme-elements/CustomTextField';
import CustomOutlinedInput from '../theme-elements/CustomOutlinedInput';
import CustomSelect from '../theme-elements/CustomSelect';
import CustomRadio from '../theme-elements/CustomRadio';
import { Paper,InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Select,  InputLabel, FormControl, Chip,  Box } from '@mui/material';

// Define the type for a privacy item
type PrivacyItem = {
  label: string;
  value: string;
};
const BasicLayout = () => {
  const [companyName, setCompanyName] = useState<string>('');
  const [registrationNumber, setRegistrationNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
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
  const [currentItem, setCurrentItem] = useState<string>('');
  const [submissionFailed, setSubmissionFailed] = useState<boolean>(true);

  // The privacy items that you can select from the dropdown
  const privacyItems: PrivacyItem[] = [
    { label: '전문분야별', value: 'specialty' },
    { label: 'ID', value: 'id' },
    { label: '변호사', value: 'lawyer' },
    { label: '지점별', value: 'branch' },
    { label: '이름', value: 'name' },
    { label: '전화번호', value: 'phone' },
    { label: '이메일 주소', value: 'email' },
    { label: '활동사항', value: 'activity' },
  ];
 

  const handleDelete = (itemToDelete: PrivacyItem) => () => {
    setSelectedItems((items) => items.filter((item) => item.value !== itemToDelete.value));
  };

 
  const [value2, setValue2] = React.useState('');
  const [value3, setValue3] = React.useState('');
  const [value4, setValue4] = React.useState('');
  const [value5, setValue5] = React.useState('');

  const handleChange2 = (event: any) => {
    setValue2(event.target.value);
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


  const handleSelectChange = (event : any) => {
    const { name, value } = event.target;
    setCurrentItem(value as string);
    if (name && value && !selectedItems.find((item) => item.value === value)) {
      const newItem = privacyItems.find((item) => item.value === value);
      if (newItem) {
        setSelectedItems([...selectedItems, newItem]);
      }
    }
  };
 
  return (
    <div>
      {submissionFailed &&  <Typography color="error">업체명을 입력해주세요.</Typography>}
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Layout */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <Grid container spacing={3}>
        {/* 1 */}
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-name" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            업체명
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <CustomTextField id="bl-name" placeholder="John Deo" fullWidth />
        </Grid>
        {/* 2 */}
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-company" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            사업자 등록번호
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <CustomTextField id="bl-company" placeholder="ACME Inc." fullWidth />
        </Grid>
        {/* 3 */}
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-email" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            주소
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <CustomOutlinedInput
            endAdornment={<InputAdornment position="end">@example.com</InputAdornment>}
            id="bl-email"
            placeholder="john.deo"
            fullWidth
          />
        </Grid>
        
        {/* 5 */}
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
          계약내용
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <CustomTextField
            id="bl-message"
            placeholder="Hi, Do you  have a moment to talk Jeo ?"
            multiline
            fullWidth
          />
        </Grid>

       
        {/* 4 */}
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="fs-date" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
           계약기간
          </CustomFormLabel>
        </Grid>
        <Grid item xs={6} sm={4}>
          <CustomTextField type="date" id="fs-date" placeholder="John Deo" fullWidth />
        </Grid>
        <Grid item xs={6} sm={4}>
          <CustomTextField type="date" id="fs-date" placeholder="John Deo" fullWidth />
        </Grid>

        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-email" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            대표 업종
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <CustomOutlinedInput
            endAdornment={<InputAdornment position="end">@example.com</InputAdornment>}
            id="bl-email"
            placeholder="john.deo"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-email" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            전체 직원 수
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <CustomOutlinedInput
            endAdornment={<InputAdornment position="end">명</InputAdornment>}
            id="bl-email"
            placeholder="john.deo"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="privacy-item-select-label" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            개인정보취급자 수
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
        <Select
          labelId="privacy-item-select-label"
          id="privacy-item-select"
          value={currentItem}
          label="Privacy Item"
          onChange={handleSelectChange}
          sx={{width:150}}
        >
          {privacyItems.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        <Paper
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginTop: '20px',
          padding: '10px',
        }}
      >
        {selectedItems.map((item, index) => (
          <Chip
            key={item.value}
            label={item.label}
            onDelete={handleDelete(item)}
          />
        ))}
      </Paper>
        </Grid>

       
        

        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-email" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            개인정보취급자 수
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <CustomOutlinedInput
            endAdornment={<InputAdornment position="end">명</InputAdornment>}
            id="bl-email"
            placeholder="john.deo"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-email" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            연간 개인정보 처리량
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <RadioGroup row name="delivery-opt" value={value2} onChange={handleChange2}>
              <FormControlLabel value="radio1" control={<CustomRadio />} label="1천명 이하" />
              <FormControlLabel value="radio2" control={<CustomRadio />} label="1천명 이상" />
              <FormControlLabel value="radio3" control={<CustomRadio />} label="1만명 이상" />
              <FormControlLabel value="radio4" control={<CustomRadio />} label="5만명 이상" />
              <FormControlLabel value="radio5" control={<CustomRadio />} label="10만명 이상" />
              <FormControlLabel value="radio6" control={<CustomRadio />} label="100만명 이상" />
            </RadioGroup>
        </Grid>


        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-email" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            자체처리시스템 사용 현황
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9} display="flex" alignItems="center" justifyContent="start"> 
            <RadioGroup  row name="delivery-opt" value={value2} onChange={(event: any) => { setValue3(event.target.value);}}>
              <FormControlLabel value="radio1" control={<CustomRadio />} label="미사용" />
              <FormControlLabel value="radio2" control={<CustomRadio />} label="사용" /> 
            </RadioGroup> 
            <Grid item xs={12} sm={3}>
              <CustomTextField id="cs-fname" placeholder="John Deo" fullWidth />
            </Grid>
        </Grid>

        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-email" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            재위탁 현황
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9} display="flex" alignItems="center" justifyContent="start"> 
            <RadioGroup  row name="delivery-opt" value={value2} onChange={(event: any) => { setValue4(event.target.value);}}>
              <FormControlLabel value="radio1" control={<CustomRadio />} label="미사용" />
              <FormControlLabel value="radio2" control={<CustomRadio />} label="사용" /> 
            </RadioGroup> 
            <Grid item xs={12} sm={3}>
              <CustomTextField id="cs-fname" placeholder="John Deo" fullWidth />
            </Grid>
        </Grid>

        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-email" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            제3자제공 현황
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9} display="flex" alignItems="center" justifyContent="start"> 
            <RadioGroup  row name="delivery-opt" value={value2} onChange={(event: any) => { setValue5(event.target.value);}}>
              <FormControlLabel value="radio1" control={<CustomRadio />} label="미사용" />
              <FormControlLabel value="radio2" control={<CustomRadio />} label="사용" /> 
            </RadioGroup> 
            <Grid item xs={12} sm={3}>
              <CustomTextField id="cs-fname" placeholder="John Deo" fullWidth />
            </Grid>
        </Grid>

      

        <Grid item xs={12}>
          <Divider sx={{mx: "-24px"}} />
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
          <CustomTextField id="bl-name" placeholder="홍길동" fullWidth />
        </Grid>
        {/* 4 */}
        <Grid item xs={12} sm={3} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-phone" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
             담당자 연락처
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12} sm={9}>
          <CustomTextField id="bl-phone" placeholder="412 2150 451" fullWidth />
        </Grid>
      </Grid>
      <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            수정
          </Button>
        </Grid>
    </div>
  );
};

export default BasicLayout;
