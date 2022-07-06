import List from "../List/List";
const OverflowContainer = (props)=>{
    const block = "overflow-container";
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

export default OverflowContainer;