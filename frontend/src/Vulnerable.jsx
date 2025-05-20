import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaVirusCovid } from "react-icons/fa6";
import { BsFillCassetteFill } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';

const Vulnerable = () =>
{
    const[notificationOpen,SetnotificationOpen]=useState();
    const handleonNotification =()=>
    {  
           SetnotificationOpen(!notificationOpen)
    }
  
    const[userOpen,SetUserOpen]=useState();
    const handleonUser =()=>
    {  
           SetUserOpen(!userOpen)
    }
    const navigateVulnerable = useNavigate();
    const handleOnVulnerable = () =>
    {
        navigateVulnerable("/vulnerable");
        
    };
  
    const navigateAsset = useNavigate();
    const navigateHome = useNavigate();
  
    const handleOnAsset = () =>
    {
        navigateAsset("/asset");
    };
    const handleOnHome = () =>
      {
          navigateHome("/");
      };
  
    return(
        <div>
            <div className="overall-vulnerable">
                 <div className='overall-dash'>
                            <div className="left-dash">
                               <div className="name">
                                    <h1 >Vulnix</h1>
                                   <IoMdMenu style={{fontSize:"30px"}} />
                               </div>
                              <div className="user">
                                    <div className='profile'></div>
                                    <div> 
                                       <h6>User</h6>
                                     <p>Welcome</p>
                                    </div>
                                   
                               </div> 
                               <div className=' search'>
                                   <CiSearch className='search-icon'/>                 
                                   <input type='text' placeholder='search'></input>
                               </div>
                               <div className="left-dash-icons home " onClick={handleOnHome}>
                                  <IoMdHome className='l-d-ic'/>
                                  <p>Home</p>
                               </div>
                                <div className="left-dash-icons vulnerable active" onClick={handleOnVulnerable} >
                                   <FaVirusCovid className='l-d-ic'/>
                                   <p>Vulnerable</p>
                                </div>
                                {/* <div className="left-dash-icons asset" onClick={handleOnAsset}>
                                  <BsFillCassetteFill className='l-d-ic'/>
                                  <p>Assets</p>
                                </div> */}
                            </div>
                 
                 
                            {/* right dashboard */}
                            <div className='right-dash'>

                                <div className="right-dash-header">
                                      <div className="r-d-h-txt">
                                           <h2>Vulnerable</h2>
                                      </div>
                                      <div className="r-d-h-notifi">
                                    
                 
                                           <div className="notification-box" onClick={handleonNotification}>
                                               <IoIosNotifications className='noti-icon'/>
                                               <div className='noti-count'>0</div>
                                               {/* dropdown */}
                                              { notificationOpen &&  <div className="drop-notifi">
                                               <p>No Notification Available</p> </div>
                                               } 
                                               
                                           </div>
                                           <div className={userOpen ? "user-box-all user-box-all-open" : " user-box-all"}>
                                             <div className="user-box" onClick={handleonUser}> 
                                                   <FaUserCircle className='u-b-ic'/>
                                                   <div style={{display:"flex",alignItems:"center", gap:"7px"}}>
                                                       <p>User</p>
                                                     <IoIosArrowDown />
                                                   </div> 
                                             </div>
                                             <hr className='hr-user-drop'></hr>
                                             <div className="drop-user">
                                                  <div className='drop-user-icon setting'>
                                                  <IoSettingsSharp style={{fontSize:"24px"}} />
                                                  <p>Settings</p>
                                                  </div>
                                                  <div className='drop-user-icon logout'>
                                                  <AiOutlineLogout style={{fontSize:"24px"}} />
                                                  <p>Logout</p>
                                                  </div>
                                             </div>
                                           </div>
                                         
                                      </div>
                                </div>


                            </div>
                        </div>
                
            </div>
        </div>
    )
}
export default Vulnerable;