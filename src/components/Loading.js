import React from 'react';
import loadingImage from './loading.gif';

function Loading() {
    return (
        <>
            <img src={loadingImage}
                alt='Loading'
                style={{
                    display: 'block',
                    width: '80px',
                    margin: 'auto'
                }} />
        </>
    )
}

export default Loading;