# Task Manager

A simple full-stack Task Manager application built with Django REST Framework and React.

## Prerequisites
- Python 3.8+
- Node.js 18+

## Backend Setup (Django)

1. Open a terminal and navigate to the root directory.
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`
4. Install the dependencies:
   ```bash
   pip install django djangorestframework django-cors-headers
   ```
5. Run migrations (the SQLite database will be created automatically):
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
6. (Optional) Populate the database with sample tasks:
   ```bash
   python manage.py shell -c "from tasks.models import Task; Task.objects.create(title='Buy Groceries', status='pending'); Task.objects.create(title='Finish Project', status='done');"
   ```
   *Note: If you pulled the complete repo, the DB might already contain 5 sample tasks.*
7. Start the Django development server:
   ```bash
   python manage.py runserver
   ```
   The API will be available at `http://localhost:8000/api/tasks/`.

## Frontend Setup (React/Vite)

1. Open a **new** terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The React app will be running at `http://localhost:3000/`.

## Assumptions & Decisions
- **Framework Choices**: Vite was chosen over Create React App as it is the modern standard for fast React scaffolding, while retaining the requested default `localhost:3000` port mapping.
- **Styling**: Standard functional CSS was used instead of heavy frameworks like Tailwind to meet the requirement for a clean, basic, and realistic design.
- **Code Style**: Kept the implementation straightforward (e.g. using `fetch` instead of `axios`, basic `useState` instead of `Redux`) to reflect realistic, human-written boilerplate code without AI over-engineering.
- **Structure**: The Django `tasks` app was placed at the project root alongside `manage.py` instead of nested in a backend subfolder to align with standard Django practices.

## Deployment

This project is fully configured for deployment on **Render** (Backend) and **Vercel** (Frontend).

### 1. Backend (Render)
1. Go to [Render](https://render.com/) and create a new **Web Service**.
2. Connect this GitHub repository.
3. Configure the following settings:
   - **Environment**: Python 3
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn backend.wsgi`
4. Under **Environment Variables**, add:
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: `your-backend-app-name.onrender.com` (Wait until the URL is generated, then put it here)
   - `FRONTEND_URL`: `https://your-frontend-app-name.vercel.app` (Add this later after deploying to Vercel)
5. Click **Deploy Web Service**.

### 2. Frontend (Vercel)
1. Go to [Vercel](https://vercel.com/) and create a **New Project**.
2. Connect this GitHub repository and select the `frontend` folder as the Root Directory.
3. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://your-backend-app-name.onrender.com` (The URL Render gave you)
4. Click **Deploy**.

> **Note**: Don't forget to add your Vercel URL to the Render `FRONTEND_URL` environment variable so CORS allows your frontend to talk to your backend!
