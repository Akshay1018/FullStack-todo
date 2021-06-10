import React from 'react';
import loadingImage from './loading.gif';

function Loading() {
    return (
        <div id="loading">
            <img src={loadingImage}
                alt='Loading'
                style={{
                    display: 'block',
                    width: '80px',
                    margin: 'auto'
                }} />
        </div>
    )
}

export default Loading;