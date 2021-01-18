import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Heading } from "@chakra-ui/react";

const Posts = () => {
	const {
		loading,
		data: { getPosts: posts },
	} = useQuery(FETCH_POSTS_QUERY);

	if (data) {
		console.log(data);
	}

	return (
		<>
			<Heading>Posts</Heading>
			{loading ? (
				<h1>loading</h1>
			) : (
				post && posts.map((post) => <PostCard key={post.id} post={post} />)
			)}
		</>
	);
};

const FETCH_POSTS_QUERY = gql`
	{
		getPosts {
			id
			body
			createdAt
			username
			likeCount
			likes {
				username
			}
			commentCount
			comments {
				id
				username
				createdAt
			}
		}
	}
`;

export default Posts;
