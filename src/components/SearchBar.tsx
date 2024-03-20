import { motion } from "framer-motion";
import AutoCompleteSearchBar from "./AutoCompleteSearchBar";


export default function 
() {
  return (
    <div>
        <motion.div
      initial={{ scale: 0 }}
      animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
    >
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Search Anything!
          </h1>
          <div className="flex flex-center justify-center ">
          
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <AutoCompleteSearchBar />
          </div>

        

          
          
        </div>
      </main>
    </motion.div>

      
    </div>
  )
}

