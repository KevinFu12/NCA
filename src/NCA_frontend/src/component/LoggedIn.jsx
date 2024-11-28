import React, { useEffect, useState } from "react";
import { useAuth } from "../use-auth-client";
import { useNavigate } from "react-router-dom";
import ChakraTemplate from "../templates/ChakraTemplate";
import { Button } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"; // Using toaster
import { useQuery } from "@tanstack/react-query";
import Snackbar from "../Snackbar";
import { IoMdAlert } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { AuthProvider } from "../use-auth-client";
import {Navigate} from 'react-router-dom';

import Header from './Header.jsx'
import Input from './LogRegInput.jsx'
import Footer from './Footer.jsx'

import '../style/LogRegInput.css'

function LoggedIn() {
  document.title = "Login Page | NCA";
  console.log("In Logged In");
  // const auth = useAuth();

//   const [result, setResult] = useState("");
  const [first_name, setFname] = useState("");
  const [last_name, setLname] = useState("");
  const [dob, setDob] = useState("");
  // const [money, setMoney] = useState("-");
  const { user, principal, logout, getUser } = useAuth();
  const [email, setEmail] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
//   const [imageLoading, setImageLoading] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [password, setPassword] = useState();
//   const [button, setButton] = useState();
const [redirectToNCA, setRedirectToNCA] = useState(false);

  const { data, isLoading} = useQuery({
    queryKey: ["getUser", user],
    queryFn: getUser,
  });

  const handleRegister = () => {
    setIsUpdating(true);
  
    async function tryRegister() {
      // Validate user input
      // if (!validateUser()) {
      //   setIsUpdating(false);
      //   return;
      // }
  
      try {
        if (data.err) {
          // If user does not exist, register a new account
          const registerFlag = await user.register(
            principal,
            first_name,
            last_name,
            dob,
            email,
            password
          );
  
          if (registerFlag === true) {
            setIsUpdating(false);
            setAlreadyRegistered(true);
            return <Navigate to="/NCA" />;
          }
        } else {
          // If user exists, update account details
          const updateFlag = await user.updateUser(
            data.ok.internet_identity,
            first_name,
            last_name,
            dob,
            email,
            password
          );
  
          if (updateFlag === true) {
            setIsUpdating(false);
            setAlreadyRegistered(true);
            return <Navigate to="/NCA" />;
          }
        }
      } catch (error) {
        console.error("Error during registration/update:", error);
        setIsUpdating(false);
      }
    }
  
    tryRegister();
  };  

  const validateUser = () => {
    if (first_name === "" || last_name === "") {
      toaster.error("Fill in your name, human!", {
        duration: 5000,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="Field error"
            description="Fill in your name, human!"
          />
        ),
      });
      return false;
    }
    if (email === "") {
      toaster.error("Fill in your email!", {
        duration: 5000,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="Field error"
            description="Fill in your email!"
          />
        ),
      });
      return false;
    }
    if (dob === "") {
      toaster.error("Fill in your date of birth!", {
        duration: 5000,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="Field error"
            description="Fill in your date of birth!"
          />
        ),
      });
      return false;
    }

    // validate name length
    if (first_name.length < 5 || first_name.length > 25 || last_name.length < 5 || last_name.length > 25) {
      toaster.error("Name must be between 5-25 characters long!", {
        duration: 5000,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="Name error"
            description="Name must be between 5-25 characters long!"
          />
        ),
      });
      return false;
    }

    const nameRegex = /^[A-Za-z0-9]{5,}$/;

    if (!nameRegex.test(first_name) || !nameRegex.test(last_name)) {
      toaster.error("Name cannot contain symbols", {
        duration: 5000,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="Name error"
            description="Name cannot contain symbols"
          />
        ),
      });
      return false;
    }

    let inputtedDOB = new Date(dob);
    let today = new Date();

    let yearDiff = today.getFullYear() - inputtedDOB.getFullYear();
    let monthDiff = today.getMonth() - inputtedDOB.getMonth();
    let dateDiff = today.getDate() - inputtedDOB.getDate();

    if (yearDiff <= 0) {
      toaster.error("You have to be at least 13 years old!", {
        duration: 5000,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="DOB error"
            description="You have to be at least 13 years old!"
          />
        ),
      });
      return false;
    } else if (monthDiff <= 0 && !(monthDiff === 0 && dateDiff >= 0)) {
      yearDiff = yearDiff - 1;
    }

    if (yearDiff < 13) {
      toaster.error("Age must be older than 13!", {
        duration: 5000,
        position: "bottom-right",
        render: () => (
          <Snackbar
            bgColor="bg-red-600"
            icon={<IoMdAlert color="white" />}
            title="DOB error"
            description="Age must be older than 13!"
          />
        ),
      });
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (!isLoading) {
      console.log("Fetched user data:", data);
      if (data.ok) {
        setFname(data.ok.first_name);
        setLname(data.ok.last_name);
        setEmail(data.ok.email);
        setDob(data.ok.dob);
        setPassword(data.ok.password);
        // setMoney(data.ok.money.toString());
        setAlreadyRegistered(true);
        return <Navigate to="/NCA" />;
      } else {
        setAlreadyRegistered(false);
      }
    }
  }, [data, isLoading, alreadyRegistered]);

  if (isLoading) return <div>loading</div>;

  if (redirectToNCA) {
    return <Navigate to="/NCA" />;
  }

  return (
    // <AuthProvider>
    
    <>
      <div className="form-container">
        <form className='logReg-form-container'>
          <Input inputType={"title"} title={"LOGIN"} />
          <Input value={first_name} onChange={(e) => setFname(e.target.value)} inputType={"text"} title={"First Name"} description={"Please Input Your First Name"} imgName={"formName.png"} placeholder={"First Name"} />
          <Input value={last_name} onChange={(e) => setLname(e.target.value)} inputType={"text"} title={"Last Name"} description={"Please Input Your Last Name"} imgName={"formName.png"} placeholder={"Last Name"} />
          <Input value={dob} onChange={(e) => setDob(e.target.value)} inputType={"date"} title={"Birth Date"} description={"Provide Your Birth Date"} imgName={"formCalendar.png"} />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} inputType={"email"} title={"Email"} description={"Provide Your Personal Email"} imgName={"formEmail.png"} placeholder={"sigma@gmail.com"} />
          <Input value={password} onChange={(e) => setPassword(e.target.value)} inputType={"password"} title={"Password"} description={"Provide Your Password"} imgName={"formPassword.png"} placeholder={"password"} />
          {/* <Input inputType={"link"} title={"/NCA/login"} description={"Already Have an Account?"} /> */}
          <Input inputType={"checkbox"} description={"I Accept All The Terms and Requirements "} />
          {!isUpdating ? (
            <button onClick={handleRegister}>
              {alreadyRegistered ? "Update Data" : "Register"}
            </button>
          ) : (
            <>
              <button isLoading></button>
            </>
          )}
          <button onClick={() => {
            logout();
            // window.location.reload();
            setRedirectToNCA(true);
          }}>
            Log Out
          </button>
        </form>
      </div>
    </>
    
    // </AuthProvider>
  );
}

export default LoggedIn;
