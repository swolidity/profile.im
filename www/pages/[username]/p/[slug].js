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
  Button
} from "@chakra-ui/core";
import AddItemToListModal from "../../../components/AddItemToListModal";

const Post = ({ user, post }) => {
  console.log(post);
  return (
    <Layout>
      <Head>
        <title>
          {user.username}: {post.title}
        </title>

        <meta property="og:title" content={`${user.username}: ${post.title}`} />

        <meta property="og:image" content={user.picture} />
      </Head>

      <Box p={6}>
        <Heading>{post.title}</Heading>
        <Flex align="center">
          <NextLink href="/[username]" as={`/${user.username}`}>
            <Link>
              <Avatar src={user.picture} alt={user.username} mr={4} />
            </Link>
          </NextLink>

          <NextLink href="/[username]" as={`/${user.username}`}>
            <Link>{user.username}</Link>
          </NextLink>
        </Flex>

        {post.type === "list" ? <AddItemToListModal postID={post._id} /> : null}

        {post.items.map(item => (
          <Box>{item.content}</Box>
        ))}
      </Box>
    </Layout>
  );
};

Post.getInitialProps = async ({ query: { username, slug } }) => {
  const res = await fetch(`${process.env.API_URL}/post/${slug}`);
  return await res.json();
};

export default Post;
