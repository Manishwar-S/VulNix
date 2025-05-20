import React, { useState,useEffect } from 'react'
import './App.css'
import io from "socket.io-client";
const socket = io("http://127.0.0.1:5000");
import { CiSearch } from "react-icons/ci";
import { FaVirusCovid } from "react-icons/fa6";
// import { BsFillCassetteFill } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import PieChartComponent from './PiechartComponent';
import VulnerabilityBarChart from './BarChart';

function Dashboard() {
     const [message, setMessage] = useState("");
     const [emailSuccess, setemailSuccess] = useState("");
     const [emailFailed, setemailFailed] = useState("");

      const [vulnerabilities, setVulnerabilities] = useState([]);
    
      useEffect(() => {
        socket.on("update", (data) => {
          setVulnerabilities((prev) => [...prev, data]);
        });
    
        return () => {
          socket.off("update");
        };
      }, []);
    
      const startFetching = async () => {
        setMessage("Fetching vulnerabilities...");
        setCount(count+1);
        // alert("Fetching vulnerabilities... ");
        
        try {
          const response = await fetch("http://127.0.0.1:5000/start_scraping");
          const data = await response.json();
          setMessage(data.message);
        } catch (error) {
          setMessage("Error starting scraper!");
          // alert("Error starting scraper ! ");
        }
      };
    


  const[notificationOpen,SetnotificationOpen]=useState();
  const [count, setCount] = useState(0);
 
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





  return (
    
    <>
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
              <div className="left-dash-icons home active" onClick={handleOnHome}>
                 <IoMdHome className='l-d-ic'/>
                 <p>Home</p>
              </div>
               <div className="left-dash-icons vulnerable" onClick={handleOnVulnerable} >
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
                          <h2>Dashboard</h2>
                     </div>
                     <div className="r-d-h-notifi">
                          {/* <div className='email-box'>
                              <p>Email</p>
                              <MdOutlineMailOutline />
                          </div> */}

                          <div className="notification-box" onClick={handleonNotification}>
                              <IoIosNotifications className='noti-icon'/>
                              <div className='noti-count'><p>{`${count}`}</p></div>
                              {/* dropdown */}
                             { notificationOpen &&  
                             <div className="drop-notifi">
                                  {/* <p>No Notification Available</p>  */}
                                  {/* <p>Email Sent Seccuessfully...!</p> */}
                                  <ul>
                                     <li><p>Email Sent Seccuessfully...!</p> </li>
                                  </ul>
                              </div>
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
               <div className="body-v">
                 <div className='charts'>
                      <div className="bar-chart">
                              <VulnerabilityBarChart/>
                        </div>
                    <div className="charts">
                          <PieChartComponent/>
                    </div>
                 </div>
               <div className="fetch-button">
                    <div className='fecth-data'>
                        <h1>Vulnerability Scraper</h1>
                        <button onClick={startFetching}>Start Fetching</button>
                        <p>{message}</p>
                        <p>{emailSuccess}</p>
                        <h2>Real-Time Vulnerabilities</h2>
                        <ul>
                            {vulnerabilities.map((vuln, index) => (
                            <li key={index}>
                                <strong>{vuln.cve_id}</strong> - {vuln.description} (Severity: {vuln.severity})
                                {/* <hr></hr> */}
                            </li>
                            ))}
                        </ul>
                    </div>
               </div>
                
               </div>
            
           </div>
       </div>
    </>
  )
}

export default Dashboard