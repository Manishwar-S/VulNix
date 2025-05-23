# VulNix
---

🔐 Vulnerability Intelligence Dashboard

A full-stack web application for scraping, analyzing, and reporting critical vulnerabilities in IT and OT OEM equipment. This tool provides real-time updates, filters high-risk unresolved issues, and automatically sends detailed email reports to stakeholders.

---

🚀 Features

 🔎 Automated Web Scraping of critical vulnerabilities using `BeautifulSoup`.
 📡 Real-Time Updates via `Socket.IO` for email status and scraping progress.
 📬 Automated Email Reporting with vulnerability data and remediation details.
 📊 Risk-Based Filtering, Only displays unresolved vulnerabilities with high or critical risk levels.
 🌐 Interactive Dashboard built with `React.js` for displaying live data and notifications.
 🧵 Multithreaded Backend, ensures non-blocking performance and asynchronous task execution.

---

 🛠️ Tech Stack

Frontend

 React.js
 JavaScript
 Toast Notifications (`react-toastify`)
 Axios
 HTML/CSS

Backend

 Python
 Flask
 Flask-SocketIO
 BeautifulSoup (Web Scraper)
 SMTP (Email Notifications)
 Threading + asyncio

---

 🧩 Architecture

1. Frontend (React.js) 

   * Triggers scraping from a button click.
   * Displays real-time status using `Socket.IO`.
   * Toasts notification once email is sent.

2.Backend (Flask)

   * Scrapes data from OEM sites.
   * Filters unresolved, high-risk vulnerabilities.
   * Sends formatted email with results.
   * Emits WebSocket events to update frontend in real-time.

---

📧 Email Reporting

* Sends emails with details:

  * Vulnerability Title
  * Risk Level
  * Status (e.g., Under Process)
  * Remediation Info

---
💡 Future Improvements

* Database integration for storing historical vulnerabilities.
* Admin panel for report management and analytics.
* Role-based access control.
* Integration with threat intelligence APIs.

---


