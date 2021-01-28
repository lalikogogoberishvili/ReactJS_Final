
// import './App.module.css';
import React,{useState,useEffect} from 'react';
import fire from './fire';
import Login from './components/Login';
import PersonList from './components/PersonList';
import PersonInput from './components/PersonInput';
import {useSelector,useDispatch} from 'react-redux';
import {increment,decrement} from './actions'
import ThemeHeader from './ThemeHeader';
import useLocalStorage from './useLocalStorage';

import styles from "./App.module.css";


const PAGE_PRODUCTS='products';
const PAGE_CART='cart'

function App() {

  const [user,setUser]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [emailError,setEmailError]=useState('');
  const [passwordError,setPasswordError]=useState('');
  const [hasAccount,setHasAccount]=useState(false);
  const[cart,setCart]=useState([])
  const [page,setPage]=useState('products');
  const [showMembers,setShowMembers]=useState(false)
  const [name,setName]=useLocalStorage('name','')
  const[products]=useState([
    {
      name:"Airmax270",
      price:"$140",
      image:"https://static.highsnobiety.com/thumbor/GfCfH983pB0fmDYsCxE8J_fORQc=/1600x1067/static.highsnobiety.com/wp-content/uploads/2020/05/26120258/air-max-270-main5.jpg"


    },{
      name:"Airmax90",
      price:"$90",
      image:"https://media.endclothing.com/media/catalog/product/1/9/19-06-2019_nike_airmax90essential_white_537384-111_blr_1.jpg"
      
    },{
      name:"Airmax720",
      price:"$260",
      image:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDw8PDxAPDw8QEA8PDxUPEA8VDw8PFRUWFhUVFRUYHSggGBolGxUVITEhJSsrLi4wFx8zODMtNygtLi0BCgoKDQ0NFQ8PFSsdFR0vKysvKystLSstLSsrNys3Lis3NysrNy0yNysuMC03Nys3KzcwMDc3NCs3MisyMTcwN//AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQIDBAUHBgj/xABMEAACAQIDBAUGCQkGBQUAAAABAgADEQQSIQUxQVEGE2FxkQciMlKBoRQXQmJykrHB0SMzRFOCk6Lh8ENjlLLC0lRzo8PxFRYkNIP/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBQT/xAAnEQEAAgIBAgMJAAAAAAAAAAAAARECAzEEEiFB4VFhcZGSobHR8P/aAAwDAQACEQMRAD8A6fCKE6MGI4gJICQK0I4rQCOFo4BaFoRwFC0cIUo7QhAIQhAULRwgKEcIBCEIBFHFAcUcUAgYRSoDFHCAoGEDARihCARQhAdowIQgOOKOAQihAccUJA4QhAI4oQHCKEKcIoQHCKEBwihAcUIQHCKF4BCEIAYoQhBFHFKCEIjAUIRQCEIoE4QhAcIo4BHFCA4QhIHCKEBwvAQkUQhCARxRyghCEBQjigOKOEBQjhAUIQgKEcICijMUqCKOIwFFJGRMAijigThFeAgMRxRwHCKEBwijkBHFCAxCKORRCEIBCEcoIRgSQECNoWlgWPLAqtERLSsiRIIQgYShQjhAUI7QtKFFJSJhChCKAGKOKAQihAcBCEBwvFGIBHFGIDhFHAIQhIHCEIUQjjAgISQEYWWKsCIWTCyGJxNKivWVqlOilwuaq6olzoBdiBczXdI+kmHwNNmYipVy3SkjDOxIJUniqm2/vteQbPEVkpLnqOlNBYEuwVbncLnjOY9LvKW12oYAZVy+fWcHP5w/s14aEHMddd00e2+ltTaC0adeki2bPUZi4COL5ersQALetfVuOUE+U25VU1KhX0VVKa8rIipfxHvgdW8kO2Gr0sVh6jvUejUSspdix6uqCLXPzqbH9qe+ZZxPyM4kjaxS+lXB1lI4FlemwNuYAbxM7i6xCsYiRlzLI5ZUQAjCyYWV47FU8PSetWcJTQXYn3AcyToBxgTyzC2pjTRXzKVTEVSCUpUjTFRwtsxu5ChRmW5J4gakgTwW1fK6tNytDCdYgNgalbI7fsqrZfEz1vRTa9PaBfGUrhHw+GQIxUtRcPX6xTbc17X5hVixPo70ho49auRalKtQfq8RRrqFr0H1tmW+42NiN9jxBE2pmnxOBFLatDEp5vwrDV8NXt8t6RSpRY9oXrRflYcJuWiElAxSRilETFHCAooWhAlCKEBxyMcBwihAYMcUcAjgIwIBHGBJhZFRAk1WSVZYqSCKrDEVkpI1Sq606ai7M5AVR2kzwHlA8pFLBirhcIxbGAhC4VGSlvzZQTq40Goyi/GxU8b2jtfE4rTEV61YZrhalV3u54m+89gAA4CB7ryndM8Nj2o0sKatSnR63MzDJQdmy2K384kWOtvlcJ4xcza1HyKbaC4vbdoNWHeZiUhlI0LVDoigbm7uJlVasoNnJqNxVGGQdhfW5+jp86BsqaYZfRLg66haYvuA7Ze+GpuLK6sNdCuUjfw3HhrpNEuKHHD0CPp4m/iKsyKdekToXw7cnvUpfWAzr4NIPSdC8bT2btKhisR1gootVGyJc2dGUEi+gBIPduJ3T6EwWMo4mmtahUSrSbVWQgjuPI9h1E+Z0xVRFHWAPTJsrBs1MnsZeO/Tf2TP2PtGvhKnXYCu1BzbOmhpvbgyHRv/ADCvowpI5ZzvYflZpEBNo0HoONDUoA1KJPMr6Sd2s9NS6fbJYZhjqNiL+cKinwK3ltHoAs415W+khq4j4JSa9PDnKbHR8Rbzvqjzew5p6LpP5VcLTpvTwBavXYFVqZCKVMnTNZtWI4aW7eE5HTR6j5muWJNrm9uZJ4mRUaGH0ueGrHt5T2Pkf2v1G0nwx0p41Co7K9IM6eKdYPYs80wLkUqWvbw03sTymBjUamwNMupVgVqC4YVFIIYEeiQbcdNIH0njUviMMPVGIq+Cqn/dEveafortJsbSoYpredg8NmtwxD5mrr2ejS8ZuXmoZlUZGSMiZQooGKAQhCAQijgEcUYgOEAJICACMCMCTCwIgSYWSCxYislJGqVGVEUXZmIAAkEgskxVRdiFHNiAPEznvSbyn06eWns5PhFVr5nqU6gpoBwCnLmPaSAOZ3Tn/SvphjNpdWKgpUkpAgCkGOZjYM5zEgE2032va++5XZukfTPAbPS9eurVCt0p0iHqvy0G4dpnIekvlKx+PBp0j8Dw5uCKRIq1ByL7/C1+U8sMIF859XPA6nvY8+yILfcP/EgoSlbQC5Pib8zLqVHWy2Z7HMToqLxJJ3Ac5k0MOWuF4emx3Af1w4yjGtb8lT0FwWvvvwL9vJeF+8mDGrVfSSnc5hZ33NUHED1U7N548hGnQt2/ZLFUKLD2niZYMOxGYlKakXDVCRmHNQLsw7QCICVj/W6I0lbhbut9kZWkP7cn6NBiviWB90MgJ82rSbsYsh/jAX3wKkFSiS1NiARZraqw5Op0I7DcTKoV1c6Wo1fVv+Sc/NJ9Buw6do3SApVF16t7c1XMv1luPfMfEIpGYaG9iLbu3sgbZcRm81rq4Nr7iDyIlVQi9nVSeZUazHwlY1bUz+dAAptxccKbdvI+zuuTz1ynfqV7DAkCOFh2CXk5Ft8pt/YvL2/dKMKL7+F78hbfJ0vPqKONRtexQLn3C3tgel6L7INYqg801POqMLeZRB4X4m4t2kbwJ7HpHsyjUwfwWnTBykJTC71cAm9zxtfXiTMfYezwuGp30bE1EY23ikFYqO4DX9ox7W2qmHXrKrAMBqBvNai4tbvBM8vftyz2R2eXD3Ol6bDHV3bJ55/vmPIjjf8A4+NwjHz6OIFYfQqIE07mpN4idFece8j2ILbUxLAZVq4Wq5HIdbTK/afGdheerDw55VNISTSBmkF4ooQHCKEqCEUcgYkgIgJYqwoAk1WUY3G0qC5qrZb7gLlj3ATyG1enlZSww2EBUXs9Z9e8ou4ftQPdKk1G0ulOBwpK1cRTzre6Jd3B5ELfKe+045tbpNjMQxFXE1t/ooUFLuCoQDyv4zTljfge2w3yDo+0vKk5zLhcMFFiA9WopcX3HKAVHiZ4na23sTi7fC6nXFQRSvYZGO8gLYCa1wOFu23ONBY85FVu9gVG8+kefId0ioK7h53s0ltSjbzhqu89g/rjJVKdx1i6gekNdOcDFAubfjzmTh6BqMES2tzc7goF2Y9gAJ9mkbJdCy7+IEeGxZRWKANmXIwvYlMysbHn5o98DMxtqVBjTFlTLqbXJYhQ7duvs3d+joUWYEoPNucznRb8btxPZvmxp7Yy7hWvaxAUg25G5t9sxcVi6tQ6+bwFzmfuHKQVOy0/R85/WcaA/MQ/a3gJjlGclmJueLklj3zI6gJ+cYIfnAtVPcg3e20TVk+RTzdtZmOn0EIt4mBQKC8z4CROHHD+cyvhb8BSA5dRQI96kyZxYPpUqLdoTIf+mQJRgiiVN1NjzB1+6Os9RhZndrbgxcgeMzD1LfJqUz81g48DY++RbDKb5aq9zqym3fqPfJQw8MhV1a+qsGG/eNR9kzqDa3PeZD4HVtcIXXiadnHb6N5VVexykW57wT2QMqibip2hpLBVlWpTdjZcrqSdwLZbE+FvbMalWsf63SVtfNOh4cjKPYjpOyJTUVUJpKUQoAzWsB3A2AF55vamPas1zmJJ+VdnJPP3SvCYV6h80WF9S2iDvMyscEw9J2o3r1VGrhfydIcWA5zGOGOPEOme3POIjKbp6byQIybRcspJajUpNc+hqHvbifMA9s7K84n5F8eoxeWoTmfOimxOZyC2p7bHfO2uJ0hyY7Ssyx5WZUKKEUoI4oQHGIRiBJRHiMQtKm9VzZEUs3cI0mt6W0DUwGJRbglBe28KGBY+AMg4r0x27WxOMrtUZsodlpJmJRKYuFsO7U9pM0QxAI1F++02O0tjOWJNagHIDMrl1KggWN7Wmsq7Nqrp+Sb6FakfvmWly1wBLqWKUix91prlpVBplH1kP3wGHfko/bp/eYGwzD1vEf14QuN+b3f1/RmuysNLr9dD98sRDxamL/Ov9l4GyGJXLpe5FtTHQxFu73cpruq/vafsFY/6ZZT6tfSd2+hTA97MLeEDIap1bnLu3xZSz3pKzE71RST32HbInGoPQoLcfKrVHc/VXKvuMqq4uo65GchPUQBKf1FsD7bwMioiofyrhbfJpkVKu7dZdF/aIlFTGNupKKK8WNmrsPpWsv7PjKFAEZIgPD4cuyogu7sALneTxJmbtrCrQqCkPk00LMb/AJRjclgDuHCw9XvmPs/GrRqpUNjlJuLi9iCDbt1noavS6go0dmtuAG78Jw2Z545xWNw9HpdHT7NGXfsjHO/P2erQUMBWqehSqMOYU5frHSZg2LUUXqvSoj57gn2Bb/bKcb0ud75bqOwXbxM1GJ2mC7EZ3FzZnNmZb6EjW3deWJ2TzUfdzzjpNfhj3Zz9Mfv8NpiKdFRZKj1XuNcmWmBrfeSSd3KYpmvOOY7lHvMg+IqHs7hOseEc2+TOYym4ivh6topINxoeY3y9sZUIAZs4G4VAr27swNpp8Lh2qnWtTpD1qrtYexAW8BN8NlbMpU81faNatU9TDYerTUHtq1VIt7L9kWywqlanvZKY+iXX3XtK12miegi352LH+LT3TKwNHCOfyWGNc8mxGKqt9WjSp3no9m7KrkgU9j07DcauzK7Kf2sRiBeBg9Eafw5qvWZstMLYktlJJN15DgbCe3TZdJUyEDKQVIAG46GbbZvXikinZmFw9gATUq0KVMniRTpiplHZczQbfbGrWb4PSw9VWAPm1XFGkQALAFFJvv0uNOE0OfdD8acHjk84A06yi+tr033nsIB759MpUWoodCGRgGUjcQZ8t7U2ViMK3WVcN1SX0amztSud3nZiRrztOg+TPp6tNlwtYWpsRqWYlDzF+HOSEl15xKWEyXlDiaRXFGYpQoRwhE4CK8JFWLLCgZSrAFWBVgdxB0IlIMtVoVzvpV0Yr4fNVw6mtQ1ZgLl6feo3jtFxzHGcq2pQWrULo4pMQLqQcpbmGHs4DdPp5HnneknQTAbQu70zRrH+1oWViebKQVfvIv2yD5/w+AurZ6xRwpIvTVqTHgOsUm3DhpMp9jOKNKpTrUq1RwxemiNakF35qt8m7Xt4T1u2fJRtCgS2Fani0G7IwpV/qucvg3snjNqbIxmHJ+FYXE0rb2q0amT69ipkVjYmhiaYzNRdU9Y06gU33akC3tkKdLFN6NGo30aVVreAmOFpsbgIee4377ax/B6VrGmO9HdW/izD3SDOXZmOP6NifZhMSf8ATLF2JtAmwwmNPdgsR94mAEAHmVMTTtwDhh7isV34Ymv+11g+xjA3lLobtV92GrqP7xFT3EzKTye7Ub0qa0x8/E4ce7PPMMHO/EOe9q33yo4IHUuCe5r/AGQPXt5PK6/ncThKf08Sn85T/wCz8Ot+s2nssEcBjLn22SeX+AJ63uP4Sa4BfW9zf7YHocR0e2egu21sGOfVpiK1/q2lI2fsoattQnspbNr/AGu8042cOf8Am/CBwCDef8/4QNqybFQf/Y2nVP8Ad4fDID9Yyt6+xxaybXe3rV8Gg7tEM1nwNOY/6n4RfBqfZ/H+EDbf+r7KW2XZmIqf83aFRf8AIstXpNgF9HZFP/8ATH4x/cZpRh6fZ/F+EfU0x6vg34QN0/TKiB+T2Rs0f85KlW31iIU/KBiKd+pwuzMPfjRwSKR7zNOKacMvgfwkgo+bA2dXyi7XfT4Y6jlTp0VA7rLMCt0o2jUN3xuMP0a1RfcpAkNOY8G/CO45j3/hA9B0a6ZV0cU8VnrI2gdltUptwuR6S9+vbPYf+vJzTxE5rSZRx8At/eRMpKgO7Ox8PsDS2PbbQ2vTqU3puUZHVlYXBupGs5nsihUFWmbEWIJM3jIwFzTKjnUa3hmy39gMxcJhi7qqKzsxAUAk3J3AAQPoro3W6zBYdiQx6sKdb6jTX2WmY81nRDAPhsDQpVVC1AGZhrcZmJGa59KxF/CbN5plUYozEZQo4o4RLLDLHHI0WWOECIC60iRNd+BQd6k/fGRFk7oFT4nE/JbDn6SVPuaY1THbSHoJgW73rr9xmwCCGQSUW8ntWlja/wCf2VsjE8jUsx7wWFxPJbR6JVKlyNhUUJ44bHOgHcpq5R4TrQQSVhJ2r3e58/YvoJtG5NPAYhRwBr4VwPaGBmIehO1v+BrH20v90+jRbkIEDujtLfOQ6FbX/wCAreNL/dLF6DbXP6BV9rUR/rn0PfthmHOWkt89joDtg/oL+2rhh/3JZT8ne2D+hgfSr4b7qk+gM/fAv2xRbgo8mm1z+j0h316f3GP4sdr/AKmh/iFneCe+I1Dyii3Cfiv2v+qw/wDiF/CHxXbX/V4f/ELO655EMYotwz4rNr+phv8AED8I/iq2t6uG/f8A8p3O5hduyKLcM+Kra3q4X9//ACh8VW1vVwv7/wDlO5jNzjuYotwv4rNr+phv34/CHxXbX/V4b9+v4TulzzhmPOKLcMHkw2x+rofv0lvxa7YtqiezFJadvzHnAt2xQ4WfJrta/wCYo9/winf7Z7/oV0MXAOleolapiAvF6IpI5FmKhTc7za59k9pftMAe0y0LesY/Jt7RINm5e8S1TpIkwKSDykdeUuMUIqseUJbCBHNDNCEijNAmEIESYs8ISh9ZGGhCQGcxZoQlQrwhCARawhCkQYrH+jCEIeUw1hCFGsLnshCAed2RjN2QhCH53ZAhuyEIVEo3OGVucUIDCtzh1Z5whIprTMsCGEJUTvEWhCAi0WaEIBmhCED/2Q=="
      
    }
  ])

  const addToCart=(product)=>{
    
    setCart([...cart,{...product}])
  }

  const removeFromCart=(productToRemove)=>{
    setCart(cart.filter(product=>product!==productToRemove))
  }

  const navigateTo=(nextPage)=>{
    setPage(nextPage)
  }

  const clearInputs=()=>{
    setEmail('');
    setPassword('');
  }

  const clearErrors=()=>{
    setEmailError('');
    setPasswordError('');
  }


  const handleLogin=()=>{
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email,password)
      .catch(err=>{
        switch(err.code){
          case "auth/Invalid-email":
          case "auth/user-disabled":
            case "auth/user-not-found":
              setEmailError(err.message);
              break;
          case "auth/wrong-password":
          setPasswordError(err.message);
          break;    

        }
      })
  }



  const handleSignUp=()=>{
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .catch(err=>{
        switch(err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            
              setEmailError(err.message);
              break;
          case "auth/weak-password":
          setPasswordError(err.message);
          break;    

        }
      })
  }

  const handleLogout=()=>{
    fire.auth().signOut();
  };

  const authListener=()=>{
    fire.auth().onAuthStateChanged(user=>{
      if(user){
        clearInputs();
        setUser(user);
      }else{
        setUser("")
      }
    })
  }

  useEffect(()=>{
    authListener();
  },[])

 


  const renderProducts=()=>(
    <>
      <h1 className={styles.cart_header}>Products</h1>
      
      {products.map((product,index)=>(
              
              <div className={styles.div_cont} key={index}>
                <div className={styles.inside_div} key={index} >
                  < img width="600px"  src={product.image} alt={product.name}/>
                  <h1>{product.name}</h1>
                  <h1>{product.price}</h1>
                  <button type="button" className="btn btn-lg btn-primary" onClick={()=>addToCart(product)} className={styles.inside_btn}>Add to cart</button>
            </div> 
      </div> 
      ))}
    </>
  )


  const renderCart=()=>(
    <>
    <h1 className={styles.cart_header}>Cart</h1>
      
      {cart.map((product,index)=>(
              
              <div className={styles.div_cont} key={index}>
                
                <div className={styles.inside_div} key={index} >
                
                  < img width="600px"  src={product.image} alt={product.name}/>
                  <h1>{product.name}</h1>
                  <h1>{product.price}</h1>
                  <button onClick={()=>removeFromCart(product)} className={styles.inside_btn}>Remove</button>
                  <div>
                  <h1>Test_REDUX_Counter : {counter} </h1>
                  <div className="d-grid gap-2 col-1 mx-auto">
                    <button onClick={()=>dispatch(increment(5))}>+</button>
                    <button onClick={()=>dispatch(decrement())}>-</button>
                  </div>
        
                  {isLogged ? <h3>Valuable Information I Should't See </h3> : " "}
                </div>
            </div> 
      </div> 
      ))}
    </>
  )

  


  const counter=useSelector(state=>{
    return state.counter
  })
  const isLogged= useSelector(state=>{
    return state.isLogged
  })

  const dispatch=useDispatch();




  return (
    <div className="App">
      
      {user ?(
        <>
          <header>
            
            <ThemeHeader/>
            
            <div className="d-grid gap-5 d-md-flex justify-content-md-end  d-inline-flex p-2 ">
              <button type="button" className="btn btn-primary me-md-2 text-light d-flex align-items-center " className={styles.topButton} onClick={()=>navigateTo(PAGE_CART)} >Go to Cart({cart.length})</button>
              <button type="button" className="btn btn-primary me-md-2 text-light d-flex align-items-center " className={styles.topButton} onClick={()=>navigateTo(PAGE_PRODUCTS)}>View Products</button>
              <button type="button" className="btn btn-primary me-md-2 text-light d-flex align-items-center " className={styles.topButton} onClick={()=>{
                return setShowMembers(!showMembers)
              }} className={styles.head_butt, styles.topButton}>Show Top Members Listing</button>
            </div>
            
        <section className={styles.hero}> 

            <div className="mb-3 row " className={styles.container}>
              <label htmlFor="inputPassword" className="col-sm-5 col-form-label text-danger">Enter Your Name</label>
              <div className="col-sm-10">
                <input type="text" className={styles.form_control} id="inputPassword" value={name} onChange={e=>setName(e.target.value)}/>
              </div>
            </div>
            <nav>
                
                <h2>Welcome to dashboard <br/> {name}</h2>
                {showMembers?<div>
                  <PersonList/> <PersonInput/>
                </div> :null}
                
                <button type="button" className="btn btn-primary btn-sm btn-danger " className={styles.logOutButton} onClick={handleLogout}>LogOut</button>
            </nav>





            {/* Example Of Custom Hook */}
            {/* <form >
              <label>
                Enter Your Name 
              </label>
              <input type="text" value={name} onChange={e=>setName(e.target.value)}/>
            </form> */}

            {/*  */}


        
           

            {page===PAGE_PRODUCTS && renderProducts()}
            {page===PAGE_CART && renderCart()}
        </section>
        
    </header>  
       
        
        </>
        
      ):(
        <Login email={email}
       setEmail={setEmail}
        password={password}
         setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
         />
      )}
      
         
    </div>
    
  );
}

export default App;
