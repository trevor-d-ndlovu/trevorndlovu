import { memo, useCallback, useEffect, useRef } from "react";
import StyledBlog from "components/apps/Blog/StyledBlog";
import useBlog, { formatDate } from "components/apps/Blog/useBlog";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import { useFileSystem } from "contexts/fileSystem";
import useTitle from "components/system/Window/useTitle";

const BLOG_DIR = "/Users/Public/Documents/Blog";

const Blog: FC<ComponentProcessProps> = ({ id }) => {
  const { posts, activePost, loading, setActivePost } = useBlog({ id });
  const { readFile } = useFileSystem();
  const { prependFileToTitle } = useTitle(id);
  const articleRef = useRef<HTMLElement | null>(null);

  const renderPost = useCallback(async (fileName: string) => {
    try {
      const content = (await readFile(`${BLOG_DIR}/${fileName}`)).toString();
      const container = articleRef.current;

      if (container) {
        container.classList.remove("empty-state");
        container.innerHTML = window.DOMPurify.sanitize(
          window.marked.parse(content, {
            headerIds: false,
            mangle: false,
          })
        );

        container.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", (event) => {
            event.preventDefault();
            const href = link.getAttribute("href");
            if (href && !href.startsWith("http")) {
              setActivePost(href);
            } else if (href) {
              window.open(href, "_blank");
            }
          });
        });

        prependFileToTitle(fileName);
      }
    } catch {
      if (articleRef.current) {
        articleRef.current.innerHTML = "<p>Could not load post.</p>";
      }
    }
  }, [readFile, prependFileToTitle, setActivePost]);

  useEffect(() => {
    if (loading) return;
    if (activePost) renderPost(activePost);
  }, [loading, activePost, renderPost]);

  return (
    <StyledBlog>
      <nav>
        <h2>Posts</h2>
        {posts.length === 0 && !loading && (
          <ul>
            <li style={{ borderLeft: "none", color: "#565f89", cursor: "default", paddingLeft: 0 }}>
              No posts yet.
            </li>
          </ul>
        )}
        <ul>
          {posts.map((post) => (
            <li
              key={post.fileName}
              className={activePost === post.fileName ? "active" : ""}
              onClick={() => setActivePost(post.fileName)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActivePost(post.fileName);
                }
              }}
              role="menuitem"
              tabIndex={0}
            >
              <span className="post-title">{post.title}</span>
              {post.date && <span className="post-date">{formatDate(post.date)}</span>}
            </li>
          ))}
        </ul>
      </nav>
      <article ref={articleRef} className={loading || !activePost ? "empty-state" : ""}>
        {loading ? "Loading..." : activePost ? "" : "Select a post"}
      </article>
    </StyledBlog>
  );
};

export default memo(Blog);
