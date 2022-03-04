import { useState, useEffect } from "react";
import "./App.css";
// import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import axios from "axios";

function App() {
  const [textmsg, setTextmsg] = useState([]);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [print, setPrint] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios("http://api.giphy.com/v1/gifs/search", {
          params: {
            api_key: "8Miz6SQWxMkctb5pCr4o91SiajBOGfCj",
            limit: 20,
          },
        });
        console.log(result);
        setData(result.data.data);
      } catch (err) {
        console.warn(err);
      }
    };
    fetchData();
  }, []);

  const renderGifs = () => {
    return data.map((el) => {
      return (
        <div key={el.id} className="gif">
          <img src={el.images.fixed_height.url} />
        </div>
      );
    });
  };
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const results = await axios("http://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "8Miz6SQWxMkctb5pCr4o91SiajBOGfCj",
          q: searchText,
          limit: 20,
        },
      });
      setData(results.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      {/* create POST from */}
      <div className="container">
        <nav className="navbar navbar-light bg-primary">
          <a className="navbar-brand text-light ms-4 fs-4" href="#">
            PostApp
          </a>
        </nav>
        <h4 className="createPost">create post</h4>
        <div className="form-group post">
          <input
            type="text"
            placeholder="type message"
            className="form-control typeMsg"
            id=""
            value={textmsg}
            onChange={(e) => setTextmsg(e.target.value)}
          />

          <input
            type="text"
            placeholder="serach GIF's"
            className="form-control"
            value={searchText}
            onChange={handleSearchChange}
          />
          <button className="from-control btn-primary" onClick={handleSearch}>
            serach
          </button>

          <button
            className="from-control btn-primary"
            onClick={() => setPrint(true)}
          >
            POST
          </button>
        </div>

        {/* print post */}
        {print ? (
          <div className="myPosts">
            <h2>{textmsg}</h2>
            <div className="gifList">{renderGifs()}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
