import { useState, useEffect } from 'react'

import Header from './components/Header'
//Importando el Icono
import IconoNuevoGasto from './img/nuevo-gasto.svg'

import Modal from './components/Modal';
import { generarId } from './helpers'; //estas si llevan {} porque es un export normal, no el export default
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0) //el valor inicial sera LocalStorage y si no existe ese presupuesto iniciara en 0

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false); //valor inicial falso debido a que la primera vez que cargue la aplicacion estara en 0 el presupuesto, este state nos servira para cuando le demos submit y tengamos un presupuesto valido, asi nos desplegara el modal para ver la pestaña con todos los datos

  //Registrando un nuevo state para el modal
  const [modal, setModal] = useState(false)

  //Registrando un nuevo state para la Animacion
  const [animarModal, setAnimarModal] = useState(false);

  //Agregando el Gastos que viene de Modal
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []) 
    //si existe gastos entonces colocame el json.parse, de otra manera ponme un array vacio en el state
    //estos tambien los tenemos que pasar a ControlPresupuesto, primero pasando por el Header

  //Agregando el useState para cuando se le de Swipe y pasandolo a ListadoGastos.jsx y luego a Gasto.jsx, tambien al Modal para cuando reiniciemos el state
  const [gastoEditar, setGastoEditar] = useState({})

  //Definiendo un nuevo State para los Filtros
  const [filtro, setFiltro] = useState('');
  //Creando un nuevo state para que al momento de filtrar nos traiga en el html esos elementos
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  //Colocando un useEffect para cuando se de swipe y escuche cuando cambia gastoEditar
  useEffect(()=>{
    //Verificando que gastoEditar tenga algo
    if(Object.keys(gastoEditar).length > 0){
      //Copiamos el codigo de abajo (handleNuevoGasto), salvo que ahora quitaremos la linea donde dice que estara vacio
      setModal(true);
      // setGastoEditar({})
      setTimeout(() => {
        setAnimarModal(true)
      }, 500); //llamando al modal para que se edite mostrandonos la pantalla negra y el formulario
    }
  },[gastoEditar])

  //Colocando useEffect para el LocalStorage 
  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto]) //useEffect para cuando el presupuesto cambie

  //Colocando un segundo useEffect PARA EL LOCALSTORAGE para que... SI YA HAY UN PRESUPUESTO NOS MUESTRE LA PANTALLA DE Control Presupuesto directamente y no la de Inicio donde ponemos cuanto presupuesto tenemos, suena logico porque no queremos que SI YA TENEMOS UN PRESUPUESTO, AL CARGAR NOS VUELVA A MOSTRAR ESA PANTALLA DONDE TENEMOS QUE DARLE AÑADIR PRESUPUESTO A LO QUE YA ESTA
  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true) //muestra la pantalla Control Presupuesto
    }
  },[])

  //Colocando un useEffect para los gatos que se usaran luego para el LocalStorage
  useEffect(() =>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  //useEffect para los filtros
  useEffect(()=>{
    //Filtrar gastos por categoria
    if(filtro){ //si hay algo en el filtro
      console.log('filtrando...', filtro) //entonces por ejemplo si seleccionamos suscripciones, nos imprimira: filtrando... suscripciones
    const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro) //ira iterando en todas las opciones de categoria y traeme la que sea igual al filtro que seleccionamos
    console.log(gastosFiltrados);
    setGastosFiltrados(gastosFiltrados);
    }
  },[filtro])

  const handleNuevoGasto = () => {
    //Nota: setModal es la pantalla negra(el fondo negro-gris) y setAnimarModal es el formulario con todos los campos
    setModal(true);
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  //Este lo pasamos al Modal
  const guardarGasto = (gasto) => {
    if(gasto.id){
      //Actualizar
      const gastosActualizados = gastos.map(gastoState => {
        return gastoState.id === gasto.id ? gasto : gastoState //retorname esto a gastosActualizados
      })
      setGastos(gastosActualizados)
      setGastoEditar({}) //reiniciando el objeto
    }else{
      //Nuevo Gasto
      gasto.id= generarId(); //le agregamos el id con la funcion que esta en helpers
      gasto.fecha = Date.now();
      setGastos([...gastos,gasto])
    }

    
    //El codigo de abajo para que cuando se de click se quite el modal con el fondo negro y el formulario
    setAnimarModal(false)
    setTimeout(() => {
        setModal(false)
    }, 500);
  }

  const eliminarGasto = (id)=>{
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)

    setGastos(gastosActualizados);
  }
  return (
    <>
      <div className={modal ? 'fijar' : ''}> {/* cuando modal este en true agrega la clase fijar, esto es para que ocupe toda la pantalla, la pantalla negra del modal y no solo se quede a medias cuando queremos agregar un gasto teniendo ya gastos abajo */}
        <Header //agregando el componente Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        />

        {/* Este codigo para la imagen, lo pusimos aqui en el app porque en el Header solo ocupa una pequeña parte, en cambio en la App se ve que ocupa todo el body y esta imagen va en la parte inferior derecha  */}
        {isValidPresupuesto && ( //si isValidPresupuesto es valido/true ejecuta este codigo, osease que se muestre el "+" en la pantalla
          <>
            <main>
              <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}

              />
              <ListadoGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
              />
            </main>
            <div className='nuevo-gasto'>
              <img
                src={IconoNuevoGasto}
                alt='icono nuevo gasto'
                onClick={handleNuevoGasto}
              />
            </div>
          </>  
        )}

        {modal &&  //si modal cambia a true muestrame el siguiente componente (Modal)
        <Modal 
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
        />}
      </div>
    </>
  )
}

export default App
