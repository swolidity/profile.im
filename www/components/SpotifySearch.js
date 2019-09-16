import { useState } from "react";
import Downshift from "downshift";
import fetch from "isomorphic-unfetch";

const headers = {
  Accept: "application/json"
};

const search = ({ query }) => {
  return fetch(encodeURI(`${process.env.API_URL}/spotify?search=${query}`), {
    headers
  })
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json());
};

export default () => {
  const [songs, setSongs] = useState([]);
  const [selected, setSelected] = useState();

  return (
    <div>
      {selected ? (
        <div className="song-item">
          <div className="thumbnail">
            <img src={selected.album.images[1].url} />
          </div>
          <div>
            <div className="name">{selected.name}</div>
            <div>{selected.artists[0].name}</div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Downshift
        onChange={selection => {
          setSelected(selection);
        }}
        itemToString={item => (item ? item.name : "")}
        onInputValueChange={async inputValue => {
          if (inputValue === "") {
            //setSongs([]);
            return;
          }

          const results = await search({ query: inputValue });

          if (results) setSongs(results.tracks.items);
        }}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          highlightedIndex,
          selectedItem,
          inputValue
        }) => (
          <div>
            <input
              {...getInputProps({
                value: inputValue
              })}
              placeholder="Search Spotify or Enter URL"
              className="search"
            />
            <div {...getMenuProps()}>
              {isOpen || true
                ? songs.map((item, index) => (
                    <div
                      {...getItemProps({
                        key: item.id,
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

                      <div>
                        <div className="name">{item.name}</div>
                        <div className="artist-name">
                          {item.artists[0].name}
                        </div>
                      </div>
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
            margin-bottom: 16px;
          }
          :global(.song-item) {
            display: flex;
            align-items: center;
            cursor: pointer;
            margin-bottom: 16px;
          }
          :global(.song-item > .thumbnail) {
            margin-right: 16px;
            height: 50px;
            width: 50px;
          }
          :global(.song-item > .thumbnail > img) {
            width: 50px;
            height: 50px;
          }
          :global(.song-item .name) {
            margin-bottom: 4px;
            font-weight: bold;
          }
          :global(.song-item .artist-name) {
            font-size: 14px;
          }
        `}
      </style>
    </div>
  );
};
