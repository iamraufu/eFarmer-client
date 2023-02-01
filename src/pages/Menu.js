import React from 'react';
import take_picture from '../images/take_picture.svg'
import previous_list from '../images/previous_list.svg'
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <section className='container'>
            <h1 className='title mt-5 text-center'>Menu</h1>

            <Link to='/take-photo' className='text-decoration-none'>
                <div className="take-photo mx-auto d-block mt-5 d-flex justify-content-center align-items-center">
                    <div className="col-4">
                        <img className='img-fluid mx-auto d-block' src={take_picture} alt="upload by clicking" />
                    </div>
                    <div className="col-8">
                        <h2 className='menu-text'>Upload photo by clicking picture</h2>
                        <button className='btn-menu'>Take Photo</button>
                    </div>
                </div>
            </Link>

            <Link to='/previous-list' className='text-decoration-none'>
                <div className="previous-list mx-auto d-block mt-5 d-flex justify-content-center align-items-center">
                    <div className="col-4">
                        <img className='img-fluid mx-auto d-block' src={previous_list} alt="previous list" />
                    </div>
                    <div className="col-8">
                        <h2 className='menu-text'>Click here to check previous list</h2>
                        <button className='btn-menu'>Previous List</button>
                    </div>
                </div>
            </Link>
        </section>
    );
};

export default Menu;