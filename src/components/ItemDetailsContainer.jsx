import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import '../index.css';
import { CartContexts } from '../contexts/CartContexts';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { ItemCount } from './ItemCount';


export const ItemDetailsContainer = () => {
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams()
    const { addItem } = useContext(CartContexts)

    useEffect(() => {
        const db = getFirestore();
        const refDoc = doc(db, 'items', id)

        getDoc(refDoc).then((snapshot) => {
            setItem({ ...snapshot.data(), id: snapshot.id });
        })
        .finally(() => setLoading(false));
    }, [id]);

    const onAdd = (quantity) => addItem({ ...item, quantity })
    

    if(loading ) return "wait"
    
    return (
        <Container className='mt-4 justify-content-center'>
        <img src={item.image} />
        <h1>{item.name}</h1>
        <h2>{item.categoryId}</h2>
        <h3>{item.description}</h3>
        <h4>$: {item.price}</h4>
        <h5>stock: {item.stock}</h5>
        <ItemCount stock={item.stock} onAdd={onAdd} />
        </Container>
    )
};