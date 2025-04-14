// This file will create a context provider for the cart

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
//This is an empty context object

export const useCart = () => useContext(CartContext);
// This is a custom hook to make our life easier.
//Instead of writing useContext(CartContext) everywhere, 
//we can just call useCart() to access the cart.



//We’re creating a component that will wrap around our entire app. 
//This component will provide the cart data and logic to all its children (your app).
export const CartProvider = ({children}) => {

    const [cartItems, setCartItems] = useState(()=>{
        let storedCart;
        try{
        const cartData = localStorage.getItem('cart');
        //It tries to read localStorage to see if the cart already has items saved from before
        return storedCart ? JSON.parse(storedCart): [];
        //If yes → loads them. If no → starts with an empty cart ([]).
        }catch (error) {
            console.error("Failed to parse cart from localStorage:", error);
            storedCart = [];
        }
    })

    //whenever we update the cart, the localstorage must update the cart info
    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cartItems));
    },[cartItems]);


    //the add to cart function
    const addToCart = (item) => {
        //finding whether the product exist already, if yes then increase the quantity
        const exist = cartItems.find((i)=> i._id === item._id); 
        //.find() looks through that array to check if the incoming item (based on _id) is already present.

        if(exist){
            setCartItems(
                cartItems.map((i)=>
                i._id === item._id ? {...i, quantity: i.quantity+1}: i)
                //If its _id matches the new item's _id, we:
                //Use spread syntax { ...i } to copy all its existing properties
                //Then overwrite quantity with i.quantity + 1
            )
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
            //...cartItems keeps all the existing items.
            //{ ...item, quantity: 1 }:
            //Copies all properties of the new item.
            //Adds a new quantity key set to 1.
          }
    }

    //function to remove item from the cart
    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((items)=> items._id !== id));
    }

    //function to update the quantity of the product
    const updateQuantity = (id, qty) => {
        setCartItems(
            cartItems.find((item) =>
            item._id === id?{...item, quantity:qty}: item)
        );
    };

    return (
        <CartContext.Provider 
        value = {{cartItems, addToCart, removeFromCart, updateQuantity}}>
            {children}
        </CartContext.Provider>
    );
}