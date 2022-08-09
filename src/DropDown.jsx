import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
  {
    value: 'Pune',
    label: 'Pune',
  },
  {
    value: 'Nagpur',
    label: 'Nagpur',
  },
  {
    value: 'Patna',
    label: 'Patna',
  }
];

export default function SelectTextFields({City,setCity}) {
  

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25.7ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div className=' drop-down-box  '>
        <TextField
          id="outlined-select-currency"
          select
          label="City"
          value={City}
          onChange={handleChange}
          helperText="Please select your City"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
       
      </div>
      
    </Box>
  );
}
