# Django + React (Vite) Application Setup

This document provides step-by-step instructions to set up and run the application locally. The project consists of a Django backend and a React (Vite) frontend.

---

## Backend Setup (Django)

1. **Navigate to the server folder**

   ```bash
   cd server
   ```

2. **Create and activate a virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate    # Linux/Mac
   venv\Scripts\activate       # Windows
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Apply migrations**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create a superuser**

   ```bash
   python manage.py createsuperuser
   ```

6. **Start the backend server**

   ```bash
   python manage.py runserver
   ```

7. **Populate doctors and slots via the Django admin panel**

   - Access the admin panel at: `http://127.0.0.1:8000/admin/`
   - Add doctor details.
   - Create slots with the following timings:
     - 10:00 AM – 11:30 AM
     - 12:00 PM – 1:00 PM
     - 3:00 PM – 4:30 PM
     - 7:00 PM – 8:00 PM

   > Both **Doctors** and **Slots** can be managed through the admin panel.

---

## Frontend Setup (React + Vite)

1. **Navigate to the client folder**

   ```bash
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open the provided local development URL in your browser (typically `http://localhost:5173`).

---

## Usage

1. **Sign Up**

   - Register a new user through the signup page.

2. **Explore the Application**
   - Browse available doctors and slots.
   - Book and manage appointments.

---

## Notes

- Ensure both backend and frontend servers are running simultaneously.
- Use the Django admin panel to add or modify doctors and appointment slots as needed.
