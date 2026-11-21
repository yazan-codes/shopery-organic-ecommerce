import { shoperyIcons } from "../../data/data";

const TagIcon = shoperyIcons.saleTag;
const AuthorIcon = shoperyIcons.account;
const CommentIcon = shoperyIcons.comment;

export default function BlogMeta({ post }) {
  return <div className="blog-meta d-flex flex-wrap align-items-center">
    <span><TagIcon />{post.label}</span>
    <span><AuthorIcon /><span className="blog-meta__by">By</span> {post.author.role}</span>
    <span><CommentIcon />{post.comments.length} Comments</span>
  </div>;
}
