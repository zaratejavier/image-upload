import React from "react";
import axios from "axios";

const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends React.Component {
  state = { user: null };

  handleRegister = (user, history) => {
    //user has name
    axios
      .post("/api/auth", user)
      .then((res) => {
        this.setState({ user: res.data.data });
        history.push("/");
      })
      .catch((res) => {
        console.log(res);
      });
  };

  handleLogin = (user, history) => {
    axios
      .post("/api/auth/sign_in", user) //the user has email, password, passwordConfirmation, name from register component
      .then((res) => {
        this.setState({ user: res.data.data });
        history.push("/");
      })
      .catch((res) => {
        console.log(res);
      });
  };

  handleLogout = (history) => {
    axios
      .delete("/api/auth/sign_out")
      .then((res) => {
        this.setState({ user: null });
        history.push("/login");
      })
      .catch((res) => {
        console.log(res);
      });
  };

  updateUser = (id, userObj) => {
    let data = new FormData();
    data.append("file", userObj.file);
    console.log("file", userObj.file);
    axios
      .put(`/api/users/${id}?email=${userObj.email}&name=${userObj.name}`, data)
      .then((res) => {
        console.log("res", res);
        this.setState({ user: res.data });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          authenticated: this.state.user !== null,
          handleRegister: this.handleRegister,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          setUser: (user) => this.setState({ user }),
          updateUser: this.updateUser,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}