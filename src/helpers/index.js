// esta función se encarga de formatear la moneda con la cantidad como parámetro 
export const formatCurrency = amount => Number(amount).toLocaleString('en-US',  { // Definimos una función para formatear la moneda con la cantidad como parámetro 
   style: 'currency', // Definimos el estilo como moneda
   currency: 'USD' // Definimos la moneda como USD
 })
 
 