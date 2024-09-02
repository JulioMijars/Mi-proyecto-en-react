import { Link } from 'react-router-dom'
import { useContext } from "react";
import { CartContexts } from "../contexts/CartContexts";
import Cart from '../assets/carrito-de-compras.png'

export const CartWidget = () => {
    const { items } = useContext(CartContexts);

    const quantity = items.reduce((acc, item) => acc + item.quantity, 0)
    

    return (
    <Link to="/Cart">
    <img src={Cart} height={35} /> 
    <span style={{color:"white"}}>{quantity}</span>
    </Link>
    )
};