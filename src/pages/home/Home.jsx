import React from 'react';
import { useEffect, useState } from 'react';
import { getDatabase, ref, get, child } from 'firebase/database';
import app from '../../firebaseConfig';

import { Header } from '../../components/layout/header';
import { Banner } from '../../components/layout/banner';
import { CategorySlider } from '../../components/layout/categorySlider';
import { CategoryGrid } from '../../components/layout/categoryGrid';
import { ProductList } from '../../components/layout/productList';
import { Footer } from '../../components/layout/footer';
import { SearchResult } from '../searchResult';

function Home() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const searchProducts = async () => {
        const db = getDatabase(app);
        const snapshot = await get(child(ref(db), 'shope/products'));
        if (snapshot.exists()) {
            const data = snapshot.val();
            const allProducts = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));

            const filtered = allProducts.filter(
                (product) =>
                    typeof product.name === 'string' && product.name.toLowerCase().includes(query.toLowerCase()),
            );

            setResults(filtered);
            setHasSearched(true);
        } else {
            setResults([]);
            setHasSearched(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchProducts();
        }
    };

    console.log(query);
    console.log(results);

    return (
        <div className="sm: w-full">
            <Header query={query} setQuery={setQuery} handleKeyDown={handleKeyDown} />
            {hasSearched ? (
                <SearchResult product={results} />
            ) : (
                <>
                    <Banner />
                    <CategorySlider />
                    <CategoryGrid />
                    <ProductList />
                </>
            )}
            <Footer />
        </div>
    );
}

export default Home;
