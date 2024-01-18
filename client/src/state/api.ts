import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetProductsResponse, GetTransactionsResponse  } from "./types";

/* 백엔드로 부터 데이터를 가져오는 createApi({}) */
export const api = createApi({
    /* localhost:8080으로 기본 엔드포인트 지정.API를 호출할때마다 해당 주소로 요청을 보냄.fetch로 http 요청 */
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    /* reducerPath: API 쿼리 결과를 저장할 Redux 리듀서의 경로를 지정.default main.tsx. 
       앱의 진입점인 main.jsx에 저장하면 리액트 앱의 모든 구성요소에서 접근 가능. */
    reducerPath: "main",
    tagTypes: ["Kpis", "Products", "Trsansaction"],
    /* 엔드포인트 정의 및 백엔드에서 응답하는 데이터의 구조를 정의한 인터페이스 */
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