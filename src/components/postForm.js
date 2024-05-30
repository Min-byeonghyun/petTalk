import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useCallback, useState } from "react";
import { Form, PostTitle, TitleArea, TextArea, AttachFileButton, AttachFileInput, SubmitBtn, } from "../styled-components/poststyle";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function PostForm() {
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [information, setInformation] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const navigate = useNavigate();

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "information") {
      setInformation(value);
    }
  }, []);

  const onFileChange = useCallback((e) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
      setFileError(false);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || title === "" || title.length > 50 || information === "" || information.length > 300 || !file) {
      if (!file) setFileError(true);
      return;
    }

    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "tweets"), {
        title,
        information,
        createAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${docRef.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(docRef, {
          photo: url,
        });
      }
      setTitle("");
      setInformation("");
      setFile(null);
      navigate("/board");
    } catch (error) {
      console.error("Error submitting post:", error.message);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <PostTitle>게시글 작성</PostTitle>
      <TitleArea
        maxLength={50}
        onChange={onChange}
        name="title"
        value={title}
        placeholder="제목"
      />
      <TextArea
        required
        rows={10}
        maxLength={300}
        onChange={onChange}
        name="information"
        value={information}
        placeholder="내용"
      />
      <AttachFileButton htmlFor="file">
        {file ? "사진추가됨" : "사진추가"}
      </AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />
      {fileError && <p style={{ color: "red" }}>사진을 추가해야 합니다.</p>}
      <SubmitBtn
        type="submit"
        value={isLoading ? "게시글 작성중.." : "게시글 올리기"}
      />
    </Form>
  );
}