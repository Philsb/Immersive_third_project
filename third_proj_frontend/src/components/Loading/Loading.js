import React from 'react'

const Loading = () => {
    const block = 'loading'
    return (
        <div className={`${block}`}>
            <img className={`${block}__icon`} src="/Dual Ball-1s-200px.svg"/>
        </div>
    )
}

export default Loading;