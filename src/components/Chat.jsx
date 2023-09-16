import React, { useContext } from 'react'
import Cam from '../img/img7.png';
import Call from '../img/img8.png';
import More from '../img/img9.png';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';
const Chat = () => {

  const {data} = useContext(ChatContext);
  return (
    <div className='chat'>
       <div className='chatInfo'>
        <span>{data.user?.displayName}</span>
        <div className='chatIcons'>
            <img src={Call} alt=''/>
            <img src={Cam} alt=''/>
            <img src={More} alt=''/>
        </div>
        
       </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat