import { FC, useState } from "react";
import { Spinner } from "../share/Spinner/Spinner";
import { Posts } from "./types";
import { getPosts } from "./helpers";

interface PaginationListProps {}
export const PaginationList: FC<PaginationListProps> = () => {
  const [value, setValue] = useState("");
  const [posts, setPosts] = useState<Posts[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  //   useEffect(() => {
  //     setLoading(true);
  //     fetch("https://jsonplaceholder.typicode.com/posts")
  //       .then((response) => response.json())
  //       .then((json) => {
  //         setTimeout(() => {
  //           setLoading(false);
  //           setPosts(json);
  //         }, 2_000);
  //       });
  //   }, []);

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
          overflow: "scroll",
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
            overflow: "scroll",
          }}
        >
          {!posts && loading && <Spinner />}
          {posts &&
            posts.map((post, i) => {
              const { userId, title, body } = post;

              return (
                <div key={userId} style={{ border: "1px solid black" }}>
                  #{i + 1} <h4>{title}</h4>
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
          const posts = await getPosts();
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
