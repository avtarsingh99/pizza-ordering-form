import React, { useState } from 'react'
import './App.css'

function App() {

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    termsAndConditions: false,
    address: '',
    orderType: ''
  })

  const [pizzaOrder, setPizzaOrder] = useState({
    size: 'medium',
    crust: 'normal',
    toppings: [],
    coke: 0
  })

  const [formState, setFormState] = useState({
    erros: {},
    isSubmitting: false
  })

  const toppingsOptions = ['paneer', 'mushroom', 'corn', 'capsicum', 'olives', 'jalapeno', 'onion', 'soyachunks', 'pineapple']

  return (
    <div className='app'>
      <header>
        <h1>The Pizza Factory</h1>
        <p className='tagline'>The Art of Great Pizza</p>
      </header>
      <main>
        <h2>Pizza Order Form</h2>
        <section className='customer-info'>
          <h3>Customer Information</h3>
          <div className='content'>
            <div className='form-group'>
              <label htmlFor='customer-name'>Name: </label>
              <input
                type='text'
                id='customer-name'
                name='name'
                placeholder='e.g. Rahul Singh'
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='customer-phone'>Phone: </label>
              <input
                type='tel'
                id='customer-phone'
                name='phone'
                placeholder='e.g. 123 4567 890'
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='customer-email'>Email: </label>
              <input
                type='email'
                id='customer-email'
                name='email'
                placeholder='e.g. abc@example.com'
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
              />
            </div>
            <div className='checkbox-group'>
              <input
                type='checkbox'
                name='termsAndConditions'
                id='user-check'
                value={customerInfo.termsAndConditions}
                onChange={(e) => setCustomerInfo({ ...customerInfo, termsAndConditions: e.target.checked })}
              />
              <label htmlFor='user-check'>I agree to receive updates via WhatsApp</label>
            </div>
            <div className='radio-group'>
              <fieldset>
                <legend>Gender: </legend>
                <label>
                  <input
                    type='radio'
                    name='gender'
                    value='male'
                    checked={customerInfo.gender === 'male'}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, gender: e.target.value })}
                  />
                  Male
                </label>
                <label>
                  <input
                    type='radio'
                    name='gender'
                    value='female'
                    checked={customerInfo.gender === 'female'}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, gender: e.target.value })}
                  />
                  Female
                </label>
              </fieldset>
              <fieldset>
                <legend>Order Type:</legend>
                <label>
                  <input
                    type='radio'
                    name='orderType'
                    value='homeDelivery'
                    checked={customerInfo.orderType === 'homeDelivery'}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, orderType: e.target.value })}
                  />
                  Home Delivery
                </label>
                <label>
                  <input
                    type='radio'
                    name='orderType'
                    value='inStorePickup'
                    checked={customerInfo.orderType === 'inStorePickup'}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, orderType: e.target.value })}
                  />
                  In-Store Pickup
                </label>
              </fieldset>
            </div>
            {customerInfo.orderType === 'homeDelivery' && (
              <div className='form-group'>
                <label htmlFor='customer-address'>Address: </label>
                <textarea
                  id='customer-address'
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  rows={4}
                />
              </div>
            )}
          </div>
        </section>
        <section className='pizza-customization'>
          <h3>Pizza Customization</h3>
          <div className='content'>
            <div className='form-group'>
              <label htmlFor='pizza-size'>Size: </label>
              <select
                id='pizza-size'
                value={pizzaOrder.size}
                onChange={(e) => setPizzaOrder({ ...pizzaOrder, size: e.target.value })}
              >
                <option value='small'>Small</option>
                <option value='medium'>Medium</option>
                <option value='large'>Large</option>
                <option value='xlarge'>Extra Large</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='pizza-crust'>Crust: </label>
              <select
                id='pizza-crust'
                value={pizzaOrder.crust}
                onChange={(e) => setPizzaOrder({ ...pizzaOrder, crust: e.target.value })}
              >
                <option value='normal'>Normal</option>
                <option value='thin'>Thin</option>
                <option value='thick'>Thick</option>
                <option value='stuffed'>stuffed</option>
              </select>
            </div>
            <div className='form-group'>
              <fieldset>
                <legend>Toppings: </legend>
                <div className='toppings-grid'>
                  {toppingsOptions.map(topping => (
                    <div key={topping} className='topping'>
                      <input
                        type='checkbox'
                        value={topping}
                      />
                      <label>{topping.charAt(0).toUpperCase() + topping.slice(1)}</label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            <h4>Drinks (as per the MRP)</h4>
            <div className='drinks-group'>
              <div className='left-part'>
                <p>Coke (350mL)</p>
              </div>
              <div className='right-part'>
                <button onClick={() => setPizzaOrder({ ...pizzaOrder, coke: pizzaOrder.coke + 1 })}>+</button>
                <p>{pizzaOrder.coke}</p>
                <button onClick={() => pizzaOrder.coke > 0 ? setPizzaOrder({ ...pizzaOrder, coke: pizzaOrder.coke - 1 }) : alert("Quantity can't be negative!")}>-</button>
              </div>
            </div>
          </div>
        </section>
        <section className='summary'>
          <h3>Summary</h3>
          <div className='item-list'>
            <div className='item'>
              <div className='list-item'>
                {pizzaOrder.size.charAt(0).toUpperCase() + pizzaOrder.size.slice(1)} Size Pizza ({pizzaOrder.crust.charAt(0).toUpperCase() + pizzaOrder.crust.slice(1)} Crust)
              </div>
              <div className='item-price'>
                ₹ 350
              </div>
            </div>
            <div className='item'>
              <div className='list-item'>
                GST (18%)
              </div>
              <div className='item-price'>
                ₹ 50
              </div>
            </div>
          </div>
          <div className='item'>
            <div className='list-item'>
              Grand Total
            </div>
            <div className='item-price'>
              ₹ 400
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
