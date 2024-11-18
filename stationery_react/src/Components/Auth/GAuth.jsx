import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GLogin from "./GLogin";

function GoogleAuth() {
  const clientId = process.env.REACT_APP_GOOGLE_AUTH_TOKEN;
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GLogin />
      </GoogleOAuthProvider>
    </>
  );
}

export default GoogleAuth;
