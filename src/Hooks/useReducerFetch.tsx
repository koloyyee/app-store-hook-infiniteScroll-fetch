import  { useReducer, useEffect } from "react"




const reducer =(state, action )=>{
    switch(action.type){
        case 'LOAD_DATA':
            return{
                apps: {
                    ...state.apps,
                    results: action.results
                },
                isLoading: false

            }
        case "FAILED":
        default:
            return state;
    }

}



const useReducerFetch=(category:string, amount:number)=>{

    const [{apps, isLoading}, dispatch] = useReducer(reducer, {apps:{}, isLoading:true} )
    
    const fetchApps= async(category:string, amount: number) =>{
        const url = `https://rss.itunes.apple.com/api/v1/hk/ios-apps/${category}/all/${amount}/explicit.json`;
        const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
        const data = await res.json()
        const results = data.feed.results 
        if(results){
            dispatch({type:"LOAD_DATA", results })
        }else{
            dispatch({type:"FAILED"})
        }

    }

    useEffect(()=>{
        if (amount < 101){
            fetchApps(category, amount)
            console.log('fetched ' + amount +' keep going!')
        } else {
            console.log( amount + " items fetched! Stop!")
        }

        return ;
    }, [category, amount ])
    
    return({apps, isLoading})
}

export default useReducerFetch