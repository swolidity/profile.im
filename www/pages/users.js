import "isomorphic-unfetch";
import Layout from "../components/layout";
import AddToProfile from "../components/AddToProfile";
import { useFetch } from "tipple";
import Link from "next/link";

const Answer = ({ answer, user }) => (
  <div className="answer">
    <div className="question-header">
      <Link href={`/${user.username}/${answer.slug}`}>
        <a>{answer.title}</a>
      </Link>
    </div>

    {answer.items.map((item, index) => (
      <div key={index}>
        {item.meta ? (
          <a href={item.meta.url} target="_blank">
            <div className="card">
              <div className="image box">
                <img src={item.meta.image} alt={item.meta.title} />
              </div>
              <div className="box content">
                <div className="content-title">{item.meta.title}</div>
                <div className="content-description">
                  {item.meta.description}
                </div>
              </div>
            </div>
          </a>
        ) : null}

        <div
          className="answer-content"
          dangerouslySetInnerHTML={{ __html: answer.content }}
        />
      </div>
    ))}

    <style jsx>
      {`
        .answer {
          margin-bottom: 18px;
          border: 2px solid #f8f8f8;
          border-radius: 5px;
        }
        .answer a {
          text-decoration: none;
        }
        .answer img {
          width: 120px;
          margin-right: 16px;
        }
        .answer-content {
          padding: 8px;
        }
        .card {
          display: flex;
        }
        .card box {
          display: flex;
        }
        .content {
          padding: 8px 8px 8px 0;
        }
        .content-title {
          margin-bottom: 6px;
        }
        .content-description {
          font-size: 12px;
        }
      `}
    </style>
  </div>
);

const Users = ({ user, answers }) => {
  return (
    <Layout>
      <div className="user-profile">
        <div className="profile-top">
          <img className="profile-pic" src={user.picture} alt={user.name} />
          <div>
            <div className="username">{user.username}</div>
            <div className="views">{user.profile_views} views</div>
            <div className="bio">{user.bio}</div>
          </div>
        </div>

        <AddToProfile />

        {answers.map(answer => (
          <Answer answer={answer} user={user} key={answer._id} />
        ))}

        <style jsx>
          {`
            .user-profile {
              max-width: 800px;
              margin: 0 auto;
            }
            .profile-top {
              display: flex;
              margin: 18px 0;
            }
            .profile-pic {
              height: 100px;
              border-radius: 50%;
              margin-right: 40px;
            }
            .username {
              font-size: 22px;
              font-weight: bold;
            }
            .views {
              font-size: 14px;
            }
            .bio {
              margin: 14px 0;
              font-size: 14px;
            }

            .question-header {
              padding: 8px;
              font-weight: bold;
              font-size: 12px;
              border-bottom: 1px solid #f8f8f8;
            }
            .title {
              font-size: 12px;
              font-weight: bold;
              margin-bottom: 4px;
            }
          `}
        </style>
      </div>
    </Layout>
  );
};

Users.getInitialProps = async ({ query: { username } }) => {
  const res = await fetch(`${process.env.API_URL}/user_profile/${username}`);
  const json = await res.json();

  return { user: json.user, answers: json.answers };
};

export default Users;
