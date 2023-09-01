import React from 'react'
import { 
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatearFecha } from '../helpers'
import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'

//Creando el diccionario de Iconos
const diccionarioIconos = {
    ahorro : IconoAhorro,
    comida : IconoComida,
    casa :  IconoCasa,
    gastos : IconoGastos,
    ocio : IconoOcio,
    salud : IconoSalud,
    suscripciones : IconoSuscripciones
}

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {
    //Haciendo destructuring
    const {categoria, nombre, cantidad, id, fecha} = gasto

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={()=> setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => ( /* usamos los () en vez de los {} con el return */
        <TrailingActions>
            <SwipeAction 
                onClick={()=> eliminarGasto(id)}
                destructive={true} //destructuve ayuda a tener una transicion mejor al eliminar
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

  return (
    <SwipeableList> 
        <SwipeableListItem
            /* ponemos estos 2 tags para que funcione el swipe del gasto, a eso tambien se le agrego 2 funciones  */
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
            <div className='gasto sombra'>
                <div className='contenido-gasto'>
                    <img 
                    src={diccionarioIconos[categoria]} //aqui es como si tuvieramos diccionarioAhorros['salud'], lo que se hace con los [] es que se crea una variable dinamicamente
                    alt="icono gasto"
                    
                    />
                    <div className='descripcion-gasto'>
                        <p className='categoria'>{categoria}</p>
                        <p className='nombre-gasto'>{nombre}</p>
                        <p className='fecha-gasto'>
                            Agregado el: {''}
                            <span>{formatearFecha(fecha)}</span>
                        </p>
                    </div>
                </div>
                <p className='cantidad-gasto'>${cantidad}</p>
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto