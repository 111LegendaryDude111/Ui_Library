import { Posts } from "./types";

export const getPosts = async (
  searchValue: string,
  start: string | number,
  limit?: string | number,
  abortSignal?: AbortSignal
) => {
  limit = limit ? Number(limit) : 50;
  start = Number(start) * limit;
  const req = await fetch(
    `https://jsonplaceholder.typicode.com/posts?title_like=${searchValue}&_start=${start}&_limit=${
      limit ?? 50
    }`,
    {
      signal: abortSignal,
    }
  );

  return req.json() as unknown as Posts[];
};
