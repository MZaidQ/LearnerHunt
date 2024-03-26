import Link from 'next/link'
import React from 'react'
export default function Support() {
  return (
    <div style={{margin:"0.5rem",border: "1px solid gainsboro",
    borderRadius: "5px",
    padding: "1.5rem",
    marginBottom: "1rem" ,
    backgroundColor: "#fff"}}>

        <h3>Contact Number : <Link href="tel:+918800756846">+918800756846</Link></h3>
        <h3>Contact Email : <Link href="mailto:contact@learnerhunt.com">contact@learnerhunt.com</Link></h3>

        </div>
  )
}
