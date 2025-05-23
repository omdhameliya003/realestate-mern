import React, { useEffect, useState } from "react";
import "./Comment.css";
import { useParams } from "react-router-dom";
import dayjs from 'dayjs'

function Comment() {
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const { property_id } = useParams();
  const [isnewAdded, setIsnewAdded]=useState(false)

  const initialstate = {
    commentMessage: "",
    user_id: user_id,
    property_id: property_id,
  };
  const [myComment, setMyComment] = useState(initialstate);
  const [allcomments, setAllComments] = useState([]);

  useEffect(() => {
    async function getComments() {
      const token = JSON.parse(localStorage.getItem("token") || "");
      const res = await fetch(`http://localhost:5000/comment/${property_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      setAllComments(result.comments);
    }
    getComments();
  }, [isnewAdded]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("token"));
    const res = await fetch("http://localhost:5000/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(myComment),
    });
    const result = await res.json();
    if (result.success) {
      console.log("comment submited successfully.");
      setMyComment({ ...initialstate });
      setIsnewAdded((prev)=>(!prev));
    
    } };

  function getExactTimeAgo(dateString) {
    const now = dayjs();
    const past = dayjs(dateString);
    const seconds = now.diff(past, 'second');
    const minutes = now.diff(past, 'minute');
    const hours = now.diff(past, 'hour');
    const days = now.diff(past, 'day');
    const months = now.diff(past, 'month');
    const years = now.diff(past, 'year');
  
    if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
    if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;

    return `${years} year${years !== 1 ? 's' : ''} ago`;

  }

  return (
    <>
      <div className="comment-container">
        <button
          className="btn-goback-comment"
          onClick={() => window.history.back()}
        >
          ← Go Back
        </button>
        <h2>Leave a Comment</h2>

        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            name="comment"
            placeholder="Write your comment..."
            required
            value={myComment.commentMessage}
            onChange={(e) =>
              setMyComment({ ...myComment, commentMessage: e.target.value })
            }
          ></textarea>
          <button type="submit">Add Comment</button>
        </form>

        <h3>All Comments</h3>

        {allcomments && allcomments.length > 0
          ? allcomments.map((item,index) => {
             return <div className="comment" key={item._id}>
                <strong> {item?.user_id?.fname +" " +item?.user_id?.lname +"  :-  "} </strong>
                {item.commentMessage}
                <time>{getExactTimeAgo(item.createdAt)}</time>
              </div>
            })
          :<p>No comments yet. Be the first to comment!</p>}
      </div>
    </>
  );
}

export default Comment;
