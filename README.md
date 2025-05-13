# Web Project with Country Map Visualization and Chatroom Service (CSCI 3100 course Project)
by HO PUN WAI <1155176869@link.cuhk.edu.hk>, CHENG MAN WU <1155177289@link.cuhk.edu.hk>, FUNG CHEUK NAM <1155192095@link.cuhk.edu.hk> 

This repo contains **both** server (Express + MySQL + Socket.IO) **and** client
(React + Socket.IO-client).  
The system supports chat in differenet countries managers and admin and specific Country Map Visualization and Editting with simple account management.

## The whole structure is: 
```text
WWMS/
├── backend/ # Node / Express / Sequelize
│ ├── src/ … # (middlewares, routes, models, app.js, …)
│ ├── config/ config.js
├── frontend/ # React (Vite) SPA
│ ├── worldmap.html, styleworldmap.css, ...
├── package.json # root scripts (convenience)
├── package-lock.json
├── .gitignore # ignore the security files
└── README.md # ← you are here
```

## 1.Features
* **Auth / JWT**  
  * exactly **1 admin** in the system  
  * each of **14 regions** may have **≤ 5 managers**
* **World-map visualisation & in-browser editing** via SVG over HTML
* **Country & Chat APIs** (REST)
* **WebSocket chat** via Socket.IO
* **MySQL** persistence
* **Cron** job purges old messages

## 2 Prerequisites
| Tool           | Version (tested) |
| -------------- | ---------------- |
| Node.js        | ≥ 18 LTS         |
| npm            | latest           |
| MySQL server   | "^3.14.1"        |
| Express        | "^4.21.2"        |
| Socket.io      | "^4.8.1"         |

## 3 Deployment

We have deployed our project(frontend and backend) to Render (a cloud server) with free tier(512MB and 0.1CPU), which is allowed a maximum of 30-40 users at the same time.  
The URL is: https://wwms-frontend.onrender.com/loginregister.html  
Note: DB is local-only; the public URL works only while the database server is up

This version is base on the render server, if users want to run on local server, they have to change several setup
1. change CORS configuration from process.env.CLIENT_URL ||'http://127.0.0.1:5500' to 'http://127.0.0.1:5500' in app.js file
2. change the all of the fetch api in frontend from `https://wwms-backend.onrender.com` to `http://localhost:5000`

## 4 Quick start (Start at LocalHost)

```bash
# clone into a fresh folder called WWMS/
git clone https://github.com/Pacohpw/WWMS.git WWMS
# Enter the project
cd WWMS
# install root conveniences (if any scripts live here)
npm install
# start server
node src/app.js
# front end
use a live server to open for the loginregister.html
```

## 5 Environment variables

backend/.env is zipped in the file with the database connection information needed.  
frontend/.env (I am not sure whether there is)

## 6 Contact
If you have any questions or important reports, feel free to contact one of these three emails:  
<1155176869@link.cuhk.edu.hk>, <1155177289@link.cuhk.edu.hk> or <1155192095@link.cuhk.edu.hk>

**Enjoy World Management!** 

