import { v1 } from "uuid";
const List = (props)=>{
    const {children, className} = props;
    let childElements = [];
    //check for iterability
    if (typeof children[Symbol.iterator] === 'function') {
        childElements = [...children];
    }
    else {
        childElements.push(children);
    }
    return (
        <ul className={className}>
            {childElements.map((item)=>{
                   
                return (<li key={v1()}> {item} </li>);
            }                
            )}
        </ul>
    );
};

export default List;