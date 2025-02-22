import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCards from '../shop/ProductCards';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import Loading from '../../components/Loading';
import { enqueueSnackbar } from 'notistack';

const CategoryPage = () => {

    const { categoryName } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const [currentPage, setCurrentPage] = useState(1);
    const [ProductsPerPage] = useState(8);

    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: categoryName,
        color: '',
        minPrice: '',
        maxPrice: '',
        page: currentPage,
        limit: ProductsPerPage
    })


    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    if (error) return enqueueSnackbar(error.data.message, { variant: "error", });
    if (isLoading) return <Loading />

    const startProduct = (currentPage - 1) * ProductsPerPage + 1;
    const endProduct = startProduct + products.length - 1;


    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>{categoryName}</h2>
                <p className='section__subheader'>Brows a diverse range of categories, from chic dresses to versatile accessories.Elevate your style today!</p>
            </section>

            <div className='section__container'>
                <ProductCards products={products} />

                {/* Pagination */}
                <div className='mt-6 flex justify-center'>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'
                    >
                        Previous
                    </button>
                    {
                        [...Array(totalPages)].map((_, index) => (
                            <button
                                onClick={() => handlePageChange(index + 1)}
                                className={`rounded-md mx-1 px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                                key={index}
                            >
                                {index + 1}
                            </button>
                        ))
                    }
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2'
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default CategoryPage
