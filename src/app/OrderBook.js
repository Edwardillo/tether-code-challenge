import { useSelector } from "react-redux";
import PrecisionSelect from "./PrecisionSelect";
import WebSocketButton from "./WebSocketButton";

const OrderBook = () => {
  const orderBook = useSelector((state) => state.books.data);

  return (
    <div>
      <h2>Order Book</h2>
      <WebSocketButton />
      <PrecisionSelect />
      <table>
        <thead>
          <tr>
            <th className="column-count">Count</th>
            <th className="column-amount">Amount</th>
            <th className="column-total">Total</th>
            <th className="column-price">Price</th>
          </tr>
        </thead>
        <tbody>
          {orderBook.map((order) => {
            const [price, count, amount] = order;
            return (
              <tr key={order.id}>
                <td>{count}</td>
                <td>{amount}</td>
                <td>{count * amount}</td>
                <td>{price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderBook;
