
import { useContext, useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { CartContexts } from "../contexts/CartContexts";
import { Container, NavLink } from "react-bootstrap";

const initialValues = {
    name: "",
    email: "",
    phone: "",
};
export const Cart = () => {
    const [buyer, setBuyer] = useState(initialValues);
    const { items, removeItem, reset } = useContext(CartContexts);
    const total = items.reduce((acc, act) => acc + act.price * act.quantity, 0 );
    
    const sendOrder = () => {
        const order = {
            buyer,
            items,
            total,      
        };
        const db = getFirestore();
        const orderCollection = collection(db, "orders");

        addDoc(orderCollection, order)
        .then(({ id }) => {
            if(id) {
                alert("Su orden " + id + " ha sido completada");
            }
        }).finally(() => {
            reset();
            setBuyer(initialValues);
        });
    };

    const handleChange = (ev) => {
        setBuyer(prev => {
            return {
                ...prev,
                [ev.target.name]: ev.target.value,
            };
        });
    };

    if(items.length === 0) return "ir a la home"
    return (
        <Container>
        {items.map(item => {
            return (
            <div key={item.id}>
            <h1>{item.title}</h1>
            <img src={item.image} alt={item.title}/>
            <p>{item.quantity}</p>
            <button onClick={() => removeItem(item.id)}>eliminar</button>
            </div>
            );
        })}
        <form>
            <div>
                <label>Nombre</label>
                <input type="text" placeholder="Ingresa tu nombre" name="name" onChange={handleChange} />
            </div>
            <div>
                <label>Email</label>
                <input type="email" placeholder="Ingresa tu email" name="email" onChange={handleChange} />
            </div>
            <div>
                <label>Telefono</label>
                <input type="text" placeholder="Ingresa tu telefono" name="phone" onChange={handleChange} />
            </div>
            <button type="button" onClick={sendOrder}>Comprar</button> <button onClick={reset}>vaciar</button>
        </form>
        <div>Total {total}</div>
        
        </Container>
    );
};

