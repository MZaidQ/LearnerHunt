import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { Modal } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import { Spinner } from "react-bootstrap";

const headCells = [
  {
    id: "userrole",
    label: "User Role",
  },
  {
    id: "status",
    label: "Login Status",
  },
  {
    id: "email",
    label: "Email Address",
  },
  {
    id: "date",
    label: "Date",
  },
  // {
  //   id: "action",
  //   label: "Action",
  // },
  {
    id: "edit",
    label: "Edit",
  },
];

function EnhancedTableHead(props) {
  // console.log(props);
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  // console.log(props.rowsList);
  const [searchInput, setSearchInput] = useState("");
  const { numSelected } = props;
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    props.onSearchChange(e.target.value);
    // setRows(filteredData);
    // }
  };

  const handleOpen = (e) => {
    props.OnModalOpen(true);
  };
  const handleDelete = (e) => {
    props.OnhandleDelete(e);
    // Swal.fire({
    //   title: "Do you want to delete ?",
    //   showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: "Delete",
    //   denyButtonText: `Don't Delete`
    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
    //     Swal.fire("Deleted!", "", "success");
    //   } else if (result.isDenied) {
    //     Swal.fire("Changes are not Delete", "", "info");
    //   }
    // });
  };
  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="p"
            id="tableTitle"
            component="div"
          >
            Total Users : {props.rowsList.length}
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon onClick={handleDelete} />
            </IconButton>
          </Tooltip>
        ) : (
          <>
            <input
              type="text"
              className="form-control"
              value={searchInput}
              placeholder="Search..."
              onChange={handleSearchChange}
            />
            <Tooltip title="Add User">
              <IconButton>
                <AddIcon onClick={handleOpen} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Toolbar>
    </>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
var oldData = [];
export default function EnhancedTable() {
  const [selected, setSelected] = React.useState([]);
  const [rows, setRows] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [cshowPassword, setCshowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/crm-users-list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("pt")}`,
      },
    }).then(async (res) => {
      // console.log(res)
      let response = await res.json();
      // console.log(response);
      if (response.data) {
        if (response.data.length > 0) {
          setRows(response.data);
          // this.setState({ clgList: response.data, isDataFound: true });
        }
        oldData = response.data;
        // this.setState({ isApiHitComplete: true });
      } else {
        Swal.fire({
          title: "error",
          html: `${response.error}`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };
  const formatTimestamp = (timestamp) => {
    const dateObject = new Date(timestamp);

    const formattedTime = dateObject.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const formattedDate = dateObject.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return `${formattedTime}, ${formattedDate}`;
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    // console.log(id);
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  // const handleApprovalChange = (e, clg) => {
  //   // this.setState({ approvalStatus: e.target.value });
  //   // console.log(e.target.checked,e.target.value)
  //   const s = e.target.checked ? "1" : "0";
  //   // this.setState({ isLoading: true });

  //   fetch(
  //     process.env.NEXT_PUBLIC_API_ENDPOINT +
  //       `/admin/crm-users-list?id=${clg._id}&s=${s}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("pt")}`,
  //       },
  //       method: "PUT",
  //     }
  //   ).then(async (response) => {
  //     var res = await response.json();
  //     // console.log(res);
  //     // this.setState({ isLoading: false });
  //     // setIsLoading(false);
  //     if (response.ok) {
  //       Swal.fire({
  //         title: "Success",
  //         html: `${res.message}`,
  //         icon: "success",
  //         confirmButtonText: "Ok",
  //       }).then(() => {
  //         getUserList();
  //       });
  //     } else {
  //       Swal.fire({
  //         title: "error",
  //         html: `${res.error}`,
  //         icon: "error",
  //         confirmButtonText: "Ok",
  //       }).then(() => {
  //         setIsLoading(false);
  //       });
  //     }
  //   });
  // };

  const handleSearchChange = (value) => {
    const searchTerm = value.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const searchKeyword = new RegExp(`\\b${searchTerm}\\w*\\b`, "i");

    if (searchKeyword === "") {
      setRows(oldData);
      // setIsDataFound(oldData.length > 0);
    } else {
      // console.log("else part");
      const filteredData = oldData.filter((data) =>
        searchKeyword.test(data.email.toLowerCase())
      );
      // console.log(filteredData);
      setRows(filteredData);
    }
  };

  const handleModalOpen = (value) => {
    setEditModal(false);
    setIsModalOpen(value);
    setEmail("");
    setRole("4");
    setIsLoading(false);
  };
  const handleDeleteData = (value) => {
    // console.log(value, "delete");
    // console.log(selected.join("&"));
    Swal.fire({
      title: "Do you want to delete ?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          setIsLoading(true);
          const fd = new FormData();
          fd.append("ids", selected.join("&"));
          fetch(
            process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/crm-users-list",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("pt")}`,
              },
              method: "DELETE",
              body: fd,
            }
          ).then(async (response) => {
            var res = await response.json();
            // console.log(res);
            // console.log(res.message)
            if (response.ok) {
              Swal.fire("Deleted!", "", "success");
              getUserList();
              setSelected([]);
            } else {
              Swal.fire({
                title: "error",
                text: `${res.error}`,
                icon: "error",
                confirmButtonText: "Ok",
              });
              setIsLoading(false);
            }
          });
        } catch (error) {
          // Handle network or fetch error
          console.error(error);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not Delete", "", "info");
      }
    });
    // const newSelected = rows.map((n) => n._id);
    // console.log(newSelected)
    // setSelected(newSelected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editModal) {
      // console.log(email);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email == "") {
        Swal.fire({
          title: "error",
          text: `Please enter email`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          setIsLoading(false);
        });
      } else if (!emailRegex.test(email)) {
        Swal.fire({
          title: "error",
          text: `Please enter a valid email address`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          setIsLoading(false);
        });
      } else if (password == "") {
        Swal.fire({
          title: "error",
          text: `Please enter your password`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          setIsLoading(false);
        });
      } else if (cpassword == "") {
        Swal.fire({
          title: "error",
          text: `Please enter your confirm password`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          setIsLoading(false);
        });
      } else if (password != cpassword) {
        Swal.fire({
          title: "error",
          text: `Password not match.`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          setIsLoading(false);
        });
      } else {
        try {
          setIsLoading(true);
          const fd = new FormData();
          fd.append("email", email);
          fd.append("password", password);
          fd.append("cpass", cpassword);
          fd.append("r", role);

          fetch(
            process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/crm-users-list",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("pt")}`,
              },
              method: "POST",
              body: fd,
            }
          ).then(async (response) => {
            var res = await response.json();
            // console.log(res);
            // console.log(res.message)
            if (response.ok) {
              // console.log("hello", response.data);
              Swal.fire({
                title: "Success",
                text: `${res.message}`,
                icon: "success",
                confirmButtonText: "Ok",
              }).then(() => {
                // props.onLogin(res.data.token,res.data.role,formData.name);
                setIsLoading(false);
                setIsModalOpen(false);
                setEmail("");
                setPassword("");
                setCpassword("");
                getUserList();
              });
            } else {
              Swal.fire({
                title: "error",
                text: `${res.error}`,
                icon: "error",
                confirmButtonText: "Ok",
              });
              setIsLoading(false);
            }
          });
        } catch (error) {
          // Handle network or fetch error
          console.error(error);
        }
      }
    } else {
      console.log(email);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email == "") {
        Swal.fire({
          title: "error",
          text: `Please enter email`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          setIsLoading(false);
        });
      } else if (!emailRegex.test(email)) {
        Swal.fire({
          title: "error",
          text: `Please enter a valid email address`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then(() => {
          setIsLoading(false);
        });
      } else {
        const fd = new FormData();
        fd.append("r", role);
        fd.append("id", selectedId);
        fd.append("email", email);
        fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/crm-users-list`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pt")}`,
          },
          method: "PUT",
          body: fd,
        }).then(async (response) => {
          var res = await response.json();
          // console.log(res);
          // this.setState({ isLoading: false });
          // setIsLoading(false);
          if (response.ok) {
            // console.log("hello", response.data);
            Swal.fire({
              title: "Success",
              text: `${res.message}`,
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              setIsLoading(false);
              setIsModalOpen(false);
              setEmail("");
              getUserList();
            });
          } else {
            Swal.fire({
              title: "error",
              text: `${res.error}`,
              icon: "error",
              confirmButtonText: "Ok",
            });
            setIsLoading(false);
          }
        });
      }
    }
  };
  const handleEditModal = (e, row) => {
    // console.log(row);
    setIsModalOpen(true);
    setEmail(row.email);
    setRole(row.role);
    setSelectedId(row._id);
    setEditModal(true);

    // const s = e.target.checked ? "1" : "0";
    // this.setState({ isLoading: true });
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            userListData={getUserList}
            rowsList={rows}
            onSearchChange={(value) => handleSearchChange(value)}
            OnModalOpen={(value) => handleModalOpen(value)}
            OnhandleDelete={(value) => handleDeleteData(value)}
          />
          <TableContainer sx={{maxHeight:"70vh"}}>
            <Table stickyHeader sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={rows.length}
                userListData={getUserList}
              />
              <TableBody>
                {rows.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row._id)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {row.role == 0 ? (
                          <span style={{ fontWeight: "500" }}>
                            <AssignmentIndIcon /> Admin
                          </span>
                        ) : (
                          <span style={{ fontWeight: "500" }}>
                            <SupportAgentIcon /> Support
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {" "}
                        {row.status ? (
                          <span style={{ fontWeight: "500", color: "green" }}>
                            Logged-In
                          </span>
                        ) : (
                          <span style={{ fontWeight: "500", color: "red" }}>
                            Logged-Out
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{formatTimestamp(row.createdAt)}</TableCell>
                      {/* <TableCell>
                        {" "}
                        <Switch
                          value={row.role}
                          defaultChecked={row.role == 0 ? true : false}
                          onChange={(e) => handleApprovalChange(e, row)}
                        />
                      </TableCell> */}
                      <TableCell>
                        {" "}
                        <IconButton onClick={(e) => handleEditModal(e, row)}>
                          {" "}
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <Modal
        centered
        show={isModalOpen}
        onHide={() => {
          setIsModalOpen(false),
            setEmail(""),
            setPassword(""),
            setCpassword("");
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{!editModal ? "Add New User" : "Edit User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              id="email"
              name="name"
              type="email"
              fullWidth
              variant="outlined"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {!editModal && (
              <>
                <FormControl
                  sx={{ mt: 2, width: "100%" }}
                  variant="outlined"
                  required
                >
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    fullwidth="true"
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <FormControl
                  sx={{ mt: 2, width: "100%" }}
                  variant="outlined"
                  required
                >
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    fullwidth="true"
                  >
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="cpassword"
                    value={cpassword}
                    name="cpassword"
                    onChange={(e) => setCpassword(e.target.value)}
                    type={cshowPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setCshowPassword(!cshowPassword)}
                          edge="end"
                        >
                          {cshowPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                </FormControl>
              </>
            )}

            <FormControl sx={{ mt: 2, width: "100%" }}>
              <FormLabel id="demo-radio-buttons-group-label">
                User Role
              </FormLabel>
              <RadioGroup
                row
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {/* <FormControlLabel value="0"  control={<Radio />} label="Admin" /> */}
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Support"
                />
              </RadioGroup>
            </FormControl>
            <Button
              disabled={isLoading}
              className="bg-blue-500"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? (
                <>
                  <span>Please Wait...</span>
                  <Spinner animation="border" role="status" />
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </Modal.Body>
      </Modal>
    </>
  );
}
