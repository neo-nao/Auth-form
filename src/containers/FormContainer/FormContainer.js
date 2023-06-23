import { BrowserRouter, Route, Switch } from "react-router-dom";
import FormContainerStyles from "./FormContainer.styled";
import routes from "./routes";

function FormContainer() {
  const handleRoutes = (route) => {
    const { id, Component, ...rest } = route;

    switch (id.toString()) {
      case "1": {
        return (
          <Route
            key={id}
            {...rest}
            render={(props) => <Component {...props} />}
          />
        );
      }
      default: {
        return <Route key={id} {...rest} />;
      }
    }
  };

  return (
    <FormContainerStyles>
      <BrowserRouter>
        <Switch>{routes.map((route) => handleRoutes(route))}</Switch>
      </BrowserRouter>
    </FormContainerStyles>
  );
}

export default FormContainer;
