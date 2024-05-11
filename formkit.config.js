import { generateClasses } from "@formkit/themes"

const config = {
   config :{
      classes: generateClasses({
         global:{
            label:"text-lg block font-bold text-gray-700",
            input:"w-full border border-gray-300 rounded-md px-3 py-2   focus:outline-none focus:border-blue-500 shadow-sm",
            wrapper:"space-y-2 mb-3",
            message:"mb-5 font-semibold text-red-500",
         },
         file:{
            noFiles: "block my-2",
            fileItem: "hidden",
         },
         submit:{
            input:"$reset bg-indigo-800 hover:bg-indigo-700 text-white font-bold p-2 rounded uppercase w-full",
         }
      })
   }
}

export default config