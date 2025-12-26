import { Note_dataSet, Note_Item } from "@/components/types";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HiDotsVertical } from "react-icons/hi";
import Card0 from "./items/card0";
import { MdFavorite } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";
import { GiWorld } from "react-icons/gi";

export default function Notes({
  datasetA,
  datasetB,
}: {
  datasetA: Note_Item;
  datasetB: Note_Item;
}) {
  const pathname = usePathname();
  const params = useSearchParams();
  const { replace } = useRouter();
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
    replace(`${pathname}?${param.toString()}`, { scroll: false });
  }
  const currentRoute = params.get("u");

  

  return (
    <div className="container">
      <div className="favorites">
        <div className="header"><GrFavorite /><span> Favorites</span></div>
        <Card0 dataset={datasetA} type="favorites" />
        
      </div>{" "}
      <div className="suggestions">
        <div className="header"><GiWorld /><span> Suggestions</span></div>
        <Card0 dataset={datasetB} type="Suggestions" />
      </div>
    </div>
  );
}
