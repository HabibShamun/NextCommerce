import axios from "axios";
import React from "react";

const axiosInstance=axios.create({
    baseURL:'https://nexcommerce-server.vercel.app'
})


export default function useAxios() {
  return axiosInstance
}
