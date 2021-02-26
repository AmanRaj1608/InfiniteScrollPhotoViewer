import React from 'react';
import styled from 'styled-components';
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const images = ({url,key,likes}) =>
{
    return (
        <div>
            <Img src={url} key={key} alt="picture"/>
            <p>{likes}</p>
        </div>
    );
};
export default images;