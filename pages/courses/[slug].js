import React from "react";
import Classes from "/styles/courses.module.css";
import Link from "next/link";
import FAQ from "@/components/Faq";

const formatStringToList = (str) => {
  const [dynamicLine, ...listItems] = str?.split("<LIST>");
  try {
    const formattedList = listItems
      .filter((item) => item !== "")
      .map((item, index) => <li key={index}>{item.trim()}</li>);

    return (
      <>
        {dynamicLine && <p>{dynamicLine}</p>}
        <ul>{formattedList}</ul>
      </>
    );
  } catch (error) {
    console.error(error);
  }
};
export default function CourseName({ coursedata }) {
  console.log(coursedata);

  return (
    <div className={Classes["colleges-slug"]}>
      <div className="container">
        <div className={Classes["content-section"]}>
          <div className={Classes["heading-section"]}>
            <div className={Classes["right-div"]}>
              <h1>{coursedata.course_name}</h1>
            </div>
            {coursedata.course_description &&
              coursedata.course_description != "" && (
                <div className={Classes["small-description"]}>
                  <h2>Course Description</h2>
                  <div className="row">
                    <div className="col-md-12">
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <th scope="row">Name of degree</th>
                            <td style={{ wordBreak: "break-all" }}>
                              {coursedata.course_description[0].degree_name}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Commonly known as</th>
                            <td style={{ wordBreak: "break-all" }}>
                              {coursedata.course_description[0].known_as}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Degree level</th>
                            <td style={{ wordBreak: "break-all" }}>
                              {coursedata.course_description[0].degree_level}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Course Duration</th>
                            <td style={{ wordBreak: "break-all" }}>
                              {coursedata.course_description[0].course_duration}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Admission Process</th>
                            <td style={{ wordBreak: "break-all" }}>
                              {
                                coursedata.course_description[0]
                                  .admission_process
                              }
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Annual Course Fee</th>
                            <td style={{ wordBreak: "break-all" }}>
                              {
                                coursedata.course_description[0]
                                  .annual_course_fee
                              }
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Top Institutes</th>
                            <td style={{ wordBreak: "break-all" }}>
                              {coursedata.course_description[0].top_institutes}
                            </td>
                          </tr>{" "}
                          <tr>
                            <th scope="row">Specilaisations</th>
                            <td style={{ wordBreak: "break-all" }}>
                              {coursedata.course_description[0].specialisation}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            {coursedata.course_eligibility &&
              coursedata.course_eligibility != "" && (
                <div className={Classes["small-description"]}>
                  <h2>Eligibility Criteria</h2>
                  {formatStringToList(coursedata.course_eligibility)}
                </div>
              )}
            {coursedata.course_admission_process &&
              coursedata.course_admission_process != "" && (
                <div className={Classes["small-description"]}>
                  <h2>Admission Process</h2>
                  {formatStringToList(coursedata.course_admission_process)}
                </div>
              )}
            {coursedata.course_entrance_exams_description &&
              coursedata.course_entrance_exams_description != "" && (
                <div className={Classes["small-description"]}>
                  <h2> Entrance Exams</h2>

                  {formatStringToList(
                    coursedata.course_entrance_exams_description
                  )}
                  <div className="row">
                    <div className="col-md-12">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Entrance Exam Name </th>
                            <th>Registration Details</th>
                            <th>Exam Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {coursedata.course_entrance_exams.map((s) => {
                            return (
                              <tr>
                                <td style={{ wordBreak: "break-all" }}>
                                  {s.entrance_exam_name}
                                </td>
                                <td style={{ wordBreak: "break-all" }}>
                                  {s.registration_details}
                                </td>
                                <td style={{ wordBreak: "break-all" }}>
                                  {s.exam_details}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            {coursedata.course_specialisations_description &&
              coursedata.course_specialisations_description != "" && (
                <div className={Classes["small-description"]}>
                  <h2>Specilaisations</h2>
                  {formatStringToList(
                    coursedata.course_specialisations_description
                  )}
                  <div className="row">
                    {coursedata.course_specialisations
                      .split(",")
                      .map((s, index) => {
                        return (
                          <div className="col-md-6 col-lg-3 ">
                            <span
                              className={Classes.specialisation}
                              key={index}
                            >
                              {s.trim()}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            {coursedata.course_curriculum_description &&
              coursedata.course_curriculum_description != "" && (
                <div className={Classes["small-description"]}>
                  <h2>Course Curriculum</h2>
                  {formatStringToList(coursedata.course_curriculum_description)}
                  <div className="row">
                    {coursedata.course_curriculum_specialisations
                      .split(",")
                      .map((s, index) => {
                        return (
                          <div className="col-md-6 col-lg-3 ">
                            <span
                              className={Classes.specialisation}
                              key={index}
                            >
                              {s.trim()}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            {coursedata.top_ranked_colleges_description &&
              coursedata.top_ranked_colleges_description != "" && (
                <div className={Classes["small-description"]}>
                  <h2>Top Ranked Colleges</h2>
                  {formatStringToList(
                    coursedata.top_ranked_colleges_description
                  )}
                  <div className="row">
                    <div className="col-md-12">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Institute </th>
                            <th>Eligibility/Exams Accepted </th>
                            <th>Total Course Fees (in INR) </th>
                          </tr>
                        </thead>
                        <tbody>
                          {coursedata.top_ranked_colleges.map((s) => {
                            return (
                              <tr>
                                <td style={{ wordBreak: "break-all" }}>
                                  {s.institute}
                                </td>
                                <td style={{ wordBreak: "break-all" }}>
                                  {s.eligibility}
                                </td>
                                <td style={{ wordBreak: "break-all" }}>
                                  {s.course_fee}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            {coursedata.top_ten_private_colleges_description &&
              coursedata.top_ten_private_colleges_description != "" && (
                <div className={Classes["small-description"]}>
                  <h2>Top 10 Private Colleges</h2>
                  {formatStringToList(
                    coursedata.top_ten_private_colleges_description
                  )}
                  <div className="row">
                    <div className="col-md-12">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Institute </th>
                            <th>Eligibility/Exams Accepted </th>
                            <th>Total Course Fees (in INR) </th>
                          </tr>
                        </thead>
                        <tbody>
                          {coursedata.top_ten_private_colleges.map((s) => {
                            return (
                              <tr>
                                <td style={{ wordBreak: "break-all" }}>
                                  {s.institute}
                                </td>
                                <td style={{ wordBreak: "break-all" }}>
                                  {s.eligibility}
                                </td>
                                <td style={{ wordBreak: "break-all" }}>
                                  {s.course_fee}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            {coursedata.top_recruiters_for_course_graduates_description &&
              coursedata.top_recruiters_for_course_graduates_description !=
                "" && (
                <div className={Classes["small-description"]}>
                  <h2>Top Recruiters For Graduates</h2>
                  {formatStringToList(
                    coursedata.top_recruiters_for_course_graduates_description
                  )}
                  <div className="row">
                    {coursedata.top_recruiters_for_course_graduates
                      .split(",")
                      .map((s, index) => {
                        return (
                          <div className="col-md-6 col-lg-3 ">
                            <span
                              className={Classes.specialisation}
                              key={index}
                            >
                              {s.trim()}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

            {coursedata.faqs && coursedata.faqs != "" && (
              <div className={Classes["small-description"]}>
                <FAQ data={coursedata.faqs} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  if (slug) {
    const encodedSlug = encodeURIComponent(slug);
    const url =
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/course?slug=" + encodedSlug;
    // console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    if (data.data && data.data.length > 0) {
      return {
        props: { coursedata: data.data[0] },
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
