import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'

function App() {

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      gender: '',
      whatsappUpdates: false,
      address: '',
      orderType: '',
      size: 'medium',
      crust: 'normal',
      toppings: [],
      coke: 0
    }
  })

  const coke = watch('coke')

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

    total += pizzaSizePrices[watch('size')];

    // adding the price of crust

    total += crustPrices[watch('crust')];

    // adding the price of toppings

    const toppingsPrice = 50 * watch('toppings').length;

    total += toppingsPrice;

    // adding the price of coke

    if (coke >= 1) {
      total += (coke * 40)
    }

    return total;
  }

  const GSTCharges = () => {
    return Math.floor(18 / 100 * getTotalAmount());
  }

  const handleOrder = (data) => {
    const total = getTotalAmount() + GSTCharges();
    alert(
      `🍕 Order Placed Successfully! 🍕
      --------------------------------
      Name: ${data.name}
      Phone: ${data.phone}
      Email: ${data.email}
      
      Order Type: ${data.orderType === 'homeDelivery' ? 'Home Delivery' : 'In-Store Pickup'}
      ${data.orderType === 'homeDelivery' ? `Address: ${data.address}` : ''}
      
      Pizza: ${data.size.charAt(0).toUpperCase() + data.size.slice(1)} Size, ${data.crust.charAt(0).toUpperCase() + data.crust.slice(1)} Crust
      Toppings: ${data.toppings.length > 0 ? data.toppings.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ') : 'None'}
      ${data.coke > 0 ? `Coke: ${data.coke} x ₹40` : ''}
      
      --------------------------------
      Total (incl. GST): ₹ ${total}
      --------------------------------
      Thank you for ordering! 🎉`
    );

    reset();
    // console.log("Submitting: ", data)
  }

  const toppingsOptions = ['paneer', 'mushroom', 'corn', 'capsicum', 'olives', 'jalapeno', 'onion', 'soyachunks']

  return (
    <div className='app'>
      <header>
        <h1>The Pizza Factory</h1>
        <p className='tagline'>The Art of Great Pizza</p>
      </header>
      <form onSubmit={handleSubmit(handleOrder)}>
        <h2>Pizza Order Form</h2>
        <section className='customer-info'>
          <h3>Customer Information</h3>
          <div className='content'>
            <div className='form-group'>
              <label htmlFor='customer-name'>Name: </label>
              <input
                id='customer-name'
                {...register('name',
                  {
                    required: { value: true, message: "Name is required" },
                    minLength: { value: 3, message: "Name must be atleast of 3 characters" },
                    maxLength: { value: 20, message: "Name can't be more than 20 characters" },
                    pattern: { value: /^[A-Za-z ]+$/, message: "Characters 0 to 9 & special characters like !,@,#,$ aren't allowed" }
                  })}
                placeholder='Enter name here'
                style={errors.name ? { border: '1px solid red' } : {}}
              />
              {errors.name && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{errors.name.message}</p>}
            </div>
            <div className='form-group'>
              <label htmlFor='customer-phone'>Phone: </label>
              <input
                id='customer-phone'
                {...register('phone',
                  {
                    required: { value: true, message: "Phone number is required" },
                    pattern: { value: /^[0-9]{10}$/, message: "Phone number must be exactly 10 digits" }
                  })}
                placeholder='e.g. 123 4567 890'
                style={errors.phone ? { border: '1px solid red' } : {}}
              />
              {errors.phone && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{errors.phone.message}</p>}
            </div>
            <div className='form-group'>
              <label htmlFor='customer-email'>Email: </label>
              <input
                id='customer-email'
                {...register('email',
                  {
                    required: { value: true, message: "Email address is required" },
                    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Please enter a valid email address" }
                  })}
                placeholder='e.g. abc@example.com'
                style={errors.email ? { border: '1px solid red' } : {}}
              />
              {errors.email && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{errors.email.message}</p>}
            </div>
            <div className='checkbox-group'>
              <input
                type='checkbox'
                id='user-check'
                {...register('whatsappUpdates')}
              />
              <label htmlFor='user-check'>I agree to receive updates via WhatsApp</label>
            </div>
            <div className='radio-group'>
              <fieldset style={errors.gender ? { border: '1px solid red' } : {}}>
                <legend>Gender: </legend>
                <label>
                  <input
                    type='radio'
                    value='male'
                    {...register('gender',
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
                    {...register('gender',
                      {
                        required: { value: true, message: "Please select a gender" }
                      })}
                  />
                  Female
                </label>
              </fieldset>
              {errors.gender && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{errors.gender.message}</p>}
              <fieldset style={errors.orderType ? { border: '1px solid red' } : {}}>
                <legend>Order Type:</legend>
                <label>
                  <input
                    type='radio'
                    value='homeDelivery'
                    {...register('orderType',
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
                    {...register('orderType',
                      {
                        required: { value: true, message: "Please select order type" }
                      })}
                  />
                  In-Store Pickup
                </label>
              </fieldset>
              {errors.orderType && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{errors.orderType.message}</p>}
            </div>
            {watch('orderType') === 'homeDelivery' && (
              <div className='form-group'>
                <label htmlFor='customer-address'>Address: </label>
                <textarea
                  style={errors.address ? { border: '1px solid red' } : {}}
                  id='customer-address'
                  placeholder='e.g. 123 your street/area/locality landmark'
                  {...register('address',
                    {
                      required: { value: true, message: "Address is required for home delivery" }
                    })}
                  rows={4}
                />
                {errors.address && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{errors.address.message}</p>}
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
                {...register('size')}
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
                {...register('crust')}
              >
                <option value='normal'>Normal</option>
                <option value='thin'>Thin - ₹ {crustPrices['thin']} extra</option>
                <option value='thick'>Thick - ₹ {crustPrices['thick']} extra</option>
                <option value='stuffed'>Stuffed - ₹ {crustPrices['stuffed']} extra</option>
              </select>
            </div>
            <div className='form-group'>
              <fieldset style={errors.toppings ? { border: '1px solid red' } : {}}>
                <legend>Toppings (₹50 per topping): </legend>
                <div className='toppings-grid'>
                  {toppingsOptions.map((topping, index) => (
                    <div key={topping} className='topping'>
                      <input
                        type='checkbox'
                        value={topping}
                        {...register('toppings',
                          {
                            validate: (value) => (value && value.length > 0) || "Please select at least one topping"
                          })}
                      />
                      <label>{topping.charAt(0).toUpperCase() + topping.slice(1)}</label>
                    </div>
                  ))}
                </div>
              </fieldset>
              {errors.toppings && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{errors.toppings.message}</p>}
            </div>
            <h4>Side Drinks</h4>
            <div className='drinks-group'>
              <div className='left-part'>
                <p>Coke (350mL - MRP ₹40 )</p>
              </div>
              <div className='right-part'>
                <button type='button' onClick={() => coke < 20 ? setValue('coke', coke + 1) : alert("Can't order more than 20 coke at once!")}>+</button>
                <p>{watch('coke')}</p>
                <button type='button' onClick={() => coke > 0 ? setValue('coke', coke - 1) : alert("Quantity can't be negative!")}>-</button>
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
                {watch('size').charAt(0).toUpperCase() + watch('size').slice(1)} Size Pizza ({watch('crust').charAt(0).toUpperCase() + watch('crust').slice(1)} Crust)
              </div>
              <div className='item-price'>
                ₹ {pizzaSizePrices[watch('size')] + crustPrices[watch('crust')]}
              </div>
            </div>
            <div className='item'>
              <div className='toppings-item'>
                <p>Toppings:</p>
                <div className='toppings-bracket'>
                  [{watch('toppings').map((t, i) => (
                    <p key={t}>{t.charAt(0).toUpperCase() + t.slice(1) + (i === watch('toppings').length - 1 ? "" : ",")}</p>
                  ))}]
                </div>
              </div>
              <div className='item-price'>
                ₹ {watch('toppings').length * 50}
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
      </form>
    </div>
  )
}

export default App
