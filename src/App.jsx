import React,{useState,useRef,useCallback} from 'react';
import ReactFlow, { Handle, Position,ReactFlowProvider,addEdge,removeElements,  useZoomPanHelper} from 'react-flow-renderer';
import EditIcon from '@mui/icons-material/Edit';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import SidePain from './SidePain';
import localforage from 'localforage';
import AllNodeData from './AllNodeData';
import InputText from './InputText';
import InputNumber from './InputNumber';
import DropDown from './DropDown';
import DatePicker from './DatePicker';

localforage.config({
  name: 'react-flow-docs',
  storeName: 'flows',
});

const flowKey = 'example-flow';

const initialElements = [
 
];
let nodeName="";
let nodeIndex=0;
let type=[];


const customNodeStyles = {
  
  color: 'black',
  padding: 10,
  height:100,
  width:140,
  border: '2px #30E7ED solid',
  borderRadius: '10px',
  
};


const getId = () => `randomnode_${+new Date()}`;


const CustomNodeExample = () => {

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);
    
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const index = event.dataTransfer.getData('index');
    const title = event.dataTransfer.getData('title');
  
    
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: 
       { text: `${title}`, 
         index:index } 
      
    };
    console.log(index);
    setElements((es) => es.concat(newNode));
    
  };
 
  const [state, setState] = useState(false);



  const toggleDrawer = (data) => (event) => {
    setState(!state);
    nodeName=data.text;
    nodeIndex=data.index;
   
      
      {AllNodeData[Number(nodeIndex)].formAttributes.map((item,index)=>{
      type[index]=item.type;

       
       console.log(type);
       
         
      })}
     
    
     
    
    
  };
  


  const [NodeInfo, setNodeInfo] = useState([]);
  const [InpText, setInpText] = useState("");
  const [InpNum, setInpNum] = useState("");
  const [Dob, setDob] = useState(null);
  const [City, setCity] = useState("");
  
  
  const Submit = () =>{
    
  alert(InpText + " " + InpNum + " " + Dob + " " + City);
  setInpText("");
  setInpNum("");
  setCity("");
  setDob(null);   
};

  const list = (anchor,nodeName,nodeIndex) => (
   
    <Box className='drawer-box'
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation" className='drawer-box'
     
    >
    
      
        <div className=' cross-icon-box'>
          <ClearIcon className='cross' onClick={toggleDrawer(()=>{setState(!state)})}/>
        </div>  
     
        <div className='node-name-text'>
          {nodeName}
        </div>
        
            {type.map((val,i)=>{
            
              if (val == "inputText") {
               return (<InputText InpText={InpText} setInpText={setInpText}  key={i}/>);
            }

               else if (val== "inputNumber") {
                return (<InputNumber InpNum={InpNum} setInpNum={setInpNum}   key={i}/>);
            } 
               else if (val== "dropdown") {
                return (<DropDown City={City} setCity={setCity}  key={i}/>);
            }  
            else if (val== "date") {
                return (<DatePicker   Dob={Dob} setDob={setDob} key={i}/>);
            }  
            
            })}
         
          




        
        
        <div className='submit-btn'>
          <Button  onClick={Submit} variant="outlined">Submit</Button>
        </div>
        
      
  
      
    </Box>
  );

 

    const [Open, setOpen] = useState(false);
    const CustomNodeComponent = ({data}) => {
      
        return (
          
          <div className='container' style={customNodeStyles}>
              <Handle type="target" position={Position.Left} style={{ borderRadius: 20 }} />
                  <div className='row' >
                      
                      <div className='col-12  icon-box'>
                          <EditIcon className='nodrag icon' sx={{ fontSize: 16 }} onClick={toggleDrawer(data)} aria-controls="collapse"/>
                      </div>
                      
                  </div>
                  <div className='row'>
                      <div className='col-12 text-box'>
                         <bold>{data.text}</bold>
                      </div>
                  </div>
                  <Handle
                      type="source"
                      position={Position.Right}
                      id="b"
                      style={{ top: '50%', borderRadius: 20, }}
      />
          </div>
          
        );
      };
      
      const nodeTypes = {
        special: CustomNodeComponent,
      };
     
      const onSave = useCallback(() => {
        if (reactFlowInstance) {
          const flow = reactFlowInstance.toObject();
          
          localforage.setItem(flowKey, flow);
        }
      }, [reactFlowInstance]);
    
      const onRestore = useCallback(() => {
        const restoreFlow = async () => {
          const flow = await localforage.getItem(flowKey);
    
          if (flow) {
            const [x = 0, y = 0] = flow.position;
            setElements(flow.elements || []);
            
          }
        };
    
        restoreFlow();
      }, [setElements]); 
    
     
  return (
    
    <>  
        
        <div className='row main ' style={{ height: 608 }} >
        
              <ReactFlowProvider>
              
                 <div className=' side-pane '>
                    <SidePain/>
                 </div>
                 <div className='main-pane'  ref={reactFlowWrapper}>
                    <div className='row mt-1 '>
                      <div className='col-8'>
                        
                      </div>
                      <div className='col-2   save-btn-col'>
                        <Button  onClick={onSave} variant="outlined">save</Button>
                      </div>
                      <div className='col-2'>
                        <Button onClick={onRestore} variant="outlined">restore</Button>
                      </div>
                    </div>
                    <ReactFlow 
                    elements={elements} 
                    nodeTypes={nodeTypes}
                    onConnect={onConnect}
                    onElementsRemove={onElementsRemove}
                    onLoad={onLoad}
                    onDrop={onDrop}
                    onDragOver={onDragOver} >
                   
                    </ReactFlow>
                   
                    
                 </div>    
              </ReactFlowProvider>
             
                <Drawer
                  anchor='right'
                  open={state}
                  onClose={toggleDrawer(!state)}
                  
                >
                {list('right',nodeName,nodeIndex)}
                </Drawer>    
        </div>
    </>
  );
};

export default CustomNodeExample;