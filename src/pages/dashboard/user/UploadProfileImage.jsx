import React, { useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../../../utils/baseURL';
import { enqueueSnackbar } from "notistack";

const UploadProfileImage = ({ name, setImage }) => {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");

    // request to upload a file
    const uploadSingleImage = (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("image", file); // Append the file to the FormData object

        axios
            .post(`${getBaseUrl()}/uploadImage`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type
                },
            })
            .then((res) => {
                const imageUrl = res.data.filePath; // Adjust based on your server response
                setUrl(imageUrl);
                enqueueSnackbar("Image uploaded successfully", {
                    variant: "success",
                });
                setImage(imageUrl);
            })
            .then(() => setLoading(false))
            .catch((error) => {
                console.error(error);
                enqueueSnackbar("Error uploading image", {
                    variant: "error",
                });
                setLoading(false);
            });
    };

    const uploadImage = async (event) => {
        const files = event.target.files;

        if (files.length === 1) {
            uploadSingleImage(files[0]); // Pass the file directly
            return;
        }

        // Handle multiple files if needed
        const base64s = [];
        for (let i = 0; i < files.length; i++) {
            base64s.push(files[i]);
        }
    }

    return (
        <div>
            <label htmlFor="profileImage" className='block text-sm font-medium text-gray-700 '>Profile Image Url</label>

            <input type="file" id={name} name={name}
                onChange={uploadImage}
                className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm'
                required
            />
            {
                loading && (
                    <div className='mt-2 text-sm text-blue-600'>Image uploading...</div>
                )
            }
            {
                url && (
                    <div className='mt-2 text-sm text-green-600'>
                        <p>Image uploaded successfully!</p>

                    </div>
                )
            }
        </div>
    )
}

export default UploadProfileImage;