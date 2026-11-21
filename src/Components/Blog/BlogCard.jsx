import { Link } from "react-router";
import { shoperyIcons } from "../../data/data";
import { formatBlogDate } from "../../data/blogData";
import BlogMeta from "./BlogMeta";

const ArrowIcon = shoperyIcons.next;
const PlayIcon = shoperyIcons.play;

export default function BlogCard({ post }) {
  return <article className="blog-card card h-100">
    <Link className="blog-card__visual" to={`/blog/${post.id}`}>
      <img src={post.image} alt={post.imageAlt} loading="lazy" />
      <time className="blog-card__date" dateTime={post.date}>
        <strong>{formatBlogDate(post.date, { day: "numeric" })}</strong>
        <span>{formatBlogDate(post.date, { month: "short" })}</span>
      </time>
      {post.hasVideoPreview && <span className="blog-card__play"><PlayIcon /></span>}
    </Link>
    <div className="blog-card__body card-body">
      <BlogMeta post={post} />
      <h2><Link to={`/blog/${post.id}`}>{post.title}</Link></h2>
      <Link className="blog-card__read" to={`/blog/${post.id}`}>Read More <ArrowIcon /></Link>
    </div>
  </article>;
}
