import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CartContext } from "../../context/cart";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
const CartComponent = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  const emptyCart = cartItems.length === 0;

  const notifyAddedToCart = (item) =>
    toast.success(`${item.rentalItem} added to cart!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#fff",
        color: "#000",
      },
    });

  const notifyCartFull = (item) =>
    toast.error(
      `You've reached the maximum available stock for this ${item.rentalItem}`,
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          backgroundColor: "#fff",
          color: "#000",
        },
      },
    );

  const notifyRemovedFromCart = (item) =>
    toast.error(`${item.rentalItem} removed from cart!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#000",
        color: "#fff",
      },
    });

  const notifyCartCleared = () =>
    toast.error(`Cart cleared!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        backgroundColor: "#000",
        color: "#fff",
      },
    });

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
    notifyRemovedFromCart(item);
  };
  let cartTotalPrice = getCartTotal();

  const handleAddToCart = (item) => {
    if (item.quantity < item.stock) {
      addToCart(item);
      notifyAddedToCart(item);
    } else {
      notifyCartFull(item);
    }
  };

  return (
    <div className="flex-col flex items-center justify-center my-10">
      <ToastContainer />
      {emptyCart ? <></> : <h1 className="text-2xl font-bold mb-5">Cart</h1>}
      <div className="flex flex-col gap-4">
        {cartItems.map((item, index) => {
          const image = getImage(item.images[0]?.gatsbyImage);
          return (
            <div key={item.rentalItem}>
              <div className="flex justify-between mb-5 mt-2">
                <div className="flex gap-4">
                  <GatsbyImage
                    image={image}
                    alt={item.rentalItem}
                    className="rounded-md w-24 h-24 md:w-32 md:h-32 object-cover"
                  />
                  <div className="flex flex-col md:justify-around lg:flex-row w-40 md:w-72 lg:w-[30rem] xl:w-[25rem]">
                    <div className="flex flex-col md:flex-row gap-1 md:gap-8 mb-1 mx-4">
                      <h1 className="text-lg font-bold truncate lg:whitespace-normal">
                        {item.rentalItem}
                      </h1>
                      <p className="text-gray-600 text-end flex items-center md:justify-end">
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex gap-4 justify-center items-center">
                      <button
                        className="px-4 py-2 bg-[#E4C05C] hover:bg-[#C6A855] text-white text-xs font-bold uppercase rounded hover:opacity-70 focus:outline-none focus:bg-gray-700"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(item);
                        }}
                      >
                        +
                      </button>
                      <p className="w-5 text-center">{item.quantity}</p>
                      <button
                        className="px-4 py-2 bg-[#E4C05C] hover:bg-[#C6A855] text-white text-xs font-bold uppercase rounded hover:opacity-70 focus:outline-none focus:bg-gray-700"
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.quantity === 1) {
                            handleRemoveFromCart(item);
                          } else {
                            removeFromCart(item);
                          }
                        }}
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-8 mx-4 text-gray-600 w-12">
                    ${item.price * item.quantity}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {cartItems.length > 0 ? (
        <div className="flex flex-col justify-between items-center mt-5">
          <section className="my-5 max-w-xs mx-auto">
            <section className="space-x-12 flex justify-between mx-auto">
              <div className="text-lg font-bold">Total Cost:</div>
              <div className="text-lg w-20">
                ${parseFloat(cartTotalPrice).toFixed(2)}
              </div>
            </section>
          </section>

          <button
            className="px-4 py-2 bg-[#E4C05C] hover:bg-[#C6A855] text-white text-xs font-bold uppercase rounded hover:opacity-70 focus:outline-none focus:bg-gray-700"
            onClick={(e) => {
              e.preventDefault();
              clearCart();
              notifyCartCleared();
            }}
          >
            Clear cart
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center max-w-sm">
          <h1 className="text-lg font-bold">Your cart is empty</h1>
          <p className="text-sm text-center my-3">
            Looks like you haven't found anything yet. We understand that
            sometimes it's hard to choose — maybe this helps:
          </p>
          <Link to="/event-rentals" className="font-medium text-lg">
            View Our Rentals
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
