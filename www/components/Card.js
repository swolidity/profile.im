export default ({ data }) => {
  return (
    <a href={data.url} className="card" target="_blank">
      <div className="thumbnail">
        <img src={data.thumbnail_url} alt={data.title} />
      </div>

      <div className="info">
        <div className="title">{data.title}</div>
        <div className="provider">{data.provider_name}</div>
      </div>

      <style jsx>
        {`
          .card {
            display: flex;
            text-decoration: none;
            overflow: hidden;
            flex-direction: row;
            flex-wrap: nowrap;
            color: #000;
            border: 1px solid #ccc;
            border-radius: 10px;
          }
          .thumbnail {
            display: flex;
            flex-basis: 96px;
            flex-shrink: 0;
            height: 100px;
            justify-content: center;
            position: relative;
            width: 100px;
            margin-right: 16px;
          }
          .thumbnail > img {
            object-fit: cover;
            height: 100px;
            width: 100px;
          }
          .info {
            padding: 8px;
          }
          .title {
            font-weight: 500;
            margin-bottom: 8px;
          }
        `}
      </style>
    </a>
  );
};
