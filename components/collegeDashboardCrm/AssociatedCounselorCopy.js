// import React, { Component } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import Loading from "../Comps/Loading";
// import { Spinner } from "react-bootstrap";
// import Tablenav from "../Comps/Tablenav";
// import styles from "/styles/clgdb.module.css";
// import Switch from '@mui/material/Switch';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import ImageIcon from '@mui/icons-material/Image';
// import WorkIcon from '@mui/icons-material/Work';
// import BeachAccessIcon from '@mui/icons-material/BeachAccess';

// var oldData = []

// export default class AssociatedCounsellor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: false,
//       clgList: [],
//       isDataFound: false,
//       isApiHitComplete: false,
//       selectedCategory: [],
//       username: localStorage.getItem("username"),
//       statusAnchorEl: null,
//       lastrecid:"-1",
//       searchInput: "", // Search input
//       error:"",
//       approvalStatus: '',

//       // selectedAsset: null,
//     };
//   }

  

//  formatTimestamp(timestamp) {
//     const dateObject = new Date(timestamp);
  
//     const formattedTime = dateObject.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//     });
  
//     const formattedDate = dateObject.toLocaleDateString('en-US', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     });
  
//     return `${formattedTime}, ${formattedDate}`;
//   }

//   getAssetList() {
//     try {
//     this.setState({ isApiHitComplete: false, isDataFound: false });
//     fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/college/assoc-counsellor`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("ct")}`,
//       },
//     }).then(async (res) => {
//         if (res.ok) {

//         // console.log(res)
//       let response = await res.json();
//     //   console.log(response.data);
//       if (response.data.length > 0) {
//         this.setState({ clgList: response.data, isDataFound: true });
//       }
//       oldData=response.data

//     }else{
//       let response = await res.json();
//         this.setState({error:response.error})
//     }
//     this.setState({ isApiHitComplete: true });

//     });
// }catch (error) {
//     console.error(error);
//   }
//   }

//   componentDidMount() {
//     this.getAssetList();
//   }
//   handleSearchChange = (e) => {
//     this.setState({searchInput:e.target.value})
//     const searchTerm = e.target.value.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
//     const searchKeyword = new RegExp(`\\b${searchTerm}\\w*\\b`, 'i');

//     if (e.target.value == '') {
//       this.setState({ clgList: oldData })
//       if (oldData.length > 0) {
//           this.setState({ isDataFound: true })
//       } else {
//           this.setState({ isDataFound: false })
//       }
//   } else {
//     const filteredData = oldData.filter(data =>
//       searchKeyword.test(data.full_name.toLowerCase())
     

//   );

//   if (filteredData.length > 0) {
//       this.setState({ clgList: filteredData, isDataFound: true });
//   } else {

//       this.setState({ isDataFound: false });
//   }
//   }
//   };

//   handleApprovalChange = (e,clg) => {
//     // this.setState({ approvalStatus: e.target.value });
//     // console.log(e.target.checked,e.target.value)
//     const s =  e.target.checked?"1":"0"
//     this.setState({isLoading:true})
    
//     fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/college/verify-clg-counsellor?id=${clg._id}&s=${s}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("ct")}`,
//         },
//         method: "PUT",
//       }).then(async (response) => {
//         var res = await response.json();
//         // console.log(res);
//         this.setState({isLoading:false})
//         // setIsLoading(false);
//         if (response.ok) {
     
//           Swal.fire({
//             title: "Success",
//             text: `${res.message}`,
//             icon: "success",
//             confirmButtonText: "Ok",
//           }).then(() => {
//             this.getAssetList();
       
//           });
//         } else {
//           Swal.fire({
//             title: "error",
//             text: `${res.error}`,
//             icon: "error",
//             confirmButtonText: "Ok",
//           }).then(() => {
//             this.setState({isLoading:false})

//           });
//         }
//       });


   
//   };
//   render() {
//     return (
//       <>
//           {/* <div className={styles["basic-details"]}>

// {this.state.error =="" ?
// <>
//         <Tablenav
//           Actions={{
//             Actions: (
//               <input
//             type="text"
//             className="form-control"
//             value={this.state.searchInput}
//             placeholder="Search..."
//             onChange={this.handleSearchChange}
//           />
//             ),
//           }}
//         />
//         {this.state.isApiHitComplete ? (
//           this.state.isDataFound ? (
//             <table className={`table table-hover custom-table`}>
//               <thead>
//                 <tr>
//                   <th style={{ background: "var(--primary)" }}>Name</th>
//                   <th style={{ background: "var(--primary)" }}>Mobile Number</th>
//                   <th style={{ background: "var(--primary)" }}>Email</th>
//                   <th style={{ background: "var(--primary)" }}>Experence in year</th>
//                   <th style={{ background: "var(--primary)" }}>Date</th>
//                   <th style={{ background: "var(--primary)" }}>Verified</th>

//                 </tr>
//               </thead>
//               <tbody>
//                 {this.state.clgList.map((clg, i) => {
//                   return (
                    
//                       <tr key={i}>
//                         <td>{clg.name}</td>
//                         <td>{clg.mobile}</td>
//                         <td>{clg.email}</td>
//                         <td>{clg.experience_in_year}</td>
//                         <td>{this.formatTimestamp(clg.createdAt)}</td>
//                         <td>
//               <div>
//               <Switch  value={clg.verified} defaultChecked={clg.verified} onChange={(e)=>this.handleApprovalChange(e,clg)} />
//               </div>
//             </td>



//                       </tr>
                    
//                   );
//                 })}
//               </tbody>
//             </table>
//           ) : (
//             <div style={{ display: "flex", width: "100%", height: 'inherit', justifyContent: "center", alignItems: 'center' }}>
//             <div style={{ fontWeight: "500" }}>
//               <span style={{ color: "#0d6efd", cursor: 'pointer' }}> No Records Yet </span>
//             </div>
//           </div>
//           )
//         ) : (
//              <div style={{ display: "flex", width: "100%", height: 'inherit', justifyContent: "center", alignItems: 'center' }}>
//               <Spinner animation="border" role="status" variant="info">
//                 <span className="visually-hidden">Loading...</span>
//               </Spinner>
//             </div>
//         )}
//         <Loading
//           show={this.state.isLoading}
//           onHide={() => this.setState({ isLoading: false })}
//         />
//     </>:this.state.error}
//       </div> */}
// <div className={styles["counsellor-list"]}>
// <Tablenav
//           Actions={{
//             Actions: (
//               <>
//               <input
//             type="text"
//             className="form-control"
//             value={this.state.searchInput}
//             placeholder="Search..."
//             onChange={this.handleSearchChange}
//           />
//           </>
//             ),
//           }}
//         />
// <List sx={{ width: '48%', maxWidth: 360, bgcolor: 'background.paper' }}>
// {this.state.clgList.map((clg, i) => {
//                   return (
//       <ListItem>
//            <Stack direction="row" spacing={2}>
//       <StyledBadge
//         overlap="circular"
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         variant="dot"
//       >
//         <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//       </StyledBadge>
//       <Badge
//         overlap="circular"
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         badgeContent={
//           <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//         }
//       >
//         <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
//       </Badge>
//     </Stack>
//       </ListItem>
//                   )
// })}
//     </List>
//     </div>
//       </>
//     );
//   }
// }

import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Comps/Loading";
import { Spinner } from "react-bootstrap";
import Tablenav from "../Comps/Tablenav";
import styles from "/styles/clgdb.module.css";
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import  React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const clgList = [
  { "name": "College A", "verified": true },
  { "name": "College B", "verified": false },
  { "name": "College C", "verified": true },
  { "name": "College D", "verified": false },
  { "name": "College E", "verified": true },
  { "name": "College f", "verified": false },
  { "name": "College g", "verified": true },
  { "name": "College h", "verified": false },
  { "name": "College i", "verified": true }
]
export default function AssociatedCounsellor() {
  const [isLoading, setIsLoading] = useState(false);
  // const [clgList, setClgList] = useState([]);
  const [verified,setVerified]= useState(false)
  const [isDataFound, setIsDataFound] = useState(false);
  const [isApiHitComplete, setIsApiHitComplete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [lastrecid, setLastrecid] = useState("-1");
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("");
  const [oldData, setOldData] = useState([]);


  


  // useEffect(() => {
  //   getAssetList();
  // }, []);

  // const getAssetList = async () => {
  //   setIsApiHitComplete(false);
  //   setIsDataFound(false);
  //   try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/college/assoc-counsellor`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("ct")}`,
  //       },
  //     });
  //     if (res.ok) {
  //       const response = await res.json();
  //       if (response.data.length > 0) {
  //         setClgList(response.data);
  //         setIsDataFound(true);
  //       }
  //       setOldData(response.data);
  //     } else {
  //       const response = await res.json();
  //       setError(response.error);
  //     }
  //     setIsApiHitComplete(true);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    const searchTerm = e.target.value.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const searchKeyword = new RegExp(`\\b${searchTerm}\\w*\\b`, 'i');

    if (e.target.value === '') {
      setClgList(oldData);
      setIsDataFound(oldData.length > 0);
    } else {
      const filteredData = oldData.filter(data =>
        searchKeyword.test(data.full_name.toLowerCase())
      );

      setClgList(filteredData);
      setIsDataFound(filteredData.length > 0);
    }
  };

  const StyledBadge = styled(Badge)(({ theme,verified }) =>
   ({
    '& .MuiBadge-badge': {
      backgroundColor: `${verified?'#44b700':'#ff0000'}`,
      color: `${verified?'#44b700':'#ff0000'}`,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
 
  return (
    <div className={styles["counsellor-list"]}>
    <Tablenav
              Actions={{
                Actions: (
                  <>
                  <input
                type="text"
                className="form-control"
                value={searchInput}
                placeholder="Search..."
                onChange={handleSearchChange}
              />
              </>
                ),
              }}
            />
    <List sx={{ width: '100%', height:'20rem', maxWidth: 360, bgcolor: 'background.paper',overflow:'hidden' }}>
    {clgList.map((clg, i) => {
                      return (
          <ListItem>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            verified={clg.verified}
          >
            <Avatar alt="" src="/broken-image.jpg" />

          </StyledBadge>

        <ListItemText primary={clg.name} style={{margin:'0rem 1rem'}} />

          </ListItem>
                      )
    })}
        </List>
        </div>
  );
}
