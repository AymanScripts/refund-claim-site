# FiveM Refund Application

This project is a web application that integrates with FiveM and allows users to log in via Discord OAuth2. It checks user membership and roles on a specific Discord server and enables authorized users to set up refunds linked to a player identifier.

## Features

- Discord OAuth2 authentication
- Role and membership verification on a specific Discord server
- Refund management system
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
│   │   │   └── refundController.ts
│   │   ├── middleware
│   │   │   └── authMiddleware.ts
│   │   ├── routes
│   │   │   ├── authRoutes.ts
│   │   │   └── refundRoutes.ts
│   │   ├── services
│   │   │   ├── discordService.ts
│   │   │   └── refundService.ts
│   │   └── database
│   │       ├── index.ts
│   │       └── models
│   │           └── refund.ts
│   ├── client
│   │   ├── components
│   │   │   └── RefundForm.tsx
│   │   ├── pages
│   │   │   ├── index.tsx
│   │   │   └── login.tsx
│   │   └── utils
│   │       └── api.ts
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
   ```

2. Navigate to the project directory:
   ```
   cd fivem-refund-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Configure your Discord application for OAuth2 and set the necessary environment variables.

5. Start the application:
   ```
   npm run start
   ```

## Usage

- Users can log in using their Discord accounts.
- Authorized users can create and manage refunds linked to player identifiers.
- The FiveM server-side command `/claimrefund` can be used to claim refunds based on player identifiers.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.