import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'
import ConfirmationModal from './components/ConfirmationModal'

function App() {

  const {
    register: registerUser,
    handleSubmit: handleSubmitUser,
    watch: userWatch,
    setValue: setUserValue,
    reset: resetUserValue,
    formState: { errors: userErrors, isValid: isUserValid, isSubmitting: isUserSubmitting },
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      gender: '',
      TermsandConditions: false,
    }
  })

  const {
    register: registerOrder,
    handleSubmit: handleSubmitOrder,
    watch: orderWatch,
    setValue: setOrderValue,
    reset: resetOrderValue,
    formState: { errors: orderErrors, isSubmitting: isOrderSubmitting },
  } = useForm({
    defaultValues: {
      address: '',
      orderType: '',
      quantity: 1,
      size: 'medium',
      crust: 'normal',
      toppings: [],
      coke: 0
    }
  })

  const [showUserForm, setShowUserForm] = useState(true);
  const [modalData, setModalData] = useState(null);

  const coke = orderWatch('coke')

  const quantity = orderWatch('quantity')

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const pizzaSizePrices = {
    small: 100,
    medium: 200,
    large: 300,
    xlarge: 500
  }

  const crustPrices = {
    normal: 0,
    thin: 100,
    thick: 200,
    stuffed: 300
  }

  const getTotalAmount = () => {
    let total = 0;
    // console.log("Pizza order: ", pizzaOrder)
    // adding price of pizza size

    total += pizzaSizePrices[orderWatch('size')];

    // adding the price of crust

    total += crustPrices[orderWatch('crust')];

    // adding the price of toppings

    const toppingsPrice = 50 * orderWatch('toppings').length;

    total += toppingsPrice;

    total = total * quantity

    // adding the price of coke

    if (coke >= 1) {
      total += (coke * 40)
    }

    return total;
  }

  const GSTCharges = () => {
    return Math.floor(18 / 100 * getTotalAmount());
  }

  const handleUser = (data) => {
    setModalData({
      type: 'user',
      title: 'Your Details',
      rows: [
        { label: 'Name', value: data.name },
        { label: 'Phone', value: data.phone },
        { label: 'Email', value: data.email },
      ],
    });
  };

  const handleOrder = (data) => {
    const total = getTotalAmount() + GSTCharges();

    setModalData({
      type: 'order',
      title: '🍕 Order Placed Successfully!',
      rows: [
        { label: 'Order Type', value: data.orderType === 'homeDelivery' ? 'Home Delivery' : 'In-Store Pickup' },
        ...(data.orderType === 'homeDelivery' ? [{ label: 'Address', value: data.address }] : []),
        { label: 'Pizza', value: `${quantity} x ${capitalize(data.size)} Size (${capitalize(data.crust)} Crust)` },
        { label: 'Toppings', value: data.toppings.length > 0 ? data.toppings.map(capitalize).join(', ') : 'None' },
        ...(data.coke > 0 ? [{ label: 'Coke', value: `${data.coke} x ₹40` }] : []),
        { label: 'Total (incl. GST)', value: `₹ ${total}` },
      ],
    });
  };

  const handleModalConfirm = () => {
    if (modalData.type === 'user') {
      setShowUserForm(false);
    } else if (modalData.type === 'order') {
      resetOrderValue();
      resetUserValue();
      setShowUserForm(true);
    }

    setModalData(null);
  }

  const toppingsOptions = ['paneer', 'mushroom', 'corn', 'capsicum', 'olives', 'jalapeno', 'onion', 'soyachunks']

  return (
    <div className='app'>
      <header>
        <h1>The Pizza Factory</h1>
        <p className='tagline'>The Art of Great Pizza</p>
      </header>

      {showUserForm &&
        <form onSubmit={handleSubmitUser(handleUser)}>
          <h2>User Registration Form</h2>
          <section className='customer-info'>
            <h3>Customer Information</h3>
            <div className='content'>
              <div className='form-group'>
                <label htmlFor='customer-name'>Name: </label>
                <input
                  id='customer-name'
                  {...registerUser('name',
                    {
                      required: { value: true, message: "Name is required" },
                      minLength: { value: 3, message: "Name must be atleast of 3 characters" },
                      maxLength: { value: 20, message: "Name can't be more than 20 characters" },
                      pattern: { value: /^[A-Za-z ]+$/, message: "Characters 0 to 9 & special characters like !,@,#,$ aren't allowed" }
                    })}
                  placeholder='Enter name here'
                  style={userErrors.name ? { border: '1px solid red' } : {}}
                />
                {userErrors.name && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{userErrors.name.message}</p>}
              </div>
              <div className='form-group'>
                <label htmlFor='customer-phone'>Phone: </label>
                <input
                  id='customer-phone'
                  {...registerUser('phone',
                    {
                      required: { value: true, message: "Phone number is required" },
                      pattern: { value: /^[0-9]{10}$/, message: "Phone number must be exactly 10 digits" }
                    })}
                  type='tel'
                  placeholder='e.g. 123 4567 890'
                  style={userErrors.phone ? { border: '1px solid red' } : {}}
                />
                {userErrors.phone && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{userErrors.phone.message}</p>}
              </div>
              <div className='form-group'>
                <label htmlFor='customer-email'>Email: </label>
                <input
                  id='customer-email'
                  {...registerUser('email',
                    {
                      required: { value: true, message: "Email address is required" },
                      pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Please enter a valid email address" }
                    })}
                  placeholder='e.g. abc@example.com'
                  style={userErrors.email ? { border: '1px solid red' } : {}}
                />
                {userErrors.email && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{userErrors.email.message}</p>}
              </div>
              <div className='form-group'>
                <label htmlFor='customer-password'>Password :</label>
                <input
                  id='customer-password'
                  {...registerUser('password',
                    {
                      required: { value: true, message: "Password is required" },
                      minLength: { value: 8, message: 'Must be atleast 8 characters' },
                    })}
                  type='password'
                  placeholder='********'
                />
                {userErrors.password && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{userErrors.password.message}</p>}
              </div>
              <div className='form-group'>
                <label htmlFor='customer-confirm-password'>Confirm Password :</label>
                <input
                  id='customer-confirm-password'
                  {...registerUser('confirmPassword',
                    {
                      required: { value: true, message: "Please confirm your password" },
                      validate: (value) => value === userWatch('password') || 'Passwords do not match'
                    })}
                  type='password'
                  placeholder='********'
                />
                {userErrors.confirmPassword && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{userErrors.confirmPassword.message}</p>}
              </div>
              <div className='form-group'>
                <fieldset style={orderErrors.gender ? { border: '1px solid red' } : {}}>
                  <legend>Gender: </legend>
                  <div className='circle-group'>
                    <label>
                      <input
                        type='radio'
                        value='male'
                        {...registerUser('gender',
                          {
                            required: { value: true, message: "Please select a gender" }
                          })}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type='radio'
                        value='female'
                        {...registerUser('gender',
                          {
                            required: { value: true, message: "Please select a gender" }
                          })}
                      />
                      Female
                    </label>
                  </div>
                </fieldset>
                {userErrors.gender && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{userErrors.gender.message}</p>}
              </div>
              <div className='checkbox-group'>
                <input
                  type='checkbox'
                  id='user-check'
                  {...registerUser('TermsandConditions',
                    {
                      required: { value: true, message: "Please accept our Terms before login" }
                    })}
                />
                <label htmlFor='user-check'>I agree to the Terms and Conditions</label>
                {userErrors.TermsandConditions && <p style={{ color: 'red', margin: '0', fontSize: '12px' }}>{userErrors.TermsandConditions.message}</p>}
              </div>
              <button className='login-btn' type='submit' disabled={!isUserValid || isUserSubmitting}>{isUserSubmitting ? 'Please wait...' : 'Log In'}</button>
            </div>
          </section>
        </form>}

      {!showUserForm && <form onSubmit={handleSubmitOrder(handleOrder)}>
        <p>Hi <strong>{userWatch('name')}</strong>, please order your pizza</p>
        <section className='pizza-customization'>
          <h3>Pizza Customization</h3>
          <div className='content'>
            <div className='form-group'>
              <fieldset style={orderErrors.orderType ? { border: '1px solid red' } : {}}>
                <legend>Order Type:</legend>
                <div className='circle-group'>
                  <label>
                    <input
                      type='radio'
                      value='homeDelivery'
                      {...registerOrder('orderType',
                        {
                          required: { value: true, message: "Please select order type" }
                        })}
                    />
                    Home Delivery
                  </label>
                  <label>
                    <input
                      type='radio'
                      value='inStorePickup'
                      {...registerOrder('orderType',
                        {
                          required: { value: true, message: "Please select order type" }
                        })}
                    />
                    In-Store Pickup
                  </label>
                </div>
              </fieldset>
              {orderErrors.orderType && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{orderErrors.orderType.message}</p>}
            </div>
            {orderWatch('orderType') === 'homeDelivery' && (
              <div className='form-group'>
                <label htmlFor='customer-address'>Address: </label>
                <textarea
                  style={orderErrors.address ? { border: '1px solid red' } : {}}
                  id='customer-address'
                  placeholder='e.g. 123 your street/area/locality landmark'
                  {...registerOrder('address',
                    {
                      required: { value: true, message: "Address is required for home delivery" }
                    })}
                  rows={4}
                />
                {orderErrors.address && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{orderErrors.address.message}</p>}
              </div>
            )}
            <div className='drinks-group'>
              <div className='left-part'>
                <p>Select Pizza Quantity</p>
              </div>
              <div className='right-part'>
                <button type='button' onClick={() => quantity < 20 ? setOrderValue('quantity', quantity + 1) : alert("Can't order more than 20 pizzas at once!")}>+</button>
                <p>{orderWatch('quantity')}</p>
                <button type='button' onClick={() => quantity > 1 ? setOrderValue('quantity', quantity - 1) : alert("You must order at least 1 pizza!")}>-</button>
              </div>
            </div>
            <div className='row-group'>
              <div className='form-group'>
                <label htmlFor='pizza-size'>Size: </label>
                <select
                  id='pizza-size'
                  {...registerOrder('size')}
                >
                  <option value='small'>Small - ₹ {pizzaSizePrices['small']}</option>
                  <option value='medium'>Medium - ₹ {pizzaSizePrices['medium']}</option>
                  <option value='large'>Large  -  ₹ {pizzaSizePrices['large']}</option>
                  <option value='xlarge'>Extra Large - ₹ {pizzaSizePrices['xlarge']}</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='pizza-crust'>Crust: </label>
                <select
                  id='pizza-crust'
                  {...registerOrder('crust')}
                >
                  <option value='normal'>Normal</option>
                  <option value='thin'>Thin - ₹ {crustPrices['thin']} extra</option>
                  <option value='thick'>Thick - ₹ {crustPrices['thick']} extra</option>
                  <option value='stuffed'>Stuffed - ₹ {crustPrices['stuffed']} extra</option>
                </select>
              </div>
            </div>
            <div className='form-group'>
              <fieldset style={orderErrors.toppings ? { border: '1px solid red' } : {}}>
                <legend>Toppings (₹50 per topping): </legend>
                <div className='toppings-grid'>
                  {toppingsOptions.map((topping, index) => (
                    <div key={topping} className='topping'>
                      <input
                        type='checkbox'
                        value={topping}
                        {...registerOrder('toppings',
                          {
                            validate: (value) => (value && value.length > 0) || "Please select at least one topping"
                          })}
                      />
                      <label>{topping.charAt(0).toUpperCase() + topping.slice(1)}</label>
                    </div>
                  ))}
                </div>
              </fieldset>
              {orderErrors.toppings && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{orderErrors.toppings.message}</p>}
            </div>
            <h4>Side Drinks</h4>
            <div className='drinks-group'>
              <div className='left-part'>
                <p>Coke (350mL - MRP ₹40 )</p>
              </div>
              <div className='right-part'>
                <button type='button' onClick={() => coke < 20 ? setOrderValue('coke', coke + 1) : alert("Can't order more than 20 coke at once!")}>+</button>
                <p>{orderWatch('coke')}</p>
                <button type='button' onClick={() => coke > 0 ? setOrderValue('coke', coke - 1) : alert("Quantity can't be negative!")}>-</button>
              </div>
            </div>
          </div>
        </section>
        <section className='summary'>
          <div className='total-price'>
            <strong>Summary</strong>
            <button className='pay-now' type='submit'>Order Now | Total - <strong>₹ {getTotalAmount() + GSTCharges()}</strong></button>
          </div>
          <div className='item-list'>
            <div className='item'>
              <div className='list-item'>
               {quantity} x {orderWatch('size').charAt(0).toUpperCase() + orderWatch('size').slice(1)} Size Pizza ({orderWatch('crust').charAt(0).toUpperCase() + orderWatch('crust').slice(1)} Crust)
              </div>
              <div className='item-price'>
                ₹ {(pizzaSizePrices[orderWatch('size')] + crustPrices[orderWatch('crust')])*quantity}
              </div>
            </div>
            <div className='item'>
              <div className='toppings-item'>
                <p>Toppings:</p>
                <div className='toppings-bracket'>
                  [{orderWatch('toppings').map((t, i) => (
                    <p key={t}>{t.charAt(0).toUpperCase() + t.slice(1) + (i === orderWatch('toppings').length - 1 ? "" : ",")}</p>
                  ))}]
                </div>
              </div>
              <div className='item-price'>
                ₹ {orderWatch('toppings').length * 50}
              </div>
            </div>
            {coke >= 1 && (
              <div className='item'>
                <div className='list-item'>
                  Coke (350mL) x {coke}
                </div>
                <div className='item-price'>
                  ₹ {coke * 40}
                </div>
              </div>
            )}
            <div className='item'>
              <div className='list-item'>
                GST (18%)
              </div>
              <div className='item-price'>
                ₹ {GSTCharges()}
              </div>
            </div>
          </div>
        </section>
      </form>}

      {modalData && (
        <ConfirmationModal
          title={modalData.title}
          rows={modalData.rows}
          onConfirm={handleModalConfirm}
        />
      )}

    </div>
  )
}

export default App
