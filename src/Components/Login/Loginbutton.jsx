import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { authoriseUser } from "../../Services/api";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
}

function LoginPage() {
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function authorisation() {
      try {
        const token = await getAccessTokenSilently();
        const authorised = await authoriseUser(user, token);
        console.log("authorised", authorised);
      } catch (error) {
        console.log("someting went  wrong", error);
      }
    }
    // if (user) authorisation();
  }, [user]);
  
  return (
    <div style={{ paddingTop: "100px" }}>
      {!user ? <LoginButton /> : <div>You are succsefuly logged in</div>}
    </div>
  );
}
export default LoginPage;
