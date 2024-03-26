import React from "react";
import PortalLogin from "../../components/CRM/Portallogin";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Index() {
  const router = useRouter();

  useEffect(() => {

      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/check-status", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("pt")}`
          }
      }).then(async(response) => {
        var res =await response.json()
        // console.log(res)
        if(res.status){
          if(sessionStorage.getItem("selectedPath")){
            
          window.location.href = `${sessionStorage.getItem("selectedPath")}`
        }else{
            window.location.href = "/adminportal/dashboard"

          }
        }
        // if (response.ok) {
        //   // console.log("hello", response.data);
        //   Swal.fire({
        //     title: 'Success',
        //     text: `${res.message}`,
        //     icon: 'success',
        //     confirmButtonText: 'Ok'
        //   }).then(()=>{
        //   props.onLogin(res.data.token)
          
        //   })
        //   // router.push('/thankyou')
        // } else {
        //   Swal.fire({
        //     title: 'error',
        //     text: `${res.error}`,
        //     icon: 'error',
        //     confirmButtonText: 'Ok'
        //   })
        // }
      });

  }, [])
  
  return (
     
        <PortalLogin
          onLogin={(pt,role,name) => {
            // console.log(pt,role,name)
            localStorage.setItem("pt", pt);
            localStorage.setItem("crmrole", role);
            localStorage.setItem('admincrmemail',name);
            router.push("/adminportal/dashboard");
          }}
        />
  );
}
export default Index;