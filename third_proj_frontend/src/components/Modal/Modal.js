import "./Modal.scss";

export default function Modal (props) {
    const block = "modal";
    const {closeModal,isClosed,children} = props;

    let isHiddenClass = isClosed ? `${block}__root--hidden` : "";

    return (
        <div className={`${block}__root ` + isHiddenClass}>
            {children}
        </div>
    );
    
    
};