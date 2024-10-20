import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Post from "../components/post";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width : 700px;
  max-width : 700px;
  margin-top : 40px;
`;
const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #3b3a3a;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AvatarImg = styled.img`
  width: 100%;
`;
const AvatarInput = styled.input`
  display: none;
`;
const Name = styled.span`
  font-size: 22px;
`;
const Tweets = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
`;

const NoTweetsMessage = styled.div`
  font-size: 18px;
  color: #555;
  text-align: center;
  margin-top: 20px;
`;

const NameInput = styled.input`
  background-color: black;
  font-size: 22px;
  text-align: center;
  color: white;
  border: 1px solid white;
  border-radius: 15px;
`;
const ChangeNameBtn = styled.button`
  background-color: #3b3a3a;
  color: white;
  padding: 10px 5px;
  font-size: 15px;
  border-radius: 10px;
  border: 0.1px solid white;
  min-width: 110px;
`;

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState([]);
  const [name, setName] = useState(user?.displayName ?? "Anonymous");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTweet();
    }
  }, [user]); 

  const onAvatarChange = async (e) => {
    if (!user) return;
    const { files } = e.target;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const photoURL = await getDownloadURL(result.ref);
      setAvatar(photoURL);
      await updateProfile(user, {
        photoURL,
      });
    }
  };

  const fetchTweet = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { username, photo, title, information , userId, createAt  } = doc.data();
      return {
        createAt ,username, photo, title, information , userId , id: doc.id , avatar : user?.photoURL, 
      };
    });
    setTweets(tweets);
  };

  const onChangeNameClick = async () => {
    if (!user) return;
    setEditMode((prev) => !prev);
    if (!editMode) return;
    try {
      await updateProfile(user, {
        displayName: name,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEditMode(false);
    }
  };

  const onNameChange = (e) =>
    setName(e.target.value);

  return (
    <Wrapper>
      <AvatarUpload htmlFor="file">
        {avatar ? (
          <AvatarImg src={avatar} alt="avatar" />
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChange}
        id="file"
        accept="image/*"
        type="file"
      />
      {editMode ? (
        <NameInput onChange={onNameChange} type="text" value={name} />
      ) : (
        <Name>{name ?? "Anonymous"}</Name>
      )}
      <ChangeNameBtn onClick={onChangeNameClick}>
        {editMode ? "완료" : "닉네임 변경"}
      </ChangeNameBtn>
      
      {tweets.length > 0 ? (
        <Tweets>
          {tweets.map((tweet) => (
            <Post key={tweet.id} {...tweet} />
          ))}
        </Tweets>
      ) : (
        <NoTweetsMessage>작성한 글이 없습니다</NoTweetsMessage>
      )}
    </Wrapper>
  );
}
