import React from "react";
const NewsItem=(props)=> {
    let { title, description, imgUrl, newsUrl, source, author, time, mode } = props;

    return (
      <div className='my-3'>
        <div className={`card text-center text-bg-${mode === "light" ? "dark" : "light"}`}>
          <div className="card-body">
            <div style={{
              display:'flex',
              justifyContent:'flex-end',
              position:'absolute',
              top:'0',
              right:'0'
            }}>
            <span className="badge rounted-pill bg-danger">
              {source}
            </span>
            </div>
            <img src={!imgUrl ? "https://plus.unsplash.com/premium_photo-1707080369554-359143c6aa0b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5ld3N8ZW58MHx8MHx8fDA%3D" : imgUrl} className="card-img-top" alt="" />
            <h5 className="card-title my-4">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a
              href={newsUrl}
              key={mode}
              className={`btn btn-${mode === 'light' ? 'dark' : 'light'}`}
              style={{
                marginTop: "15px",
                padding: "5px 10px",
                fontWeight: "bold",
                border: `2px solid ${mode === 'light' ? 'white' : 'black'}`,
                display: "block",
                textAlign: "center"
              }}>
              Read More
            </a>

          </div>
          <div className={`card-footer bg-${mode === "dark" ? "light" : "dark"} text-${mode === "dark" ? "dark" : "light"}`}>
            By {!author ? "Unknown" : author} on {new Date(time).toUTCString()}
          </div>
        </div>
      </div>
    )
  }

export default NewsItem
