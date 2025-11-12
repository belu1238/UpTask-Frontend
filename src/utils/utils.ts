export const formatDate = (isoString: string) : string => { // toma una fecha como isoString y devuelve un string formateado
    const date = new Date(isoString) // convierte el string a un objeto Date
    const formatter = new Intl.DateTimeFormat('es-ES', { // para tenerlo en español
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    return formatter.format(date)
}