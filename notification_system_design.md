# Stage 1

## Approach

The system fetches notifications from the provided API and processes them in-memory.

### Steps:
1. Fetch notifications using API
2. Assign priority weights:
   - Placement → Highest priority
   - Event → Medium priority
   - Result → Lowest priority
3. Sort notifications based on:
   - Priority (descending)
   - Timestamp (latest first)
4. Return top N (10) notifications


## Data Handling

- No database is used (as per instructions)
- Data is processed directly from API response
- Efficient in-memory sorting is used

## Complexity

- Sorting complexity: O(n log n)
- Space complexity: O(n)


## Optimization (Future Scope)

- Use a Min Heap / Priority Queue to maintain top N efficiently
- Stream processing for real-time notifications
- Caching frequently accessed notifications


## Logging Middleware

- A reusable logging middleware is implemented
- Logs are sent to the external logging API
- Used in backend for:
  - Successful API calls
  - Error handling


## Architecture

Frontend → Backend → External API

- Frontend (React) handles UI and user interaction
- Backend (Node.js) handles:
  - API calls
  - Sorting logic
  - Logging
- This avoids CORS issues and secures tokens