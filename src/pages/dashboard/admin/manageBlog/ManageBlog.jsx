import React, { useState } from 'react'
import { formatDate } from '../../../../utils/formatDate';
import { Link } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import { enqueueSnackbar } from "notistack";
import { useDeleteBlogMutation, useFetchAllBlogsQuery } from '../../../../redux/features/blogs/blogsApi';


const ManageBlog = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(12)
    const { data: { blogs = [], totalPages, totalBlogs } = {}, isLoading, error, refetch } = useFetchAllBlogsQuery({
        page: currentPage,
        limit: blogsPerPage,
    })

    // pagination
    const startBlog = (currentPage - 1) * blogsPerPage + 1;
    const endBlog = startBlog + blogs.length - 1;
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    const [deleteBlog] = useDeleteBlogMutation()
    const handleDeleteBlog = async (id) => {
        try {
            const response = await deleteBlog(id).unwrap();
            enqueueSnackbar("Blog deleted successfully", {
                variant: "success",
            });
            await refetch()

        } catch (error) {
            console.error("Error deleting blog", error)
            enqueueSnackbar("Error deleting blog", {
                variant: "error",
            });
        }
    }

    return (
        <>
            {
                isLoading && <Loading />

            }
            {
                error && <div>Error loading blogs.</div>
            }
            <section className="py-1 bg-blueGray-50">
                <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">All Blogs</h3>
                                </div>
                                
                            </div>
                            <h3 className='my-4  text-sm'>Showing {startBlog} to {endBlog} of {totalBlogs} blogs</h3>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            No.
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Blog Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Publishing date
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Edit or manage
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        blogs && blogs.map((blog, index) => (
                                            <tr key={index}>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                    {index + 1}
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                    {blog?.name}
                                                </td>
                                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {formatDate(blog?.createdAt)}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <Link className="bg-green-600 text-white px-2 py-1" to={`/dashboard/update-blog/${blog._id}`}> Edit</Link>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button
                                                        onClick={() => handleDeleteBlog(blog._id)}
                                                        className='bg-red-600 text-white px-2 py-1'>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }


                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

                {/* pagination */}
                <div className='mt-6 flex items-center justify-center'>
                    <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'>Previous</button>
                    {
                        [...Array(totalPages)].map((_, index) => (
                            <button
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1`}>{index + 1}</button>
                        ))
                    }
                    <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2'>Next</button>
                </div>


            </section>
        </>
    )
}

export default ManageBlog