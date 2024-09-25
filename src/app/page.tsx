"use client";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/comments").then((res) => {
      setComments(res.data);
    });
  }, []);

  const [comments, setComments] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("");

  const filteredComments = useMemo(() => {
    return comments.filter((comment) =>
      searchType === ""
        ? comment.name.includes(search) ||
          comment.email.includes(search) ||
          comment.body.includes(search)
        : searchType === "name"
        ? comment.name.includes(search)
        : searchType === "email"
        ? comment.email.includes(search)
        : comment.body.includes(search)
    );
  }, [comments, search, searchType]);

  return (
    <main className="w-full h-full bg-[url(/background.png)] flex flex-col gap-[100px] items-center justify-center py-24 px-5 overflow-x-hidden">
      <div className="border-2 border-gray-500 rounded-2xl px-5 py-[10px] flex gap-3">
        <input
          type="text"
          placeholder="Search"
          className="max-w-[400px] w-full text-white bg-transparent border-none outline-none placeholder:text-gray-500"
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
        />
        <select
          className="text-white bg-transparent border-none outline-none"
          onChange={(e) => {
            e.preventDefault();
            setSearchType(e.target.value);
          }}
        >
          <option value="" selected disabled hidden>
            Search Type
          </option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="content">Content</option>
          <option value="">All</option>
        </select>
      </div>
      <div className="w-full flex flex-wrap gap-5 justify-center">
        <AnimatePresence>
          {search
            ? filteredComments.map((comment) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, width: 0 }}
                    key={comment.id}
                    className="w-[18%] flex flex-col gap-2 items-center justify-center p-4 border border-white rounded-2xl"
                  >
                    <p>Name: {comment.name}</p>
                    <p>Email: {comment.email}</p>
                    <p>{comment.body}</p>
                  </motion.div>
                );
              })
            : comments.map((comment, i) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, width: 0 }}
                    key={comment.id}
                    className="w-[18%] flex flex-col gap-2 items-center justify-center p-4 border border-white rounded-2xl"
                  >
                    <p>Name: {comment.name}</p>
                    <p>Email: {comment.email}</p>
                    <p>{comment.body}</p>
                  </motion.div>
                );
              })}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Home;
