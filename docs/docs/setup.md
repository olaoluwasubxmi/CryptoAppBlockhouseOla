# Project Setup Guide

## Project Structure
```
CryptoApp/
├── web-app/     # Next.js frontend application 
└── docs/        # Documentation (Docusaurus)
```

## Setup Instructions

### Web Application Setup
1. Navigate to web-app directory:
```bash
cd web-app
npm install
npm run dev
```
The app will be available at http://localhost:3000

### Documentation Setup
1. Navigate to docs directory:
```bash
cd docs
npm install
npm run start
```
The documentation will be available at http://localhost:3000

## API Integration

The web application uses React Query for API data management:

```javascript
// Example of how cryptocurrency data is fetched
const { data, isLoading } = useQuery({
  queryKey: ['crypto'],
  queryFn: () => axios.get('/api/crypto')
})
```

## State Management

We chose React Query for state management because:
- Built-in caching mechanism
- Automatic background refetching
- Loading and error states handling
- Zero-config cache invalidation

## Challenges & Solutions

1. **Real-time Price Updates**
   - Challenge: Keeping cryptocurrency prices up-to-date
   - Solution: Implemented polling with React Query's refetchInterval

2. **Performance Optimization**
   - Challenge: Large datasets causing render delays
   - Solution: Implemented virtualization for long lists

3. **Mobile Responsiveness**
   - Challenge: Complex charts on mobile devices
   - Solution: Used responsive breakpoints and simplified mobile views
