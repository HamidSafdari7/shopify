import React from 'react'
import { formatDate } from '../../utils/formatDate'
import { Link } from 'react-router-dom'

const BlogCards = ({ blogs }) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12'>
            {blogs.map((blog, index) => (
                <Link to={`/blog/${blog._id}`}>
                    <div key={index} className='blog__card cursor-pointer hover:scale-105 transition-all duration-300'>
                        <img src={blog.image} alt={blog.name} className='max-h-96 md:h-64 w-full object-cover' />
                        <div className='blog__card__content'>
                            <h4>{blog.name}</h4>
                            <p>{formatDate(blog?.createdAt)}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default BlogCards
