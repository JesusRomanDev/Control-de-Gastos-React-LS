//Agregando un useEffect por los cambios que hayan en gastos
import { useState, useEffect } from "react"
//Importar Dependencia Progress Bar y Hoja de Estilos
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto, gastos}) => {
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const[porcentaje, setPorcentaje] = useState(0) //para la grafica
    useEffect(()=> {
        const totalGastado = gastos.reduce((total, gasto) =>{
            return gasto.cantidad + total
        },0)
        console.log(totalGastado)
        const totalDisponible = presupuesto - totalGastado
        //Calcular porcentaje para la Barra de Progreso gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible)/ presupuesto) * 100).toFixed(2);
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);
        
        setGastado(totalGastado)
        setDisponible(totalDisponible)
    },[gastos])
    //Funcion para formatear el presupuesto a un currency de USA
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar 
            styles={buildStyles({
                pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                trailColor: '#F5F5F5',
                textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
            })} //sera una funcion con un objeto dentro
                value={porcentaje} //este valor se tiene que actualizar en base a un State
                text={`${porcentaje}% Gastado`} //texto de la grafica
            />
        </div>
        <div className="contenido-presupuesto">
            <p>
                <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
            </p>

            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible:</span> {formatearCantidad(disponible)}
            </p>

            <p>
                <span>Gastado:</span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto