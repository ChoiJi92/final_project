import { style } from '@mui/system';
import React from 'react';
import styled from 'styled-components';
import Address from '../components/Address';
import DaumPost from '../components/DaumPost';
import Google from '../components/Google';
import Kakao from '../components/Kakao';
import Search from '../components/Search';

import AddressModal from '../components/AddressModal'; //modal
import Map from '../components/Map';

const Login = () => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const openLoginModal = () => {
        setModalOpen(true);
      };
      const closeLoginModal = () => {
        setModalOpen(false);
      };
    return (
        <>
        


        {/* <button onClick={openLoginModal}>주소 오픈</button>
        <AddressModal open={modalOpen} close={closeLoginModal}></AddressModal> */}
        {/* <Address></Address> */}
        {/* <Map></Map> */}
        </>
    );
};

export default Login;