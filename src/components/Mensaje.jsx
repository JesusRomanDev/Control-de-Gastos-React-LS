

const Mensaje = ({children, tipo}) => {
  return (
    <div className={`alerta ${tipo}`}>{children}</div> /* el tipo puede ser error o correcto y children seria el mensaje */
  )
}

export default Mensaje