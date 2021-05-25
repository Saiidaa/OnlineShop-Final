import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Header } from 'semantic-ui-react'
import { url } from './url';


function HeaderSection() {
    const [isAuth, setIsAuth] = useState(false);
    const [profile, setProfile] = useState(null);

    useEffect(async () => {
        let response;
            const bearer = "Bearer " + localStorage.getItem("jwttoken");
            response = await fetch(`${url}/api/profile`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": bearer
                }
            });
        console.log(bearer)

        if (response && response.status === 200) {
            setIsAuth(true)
            const data = await response.json()
            console.log(data)
            setProfile(data)
        }
    }, [])

    function exit() {
        localStorage.removeItem("jwttoken");
        window.location.reload()
    }


    return (
        <Segment clearing>
        <Header as='h3' floated='left'>
            <Link to="/">
            <img src={"https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG42.png"} width="50px"/>
            Onlinemarket
            </Link>
        </Header>
        <Header as='h5' floated='right'>
          <nav>
              {
                  profile && profile !== null ? 
                  <nav>
                  <Link to="/user/orders" style={{color:"black", marginRight:25}}>My orders</Link>   
                  <Link to="/basket" style={{color:"black", marginRight:25}}>Baket</Link>
                  <Link to="/login" style={{marginRight:"25px", color:"black"}}>Hello!: {profile.login}</Link>
                  <Link to="/exit" onClick={exit} style={{color:"black"}}>Exit</Link>
                  </nav> :
                  <nav>
                  <Link to="/register" style={{color:"black"}}>Registration</Link>
                  <Link to="/login" style={{marginLeft:"25px", color:"black"}}>Login</Link>
                  </nav>
              }
          </nav>
        </Header>
      </Segment>
    )
}
export default HeaderSection;