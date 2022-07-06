export default function Form (props) {
    const block = "form";
    const {onSubmit} = props;
    const childrenComponents = props.children;

    return (
        
        <div>
            <form onSubmit={onSubmit}>
                {childrenComponents}
                <div className={`${block}__input`}>
                    <input type = "submit" name = "submit" value = "Submit" />
                </div>  
            </form>
        </div>
        
    );
    
    
};
