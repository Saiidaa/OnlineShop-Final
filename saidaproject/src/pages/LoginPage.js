import React, { useState } from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { url } from './url';



function LoginPage() {
    const [user, setUser] = useState({login: "", password:""});

    async function login(e) {
        e.preventDefault();

        const response = await fetch(`${url}/auth`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(user)
          });
          
        if(response.status==200){
            alert("Login successfull");
            let jwt = await response.json();
            localStorage.setItem("jwttoken", jwt.jwtToken);
            window.location.replace("/");
        }else{
            alert("Wrong login or password");
        }
    }

    return (
        <Segment>
            <h2>Login</h2>
            <Form onSubmit={login}>
                <Form.Field>
                    <label>Login</label>
                    <input placeholder='Login' name="login" value={user.login} type="text" onChange={(e) => setUser({...user, login: e.target.value})}  />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' name="password" type="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} />
                </Form.Field>
                <Button type='submit'>Login</Button>
            </Form>
        </Segment>
    );
}
export default LoginPage