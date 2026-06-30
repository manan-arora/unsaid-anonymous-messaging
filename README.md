# Unsaid — AI-Powered Anonymous Messaging Platform

<p align="center">
  <b>Share one link. Receive honest anonymous messages. Break the ice with AI.</b>
</p>

<p align="center">
  <a href="https://try-unsaid.vercel.app">Live Demo</a> •
  <a href="https://github.com/manan-arora/unsaid-anonymous-messaging">Repository</a>
</p>

---

## Overview

**Unsaid** is a modern anonymous messaging platform where users can create a personalized public inbox and receive anonymous messages from anyone through a shareable link.

Unlike traditional anonymous messaging apps, Unsaid improves the sender experience using **AI-generated message suggestions**, helping users start meaningful conversations when they don’t know what to say.

The goal is simple:

> Make it easier for people to say the things they usually leave unsaid.

---

## Features

### Authentication & Account Security
- Secure signup and login
- Credential-based authentication using **NextAuth / Auth.js**
- Session management with protected routes
- OTP-based email verification
- Verification code expiry handling

---

### Personalized Public Profile
Each user gets a unique public profile:

```bash
https://try-unsaid.vercel.app/u/username
```

Anyone with the link can send anonymous messages.

---

### Anonymous Messaging
- Send anonymous messages to any user
- Messages stored securely in MongoDB
- No sender identity exposed
- Clean public message submission interface

---

### AI Message Suggestions
Not sure what to write?

Unsaid uses **Google Gemini API** to generate thoughtful icebreakers and message suggestions for senders.

Examples:
- Appreciation messages
- Constructive feedback
- Friendly questions
- Conversation starters

---

### Inbox Dashboard
Users can manage all received messages from a private dashboard.

Features include:
- View received messages
- Refresh inbox
- Delete messages

---

### Message Controls
Users can control message flow using an inbox toggle:

- Accept messages
- Pause incoming messages anytime

This allows users to temporarily disable submissions without deleting their inbox.

---

### Modern UI / UX
Unsaid uses a custom **neo-brutalist design system** featuring:

- Bold typography
- Thick borders
- Playful layouts
- High contrast pastel palette
- Responsive mobile-first design

---

# Screenshots

## Landing Page
<img width="947" height="496" alt="image" src="https://github.com/user-attachments/assets/3d212101-81e8-4a59-b6d3-85c8f68c6768" />


---

## Public Profile
<img width="874" height="496" alt="image" src="https://github.com/user-attachments/assets/10ddc18b-4a83-494b-9a85-cd358e7b4174" />



---

## Dashboard
<img width="947" height="497" alt="image" src="https://github.com/user-attachments/assets/c4c03660-ee5d-48a1-b769-a6c5c33e8e22" />
<img width="857" height="496" alt="Screenshot 2026-06-30 164933" src="https://github.com/user-attachments/assets/e8d5af01-a799-45e7-8c7b-61c5695247f2" />



---

# Tech Stack

## Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React

---

## Backend
- Next.js API Routes
- TypeScript
- Axios
- Zod Validation

---

## Authentication
- NextAuth / Auth.js
- Credentials Provider
- JWT Sessions
- Route Middleware Protection

---

## Database
- MongoDB Atlas
- Mongoose ODM

---

## Forms & Validation
- React Hook Form
- Zod
- Hookform Resolvers

---

## AI
- Google Gemini API

---

## Deployment
- Vercel
- MongoDB Atlas

---

# Project Structure

```bash
src
├── app
│   ├── (app)
│   │   ├── dashboard
│   │   └── u/[username]
│   ├── (auth)
│   │   ├── sign-in
│   │   ├── sign-up
│   │   └── verify/[username]
│   └── api
│       ├── accept-messages
│       ├── auth/[...nextauth]
│       ├── check-username-unique
│       ├── delete-message/[messageid]
│       ├── get-messages
│       ├── send-message
│       ├── suggest-messages
│       ├── sign-up
│       └── verify-code
│
├── components
│   └── ui
├── context
├── helpers
├── lib
├── model
├── schemas
└── types
```

---

# API Routes

| Route | Method | Purpose |
|------|--------|---------|
| `/api/sign-up` | POST | Register new user |
| `/api/verify-code` | POST | Verify OTP |
| `/api/auth/[...nextauth]` | GET/POST | Authentication |
| `/api/send-message` | POST | Send anonymous message |
| `/api/get-messages` | GET | Fetch inbox |
| `/api/delete-message/:id` | DELETE | Delete message |
| `/api/accept-messages` | GET/POST | Toggle message acceptance |
| `/api/check-username-unique` | GET | Username validation |
| `/api/suggest-messages` | POST | AI message suggestions |

---

# Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=

RESEND_API_KEY=

NEXTAUTH_SECRET=

NEXTAUTH_URL=

AI_GATEWAY_API_KEY=

GOOGLE_GENERATIVE_AI_API_KEY=

NEXT_PUBLIC_BASE_URL=
```

### Variable Descriptions

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | MongoDB connection string |
| `RESEND_API_KEY` | Email delivery for verification |
| `NEXTAUTH_SECRET` | NextAuth encryption secret |
| `NEXTAUTH_URL` | Base URL for auth callbacks |
| `AI_GATEWAY_API_KEY` | AI gateway authentication |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini API key |
| `NEXT_PUBLIC_BASE_URL` | Public frontend URL |

---

# Local Setup

## Clone Repository

```bash
git clone https://github.com/manan-arora/unsaid-anonymous-messaging.git
cd unsaid-anonymous-messaging
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create `.env` and add all required keys.

---

## Run Development Server

```bash
npm run dev
```

App will run at:

```bash
http://localhost:3000
```

---

# Future Improvements

- OAuth login (Google / GitHub)
- Profile customization
- Analytics dashboard
- AI moderation / toxicity detection
- Spam detection
- Rate limiting
- Dark mode

---

# Learning Highlights

This project helped deepen understanding of:

- Next.js App Router architecture
- Full-stack TypeScript development
- Authentication with Auth.js
- API route design
- MongoDB schema modeling
- Form validation using Zod
- AI API integration
- Responsive UI systems

---

# Author

**Manan Arora**

- GitHub: https://github.com/manan-arora
- LinkedIn: _Add LinkedIn here_

---

## If you liked this project

Consider giving it a ⭐ on GitHub.
