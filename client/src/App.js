import "./App.css";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditTodo from "./components/EditTodo";
import Footer from "./components/Footer";

function App(props) {
  return (
    <Router className="App">
      <Header />
      <Switch>
        <Route exact path="/edit" component={EditTodo}></Route>
        <Route exact path="/">
          <TodoForm />
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
