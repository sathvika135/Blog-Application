# Blog-Application

A full-stack blog application built using **Django REST Framework** and **React**.  
Users can register, log in, create, edit, and delete their own blog posts.

---

##  Features

-  User authentication (JWT)
-  Create, edit, and delete blogs
-  Public blog listing and detail pages
-  Responsive frontend design
-  Backend and frontend fully decoupled

---

##  Tech Stack

-  **Backend:** Django, Django REST Framework, JWT Authentication
-  **Frontend:** React, Axios, React Router
-  **Database:** SQLite (Dev)
-  **Deployment Ready For:** AWS EC2 + S3 / Render + Netlify

---

# Local Development Setup

Follow these steps to run the app on your local machine.

---

###  1. Clone the Repository

```bash
git clone https://github.com/sathvika135/Blog-Application.git
cd Blog-Application


2. Set Up the Backend

cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Your backend will run at: http://127.0.0.1:8000/



3. Set Up the Frontend
Open a new terminal tab or window:

cd frontend
npm install
npm start
Your React app will run at: http://localhost:3000/