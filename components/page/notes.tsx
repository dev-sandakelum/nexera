import Image from "next/image";
import { motion } from "framer-motion";
import Card1 from "./notes/items/card1";
import { Testdataset } from "@/public/json/dataset";

export default function Notes() {
  
  return (
    <motion.div 
      className="NotesPage"
      initial="hidden"
      animate="visible"
    >
      {Testdataset.map((category, idx) => (
        
        <motion.div 
          key={category.catogory}
        >
          <motion.h1 
            className="catogory"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            {category.catogory}
          </motion.h1>
          <motion.div 
            className="topic"
          >
            {category.data.map((item ,idx2) => (
              <motion.div
                key={item.ID}
                
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: ((idx * category.data.length) + idx2) * 0.1  , duration: 0.4 }}
              >
                <Card1 data={item} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
