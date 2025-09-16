import { useState } from 'react';

function App() {
  const [visible, setVisibility] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  // const toggleMode = () => {
  //   setIsDark(prev => !prev)
  //   console.log("Mode is now:", !isDark ? 'Dark' : 'Light');
  // }

  const appStyle = {
    backgroundColor: isDark ? '#222' : '#f5f5f5',
    color: isDark ? '#fff' : '#000',
    height: '50vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }

  const togMove = {
    toggleMove: {
      marginTop: '30px',
      marginBottom: '30px',
      padding: '10px',
      textAlign: 'center',
      alignItems: 'center',
      marginLeft: '30px',
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
      height: '500px',
      backgroundColor: isToggled ? '#000' : '#fff',
      color: isToggled ? '#fff' : '#000',
      transition: 'background .5s ease, color .5s ease',
    },
    toggleContainer: {
      width: '80px',
      height: '36px',
      backgroundColor: isToggled ? '#45ffbbff' : '#000',
      // border: '1px solid black',
      borderRadius: '35px',
      margin: '0 auto',
      position: 'absolute',
      bottom: '-50px',
      transition: 'background 1s ease',
    },
    togKnob: {
      width: '30px',
      height: '30px',
      position: 'relative',
      backgroundColor: '#fff',
      borderRadius: '50%',
      top: '3px',
      left: isToggled ? '47px' : '3px',
      transition: 'left 1s ease',
    },
    // secTogKnob: {
    //   left: '44px',
    // },
  }


  return (
    <>
    <div className="App">
      <button onClick={() => setVisibility(!visible)}>Toggle</button>
      {visible && <h1>Hello World!</h1>}
    </div>

    <div style={appStyle}>
      <h1>{isDark ? 'Dark Mode 🌙' : 'Light Mode ☀️'}</h1>
      <button onClick={() => setIsDark(prev => !prev)}>Toggle Mode</button>
    </div>

    <div style={togMove.toggleMove}>
      <h1>Toggle Theme</h1>
      <div style={togMove.toggleContainer} onClick={() => setIsToggled(prev => !prev)}>
        <div style={!isToggled ? togMove.togKnob : togMove.togKnob}></div>
      </div>
    </div>
    </>
  );

}

export default App;