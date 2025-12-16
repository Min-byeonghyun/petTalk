import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";
import Post from "./post";
import Page from "./page";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 1006px;
`;

const NoticeBoard = () => {
  const [tweets, setTweets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tweetsPerPage = 4;

  useEffect(() => {
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createAt", "desc")
      );
      const unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { title, information, createAt, userId, username, photo } =
            doc.data();
          return {
            title,
            information,
            createAt,
            userId,
            username,
            photo,
            id: doc.id,
          };
        });
        setTweets(tweets);
      });
      return () => unsubscribe();
    };
    fetchTweets();
  }, []);

  const indexOfLastTweet = currentPage * tweetsPerPage;
  const indexOfFirstTweet = indexOfLastTweet - tweetsPerPage;
  const currentTweets = tweets.slice(indexOfFirstTweet, indexOfLastTweet);
  const totalPages = Math.ceil(tweets.length / tweetsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Wrapper>
        {currentTweets.map((tweet) => (
          <Post key={tweet.id} {...tweet} />
        ))}
      </Wrapper>
      <Page
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default NoticeBoard;
