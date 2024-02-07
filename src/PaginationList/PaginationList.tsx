import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Spinner } from "../share/Spinner/Spinner";
import { Posts } from "./types";
import { getPosts } from "./helpers";
import { useDebounce } from "../hooks/useDebounce";

interface PaginationListProps {}
export const PaginationList: FC<PaginationListProps> = () => {
  const [value, setValue] = useState("");
  const [posts, setPosts] = useState<Posts[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useRef({ searchValue: "", limit: 50, start: 0 });

  const debounceValue = useDebounce(value, 1_000);

  useEffect(() => {
    if (!debounceValue) return;
    const { searchValue, limit, start } = searchParams.current;

    setLoading(true);
    fetch(
      `https://jsonplaceholder.typicode.com/posts?title_like=${searchValue}&_start=${start}&_limit=${limit}`
    )
      .then((res) => res.json())
      .then((data: Posts[]) => {
        setPosts((prev) => {
          if (Array.isArray(prev)) {
            return [...prev, ...data];
          }

          return data;
        });
        setLoading(false);
      });
  }, [debounceValue]);

  useLayoutEffect(() => {
    searchParams.current.searchValue = value;

    if (!!posts && posts?.length > 0) {
      searchParams.current.start = posts?.length;
    }
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80svh",
        width: "100%",
        padding: "0 20px",
      }}
    >
      <input
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        placeholder="Введите запрос..."
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "500px",
          overflow: "auto",
          padding: "20px 10px",
          width: "100%",
          alignItems: "center",
        }}
      >
        {posts && <div style={{ width: "100%" }}>Total: {posts?.length}</div>}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "500px",
            overflow: "auto",
          }}
        >
          {!posts && loading && <Spinner />}
          {posts &&
            posts.map((post, i) => {
              const { userId, title, body } = post;

              return (
                <div
                  key={crypto.randomUUID()}
                  style={{ border: "1px solid black" }}
                >
                  #{i + 1}
                  <div>User:#{userId}</div>
                  <h4>{title}</h4>
                  <p>{body}</p>
                </div>
              );
            })}
        </div>
        {Array.isArray(posts) && loading && <Spinner />}
      </div>

      <button
        onClick={async () => {
          setLoading(true);
          const posts = await getPosts(
            debounceValue,
            searchParams.current.start,
            searchParams.current.limit
          );
          setLoading(false);
          setPosts((prev) => {
            if (Array.isArray(prev)) {
              return [...prev, ...posts];
            }

            return posts;
          });
        }}
      >
        Показать еще
      </button>
    </div>
  );
};
