import { useReducer, useEffect, useLayoutEffect } from "react";

function other5() {
    //useReducer
    const initialState = { count: 0 }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'increase': {
                return { count: state.count + 1 }
            }
            case 'decrease': {
                return { count: state.count - 1 }
            }
            case 'input': {
                return { count: action.payload }
            }
            default : {
                return state;
            }
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    //useLayoutEffect
    useEffect(()=>{
        console.log('Message from useEffect')
    }, [])

    useLayoutEffect(()=>{
        console.log('Message from useLayoutEffect')
    }, [])

    return (
        <div>
            <h2>useReducer</h2>
            <h1>{state.count}</h1>
            <button onClick={() => dispatch({ type: 'increase' })}>Increase</button>
            <button onClick={() => dispatch({ type: 'decrease' })}>Decrease</button>
            <br />
            <input type="number" value={state.count}
            onChange={(e)=> dispatch({type: 'input', payload: Number(e.target.value)})}/>
            <hr />
            <h2>useLayoutEffect</h2>
            {Array(40000).fill('').map((item, index)=>
            <li key={index}>{Math.pow(Math.random(), 10)}</li>
            )}
        </div>
    )
}
export default other5;