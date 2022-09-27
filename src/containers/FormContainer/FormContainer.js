import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FormContainerStyles from "./FormContainer.styled";
import routes from "./routes";

class FormContainer extends Component {
  state = {
    isOnLogin: true,
  };

  authenticationMethodHandler = () => {
    this.setState({ isOnLogin: !this.state.isOnLogin });
  };

  handleRoutes = (route) => {
    const { id, Component, ...rest } = route;

    switch (id.toString()) {
      case "1": {
        return (
          <Route
            key={id}
            {...rest}
            render={(props) => (
              <Component
                authenticationMethodHandler={this.authenticationMethodHandler}
                {...props}
              />
            )}
          />
        );
      }
      default: {
        return <Route key={id} {...rest} />;
      }
    }
  };

  render() {
    return (
      <FormContainerStyles>
        <BrowserRouter>
          <Switch>{routes.map((route) => this.handleRoutes(route))}</Switch>
        </BrowserRouter>
      </FormContainerStyles>
    );
  }
}

export default FormContainer;
