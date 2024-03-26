import React from "react";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import WhatsAppButton from "@/components/Whatsup";
import PopForm from "./Comps/PopForm";

// const pagesnothaveheader = ["/dashboard"]
// const pagesnothavefooter = ["/dashboard"]
const Layout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      {!pathname.startsWith("/adminportal") &&
        !pathname.startsWith("/leads") &&
        !pathname.startsWith("/ads/thankupageisbr") &&
        !pathname.startsWith("/ads/isbr") &&
        !pathname.startsWith("/edufest/2023") &&
        !pathname.startsWith("/counsellorportal") &&
        !pathname.startsWith("/collegeportal") && 
        !pathname.startsWith("/ads/mbaleads") && 

     <Topbar />}
     {!pathname.startsWith("/adminportal") &&
     !pathname.startsWith("/collegeportal") &&
     !pathname.startsWith("/counsellorportal") &&
     !pathname.startsWith("/ads/mbaleads") && 

     <PopForm/>}

      <WhatsAppButton />

      {children}
      {!pathname.startsWith("/dashboard") &&
        !pathname.startsWith("/adminportal") &&
        !pathname.startsWith("/leads") &&
        !pathname.startsWith("/ads/thankupageisbr") &&
        !pathname.startsWith("/ads/isbr") &&
        !pathname.startsWith("/collegeportal") &&
        !pathname.startsWith("/counsellorportal") &&
        !pathname.startsWith("/ads/mbaleads") && 
        <Footer />}
    </>
  );
};

export default Layout;
