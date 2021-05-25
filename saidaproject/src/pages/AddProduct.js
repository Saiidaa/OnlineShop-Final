import React, { useState } from 'react'
import { Button, Form, Header, Image, Modal } from 'semantic-ui-react'
import { url } from './url';

function AddProduct() {
  const [open, setOpen] = React.useState(false)
  const bearer = "Bearer " + localStorage.getItem("jwttoken");
  const [product, setProduct] = useState({
      id: null,
      name: "",
      description: "",
      picture: "",
      price: "",
  })

  function edit(e) {
    setProduct({...product, [e.target.name]: e.target.value})
  }

  async function addProduct() {
    let response;
    response = await fetch(`${url}/add/product`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearer
        },
        body: JSON.stringify(product)
    });

    if (response && response.status === 200) {
        const data = await response.json()
        console.log(data)
        setOpen(false)
        window.location.reload()
    }
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="black">Add product</Button>}
    >
      <Modal.Header>Edit product {product.name}</Modal.Header>
      <Modal.Content image>
        <Form style={{width:"100%"}}>
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder='name' onChange={edit} name="name" value={product.name}  />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <input placeholder='description' onChange={edit} name="description" value={product.description} />
                    </Form.Field>
                    <Form.Field>
                        <label>Picture</label>
                        <input placeholder='picture' onChange={edit} name="picture" value={product.picture} />
                    </Form.Field>
                    <Form.Field>
                        <label>Price</label>
                        <input placeholder='price' onChange={edit} type='number' name="price" value={product.price} />
                    </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, add"
          labelPosition='right'
          icon='checkmark'
          onClick={addProduct}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default AddProduct