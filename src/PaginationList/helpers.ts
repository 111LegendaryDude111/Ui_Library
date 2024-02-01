import { Posts } from "./types";

export const getPosts = async () => {
  let resp: null | Posts[] = null;
  const req = await fetch("https://jsonplaceholder.typicode.com/posts/");

  resp = req.json() as unknown as Posts[];

  return resp;
};
