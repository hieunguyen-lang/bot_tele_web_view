import Masonry from 'react-masonry-css';
import PostCard from './PostCard';
import { useEffect, useRef, useCallback } from 'react';
import { TablePostData ,TablePostDataMock } from '../types';

type Props = {
  posts: TablePostData[];
  fetchNextPage: () => void;
  hasMore: boolean;
};
export default function PostCardList({ posts, fetchNextPage, hasMore }: Props) {
    const observerRef = useRef<HTMLDivElement | null>(null);

  const breakpointColumnsObj = {
        default: 6,   // ≥ 1920px → 6 cột (32 inch trở lên)
        1920: 5,      // < 1920px → 5 cột
        1600: 4,      // < 1600px → 4 cột
        1280: 3,      // < 1280px → 3 cột
        960: 2,       // < 960px  → 2 cột
        640: 1        // < 640px  → 1 cột (mobile)
    };
    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
            fetchNextPage();
        }
        },
        [hasMore, fetchNextPage]
    );

    useEffect(() => {
        const option = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
        };

        const observer = new IntersectionObserver(handleObserver, option);
        if (observerRef.current) observer.observe(observerRef.current);

        return () => {
        if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [handleObserver]);

  return (
    <>  
        
       <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-[220px]">
          <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto"
          columnClassName="pl-6 bg-clip-padding"
          >
          {posts.map(post => (
             <div key={post.posturl} className="mb-8">
              <PostCard  key={post.posturl} post={post} />
            </div>
          ))}
          </Masonry>
          {/* Element để observer */}
          <div ref={observerRef} className="h-12 mt-4 flex justify-center items-center">
              {hasMore ? <span className="animate-pulse text-gray-500">🔄 Đang tải thêm...</span> : <span>✅ Đã hết dữ liệu</span>}
          </div>
        </div>
    </>
  );
}
