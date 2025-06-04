# FiveM Refund Application

This project is a web application that integrates with FiveM and Discord to manage refunds for players. Users can log in via Discord OAuth2, check their membership and roles on a specific Discord server, and authorized users can prepare refunds linked to player identifiers.

## Features

- Discord OAuth2 authentication
- Role and membership verification on a specific Discord server
- Refund preparation linked to player identifiers
- FiveM server-side command to claim refunds

## Project Structure

```
fivem-refund-app
├── src
│   ├── server
│   │   ├── app.ts
│   │   ├── auth
│   │   │   └── discordOAuth.ts
│   │   ├── controllers
│   │   │   ├── refundController.ts
│   │   │   └── userController.ts
│   │   ├── routes
│   │   │   ├── authRoutes.ts
│   │   │   ├── refundRoutes.ts
│   │   │   └── userRoutes.ts
│   │   ├── services
│   │   │   ├── discordService.ts
│   │   │   └── refundService.ts
│   │   ├── database
│   │   │   ├── index.ts
│   │   │   └── refundModel.ts
│   │   └── types
│   │       └── index.ts
│   ├── client
│   │   ├── components
│   │   │   ├── Login.tsx
│   │   │   ├── RefundForm.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── pages
│   │   │   ├── index.tsx
│   │   │   └── refunds.tsx
│   │   └── types
│   │       └── index.ts
│   └── fivem
│       └── server
│           └── refundCommand.lua
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd fivem-refund-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure your Discord application for OAuth2 and set the necessary environment variables.

4. Set up your database and configure the connection in `src/server/database/index.ts`.

5. Start the application:
   ```
   npm run start
   ```

## Usage

- Users can log in using their Discord account.
- Authorized users can prepare refunds for players by entering their identifiers.
- The FiveM server can process refunds using the `/claimrefund` command.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.