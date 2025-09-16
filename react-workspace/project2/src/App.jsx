import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function App() {
  function PaintDot() {
    const [pos, setPos] = useState({});
    const styles = {
      position: "absolute",
      top: `${pos.pageY}px`,
      left: `${pos.pageX}px`,
      height: "100px",
      aspectRatio: "1/1",
      borderRadius: "50%",
      background: "pink",
      transform: "translateX(-50%) translateY(-50%)",
    };
    const sty = {
      fontSize: "100px"
    }
    return (
      <>
        <nav>
          {/* <Link to="./empty.jsx">Hello</Link> */}
          <a href="./empty.jsx" style={sty}>Hello World</a>
        </nav>
      </>
    );
  }

  function Counter() {
    let [like, setLike] = useState(0);
    let [dislike, setDisLike] = useState(0);
    useEffect(() => {
      console.log("like is updated", dislike);
    }, [like]);
    return (
      <div>
        <button onClick={() => setLike(like + 1)}>👍 {like}</button>
        <button onClick={() => setDisLike(dislike + 1)}>👎 {dislike}</button>
      </div>
    );
  }

  function Timer() {
    const [time, setTime] = useState(0);
    useEffect(() => {
      console.log("useEffect runs");
      setInterval(() => {
        console.log("Timer called");
        setTime((prev) => prev + 1);
      }, 1000);
    }, []);
    return (
      <div>
        <h1>{time}</h1>
      </div>
    );
  }
  function App2() {
    const [show, setShow] = useState(false);
    return (
      <div className="App">
        <button onClick={() => setShow(true)}>Start</button>
        <button onClick={() => setShow(false)}>Stop</button>
        {show ? <Timer /> : null}
      </div>
    );
  }

  function UserDetail() {
    const { id } = useParams();
    console.log(id);
    // const user = users[id]; 
    const [user, setUser] = useState({});
    useEffect(() => {
      fetch(`https://640fc234864814e5b63f0d2f.mockapi.io/users/${id}`)
        .then((data) => data.json())
        .then((userInfo) => setUser(userInfo));
    }, []);
    return (
      <section className="user-detail-container">
        <img className="user-profile-pic" src={user.pic} alt={user.name} />
        <div>
          <h2 className="user-name">{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </section>
    );
  }


  return (
    <div className="App">
      <Timer />
      <Counter />
      <PaintDot />
      <App2 />
      <UserDetail />
    </div>
  );
}
// export default {Counter, PaintDot}

export default App