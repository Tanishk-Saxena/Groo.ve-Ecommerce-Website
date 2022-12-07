import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);

    useEffect(() => {
        setCartItems(JSON.parse(localStorage.getItem('lsCartItems')) || []);
        setTotalPrice(localStorage.getItem('lsTotalPrice') || 0);
        setTotalQuantities(localStorage.getItem('lsTotalQuantities') || 0);
    }, []);

    useEffect(() => {
        localStorage.setItem('lsCartItems', JSON.stringify(cartItems));
        localStorage.setItem('lsTotalPrice', totalPrice);
        localStorage.setItem('lsTotalQuantities', totalQuantities);
    }, [cartItems, totalPrice, totalQuantities]);
    

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item)=>(item._id===product._id));
        setTotalPrice((prevTotalPrice) => (prevTotalPrice + product.price*quantity));
        setTotalQuantities((prevTotalQuantities)=>(prevTotalQuantities + quantity));      
        if(checkProductInCart) {
            const updateCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity
                    }
                } else {
                    return cartProduct
                }
            })
            
            setCartItems(updateCartItems);
        } else {
            product.quantity = quantity;
            
            setCartItems([ ...cartItems, { ...product } ]);
        }
        toast.success(`${quantity} ${product.name} added successfully to the cart.`);
    }
    
    const onRemove = (product) => {
        foundProduct = cartItems.find((item)=>(item._id === product._id));
        const newCartItems = cartItems.filter((item)=>(item._id !== product._id));
        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice)=>(prevTotalPrice - foundProduct.price * foundProduct.quantity));
        setTotalQuantities((prevTotalQuantities)=>(prevTotalQuantities - foundProduct.quantity));
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item)=>(item._id === id));
        index = cartItems.findIndex((item)=>(item._id === id));

        if(value === 'inc'){
            const newCartItems = cartItems.map((item)=>{
                if(item._id === foundProduct._id) {
                    return { ...item, quantity: foundProduct.quantity + 1 };
                }
                return item;
            })
            setCartItems([ ...newCartItems ]);
            setTotalPrice((prevTotalPrice)=>(prevTotalPrice + foundProduct.price));
            setTotalQuantities((prevTotalQuantities)=>(prevTotalQuantities + 1));
        } else if (value === 'dec') {
            if(foundProduct.quantity > 1) {
                const newCartItems = cartItems.map((item)=>{
                    if(item._id === foundProduct._id) {
                        return { ...item, quantity: foundProduct.quantity - 1 };
                    }
                    return item;
                })
                setCartItems([ ...newCartItems ]);
                setTotalPrice((prevTotalPrice)=>(prevTotalPrice - foundProduct.price));
                setTotalQuantities((prevTotalQuantities)=>(prevTotalQuantities - 1));
            }
        }
    }

    return (
        <Context.Provider value={{showCart, cartItems, totalPrice, totalQuantities, onAdd, setShowCart, toggleCartItemQuantity, onRemove, setCartItems, setTotalPrice, setTotalQuantities}}>
            {children}
        </Context.Provider>
    )

}

export const useStateContext = () => (useContext(Context));