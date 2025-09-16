'use client';

import React, { useState, useRef } from 'react';
import { Search, ArrowUp } from 'lucide-react';

const basicFoods = [
  { label: 'Su', emoji: '💧' },
  { label: 'Ekmek', emoji: '🍞' },
  { label: 'Süt', emoji: '🥛' },
  { label: 'Peynir', emoji: '🧀' },
  { label: 'Et', emoji: '🥩' },
  { label: 'Tavuk', emoji: '🍗' },
  { label: 'Balık', emoji: '🐟' },
  { label: 'Yumurta', emoji: '🥚' },
  { label: 'Sebze', emoji: '🥦' },
  { label: 'Meyve', emoji: '🍎' },
  { label: 'Yoğurt', emoji: '🧁' },
  { label: 'Pirinç', emoji: '🍚' },
  { label: 'Makarna', emoji: '🍝' },
  { label: 'Baklagil', emoji: '🌰' },
  { label: 'Fındık', emoji: '🥜' },
];

const FoodValuePage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const handleSearch = async (term = query) => {
    if (!term.trim()) return;
    setQuery(term);
    setLoading(true);

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          term
        )}&search_simple=1&action=process&json=1&page_size=10`
      );
      const data = await res.json();
      setResults(data.products || []);
      setTimeout(() => listRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (error) {
      console.error('API error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-16">
      {/* Sol Menü */}
      <aside className="md:w-1/5  p-6 sticky h-auto md:h-screen ">
        <h2 className="  mb-6  text-color6">Temel Besinler</h2>
        <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
          {basicFoods.map(({ label, emoji }) => (
            <button
              key={label}
              onClick={() => handleSearch(label)}
              className="flex items-center gap-2 px-4 py-2 bg-color5/20 rounded-lg font-medium shadow transition-all duration-150"
            >
              <span className="text-lg">{emoji}</span>
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Ana İçerik */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl   mb-6 text-center text-gray-800"> Besin Değeri Arama</h1>

        <div className="flex flex-col sm:flex-row gap-2 mb-8 items-center">
          <div className="relative w-full sm:w-auto flex-1">
            <input
              type="text"
              placeholder="Örn: domates, ekmek, süt"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border border-gray-300 px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <button
            onClick={() => handleSearch()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition "
          >
            Ara
          </button>
        </div>

        {loading && <p className="text-center text-blue-600 animate-pulse">🔄 Yükleniyor...</p>}
        {!loading && results.length === 0 && (
          <p className="text-center text-gray-500 italic">
            Bir şeyler arayın veya soldan seçim yapın...
          </p>
        )}

        <div ref={listRef} className="space-y-4">
          {results.map((product) => (
            <div
              key={product.id || product.code}
              className="border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition bg-white"
            >
              <h2 className="  text-blue-700 mb-2">
                {product.product_name || 'İsimsiz Ürün'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-sm">
                <p><strong>Marka:</strong> {product.brands || 'Bilinmiyor'}</p>
                <p><strong>Kalori:</strong> {product.nutriments?.energy_kcal || 'Bilgi yok'} kcal</p>
                <p><strong>Protein:</strong> {product.nutriments?.proteins || 'Bilgi yok'} g</p>
                <p><strong>Yağ:</strong> {product.nutriments?.fat || 'Bilgi yok'} g</p>
                <p><strong>Karbonhidrat:</strong> {product.nutriments?.carbohydrates || 'Bilgi yok'} g</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Yukarı Çık Butonu */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={scrollToTop}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          title="Yukarı Çık"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </div>
  );
};

export default FoodValuePage;




/* 'use client';

import React, { useState } from 'react';
const NEXT_PUBLIC_USDA_API_KEY = process.env.NEXT_PUBLIC_USDA_API_KEY

const commonFoods = [
  'Apple',
  'Banana',
  'Milk',
  'Egg',
  'Rice',
  'Bread',
  'Chicken',
  'Beef',
  'Cheese',
  'Tomato',
];

const FoodValuePage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFoodData = async (term) => {
    const searchTerm = term || query;
    if (!searchTerm.trim()) return;

    setLoading(true);
    setResults([]);
    setQuery(searchTerm);

    try {
      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(searchTerm)}&pageSize=10&api_key=${process.env.NEXT_PUBLIC_USDA_API_KEY}`
      );
      const data = await res.json();
      setResults(data.foods || []);
    } catch (err) {
      console.error('API hatası:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl  mb-4">Gıda Besin Değerleri (USDA)</h1>

      <div className="mb-6">
        <p className="mb-2 ">📌 Sık Kullanılan Gıdalar:</p>
        <div className="flex flex-wrap gap-2">
          {commonFoods.map((food) => (
            <button
              key={food}
              onClick={() => fetchFoodData(food)}
              className="bg-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-300 transition"
            >
              {food}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="El ile arama (örn: lentils, oats)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-md"
        />
        <button
          onClick={() => fetchFoodData()}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Ara
        </button>
      </div>

      {loading && <p>Yükleniyor...</p>}

      {results.length > 0 && (
        <ul className="space-y-4">
          {results.map((food) => (
            <li key={food.fdcId} className="border p-4 rounded-md shadow">
              <h2 className=" text-lg">{food.description}</h2>
              <p><strong>Category:</strong> {food.foodCategory || 'Bilinmiyor'}</p>
              <ul className="mt-2 space-y-1">
                {food.foodNutrients?.slice(0, 5).map((nutrient) => (
                  <li key={nutrient.nutrientId}>
                    {nutrient.nutrientName}: {nutrient.value} {nutrient.unitName}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FoodValuePage;


 */
