const Post = require("../../models/Post");

module.exports = {
	Query: {
		async getPosts() {
			try {
				const posts = await Post.find();
				return posts;
			} catch (error) {
				console.log(error);
				throw new Error(error);
			}
		},
	},
};
