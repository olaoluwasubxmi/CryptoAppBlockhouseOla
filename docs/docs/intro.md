# CryptoApp Documentation

Welcome to the CryptoApp documentation. This guide covers everything you need to know about setting up, integrating, and understanding the architecture of both web and mobile applications.

## Project Setup Guide

### Prerequisites

Before you begin, ensure you have:

- Node.js (version 18.0 or above)
- npm or yarn package manager 
- Git
- Expo CLI (for mobile app)

### Web Application Setup

1. Clone the repository:
```bash
git clone https://github.com/olaoluwasubxmi/blockhouseassignmentola
cd CryptoApp/web-app
```

2. Install dependencies:
```bash 
npm install
```

3. Start development server:
```bash
npm run dev
```

The web app will be available at `http://localhost:3000`

### Mobile Application Setup

1. Navigate to mobile app directory:
```bash
cd ../mobile-app
```

2. Install dependencies:
```bash
npm install
```

3. Start Expo development server:
```bash
npx expo start
```

Scan the QR code with Expo Go app to run on your device.

## API Integration

### Data Fetching Architecture

The application uses React Query for data fetching and caching. Here's how it's implemented:

```typescript
// Example of crypto price fetching
const useCryptoPrices = () => {
  return useQuery({
    queryKey: ['cryptoPrices'],
    queryFn: async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price');
      return response.json();
    },
    refetchInterval: 30000 // Refetch every 30 seconds
  });
};
```

### Real-time Updates

WebSocket connections are used for real-time price updates:

```typescript
const useCryptoWebSocket = () => {
  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
    
    ws.onmessage = (event) => {
      // Handle incoming data
    };

    return () => ws.close();
  }, []);
};
```

## State Management

The project uses a combination of state management solutions:

### Zustand

Chosen for global state management due to its:
- Minimal boilerplate
- Built-in persist middleware
- TypeScript support

Example implementation:

```typescript
import create from 'zustand';

const useStore = create((set) => ({
  favorites: [],
  addFavorite: (coin) => set((state) => ({ 
    favorites: [...state.favorites, coin] 
  }))
}));
```

### React Query

Used for server state management because it provides:
- Automatic caching
- Background refetching
- Loading/error states

### Context API

Used for theme and authentication state that needs to be accessible throughout the app.

## Challenges & Solutions

### 1. Real-time Data Synchronization

**Challenge**: Keeping data consistent across multiple WebSocket connections.

**Solution**: Implemented a custom WebSocket manager that:
- Handles reconnection
- Deduplicates messages
- Batches updates

### 2. Mobile Performance

**Challenge**: Mobile app performance issues with large lists of cryptocurrencies.

**Solution**: 
- Implemented virtualized lists
- Added pagination
- Optimized re-renders using memo and useMemo

### 3. State Management Complexity

**Challenge**: Managing complex state interactions between different parts of the app.

**Solution**:
- Separated concerns between global and local state
- Created custom hooks for common operations
- Implemented proper TypeScript types for type safety

## Testing

Run tests using:

```bash
# Web app tests
cd web-app
npm test

# Mobile app tests
cd mobile-app
npm test
```

## Deployment

### Web Application
```bash
cd web-app
npm run build
npm run start
```

### Mobile Application
```bash
cd mobile-app
eas build
```

## Contributing

Please read our contributing guidelines before submitting pull requests.
