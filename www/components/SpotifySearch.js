import { useState } from "react";
import Downshift from "downshift";
import fetch from "isomorphic-unfetch";

const headers = {
  Accept: "application/json",
  Authorization: `Bearer BQATs_EDvrwt82201UnO9PsB-ocI6FwyCGNtNYOoWfA_TryZm9RyFb9A3abH8OD9LR_o23xo-DhHuw4PiHg`
};

const search = ({ query, type = "track,artist" }) => {
  return fetch(
    encodeURI(`https://api.spotify.com/v1/search?q=${query}&type=${type}`),
    {
      headers
    }
  )
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json());
};

export default () => {
  const [songs, setSongs] = useState([]);

  console.log(songs);

  return (
    <div>
      <Downshift
        onChange={selection =>
          alert(
            selection ? `You selected ${selection.title}` : "Selection Cleared"
          )
        }
        itemToString={item => (item ? item.value : "")}
        onInputValueChange={async inputValue => {
          const results = await search({ query: inputValue });
          console.log(results);

          if (results) setSongs(results.tracks.items);
        }}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Spotify or Enter URL"
              })}
              className="search"
            />
            <div {...getMenuProps()}>
              {isOpen
                ? songs.map((item, index) => (
                    <div
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal"
                        }
                      })}
                      className="song-item"
                    >
                      <div className="thumbnail">
                        <img src={item.album.images[1].url} />
                      </div>

                      <div className="title">{item.name}</div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        )}
      </Downshift>

      <style jsx>
        {`
          div :global(.search) {
            width: 100%;
            padding: 16px;
          }
          :global(.song-item) {
            display: flex;
            align-items: center;
            cursor: pointer;
          }
          :global(.song-item > .thumbnail > img) {
            width: 50px;
            height: 50px;
          }
        `}
      </style>
    </div>
  );
};
