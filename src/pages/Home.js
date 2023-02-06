import React from 'react';
import useAuth from '../hooks/useAuth';
import Login from './Login';
import Menu from './Menu';

const Home = () => {

    const { user } = useAuth();
    console.log(user)

    return (
        <>
            {/* <Menu /> */}
            {
                user?.phone ? <Menu /> : <Login />
            }
        </>
    );
};

export default Home;