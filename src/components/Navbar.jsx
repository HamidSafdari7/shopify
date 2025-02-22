import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CartModal from '../pages/shop/CartModal';
import avatarImg from "../assets/avatar.png"
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';
import { enqueueSnackbar } from "notistack";

const Navbar = () => {

    const products = useSelector((state) => state.cart.products);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handdleCartToggle = () => {
        setIsCartOpen(!isCartOpen);
    }

    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.auth);
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();

    // drop down
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const handleDropDownToggle = () => {
        setIsDropDownOpen(!isDropDownOpen);
    }

    const adminDropDownMenu = [
        { label: "Dashboard", path: "/dashboard/admin" },
        { label: "Manage Items", path: "/dashboard/manage-products" },
        { label: "All Orders", path: "/dashboard/manage-orders" },
        { label: "Add Product", path: "/dashboard/add-product" },
    ]

    const userDropDownMenu = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Profile", path: "/dashboard/profile" },
        { label: "Payments", path: "/dashboard/payments" },
        { label: "Orders", path: "/dashboard/orders" },
    ]

    const dropDownMenu = user?.role === "admin" ? [...adminDropDownMenu] : [...userDropDownMenu];

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            enqueueSnackbar("User logged out successfully", {
                variant: "success",
            });
            navigate("/")
        } catch (error) {
            enqueueSnackbar(error.data.message, {
                variant: "error",
            });
        }
    }

    return (
        <header className='fixed-nav-bar w-nav'>
            <nav className='max-w-screen-2xl mx-auto px-4 flex justify-between items-center'>
                <ul className='nav__links'>
                    <li className='link'>
                        <Link to="/">Home</Link>
                    </li>
                    <li className='link'>
                        <Link to="/shop">Shop</Link>
                    </li>
                    <li className='link'>
                        <Link to="/blogs">Blogs</Link>
                    </li>
                    <li className='link'>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>

                <div className='nav__logo'>
                    <Link to="/">HS7<span>.</span></Link>
                </div>

                <div className='nav__icons relative'>
                    <span>
                        <Link to="/search">
                            <i className="ri-search-line"></i>
                        </Link>
                    </span>
                    <span>
                        <button onClick={handdleCartToggle} className='hover:text-primary'>
                            <i className="ri-shopping-bag-line"></i>
                            <sup className='text-xs inline-block px-1.5 text-white rounded-full bg-primary text-center'>{products.length}</sup>
                        </button>
                    </span>
                    <span>
                        {
                            user && user ?
                                (
                                    <>
                                        <img
                                            onClick={handleDropDownToggle}
                                            className='size-6 rounded-full cursor-pointer'
                                            src={user?.profileImage || avatarImg}
                                            alt="profile image"
                                        />
                                        {
                                            isDropDownOpen && (
                                                <div className='absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                                                    <ul className='font-medium space-y-4 p-2'>
                                                        {dropDownMenu.map((menu, index) => (
                                                            <li key={index}>
                                                                <Link onClick={() => setIsDropDownOpen(false)} className='dropdown-items' to={menu.path}>
                                                                    {menu.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                        <li>
                                                            <Link onClick={handleLogout} className='dropdown-items'>Logout</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                                :
                                (
                                    <Link to="login">
                                        <i className="ri-user-line"></i>
                                    </Link>
                                )
                        }

                    </span>
                </div>
            </nav>

            {
                isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handdleCartToggle} />
            }
        </header>
    )
}

export default Navbar
