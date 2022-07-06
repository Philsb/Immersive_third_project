
const CenteredBody = (props)=>{
    const block = "centered-body";
    const {children} = props;

    return (
        <div className={block}>
            {children}
        </div>
       
    );
};

export default CenteredBody;