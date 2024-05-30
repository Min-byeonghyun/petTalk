import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { Form, PostTitle, TitleArea, TextArea, AttachFileButton ,AttachFileInput ,SubmitBtn} from "../styled-components/poststyle";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [information, setInformation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "tweets", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setInformation(data.information);
          if (data.photo) {
            const url = await getDownloadURL(ref(storage, data.photo));
            setPhotoUrl(url);
          }
        }
      } catch (error) {
        console.error("게시글 가져오기 오류:", error);
      }
    };
    fetchPost();
  }, [id]);

  const onUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = doc(db, "tweets", id);
      const updatedData = { title, information };
      if (photo) {
        const photoRef = ref(storage, `tweets/${id}`);
        await uploadBytes(photoRef, photo);
        updatedData.photo = await getDownloadURL(photoRef);
      }
      await updateDoc(docRef, updatedData);
      setLoading(false);
      navigate(`/board`);
    } catch (error) {
      console.error("게시글 수정 오류:", error);
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onUpdate}>
      <PostTitle>게시글 수정</PostTitle>
      <TitleArea
        maxLength={50}
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        value={title}
        placeholder="제목"
      />
      <TextArea
        required
        rows={10}
        maxLength={300}
        onChange={(e) => setInformation(e.target.value)}
        name="information"
        value={information}
        placeholder="카셰어링 가능 날짜와 차량상태,상세설명을 입력하세요."
      />
      {photoUrl && <img src={photoUrl} alt="Current" width="100" />}
      <AttachFileButton htmlFor="file">
        {photo ? "사진 수정됨" : "사진 수정"}
      </AttachFileButton>
      <AttachFileInput
        onChange={(e) => setPhoto(e.target.files[0])}
        type="file"
        id="file"
        accept="image/*"
      />
      <SubmitBtn type="submit" value={isLoading ? "수정 중.." : "수정하기"} />
    </Form>
  );
}