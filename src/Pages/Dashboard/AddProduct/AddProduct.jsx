import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { AuthContex } from '../../../Contex/AuthProvider';
import SmallSpinner from '../../../Componemts/SmallSpinner';

const AddProduct = () => {
    const { loginUser } = useContext(AuthContex)
    const [categorys, setCategorys] = useState([]);
    const date = format(new Date(), 'Pp')
    const [productInfo, setProductIngo] = useState({
        sealerEmail: loginUser.email,
        sealerName: loginUser.displayName,
        date: date
    });
    const [image, setImage] = useState(null);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        axios.get('https://modern-laptop-server.vercel.app/categories')
            .then(result => setCategorys(result.data))
    }, [])


    const submitHandle = async (e) => {
        const selectCategory = e.target.categoryId.value;
        const formData = new FormData();
        formData.append('image', image.image)
        setSending(true)

        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_uploadKey}`, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(photo => {
                const image = photo?.data?.display_url
                const allProductData = { selectCategory, productInfo, image }
                addProductInDB(allProductData)
                e.target.reset();
            })
        e.preventDefault()
    }

    const addProductInDB = async (productInfo) => {
        const response = await axios
            .post('https://modern-laptop-server.vercel.app/addProduct', productInfo)
            .catch((error) => console.log('Error: ', error));
        if (response && response.data.insertedId) {
            toast.success('product added successful')
            setSending(false)
        }
    }

    const formDataHandle = (e) => {
        setProductIngo({ ...productInfo, [e.target.name]: e.target.value })
    }

    const imageHandle = (e) => {
        setImage({ ...image, [e.target.name]: e.target.files[0] });
    }

    return (
        <div className='w-11/12 mx-auto '>
            <h1 className='text-2xl md:text-3xl lg:text-4xl text-center py-10 font-semibold'>Add your product that you want to sell </h1>
            <div className="card w-full shadow-2xl bg-base-100 mb-20">
                <form onSubmit={submitHandle} className="card-body">
                    <div className='flex flex-col lg:flex-row gap-x-10'>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select name="categoryId" className="select select-bordered w-full">
                                {
                                    categorys?.map((category) => <option key={category._id}
                                        value={category.categoryId}

                                    >{category.heading}</option>)
                                }
                            </select>
                            {
                                categorys.length === 0 && <SmallSpinner />
                            }
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Product Name With Model</span>
                            </label>
                            <input onChange={formDataHandle} name='productName' type="text" placeholder="Example : MacBook pro" className="input input-bordered" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">image</span>
                            </label>
                            <input onChange={imageHandle} name='image' type="file" className="file-input file-input-bordered file-input-dark w-full s" required />
                        </div>
                    </div>
                    <div className='flex flex-col lg:flex-row gap-x-10'>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Original Price</span>
                            </label>
                            <input onChange={formDataHandle} name='originalPrice' type="number" placeholder="original price" className="input input-bordered" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Resell Price</span>
                            </label>
                            <input onChange={formDataHandle} name='resellPrice' type="number" placeholder="resell price" className="input input-bordered" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Used (If less than 1 year write "month") </span>
                            </label>
                            <input onChange={formDataHandle} name='useTime' type="text" placeholder="Example : 2 month" className="input input-bordered" required />
                        </div>
                    </div>
                    <div className='flex flex-col lg:flex-row gap-x-10'>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Condition</span>
                            </label>
                            <select onChange={formDataHandle} name="condition" id="" className="input input-bordered" required>
                                <option defaultValue="excellent">Excellent</option>
                                <option value="good">Good</option>
                                <option value="fair">Fair</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input onChange={formDataHandle} name='location' type="text" placeholder="location" className="input input-bordered" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input onChange={formDataHandle} name='phoneNumber' type="number" placeholder="phone number" className="input input-bordered" required />
                        </div>

                    </div>
                    <div className=''>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Details</span>
                            </label>
                            <textarea onChange={formDataHandle} name='details' type="text" placeholder="Details Information" className="input input-bordered resize-none h-[100px]" required />
                        </div>
                    </div>

                    <div className="form-control mt-2 w-full md:w-2/5  mx-auto">
                        {
                            sending ? <button className="btn btn-primary" disabled><SmallSpinner /> </button> :
                                <button className="btn btn-primary">Add Product</button>
                        }
                    </div>
                </form>
            </div >
        </div >
    );
};

export default AddProduct;