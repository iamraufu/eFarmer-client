import React from 'react';
import veg from '../images/veg.svg'

const PreviousList = () => {
    return (
        <section className='container'>
            <div className="d-flex justify-content-center align-items-center mt-5">
                <img src={veg} alt="previous list" />
                <h1 className='title mt-3 ms-2'>Previous List</h1>
            </div>
        </section>
    );
};

export default PreviousList;