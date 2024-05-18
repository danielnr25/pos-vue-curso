import { ref, computed } from 'vue'
import { useFirebaseStorage } from 'vuefire'
import { uid } from 'uid'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export default function useImage() {

   const storage = useFirebaseStorage()
   const url = ref(''); 

   const onFileChange = (e) => {
      const file = e.target.files[0]; // Obtenemos el archivo
      const filename = uid() + '.jpg' // Creamos un nombre de archivo único
      const sRef = storageRef(storage, '/products/' + filename); // Creamos una referencia al archivo

      const uploadTask = uploadBytesResumable(sRef, file); // Subimos el archivo

      uploadTask.on('state_changed',
         () => {
            
         },
         (error) => { console.log(error); },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               url.value = downloadURL
         });
      });

  };

  const urlComputed = computed(() =>  // Creamos una referencia computada a la URL
    {
      return url.value ? url.value : null
    }  
  ); 

  return {
    url,
    urlComputed, // Referencia computada a la URL
    onFileChange, // Función que se ejecuta cuando cambia el archivo
  };
}