import { Flex, Box, Heading, Text, Stack, Link } from "@chakra-ui/core";
import Linkify from "react-linkify";
import { formatDistanceToNow } from "date-fns";
import NextLink from "next/link";
import Card from "../components/Card";

export const LinkifyComponentDecorator = (href, text, key) => (
  <a href={href} key={key} target="_blank" className="linkified">
    {text}
  </a>
);

export const PostItem = ({ user, post, ...rest }) => (
  <Box shadow="sm" rounded="md" p={2} {...rest}>
    <Box>
      <Heading size="sm">
        <NextLink
          href="/[username]/p/[slug]"
          as={`/${user.username}/p/${post.slug}`}
        >
          <Link>{post.title}</Link>
        </NextLink>
      </Heading>
    </Box>

    <Box className="createdAt" mb={2}>
      {formatDistanceToNow(new Date(post.created_at))} ago
    </Box>

    <Box mb={4}>{post.description}</Box>

    <Box mb={2}>
      <Text>
        <Linkify componentDecorator={LinkifyComponentDecorator}>
          {post.content}
        </Linkify>
      </Text>
    </Box>

    <Box mb={2}>{post.oembed ? <Card data={post.oembed} /> : null}</Box>
  </Box>
);

export default ({ user, posts }) => (
  <Stack spacing={3}>
    {posts.map(post => (
      <PostItem user={user} post={post} key={post._id} />
    ))}
  </Stack>
);
