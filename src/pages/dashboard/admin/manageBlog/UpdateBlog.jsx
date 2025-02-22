import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import TextInput from '../addProduct/TextInput';
import UploadImage from '../addProduct/UploadImage';
import { enqueueSnackbar } from "notistack";
import Loading from '../../../../components/Loading';
import { useFetchBlogByIdQuery, useUpdateBlogMutation } from '../../../../redux/features/blogs/blogsApi';


const UpdateBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)
    const [blog, setBlog] = useState({
        name: '',
        description: '',
        image: ''
    })

    const { data: blogData, isLoading: isBlogLoading, error: fetchError, refetch } = useFetchBlogByIdQuery(id);

    const [newImage, setNewImage] = useState(null)

    const { name, description, image: imageURL } = blogData?.blog || {};

    const [updateBlog, { isLoading: isUpdating, error: updateError }] = useUpdateBlogMutation();

    useEffect(() => {
        if (blogData) {
            setBlog({
                name: name || '',
                description: description || '',
                image: imageURL || ''
            })
        }
    }, [blogData])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog({
            ...blog,
            [name]: value
        });


    };

    const handleImageChange = (image) => {
        setNewImage(image);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedBlog = {
            ...blog,
            image: newImage ? newImage : blog.image,
            author: user?._id
        };

        try {
            await updateBlog({ id: id, ...updatedBlog }).unwrap();
            enqueueSnackbar("Blog updated successfully", {
                variant: "success",
            });
            await refetch();
            navigate("/dashboard/manage-blogs")
        } catch (error) {
            console.error('Failed to update blog', error);
            enqueueSnackbar("Failed to update blog", {
                variant: "error",
            });
        }

    }

    if (isBlogLoading) return <Loading />
    if (fetchError) return <div>Error fetching blog!...</div>
    return (
        <div className='container mx-auto mt-8'>
            <h2 className='text-2xl font-bold mb-6'>Update Blog </h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <TextInput
                    label="Blog Name"
                    name="name"
                    placeholder="Ex: The World's Best Fashion Fair"
                    value={blog.name}
                    onChange={handleChange}
                />
                <UploadImage
                    name="image"
                    id="image"
                    value={newImage || blog.image}
                    placeholder='Image'
                    setImage={handleImageChange}
                />
                <div>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
                    <textarea name="description" id="description"
                        className='add-product-InputCSS'
                        value={blog.description}
                        placeholder='Write a description'
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div>
                    <button type='submit'
                        className='add-product-btn'

                    >{isUpdating ? 'Updating...' : 'Update Blog'}</button>
                </div>

            </form>
        </div>
    )
}

export default UpdateBlog