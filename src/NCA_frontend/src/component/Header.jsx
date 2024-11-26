import React, {useEffect, useState} from 'react';
import '../style/Header.css';
import { useNavigate } from "react-router-dom";
import logoImg from '../assets/header/logo-img.png';
import logoNCA from '../assets/header/logo-NCA.png';
import loginImg from '../assets/header/login.png';
import {useAuth} from '../AuthProvider';
import { Link } from "react-router-dom";
// import { AuthState } from "../context/AuthContext";

function Header(){
    const [result, setResult] = useState("");
    const {callFunction,login, logout} = useAuth();
    const handleClick = async() => {
        const id = await callFunction.idprincipal();
        setResult(id);
    }
    // const navigate = useNavigate();

    // const clickHandler = async () =>{
    //     await login();
    // };

    // useEffect(() => {
    //     if (authState === AuthState.Unregistered) {
    //         console.log("Unregistered");
    //         navigate("/complete-registration");
    //     }
    //     console.log(`stateChanged: ${authState}`);
    // }, [authState]);


    return(
        <>
            <div className="header-container">
                <Link to="/NCA" className="header-logo">
                    <img src={logoImg} alt="Logo Img" className='logo-img'/>
                    <img src={logoNCA} alt="Logo NCA" className='logo-NCA'/>
                </Link>
                <div className="header-navbar">
                    <p>
                        <Link to="/NCA">Home</Link>
                    </p>
                    <p>
                        <Link to="/NCA/contribute">Contribute</Link>
                    </p>
                    <p>
                        <Link to="/NCA/purchaseCC">Purchase CC</Link>
                    </p>
                </div>
                <div className="header-profile">
                    {/* {isAuth ? (
                        <button onClick = {clickHandler()}>Login</button>
                    ):( */}
                    {/* <button type = "button" onclick = {handleClick}
                    >Show Id?
                    </button> */}
                        <Link to="/NCA/login">
                            <button>Login</button>
                        </Link>
                    {/* )} */}
                </div>
            </div>
        </>
    );
}

export default Header;