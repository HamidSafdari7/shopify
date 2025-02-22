import React, { useEffect, useState } from 'react'
import { enqueueSnackbar } from 'notistack';
import Loading from '../../components/Loading';
import { useFetchAllBlogsWithNoFilterQuery } from '../../redux/features/blogs/blogsApi';
import BlogCards from './BlogCards';

const AllBlogs = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const { data: { blogs = [] } = {}, error, isLoading } = useFetchAllBlogsWithNoFilterQuery();

    useEffect(() => {
        if (blogs.length > 0) {
            setFilteredBlogs(blogs);
        }
    }, [blogs]);

    if (error) return enqueueSnackbar(error.data.message, { variant: "error", });
    if (isLoading) return <Loading />



    const handleSearch = () => {
        const query = searchQuery.toLowerCase();

        const filteredData = blogs.filter(blog => blog.name.toLowerCase().includes(query) || blog.description.toLowerCase().includes(query))

        setFilteredBlogs(filteredData);
    }

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Blogs</h2>
                <p className='section__subheader'>Brows a diverse range of categories, from chic dresses to versatile accessories.Elevate your style today!</p>
            </section>

            <section className='section__container'>
                <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4'>
                    <input type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='search-bar w-full max-w-4xl p-2 border rounded'
                        placeholder='Search for blog...'
                    />

                    <button
                        onClick={handleSearch}
                        className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded'
                    >
                        Search
                    </button>
                </div>
                <BlogCards blogs={filteredBlogs} />
            </section>
        </>
    )
}

export default AllBlogs
