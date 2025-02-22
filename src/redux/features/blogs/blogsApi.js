import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/baseURL'

const blogsApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/blogs`,
        credentials: 'include'
    }),
    tagTypes: ["Blogs"],
    endpoints: (builder) => ({
        fetchAllBlogs: builder.query({
            query: ({ page = 1, limit = 10 }) => {
                const queryParams = new URLSearchParams({
                    page: page.toString(),
                    limit: limit.toString()
                }).toString();
                return `/?${queryParams}`
            },
            providesTags: ['Blogs']
        }),

        fetchLatestBlogs: builder.query({
            query: ({ limit = 4 }) => {
                const queryParams = new URLSearchParams({
                    limit: limit.toString()
                }).toString();
                return `/latest-blogs/?${queryParams}`
            },
            providesTags: ['Blogs']
        }),

        fetchAllBlogsWithNoFilter: builder.query({
            query: () => '/all-blogs',
        }),

        fetchBlogById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Blogs", id }],
        }),

        addBlog: builder.mutation({
            query: (newBlog) => ({
                url: "/create-blog",
                method: "POST",
                body: newBlog,
                credentials: "include"
            }),
            invalidatesTags: ["Blogs"]
        }),

        updateBlog: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/update-blog/${id}`,
                method: "PATCH",
                body: rest,
                credentials: "include"
            }),
            invalidatesTags: ["Blogs"]
        }),

        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
                credentials: "include"
            }),
            invalidatesTags: (result, error, id) => [{ type: "Blogs", id }],
        }),
    }),
})

export const {
    useFetchAllBlogsQuery,
    useFetchBlogByIdQuery,
    useAddBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useFetchLatestBlogsQuery,
    useFetchAllBlogsWithNoFilterQuery
} = blogsApi;

export default blogsApi;