import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

export function CardPost({ post }) {
  return (
    <Card
      className="max-w-sm transition-all duration-100 hover:-translate-y-6"
      imgSrc={post.image}>
      <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
        {post.title}
      </h5>

      <span>{post.category}</span>
      <Link to={`/post/${post.slug}`}>
        <Button className="font-vazir w-full">خواندن مقاله</Button>
      </Link>
    </Card>
  );
}
