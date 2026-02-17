# Employee Scheduler App - Development Plan

---

## Todo

### Phase 1: Foundation

- [-] Tech stack setup (Next.js, tRPC, Drizzle, etc.)
- [-] Define your database schema in Prisma

### Phase 2: Core Data Layer (API routes)

Build your tRPC procedures in this order:

- [-] Auth first - signup, login, session management
- [ ] Manager Setup - create manager accounts, assign employees
- [ ] Shift CRUD - create, read, update, delete shifts (manager only)
- [ ] Shift requests - submit request, approve/reject (split by role)
- [ ] Availability - set employee availability

### Phase 3: UI Components (Feature by feature)

Build one complete feature at a time, not all pages at once:

- [ ] Feature 1: Auth flow

Login/signup pages → test → move on

- [ ] Feature 2: Manager creates shifts

Shift creation form → shift list view → test

- [ ] Feature 3: Employee requests shifts

Available shifts list → request button → my shifts view

- [ ] Feature 4: Manager approves requests

Pending requests table → approve/reject actions

This "vertical slice" approach means each feature is fully working before moving to the next.

### Phase 4: Polish and consistency improvements:

- [ ] Add loading states, error handling styling consistency
