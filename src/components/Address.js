import React, { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import styled from 'styled-components';



const Address = () => {
    const open = useDaumPostcodePopup();

    const handleComplete = (data) => {
      let fullAddress = data.address;
      let extraAddress = '';
  
      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
        }
        // fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
      }
      console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };
  
    const handleClick = () => {
      open({ onComplete: handleComplete });
    };
  
    return (
        <Btn type='button' onClick={handleClick}>
      Open
    </Btn>
    );
};
const Btn = styled.button`
    

`
export default Address;