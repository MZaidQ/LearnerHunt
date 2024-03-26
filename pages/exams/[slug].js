import React from 'react'
import Classes from '/styles/exams.module.css'
import Link from 'next/link'


const formatStringToList = (str) => {
  const [dynamicLine, ...listItems] = str.split("<LIST>");
  const formattedList = listItems
    .filter((item) => item !== "")
    .map((item, index) => <li key={index}>{item.trim()}</li>);

  return (
    <>
      {dynamicLine && <p>{dynamicLine}</p>}
      <ul>{formattedList}</ul>
    </>
  );
};
export default function ExamName({ examdata }) {
  // console.log(examdata)
//   const dummyBannerImg = collegedata.banner_img_path && collegedata.banner_img_path != "" ? collegedata.banner_img_path : '/assets/images/DummyBG.jpg'
  const dummyLogoImg = examdata.exam_logo && examdata.exam_logo != "" ? examdata.exam_logo : '/assets/images/DummyLOGO.jpg'
  return (
    <div className={Classes['colleges-slug']}>
      <div className="container">
        <div className={Classes['content-section']}>
          <div className={Classes['heading-section']}>
            <div className={Classes['left-div']}>
              <img src={dummyLogoImg} alt="dummy" />
            </div>
            <div className={Classes['right-div']}>
              <h1>{examdata.exam_name}</h1>
            </div>
            { examdata.exam_highlights &&
               examdata.exam_highlights != "" && (
            <div className={Classes['small-description']}>
            <h2>Highlights</h2>
            <div className="row">
              <div className="col-md-12">
                <table className='table table-bordered'>
                  <thead>
                  <tr>
                            <th>Exam Particulars</th>
                            <th>Exam Details </th>
                          </tr>
                  </thead>
                  <tbody>
                    {examdata.exam_highlights.map((e)=>{
                      return(
                        <tr>
                        <td>{e.exam_particulars}</td>
                        <td>{e.exam_details}</td>
                      </tr>
                      )
                    })}
                 
                    
                  </tbody>
                </table>
              </div>
             
            </div>
          </div>
               )}
                 { examdata.exam_dates &&
               examdata.exam_dates != "" && (
            <div className={Classes['small-description']}>
            <h2>Exam Date</h2>
            <div className="row">
              <div className="col-md-12">
                <table className='table table-bordered'>
                  <thead>
                  <tr>
                            <th>Dates </th>
                            <th>Upcoming Exam Dates  </th>
                          </tr>
                  </thead>
                  <tbody>
                    {examdata.exam_dates.map((e)=>{
                      return(
                        <tr>
                        <td>{e.date}</td>
                        <td>{e.upcoming_date}</td>
                      </tr>
                      )
                    })}
                 
                    
                  </tbody>
                </table>
              </div>
             
            </div>
          </div>
             )}
          { examdata.exam_eligibility_criteria &&
               examdata.exam_eligibility_criteria != "" && (
                <div className={Classes["small-description"]}>
                  <h2>Eligibility Criteria</h2>
                  {formatStringToList( examdata.exam_eligibility_criteria)}
                </div>
              )}
               {
            examdata.exam_registration_description && examdata.exam_registration_description != "" &&
            <div className={Classes['small-description']}>
              <h2>Registration Process</h2>
              <p>{examdata.exam_registration_description}</p>
            </div>
          }
          {
            examdata.exam_syllabus_description && examdata.exam_syllabus_description != "" &&
          <div className={Classes['small-description']}>
            <h2>Syllabus</h2>
            <p>{examdata.exam_syllabus_description}</p>
            <div className="row">
              <div className="col-md-12">
                <table className='table table-bordered'>
                  <thead>
                  <tr>
                            <th>Syllabus Section</th>
                            <th>Syllabus topics</th>
                          </tr>
                  </thead>
                  <tbody>
                    {examdata.exam_syllabus.length>0?
                    examdata.exam_syllabus.map((e)=>{
                      return(
                        <tr>
                        <td>{e.section}</td>
                        <td>{e.topics}</td>
                      </tr>
                      )
                    })
                    :
                    <tr>
                      <td colSpan={2}>No Record Found</td>
                    </tr>
                    }
                 
                    
                  </tbody>
                </table>
              </div>
             
            </div>
          </div>
}
{
            examdata.exam_pattern && examdata.exam_pattern != "" &&
          <div className={Classes['small-description']}>
            <h2>Exam Pattern</h2>
            <p>{examdata.exam_pattern[0].description}</p>
            <div className="row">
              <div className="col-md-12">
                <table className='table table-bordered'>
                  <tbody>
                        <tr>
                        <td>Mode of exam</td>
                        <td>{examdata.exam_pattern[0].mode}</td>
                      </tr>
                      <tr>
                        <td>Duration of exam</td>
                        <td>{examdata.exam_pattern[0].duration}</td>
                      </tr>  <tr>
                        <td>Exam Slot</td>
                        <td>{examdata.exam_pattern[0].slots}</td>
                      </tr>  <tr>
                        <td>No. of questions</td>
                        <td>{examdata.exam_pattern[0].question_count}</td>
                      </tr>  <tr>
                        <td>Total marks</td>
                        <td>{examdata.exam_pattern[0].total_marks}</td>
                      </tr>  <tr>
                        <td>Language of question paper</td>
                        <td>{examdata.exam_pattern[0].language}</td>
                      </tr><tr>
                        <td>No. of answer choice</td>
                        <td>{examdata.exam_pattern[0].choices}</td>
                      </tr><tr>
                        <td>Question type</td>
                        <td>{examdata.exam_pattern[0].question_type}</td>
                      </tr>
                  </tbody>
                </table>
              </div>
             
            </div>
          </div>
  }
          {
            examdata.exam_analysis_description && examdata.exam_analysis_description != "" &&
            <div className={Classes['small-description']}>
              <h2>Exam Analysis</h2>
              <p>{examdata.exam_analysis_description}</p>
            </div>
}
{ examdata.admit_card_description &&
               examdata.admit_card_description != "" && (
                <div className={Classes["small-description"]}>
                  <h2>Admit Card</h2>
                  {formatStringToList( examdata.admit_card_description)}
                </div>
              )}
  { examdata.exam_day_guidelines_description &&
               examdata.exam_day_guidelines_description != "" && (
                <div className={Classes["small-description"]}>
                  <h2>Exam Day Guidelines</h2>
                  {formatStringToList( examdata.exam_day_guidelines_description)}
                </div>
              )}
                { examdata.exam_hall_prohibited_items &&
               examdata.exam_hall_prohibited_items != "" && (
                <div className={Classes["small-description"]}>
                  <h2>Exam Hall Prohibited Items</h2>
                  {formatStringToList( examdata.exam_hall_prohibited_items)}
                </div>
              )}
                { examdata.exam_timings_description &&
               examdata.exam_timings_description != "" && (
          <div className={Classes['small-description']}>
            <h2>Exam Timing</h2>
            <p>{examdata.exam_timings_description}</p>
            <div className="row">
              <div className="col-md-12">
                <table className='table table-bordered'>
                  <thead>
                  <tr>
                            <th>Exam Slot</th>
                            <th>Exam Timing</th>
                            <th>Reporting Time</th>
                            <th>Last entry allowed</th>

                          </tr>
                  </thead>
                  <tbody>
                    {examdata.exam_timings.map((e)=>{
                      return(
                        <tr>
                        <td>{e.exam_slot}</td>
                        <td>{e.exam_timing}</td>
                        <td>{e.reporting_time}</td>
                        <td>{e.last_entry_allowed}</td>

                      </tr>
                      )
                    })}
                 
                    
                  </tbody>
                </table>
              </div>
             
            </div>
          </div>
               )}
          {
            examdata.answer_key_description && examdata.answer_key_description != "" &&
            <div className={Classes['small-description']}>
              <h2>Answer Key</h2>
              <p>{examdata.answer_key_description}</p>
            </div>
          }
          {
            examdata.result_and_scorecard && examdata.result_and_scorecard != "" &&
            <div className={Classes['small-description']}>
              <h2>Result and Scorecard </h2>
              <p>{examdata.result_and_scorecard}</p>
            </div>
          }
            
          {
            examdata.exam_score && examdata.exam_score != "" &&
            <div className={Classes['small-description']}>
              <h2>Exam Score</h2>
              <p>{examdata.exam_score}</p>
            </div>
          }
           {
            examdata.admission_process && examdata.admission_process != "" &&
            <div className={Classes['small-description']}>
              <h2>Admission Process</h2>
              <p>{examdata.admission_process}</p>
            </div>
          }
           
     

            
              
            
          </div>
         
     
        </div>
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {
  const { slug } = context.params;
  if (slug) {
    const encodedSlug = encodeURIComponent(slug)
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + "/exam?slug=" + encodedSlug
    // console.log(url)
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data)
    if (data.data && data.data.length > 0) {
      return {
        props: {examdata: data.data[0] },
      };
    } else {
      return {
        // notFound: true,
        redirect: {
          permanent: false,
          destination: "/",
        },
        props:{}
      };
    }
  } else {
    return {
      // notFound: true,
      redirect: {
        permanent: false,
        destination: "/",
      },
      props:{}
    };
  }
}