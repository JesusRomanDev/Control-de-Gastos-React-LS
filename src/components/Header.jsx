import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"

const Header = ( {presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos}) => { /* extraemos los props */
  return (
    <header>
        <h1>Planificador de Gastos</h1>
        {isValidPresupuesto ? ( //ternario que revisa isValidPresupuesto, si es valido muestra el siguiente componente, sino, muestra el formulario inicial
            <ControlPresupuesto 
            presupuesto={presupuesto}
            gastos={gastos}
            />
        ) : (
            <NuevoPresupuesto 
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}

            setIsValidPresupuesto={setIsValidPresupuesto}
        />
        )}
    </header>
  )
}

export default Header