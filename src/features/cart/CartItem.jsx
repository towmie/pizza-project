import { formatCurrency } from "../../utilities/helpers";
import DeleteItem from "./DeleteItem";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="sm:items-cente py-3 sm:flex sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-smal font-bold">{formatCurrency(totalPrice)}</p>

        <DeleteItem id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
