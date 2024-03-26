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
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function AssociatedCounsellor() {
  const [clgList, setClgList] = useState([]);
  const [isDataFound, setIsDataFound] = useState(false);
  const [isApiHitComplete, setIsApiHitComplete] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState("");
  const [oldData, setOldData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [randomColor, setRandomColor] = useState('');

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e,verified) => {
    setAnchorEl(null);
    if (verified == '0') {
      var filteredData = oldData.filter(data =>
        (data.verified==true))
    setAnchorEl(null);
      setClgList(filteredData);
      setIsDataFound(filteredData.length > 0);

    } else if(verified == '1') {
      var filteredData = oldData.filter(data =>
        (data.verified==false))
      setClgList(filteredData);
      setIsDataFound(filteredData.length > 0);
         setAnchorEl(null);
    }

  };

  useEffect(() => {
    getAssetList();
    setRandomColor(generateRandomColor());
  }, []);

  const getAssetList = async () => {
    setIsApiHitComplete(false);
    setIsDataFound(false);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/assoc-counsellor`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ct")}`,
        },
      });
      if (res.ok) {
        const response = await res.json();
        if (response.data.length > 0) {
          setClgList(response.data);
          setIsDataFound(true);
        }
        setOldData(response.data);
      } else {
        const response = await res.json();
        setError(response.error);
      }
      setIsApiHitComplete(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    const searchTerm = e.target.value.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const searchKeyword = new RegExp(`\\b${searchTerm}\\w*\\b`, 'i');

    if (e.target.value === '') {
      setClgList(oldData);
      setIsDataFound(oldData.length > 0);
    } else {
      const filteredData = oldData.filter(data =>
        searchKeyword.test(data.name.toLowerCase())
      );

      setClgList(filteredData);
      setIsDataFound(filteredData.length > 0);
    }
  };

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
       
      },
    },
  }));

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
 
  

  // Function to generate a random color
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  return (
    <>
    {error =="" ?

    <div className={styles["counsellor-list"]}>
    <Tablenav
              Actions={{
                Actions: (
                  <>
                  <div style={{display:'flex'}}>
                  <input
                type="text"
                className="form-control"
                value={searchInput}
                placeholder="Search..."
                onChange={handleSearchChange}
              />
            <div>
      <Button
      style={{margin:'0 1rem'}}
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Filter
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={(e)=>handleClose(e,'0')} disableRipple>
          <ArchiveIcon />
          Active
        </MenuItem>
        <MenuItem onClick={(e)=>handleClose(e,'1')} disableRipple>
          <FileCopyIcon />
          Deactive
        </MenuItem>
      
      </StyledMenu>
    </div>
                        </div>
              </>
                ),
              }}
            />
              {isApiHitComplete ? (
          isDataFound ? (
    <List sx={{ width: '100%', height:'80vh', maxHeight:'80vh', bgcolor: 'background.paper',overflowY:'scroll' }}>
    {clgList.map((clg, i) => {
                      return (
                        <>
          <ListItem sx={{ background:'#f8f8f8',borderRadius:'0.2rem',marginBottom:'0.1rem' }}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            verified={clg.verified}
          >
            <Avatar sx={{bgcolor: randomColor  }}>{clg.name.charAt(0)}</Avatar>

          </StyledBadge>

        <ListItemText primary={clg.name} style={{margin:'0rem 1rem'}} />

          </ListItem>
          
          </>
                      )
    })}
        </List>
          ) : (
                      <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
                      <div style={{ fontWeight: "500" }}>
                        <span style={{ color: "#0d6efd", cursor: 'pointer' }}> No Records Yet </span>
                      </div>
                    </div>
                    )
                  ) : (
                       <div style={{ display: "flex", width: "100%", height: '80vh', justifyContent: "center", alignItems: 'center' }}>
                        <Spinner animation="border" role="status" variant="info">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                  )} 
        </div>
        :error}
</>
  );
}
