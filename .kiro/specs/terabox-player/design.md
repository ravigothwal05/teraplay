# Design Document

## Overview

TeraPlay is a Next.js 14 web application that provides a seamless interface for playing TeraBox videos directly in the browser. The architecture follows a client-server model where the Next.js frontend handles user interactions and video playback, while Next.js API routes act as a secure proxy to an external resolver API. The application uses the App Router pattern, TypeScript for type safety, and Tailwind CSS for responsive styling.

The core workflow is:
1. User submits a TeraBox share link via the frontend form
2. Frontend calls the internal `/api/resolve` endpoint
3. Backend validates the request and calls the external resolver API
4. Resolver API returns video metadata and direct URLs
5. Frontend displays the video player with quality options and action buttons

## Architecture

### High-Level Architecture

```
┌─────────────────┐
│   User Browser  │
│   (Next.js UI)  │
└────────┬────────┘
         │ POST /api/resolve
         ▼
┌─────────────────┐
│  Next.js API    │
│  Route Handler  │
└────────┬────────┘
         │ GET with query params
         ▼
┌─────────────────┐
│  External       │
│  Resolver API   │
└─────────────────┘
```

### Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.x
- **Video Player**: HTML5 `<video>` element with native controls
- **Deployment**: Vercel-optimized build
- **Runtime**: Node.js (standard Next.js API routes, no edge runtime)

### Directory Structure

```
teraplay/
├── app/
│   ├── page.tsx                 # Home page with player
│   ├── layout.tsx               # Root layout with header/footer
│   ├── how-it-works/
│   │   └── page.tsx             # How it works page
│   ├── privacy/
│   │   └── page.tsx             # Privacy policy page
│   └── api/
│       └── resolve/
│           └── route.ts         # Video resolution API endpoint
├── components/
│   ├── UrlInputForm.tsx         # Input form component
│   ├── VideoPlayer.tsx          # Video player component
│   ├── ErrorAlert.tsx           # Error display component
│   ├── Header.tsx               # Navigation header
│   ├── Footer.tsx               # Footer with disclaimer
│   ├── AdSlot.tsx               # Ad placeholder component
│   └── LoadingSpinner.tsx       # Loading state component
├── lib/
│   ├── api.ts                   # Client-side API helpers
│   ├── types.ts                 # Shared TypeScript types
│   └── utils.ts                 # Utility functions
├── public/
│   └── (static assets)
├── .env.example                 # Environment variable template
├── .env.local                   # Local environment (gitignored)
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## Components and Interfaces

### Frontend Components

#### UrlInputForm Component

**Purpose**: Handles user input for TeraBox share links with validation.

**Props**:
```typescript
interface UrlInputFormProps {
  onSubmit: (url: string) => Promise<void>;
  isLoading: boolean;
}
```

**Behavior**:
- Controlled input with React state
- Client-side validation (non-empty, contains "terabox")
- Displays validation errors inline
- Disables submit button during loading
- Shows loading spinner when `isLoading` is true

#### VideoPlayer Component

**Purpose**: Displays the video with quality selection and action buttons.

**Props**:
```typescript
interface Quality {
  label: string;
  url: string;
}

interface VideoPlayerProps {
  title: string;
  thumbnail?: string;
  directUrl: string;
  size?: string;
  qualities?: Quality[];
}
```

**Behavior**:
- Renders HTML5 `<video>` element with controls
- If `qualities` array exists, displays quality selector buttons/dropdown
- Defaults to highest quality (last item in array)
- Switches video source when quality changes
- Provides "Copy direct link" button using Clipboard API
- Provides "Download" button as anchor with `download` attribute
- Shows toast notifications for copy success/failure

#### ErrorAlert Component

**Purpose**: Displays user-friendly error messages.

**Props**:
```typescript
interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
}
```

**Behavior**:
- Styled error box with red/warning colors
- Optional dismiss button
- Accessible with proper ARIA attributes

#### Header Component

**Purpose**: Navigation bar with links to main pages.

**Props**: None (static)

**Behavior**:
- Displays TeraPlay logo/title
- Navigation links: Home, How it Works, Privacy
- Responsive: hamburger menu on mobile, horizontal on desktop
- Sticky positioning optional

#### Footer Component

**Purpose**: Footer with copyright and disclaimer.

**Props**: None (static)

**Behavior**:
- Copyright notice
- Disclaimer: "This site does not host any files"
- Links to privacy and terms

#### AdSlot Component

**Purpose**: Placeholder for future ad integration.

**Props**:
```typescript
interface AdSlotProps {
  slotId: string;
}
```

**Behavior**:
- Renders empty `<div>` with unique ID
- Styled with minimum height for layout stability
- No actual ad network code

#### LoadingSpinner Component

**Purpose**: Visual loading indicator.

**Props**:
```typescript
interface LoadingSpinnerProps {
  message?: string;
}
```

**Behavior**:
- Animated spinner (CSS or SVG)
- Optional loading message below spinner

### Backend API Route

#### POST /api/resolve

**Purpose**: Proxy endpoint that validates requests and calls the external resolver API.

**Request Body**:
```typescript
interface ResolveRequest {
  url: string;
}
```

**Response (Success)**:
```typescript
interface ResolveResponse {
  success: true;
  fileName: string;
  size?: string;
  thumbnail?: string;
  directUrl: string;
  qualities?: Quality[];
}
```

**Response (Error)**:
```typescript
interface ResolveErrorResponse {
  success: false;
  message: string;
}
```

**Status Codes**:
- `200`: Successful resolution
- `400`: Invalid request (missing URL, invalid format)
- `502`: Resolver API error or failure

**Implementation Flow**:
1. Parse and validate request body
2. Check URL contains "terabox"
3. Read `TERABOX_RESOLVER_URL` from environment
4. Call external resolver with encoded URL parameter
5. Handle resolver response (success/failure)
6. Normalize and return response
7. Log errors to console

### External Resolver API Contract

**Endpoint**: Configured via `TERABOX_RESOLVER_URL` environment variable

**Request**: `GET {RESOLVER_URL}?url={encodedTeraBoxUrl}`

**Expected Response**:
```typescript
interface ExternalResolverResponse {
  success: boolean;
  fileName?: string;
  size?: string;
  thumbnail?: string;
  directUrl?: string;
  qualities?: Array<{
    label: string;
    url: string;
  }>;
  error?: string;
}
```

## Data Models

### TypeScript Interfaces

```typescript
// lib/types.ts

export interface Quality {
  label: string;
  url: string;
}

export interface VideoData {
  fileName: string;
  size?: string;
  thumbnail?: string;
  directUrl: string;
  qualities?: Quality[];
}

export interface ResolveRequest {
  url: string;
}

export interface ResolveSuccessResponse {
  success: true;
  fileName: string;
  size?: string;
  thumbnail?: string;
  directUrl: string;
  qualities?: Quality[];
}

export interface ResolveErrorResponse {
  success: false;
  message: string;
}

export type ResolveResponse = ResolveSuccessResponse | ResolveErrorResponse;

export interface ExternalResolverResponse {
  success: boolean;
  fileName?: string;
  size?: string;
  thumbnail?: string;
  directUrl?: string;
  qualities?: Quality[];
  error?: string;
}
```

### State Management

The application uses React's built-in state management:

- **Home Page State**:
  - `inputUrl`: string - Current input value
  - `videoData`: VideoData | null - Resolved video data
  - `error`: string | null - Error message
  - `isLoading`: boolean - Loading state
  - `selectedQuality`: Quality | null - Currently selected quality

- **VideoPlayer State**:
  - `currentUrl`: string - Active video source URL
  - `showCopyToast`: boolean - Copy notification visibility

No global state management library is needed for this application's scope.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, several properties can be consolidated to avoid redundancy:

- Properties 2.2 and 5.3 both test URL validation for "terabox" substring - can be combined
- Properties 3.1, 3.4, and 3.5 all relate to button URL synchronization - can be combined into one comprehensive property
- Properties 4.4 and 4.5 both test error response handling - can be combined
- Properties 6.4 and 6.5 both test layout component presence - can be combined

The following properties provide unique validation value:

Property 1: Form submission triggers loading state
*For any* valid TeraBox URL, when the form is submitted, the loading state should be set to true until the API response is received.
**Validates: Requirements 1.1**

Property 2: Video player renders with valid data
*For any* valid video data response, the video player component should render with an HTML5 video element containing the correct source URL and controls.
**Validates: Requirements 1.2**

Property 3: Quality selector displays all options
*For any* video data with a qualities array, the quality selector should render buttons or options for each quality in the array.
**Validates: Requirements 1.3**

Property 4: Quality selection updates video source
*For any* quality option selected by the user, the video element's source URL should update to match the selected quality's URL.
**Validates: Requirements 1.4**

Property 5: Metadata fields render when present
*For any* video data with fileName, size, and thumbnail fields, all provided fields should appear in the rendered player component.
**Validates: Requirements 1.5**

Property 6: URL validation rejects invalid formats
*For any* URL string that does not contain the substring "terabox", the validation function should return false and display an appropriate error message.
**Validates: Requirements 2.2, 5.3**

Property 7: Valid URLs pass validation
*For any* URL string containing "terabox", the validation function should return true and allow form submission.
**Validates: Requirements 2.3**

Property 8: Error responses display user-friendly messages
*For any* error response from the API, the UI should display a clear, non-technical error message explaining possible reasons for failure.
**Validates: Requirements 2.4, 10.5**

Property 9: Action buttons reference current quality URL
*For any* video with multiple qualities, when a quality is selected, both the copy and download buttons should reference the currently selected quality's URL.
**Validates: Requirements 3.1, 3.4, 3.5**

Property 10: Clipboard operations show notifications
*For any* clipboard copy operation, the UI should display a success notification if the operation succeeds, or an error notification if it fails.
**Validates: Requirements 3.2, 3.3**

Property 11: Environment variable is read correctly
*For any* API resolution request, the system should read the TERABOX_RESOLVER_URL environment variable and use it as the base URL for the external resolver call.
**Validates: Requirements 4.1**

Property 12: API request format is correct
*For any* TeraBox URL being resolved, the system should construct a GET request with the URL properly encoded as a query parameter.
**Validates: Requirements 4.3**

Property 13: Non-success responses return errors
*For any* resolver API response with a non-200 status code or success field set to false, the system should return a 502 or appropriate error status with a descriptive message.
**Validates: Requirements 4.4, 4.5**

Property 14: Request validation checks required fields
*For any* POST request to /api/resolve, if the request body is missing the url field or url is not a string, the system should return a 400 status code with an error message.
**Validates: Requirements 5.1, 5.2**

Property 15: Successful responses are normalized
*For any* successful resolver API response, the system should return a normalized response object containing fileName, directUrl, and optional size, thumbnail, and qualities fields.
**Validates: Requirements 5.4**

Property 16: Layout components render on all pages
*For any* page route in the application, both the Header and Footer components should be present in the rendered output.
**Validates: Requirements 6.4, 6.5**

Property 17: All pages have meta descriptions
*For any* page route in the application, the page metadata should include a description meta tag.
**Validates: Requirements 7.2**

Property 18: Video player maintains aspect ratio
*For any* video being played, the video element should maintain its aspect ratio when the viewport size changes.
**Validates: Requirements 8.4**

Property 19: AdSlot component accepts slotId prop
*For any* AdSlot component instance, the component should accept and store a slotId prop for future ad network integration.
**Validates: Requirements 9.4**

## Error Handling

### Client-Side Error Handling

**Input Validation Errors**:
- Empty URL input: Display inline validation message "Please enter a TeraBox link"
- Invalid URL format: Display "Please enter a valid TeraBox share link"
- Non-TeraBox URL: Display "URL must be a TeraBox share link"

**API Call Errors**:
- Network failure: Display "Unable to connect. Please check your internet connection and try again."
- Timeout: Display "Request timed out. Please try again."
- 400 Bad Request: Display the error message from the API response
- 502 Bad Gateway: Display "Unable to resolve this link. It may be invalid, private, or temporarily unavailable."
- Other errors: Display "An unexpected error occurred. Please try again later."

**Clipboard Errors**:
- Copy failure: Display toast notification "Failed to copy link. Please try manually."
- Success: Display toast notification "Link copied to clipboard!"

**Video Playback Errors**:
- Video load error: Display "Unable to load video. The link may have expired."
- Format not supported: Display "This video format is not supported by your browser."

### Server-Side Error Handling

**Environment Configuration Errors**:
- Missing TERABOX_RESOLVER_URL: Return 500 with message "Server misconfiguration. Please contact support."
- Log error: `console.error('TERABOX_RESOLVER_URL not configured')`

**Request Validation Errors**:
- Missing or invalid request body: Return 400 with message "Invalid request format"
- Missing url field: Return 400 with message "URL is required"
- Invalid URL type: Return 400 with message "URL must be a string"
- URL doesn't contain "terabox": Return 400 with message "Invalid TeraBox URL"

**External API Errors**:
- Network error: Return 502 with message "Unable to reach resolver service"
- Timeout: Return 502 with message "Resolver service timeout"
- Non-200 response: Return 502 with message "Unable to resolve this TeraBox link"
- Invalid response format: Return 502 with message "Invalid response from resolver service"
- Log all errors with details: `console.error('Resolver API error:', error)`

**Error Logging Strategy**:
- All server errors logged to console with timestamp and context
- Client errors logged to browser console in development mode
- Production: Consider integration with error tracking service (Sentry, etc.)

## Testing Strategy

### Unit Testing

The application will use **Vitest** as the testing framework for unit tests, chosen for its excellent Next.js and TypeScript integration, fast execution, and modern API.

**Unit Test Coverage**:

1. **Utility Functions** (`lib/utils.ts`):
   - URL validation function with various valid/invalid inputs
   - URL encoding/decoding helpers
   - Format helpers (file size formatting, etc.)

2. **API Route Handler** (`app/api/resolve/route.ts`):
   - Request validation with missing/invalid fields
   - Environment variable reading
   - Error response formatting
   - Response normalization

3. **Component Rendering**:
   - ErrorAlert displays correct message and styling
   - LoadingSpinner renders with optional message
   - AdSlot renders with correct slotId
   - Header contains all navigation links
   - Footer contains disclaimer text

4. **Edge Cases**:
   - Empty input submission (2.1)
   - Missing environment configuration (4.2)
   - Malformed resolver API responses
   - Clipboard API not available in browser

**Unit Test Examples**:
```typescript
// Example: URL validation
describe('validateTeraBoxUrl', () => {
  it('should reject empty strings', () => {
    expect(validateTeraBoxUrl('')).toBe(false);
  });
  
  it('should reject URLs without terabox', () => {
    expect(validateTeraBoxUrl('https://example.com')).toBe(false);
  });
  
  it('should accept valid TeraBox URLs', () => {
    expect(validateTeraBoxUrl('https://terabox.com/s/abc123')).toBe(true);
  });
});
```

### Property-Based Testing

The application will use **fast-check** as the property-based testing library, which is the standard PBT library for TypeScript/JavaScript with excellent type inference and generator composition.

**Configuration**:
- Each property test will run a minimum of 100 iterations
- Tests will use custom generators for domain-specific data (URLs, video metadata, quality arrays)
- Each test will be tagged with a comment referencing the design document property

**Property Test Coverage**:

Each correctness property from the design document will be implemented as a single property-based test:

1. **Property 1: Form submission triggers loading state**
   - Generate: Random valid TeraBox URLs
   - Test: Form submission sets loading to true
   - Tag: `// Feature: terabox-player, Property 1: Form submission triggers loading state`

2. **Property 2: Video player renders with valid data**
   - Generate: Random video data objects with required fields
   - Test: Player component renders with video element
   - Tag: `// Feature: terabox-player, Property 2: Video player renders with valid data`

3. **Property 3: Quality selector displays all options**
   - Generate: Random quality arrays (1-5 qualities)
   - Test: Selector renders button/option for each quality
   - Tag: `// Feature: terabox-player, Property 3: Quality selector displays all options`

4. **Property 4: Quality selection updates video source**
   - Generate: Random quality selections from available options
   - Test: Video source URL matches selected quality URL
   - Tag: `// Feature: terabox-player, Property 4: Quality selection updates video source`

5. **Property 5: Metadata fields render when present**
   - Generate: Random video data with various metadata combinations
   - Test: All provided fields appear in rendered output
   - Tag: `// Feature: terabox-player, Property 5: Metadata fields render when present`

6. **Property 6: URL validation rejects invalid formats**
   - Generate: Random URLs without "terabox" substring
   - Test: Validation returns false with error message
   - Tag: `// Feature: terabox-player, Property 6: URL validation rejects invalid formats`

7. **Property 7: Valid URLs pass validation**
   - Generate: Random URLs containing "terabox"
   - Test: Validation returns true
   - Tag: `// Feature: terabox-player, Property 7: Valid URLs pass validation`

8. **Property 8: Error responses display user-friendly messages**
   - Generate: Random error responses with various error types
   - Test: UI displays non-technical error message
   - Tag: `// Feature: terabox-player, Property 8: Error responses display user-friendly messages`

9. **Property 9: Action buttons reference current quality URL**
   - Generate: Random quality arrays and selections
   - Test: Copy/download buttons reference selected quality URL
   - Tag: `// Feature: terabox-player, Property 9: Action buttons reference current quality URL`

10. **Property 10: Clipboard operations show notifications**
    - Generate: Random clipboard operation results (success/failure)
    - Test: Appropriate notification is displayed
    - Tag: `// Feature: terabox-player, Property 10: Clipboard operations show notifications`

11. **Property 11: Environment variable is read correctly**
    - Generate: Random resolver URL values
    - Test: System reads and uses the environment variable
    - Tag: `// Feature: terabox-player, Property 11: Environment variable is read correctly`

12. **Property 12: API request format is correct**
    - Generate: Random TeraBox URLs
    - Test: Request has correct structure with encoded URL parameter
    - Tag: `// Feature: terabox-player, Property 12: API request format is correct`

13. **Property 13: Non-success responses return errors**
    - Generate: Random non-200 status codes and failure responses
    - Test: System returns appropriate error status and message
    - Tag: `// Feature: terabox-player, Property 13: Non-success responses return errors`

14. **Property 14: Request validation checks required fields**
    - Generate: Random invalid request bodies (missing url, wrong type)
    - Test: System returns 400 with error message
    - Tag: `// Feature: terabox-player, Property 14: Request validation checks required fields`

15. **Property 15: Successful responses are normalized**
    - Generate: Random successful resolver responses with varying fields
    - Test: Normalized response has correct structure
    - Tag: `// Feature: terabox-player, Property 15: Successful responses are normalized`

16. **Property 16: Layout components render on all pages**
    - Generate: Random page routes from the application
    - Test: Header and Footer present in rendered output
    - Tag: `// Feature: terabox-player, Property 16: Layout components render on all pages`

17. **Property 17: All pages have meta descriptions**
    - Generate: Random page routes from the application
    - Test: Page metadata includes description tag
    - Tag: `// Feature: terabox-player, Property 17: All pages have meta descriptions`

18. **Property 18: Video player maintains aspect ratio**
    - Generate: Random viewport sizes
    - Test: Video element aspect ratio remains constant
    - Tag: `// Feature: terabox-player, Property 18: Video player maintains aspect ratio`

19. **Property 19: AdSlot component accepts slotId prop**
    - Generate: Random slotId strings
    - Test: Component accepts and stores the prop
    - Tag: `// Feature: terabox-player, Property 19: AdSlot component accepts slotId prop`

**Custom Generators**:
```typescript
// Example generators for fast-check
const teraboxUrlArb = fc.string().map(s => `https://terabox.com/s/${s}`);

const qualityArb = fc.record({
  label: fc.constantFrom('360p', '480p', '720p', '1080p'),
  url: fc.webUrl()
});

const videoDataArb = fc.record({
  fileName: fc.string(),
  size: fc.option(fc.string()),
  thumbnail: fc.option(fc.webUrl()),
  directUrl: fc.webUrl(),
  qualities: fc.option(fc.array(qualityArb, { minLength: 1, maxLength: 5 }))
});
```

### Integration Testing

While not the primary focus, basic integration tests should verify:
- Full flow: URL input → API call → video display
- Error flow: Invalid URL → error display
- Quality switching flow: Select quality → video source updates

### Testing Requirements Summary

- **Unit tests** verify specific examples, edge cases, and component rendering
- **Property tests** verify universal properties across all inputs (minimum 100 iterations each)
- Each property test must be tagged with: `// Feature: terabox-player, Property {number}: {property_text}`
- Each correctness property must be implemented by a single property-based test
- Tests should be placed close to implementation to catch errors early
- Both unit and property tests are complementary and provide comprehensive coverage

## Performance Considerations

### Frontend Optimization

1. **Code Splitting**:
   - Next.js automatic code splitting by route
   - Dynamic imports for heavy components (video player libraries if using Plyr)

2. **Image Optimization**:
   - Use Next.js `<Image>` component for thumbnails
   - Lazy load thumbnails below the fold

3. **Bundle Size**:
   - Minimize dependencies (prefer native HTML5 video over heavy player libraries)
   - Tree-shaking enabled by default in Next.js

4. **Caching**:
   - Static pages cached at CDN edge (how-it-works, privacy)
   - API routes: no caching (dynamic content)

### Backend Optimization

1. **API Route Performance**:
   - Minimal processing (validation + proxy)
   - No database calls
   - Fast response times (<500ms target)

2. **External API Calls**:
   - Set reasonable timeout (10 seconds)
   - Handle timeouts gracefully
   - Consider retry logic for transient failures (optional)

3. **Error Logging**:
   - Async logging to avoid blocking responses
   - Rate limiting on error logs to prevent spam

### Mobile Optimization

1. **Network Efficiency**:
   - Minimize API payload size
   - Compress responses (Next.js handles automatically)
   - Lazy load non-critical resources

2. **Rendering Performance**:
   - Mobile-first CSS (smaller initial styles)
   - Avoid layout shifts (reserve space for video player)
   - Touch-optimized controls (44px minimum touch targets)

## Security Considerations

### Input Validation

- **Client-side**: Basic validation for UX (can be bypassed)
- **Server-side**: Strict validation (source of truth)
- Validate URL format and content
- Sanitize all user inputs before logging

### API Security

- **Rate Limiting**: Consider implementing rate limiting on /api/resolve to prevent abuse
- **CORS**: Next.js API routes default to same-origin; no CORS needed
- **Environment Variables**: Never expose TERABOX_RESOLVER_URL to client
- **Error Messages**: Don't leak sensitive information in error responses

### Content Security

- **CSP Headers**: Configure Content Security Policy to restrict resource loading
- **Video Sources**: Trust only URLs from known CDN domains (if possible)
- **XSS Prevention**: React escapes content by default; avoid dangerouslySetInnerHTML

### Privacy

- **No User Tracking**: No cookies or local storage for user identification
- **Minimal Logging**: Log only errors and essential debugging info
- **No Data Storage**: Don't store user-submitted URLs or video data
- **Analytics**: If added, use privacy-friendly analytics (Plausible, etc.)

## Deployment Configuration

### Vercel Deployment

**Build Configuration**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

**Environment Variables** (set in Vercel dashboard):
- `TERABOX_RESOLVER_URL`: URL of the external resolver API

**Vercel Configuration** (`vercel.json` - optional):
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Build Scripts

**package.json scripts**:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "type-check": "tsc --noEmit"
  }
}
```

### Environment Setup

**.env.example**:
```
# External resolver API endpoint
TERABOX_RESOLVER_URL=https://api.example.com/terabox/resolve
```

**.env.local** (gitignored):
```
TERABOX_RESOLVER_URL=https://your-actual-resolver-api.com/resolve
```

## Future Enhancements

### Phase 2 Features (Not in Current Scope)

1. **User Accounts**:
   - Save favorite videos
   - Watch history
   - Custom playlists

2. **Advanced Player Features**:
   - Playback speed control
   - Subtitle support
   - Picture-in-picture mode

3. **Social Features**:
   - Share to social media
   - Embed code generation
   - Comments/ratings

4. **Analytics**:
   - Track popular videos
   - Usage statistics
   - Performance monitoring

5. **Monetization**:
   - Actual ad network integration (AdSense, etc.)
   - Premium features
   - Affiliate links

6. **API Enhancements**:
   - Caching layer for frequently accessed videos
   - Multiple resolver API support with fallback
   - Batch URL resolution

## Maintenance and Monitoring

### Health Checks

- Monitor /api/resolve response times
- Track error rates and types
- Monitor external resolver API availability

### Logging Strategy

- Server errors: Console logs (captured by Vercel)
- Client errors: Browser console in development
- Production: Consider error tracking service

### Updates and Dependencies

- Regular dependency updates (security patches)
- Next.js version updates (follow stable releases)
- Monitor resolver API changes and update integration as needed

## Documentation Requirements

### README.md

Must include:
1. Project overview and features
2. Installation instructions
3. Environment variable configuration
4. Development commands (dev, build, test)
5. Deployment instructions
6. Architecture overview
7. Request flow diagram
8. Contributing guidelines (if open source)

### Code Documentation

- JSDoc comments for complex functions
- Inline comments for non-obvious logic
- Type definitions serve as documentation
- Component prop interfaces document usage

### API Documentation

- Document /api/resolve endpoint
- Request/response examples
- Error codes and messages
- External resolver API contract
