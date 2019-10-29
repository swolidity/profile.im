import { useState } from "react";
import "isomorphic-unfetch";
import Layout from "../components/Layout";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import AddPostModal from "../components/AddPostModal";
import Link from "next/link";

import { Flex, Box, Tag, Heading, Text, Avatar, Stack } from "@chakra-ui/core";

import PostList from "../components/PostList";

const Users = ({ user, posts }) => {
  const loggedInUser = useLoggedInUser();
  const [postsState, setPostsState] = useState(posts);

  const handleAddPost = newPost => {
    setPostsState([...postsState, newPost]);
  };

  return (
    <Layout>
      <Box p={6}>
        <Box className="profile-top" mb={6}>
          <div className="container">
            <Flex align="center">
              <Box mr={8}>
                <Avatar
                  src={user.picture}
                  alt={user.name}
                  rounded="full"
                  size="lg"
                />
              </Box>

              <Box>
                <Heading size="md">Andy Kay</Heading>
                <Text>@{user.username}</Text>
              </Box>
            </Flex>
          </div>
        </Box>

        <div className="container">
          <Text>{user.profile_views} views</Text>

          {loggedInUser && loggedInUser._id === user._id ? (
            <AddPostModal onAddPost={handleAddPost} />
          ) : null}

          <PostList user={user} posts={posts} />
        </div>

        <style jsx>
          {`
            :global(.linkified) {
              color: #0366d6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
            }
            :global(a) {
              word-wrap: break-word;
            }
          `}
        </style>
      </Box>
    </Layout>
  );
};

Users.getInitialProps = async ({ query: { username } }) => {
  const res = await fetch(`${process.env.API_URL}/user_profile/${username}`);
  return await res.json();
};

export default Users;
