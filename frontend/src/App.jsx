import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState("");
  const [post, setPost] = useState("");

  const gettingPosts = () => {
    fetch('https://ocalhost:3005/posts')
      .then(resp => resp.json())
      .then(results => setPosts(results.data))
  };
  useEffect(() =>{
    gettingPosts();
  }, []);

  const deleteAPost = (id) => {
    fetch(`https://localhosts:3005/posts/${id}`,
        {
          method: 'DELETE',
          headers: {'Content-type': 'applications/json'}
        }).then(resp => resp.json())
          .then((results) => {
            gettingPosts();
            console.log("Status of retrieving posts: " + results.status)
          })
  };
  const addAPost = () => {
    const newPost = { post: post };
    fetch('http://localhost:3001/addpost', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)

    }).then(res => res.json()).then((results) => {
      gettingPosts();
      console.log("Status of retrieving posts: " + results.status)
    });
    setPost("");
  };

  const timestampGenerator = (period) => {
    const dateTimeObj = new Date(period);
    let time = dateTimeObj.toLocaleTimeString().split(":");
    let date = dateTimeObj.toDateString().split(" ").slice(1);
    let unit = time[2].slice(3).toLocaleUpperCase();
    let result = `${date[0]} ${date[1]} ${date[2]} - ${time[0]}:${time[1]} ${unit}`;
    return result;
  }
  return (
    <div className='react-app-component text-center'>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Enter your post</label>
                  <textarea className="form-control" id="post-content" rows="3"></textarea>
                  <div className="d-grid gap-2">
                    <button type="button" className="btn btn-primary mt-2">Post</button>
                  </div>
                </div>
              </div>
            </div>

            {posts.map((post, index) => {
            return (
              <div key={index} className="card text-white bg-dark my-3 text-start">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">{timestampGenerator(post.createdAt)}</h6>
                  <p className="card-text">{post.post}</p>
                  <a href="#" className="card-link" onClick={() => deleteAPost(post._id)}>Delete</a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  </div>
);
}

export default App;