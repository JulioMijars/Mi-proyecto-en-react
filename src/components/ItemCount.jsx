import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';


export const ItemCount = ({ stock, onAdd }) => {
    const [count, setCount] = useState(1);
    const handleIncrease = () => {
       if(count < stock) setCount((prev) => prev + 1);
    };
    const handleDecrease = () => {
      if(count > 1)  setCount((prev) => prev - 1);
    };
    const handleAdd = () => {
        onAdd(count)
        setCount(1)
    }

    return (
    <>
    <Container>
    <Button variant="dark" onClick={handleIncrease}>Agregar</Button>
    <br />
     <span>{count}</span>
     <br />
     <Button variant="dark" onClick={handleDecrease}>Eliminar</Button>
    </Container>
    <br />
    <Button variant="dark" onClick={handleAdd}>comprar</Button>
    </>
    )
};