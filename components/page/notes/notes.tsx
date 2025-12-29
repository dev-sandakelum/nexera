import { nexSubject, Subject } from "@/components/types";
import { motion } from "framer-motion";
import Card0 from "./items/card0";
import { GrFavorite } from "react-icons/gr";
import { GiWorld } from "react-icons/gi";

export default function Notes({
  dataset,
  favarites,
}: {
  dataset: nexSubject[];
  favarites: { id: string }[];
}) {
  const fav_dataset: nexSubject[] = [];
  const suggestion_dataset: nexSubject[] = [];

  dataset.forEach((item) => {
    if (favarites.find((fav) => fav.id === item.id)) {
      fav_dataset.push(item);
    } else {
      suggestion_dataset.push(item);
    }
  });
  
  return (
    <div className="noteContainer">
      <div className="favorites">
        <motion.div
          className="header"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <GrFavorite />
          <span> Favorites</span>
        </motion.div>
        <Card0 dataset={fav_dataset} type="favorites" />
      </div>{" "}
      <div className="suggestions">
        <motion.div
          className="header"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <GiWorld />
          <span> Suggestions</span>
        </motion.div>
        <Card0 dataset={suggestion_dataset} type="Suggestions" />
      </div>
    </div>
  );
}
