import { useState, useEffect } from "react";
import Link from "next/link";
import Classes from  "/styles/portaldashboard.module.css";
export default function SidebarItem({ item, setSelectedItem, selected }) {
  const [open, setOpen] = useState(false);
  const handleItemClick = (e,item) => {
    e.stopPropagation()
      // console.log(item);
      if (!item.children) {
      setSelectedItem(item.name);
      sessionStorage.setItem("selectedPage", item.name);
      sessionStorage.setItem("selectedPath", item.path);

      setOpen(false);
    }else{
      setOpen(!open);
    }
  };

  // useEffect(()=>{
  //   if(item.name ==  sessionStorage.getItem("selectedPage")){
  //     setOpen(true)
  //     setSelectedItem(item.name)
  //   }
  // },[])

  if (item.children) {
    return (
      <div
        className={`${Classes["sidebar-item"]} ${open ? Classes.open : ""}`}
        onClick={(e) => handleItemClick(e,item)}
      >
        <div className={Classes["sidebar-title"]}>
          <span>
            {item.icon}
            <span style={{ paddingLeft: "0.3rem" }}>{item.name} </span>
          </span>
          <i className={`bi-chevron-down ${Classes["toggle-btn"]}`}></i>
        </div>
        <div className={Classes["sidebar-content"]}>
          {item.children.map((child, index) => (
            <SidebarItem
              key={index}
              item={child}
              setSelectedItem={setSelectedItem}
              selected={selected}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Link
      href={item.path || "#"}
        onClick={(e) => handleItemClick(e,item)}
        className={`${Classes["sidebar-item"]} ${Classes.plain} ${
          selected === item.name ? Classes.selected : ""
        }`}
      >
        {item.icon}
        <span style={{ paddingLeft: "0.3rem" }}>{item.name} </span>
      </Link>
    );
  }
}
