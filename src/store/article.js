import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const RAPID_KEY = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeaders: (header) => {
      header.set("x-rapidapi-key", RAPID_KEY);
      header.set(
        "x-rapidapi-host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );
      return header;
    },
  }),

  // set of operation you want to perforom on  against your server.
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }),
  }),
}); 

export const { useLazyGetSummaryQuery } = articleApi;
