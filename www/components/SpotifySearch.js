import { useState } from "react";
import Downshift from "downshift";
import fetch from "isomorphic-unfetch";

const headers = {
  Accept: "application/json",
  Authorization: `Bearer BQCl_xjxm8IOfBTugxG55u62UqPTZPLD0K5fjVsx7Rs9OcrdJYBvovgZhEj6nf9XrjYwedg32wBteSX23kQ`
};

const search = ({ query, type = "track" }) => {
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, {
    headers
  })
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json());
};

export default () => {
  const [songs, setSongs] = useState([]);

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
          setSongs(results.items);
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
                placeholder: "Search YouTube or Enter URL"
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
                      className="video"
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
          :global(.video) {
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
};
