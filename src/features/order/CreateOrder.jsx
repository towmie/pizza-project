// ißmport { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import store from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  const formErrors = useActionData();
  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: errorAddres,
  } = useSelector((state) => state.user);

  const isLoadingPosition = addressStatus === "loading";

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? let's go!</h2>

      <Form method="POST" action="">
        <div className="mb-5 flex flex-col gap-2 ">
          <label>First Name</label>
          <input
            defaultValue={userName}
            className="input"
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 ">
          <label>Phone number</label>
          <div>
            <input className="input" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && (
            <p className="ml-2 text-red-700">{formErrors.phone}</p>
          )}
        </div>

        <div className=" mb-5 flex flex-col gap-2">
          <label>Address</label>
          <div className="relative">
            <input
              disabled={isLoadingPosition}
              className="md-py-3 w-full rounded-full border border-stone-200 px-4 py-2 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6"
              defaultValue={address}
              type="text"
              name="address"
              required
            />
            {!position.latitude && !position.longitude && (
              <span className="absolute  right-[5px] top-[5px]">
                <Button
                  disabled={isLoadingPosition}
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get GeoPosition
                </Button>
              </span>
            )}
          </div>
          {addressStatus === "error" && (
            <p className="ml-2 text-red-700">{errorAddres}</p>
          )}
        </div>

        <div className="mb-5 flex gap-2 ">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : `Order now(${totalPrice})`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "wrong number";

  if (Object.keys(errors).length > 0) return errors;

  store.dispatch(clearCart());

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
