import Footer from "./component/Footer";
import Profile from "./component/Profile";
import Other from "./others/other";
import Other2 from "./others/other2";
import Other3 from "./others/other3";
import Other4 from "./others/other4";
import Other5 from "./others/other5";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div style={{textAlign: "center"}}>
      <Link to="/others/other">useState & useEffect</Link>&nbsp;&nbsp;&nbsp;
      <Link to="/others/other2">useRef</Link>&nbsp;&nbsp;&nbsp;
      <Link to="/others/other3">useMemo & useCallback</Link>&nbsp;&nbsp;&nbsp;
      <Link to="/others/other4">useContext</Link>&nbsp;&nbsp;&nbsp;
      <Link to="/others/other5">useReducer & useLayoutEffect</Link>

      {/* <Profile />
      <Footer /> */}

      <Routes>
        <Route path="/others/other" element={<Other />} />
        <Route path="others/other2" element={<Other2 />} />
        <Route path="others/other3" element={<Other3 />} />
        <Route path="others/other4" element={<Other4 />} />
        <Route path="others/other5" element={<Other5 />} />
      </Routes>
    </div>
  );
}

export default App;