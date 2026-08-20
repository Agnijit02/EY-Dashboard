# Implementation Plan — Phase 13: Clients & Resources Management

Implement full enterprise modules for **Clients** and **Resources** with search, filtering, table pagination, detail drawers, status/allocation indicators, and clean state management.

## 1. Fix Visual Alignment (Completed)
- **User Avatar**: Replaced `Button` wrapper in `UserMenu.tsx` with a direct flex container. User name, role badge, initials circle (`AD`), and dropdown arrow are now perfectly aligned horizontally.

---

## 2. Proposed Changes for Phase 13

### Feature Module: Clients (`src/features/clients`)

#### [NEW] [clients.types.ts](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/features/clients/clients.types.ts)
- `ClientStatus` (`'active' | 'inactive' | 'at-risk'`), `Industry` (`'Technology' | 'Financial' | 'Healthcare' | 'Consulting' | 'Retail'`).
- `Client` interface (id, name, code, industry, status, activeProjects, totalRevenue, accountManager, primaryContact, email, location, description).
- `ClientFilters` & `ClientsResponse`.

#### [NEW] [clients.mock.ts](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/features/clients/clients.mock.ts)
- 15 mock client records matching real enterprise accounts (ABC Corporation, XYZ Limited, Acme Industries, Global Enterprises, TechNova, etc.).

#### [NEW] [clients.service.ts](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/features/clients/clients.service.ts)
- `getClients(params)` with search & industry/status filtering and pagination logic.

#### [NEW] [clients.query.ts](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/features/clients/clients.query.ts)
- `useClientsQuery()` TanStack Query hook with query key caching (`['clients', filters, page]`).

#### [NEW] [clientsStore.ts](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/store/clientsStore.ts)
- Zustand store for clients UI state (search, status filter, industry filter, page, selected client drawer ID).

#### [NEW] [ClientStatusBadge.tsx](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/features/clients/components/ClientStatusBadge.tsx)
- Visual badge for Active / Inactive / At Risk statuses.

#### [NEW] [ClientTable.tsx](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/features/clients/components/ClientTable.tsx)
- Table displaying client name, industry badge, status badge, active projects count, revenue (₹ Cr), and account manager.

#### [NEW] [ClientFilters.tsx](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/features/clients/components/ClientFilters.tsx)
- Filter bar for client search, industry dropdown, status dropdown, and reset filters button.

#### [NEW] [ClientDetailsDrawer.tsx](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/features/clients/components/ClientDetailsDrawer.tsx)
- Slide-over drawer displaying full client profile, active projects breakdown, key contact person, location, and total account value.

#### [MODIFY] [Clients.tsx](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/pages/Clients.tsx)
- Page composition linking Zustand filter state, TanStack Query data fetching, table layout, pagination, loading skeleton, and detail drawer.

---

### Feature Module: Resources (`src/features/resources`)

#### [NEW] [resources.types.ts](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/features/resources/resources.types.ts)
- `ResourceRole` (`'Senior Architect' | 'Project Manager' | 'Full Stack Engineer' | 'Data Scientist' | 'UX Designer'`).
- `AvailabilityStatus` (`'available' | 'partially-allocated' | 'fully-allocated' | 'over-allocated'`).
- `Resource` interface (id, name, email, role, department, location, allocationPercentage, availabilityStatus, assignedProjects, billableRate, skills).
- `ResourceFilters` & `ResourcesResponse`.

#### [NEW] [resources.mock.ts](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/features/resources/resources.mock.ts)
- 20 mock resource records with realistic roles, skills arrays, allocation percentages, and project assignments.

#### [NEW] [resources.service.ts](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/features/resources/resources.service.ts)
- `getResources(params)` with search, department, role, and availability filter logic.

#### [NEW] [resources.query.ts](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/features/resources/resources.query.ts)
- `useResourcesQuery()` TanStack Query hook caching (`['resources', filters, page]`).

#### [NEW] [resourcesStore.ts](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/store/resourcesStore.ts)
- Zustand store for resources UI state (search, department filter, availability filter, page, selected resource ID).

#### [NEW] [ResourceStatusBadge.tsx](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/features/resources/components/ResourceStatusBadge.tsx)
- Badge indicator for Available / Partially Allocated / Fully Allocated / Over Allocated.

#### [NEW] [ResourceAllocationBar.tsx](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/features/resources/components/ResourceAllocationBar.tsx)
- Visual progress bar showing allocation percentage with color coding (Green: <=80%, Amber: 81-100%, Red: >100%).

#### [NEW] [ResourceTable.tsx](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/features/resources/components/ResourceTable.tsx)
- Table displaying resource name & role, department, skills badges, allocation progress bar, and availability status badge.

#### [NEW] [ResourceFilters.tsx](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/features/resources/components/ResourceFilters.tsx)
- Filter bar for resource search, department, availability status, and reset button.

#### [NEW] [ResourceDetailsDrawer.tsx](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/features/resources/components/ResourceDetailsDrawer.tsx)
- Slide-over drawer detailing assigned projects, allocation breakdown, technical skills tags, hourly billable rate, and contact email.

#### [MODIFY] [Resources.tsx](file:///c:/Users/basua/Documents/OneDrive/Desktop/EY_React_project/my-dashboard/src/pages/Resources.tsx)
- Page composition uniting resources query data, filters store, allocation indicators, drawer integration, and pagination.

---

## Verification Plan

### Automated Tests
- Run `npm run build` (`tsc -b && vite build`) to confirm 0 TypeScript or bundling errors across all new files.

### Manual Verification
1. **User Avatar Alignment**: Confirm in browser that user initials circle `AD` and dropdown arrow are perfectly centered horizontally in the header user menu.
2. **Clients Module (`/clients`)**:
   - Verify table renders client records with industry badges and revenue formatted as ₹ Cr.
   - Verify searching by name and filtering by status/industry updates the dataset dynamically.
   - Click a client row to open the Client Details Drawer and verify project breakdown.
3. **Resources Module (`/resources`)**:
   - Verify table displays team members, allocation progress bars, and skills tags.
   - Verify filtering by Department (Technology, Consulting, etc.) and Availability.
   - Click a resource row to inspect resource assignment details in the drawer.
