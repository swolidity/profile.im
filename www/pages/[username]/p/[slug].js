import Layout from "../../../components/Layout";
import Head from "next/head";
import NextLink from "next/link";
import {
  Flex,
  Box,
  Heading,
  Avatar,
  Text,
  Link,
  Button,
  Stat,
  StatLabel,
  StatNumber
} from "@chakra-ui/core";
import AddItemToListModal from "../../../components/AddItemToListModal";
import Card from "../../../components/Card";
import { useState } from "react";
import Linkify from "react-linkify";
import { formatDistanceToNow } from "date-fns";
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";

export const LinkifyComponentDecorator = (href, text, key) => (
  <Link href={href} key={key} target="_blank" className="linkified">
    {text}
  </Link>
);

const Post = ({ user, post }) => {
  const [postState, setPostState] = useState(post);
  const loggedInUser = useLoggedInUser();

  const handleAddItem = newItem => {
    setPostState({ ...postState, items: [...postState.items, newItem] });
  };

  return (
    <Layout>
      <Head>
        <title>
          {user.username}: {postState.title}
        </title>

        <meta
          property="og:title"
          content={`${user.username}: ${postState.title}`}
        />

        <meta property="og:description" content={postState.description} />

        <meta property="og:image" content={user.picture} />
      </Head>

      <Box p={6}>
        <div className="container">
          <Heading mb={3}>{postState.title}</Heading>
          <Flex align="center" mb={8}>
            <NextLink href="/[username]" as={`/${user.username}`}>
              <Link>
                <Avatar src={user.picture} alt={user.username} mr={4} />
              </Link>
            </NextLink>

            <Box>
              <Heading size="md">
                <NextLink href="/[username]" as={`/${user.username}`}>
                  <Link>{user.username}</Link>
                </NextLink>
              </Heading>
              {formatDistanceToNow(new Date(post.created_at))} ago
            </Box>
          </Flex>

          <Text mb={4}>{post.description}</Text>

          {postState.type === "list" && loggedInUser ? (
            <AddItemToListModal
              postID={postState._id}
              onAddItem={handleAddItem}
            />
          ) : null}

          {postState.type === "list" ? (
            <Stat>
              <StatLabel>Items</StatLabel>
              <StatNumber>{postState.items.length}</StatNumber>
            </Stat>
          ) : null}

          {postState.items.map(item => (
            <Box key={item._id}>
              <Linkify componentDecorator={LinkifyComponentDecorator}>
                {item.content}
              </Linkify>

              <Box mb={2}>
                {item.oembed ? <Card data={item.oembed} /> : null}
              </Box>
            </Box>
          ))}
        </div>
      </Box>
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>
    </Layout>
  );
};

Post.getInitialProps = async ({ query: { username, slug } }) => {
  const res = await fetch(`${process.env.API_URL}/post/${slug}`);
  return await res.json();
};

export default Post;
