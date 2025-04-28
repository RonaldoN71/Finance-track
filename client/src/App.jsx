import './App.css'
import { SignedIn, SignedOut, SignInButton,SignUpButton, UserButton } from "@clerk/clerk-react";
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Dashboard from'./components/Dashboard.jsx';
import Auth from './components/Auth.jsx';
import FinancialRecordsProvider from './components/contextProvider/Context';
function App() {
  return (
    
   <Router>
    <div className="app-container">
      <div className="navbar">
        <Link to="/dash">Dashboard</Link>
        <SignedIn>
        <UserButton showName/>
      </SignedIn>
      </div>
    <Routes>
      <Route path="/dash" element={
        <FinancialRecordsProvider>
        <Dashboard />
         </FinancialRecordsProvider>
        }/>        
      <Route path="/" element={<Auth/>} />
    </Routes>
    </div>
   </Router>
    
  )
}

export default App;
