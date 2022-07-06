import { useState } from "react";

export default function SearchBar (props) {
    const block = "searchbar";
    const [isFocused, setIsFocused] = useState(false);
    const {updateSearch} = props;
    const changeSearch = (e)=> {    
        updateSearch(e.currentTarget.value);
    }   

    let onFocus = isFocused ? " onFocus" : " onBlur";
    let mainClass = block + onFocus;

    return (
        <div className={mainClass}>
            <input aria-label={"game name search"} className={`${block}__search`} 
                    onFocus={()=>{setIsFocused(true)}} 
                    onBlur={()=>{setIsFocused(false)}} 
                    onChange = {changeSearch} 
                    type="text" 
                    id="searchBar" 
                    placeholder="Search..."/>
            <button aria-label = {"Execute Search"}className={`${block}__icon`}>
                <i className={"fa fa-search"}></i>
            </button>
            
        </div>
    );
    
    
};
