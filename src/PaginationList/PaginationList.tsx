import { FC, useEffect, useRef, useState } from "react";
import { Spinner } from "../share/Spinner/Spinner";
import { Posts } from "./types";
import { useDebounce } from "../hooks/useDebounce";
import { getPosts } from "./helpers";
import { useLastValue } from "../hooks/useLastValue";

export const PaginationList: FC = () => {
  const [value, setValue] = useState("");
  const [posts, setPosts] = useState<Posts[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const controller = useRef(new AbortController());

  const debounceValue = useDebounce(value, 1_000);

  const lastValue = useLastValue(debounceValue);

  useEffect(() => {
    setLoading(true);

    getPosts(debounceValue, page, 50, controller.current.signal).then(
      (data: Posts[]) => {
        setPosts((prev) => {
          if (Array.isArray(prev) && page > 0) {
            return [...prev, ...data];
          }

          return data;
        });
        setLoading(false);
      }
    );

    return () => {
      controller.current.abort();
      controller.current = new AbortController();
    };
  }, [controller, debounceValue, lastValue, page]);
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
          setLoading(true);
          setPosts(null);
          setPage(0);
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
          {!posts && loading && (
            <span style={{ position: "absolute", left: "50%", top: "40%" }}>
              <Spinner />
            </span>
          )}
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
      </div>

      {posts && posts.length % 50 === 0 && (
        <button onClick={() => setPage((prev) => prev + 1)}>
          {loading ? "Загрузка..." : "Показать еще"}
        </button>
      )}
    </div>
  );
};
