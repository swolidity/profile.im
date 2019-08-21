import Link from "next/link";

export default ({ user }) => (
  <div className="user-list-item">
    <div className="profile-picture-box">
      <img className="profile-picture" src={user.picture} alt={user.username} />
    </div>

    <div className="box">
      <div className="username-box">
        <Link href={`/${user.username}`}>
          <a className="username">{user.username}</a>
        </Link>
      </div>
    </div>

    <style jsx>
      {`
        .user-list-item {
          display: flex;
          text-decoration: none;
          cursor: pointer;
          border-radius: 5px;
          align-items: center;
        }
        .box {
          flex: 0 0 auto;
        }
        .profile-picture-box {
          margin-right: 12px;
        }
        .profile-picture {
          height: 30px;
          border-radius: 50%;
        }
        .username-box {
          margin-bottom: 8px;
        }
        .username {
          text-decoration: none;
          font-size: 16px;
          font-weight: bold;
          color: #000;
        }
      `}
    </style>
  </div>
);
