import React from 'react'
import Gasto from './Gasto'
const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados}) => {
  return (
    <div className='listado-gastos contenedor'>

        {filtro ? (
            <> 
                <h2>{gastosFiltrados.length ? 'Gastos' : 'No Hay Gastos en esta Categoria'}</h2>
                    {gastosFiltrados.map(gasto => ( //si hay un filtro definido itera sobre los gastosFiltrados, de otra manera itera sobre todos los gastos
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
            </>
        ):  (
                <>
                    <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos Aun'}</h2>
                    {gastos.map(gasto => ( //mandando llamar al componente con los (), ya que lo vamos a imprimir, por eso no pusimos las {} en el arrow funcion, o bien podemos poner las llaves {} pero debe ir un return al lado de Gasto ej. return <Gasto
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
                </>
            )
        }
    </div>
  )
}

export default ListadoGastos