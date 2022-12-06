import { useBasket } from "../components/basket";
import { Link } from "@remix-run/react";
import { ItemSortField } from "~/crystallize/types.generated";
import { Key, ReactChild, ReactFragment, ReactPortal, Key, ReactChild, ReactFragment, ReactPortal, useEffect } from "react";
import { client, createAnonymousSession } from "../utils/web-init";
import { Databases } from "appwrite";

export default function Cart() {

  useEffect(() => {
    createAnonymousSession();
  }, []); 

  let basket = useBasket();
  if (!basket.cart.length) {
    return (
      <div className="py-20">
        <h1 className="text-4xl font-bold text-text">The cart is empty.</h1>
      </div>
    );
  }

  const handleSubmit = (basket: { cart: { name: any; description: any; quantity: any; image: any; }; }) => {
    const databases = new Databases(client);

    client
      .setEndpoint("https://localhost/v1") // Your API Endpoint
      .setProject("6386be1b38722a42059a"); // Your project ID

    const promise = databases.createDocument(
      "6386bf6135991b2bfb18",
      "productsInfo",
      "6386bf6135991b2bfb18",
      "unique()",
      {
        productName: basket.cart.name,
        productDescription: basket.cart.description,
        productQuantity: basket.cart.quantity,
        productImage: basket.cart.image,
      }
    );
    promise.then(
      function (response) {
        console.log(response, basket); // Success
        alert("order has been successfully saved");
      },
      function (error) {
        console.log(error, basket); // Failure
      }
    );
  };

  return (
    <div className="py-20 text-text w-auth mx-auto">
      <h1 className="text-4xl font-bold  mb-10">
        Your shopping cart ({basket.cart.length})
      </h1>
      <div className="flex flex-col gap-5 bg-background1 p-20">
        {basket.cart.map((item: { name: boolean | ReactChild | ReactFragment | ReactPortal; quantity: {}; attributes: any[]; price: { gross: number; }; }, index: Key) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="font-semibold text-xl">
                {item.name} × {item.quantity}
              </p>
              <div className="flex gap-3">
                {item.attributes?.map((attr: { value: boolean | ReactChild | ReactFragment | ReactPortal; }, index: Key) => (
                  <div
                    className="even:after:content-['\00a0-'] even:before:content-['-\00a0']"
                    key={index}
                  >
                    {attr.value}
                  </div>
                ))}
              </div>
            </div>
            <p>${item.price.gross * item.quantity}</p>
          </div>
        ))}
        <div className="flex justify-between items-center border-t-2 border-text pt-4">
          <p className="font-semibold text-xl">Total</p>
          <p>${basket.total.gross}</p>
        </div>
        <button
          // to="/checkout"
          className="bg-text text-primary py-3 mt-10 rounded font-semibold text-center"
          onClick={handleSubmit}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
