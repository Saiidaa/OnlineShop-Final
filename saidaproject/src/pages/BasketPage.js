import React, { useEffect, useState } from 'react'
import { List, Segment, Image, Form, Button } from 'semantic-ui-react'
import { url } from './url';


function BasketPage() {
    const [purchase, setPurchase] = useState({
        credit_card: "",
        cvv: "",
        fullname: "",
        product: ''
    })
    const [products, setProducts] = useState(null)
    const [total, setTotal] = useState(null);
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
            const ids = localStorage.getItem("basket");
            if(ids) {
                const idsArr = ids.split(" ");
                let arr = [];
                let total = 0
    
                const finishresult = await response.json()
    
                idsArr.forEach((item) => {
                    let pitem = finishresult.find(product => item === product.id.toString());
                    if (pitem) {
                        arr.push(pitem)
                    }
                });
    
                arr.forEach(item => {
                    total += item.price;
                })
    
                console.log(total)
                setTotal(total)
                setProducts(arr)
            }
        }
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();

        let response;

        for(let item of products) {
            purchase.product = item;
            response = await fetch(`${url}/add/purchase`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearer
                },
                body: JSON.stringify(purchase)
            });
        }

        if (response && response.status === 200) {
            const data = await response.json()
            localStorage.removeItem("basket")
            window.location.reload()
            console.log(data)
        }

    }


    return (
        <Segment>
            {
                !products && <h2>You hadn't add product</h2> 
            }
            {
                products &&
                products.map((p, i) => (
                    <List.Item style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                        <Image avatar src={p.picture} />
                        <List.Content>
                            <List.Header as='span' style={{ paddingRight: 20 }}>{p.name}</List.Header>
                        </List.Content>
                    </List.Item>
                ))
            }

            {
                total && <h2>Total: {total} KZT</h2>
            }
            {
                products && products.length > 0 &&
                <Segment>
                    <h2>Purchase</h2>
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <Form.Field>
                            <label>Fullname</label>
                            <input required placeholder='fullname'
                                name="fullname" value={purchase.fullname}
                                onChange={(e) => setPurchase({ ...purchase, fullname: e.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <label>Credit card</label>
                            <input required placeholder='Credit card'
                                name="credit_card" value={purchase.credit_card}
                                onChange={(e) => setPurchase({ ...purchase, credit_card: e.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <label>CVV</label>
                            <input required placeholder='CVV'
                                name="cvv" value={purchase.cvv}
                                onChange={(e) => setPurchase({ ...purchase, cvv: e.target.value })} />
                        </Form.Field>
                        <Button color="green">Purchase</Button>
                    </Form>
                </Segment>
            }
        </Segment>
    )
}
export default BasketPage