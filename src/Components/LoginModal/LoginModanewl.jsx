import React from 'react'
import './LoginModal.css';
import googlelogo from '../../Images/googlelogonew.png'
const LoginModanewl = () => {
  return (
    <div style={{width:"100vw",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div className='Login_modal'>
      <span className='modal_head'>Sign in with&nbsp;<img style={{height:"53px",width:"135px"}} src={googlelogo} alt="" /></span>
      {/* <div className="link1">yash</div> */}
      <div className="link2"><button className='m-button'>Sign in</button></div>
      
    </div>
    </div>
  )
}

export default LoginModanewl