import React from 'react';
import TextField from '@mui/material/TextField';
const InputNumber = ({InpNum,setInpNum}) => {
  return <>
        <div className=' right-pane  '>
            <TextField id="outlined-search" onChange={(event)=>{{setInpNum(event.target.value)}}} value={InpNum} label="InputNumber" type="search" autoComplete='off'/>  
        </div>
  </>;
};

export default InputNumber;
