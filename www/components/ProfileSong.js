export default ({ item }) => (
  <a href={item.spotify_url} className="profile-song" target="_blank">
    <div className="thumbnail">
      <img src={item.image} />
    </div>

    <div>
      <div className="name">{item.name}</div>
      <div className="artist-name">{item.artist}</div>
    </div>

    <style jsx>
      {`
        .profile-song {
          display: flex;
          align-items: center;
          cursor: pointer;
          color: #000;
          text-decoration: none;
        }
        .thumbnail {
          margin-right: 16px;
          height: 50px;
          width: 50px;
        }
        .thumbnail > img {
          width: 50px;
          height: 50px;
        }
        .name {
          margin-bottom: 4px;
          font-weight: bold;
        }
        .artist-name {
          font-size: 14px;
        }
      `}
    </style>
  </a>
);
