import React, { useState } from "react";
import { BiWorld } from "react-icons/bi";
import { BsEmojiFrown } from "react-icons/bs";
import { FiUploadCloud } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Picker from "emoji-picker-react";
import { useRef } from "react";
import { useEffect } from "react";

const PostModal = ({ setOpenModal }) => {
  const [file, setFile] = useState(null);
  const [picker, setPicker] = useState(false);
  const [postText, setPostText] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const removeImage = () => {
    setFile(null);
  };

  const handleEmoji = ({ emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = postText.substring(0, ref.selectionStart);
    const end = postText.substring(ref.selectionStart);
    const newtext = start + emoji + end;
    setPostText(newtext);
    setCursorPosition(start.length + emoji.length);
  };

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${year}-${month}-${day}`;
  var currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const handlePost = (event) => {
    event.preventDefault();
    const postInfo = {
      postText,
      currentDate,
      currentTime,
    };
    console.log(postInfo);
    setPicker(false);
    setOpenModal(false);
    setPostText("");
  };

  return (
    <div>
      <input type="checkbox" id="post-modal" className="modal-toggle" />
      <div className="modal">
        <div className={`modal-box ${picker && "h-[590px]"}`}>
          <label
            htmlFor="post-modal"
            onClick={() => setPostText("")}
            class="inline-flex bg-gray-300 rounded-full p-1 absolute right-3 top-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </label>
          <h3 className="text-lg text-center font-bold pb-2">Create post</h3>
          <hr />
          <form onSubmit={handlePost} className="">
            <div className="flex items-center align-middle my-3">
              <img
                className="w-12 h-12 rounded-full"
                src="https://pixlr.com/images/index/collage.webp"
                alt=""
              />
              <div className="ml-3 leading-3">
                <h4 className="mb-2 font-semibold">Ripas Sorker Rifat</h4>
                <p>
                  3 hours
                  <span>
                    <BiWorld className="inline-block ml-1" />
                  </span>
                </p>
              </div>
            </div>
            <div>
              <textarea
                type="text"
                ref={textRef}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="w-full border-b-2 h-m-16 p-2  md:placeholder:text-lg placeholder:text-gray-600 focus:outline-none focus:border-gray-300 resize-none"
                placeholder="What's on your mind, Ripas Sorker....."
              />
            </div>
            <label className="flex justify-end">
              <BsEmojiFrown
                onClick={() => setPicker(!picker)}
                size={24}
                className="inline-block mb-2 text-right text-[#ff059b] z-50"
              />
              {picker && (
                <div className="absolute rounded-lg bg-white z-50 md:right-10 md:top-[227px] top-[228px]">
                  <Picker onEmojiClick={handleEmoji} height={330} width={270} />
                </div>
              )}
            </label>
            <div className=" bg-white  m-auto border-2 border-dashed border-[#ff059b] rounded-lg">
              {file ? (
                <div className=" relative">
                  <img
                    src={URL.createObjectURL(file)}
                    className="object-fill max-h-[300px] w-full rounded-lg"
                    alt=""
                  />
                  <span className="bg-white h-7 w-7 rounded-full absolute top-1 right-1 flex justify-center items-center">
                    <IoMdClose
                      onClick={removeImage}
                      className="text-2xl font-semibold text-gray-800  inline-block"
                    />
                  </span>
                </div>
              ) : (
                <div className=" m-3 hover:bg-slate-200 duration-300 rounded-lg">
                  <label htmlFor="file">
                    <div className="w-full flex justify-center items-center flex-col p-3 py-6">
                      <FiUploadCloud className="text-3xl inline-block text-center text-[#ff059b]" />
                      <p className="text-gray-800">Add Photos/Videos</p>
                    </div>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      accept=".png,.jpg,.jpeg"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </div>
              )}
            </div>
            <button
              type="submit"
              // onClick={handlePost}
              className="bg-[#eb0890] hover:bg-[#fd0298] text-gray-100 text-sm px-4 py-[8px] mt-4 w-full rounded-md inline-block"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostModal;