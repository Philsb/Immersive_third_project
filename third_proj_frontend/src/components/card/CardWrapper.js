import React from 'react'
import Divider from '../Divider/Divider';

const CardWrapper = (props) => {
  const block = "card-wrapper";
  const {children, title} = props;
    return (
    <div className={`${block}__root`}> 
      <div className={`${block}__title-container`} >
        <p>{title}</p>
      </div>
      <div className={`${block}__main-container`}>
        {children}
      </div>

    </div>
  )
}

export default CardWrapper;