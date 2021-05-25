import React, { useState } from 'react'
import { Button, Form, Header, Image, Modal } from 'semantic-ui-react'
import { url } from './url';

function EditProduct({product}) {
  const [open, setOpen] = React.useState(false)
  const [product1, setProduct] = useState(product)
  const bearer = "Bearer " + localStorage.getItem("jwttoken");

  function edit(e) {
    setProduct({...product1, [e.target.name]: e.target.value})
  }


  async function editProduct() {
    let response;
    response = await fetch(`${url}/save/product`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearer
        },
        body: JSON.stringify(product1)
    });

    if (response && response.status === 200) {
        const data = await response.json()
        console.log(data)
        setOpen(false)
        window.location.reload()
    }

    console.log(response)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="black">Edit</Button>}
    >
      <Modal.Header>Edit product {product1.name}</Modal.Header>
      <Modal.Content image>
        <Form style={{width:"100%"}}>
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder='Login' onChange={edit} value={product1.name} name="name"  />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <input placeholder='Login' onChange={edit} value={product1.description} name="description"  />
                    </Form.Field>
                    <Form.Field>
                        <label>Picture</label>
                        <input placeholder='Login' onChange={edit} value={product1.picture} name="picture"  />
                    </Form.Field>
                    <Form.Field>
                        <label>Price</label>
                        <input placeholder='price' onChange={edit} value={product1.price} name="price"  />
                    </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={editProduct}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default EditProduct