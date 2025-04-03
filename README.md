# Loan Management System API

A secure RESTful API for loan management with JWT authentication and role-based access control.

## Features

- **JWT Authentication**: Secure login/logout functionality
- **Role-Based Access Control**: Different permissions for staff, admin, and superadmin
- **Loan Management**: Create, read, filter, and delete loan records
- **Data Protection**: Sensitive fields hidden based on user role
- **Type Safety**: Built with TypeScript for better code quality

## API Endpoints

| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/auth/login` | POST | Authenticate user | Public |
| `/auth/logout` | POST | Invalidate session | Authenticated |
| `/loans` | GET | Get all loans | Authenticated |
| `/loans?status={status}` | GET | Filter loans by status | Authenticated |
| `/loans/:userEmail/get` | GET | Get loans by user email | Authenticated |
| `/loans/expired` | GET | Get expired loans | Authenticated |
| `/loan/:loanId/delete` | DELETE | Delete a loan | Superadmin only |

## Data Structure

### Loan Object
```json
{
  "id": "900199",
  "amount": "₦5,587,858",
  "maturityDate": "2024-03-25 14:27:37",
  "status": "active",
  "applicant": {
    "name": "Alexander Janet",
    "email": "alexanderjanet@tester.com",
    "telephone": "+14958403848",
    "totalLoan": "₦14,234,433,454"
  },
  "createdAt": "2024-01-25 14:27:37"
}
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- TypeScript 5.x

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/loan-management-api.git
   cd loan-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file:
   ```env
   PORT=3000
   JWT_SECRET=your_very_secure_secret_here
   JWT_EXPIRES_IN=1h
   ```

### Running the Application

**Development mode:**
```bash
npm run dev
# or
yarn dev
```

**Production build:**
```bash
npm run build
npm start
```

### Testing

Run unit tests:
```bash
npm test
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `JWT_SECRET` | Secret for JWT signing | - |
| `JWT_EXPIRES_IN` | Token expiration time | 1h |

## Authentication Flow

1. **Login** to get JWT token:
   ```bash
   curl -X POST http://localhost:3000/auth/login \
   -H "Content-Type: application/json" \
   -d '{"email":"admin@example.com","password":"password"}'
   ```

2. **Use token** in subsequent requests:
   ```bash
   curl http://localhost:3000/loans \
   -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

## Role-Based Access

| Role | Permissions |
|------|------------|
| Staff | View loans (without totalLoan) |
| Admin | View all loan data |
| Superadmin | Delete loans + all admin permissions |

## Sample Requests

Get all active loans:
```bash
curl "http://localhost:3000/loans?status=active" \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Get loans for specific user:
```bash
curl "http://localhost:3000/loans/user@example.com/get" \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```


## License

Distributed under the MIT License. 

