//Hay que exportar esto a App.jsx y ponerlo antes de que se cree el objeto en el arreglo
export const generarId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    return random + fecha
}

//Hay que importarla en Gasto.jsx
export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha);
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return fechaNueva.toLocaleDateString('es-Es', opciones)
}