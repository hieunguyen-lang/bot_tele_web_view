import { TablePostData } from '../types';
import { faFacebook, faThreads, faInstagram, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
type PostCardProps = {
  post: TablePostData & { image_url?: string | null };
};
const faIconMap: Record<string, IconDefinition> = {
  facebook: faFacebook,
  instagram: faInstagram,
  threads: faThreads,
};
export default function PostCard({ post }: PostCardProps) {
  const iconKey = post.type?.toLowerCase();
  const icon = iconKey ? faIconMap[iconKey] : null;

  
  return (
    <div className="relative bg-white rounded-2xl shadow-lg p-4 mb-6 pt-8 transition-shadow duration-300 ease-in-out hover:shadow-2xl">
      {/* Icon góc trái trên, đặt âm margin để icon "tràn" ra ngoài */}
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className="absolute -top-3 -left-3 w-5 h-5 text-blue-500 bg-blue-50 rounded-full shadow-md p-1 z-10"
        />
      )}

      {/* Nội dung khác */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">  
        <span className="font-medium text-blue-600">{post.name}</span>
        <span>{post.content_created}</span>
      </div>

      <div className="text-gray-800 mb-3 whitespace-pre-line">
        {post.content}
      </div>

      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post image"
          className="w-full h-auto rounded-xl mb-3"
        />
      )}

      {/* Footer sát đáy có padding-bottom nhẹ */}
      <div className="text-sm text-gray-500 flex justify-between items-center border-t pt-2 pb-3">
        <span>👍 {post.reaction_count}</span>
        <span>💬 {post.comment_count}</span>
        <span>🔁 {post.share_count}</span>
        <a
          href={post.posturl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline ml-auto"
        >
          Xem bài viết
        </a>
      </div>
    </div>

  );
}

