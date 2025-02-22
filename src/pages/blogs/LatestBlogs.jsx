import React from 'react'
import { enqueueSnackbar } from 'notistack';
import Loading from '../../components/Loading';
import { useFetchLatestBlogsQuery } from '../../redux/features/blogs/blogsApi';
import { formatDate } from '../../utils/formatDate';
import BlogCards from './BlogCards';
import { Link } from 'react-router-dom';

const LatestBlogs = () => {

  const { data: { blogs = [], totalBlogs } = {}, error, isLoading } = useFetchLatestBlogsQuery({
    limit: 4
  })

  if (error) return enqueueSnackbar(error.data.message, { variant: "error", });
  if (isLoading) return <Loading />


  return (
    <section className='section__container blog__container'>
      <h2 className='section__header'>Latest From Blog</h2>
      <p className='section__subheader'>
        Elevate your wardrobe with our freshest styel tips, trends and insperation on our blog.
      </p>
      <BlogCards blogs={blogs} />
      <Link to="/blogs">
        <div className='product__btn mt-8'>
          <button className='btn'>Discover More</button>
        </div>
      </Link>
    </section>
  )
}

export default LatestBlogs
