const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
// create a schema
const postSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    author_id: { type: Schema.Types.ObjectId, ref: 'User' }
}, { collection: 'post' });

const Post = Mongoose.model('Post', postSchema);

module.exports = Post;