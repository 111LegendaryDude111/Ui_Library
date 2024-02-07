import { Posts } from "./types";

export const getPosts = async (
  searchValue: string,
  start: string | number,
  limit: string | number
) => {
  let resp: null | Posts[] = null;
  const req = await fetch(
    `https://jsonplaceholder.typicode.com/posts?title_like=${searchValue}&_start=${start}&_limit=${limit}`
  );

  resp = req.json() as unknown as Posts[];

  return resp;
};
