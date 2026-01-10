
import { useDispatch} from 'react-redux';
import { increment,decrement } from '../redux/slice';
import { showToast } from '../redux/toastSlice';
import { TOAST_MESSAGES } from '../Messages/toastMessages.js';
const AppBody = () => {
   const dispatch=useDispatch();
   
  return (
    <div style={{height:"100vh"}}>
      <h1>Redux Practice</h1>
      <p>This is the main content area of the application.</p>
      <div>
        <button className='inc' onClick={() => dispatch(increment())}>Increment</button>
        <button className='dec' onClick={()=>dispatch(decrement())}>Decrement</button>
        <button className='suc' onClick={()=>dispatch(showToast(TOAST_MESSAGES.MESSAGE_SUCCESS))}>Success</button>
        <button className='fai'onClick={()=>dispatch(showToast(TOAST_MESSAGES.MESSAGE_FAILED ))}>Failed</button>
      </div>
    </div>
  )
}

export default AppBody
