export default ({ item }) => (
  <div className="quote">
    <blockquote>"{item.quote}"</blockquote>
    <div>- {item.author}</div>

    <style jsx>
      {`
        blockquote {
          margin-bottom: 4px;
        }
      `}
    </style>
  </div>
);
