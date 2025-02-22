import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { enqueueSnackbar } from "notistack";
import Loading from '../../components/Loading';
import { useFetchBlogByIdQuery } from '../../redux/features/blogs/blogsApi';


const SingleBlog = () => {

    const { id } = useParams();

    const { data, error, isLoading } = useFetchBlogByIdQuery(id);

    const singleBlog = data?.blog || {};

    if (error) return enqueueSnackbar(error.data.message, { variant: "error", });
    if (isLoading) return <Loading />

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Single Blog Page</h2>
                <div className='section__subheader space-x-2'>
                    <span className='hover:text-primary'><Link to='/'>home</Link></span>
                    <i className='ri-arrow-right-s-line'></i>
                    <span className='hover:text-primary'><Link to='/blogs'>Blogs</Link></span>
                    <i className='ri-arrow-right-s-line'></i>
                    <span className='hover:text-primary'>{singleBlog?.name}</span>
                </div>
            </section>

            <section className='section__container mt-8'>
                <div className='flex flex-col items-center md:flex-row gap-8'>
                    <div className='md:w-1/2 w-full'>
                        <img className='rounded-md w-full h-auto' src={singleBlog?.image} alt="blog image" />
                    </div>

                    <div className='md:w-1/2 w-full'>
                        <h3 className='text-2xl font-semibold mb-4'>{singleBlog.name}</h3>
                        <p className='text-gray-600 mb-4'>{singleBlog?.description}</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleBlog
