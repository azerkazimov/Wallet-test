import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AddEntryScreen from "./screens/AddEntryScreen";
import StatsScreen from "./screens/StatsScreen";
import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/add" element={<AddEntryScreen />} />
                <Route path="/stats" element={<StatsScreen />} />
            </Routes>
        </Router>
    );
}

export default App;