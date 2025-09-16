import { useRef, useState, useEffect} from "react";

function Other() {
    //Storing mutable value in ref
    const [value, setValue] = useState(0)
    const ref = useRef(0)
    useEffect(()=>{
        ref.current = ref.current + 1;
    }, [value])
    
    //Accessing DOM elements
    const inputFid = useRef();
    const btnClicked = ()=> {
        console.log(inputFid.current);
        inputFid.current.style.background = "blue";
    }
    
    return (
        <div>
            <h1>Storing mutable value in ref</h1>
            <button onClick={()=> {setValue(prev => prev+1)}}>+1</button>
            <h1>{value}</h1>
            <button onClick={()=> {setValue(prev => prev-1)}}>-1</button>
            <h3>Times rendered: {ref.current}</h3>
            <br />
            <hr />
            <h1></h1>
            <h1>Accessing DOM elements</h1>
            <input type="text" ref={inputFid}/>
            <button onClick={btnClicked}>Click Me</button>
        </div>
    );
}
export default Other;