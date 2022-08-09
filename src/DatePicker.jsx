import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function BasicDatePicker({Dob,setDob}) {
  

  return (
      <div className='datePicker'>
        <LocalizationProvider  dateAdapter={AdapterDateFns}>
          <DatePicker
            label="DOB"
            value={Dob}
            onChange={(newValue) => {
              setDob(newValue);
              
            }}
            renderInput={(params) => <TextField  {...params} />}
          />
        </LocalizationProvider>
      </div>
  );
}
