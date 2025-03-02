'use client';

import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { SiRipple, SiDogecoin, SiCardano } from 'react-icons/si';

const CRYPTO_IDS = ['bitcoin', 'ethereum', 'ripple', 'dogecoin', 'cardano'];

const cryptoIcons = {
  bitcoin: <FaBitcoin className="text-yellow-500" size={50} />,
  ethereum: <FaEthereum className="text-gray-600" size={50} />,
  ripple: <SiRipple className="text-blue-400" size={50} />,
  dogecoin: <SiDogecoin className="text-yellow-300" size={50} />,
  cardano: <SiCardano className="text-blue-700" size={50} />,
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCrypto, setActiveCrypto] = useState(null);
  // State to store live prices from WebSocket
  const [livePrices, setLivePrices] = useState({});

  // Fetch initial prices from CoinGecko as fallback data.
  const fetchCryptoPrices = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${CRYPTO_IDS.join(
          ','
        )}&vs_currencies=usd`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch crypto prices');
    }
  }, []);

  // Use React Query to manage fallback fetches.
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['cryptoPrices'],
    queryFn: fetchCryptoPrices,
    // Data is only refetched when the Refresh button is clicked
    retry: 3,
  });

  // Set up a WebSocket connection to CoinCap for live price updates.
  useEffect(() => {
    const assetString = CRYPTO_IDS.join(',');
    const ws = new WebSocket(
      `wss://ws.coincap.io/prices?assets=${assetString}`
    );
    ws.onmessage = (message) => {
      const newPrices = JSON.parse(message.data);
      setLivePrices((prev) => ({ ...prev, ...newPrices }));
    };
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    return () => {
      ws.close();
    };
  }, []);

  // Filter the cryptocurrencies based on the search term.
  const filteredCryptos = CRYPTO_IDS.filter((crypto) =>
    crypto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Returns live price if available, otherwise fallback fetched price.
  const getDisplayPrice = (crypto) => {
    const livePrice = livePrices[crypto];
    const fetchedPrice = data?.[crypto]?.usd;
    const price = livePrice || fetchedPrice || 'N/A';
    return typeof price === 'number' ? price.toFixed(8) : price;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-8">
      <div className="w-full max-w-5xl bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-700">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-8 tracking-tight">
          Blockhouse Crypto Tracker
        </h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            className="flex-1 p-4 text-white bg-slate-700/50 border border-slate-600 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                     placeholder-slate-400 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => refetch()}
            className="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg 
                     transition-colors shadow-lg hover:shadow-indigo-500/20"
          >
            Refresh
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-400 bg-red-900/20 rounded-lg p-4 mb-6">
            Error fetching prices. Please try again.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCryptos.map((crypto) => (
            <div
              key={crypto}
              onClick={() => setActiveCrypto(crypto)}
              className="p-6 bg-slate-700/50 rounded-xl border border-slate-600 hover:border-slate-500
                       shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl 
                       cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{cryptoIcons[crypto]}</div>
                <h2 className="text-xl font-semibold capitalize text-white">
                  {crypto}
                </h2>
              </div>
              <p className="text-slate-300 text-lg mt-3">
                ${getDisplayPrice(crypto)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeCrypto && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
               onClick={() => setActiveCrypto(null)}></div>
          <div className="relative bg-slate-800 rounded-xl p-8 w-96 border border-slate-700 shadow-2xl">
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4">{cryptoIcons[activeCrypto]}</div>
              <h2 className="text-2xl font-bold capitalize text-white mb-4">
                {activeCrypto}
              </h2>
              <p className="text-xl text-slate-300">
                ${getDisplayPrice(activeCrypto)}
              </p>
              <button
                onClick={() => setActiveCrypto(null)}
                className="mt-6 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white 
                         rounded-lg transition-colors shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
