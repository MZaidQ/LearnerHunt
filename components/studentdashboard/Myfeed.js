import Image from 'next/image';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "/styles/studentProfile.module.css";

const MyFeed = () => {
  const data = [
    { id: 1, imageSrc: '/images/ugc.png', heading: 'UGC Scans Fake Universities' },
    { id: 2, imageSrc: '/images/ugc.png', heading: 'Shashi Tharoor seeks DU`s review of weightage policy' },
    { id: 3, imageSrc: '/images/ugc.png', heading: 'Ira singhalan honorto womanhood'},
    { id: 4, imageSrc: '/images/ugc.png', heading: 'UGC Granted 19 Institute Heritage Status' },
    { id: 5, imageSrc: '/images/ugc.png', heading: 'IISc Amongst Top 10 BRICS Universities' },
    { id: 6, imageSrc: '/images/ugc.png', heading: 'Amity Ranked in Top Universities of QS Rankings' },

  ];

  return (
    <Container className={styles["basic-details"]}>
            {data.map((item, index) => (
        <React.Fragment key={item.id}>

        <Row  style={{padding:'10px'}} >
          <Col md={2}>
              <Image src={item.imageSrc} width={100} height={100} alt={`Image ${item.id}`} className="img-fluid" />
          </Col>
          <Col md={10}>
              <h5 style={{paddingTop:'10px'}}>{item.heading}</h5>
          </Col>
        </Row>
        {index < data.length - 1 && (
                <div style={{borderBottom:'1px solid #ccc',margin:'10px 0'}}></div>
          )}
        </React.Fragment>

      ))}
    </Container>
  );
};

export default MyFeed;