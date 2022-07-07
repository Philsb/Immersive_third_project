import List from "../List/List";
const WrapContainer = (props)=>{
    const block = "wrap-container";
    const {children} = props;
    if (children == null || children == undefined) {
        return <></>;
    }

    return (

        <div className={block}>
            <List className={`${block}__list`}>
                {children}
            </List>
           
        </div>
       
    );
};

export default WrapContainer;