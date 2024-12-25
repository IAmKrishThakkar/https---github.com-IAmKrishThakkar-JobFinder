import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: { ...query },
        headers: {
            'x-rapidapi-key': '4baa7118a8msh2dd19c00560276cp1d70cejsn5e1025f31780',
            'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        }
    };
    const fetchData= async()=>{
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
        }catch(error){
            setError(error);
            alert('There is an error')
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        fetchData();
    },[]);
    const refetch= ()=>{
        setIsLoading(true);
        fetchData();
    }
    return{data,isLoading,error,refetch}
};

export default useFetch;