const MainBody = (props)=>{
    const block = "main-body";
    const {children} = props;

    return (
        <main className={block}>
            {children}
        </main>
       
    );
};

export default MainBody;