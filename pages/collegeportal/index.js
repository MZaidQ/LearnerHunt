import React from "react";
import PortalLogin from "../../components/CRM/Portallogin";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Index() {
  const router = useRouter();

  useEffect(() => {

      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/user/check-status", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("ct")}`
          }
      }).then(async(response) => {
        var res =await response.json()
        // console.log(res)
        if(res.status){
          if(sessionStorage.getItem("selectedPath")){
            
          window.location.href = `${sessionStorage.getItem("selectedPath")}`
        }else{
            window.location.href = "/collegeportal/my-kyc"

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
     
     <></>
  );
}
export default Index;