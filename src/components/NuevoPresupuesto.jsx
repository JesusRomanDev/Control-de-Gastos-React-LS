import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {
    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault();
        if(!presupuesto || presupuesto < 0){ /* si esta vacio(porque el state inicial es '') o si el numero de presupuesto es menor que 0*/
            setMensaje('No es un presupuesto valido') //children(Mensaje.jsx) sera todo el argumento que estamos seteando para mensaje mas abajo
            //entonces aqui ya vemos que MENSAJE YA TIENE ALGO, POR LO TANTO PODEMOS USAR LA VARIABLE MAS ABAJO PARA MOSTRAR EL MENSAJE

            return //para que ya no se ejecute lo de abajo
        }
        setMensaje(''); //en caso de que sea valido y llegue a esta linea se elimina la alerta previa
        setIsValidPresupuesto(true); //cambia el state a true ya que le hayamos dado click a añadir y sea un presupuesto valido

  }  
  return (
    <div className="contenedor-presupuesto contenedor sombra">

        <form className="formulario" onSubmit={handlePresupuesto}> {/* onSubmit para validar con la funcion handlePresup..
        entonces cuando se presione el boton de submit se va a ejecutar esa funcion */}
            <div className="campo">
                <label htmlFor="">Definir Presupuesto</label>

                <input 
                    className="nuevo-presupuesto"
                    type="number" //para que solo sean numeros 
                    placeholder="Añade tu Presupuesto"
                    value={presupuesto} //su valor inicial sera 0
                    onChange={(e)=> setPresupuesto(Number(e.target.value))} //cada que escribamos se ira cambiando en la variable de setPresupuesto que esta en el App.jsx Nota: le pasamos el e, el evento
                />
            </div>

            <input 
            value="Añadir"
            type="submit" 
            />

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>} {/* mensaje && significa que muestre ese componente si la condicion se cumple, en este caso parece que si mensaje tiene algo, ejecuta el componente Mensaje.jsx 
            Nota: pusimos apertura y cierre porque tenemos UN CHILDREN y por props tenemos un tipo error*/}
        </form>
    </div>
  )
}

export default NuevoPresupuesto