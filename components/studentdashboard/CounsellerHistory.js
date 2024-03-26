import React, { useState } from "react";
import Image from 'next/image';
import styles from '/styles/CounsellerHistory.module.css'
import { Tabs, Tab, Card, CardContent, Button, Typography } from '@mui/material';

const CounsellerHistory= () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderCards = (data) => {
    
    return data.map((item, index) => (
      // <div className={styles["basic-details"]}>

      <Card key={index} className={styles["cards"]}>

       
         
        <Image src={item.image} width={350} height={300}  className="img-fluid" style={{borderRadius:"10px 10px 0px 0px"}}/>
         <div className={styles["left-img"]}>
          <Image src={item.images} width={40} height={20}  className="img-fluid" />
        </div>
        <div className={styles["star"]}>
            <span className={styles["starr"]}>★ 5</span>
          </div>
        <CardContent>
          <Typography className={styles["head"]} variant="h7">{item.heading}</Typography><br />
          <Typography className={styles["head"]} variant="h7">{item.experience}</Typography><br />
          <Typography className={styles["head"]} variant="h7">{item.domain}</Typography>

              <Button className={styles['btn']} variant="contained" color="primary">
              View Profile
              </Button>
           
        </CardContent>

      </Card>
    ));
  };

  const recommendationData = [
    { images:'/assets/images/nba-logo.png', image: '/assets/images/DummySQUARE.jpg'  , heading: 'IQ City United World School of Business,Kolkata',experience: 'Experience: 5Yrs',domain:'Domain: Bsc,BBA'},

  ];

  const scheduleData = [
    { images:'/assets/images/nba-logo.png', image: '/assets/images/DummySQUARE.jpg', heading: 'Saraswati College Of Education,Haryana' ,experience: 'Experience: 5Yrs' ,domain:'Domain: Bsc,BBA'},
  ];

  const completedData = [
    { images:'/assets/images/nba-logo.png', image: '/assets/images/DummySQUARE.jpg', heading: 'Lovely Professional University,Jaladhar' ,experience: 'Experience: 5Yrs',domain:'Domain: Bsc,BBA' },
  ];

  return (
    <div className={styles["card"]}>

<div className={styles["basic-details"]}>
      <h5 className={styles["heading"]}> Counselling history</h5>
      <Tabs  className={styles["tabss"]} value={value} onChange={handleChange} started>
        <Tab className={styles["tab"]} label="Recommendation" />
        <Tab className={styles["tab"]} label="Schedule" />
        <Tab className={styles["tab"]} label="Completed" />
      </Tabs>

      {value === 0 && (
        <div >{renderCards(recommendationData)}</div>
      )}
      {value === 1 && (
        <div>{renderCards(scheduleData)}</div>
      )}
      {value === 2 && (
        <div >{renderCards(completedData)}</div>
      )}
      </div>
    </div>
  );
};

export default CounsellerHistory     ;