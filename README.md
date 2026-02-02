# PlanetCare 🌍

A volunteer management and donation platform for environmental initiatives. Connect volunteers with local cleanup events, tree planting drives, and sustainability projects.

## 🔗 Live Demo

**Website:** [https://planetcare-bd.web.app](https://planetcare-bd.web.app)

### Admin Access (For Reviewers)

Use the **"Login as Admin (Reviewer)"** button on the login page to auto-fill admin credentials.

## ✨ Features

### Public Features

- **Events** - Browse and volunteer for environmental events
- **Event Details** - View event info with discussion/comments section
- **Volunteer Leaderboard** - Top volunteers ranked by events attended
- **Donor Recognition Wall** - Public thank-you page for donors with tier badges
- **Donations** - Secure payment processing via Stripe

### User Features

- **My Events** - Track events you've volunteered for
- **My Donations** - View donation history
- **Comments** - Discuss events with other volunteers
- **Volunteer/Unvolunteer** - Toggle event registration

### Admin Dashboard

- **Overview** - Key statistics and metrics
- **Manage Users** - View and manage user roles
- **Manage Events** - Create, edit, delete events with images
- **Donations** - View all donation records
- **Reports** - Generate and export reports

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI:** Ant Design, Tailwind CSS
- **State:** TanStack Query (React Query)
- **Auth:** Firebase Authentication
- **Payments:** Stripe
- **Routing:** React Router v6

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ii-shimul/project-planetcare.git
cd project-planetcare

# Install dependencies
yarn install

# Create environment file
cp .env.example .env.local
# Fill in your Firebase and Stripe credentials

# Start development server
yarn dev
```

### Environment Variables

```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_project.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_project.firebasestorage.app
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
VITE_PAYMENT_GATEWAY_PK=your_stripe_public_key
VITE_SERVER_URL=http://localhost:5000
```

## 📱 Mobile Responsive

All pages are fully responsive and tested on mobile devices (375px+).

## 📁 Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   ├── providers/      # Context providers
│   └── routes/         # Router configuration
├── public/             # Static assets
└── dist/               # Production build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

