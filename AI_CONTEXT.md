# AI Agent Context & Operational Rules

## Operational Protocols

### 1. Server Management & Terminal Usage
**CRITICAL: STIFF SEPARATION OF TERMINALS**

You must maintain **at least 3 separate terminal instances** in VS Code:
1.  **TERMINAL 1 (Backend):** Used EXCLUSIVELY for `cd backend; npm start`. NEVER run anything else here.
2.  **TERMINAL 2 (Frontend):** Used EXCLUSIVELY for `cd mobile; npx expo start`. NEVER run anything else here.
3.  **TERMINAL 3 (Operations/Test):** Used for `netstat`, `npx cypress run`, or git commands.

**RULES:**
- **NEVER** press Ctrl+C in Terminal 1 or 2 unless explicitly asked to kill the server.
- **NEVER** run a command in a terminal that is currently busy running a server. 
- **ALWAYS** check `get_terminal_output` to identify which terminal ID belongs to which service.
- **READ THIS FILE** before every action involving servers.

### 2. Environment Verification & Port Standards
**MANDATORY PORTS:**
- **Backend:** MUST run on **Port 5000**.
- **Frontend/Mobile:** MUST run on **Port 8081**.
- Always verify connectivity on these exact ports before running E2E tests (Cypress).

### 3. User Preferences
- **Terminals:** 
    - The user prefers to keep projects open and terminals context preserved. 
    - **VS CODE ONLY:** NEVER open external command windows (CMD, PowerShell, etc.). ALL commands must run inside VS Code's integrated terminal.
    - Avoid "blindly" opening new terminals without checking the state of the workspace.
- **Port Consistency:** Always enforce the use of ports 5000 and 8081 for consistency across sessions.
