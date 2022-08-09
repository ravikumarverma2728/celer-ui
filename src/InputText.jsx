import React from 'react';
import TextField from '@mui/material/TextField';
const inputText = ({InpText,setInpText}) => {
  return <>
        <div className=' right-pane  '>
            <TextField id="outlined-search" onChange={(event)=>{{setInpText(event.target.value)}}} value={InpText} label="inputText" type="search" autoComplete='off'/>  
        </div>
  </>;
};

export default inputText;
