# Student Course Portal — Angular v21 Hands-On Exercise Book

**Digital Nurture 5.0 | .NET Full Stack Engineer Track**

A complete Angular SPA built incrementally across 10 hands-on exercises, covering Components, Routing, Forms, HTTP, State Management (NgRx), and Unit Testing.

---

## Project Overview

The **Student Course Portal** allows students to view their profile, browse and enroll in courses, check grades, and receive notifications. Administrators can manage course listings. The portal is built progressively — each hands-on adds a new capability.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Angular | 21.1 | Frontend framework (standalone components) |
| NgRx | 21.1 | State management (Store, Effects, Selectors) |
| RxJS | 7.8 | Reactive programming |
| Vitest | 4.1 | Unit testing framework |
| JSON Server | latest | Mock REST API backend |

---

## How to Run

### Prerequisites
- Node.js LTS 20+
- npm 10+
- Angular CLI v21 (`npm install -g @angular/cli`)

### Steps
```bash
# 1. Install dependencies
npm install

# 2. Start the mock API server (in a separate terminal)
npx json-server --watch db.json --port 3000

# 3. Start the Angular dev server
ng serve

# 4. Open http://localhost:4200
```

### Run Tests
```bash
ng test
```
**Result: 24 test suites, 62 tests — all passing.**

### Build for Production
```bash
ng build
```
Output is in the `dist/` folder. Initial bundle: ~383 kB (under the 500 kB warning budget).

---

## Project Structure

```
student-course-portal/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── header/          # Navigation bar (Hands-On 1, 2)
│   │   │   ├── course-card/     # Course card with @Input/@Output (Hands-On 2, 3)
│   │   │   ├── loading-spinner/ # Global loading indicator (Hands-On 8)
│   │   │   └── notification/    # Toast notification (Hands-On 6)
│   │   ├── pages/               # Page-level components
│   │   │   ├── home/            # Dashboard with stats (Hands-On 1, 2)
│   │   │   ├── course-list/     # Browse & search courses (Hands-On 3, 7, 9)
│   │   │   ├── course-detail/   # Single course view (Hands-On 7)
│   │   │   ├── student-profile/ # Student info & enrollments (Hands-On 6, 9)
│   │   │   ├── enrollment-form/ # Template-driven form (Hands-On 4)
│   │   │   ├── reactive-enrollment-form/ # Reactive form (Hands-On 5)
│   │   │   ├── courses-layout/  # Nested route layout (Hands-On 7)
│   │   │   └── not-found/       # 404 page (Hands-On 7)
│   │   ├── services/            # Angular services (DI)
│   │   │   ├── course.ts        # CourseService — HTTP + local data
│   │   │   ├── enrollment.ts    # EnrollmentService — enrollment state
│   │   │   ├── auth.ts          # AuthService — login state
│   │   │   ├── loading.ts       # LoadingService — loading state
│   │   │   └── notification.ts  # NotificationService — toast messages
│   │   ├── directives/          # Custom directives
│   │   │   └── highlight.ts     # Hover highlight directive
│   │   ├── pipes/               # Custom pipes
│   │   │   └── credit-label-pipe.ts # Credit label pipe
│   │   ├── guards/              # Route guards
│   │   │   ├── auth-guard.ts    # CanActivate — requires login
│   │   │   └── unsaved-changes-guard.ts # CanDeactivate — form dirty check
│   │   ├── interceptors/        # HTTP interceptors
│   │   │   ├── auth-interceptor.ts      # Adds Authorization header
│   │   │   ├── error-handler-interceptor.ts # Global error handling
│   │   │   └── loading-interceptor.ts   # Loading state management
│   │   ├── store/               # NgRx state management
│   │   │   ├── course/          # Course state (actions, reducer, effects, selectors)
│   │   │   └── enrollment/      # Enrollment state (actions, reducer, selectors)
│   │   ├── models/              # TypeScript interfaces
│   │   │   └── course.model.ts  # Course interface
│   │   ├── app.ts               # Root component
│   │   ├── app.config.ts        # App configuration (providers)
│   │   └── app.routes.ts        # Route definitions
│   ├── styles.css               # Global styles
│   └── main.ts                  # Entry point
├── db.json                      # Mock API data for JSON Server
├── notes.txt                    # File explanations (Hands-On 1)
├── angular.json                 # Angular workspace config
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies & scripts
```

---

## Hands-On Exercise Breakdown

### Hands-On 1 — Environment Setup, Project Structure & First Component
- **Files**: `angular.json`, `tsconfig.json`, `package.json`, `main.ts`, `app.config.ts`, `app.ts`, `index.html`, `notes.txt`
- Scaffolded project with `ng new student-course-portal --routing --style=css`
- Generated components: `header`, `home`, `course-list`, `student-profile`
- Added `<app-header>` and `<router-outlet>` to root template
- Created `notes.txt` with file explanations

### Hands-On 2 — Data Binding, Lifecycle Hooks & Component Communication
- **Features**: Interpolation, property binding, event binding, two-way binding (ngModel)
- `HomeComponent`: `portalName`, `isPortalActive`, `onEnrollClick()`, `searchTerm`
- `CourseCardComponent`: `@Input() course`, `@Output() enrollRequested` with `EventEmitter`
- Implemented `ngOnInit`, `ngOnDestroy`, `ngOnChanges` lifecycle hooks

### Hands-On 3 — Directives & Pipes (Built-in and Custom)
- **Structural Directives**: `*ngIf` (loading state, else block), `*ngFor` with `trackByCourseId`
- **Attribute Directives**: `[ngClass]` (card states), `[ngStyle]` (grade border colors)
- **Custom Directive**: `appHighlight` — configurable hover highlight with `@HostListener`
- **Custom Pipe**: `creditLabel` — transforms credit numbers to human-readable strings
- **Built-in Pipes**: `titlecase` for grade status display

### Hands-On 4 — Template-Driven Forms & Validation
- **Component**: `EnrollmentForm` at `/enroll`
- Fields: studentName, studentEmail, courseId, preferredSemester, agreeToTerms
- Built-in validators: `required`, `minlength`, `email`
- Error messages shown on `touched` state
- CSS classes: `.ng-invalid.ng-touched` (red), `.ng-valid.ng-touched` (green)
- Success message, Reset button via `enrollForm.resetForm()`

### Hands-On 5 — Reactive Forms, FormBuilder, FormGroup, FormArray & Custom Validators
- **Component**: `ReactiveEnrollmentForm` at `/enroll-reactive`
- Built with `FormBuilder.group()`, `FormArray` for additional courses
- **Custom Sync Validator**: `noCourseCode` — rejects codes starting with "XX"
- **Custom Async Validator**: `simulateEmailCheck` — checks email availability after 800ms
- Dynamic course controls: add/remove with `FormArray`
- Documented `value` vs `getRawValue()` difference

### Hands-On 6 — Services & Dependency Injection
- **CourseService**: `providedIn: 'root'` singleton, HTTP methods + local data
- **EnrollmentService**: Injects CourseService (service-to-service DI)
- **AuthService**: Login state management
- **LoadingService**: `BehaviorSubject<boolean>` for loading state
- **NotificationService**: Toast message management
- Component-level providers demo in Notification component

### Hands-On 7 — Angular Routing — Guards, Lazy Loading & Route Data
- **Routes**: `/` (Home), `/courses` (nested), `/courses/:id` (detail), `/profile`, `/**` (404)
- **Nested Routes**: `CoursesLayout` with `<router-outlet>` for list + detail
- **Route Parameters**: `ActivatedRoute.paramMap.get('id')` in CourseDetail
- **Query Parameters**: Search term in URL via `queryParams`
- **Lazy Loading**: Enrollment form chunks loaded on-demand (`loadComponent`)
- **Guards**: `authGuard` (CanActivate), `unsavedChangesGuard` (CanDeactivate)
- Budget: Lazy chunks at 6.66 kB + 8.74 kB

### Hands-On 8 — HTTP Client, Interceptors, Observables & Interceptors
- **HttpClientModule**: Provided via `provideHttpClient(withInterceptors([...]))`
- **GET/POST/PUT/DELETE**: Full CRUD in CourseService against JSON Server
- **RxJS Operators**: `map`, `catchError`, `tap`, `retry`, `switchMap` in service methods
- **Interceptors**:
  - `authInterceptor`: Adds `Authorization: Bearer mock-token-12345` header
  - `errorHandlerInterceptor`: Catches 401/404/500 errors globally
  - `loadingInterceptor`: Sets loading state via `LoadingService` with `finalize`

### Hands-On 9 — State Management — NgRx Store, Actions, Reducers, Effects & Selectors
- **Store**: `course` slice (courses, loading, error) + `enrollment` slice (enrolledCourseIds)
- **Actions**: `loadCourses`, `loadCoursesSuccess`, `loadCoursesFailure`, `enrollInCourse`, `unenrollFromCourse`
- **Reducers**: Pure functions using `createReducer` with `on()` handlers
- **Effects**: `CourseEffects.loadCourses$` — HTTP call → success/failure actions
- **Selectors**: `selectAllCourses`, `selectCoursesLoading`, `selectEnrolledIds`, `selectEnrolledCourses` (cross-slice)
- **DevTools**: `provideStoreDevtools({ maxAge: 25 })` for debugging
- Components dispatch actions and select state via `store.select()`

### Hands-On 10 — Unit Testing — Vitest & Angular TestBed
- **Test Framework**: Vitest (Angular 21 default) with jsdom environment
- **24 test suites, 62 tests — all passing**
- **CourseCardComponent tests**: Creation, @Input rendering, @Output emission, ngOnChanges, toggle expand
- **CourseService tests**: GET, POST, error handling, local data methods (with HttpTestingController)
- **CourseList tests**: NgRx MockStore integration, dispatch verification, loading/error/empty states
- **HomeComponent tests**: Creation, portal name display, ngModel binding, button states
- **CreditLabelPipe tests**: null, 0, 1, 3, 5 credit values
- **Highlight directive tests**: Creation, default color, mouseenter/mouseleave, custom color
- **StudentProfile tests**: Store-connected component with MockStore
- **Header/NotFound/CourseDetail tests**: RouterLink providers via `provideRouter`
- **NotificationService tests**: Message emission and clearing
- **UnsavedChangesGuard tests**: Dirty form detection

---

## API Mock Server (JSON Server)

The `db.json` file provides mock data:

```json
{
  "courses": [
    { "id": 1, "name": "Data Structures", "code": "CS101", "credits": 4, "gradeStatus": "passed" },
    { "id": 2, "name": "Operating Systems", "code": "CS201", "credits": 3, "gradeStatus": "pending" },
    ...
  ],
  "students": [...],
  "enrollments": [...]
}
```

**Endpoints**: `GET/POST/PUT/DELETE http://localhost:3000/courses`, `/students`, `/enrollments`

---

## Key Angular Concepts Demonstrated

| Concept | Implementation |
|---|---|
| Standalone Components | All components use modern standalone API (no NgModules) |
| Interpolation | `{{ portalName }}`, `{{ course.name }}` |
| Property Binding | `[disabled]`, `[routerLink]`, `[ngClass]`, `[ngStyle]` |
| Event Binding | `(click)`, `(ngSubmit)`, `(ngModelChange)` |
| Two-Way Binding | `[(ngModel)]` in forms |
| Structural Directives | `*ngIf`, `*ngFor`, `*ngSwitch`, `ng-template` |
| Custom Directive | `appHighlight` with `@HostListener`, `@Input` |
| Custom Pipe | `creditLabel` with `PipeTransform` |
| Template-Driven Forms | `ngModel`, `ngForm`, `NgForm`, built-in validators |
| Reactive Forms | `FormBuilder`, `FormGroup`, `FormArray`, `FormControl` |
| Custom Validators | Sync (`noCourseCode`) + Async (`simulateEmailCheck`) |
| Services & DI | `providedIn: 'root'`, service-to-service injection, component-level providers |
| Routing | Route params, query params, nested routes, wildcard route |
| Lazy Loading | `loadComponent` for enrollment forms |
| Route Guards | `CanActivate` (auth), `CanDeactivate` (unsaved changes) |
| HTTP Client | GET, POST, PUT, DELETE with `HttpClient` |
| RxJS Operators | `map`, `catchError`, `tap`, `retry`, `switchMap`, `finalize` |
| Interceptors | Auth token, error handling, loading state |
| NgRx Store | Actions, Reducers, Effects, Selectors, DevTools |
| Cross-Slice Selectors | Combining course + enrollment state |
| Unit Testing | TestBed, MockStore, HttpTestingController, vi.spyOn |

---

## Build Budget

| Type | Warning | Error |
|---|---|---|
| Initial bundle | 500 kB | 1 MB |
| Any component style | 4 kB | 8 kB |

**Actual initial bundle**: ~383 kB (well under budget)

---

## Submission

Organized in: `Angular_HandsOn/<YourName>/`

Complete Angular project folder (excluding `node_modules`).
