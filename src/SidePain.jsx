import React from  'react';
import AllNodeData from './AllNodeData';

export default () => {
   
  const onDragStart = (event, nodeType,index,title) => {
    
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('index', index);
    event.dataTransfer.setData('title', title);
   
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    
    <>
      
        <div className='row  text-row'>
            <div className='col-11 text-col '>
               <div className="description">You can drag these nodes to the pane on the right.</div>
            </div>
         </div>
        
        {AllNodeData.map((val,index)=>{
           
           return (
            <div key={index} className='row  custom-node-row '>
            <div  className="col-8 custom-node-col " onDragStart={(event) => onDragStart(event, 'special',index,val.title)} draggable>
               {val.title}
            </div>    
            </div> 
           );
        })}
         
        
         
         
      
    </>
    
  );
};
