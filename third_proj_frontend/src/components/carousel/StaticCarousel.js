import { useState } from "react";
import { v1 } from "uuid";

import List from "../list/List";

const StaticCarousel = (props) => {
    const block = "static-carousel";
    const [currentElementIndex, setCurrentElementIndex] = useState(0);
    const {imgSrc} = props;

    const elements = imgSrc.map ((item,index)=>{
        const handleClick = ()=>{setCurrentElementIndex(index)}
        return <button aria-label={"Show Image " + index} key={v1()} onClick={handleClick}>
            {<img alt={"Game Image " + index} className={`${block}__thumb`} src={item}/>}
        </button>;
    });

    return (
        <div className={`${block}`}>
            <div className={`${block}__main-display`}>
                {<img alt={"Game Image"} className={`${block}__img`} src={imgSrc[currentElementIndex]}/>}
            </div>
            <List className={`${block}__list`}>
                {elements}
            </List>
        </div>

    );


}

export default StaticCarousel;