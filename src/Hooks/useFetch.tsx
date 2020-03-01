import { useEffect, useState } from 'react';

export const  useFetch = (category :string, amount:number) =>{

    const[state, setState] = useState({data: null , loading:true})
    
    const fetchData = async (category :string, amount:number)=>{
        const url = `https://rss.itunes.apple.com/api/v1/hk/ios-apps/${category}/all/${amount}/explicit.json`;
        const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
        const data = await res.json()
        setState({data: data.feed.results, loading:false})
    }

    useEffect(() => {
        setState(currentState => ({...currentState.data, loading:true}))
        fetchData(category, amount)
        
        return () => {
            
        };
    }, [setState, amount])
    
    return state;


}
