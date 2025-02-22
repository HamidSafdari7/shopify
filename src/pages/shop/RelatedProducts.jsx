import React from 'react'
import { useFetchRelatedProductsQuery } from '../../redux/features/products/productsApi'
import { enqueueSnackbar } from 'notistack';
import ProductCards from './ProductCards';
import Loading from '../../components/Loading';
import Skeleton from '../../components/Skeleton';

const RelatedProducts = ({ id }) => {

    const { data, error, isLoading } = useFetchRelatedProductsQuery(id)

    if (error) return enqueueSnackbar(error.data.message, { variant: "error", });
    if (isLoading) return <Skeleton />

    return (
        <div>
            <h3 className='text-xl font-medium mb-4'>
                Related Products
            </h3>
            <ProductCards products={data && data.slice(0, 4)} />
        </div>
    )
}

export default RelatedProducts
