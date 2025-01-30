# Carbon Footprint Tracker

A modern web application built with Next.js that helps users track and manage their carbon footprint. Monitor your environmental impact, set reduction goals, and make informed decisions to contribute to a more sustainable future.

## Features

- 🔐 Secure Authentication
- 📊 Interactive Dashboard
- 👤 User Profile Management
- 📱 Responsive Design
- 🌙 Dark/Light Mode Support
- 📈 Data Visualization with Charts

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Custom components built with shadcn/ui
- **State Management**: Custom store implementation
- **Authentication**: Built-in auth system

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/carbon-footprint-tracker.git
cd carbon-footprint-tracker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add necessary environment variables.

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
carbon-footprint-tracker/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── nav.tsx           # Navigation component
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
└── public/              # Static assets
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code linting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.