export default function Form (props) {
    const block = "form";
    const {onSubmit} = props;
    const childrenComponents = props.children;

    return (
        
        <form className={`${block}`} onSubmit={onSubmit}>
            {childrenComponents}
            <div className={`${block}__submit-container`}>
                <input  className={`${block}__submit-button`} type = "submit" name = "submit" value = "Submit" />
            </div>  
        </form>
        
    );
    
    
};
