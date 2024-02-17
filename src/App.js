import "./App.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import OrderBook from "./app/OrderBook";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <OrderBook />
      </div>
    </Provider>
  );
}

export default App;
