<h2><u>WHATSAPP WEB CLONE</u></h2>
An application which focused on few functionalities of Whatsapp web

<h4>Live Website URL: <a href="https://whats-app55.netlify.app/" target="_blank">https://whats-app55.netlify.app/</a></h4>

<h2><u>Demonstration Link</u></h2>
<h3><a href="https://drive.google.com/file/d/14s7GEqxEKpV5l77oi7coW9j7-7mrxfKc/view?usp=sharing" target="_blank">https://drive.google.com/file/d/14s7GEqxEKpV5l77oi7coW9j7-7mrxfKc/view?usp=sharing</a></h3>

<h2><u>Project Flow Structure</u></h2>
<pre>
whatsappweb
├── backend
│   ├── database.js
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
└── frontend
    ├── .eslintrc.cjs
    ├── .gitignore
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public
    │   ├── vite.svg
    │   └── _redirects
    ├── README.md
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── assets
    │   │   ├── bg.png
    │   │   ├── right.png
    │   │   └── video.mp4
    │   ├── Components
    │   │   ├── Dashboard
    │   │   │   ├── Dashboard.jsx
    │   │   │   └── utils.js
    │   │   ├── Landing
    │   │   │   ├── Chatting.jsx
    │   │   │   ├── Landing.jsx
    │   │   │   ├── Navigation.jsx
    │   │   │   └── Video.jsx
    │   │   ├── Left
    │   │   │   ├── Friends
    │   │   │   │   ├── AddFriend
    │   │   │   │   │   ├── AddFriend.jsx
    │   │   │   │   │   └── utils.js
    │   │   │   │   └── DisplayFriends
    │   │   │   │       ├── DisplayFriends.jsx
    │   │   │   │       └── FriendCard
    │   │   │   │           ├── FriendCard.jsx
    │   │   │   │           ├── FriendDrop.jsx
    │   │   │   │           └── utils.js
    │   │   │   ├── LeftBar
    │   │   │   │   ├── Left.jsx
    │   │   │   │   ├── Search.jsx
    │   │   │   │   └── utils.js
    │   │   │   ├── Navigation
    │   │   │   │   ├── UserDrop.jsx
    │   │   │   │   └── UserNav.jsx
    │   │   │   └── Requests
    │   │   │       ├── DisplayRequests.jsx
    │   │   │       ├── RequestCard.jsx
    │   │   │       └── utils.js
    │   │   ├── Right
    │   │   │   ├── ChatRoom
    │   │   │   │   ├── AccountDetails
    │   │   │   │   │   ├── Account
    │   │   │   │   │   │   ├── Account.jsx
    │   │   │   │   │   │   ├── account.module.css
    │   │   │   │   │   │   └── utils.js
    │   │   │   │   │   └── Fields
    │   │   │   │   │       ├── Email.jsx
    │   │   │   │   │       ├── Name.jsx
    │   │   │   │   │       ├── OTP.jsx
    │   │   │   │   │       ├── Password.jsx
    │   │   │   │   │       └── Phone.jsx
    │   │   │   │   ├── Chat
    │   │   │   │   │   ├── Chat.jsx
    │   │   │   │   │   └── utils.js
    │   │   │   │   ├── ChatDisplay
    │   │   │   │   │   ├── ChatDrop.jsx
    │   │   │   │   │   └── DisplayChats.jsx
    │   │   │   │   ├── ChatNav
    │   │   │   │   │   └── ChatNav.jsx
    │   │   │   │   └── ChatType
    │   │   │   │       ├── ChatType.jsx
    │   │   │   │       ├── UploadDocs.jsx
    │   │   │   │       └── utils.js
    │   │   │   └── Right.jsx
    │   │   └── Users
    │   │       ├── Forgot.jsx
    │   │       ├── Login.jsx
    │   │       ├── Passwords.jsx
    │   │       ├── Register.jsx
    │   │       ├── usercss.css
    │   │       ├── utils.js
    │   │       ├── VerifyAccount.jsx
    │   │       └── VerifyPass.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   ├── Spinner.jsx
    │   └── url.jsx
    ├── tailwind.config.js
    └── vite.config.js

</pre>

<h2>Prerequisites</h2>
Install
<a href="https://www.postgresql.org/download/" target="_blank">PostgreSQL</a>
<a href="https://nodejs.org/en" target="_blank">NodeJS</a>

<h2><u>How to run the project in your system</u></h2>
Clone the repo
  <h3>Run frontend</h3>
  <ul>
    <li>cd frontend</li>
    <li>npm install</li>
    <li>npm run dev</li>
    <li><b>Note:</b> Make sure to change the url in url.js file to localhost</li>
  </ul>
  <h3>Run Backend</h3>
  <ul>
    <li><b>Note:</b> Make sure to replace the password with your password in server.js and database.js.</li>
    <li>cd backend</li>
    <li>npm install</li>
    <li>node database.js</li>
    <li>Exit from terminal if database created</li>
    <li>nodemon server.js</li>
  </ul>
</h2>
