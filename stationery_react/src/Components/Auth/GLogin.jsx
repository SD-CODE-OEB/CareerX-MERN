import React, { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { AppContext } from "../../context";
import Container from "../Container";
import { CgGoogle } from "react-icons/cg";

export default function GLogin() {
  const { setLogged, setUsers, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const FPATH = process.env.REACT_APP_PATH;
  const login = useGoogleLogin({
    onSuccess: (authToken) => setToken(authToken),
    onError: (error) => console.log("Login Failed:", error),
  });
  useEffect(() => {
    console.log("start");
    if (token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setUser((prev) => ({
            ...prev,
            name: res.data.name,
            email: res.data.email,
          }));
          setUsers((prev) => [
            ...prev,
            { name: res.data.name, email: res.data.email },
          ]);
          navigate(`${FPATH}`);
          setLogged(true);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);
  return (
    <Container className="d-flex justify-content-center align-items-center google-box">
      <p>
        <button
          onClick={login}
          type="button"
          className="btn google-btn fw-bold fs-2"
        >
          <CgGoogle className="fs-2" /> Login with Google
        </button>
      </p>
    </Container>
  );
}
