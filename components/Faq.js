import React from "react";
import Classes from "/styles/faq.module.css";
import { useRouter } from "next/router";


const FAQ = ({data}) => {
  const formatStringToList = (str,index) => {
    const [dynamicLine, ...listItems] = str?.split("<LIST>");
    const formattedList = listItems
      .filter((item) => item !== "")
      .map((item, index) => <li key={index}>{item.trim()}</li>);
  
    return (
      <>
        {dynamicLine && <p className={index == data.length - 1 ? Classes['b-none'] : ""} >{dynamicLine}</p>}
        <ul>{formattedList}</ul>
      </>
    );
  };
  return (
      
          <div className={`${Classes["faq-box"]} pt-3`}>
            <h2>Frequently Asked Questions</h2>
            {data?.map((faq, index) => {
              return (
                <div className={Classes["question-ans-box"]} key={faq.question}>
                  <h3>{faq.question}</h3>
                  {/* <p className={index == data.length - 1 ? Classes['b-none'] : ""} dangerouslySetInnerHTML={{ __html: faq.answer }} /> */}
                  {formatStringToList(faq.answer,index)}
                
                  {/* {index !== data.length - 1 && !faq.List && <hr />} */}

                  {/* {faq.List && (
                    <>
                      <ol>
                        {faq.List.map((listItem, i) => {
                          return (
                            <li
                              dangerouslySetInnerHTML={{ __html: listItem }}
                              key={i}
                            />
                          );
                        })}
                      </ol>
                      {faq.other && (
                        <p dangerouslySetInnerHTML={{ __html: faq.other }}></p>
                      )}
                      <hr />
                    </>
                  )} */}

                  {/* </p> */}
                </div>
              );
            })}
          </div>
       
  );
};

export default FAQ;