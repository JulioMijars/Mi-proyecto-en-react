
import { useContext, useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { CartContexts } from "../contexts/CartContexts";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
            <Button variant="dark" type="button" onClick={() => removeItem(item.id)}>
            Eliminar
            </Button>
            </div>
            );
        })}
        <Form>
      <Form.Group className="mb-3" controlId="formBasicNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control value={buyer.name} type="text" placeholder="Ingresa tu nombre" name="name" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Email</Form.Label>
        <Form.Control value={buyer.email} type="email" placeholder="Ingresa tu email" name="email" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Telefono</Form.Label>
        <Form.Control value={buyer.phone} type="text" placeholder="Ingresa tu telefono" name="phone" onChange={handleChange} />
      </Form.Group>
      <Button variant="dark" type="button" onClick={sendOrder}>
        Comprar
      </Button>
    </Form>
        <div>Total {total}</div>
        
        </Container>
    );
};

