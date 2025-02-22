import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TextInput from '../addProduct/TextInput';
import UploadImage from '../addProduct/UploadImage';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from "notistack";
import { useAddBlogMutation } from '../../../../redux/features/blogs/blogsApi';


const AddBlog = () => {
    const { user } = useSelector((state) => state.auth);

    const [blog, setBlog] = useState({
        name: '',
        description: ''
    });
    const [image, setImage] = useState('');

    const [AddBlog, { isLoading, error }] = useAddBlogMutation()


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog({
            ...blog,
            [name]: value
        });


    };

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!blog.name || !blog.description ) {
            enqueueSnackbar("Please fill all the required fields", {
                variant: "error",
            });
            return;
        }

        try {
            await AddBlog({ ...blog, image, author: user?._id }).unwrap();
            enqueueSnackbar("Blog added successfully", {
                variant: "success",
            });
            setBlog({
                name: '',
                description: ''
            })
            setImage('');
            navigate("/blogs")
        } catch (error) {
            console.log("Failed to submit blog", error);
            enqueueSnackbar("Failed to submit blog", {
                variant: "error",
            });
        }
    }

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">Add New Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextInput
                    label="Blog Name"
                    name="name"
                    placeholder="Ex: Diamond Earrings"
                    value={blog.name}
                    onChange={handleChange}
                />
                <UploadImage
                    name="image"
                    id="image"
                    value={e => setImage(e.target.value)}
                    placeholder='Image'
                    setImage={setImage}
                />
                <div>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
                    <textarea name="description" id="description"
                        className='add-product-InputCSS'
                        value={blog.description}
                        placeholder='Write a blog description'
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div>
                    <button type='submit'
                        className='add-product-btn'

                    >Add Blog</button>
                </div>

            </form>


        </div>
    );
};

export default AddBlog;