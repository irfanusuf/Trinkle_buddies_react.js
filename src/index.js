import ReactDOM from 'react-dom/client';
import "./styles/global.css"
import { BrowserRouter } from 'react-router-dom';
import Store from './context/Store';

const root = ReactDOM.createRoot(document.getElementById("root"))


root.render(
    // function based component
    <BrowserRouter>
        <Store/>
    </BrowserRouter>
)



