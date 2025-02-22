import React, { useEffect, useState } from 'react'
import ProductCards from '../shop/ProductCards';
import { useFetchAllProductsWithNoFilterQuery } from '../../redux/features/products/productsApi';
import Loading from '../../components/Loading';
import { enqueueSnackbar } from 'notistack';

const Search = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { data: { products = [] } = {}, error, isLoading } = useFetchAllProductsWithNoFilterQuery();

    useEffect(() => {
        if (products.length > 0) {
            setFilteredProducts(products);
        }
    }, [products]);

    if (error) return enqueueSnackbar(error.data.message, { variant: "error", });
    if (isLoading) return <Loading />



    const handleSearch = () => {
        const query = searchQuery.toLowerCase();

        const filteredData = products.filter(product => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query))

        setFilteredProducts(filteredData);
    }

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Search Products</h2>
                <p className='section__subheader'>Brows a diverse range of categories, from chic dresses to versatile accessories.Elevate your style today!</p>
            </section>

            <section className='section__container'>
                <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4'>
                    <input type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='search-bar w-full max-w-4xl p-2 border rounded'
                        placeholder='Search for products...'
                    />

                    <button
                        onClick={handleSearch}
                        className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded'
                    >
                        Search
                    </button>
                </div>

                <ProductCards products={filteredProducts} />
            </section>
        </>
    )
}

export default Search
