import { nexSubject } from "@/components/types";
import { motion } from "framer-motion";
import Card0 from "./items/card0";
import { GrFavorite } from "react-icons/gr";
import { GiWorld } from "react-icons/gi";
import { useMemo } from "react";

export default function Notes({
  dataset,
  favarites,
}: {
  dataset: nexSubject[];
  favarites: { id: string }[];
}) {
  // Convert favorites to a Set for faster lookup
  const favSet = useMemo(
    () => new Set(favarites.map((f) => f.id)),
    [favarites]
  );

  // Separate favorites and suggestions
  const { fav_dataset, suggestion_dataset } = useMemo(() => {
    const fav_dataset: nexSubject[] = [];
    const suggestion_dataset: nexSubject[] = [];

    dataset.forEach((item) => {
      if (favSet.has(item.id)) {
        fav_dataset.push(item);
      } else {
        suggestion_dataset.push(item);
      }
    });

    return { fav_dataset, suggestion_dataset };
  }, [dataset, favSet]);

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
      </div>

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
