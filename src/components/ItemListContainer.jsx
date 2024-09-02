import '../index.css';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getFirestore, getDocs, where, query, collection } from 'firebase/firestore';


export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const db = getFirestore();
    const refCollection = !id ? collection(db, 'items') 
    : query(collection(db, 'items'), where("categoryId", "==", id));

    getDocs(refCollection).then((snapshot) => {
      setItems(
        snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data()};
        })
      );
    })
    .finally(() => setLoading(false));
  }, [id]);

    if(loading) return "wait"
    return (
      <Container className='list-container'>{items.map(i => 
    <Card key={i.id} className='card-css'>
         <Card.Img className='card-img' variant="top"  src={i.image} />
        <Card.Body className='class-card'>
          <h1>{i.title}</h1>
          <p>{i.description }</p>
          <h3>{i.categoryId}</h3>
          <h4>$ {i.price}</h4>
          <Link to={`/items/${i.id}`}>
          <Button variant="dark">Ver</Button>
          </Link>
        </Card.Body>
      </Card>
    )}
      </Container>

    )
  };