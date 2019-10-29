import { useState } from "react";
import "isomorphic-unfetch";
import Layout from "../components/Layout";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import AddPostModal from "../components/AddPostModal";
import Link from "next/link";
import Linkify from "react-linkify";
import Card from "../components/Card";
import { Flex, Box, Tag, Heading, Text, Avatar, Stack } from "@chakra-ui/core";
import { formatDistanceToNow } from "date-fns";

const LinkifyComponentDecorator = (href, text, key) => (
  <a href={href} key={key} target="_blank" className="linkified">
    {text}
  </a>
);

const Users = ({ user, pages: posts }) => {
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

          <Stack spacing={3}>
            {postsState.map(post => (
              <Box shadow="sm" rounded="md" p={2} key={post._id}>
                <Box>
                  <Heading size="sm">
                    <Link
                      href="/[username]/p/[slug]"
                      as={`/${user.username}/p/${post.slug}`}
                    >
                      <a className="post-title">{post.title}</a>
                    </Link>
                  </Heading>
                </Box>

                <Box className="createdAt" mb={2}>
                  {formatDistanceToNow(new Date(post.created_at))} ago
                </Box>

                <Box mb={4}>{post.description}</Box>

                <Box className="content" mb={2}>
                  <Text>
                    <Linkify componentDecorator={LinkifyComponentDecorator}>
                      {post.content}
                    </Linkify>
                  </Text>
                </Box>

                <Box mb={2}>
                  {post.oembed ? <Card data={post.oembed} /> : null}
                </Box>
              </Box>
            ))}
          </Stack>
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
