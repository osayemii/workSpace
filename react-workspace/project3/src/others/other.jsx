import { useEffect, useState } from "react"

function other() {

    //useState
    const [count, setCount] = useState(0)

    //useEffect
    const [num, setNum] = useState(0)
    useEffect(()=>{
        const intervalId = setInterval(() => {
            setNum(prev => prev + 1)
        }, 1000);

        return ()=> clearInterval(intervalId)
    })
    
    return (
        <div>
            <button onClick={()=> setCount(prev => prev + 1)}>+1</button>
            <h3>{count}</h3>
            <button onClick={()=> setCount(prev => prev - 1)}>-1</button>

        <hr />

            <h3>{num}</h3>
        </div>
    )
}
export default other