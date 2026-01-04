"use client";
import { nexSubject } from "@/components/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiDotsVertical } from "react-icons/hi";

export default function Card0({ dataset }: { dataset: nexSubject[]}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 16,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };
  

  return (
    <motion.div
      className="objects"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {dataset.map((item) => (
        <motion.div
          className="object"
          key={item.id}
          variants={itemVariants}
          whileTap={{
            scale: 0.98,
            transition: { duration: 0.08 },
          }}
        >
          <div className="fg">
            <div className="info">
              <p className="title">{item.title}</p>
              <p className="description">{item.description}</p>
              <Link href={ "/Notes/"+item.slug} className="openLink"
              >
                Open {">>"}
              </Link>
            </div>
            <div className="btn">
              <HiDotsVertical />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
