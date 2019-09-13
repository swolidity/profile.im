import { useState } from "react";
import Downshift from "downshift";
import search from "youtube-search";

export default () => {
  const [videos, setVideos] = useState([]);

  return (
    <Downshift
      onChange={selection =>
        alert(
          selection ? `You selected ${selection.value}` : "Selection Cleared"
        )
      }
      itemToString={item => (item ? item.value : "")}
      onInputValueChange={async inputValue => {
        const { results } = await search(inputValue, {
          maxResults: 10,
          key: process.env.YOUTUBE_API_KEY
        });

        setVideos(results);
        console.log(results);
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
          <input {...getInputProps()} placeholder="Search YouTube" />
          <ul {...getMenuProps()}>
            {isOpen
              ? videos.map((item, index) => (
                  <li
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
                  >
                    <img src={item.thumbnails.default.url} /> {item.title}
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
};
