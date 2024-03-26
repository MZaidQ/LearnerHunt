import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import styles from '../styles/count.module.css';

const CounterComponent = () => {
    const [coursesCount, setCoursesCount] = useState(0);
    const [collegesCount, setCollegesCount] = useState(0);
    const [counsellorsCount, setCounsellorsCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // Update counts every 100 milliseconds
            if (coursesCount < 150) {
                setCoursesCount(prevCount => prevCount + 2);
            }
            if (collegesCount < 1000) {
                setCollegesCount(prevCount => prevCount + 15);
            }
            if (counsellorsCount < 50) {
                setCounsellorsCount(prevCount => prevCount + 1);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [coursesCount, collegesCount, counsellorsCount]);

    return (
        <div className={styles.mainBox}>
            <Container>
                <Row>
                    <Col className={[styles.column, "text-center"].join(" ")}>
                        <div className="text-white">
                            <span className={styles.heading}>{coursesCount}+</span>
                            <p className={styles.paragraph}>Courses</p>
                        </div>
                    </Col>
                    <Col className={[styles.column, "text-center"].join(" ")}>
                        <div className="text-white">
                            <span className={styles.heading}>{collegesCount}+</span>
                            <p className={styles.paragraph}>Colleges</p>
                        </div>
                    </Col>
                    <Col className="text-center">
                        <div className="text-white">
                            <span className={styles.heading}>{counsellorsCount}+</span>
                            <p className={styles.paragraph}>Counsellors</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CounterComponent;
