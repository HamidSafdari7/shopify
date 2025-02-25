import React from 'react'
import Banner from './Banner'
import Categories from './Categories'
import HeroSection from './HeroSection'
import TrendingProducts from '../shop/TrendingProducts'
import DealsSection from './DealsSection'
import PromoBanner from './PromoBanner'
import LatestBlogs from '../blogs/LatestBlogs'

const Home = () => {
    return (
        <>
            <Banner />
            <Categories />
            <HeroSection />
            <TrendingProducts />
            <DealsSection />
            <PromoBanner />
            <LatestBlogs />
        </>
    )
}

export default Home
