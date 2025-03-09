import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GoogleGenerativeAI } from '@google/generative-ai';
import Review from "../components/Review";
import Chat from "../components/Chat";
import { useNavigate } from "react-router-dom";


function ViewPost() {
  const navigate = useNavigate();
  const { id, u_id } = useParams(); //post id



  const genAI = new GoogleGenerativeAI("AIzaSyD_Hrea4tcCSOEKTYfWSy7ptAayaC75wdM");

  const [user, setUser] = useState([]);
  const [postData, setPostData] = useState({});


  const [review, setReview] = useState("");


  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/users/id/${u_id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        console.log(data);

        setUser(data);
        setEmail(data.email);
        setUsername(data.name);
        setLocation(data.location);
        setGithub(data.githubUrl);
        setLinkedIn(data.linkedInUrl);
        setProfileImage(data.profileImageUrl)
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);


  const [show, setShow] = useState(false);
  const [rating, setRating] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/users/getReviews/${u_id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();

        setReviews(data);

        if (data.length > 0) {
          const str = "";

          const reviewsText = data.map((review) => str + review.content + "||")


          //api :)      
          const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

          const prompt =
            `Analyze the following reviews and calculate the percentage of positive reviews. Return only the percentage as a number without any additional text or explanation (reviews are separated via '||'), make sure you dont consider a netral review as negative: ${reviewsText}`;

          const result = await model.generateContent(prompt);
          console.log(result.response.text());
          setRating(result.response.text().trim())
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }




    };


    fetchReviews();
  }, [])


  async function saveReview() {
    console.log("review is ", review);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/users/addReview",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(
            {
              "giver_id": localStorage.getItem("user_id").toString(),
              "receiver_id": u_id.toString(),
              "content": review
            }),
        }
      )

      const data = await response.json();

      setReviews((prev) => [...prev, data])
    }
    catch (e) {
      console.log("error in adding a revew ", e);
    }


    // setReviews((prevReviews) => [...prevReviews, review]);

  }


  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/post/getDetails/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch post  details");
        }

        const data = await response.json();
        console.log(data);

        setPostData(data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };


    fetchPostDetails();
  }, [])


  // State to store input values
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.name);
  const [location, setLocation] = useState(user.location);
  const [linkedIn , setLinkedIn] = useState(user.linkedInUrl || "");
  const [github , setGithub] = useState(user.githubUrl || "");
  const [profileImage, setProfileImage] = useState(""); // Store image URL

  return (
    <div className="pt-12 w-full h-screen flex overflow-auto">

      {/* Details section */}
      <div className="w-full h-full bg-gray-900">

        {/* Profile section */}
        <div className="w-full h-1/3  border-b-2 border-gray-400 shadow-2xl flex items-center px-6 justify-between">
          <div className="flex items-center">
            <div className="h-30 w-30 border-none rounded-full">
              <img src={profileImage} alt="" className="object-cover w-full h-full rounded-full" />
            </div>
            <div className="flex flex-col px-4">
              <div className="text-gray-100 font-semibold text-4xl">{username}</div>
              <div className="flex  items-center text-gray-400 pt-1"><FaMapMarkerAlt className=" text-blue-500" /> {location}</div>
              <div className="flex gap-1 text-gray-400 pt-2">
                {rating == "" && reviews.length == 0 ?
                  <div></div> : <div className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="80" stroke-dashoffset="80" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5 -8l3 1l-1 6h7v3l-3 7h-11h-4v-9h4v9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="80;0" /></path></svg>
                    {rating}% people enjoyed working with {username}
                  </div>}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <button className="text-white border-none bg-black px-3 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
              onClick={
                () => {
                  navigate("/chatwithuser", {
                    state: { selectedUser: user, profilePic: profileImage },
                  });
                }
              }
            >Chat with {username}</button>
            {/* <button className="text-white border-none bg-black px-3 py-2 rounded-lg hover:bg-gray-800 transition duration-300">Download Resume</button> */}
          </div>
        </div>

        {/* Lower section */}
        <div className="flex w-full justify-around p-4 items-center flex-wrap gap-4 border-b-2 border-gray-400 shadow-2xl" >
          <div className="bg-black w-1/3 h-fit px-6 py-4 flex flex-col items-center text-center border-none rounded-xl hover:bg-gray-800 transition duration-300">

            <div className="text-gray-400">Skill {username} is offering</div>

            <div className="text-gray-100">{postData.offer}</div>
          </div>
          <div className="bg-black w-1/3 h-fit px-6 py-4 flex flex-col items-center text-center  border-none rounded-xl hover:bg-gray-800 transition duration-300">
            <div className="text-gray-400">Skill {username} needs</div>

            <div className="text-gray-100">{postData.requirement}</div>
          </div>
        </div>

        <div className="mt-8 w-full flex justify-center flex-col p-4 items-center shadow-2xl">


        </div>
        {/* Connect with the user :) */}

        <div className="mt-4 w-full flex text-center  items-center justify-between ">
          <div className=" w-1/2 px-6 flex flex-col items-center border-r-2 border-gray-400 ">
            <div className="text-gray-300 font-semibold text-2xl pb-12">Description</div>
            <div className="text-gray-200 font-medium text-lg ">{postData.description}</div>
          </div>


          <div className="w-1/2 px-6 flex flex-col items-center">
            <div className="text-gray-300 font-semibold text-2xl pb-12">Connect with {username}</div>
            {/* Socials */}
            <div className="flex w-full justify-around">
              <a className="w-28 h-28 " href={linkedIn} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 512 128"><path fill="#0a66c2" d="m202.057 74.971l28.252 34.743H208l-25.143-31.908v31.908h-18.286V18.286h18.286v53.76l23.223-26.332h23.314zm-73.143-31.085a24.78 24.78 0 0 0-20.205 10.971v-9.143h-17.28v64h18.285V79.817a15.91 15.91 0 0 1 15.177-17.646c10.606 0 12.252 10.423 12.252 17.646v29.897h18.286v-33.92c0-20.114-6.675-31.908-26.149-31.908zm163.657 35.291q.105 2.011 0 4.023h-48v.64a16.366 16.366 0 0 0 16.732 13.074a22.95 22.95 0 0 0 16.823-6.308l12.16 9.143a39.4 39.4 0 0 1-29.715 11.794a31.91 31.91 0 0 1-33.828-34.286a32.73 32.73 0 0 1 34.377-33.371c17.189 0 31.451 12.16 31.451 35.291m-17.005-7.863a13.35 13.35 0 0 0-14.537-12.8c-8.04-.869-15.321 4.794-16.458 12.8zM18.286 18.286H0v91.428h54.857V91.43H18.286zm329.143 0h18.285v91.428h-17.28v-6.4a22.31 22.31 0 0 1-18.285 8.229a31.177 31.177 0 0 1-30.263-33.829a30.72 30.72 0 0 1 30.171-33.828a23.95 23.95 0 0 1 17.372 6.4zm1.371 59.428A14.903 14.903 0 0 0 333.989 60.8c-8.747.635-15.375 8.157-14.903 16.914c-.472 8.757 6.156 16.28 14.903 16.915A14.903 14.903 0 0 0 348.8 77.714M73.143 16.457A11.61 11.61 0 0 0 61.714 27.43c0 6.311 5.117 11.428 11.429 11.428S84.57 33.74 84.57 27.43a11.61 11.61 0 0 0-11.428-10.972M64 109.714h18.286v-64H64zM512 9.143v109.714a9.143 9.143 0 0 1-9.143 9.143H393.143a9.143 9.143 0 0 1-9.143-9.143V9.143A9.143 9.143 0 0 1 393.143 0h109.714A9.143 9.143 0 0 1 512 9.143m-91.429 36.571h-18.285v64h18.285zm2.286-18.285c0-6.312-5.117-11.429-11.428-11.429S400 21.117 400 27.429c0 6.311 5.117 11.428 11.429 11.428c6.311 0 11.428-5.117 11.428-11.428m70.857 48.365c0-20.114-6.674-31.908-26.148-31.908a24.78 24.78 0 0 0-20.572 10.971v-9.143h-17.28v64H448V79.817a15.91 15.91 0 0 1 15.177-17.646c10.606 0 12.252 10.423 12.252 17.646v29.897h18.285z" /></svg>
              </a>
              <a className="w-24 h-24 text-gray-400" href={github} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full " viewBox="0 0 512 139"><path fill="#fff" d="M98.696 59.312h-43.06a2.015 2.015 0 0 0-2.013 2.014v21.053c0 1.111.902 2.015 2.012 2.015h16.799v26.157s-3.772 1.286-14.2 1.286c-12.303 0-29.49-4.496-29.49-42.288c0-37.8 17.897-42.773 34.698-42.773c14.543 0 20.809 2.56 24.795 3.794c1.253.384 2.412-.863 2.412-1.975l4.803-20.342c0-.52-.176-1.146-.769-1.571C93.064 5.527 83.187 0 58.233 0C29.488 0 0 12.23 0 71.023c0 58.795 33.76 67.556 62.21 67.556c23.555 0 37.844-10.066 37.844-10.066c.59-.325.653-1.148.653-1.526V61.326c0-1.11-.9-2.014-2.01-2.014m221.8-51.953c0-1.12-.888-2.024-1.999-2.024h-24.246a2.016 2.016 0 0 0-2.008 2.024l.006 46.856h-37.792V7.36c0-1.12-.892-2.024-2.001-2.024H228.21a2.014 2.014 0 0 0-2.003 2.024v126.872c0 1.12.9 2.03 2.003 2.03h24.245c1.109 0 2-.91 2-2.03V79.964h37.793l-.066 54.267c0 1.12.9 2.03 2.008 2.03h24.304c1.11 0 1.998-.91 2-2.03zM144.37 24.322c0-8.73-7-15.786-15.635-15.786c-8.627 0-15.632 7.055-15.632 15.786c0 8.72 7.005 15.795 15.632 15.795c8.635 0 15.635-7.075 15.635-15.795m-1.924 83.212V48.97a2.015 2.015 0 0 0-2.006-2.021h-24.169c-1.109 0-2.1 1.144-2.1 2.256v83.905c0 2.466 1.536 3.199 3.525 3.199h21.775c2.39 0 2.975-1.173 2.975-3.239zM413.162 46.95h-24.06c-1.104 0-2.002.909-2.002 2.028v62.21s-6.112 4.472-14.788 4.472s-10.977-3.937-10.977-12.431v-54.25c0-1.12-.897-2.03-2.001-2.03h-24.419c-1.102 0-2.005.91-2.005 2.03v58.358c0 25.23 14.063 31.403 33.408 31.403c15.87 0 28.665-8.767 28.665-8.767s.61 4.62.885 5.168c.276.547.994 1.098 1.77 1.098l15.535-.068c1.102 0 2.005-.911 2.005-2.025l-.008-85.168a2.02 2.02 0 0 0-2.008-2.028m55.435 68.758c-8.345-.254-14.006-4.041-14.006-4.041V71.488s5.585-3.423 12.436-4.035c8.664-.776 17.013 1.841 17.013 22.51c0 21.795-3.768 26.096-15.443 25.744m9.49-71.483c-13.665 0-22.96 6.097-22.96 6.097V7.359a2.01 2.01 0 0 0-2-2.024h-24.315a2.013 2.013 0 0 0-2.004 2.024v126.872c0 1.12.898 2.03 2.007 2.03h16.87c.76 0 1.335-.39 1.76-1.077c.419-.682 1.024-5.85 1.024-5.85s9.942 9.422 28.763 9.422c22.096 0 34.768-11.208 34.768-50.315s-20.238-44.217-33.913-44.217M212.229 46.73h-18.187l-.028-24.027c0-.909-.468-1.364-1.52-1.364H167.71c-.964 0-1.481.424-1.481 1.35v24.83s-12.42 2.998-13.26 3.24a2.01 2.01 0 0 0-1.452 1.934v15.603c0 1.122.896 2.027 2.005 2.027h12.707v37.536c0 27.88 19.556 30.619 32.753 30.619c6.03 0 13.243-1.937 14.434-2.376c.72-.265 1.138-1.01 1.138-1.82l.02-17.164c0-1.119-.945-2.025-2.01-2.025c-1.06 0-3.77.431-6.562.431c-8.933 0-11.96-4.154-11.96-9.53l-.001-35.67h18.188a2.014 2.014 0 0 0 2.006-2.028V48.753c0-1.12-.897-2.022-2.006-2.022" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>



      {/* Reviews */}
      <div className="w-1/3 h-full bg-gray-800 flex flex-col items-center pt-10 overflow-y-auto">
        <div className="text-gray-200 font-semibold text-3xl">Reviews</div>

        <div className=" flex flex-col items-center justify-between h-full my-6 w-full">
          {reviews.length == 0 ?
            <div>No reviews yet.</div> :
            <div className="w-8/10">
              {reviews.map((review, index) => (
                <Review
                  key={index}
                  content={review.content}
                  giver={review.giver}
                />
              ))}

            </div>}




        </div>
        <div className="flex flex-col items-center mb-4 fixed bottom-0">

          {!show ? <button className="p-3 bg-gray-700 text-gray-100 px-6 border-none rounded-xl hover:bg-gray-400 hover:text-black font-semibold transition duration-500"
            onClick={() => { setShow(true) }}
          >Add a Review</button> : <div className="w-full h-fit flex bg-gray-400 border-none rounded-xl items-center  justify-between">
            <input type="text" name="" id="" className="w-full  p-2 px-6 d" onChange={(e) => setReview(e.target.value)} />
            <button className="hover:scale-90"

              onClick={() => saveReview()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 " viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14L21 3m0 0l-6.5 18a.55.55 0 0 1-1 0L10 14l-7-3.5a.55.55 0 0 1 0-1z" /></svg>
            </button>
          </div>}

        </div>

      </div>

    </div>
  );
}

export default ViewPost;