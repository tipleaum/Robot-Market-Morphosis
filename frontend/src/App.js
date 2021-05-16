import * as React from 'react';
import { useEffect, useState } from 'react';
import Products from './component/Products/Products';
import Navbar from './component/Navbar/Navbar';
import Cart from './component/Cart/Cart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';

function App() {
  const [amount, setAmount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const url = "http://localhost:8000/api/robots";
  const [robots, setRobots] = useState([]);
  const [carts, setCarts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [found, setFound] = useState(false);
  const [material, setMaterial] = useState('')

  const getRobot = async () => {
    const response = await fetch(url);
    const robots = await response.json();
    setRobots(robots.data);
  };

  const filterRobots = (material) => {
    if (material) {
      const tempRobots = robots.filter((robot) => robot.material === material)
      setMaterial(material);
      setIsFilter(true)
      setFilterData(tempRobots);
      if (tempRobots.length) {
        setFound(true)
      } else {
        setFound(false);
      } 
    } else {
      setIsFilter(false)
      setFound(false);
    }
  }

  const TotalRobot = (carts) => {
    const { total, amount } = carts.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    setAmount(amount);
    setTotalCost(total);
  };

  const AddToCart = (name, image, price) => {
    const len = carts.length;
    const [filterCarts] = carts.filter((cart) => cart.name === name);

    if (len === 5) {
      if (filterCarts) {
        const tempCarts = carts.map((cart) => {
          if (cart.name === name) {
            cart.amount += 1;
          }
          return cart;
        });

        const tempRobots = robots.map((robot) => {
          if (robot.name === name) {
            if (robot.stock !== 0) {
              robot.stock -= 1;
            } else {
              robot.stock = 0;
            }
          }
          return robot;
        });
        setRobots(tempRobots);
        setCarts(tempCarts);
        TotalRobot(carts);
      } else {
        alert("You can add difference robots up to 5");
        return;
      }
    } else {
      if (filterCarts) {
        const tempCarts = carts.map((cart) => {
          if (cart.name === name) {
            cart.amount += 1;
          }
          return cart;
        });

        const tempRobots = robots.map((robot) => {
          if (robot.name === name) {
            if (robot.stock !== 0) {
              robot.stock -= 1;
            } else {
              robot.stock = 0;
            }
          }
          return robot;
        });
        setRobots(tempRobots);
        setCarts(tempCarts);
        TotalRobot(carts);
      } else {
        const tempCarts = [...carts];
        tempCarts.push({
          name: name,
          image: image,
          price: price,
          amount: 1,
        });

        const tempRobots = robots.map((robot) => {
          if (robot.name === name) {
            if (robot.stock !== 0) {
              robot.stock -= 1;
            } else {
              robot.stock = 0;
            }
          }
          return robot;
        });
        setRobots(tempRobots);
        setCarts(tempCarts);
        TotalRobot(carts);
      }
    }
  };

  const handleRemoveItem = (name, amount) => {
    const tempCarts = carts.filter((cart) => cart.name !== name)
    const tempRobots = robots.map((robot) => {
      if (robot.name === name) {
        robot.stock = robot.stock + amount;
      }
      return robot;
    })

    setCarts(tempCarts);
    setRobots(tempRobots);
    TotalRobot(carts);
  }

  const UpdateQuantity = (name, code) => {
    const [isStockNotEqual0] = robots.filter((robot) => robot.name === name && robot.stock !== 0);
    const [isAmountEqual1] = carts.filter((cart) => cart.name === name && cart.amount === 1)

    if (isStockNotEqual0) {
      if (code === 'INCREASE') {
        const tempCarts = carts.map((cart) => {
          if (cart.name === name) {
            cart.amount += 1;
          }
          return cart;
        })

        const tempRobots = robots.map((robot) => {
          if (robot.name === name) {
            if (robot.stock !== 0) {
              robot.stock -= 1;
            } else {
              robot.stock = 0;
            }
          }
          return robot;
        });
        setRobots(tempRobots);
        setCarts(tempCarts);
        TotalRobot(carts);
      } else if (code === 'DECREASE') {
        const tempCarts = carts.map((cart) => {
          if (cart.name === name) {
            if (cart.amount > 1) {
              cart.amount -= 1;
            }
          }
          return cart;
        })

        if (!isAmountEqual1) {
          const tempRobots = robots.map((robot) => {
            if (robot.name === name) {
              robot.stock += 1;
            }
            return robot;
          });
          setRobots(tempRobots);
        } 
        TotalRobot(carts);
        setCarts(tempCarts);
      }
    } else if (code === 'DECREASE') {
      const tempCarts = carts.map((cart) => {
        if (cart.name === name) {
          if (cart.amount > 1) {
            cart.amount -= 1;
          }
        }
        return cart;
      })
      
      if (!isAmountEqual1) {
        const tempRobots = robots.map((robot) => {
          if (robot.name === name) {
            robot.stock += 1;
          }
          return robot;
        });
        setRobots(tempRobots);
      } 
      setCarts(tempCarts);
      TotalRobot(carts);
    }
  }

  const renderLoading = () => (
    <>
    <div className='Loading'>
        <h3>Loading...</h3>
    </div>
    </>
  )

  const renderFilter = () => {
    if (found) {
      return (
      <>
      <div className='filter'>
        <h3>Results of material: {material}</h3>
        <h4>We found {filterData.length} results.</h4>
      </div>
      </>
      )
    } else {
      return (
        <>
        <div className='filter'>
          <h3>Sorry, Don't have any robots made from {material}.</h3>
        </div>
        </>
        )
    }
    
  }

  useEffect(() => {
    getRobot();
  }, []);

  useEffect(() => {
    TotalRobot(carts);
  }, [carts])

  return (
    <Router>
    <div className="App">
      <Navbar amount={amount} filterRobots={filterRobots} />
      <Switch>
          <Route exact path="/">
            {isFilter && renderFilter()}
            <Products robots={isFilter ? filterData : robots} AddToCart={AddToCart}/>
          </Route>
          <Route path="/cart">
            {('setting to cart')}
            <Cart amount={amount} totalCost={totalCost} carts={carts} UpdateQuantity={UpdateQuantity} handleRemoveItem={handleRemoveItem}/>
          </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
