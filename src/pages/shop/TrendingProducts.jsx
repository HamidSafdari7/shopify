import React, { useState } from 'react'
import ProductCards from './ProductCards'
import { useFetchTrendingProductsQuery } from '../../redux/features/products/productsApi';
import Loading from '../../components/Loading';
import { enqueueSnackbar } from 'notistack';

const TrendingProducts = () => {

    const [visibleProducts, setVisibleProducts] = useState(8);

    const loadMoreProducts = () => {
        setVisibleProducts(prevCount => prevCount + 4);
    }

    const { data: { products = [], totalProducts } = {}, error, isLoading } = useFetchTrendingProductsQuery({
        limit: visibleProducts
    })

    if (error) return enqueueSnackbar(error.data.message, { variant: "error", });
    if (isLoading) return <Loading />

    return (
        <section className='section__container product__container'>
            <h2 className='section__header'>Trending Products</h2>
            <p className='section__subheader !mb-12'>
                Discover the hottest pickes:Elevate your style with our curated
                Collection of trending women's fashion products
            </p>
            <ProductCards products={products} />

            <div className='product__btn'>
                {
                    visibleProducts < totalProducts && (
                        <button className='btn' onClick={loadMoreProducts}>Load More</button>
                    )
                }
            </div>
        </section>
    )
}

export default TrendingProducts
