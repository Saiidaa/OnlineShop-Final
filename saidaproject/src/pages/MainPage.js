import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Card, Segment } from 'semantic-ui-react'
import { url } from './url';
import './style.css'


function MainPage() {
    const [products, setProducts] = useState([])
    const bearer = "Bearer " + localStorage.getItem("jwttoken");
    useEffect(async () => {
        let response;
            response = await fetch(`${url}/products`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearer
                }
            });

        if (response && response.status === 200) {
            const finishresult = await response.json()
            console.log(finishresult)
            setProducts(finishresult)
        }
    }, [])


    return (
        <Segment>
            <h2>Products</h2>
            <Card.Group itemsPerRow={6}>
                {
                    products &&
                    products.map((p, i) => (
                        <Link to={`/product/${p.id}`} className='card-item' >
                            <Card raised key={i} image={p.picture}  />
                        </Link>
                    ))
                }

            </Card.Group>
        </Segment>
    )
}
export default MainPage;