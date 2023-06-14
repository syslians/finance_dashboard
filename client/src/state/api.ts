import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetProductsResponse, GetTransactionsResponse  } from "./types";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "main",
    tagTypes: ["Kpis", "Products", "Trsansaction"],
    endpoints: (build) => ({
      getKpis: build.query<Array<GetKpisResponse>, void>({
        query: () => "kpi/kpis",
        providesTags: ["Kpis"],
      }),
      getProducts: build.query<Array<GetProductsResponse>, void>({
        query: () => "product/products",
        providesTags: ["Products"],
      }),
      getTransaction: build.query<Array<GetTransactionsResponse>, void>({
        query: () => "transaction/transactions",
        providesTags: ["Trsansaction"],
      }),
    }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionQuery } = api;