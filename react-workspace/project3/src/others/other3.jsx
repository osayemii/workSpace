import { useState, useMemo, useCallback } from "react";
import Header from "../component/header";

function Other() {
    const [number, setNumber] = useState(0);
    const [counter, setCounter] = useState(0);
    const [count, setCount] = useState(0);
    //useMemo
    function cubeNum(num) {
        console.log('Calculation done');
        return Math.pow(num, 3)
    }
    const result = useMemo(()=>{
        return cubeNum(number);
    }, [number]);

    //useCallback
    const newFn = useCallback(()=>{}, []);
    
    return (
        <>
            <h1>useMemo</h1>
            <input type="number" value={number} onChange={(e)=>{setNumber(e.target.value)}}/>
            <h1>Cube of the number: {result}</h1>
            <button onClick={()=> {setCounter(counter+1)}}>Counter++</button>
            <h1>Counter: {counter}</h1>
            <hr />

            <h1>useCallback</h1>
            <Header newFn={newFn}/>
            <h1>{count}</h1>
            <button onClick={()=> {setCount(prev => prev +1)}}>Click here</button>
        </>
    );
}
export default Other;