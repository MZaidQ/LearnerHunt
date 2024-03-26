import React, { useState,useEffect } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import styles from "/styles/studentProfile.module.css";

const Circle = ({ number, color, onClick }) => (
  <Grid item xs={2} sm={1}>
    <Paper
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        textAlign: 'center',
        lineHeight: '40px',
        backgroundColor: color,
        fontWeight:'500',
        cursor: 'pointer',
        color:'gray'
      }}
      onClick={() => onClick(number)}
    >
      {number}
    </Paper>
  </Grid>
);

const Rate = () => {
  const [selectedCircles, setSelectedCircles] = useState([]);


  const handleCircleClick = (clickedNumber) => {
    setSelectedCircles(Array.from({ length: clickedNumber }, (_, index) => index + 1));
  };

  const getCircleColor = (number) => {
    if (selectedCircles.includes(number)) {
      if (number === 1) return 'red';
      if (number >= 2 && number <= 9) return 'orange';
      if (number === 10) return 'green';
    }
    return 'rgb(232 227 227)'; // Default color
  };

  return (
    <div className={styles["basic-details"]}>
        <p style={{textAlign:"center",fontWeight:"500",marginBottom:"2rem"}}> How likely are you to recommend learnerhunt.com to your friend or colleague?</p>
        <Grid container spacing={3} columns={{ xs: 10,md: 10 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
            <Circle
              key={number}
              number={number}
              color={getCircleColor(number)}
              onClick={handleCircleClick}
            />
          ))}
        </Grid>
        <div className={styles["mobile-hide"]}>
            <p style={{fontWeight:"500",fontSize:"12px",color:"gray"}}>Not so likely</p>
            <p style={{fontWeight:"500",fontSize:"12px",color:"gray"}}>High likely</p>

        </div>
    </div>
  );
};

export default Rate;