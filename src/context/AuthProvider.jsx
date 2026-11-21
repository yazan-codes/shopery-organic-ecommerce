import {  useState } from "react";
import { AuthContext } from "./Context";
import { useNavigate } from "react-router";

function AuthProvider({ children }) {



  const [user, setUser] = useState(null);
  const [errorServer, setErrorServer] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);


  let [fieldErrors, setFieldErrors] = useState(false);
  let [errorUser, setErrorUser] = useState(false);
  let navigate = useNavigate()




async function login({email, password}) {
  setErrorUser(false);
  setErrorServer(false);
  setLoadingUser(true);
    try {
      let response = await fetch(
        `http://localhost:3000/users?email=${encodeURIComponent(email)}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      let data = await response.json();
    
      let userData = data.find((user) => user.password === password);
       if(userData){
        setErrorUser(false);
         setUser(userData);
         navigate("/");
         console.log("Login successful");
       }else{
        setErrorUser(true)
          console.log("Invalid email or password");
        }
    } catch (errorServer) {
      setErrorServer(true);
      console.log(errorServer);
    } finally {
      setLoadingUser(false);
    }
      
    }
    

    function handleLogout() {
      setUser(null);
      navigate("/");
    }
 
  
  


  return (
    <AuthContext
      value={{
        user,
        setUser,
        login,
        fieldErrors,
        setFieldErrors,
        errorUser,
        setErrorUser,
        loadingUser,
        errorServer,
        handleLogout,
        
      }}
    >
      {children}
    </AuthContext>
  );
}

export default AuthProvider;
