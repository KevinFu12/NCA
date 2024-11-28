import { useAuth } from "../use-auth-client";
import { Button} from "@chakra-ui/react";
import ChakraTemplate from "../templates/ChakraTemplate";
import { AuthProvider } from "../use-auth-client";

function LoggedOut() {
    const { login } = useAuth(); 
    console.log("In Logged Out");

  return (
    // <AuthProvider>
    // <ChakraTemplate>
      <div>
        <div>
          <center>
            <div>
              Hello Stranger!
            </div>
            <div>You are not authenticated</div>
          </center>
          <button onClick={login}>
                Log In
          </button>
            {/* size="md"
            variant="solid"
            onClick={login}
            color="white"
          >
            Log in
          </Button> */}
        </div>
      </div>
    // </ChakraTemplate>
    // </AuthProvider>
  );
}

export default LoggedOut;
