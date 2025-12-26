import { Note_Item } from "@/components/types";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { HiDotsVertical } from "react-icons/hi";

export default function Card0({ dataset ,type}: { dataset: Note_Item , type?: string}) {
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
  const params = useSearchParams();
  const pathname = "/";
  const router = useRouter();
  function handleRoute(term: string, type?: string) {
    const param = new URLSearchParams(params);
    if (term) {
      if (type) {
        param.set("t", type);
      }
      param.set("u", term);
    } else {
      param.delete("t");
      param.delete("u");
    }
    router.replace(`${pathname}?${param.toString()}`, {
      scroll: false,
    });
  }

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
              <button
                onClick={() => {
                  handleRoute(item.id, type ?? "favorites");
                }}
              >
                Open {">>"}
              </button>
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
