# Doctor Appointment Website - Frontend

A comprehensive React-based web application for booking doctor appointments with separate patient and doctor interfaces.

## 🚀 Features

### Patient Features
- ✅ User registration and authentication
- ✅ Search and filter doctors by specialization, location, rating
- ✅ Book, reschedule, and cancel appointments
- ✅ View appointment history
- ✅ Medical records management
- ✅ Profile management

### Doctor Features
- ✅ Doctor registration with professional details
- ✅ Dashboard with appointment statistics
- ✅ Manage appointments and patient queue
- ✅ View patient history
- ✅ Set availability and consultation fees
- ✅ Analytics and earnings tracking

### Common Features
- ✅ Secure JWT authentication
- ✅ Role-based access control
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern UI with Tailwind CSS
- ✅ Protected routes
- ✅ Social login integration (Google, Facebook)

## 🛠 Tech Stack

- **Framework:** React 18 with Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Form Handling:** Formik + Yup
- **Icons:** React Icons

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components (Button, Input, Card, Modal, etc.)
│   ├── patient/         # Patient-specific components
│   ├── doctor/          # Doctor-specific components
│   └── admin/           # Admin-specific components
├── pages/
│   ├── auth/            # Login, Register pages
│   ├── patient/         # Patient dashboard and pages
│   ├── doctor/          # Doctor dashboard and pages
│   └── admin/           # Admin pages
├── redux/
│   ├── slices/          # Redux slices (auth, appointments, doctors)
│   └── store.js         # Redux store configuration
├── services/            # API service functions
├── utils/               # Utility functions
├── hooks/               # Custom React hooks
├── context/             # React context providers
└── assets/              # Images, fonts, etc.
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd doctor-appointment-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors
- **Primary:** Blue shades (#0ea5e9)
- **Secondary:** Purple shades (#a855f7)
- **Success:** Green
- **Danger:** Red
- **Warning:** Yellow

### Components
- **Button:** Multiple variants (primary, secondary, outline, danger, success)
- **Input:** Form inputs with validation and error handling
- **Card:** Content containers with hover effects
- **Modal:** Overlay dialogs with backdrop
- **Loader:** Loading spinners with size variants

## 🔐 Authentication

The app uses JWT-based authentication with the following flow:

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent with each API request via Axios interceptor
5. Protected routes check authentication state

## 🗺 Routes

### Public Routes
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/doctors` - Doctor listing (coming soon)

### Patient Routes (Protected)
- `/patient/dashboard` - Patient dashboard
- `/patient/appointments` - Appointment management
- `/patient/medical-records` - Medical records
- `/patient/profile` - Profile settings

### Doctor Routes (Protected)
- `/doctor/dashboard` - Doctor dashboard
- `/doctor/appointments` - Appointment management
- `/doctor/patients` - Patient records
- `/doctor/profile` - Profile and availability settings

## 🌐 API Integration

All API calls are centralized in the `services/` directory:

- `authService.js` - Authentication endpoints
- `doctorService.js` - Doctor-related endpoints
- `appointmentService.js` - Appointment management
- `api.js` - Axios instance with interceptors

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔄 State Management

Redux Toolkit is used for global state management with the following slices:

- **authSlice:** User authentication state
- **appointmentSlice:** Appointment data
- **doctorSlice:** Doctor listings and filters

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build files will be in the `dist/` directory.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 🤝 Contributing

1. Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit
   ```bash
   git add .
   git commit -m "Add your feature"
   ```

3. Push to your branch
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request

## 📝 Git Workflow

Follow the feature branching strategy as outlined in the project documentation:

- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Hotfix branches

## 🐛 Known Issues

- Social login (Google/Facebook) requires backend OAuth implementation
- Some pages are placeholders and need implementation
- Video consultation feature pending

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- Frontend Lead - Patient UI
- Backend Lead - API Integration
- Full Stack Developer - Appointment System
- Full Stack Developer - Medical Records
- DevOps - Deployment & Testing

## 📞 Support

For support, email support@healthcare.com or join our Slack channel.

---

**Note:** This is the frontend application. Make sure the backend API is running for full functionality.
