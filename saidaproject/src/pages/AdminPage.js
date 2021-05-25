import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Segment, Table } from 'semantic-ui-react'
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import { url } from './url';


function AdminPage() {

    const [isAuth, setIsAuth] = useState(false);
    const [profile, setProfile] = useState(null);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const bearer = "Bearer " + localStorage.getItem("jwttoken");

    useEffect(async () => {
        let response;
            response = await fetch(`${url}/api/profile`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearer
                }
            });

        if (response && response.status === 200) {
            setIsAuth(true)
            const data = await response.json()
            let isAdmin = false
            data.roles.forEach((role) => {
                if(role.id === 1) {
                    isAdmin = true
                }
                else {
                    isAdmin = false
                }
            })

            if(!isAdmin) {
                // window.location.replace("/")
            }
            console.log(data)
            setProfile(data)
        }
    }, [])

    useEffect(async () => {
        let response;
            response = await fetch(`${url}/baskets`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearer
                }
            });

        if (response && response.status === 200) {
            setIsAuth(true)
            const data = await response.json()
            console.log(data)
            setOrders(data)
        }
    }, [])

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

    async function deleteProduct(product) {
        let response;
            response = await fetch(`${url}/deleteproduct`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearer
                },
                body: JSON.stringify(product)
            });

        if (response && response.status === 200) {
            const finishresult = await response.json()
            console.log(finishresult)
            window.location.reload()
        }
    }
    



    console.log(orders)
    return (
        <Segment>
            <h2>Admin page</h2>
            <hr />
            <h4>Categories</h4>
            <Link to="/">Home</Link> <br/>
            <AddProduct />
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            №
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Name
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Description
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Picture
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">
                            Price
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">
                            Manage
                        </Table.HeaderCell>
                        
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        products && products.length > 0 &&
                        products.map((p, i) => (
                            <Table.Row>
                                <Table.Cell>{i + 1}</Table.Cell>
                                <Table.Cell>{p.name}</Table.Cell>
                                <Table.Cell>{p.description}</Table.Cell>
                                <Table.Cell>{p.name}</Table.Cell>
                                <Table.Cell>{p.price}</Table.Cell>
                                <Table.Cell textAlign="right">
                                    <EditProduct product={p} />
                                    <Button color="red" onClick={() => deleteProduct(p)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>

            <h2>Orders</h2>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            №
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            FULLNAME
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            CREDIT CARD
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            PRODUCT
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">
                            Price
                        </Table.HeaderCell>
                        
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        orders && orders.length > 0 &&
                        orders.map((p, i) => (
                            <Table.Row>
                                <Table.Cell>{i + 1}</Table.Cell>
                                <Table.Cell>{p.fullname}</Table.Cell>
                                <Table.Cell>{p.credit_card}</Table.Cell>
                                <Table.Cell>{p.product ? p.product.name :  ""}</Table.Cell>
                                <Table.Cell>{p.product ? p.product.price :  ""}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </Segment>
    )
}
export default AdminPage