import React from 'react';
import logo from "../../../assets/logo.png"

const Footer = () => {
    return (
        <div className=' bg-base-300'>
            <footer className="footer p-10 text-base-content w-11/12 mx-auto">
                <div>
                    <img src={logo} className='w-20' alt="" />
                </div>
                <div>
                    <span className="footer-title">Services</span>
                    <a href='/' className="link link-hover">Branding</a>
                    <a href='/' className="link link-hover">Design</a>
                    <a href='/' className="link link-hover">Marketing</a>
                    <a href='/' className="link link-hover">Advertisement</a>
                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <a href='/' className="link link-hover">About us</a>
                    <a href='/' className="link link-hover">Contact</a>
                    <a href='/' className="link link-hover">Jobs</a>
                    <a href='/' className="link link-hover">Press kit</a>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <a href='/' className="link link-hover">Terms of use</a>
                    <a href='/' className="link link-hover">Privacy policy</a>
                    <a href='/' className="link link-hover">Cookie policy</a>
                </div>

            </footer>
            <hr className='border border-gray-400 ' />
            <div>
                <h4 className='text-center py-10'>Copyright © {new Date().getFullYear()} - All right reserved by MODERN LAPTOP</h4>
            </div>
        </div>

    );
};

export default Footer;