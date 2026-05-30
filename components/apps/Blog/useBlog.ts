import { useCallback, useEffect, useState } from "react";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import { useFileSystem } from "contexts/fileSystem";
import { useProcesses } from "contexts/process";
import { loadFiles } from "utils/functions";

export type BlogPost = {
  date: string;
  fileName: string;
  title: string;
};

const BLOG_DIR = "/Users/Public/Documents/Blog";

const parseTitle = (content: string): string => {
  const titleMatch = /^#\s+(.+)/m.exec(content);
  return titleMatch ? titleMatch[1] : "Untitled";
};

const parseDate = (fileName: string): string => {
  const dateMatch = /^(\d{4}-\d{2}-\d{2})/.exec(fileName);
  return dateMatch ? dateMatch[1] : "";
};

export const formatDate = (dateStr: string): string => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[Number.parseInt(m, 10) - 1]} ${Number.parseInt(d, 10)}, ${y}`;
};

const loadDeps = async (libs: string[]): Promise<void> => {
  if (!window.marked || !window.DOMPurify) {
    await loadFiles(libs);
  }
};

const readPosts = async (
  readdirFn: (path: string) => Promise<string[]>,
  readFileFn: (path: string) => Promise<Buffer>
): Promise<BlogPost[]> => {
  let files: string[];
  try {
    files = await readdirFn(BLOG_DIR);
  } catch {
    return [];
  }

  const mdFiles = files
    .filter((f) => f.endsWith(".md"))
    .sort((a, b) => b.localeCompare(a));

  return Promise.all(
    mdFiles.map(async (fileName) => {
      try {
        const content = (await readFileFn(`${BLOG_DIR}/${fileName}`)).toString();
        return {
          date: parseDate(fileName),
          fileName,
          title: parseTitle(content),
        };
      } catch {
        return {
          date: parseDate(fileName),
          fileName,
          title: fileName
            .replace(/\.md$/, "")
            .replace(/^\d{4}-\d{2}-\d{2}-/, "")
            .replace(/-/g, " "),
        } as BlogPost;
      }
    })
  );
};

const useBlog = ({ id }: ComponentProcessProps): {
  activePost: string;
  loading: boolean;
  posts: BlogPost[];
  setActivePost: React.Dispatch<React.SetStateAction<string>>;
} => {
  const { readFile, readdir } = useFileSystem();
  const { processes: { [id]: { libs = [] } = {} } = {} } = useProcesses();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activePost, setActivePost] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async (): Promise<void> => {
      await loadDeps(libs);
      setLoading(false);
    };

    init();
  }, [libs]);

  const loadPosts = useCallback(async () => {
    const blogPosts = await readPosts(readdir, readFile);
    setPosts(blogPosts);

    if (blogPosts.length > 0) {
      setActivePost((prev) => prev || blogPosts[0].fileName);
    }
  }, [readFile, readdir]);

  useEffect(() => {
    if (loading) return;
    loadPosts();
  }, [loading, loadPosts]);

  return { activePost, loading, posts, setActivePost };
};

export default useBlog;
