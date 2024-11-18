const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ssherikar2005:shrinivas%40123@cluster0.u4yupz4.mongodb.net/Blogs');
const BlogsSchema = new mongoose.Schema({
    authorName: [String],
    title: String,
    content: String,
    published: Boolean,
    publishedDate: Date,
})
const Blogs = mongoose.model('Blogs', BlogsSchema);
module.exports = {
    Blogs
}               
