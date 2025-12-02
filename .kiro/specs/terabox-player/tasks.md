# Implementation Plan

- [x] 1. Initialize Next.js project with TypeScript and Tailwind CSS





  - Create Next.js 14 project with App Router
  - Configure TypeScript with strict mode
  - Set up Tailwind CSS with custom configuration
  - Create .env.example file with TERABOX_RESOLVER_URL
  - Configure package.json with all required scripts (dev, build, test, lint)
  - _Requirements: 11.1, 11.2, 11.3, 11.4_



- [x] 2. Create shared TypeScript types and utility functions

  - Define all TypeScript interfaces in lib/types.ts (Quality, VideoData, ResolveRequest, ResolveResponse, etc.)
  - Implement URL validation utility function in lib/utils.ts
  - Implement URL encoding helper functions
  - _Requirements: 2.2, 2.3, 5.1, 5.2, 5.3, 10.1, 10.2_

- [ ]* 2.1 Write property test for URL validation
  - **Property 6: URL validation rejects invalid formats**
  - **Validates: Requirements 2.2, 5.3**

- [x]* 2.2 Write property test for valid URL acceptance


  - **Property 7: Valid URLs pass validation**
  - **Validates: Requirements 2.3**

- [x] 3. Implement API route for video resolution

  - Create app/api/resolve/route.ts with POST handler
  - Implement request body validation (check for url field and type)
  - Implement URL content validation (must contain "terabox")
  - Read TERABOX_RESOLVER_URL from environment variables
  - Implement external resolver API call with proper error handling
  - Implement response normalization logic
  - Add comprehensive error logging
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ]* 3.1 Write property test for environment variable reading
  - **Property 11: Environment variable is read correctly**
  - **Validates: Requirements 4.1**

- [ ]* 3.2 Write property test for API request format
  - **Property 12: API request format is correct**
  - **Validates: Requirements 4.3**

- [ ]* 3.3 Write property test for error response handling
  - **Property 13: Non-success responses return errors**
  - **Validates: Requirements 4.4, 4.5**

- [ ]* 3.4 Write property test for request validation
  - **Property 14: Request validation checks required fields**
  - **Validates: Requirements 5.1, 5.2**

- [ ]* 3.5 Write property test for response normalization
  - **Property 15: Successful responses are normalized**
  - **Validates: Requirements 5.4**

- [x]* 3.6 Write unit tests for API route edge cases


  - Test empty input submission handling
  - Test missing environment configuration
  - Test malformed resolver API responses
  - _Requirements: 2.1, 4.2_

- [x] 4. Create basic UI components





  - Implement LoadingSpinner component with optional message prop
  - Implement ErrorAlert component with message and optional dismiss
  - Implement AdSlot component with slotId prop
  - _Requirements: 9.1, 9.2, 9.4, 9.5_

- [ ]* 4.1 Write property test for AdSlot component
  - **Property 19: AdSlot component accepts slotId prop**
  - **Validates: Requirements 9.4**



- [ ]* 4.2 Write unit tests for basic components
  - Test ErrorAlert displays correct message
  - Test LoadingSpinner renders with optional message
  - Test AdSlot renders placeholder div
  - _Requirements: 9.5_

- [x] 5. Implement Header and Footer components




  - Create Header component with navigation links (Home, How it Works, Privacy)
  - Create Footer component with copyright and disclaimer
  - Make Header responsive (hamburger menu on mobile, horizontal on desktop)
  - _Requirements: 6.4, 6.5_



- [ ]* 5.1 Write property test for layout components
  - **Property 16: Layout components render on all pages**
  - **Validates: Requirements 6.4, 6.5**

- [ ]* 5.2 Write unit tests for Header and Footer
  - Test Header contains all navigation links
  - Test Footer contains disclaimer text
  - _Requirements: 6.4, 6.5_






- [x] 6. Create root layout with metadata

  - Implement app/layout.tsx with Header and Footer
  - Configure metadata for SEO (title, description, Open Graph tags)
  - Set up Tailwind global styles
  - _Requirements: 6.4, 6.5, 7.1, 7.2, 7.3_

- [-]* 6.1 Write property test for page metadata

  - **Property 17: All pages have meta descriptions**
  - **Validates: Requirements 7.2**





- [x] 7. Implement UrlInputForm component


  - Create controlled input component with React state
  - Implement client-side validation (non-empty, contains "terabox")
  - Display inline validation error messages
  - Disable submit button during loading
  - Show LoadingSpinner when isLoading prop is true
  - _Requirements: 1.1, 2.1, 2.2, 2.3_

- [x]* 7.1 Write property test for form loading state



  - **Property 1: Form submission triggers loading state**
  - **Validates: Requirements 1.1**

- [x] 8. Implement VideoPlayer component

  - Create component with HTML5 video element and controls
  - Display video metadata (title, size, thumbnail)
  - Implement quality selector (buttons or dropdown) when qualities array exists
  - Default to highest quality (last item in array)
  - Implement quality switching logic
  - Add "Copy direct link" button with Clipboard API integration
  - Add "Download" button as anchor with download attribute
  - Implement toast notifications for clipboard operations
  - Ensure responsive design and aspect ratio preservation
  - _Requirements: 1.2, 1.3, 1.4, 1.5, 3.1, 3.2, 3.3, 3.4, 3.5, 8.4_

- [ ]* 8.1 Write property test for video player rendering
  - **Property 2: Video player renders with valid data**
  - **Validates: Requirements 1.2**

- [ ]* 8.2 Write property test for quality selector
  - **Property 3: Quality selector displays all options**
  - **Validates: Requirements 1.3**

- [ ]* 8.3 Write property test for quality selection
  - **Property 4: Quality selection updates video source**
  - **Validates: Requirements 1.4**

- [x]* 8.4 Write property test for metadata rendering


  - **Property 5: Metadata fields render when present**
  - **Validates: Requirements 1.5**

- [ ]* 8.5 Write property test for action buttons
  - **Property 9: Action buttons reference current quality URL**
  - **Validates: Requirements 3.1, 3.4, 3.5**


- [ ]* 8.6 Write property test for clipboard notifications
  - **Property 10: Clipboard operations show notifications**



  - **Validates: Requirements 3.2, 3.3**

- [ ]* 8.7 Write property test for aspect ratio
  - **Property 18: Video player maintains aspect ratio**
  - **Validates: Requirements 8.4**





- [ ] 9. Create client-side API helper functions
  - Implement lib/api.ts with function to call /api/resolve endpoint
  - Add proper error handling and type safety
  - _Requirements: 1.1, 2.4_

- [ ]* 9.1 Write property test for error message display
  - **Property 8: Error responses display user-friendly messages**



  - **Validates: Requirements 2.4, 10.5**


- [ ] 10. Implement home page with video player functionality
  - Create app/page.tsx with state management (inputUrl, videoData, error, isLoading)
  - Integrate UrlInputForm component
  - Integrate VideoPlayer component (conditionally rendered)
  - Integrate ErrorAlert component (conditionally rendered)
  - Add AdSlot components in appropriate positions
  - Add SEO-optimized content and FAQ section
  - Implement form submission handler that calls API

  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.4, 7.4, 7.5, 9.1, 9.2_

- [ ] 11. Create informational pages
  - Implement app/how-it-works/page.tsx with explanation and legal disclaimer
  - Implement app/privacy/page.tsx with privacy policy content
  - Add metadata for each page
  - Use Tailwind typography for readable content
  - _Requirements: 6.1, 6.2, 6.3, 7.2_

- [x] 12. Checkpoint - Ensure all tests pass



  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Add final polish and optimization



  - Verify responsive design on mobile (360px+) and desktop
  - Ensure all error states display user-friendly messages
  - Verify SEO metadata on all pages
  - Test video playback with different quality options
  - Verify clipboard and download functionality
  - _Requirements: 8.1, 8.2, 8.3, 10.5_

- [x] 14. Create documentation



  - Write comprehensive README.md with installation, configuration, and deployment instructions
  - Add architecture overview and request flow diagram to README
  - Document all environment variables in .env.example
  - Add inline code comments for complex logic
  - _Requirements: 11.4_







- [ ] 15. Final verification and build test
  - Run production build (npm run build)
  - Verify build succeeds without errors
  - Test production build locally (npm start)
  - Verify all functionality works in production mode
  - _Requirements: 11.5_
