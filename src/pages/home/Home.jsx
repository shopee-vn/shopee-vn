import React from 'react';
import { Header } from '../../components/layout/header';
import { Banner } from '../../components/layout/banner';
import { CategorySlider } from '../../components/layout/categorySlider';
import { CategoryGrid } from '../../components/layout/categoryGrid';
import { ProductList } from '../../components/layout/productList';
import { Footer } from '../../components/layout/footer';

function Home() {
    return (
        <div className='sm: w-full'>
            <Header />
            <Banner />
            <CategorySlider />
            <CategoryGrid />
            <ProductList />
            <Footer />
        </div>
    );
}

export default Home;
