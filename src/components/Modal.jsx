import { useState, useEffect } from 'react';
import CerrarBtn from '../img/cerrar.svg' //para la imagen
import Mensaje from './Mensaje';

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');
    const [id, setId] = useState('');

    const [mensaje, setMensaje] = useState('');

    //useEffect para que cuando le demos swipe a algun gasto en editar, me llene los campos en el modal
    useEffect(()=> {
        if(Object.keys(gastoEditar).length > 0){ //si gastoEditar viene vacio es un registro nuevo
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id)
        }
    },[])

    const ocultarModal = () => {
        setTimeout(() => {
            setModal(false); //tomando los props del padre (App) podemos decir que cuando da click el state cambie a false y se esconda la ventana modal, le agregamos un setTimeOut para que se vea bien la transicion al esconderse
        }, 500); //entonces la pantalla negra tomara medio segundo en irse, mientras que el formulario se va inmediatamente con su transicion del css, entonces en el orden, se va primero el formulario, luego de medio segundo se va la pantalla negra
        setAnimarModal(false); //regresandolo a false porque solo no puede, y asi cuando volvamos a dar click, nos muestres esa transicion de la animacion
        setGastoEditar({}) //Para resetear al objeto y dejarlo vacio cuando cerremos la pantalla negra 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('');
            }, 2000);
            return;
        }

        //Si pasa la validacion, creame el objeto
        guardarGasto({nombre, cantidad, categoria, fecha, id})
        //Hay que pasar este Objeto al App.jsx
    }
  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
            src={CerrarBtn} 
            alt="cerrar-modal" 
            onClick={ocultarModal} //si das click en la X ejecutame la funcion cerrarModal
            />
        </div>

        {/* AQUI ENTRA EL ANIMAR MODAL QUE MUESTRA TODAS LAS PARTES DEL FORMULARIO */}

        {/* el siguiente form es en el que en base al state de animacion lo vamos a agregar o quitar, ahora bien, animarModal abajo va a estar como un ternario, si animalModal es true entonces AGREGAME LA CLASE DE ANIMAR, sino agregale el de cerrar, que lo que hace es esconder el formulario*/}
        <form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : 'cerrar' }`}> 
            <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend> {/* el codigo nos sirve para que si hay un nombre en gastoEditar ponme Editar Gasto de titulo, caso contrario seria un nuevo gasto */}
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>

                <input 
                    id='nombre'
                    type="text" 
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder='Añade el Nombre del Gasto'
                />
            </div>

            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>

                <input 
                    id='cantidad'
                    type="number" 
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                    placeholder='Añade la cantidad del gasto ej. 300'
                />
            </div>

            <div className='campo'>
                <label htmlFor="categoria">Categoria</label>

                <select
                    id="categoria"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                >
                    <option value="">--Seleccione--</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>

                </select>
            </div>

            <input 
                type="submit" 
                value={gastoEditar.nombre ? 'Editar Gasto' : 'Añadir Gasto'}
            />
        </form>
    </div>
  )
}

export default Modal