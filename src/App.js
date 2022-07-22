



import {useState, useEffect} from "react";
import './App.css';
import { Button, Spinner, Image, Skeleton, Input } from '@chakra-ui/react'
import Card from "./components/Card";
import Navbar from "./components/Navbar";{/*se importa el Navbar del archivo Navbar*/}
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Detalle from "./components/Detalle";
import ListaCasas from "./components/ListaCasas";
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";


function App() {
  // const [valor,setValor]=useState(valorInicial)
  const [show,setShow]=useState(true) //esta activado el spinner
  const [data,setData]=useState([]) //esta activado el spinner
  const [dataCp,setdataCp]=useState([]) 
  const [search, setSearch]=useState("");
  //useEffect -->useEffect(()=>{}) estructura mas basica, hace referencia a cargar el componente en la pagina
  //Si queremos que se ejecute en cada re-renderizado
  //useEffect(()=>{
  //  console.log("soy el useEffect");
  //});

//con este vamos a hacer nuestras peticiones GET.. la , y el corchete hacen la diferencia
//solo una vez al montarse en nuestra App; me va a ayudar a conectar con el Back
  

useEffect(()=>{
    console.log("GET DATOS");
    fetch("https://ironbnb-m3.herokuapp.com/apartments")
    .then(datos=>{
      datos.json()
      .then(casas=>{
        console.log("Datos de las casas", casas) //estas casas deben guardarse en un useState
      setData(casas);
      setdataCp(casas);
      setShow(false);
      })
    })
  },[]);//esto tiene un costo economico


  
  const toggleShow =()=>{ //click al boton llamamos al toggle

    setShow(!show)
  }
 const actualizarInput = (e)=>{
   
   setSearch(e.target.value);   
 } ;
  







//.filter()
useEffect(()=>{console.log("se esta actualizando");
const dataFiltrada= dataCp.filter((casa)=>{
  return casa.title.toLowerCase().includes(search.toLowerCase());
});
setData(dataFiltrada);
},[search]);

  return (
    <Router> 
      <Navbar/> {/*se pega el Navbar*/}
      <Input placeholder ="Buscar propiedad" 
      value={search} 
      onChange={actualizarInput}/>
      <Routes>
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/casas/:di" element={<Detalle/>}/>
        <Route path="/" element={<ListaCasas data= {data}/>} />
      </Routes>

      
      
    </Router>
  );
}

export default App;
