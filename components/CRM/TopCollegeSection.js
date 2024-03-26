import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Select from "react-select";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const collegeType = [
  {
    name: "MBA",
    type: "MBA",
  },
  {
    name: "MCA",
    type: "MCA",
  },

  {
    name: "L.L.B",
    type: "LLB",
  },

  {
    name: "B.com",
    type: "B.com",
  },
  {
    name: "BCA",
    type: "BCA",
  },
  {
    name: "BBA",
    type: "BBA",
  },

  {
    name: "M.COM",
    type: "M.COM",
  },
];
export default function TopCollegeSection() {
  const [selectedCollegeType, setSelectedCollegeType] = useState("MBA");
  const [isColleges, setIsColleges] = useState([]);
  const [active, setActive] = useState("MBA");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [selectedPosition,setSelectedPosition] = useState(null)
  const [selectedColleges, setSelectedColleges] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
  });



  const fetchCourses = async () => {
    setIsLoading(true);
    const collegesRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/webtopcolleges?course=${selectedCollegeType}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
      }
    );
    const collegesData = await collegesRes.json();
    const resp = collegesData.data;
    console.log(resp);
    let d = resp.filter((obj) => obj.position != null);
    let data = {};
    d.forEach((obj) => {
      const { position, college_id, college_name } = obj;
      data[position] = { value: college_id, label: college_name };
    });
    console.log(d);
    setIsColleges(resp);
    setSelectedColleges(data);
    // setSelectedCollegeType(d)
    // setSelectedCollegeType(
    //   resp.map((s) => {
    //     const { position, college_id, college_name } = s;
    //     if (position) {
    //       let obj = {
    //         value: college_id,
    //         label: college_name,
    //       };
    //       return { [position]: obj };
    //     }
    //     return {};
    //   })
    // );
    setIsLoading(false);
  };


  useEffect(() => {
    fetchCourses();
  }, [selectedCollegeType]);

  const handleTabChange = (type, name) => {
    setActive(type);
    setSelectedCollegeType(type);
  };

  const handleSave = (number) => {
    // console.log(number);
    // const collegeName = selectedColleges[number];
    // console.log(collegeName);
    // Swal.fire({
    //   icon: "success",
    //   title: `${collegeName.value} saved successfully!`,
    // });
    setSelectedPosition(number)
      setIsButtonLoading(true);
      const fd = new FormData();
      fd.append("cid", selectedColleges[number].value);
      fd.append("position", number);
      fd.append("course",selectedCollegeType)
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/webtopcolleges`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pt")}`,
        },
        method: "PUT",
        body: fd,
      }).then(async (response) => {
        var res = await response.json();
        // console.log(res);
        setIsButtonLoading(false);
        if (response.ok) {
          // console.log("hello", response.data);

          Swal.fire({
            title: "Success",
            text: `${res.message}`,
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            fetchCourses();
          });
        } else {
          Swal.fire({
            title: "error",
            text: `${res.error}`,
            icon: "error",
            confirmButtonText: "Ok",
          }).then(() => {
            setIsButtonLoading(false);
          });
        }
      });
  };
  const handleCollegeChange = (selectedOption, number) => {
    console.log(selectedOption, number);
    setSelectedColleges({
      ...selectedColleges,
      [number]: selectedOption,
    });
  };
  return (
    <>
      <section id="collegeId" className=" container my-5">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-md-6 mb-4">
            <Stack
              direction="row"
              spacing={1}
              style={{
                width: "100%",
                paddingBottom: "1.5rem",
                overflowX: "auto",
              }}
            >
              {collegeType.map((college) => {
                return (
                  <Chip
                    key={college.type}
                    onClick={(e) => handleTabChange(college.type, college.name)}
                    label={college.name}
                    color="primary"
                    variant={active == college.type ? "" : "outlined"}
                  />
                );
              })}
            </Stack>
          </div>
          <div className="col-3"></div>
        </div>
        <div>
          {[1, 2, 3, 4].map((number) => (
            <div className="row mb-3">
              <div key={number} className="col-2 d-flex justify-content-center">
                <h5 style={{ marginBottom: "10px" }}>Position {number}</h5>
              </div>
              <div className="col-8">
                {!isLoading ? (
                  <Select
                    value={selectedColleges[number]}
                    // isDisabled={isColleges.find(obj => obj.position == number)}
                    onChange={(selectedOption) =>
                      handleCollegeChange(selectedOption, number)
                    }
                    options={isColleges.map((college) => ({
                      value: college.college_id,
                      label: college.college_name,
                      // isDisabled: college.position === number
                    }))}
                    placeholder="Select a college"
                  />
                ) : (
                  <LinearProgress />
                )}
              </div>

              <div className="col-2">
                <Button onClick={() => handleSave(number)}>
                  {!isButtonLoading ? (
                    "Save"
                  ) : 
                  selectedPosition == number ?
                    <>
                      Saving... <Spinner size="sm" />
                    </>
                  :"Save"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
