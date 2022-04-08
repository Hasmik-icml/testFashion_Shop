
import Footer from "./Components/footer/Footer.jsx";
import "./App.css";
import Header from "./Components/header/Header";
import Home from "./Components/home/Home.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import Products from "./Components/products/products.jsx";
import { Route, BrowserRouter, Routes} from "react-router-dom";
import LoginPage from "./Components/Login/Loginbutton.jsx";
import { Parent } from "./Components/UseContext.jsx";

function App() {
  return (
    <BrowserRouter>
     <div className="App">
     <Header className="ui fixed inverted main menu"/>
     <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>  
          <Route path="/dashboard" element={<Dashboard/>}></Route>  
          <Route path="/login" element={<LoginPage/>}></Route>  
     </Routes>
    
     <Footer />
    </div>
    </BrowserRouter>
    // <div>
    //   <h1>Hello</h1>
    //   <Parent/>
    // </div>
  );
}

export default App;
