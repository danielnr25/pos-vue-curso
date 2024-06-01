// esta función se encarga de formatear la moneda con la cantidad como parámetro 
export const formatCurrency = amount => Number(amount).toLocaleString('en-US',  { // Definimos una función para formatear la moneda con la cantidad como parámetro 
   style: 'currency', // Definimos el estilo como moneda
   currency: 'USD' // Definimos la moneda como USD
 })


 export const getCurrentDate = () =>{
   const date = new Date();
   const day = date.getDate().toString().padStart(2,'0');
   const month = (date.getMonth()+1).toString().padStart(2,'0');
   const year = date.getFullYear();
   return `${day}/${month}/${year}`;

}
 
 