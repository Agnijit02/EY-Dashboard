# Enterprise Role-Based Access Control (RBAC) Permission Matrix

| Resource | Action | Endpoint | ADMIN | MANAGER | VIEWER | Server Middleware |
|---|---|---|:---:|:---:|:---:|---|
| **Dashboard** | View | `GET /api/v1/dashboard` | ✓ | ✓ | ✓ | `authenticate` |
| **Projects** | List / Search | `GET /api/v1/projects` | ✓ | ✓ | ✓ | `authenticate` |
| **Projects** | View Details | `GET /api/v1/projects/:id` | ✓ | ✓ | ✓ | `authenticate` |
| **Projects** | Create | `POST /api/v1/projects` | ✓ | ✓ | ✗ | `authenticate`, `authorize('ADMIN', 'MANAGER')` |
| **Projects** | Update | `PATCH /api/v1/projects/:id` | ✓ | ✓ | ✗ | `authenticate`, `authorize('ADMIN', 'MANAGER')` |
| **Projects** | Delete | `DELETE /api/v1/projects/:id` | ✓ | ✗ | ✗ | `authenticate`, `authorize('ADMIN')` |
| **Clients** | List / Search | `GET /api/v1/clients` | ✓ | ✓ | ✓ | `authenticate` |
| **Clients** | View Details | `GET /api/v1/clients/:id` | ✓ | ✓ | ✓ | `authenticate` |
| **Clients** | Create | `POST /api/v1/clients` | ✓ | ✓ | ✗ | `authenticate`, `authorize('ADMIN', 'MANAGER')` |
| **Clients** | Update | `PATCH /api/v1/clients/:id` | ✓ | ✓ | ✗ | `authenticate`, `authorize('ADMIN', 'MANAGER')` |
| **Clients** | Delete | `DELETE /api/v1/clients/:id` | ✓ | ✗ | ✗ | `authenticate`, `authorize('ADMIN')` |
| **Resources** | List / Search | `GET /api/v1/resources` | ✓ | ✓ | ✓ | `authenticate` |
| **Resources** | View Details | `GET /api/v1/resources/:id` | ✓ | ✓ | ✓ | `authenticate` |
| **Resources** | Create | `POST /api/v1/resources` | ✓ | ✓ | ✗ | `authenticate`, `authorize('ADMIN', 'MANAGER')` |
| **Resources** | Update | `PATCH /api/v1/resources/:id` | ✓ | ✓ | ✗ | `authenticate`, `authorize('ADMIN', 'MANAGER')` |
| **Resources** | Delete | `DELETE /api/v1/resources/:id` | ✓ | ✗ | ✗ | `authenticate`, `authorize('ADMIN')` |
| **Risks** | List / Search | `GET /api/v1/risks` | ✓ | ✓ | ✓ | `authenticate` |
| **Risks** | View Details | `GET /api/v1/risks/:id` | ✓ | ✓ | ✓ | `authenticate` |
| **Risks** | Create | `POST /api/v1/risks` | ✓ | ✓ | ✗ | `authenticate`, `authorize('ADMIN', 'MANAGER')` |
| **Risks** | Update | `PATCH /api/v1/risks/:id` | ✓ | ✓ | ✗ | `authenticate`, `authorize('ADMIN', 'MANAGER')` |
| **Risks** | Delete | `DELETE /api/v1/risks/:id` | ✓ | ✗ | ✗ | `authenticate`, `authorize('ADMIN')` |
| **Reports** | Executive Overview | `GET /api/v1/reports/overview` | ✓ | ✓ | ✓ | `authenticate` |
| **Auth** | Login | `POST /api/v1/auth/login` | Public | Public | Public | `validateBody(loginSchema)` |
| **Auth** | Refresh Token | `POST /api/v1/auth/refresh` | Public | Public | Public | HttpOnly Cookie Rotation |
| **Auth** | Logout | `POST /api/v1/auth/logout` | Public | Public | Public | Revoke + Clear Cookie |
| **Auth** | Current User | `GET /api/v1/auth/me` | ✓ | ✓ | ✓ | `authenticate` |

---

## Security Principles Enforced

1. **Short-Lived Access Tokens**: Signed with `JWT_ACCESS_SECRET` with 15-minute expiration. Stored strictly in-memory (Zustand) to eliminate XSS token theft via localStorage.
2. **HttpOnly Refresh Cookies**: Transmitted via secure `HttpOnly` cookies (`path: /api/v1/auth`, `sameSite: lax/none`).
3. **Database Hash Storage**: Refresh tokens are hashed via SHA-256 before persisting in PostgreSQL to protect against database leak compromises.
4. **Token Rotation & Reuse Detection**: Every refresh request revokes the old refresh token and issues a new pair. If an already revoked token is submitted, all active sessions for that user are terminated immediately.
5. **Server-Side Authoritative Authorization**: UI buttons and route guards are convenience UX layers. The Express API strictly rejects unauthorized operations with 401/403 status codes.
