import { useState } from "react";
import "isomorphic-unfetch";
import Layout from "../components/Layout";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import AddPageModal from "../components/AddPageModal";
import Link from "next/link";
import Linkify from "react-linkify";
import Card from "../components/Card";

const Users = ({ user, pages }) => {
  const loggedInUser = useLoggedInUser();
  const [pagesState, setPagesState] = useState(pages);

  const handleAddPage = newPage => {
    setPagesState([...pagesState, newPage]);
  };

  return (
    <Layout>
      <div className="user-profile">
        <div className="profile-top">
          <div className="container">
            <img className="profile-pic" src={user.picture} alt={user.name} />
            <div>
              <div className="name">Andy Kay</div>
              <div className="username">@{user.username}</div>
            </div>
          </div>
        </div>

        <div className="stuffs">
          <div className="views">
            <span className="bold">{user.profile_views}</span> views
          </div>

          {loggedInUser && loggedInUser._id === user._id ? (
            <AddPageModal onAddPage={handleAddPage} />
          ) : null}

          <div className="pages">
            {pagesState.map(page => (
              <div className="page" key={page._id}>
                <div>
                  <Link
                    href="/[username]/p/[slug]"
                    as={`/${user.username}/p/${page.slug}`}
                  >
                    <a className="page-title">{page.title}:</a>
                  </Link>
                </div>
                <Linkify properties={{ target: "_blank" }}>
                  {page.content}
                </Linkify>

                {page.oembed ? <Card data={page.oembed} /> : null}
              </div>
            ))}
          </div>
        </div>

        <style jsx>
          {`
            .profile-top {
            }
            .profile-top > .container {
              max-width: 600px;
              margin: 0 auto;
              display: flex;
              padding: 32px 16px;
            }
            .profile-pic {
              height: 80px;
              border-radius: 50%;
              margin-right: 24px;
            }
            .name {
              font-size: 34px;
              font-weight: bold;
            }
            .username {
              font-size: 24px;
              font-weight: 500;
              margin-bottom: 4px;
            }
            .stuffs {
              max-width: 600px;
              margin: 0 auto;
              padding: 16px;
            }
            .views {
              margin-bottom: 32px;
            }
            .title {
              font-size: 12px;
              font-weight: bold;
              margin-bottom: 4px;
            }
            .bold {
              font-weight: bold;
            }
            .page {
              margin-bottom: 32px;
              background: #fff;
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
                0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
              padding: 16px;
              border-radius: 5px;
              cursor: pointer;
            }
            .page-title {
              font-weight: 500;
              font-size: 28px;
            }
          `}
        </style>
      </div>
    </Layout>
  );
};

Users.getInitialProps = async ({ query: { username } }) => {
  const res = await fetch(`${process.env.API_URL}/user_profile/${username}`);
  return await res.json();
};

export default Users;
