// import { useState, useEffect } from "react";
// import io from "socket.io-client";

// const socket = io("http://127.0.0.1:5000");

// function App() {
//   const [message, setMessage] = useState("");
//   const [vulnerabilities, setVulnerabilities] = useState([]);

//   useEffect(() => {
//     socket.on("update", (data) => {
//       setVulnerabilities((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off("update");
//     };
//   }, []);

//   const startFetching = async () => {
//     setMessage("Fetching vulnerabilities...");

//     try {
//       const response = await fetch("http://127.0.0.1:5000/start_scraping");
//       const data = await response.json();
//       setMessage(data.message);
//     } catch (error) {
//       setMessage("Error starting scraper!");
//     }
//   };

//   return (
//     <div>
//       <h1>Vulnerability Scraper</h1>
//       <button onClick={startFetching}>Start Fetching</button>
//       <p>{message}</p>

//       <h2>Real-Time Vulnerabilities</h2>
//       <ul>
//         {vulnerabilities.map((vuln, index) => (
//           <li key={index}>
//             <strong>{vuln.cve_id}</strong> - {vuln.description} (Severity: {vuln.severity})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
import React from 'react'
import Dashboard from './Dashboard'
import {BrowserRouter as Router,Routes ,Route, BrowserRouter} from 'react-router-dom'
import Vulnerable from './Vulnerable'
function App() {
  return (
    <div>
        <Router>
             <Routes>
                 <Route path="/" element={<Dashboard/>}/>
                 <Route path="/vulnerable" element={<Vulnerable/>}/>
             </Routes>
        </Router>
    </div>
  )
}

export default App;
