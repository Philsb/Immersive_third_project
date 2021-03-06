import { useEffect, useState } from "react";

const useFetch = ( url, method, headers, body, delay = 0) => {

    const [fetchData, setFetchData] = useState(null);

    useEffect(()=>{
        if (fetchData == null) {
            fetch (url, {
                method: method,
                headers: headers,
                body: body,
            })
            .then((res)=>{return res.json();})
            .then((res) => {
                setTimeout (()=>{
                    setFetchData(res)
                }, delay)
                ;
            });
        }

    },[fetchData])
    
    return [fetchData,setFetchData];
};

export default useFetch;