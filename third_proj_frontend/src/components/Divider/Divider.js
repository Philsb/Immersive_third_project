import PropTypes from 'prop-types';
const Divider = (props) => {
    const block = "divider";
    const {isVertical} = props;
    const vert = isVertical ? ` ${block}__root--vert` : ` ${block}__root--hor`;

    return <div className={`${block}__root` + vert}/>
};


Divider.propTypes = {
    isVertical: PropTypes.bool    
};

export default Divider;