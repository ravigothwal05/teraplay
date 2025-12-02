# Requirements Document

## Introduction

TeraPlay is an online web application that enables users to play TeraBox video files directly in their browser without requiring the official TeraBox app. Users paste a public TeraBox share link, and the system resolves it to a playable video URL via a configurable third-party resolver API, then displays the video in an HTML5 player with quality selection, download, and link copying capabilities. The application is built with Next.js 14, TypeScript, and Tailwind CSS, optimized for mobile-first usage and SEO, targeting users primarily in India and Asia.

## Glossary

- **TeraPlay**: The name of the web application being built
- **TeraBox**: A cloud storage service that hosts video files
- **Share Link**: A public URL from TeraBox that points to a shared video file
- **Resolver API**: An external third-party API service that converts TeraBox share links into direct playable video URLs
- **Direct URL**: A CDN URL that points directly to the video file for streaming
- **Quality Selector**: A UI component allowing users to choose between different video resolutions (480p, 720p, etc.)
- **Next.js App Router**: The routing system in Next.js 14 using the app directory structure
- **HTML5 Video Player**: The native browser video element used for playback
- **Edge Runtime**: A serverless execution environment (not required for this project)

## Requirements

### Requirement 1

**User Story:** As a user, I want to paste a TeraBox share link and play the video in my browser, so that I can watch videos without installing the TeraBox app.

#### Acceptance Criteria

1. WHEN a user enters a valid TeraBox share link and clicks the play button, THEN TeraPlay SHALL display a loading state while resolving the link
2. WHEN the resolver API successfully returns video data, THEN TeraPlay SHALL display the video in an HTML5 player with playback controls
3. WHEN the resolver API returns multiple quality options, THEN TeraPlay SHALL display a quality selector with all available resolutions
4. WHEN a user selects a different quality option, THEN TeraPlay SHALL update the video player source to the selected quality URL
5. WHEN the video metadata is available, THEN TeraPlay SHALL display the file name, size, and thumbnail above the player

### Requirement 2

**User Story:** As a user, I want to validate my TeraBox link before submission, so that I receive immediate feedback on invalid inputs.

#### Acceptance Criteria

1. WHEN a user attempts to submit an empty input field, THEN TeraPlay SHALL prevent submission and display a validation message
2. WHEN a user enters a URL that does not contain "terabox", THEN TeraPlay SHALL display an error message indicating the link is invalid
3. WHEN a user enters a valid TeraBox URL format, THEN TeraPlay SHALL enable the play button and allow submission
4. WHEN the resolver API returns an error or the link is private, THEN TeraPlay SHALL display a clear error message explaining possible reasons

### Requirement 3

**User Story:** As a user, I want to copy the direct video URL and download the video, so that I can save or share the content.

#### Acceptance Criteria

1. WHEN a user clicks the "Copy direct link" button, THEN TeraPlay SHALL copy the current quality video URL to the system clipboard
2. WHEN the clipboard copy operation succeeds, THEN TeraPlay SHALL display a success notification to the user
3. WHEN the clipboard copy operation fails, THEN TeraPlay SHALL display an error notification to the user
4. WHEN a user clicks the "Download" button, THEN TeraPlay SHALL trigger a browser download of the current quality video file
5. WHEN multiple qualities are available and a user switches quality, THEN the copy and download buttons SHALL reference the currently selected quality URL

### Requirement 4

**User Story:** As a site owner, I want to integrate with a configurable resolver API, so that I can change the backend service without modifying code.

#### Acceptance Criteria

1. WHEN TeraPlay receives a video resolution request, THEN the system SHALL read the resolver API URL from the TERABOX_RESOLVER_URL environment variable
2. WHEN the resolver API URL is not configured, THEN TeraPlay SHALL return an error response indicating misconfiguration
3. WHEN TeraPlay calls the resolver API, THEN the system SHALL send a GET request with the TeraBox URL as a query parameter
4. WHEN the resolver API returns a non-200 status code, THEN TeraPlay SHALL return a 502 error with a descriptive message
5. WHEN the resolver API response has success set to false, THEN TeraPlay SHALL return an error response with the failure reason

### Requirement 5

**User Story:** As a developer, I want a well-structured Next.js API route, so that the backend logic is maintainable and follows best practices.

#### Acceptance Criteria

1. WHEN the API route receives a POST request to /api/resolve, THEN the system SHALL validate that the request body contains a url field
2. WHEN the url field is missing or not a string, THEN the system SHALL return a 400 status code with an error message
3. WHEN the url field does not contain the substring "terabox", THEN the system SHALL return a 400 status code with a validation error
4. WHEN the resolver API call succeeds, THEN the system SHALL normalize and return the response with fileName, size, thumbnail, directUrl, and qualities fields
5. WHEN any error occurs during resolution, THEN the system SHALL log the error details to the server console

### Requirement 6

**User Story:** As a user, I want to navigate to informational pages, so that I can understand how the service works and review privacy policies.

#### Acceptance Criteria

1. WHEN a user navigates to /how-it-works, THEN TeraPlay SHALL display a page explaining the service functionality and legal disclaimers
2. WHEN a user navigates to /privacy, THEN TeraPlay SHALL display a privacy policy page explaining data handling practices
3. WHEN a user views the how-it-works page, THEN the system SHALL include a disclaimer that no files are hosted by the service
4. WHEN a user views any page, THEN TeraPlay SHALL display a header with navigation links to Home, How it Works, and Privacy pages
5. WHEN a user views any page, THEN TeraPlay SHALL display a footer with copyright information and a disclaimer

### Requirement 7

**User Story:** As a site owner, I want the application to be SEO-optimized, so that users can discover the service through search engines.

#### Acceptance Criteria

1. WHEN a search engine crawls the home page, THEN TeraPlay SHALL provide metadata with title "Online TeraBox Player – Play TeraBox Videos in Browser"
2. WHEN a search engine crawls any page, THEN TeraPlay SHALL provide a meta description explaining the service functionality
3. WHEN the home page is shared on social media, THEN TeraPlay SHALL provide Open Graph tags for proper preview rendering
4. WHEN a user views the home page, THEN TeraPlay SHALL display SEO-optimized content targeting keywords like "online terabox player" and "play terabox without app"
5. WHEN a user views the home page, THEN TeraPlay SHALL display an FAQ section answering common questions about safety, hosting, and link issues

### Requirement 8

**User Story:** As a user on a mobile device, I want a responsive interface, so that I can use the service comfortably on any screen size.

#### Acceptance Criteria

1. WHEN a user accesses TeraPlay on a screen width of 360px or larger, THEN the system SHALL display all UI elements in a readable and accessible layout
2. WHEN a user accesses TeraPlay on a mobile device, THEN the system SHALL prioritize mobile-first design patterns and touch-friendly controls
3. WHEN a user accesses TeraPlay on a desktop screen, THEN the system SHALL utilize available space with appropriate layout adjustments
4. WHEN the video player is displayed, THEN TeraPlay SHALL ensure the player is responsive and maintains proper aspect ratio across all screen sizes
5. WHEN UI components are rendered, THEN TeraPlay SHALL use Tailwind CSS utility classes for consistent styling

### Requirement 9

**User Story:** As a site owner, I want to prepare for ad monetization, so that I can generate revenue without disrupting the user experience.

#### Acceptance Criteria

1. WHEN the home page renders, THEN TeraPlay SHALL include an AdSlot component placeholder below the input form
2. WHEN the video player is displayed, THEN TeraPlay SHALL include an AdSlot component placeholder below the player
3. WHEN the page is viewed on a desktop screen, THEN TeraPlay SHALL include an AdSlot component in the sidebar or bottom area
4. WHEN an AdSlot component renders, THEN the system SHALL accept a slotId prop for future ad network integration
5. WHEN an AdSlot component renders, THEN the system SHALL display a placeholder div without any actual ad network code

### Requirement 10

**User Story:** As a developer, I want comprehensive TypeScript types and clean code organization, so that the codebase is maintainable and type-safe.

#### Acceptance Criteria

1. WHEN any component or function is defined, THEN the system SHALL use TypeScript with explicit type annotations
2. WHEN API responses are handled, THEN the system SHALL define TypeScript interfaces for all response shapes
3. WHEN the project structure is organized, THEN the system SHALL separate concerns into app/, components/, and lib/ directories
4. WHEN key logic is implemented, THEN the system SHALL include code comments explaining complex or important sections
5. WHEN errors occur in the UI, THEN TeraPlay SHALL display clean error states with user-friendly messages

### Requirement 11

**User Story:** As a developer deploying to Vercel, I want proper configuration files, so that the application builds and runs correctly in production.

#### Acceptance Criteria

1. WHEN the project is initialized, THEN the system SHALL include package.json with all required dependencies for Next.js 14, TypeScript, and Tailwind CSS
2. WHEN the project is configured, THEN the system SHALL include tsconfig.json with appropriate TypeScript compiler options
3. WHEN the project is configured, THEN the system SHALL include next.config.js with any necessary Next.js configuration
4. WHEN the project is configured, THEN the system SHALL include a .env.example file documenting required environment variables
5. WHEN the project is built, THEN the system SHALL produce a production-ready build compatible with Vercel deployment
