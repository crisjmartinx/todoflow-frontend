import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface Props {
  handleInput: (value: string, delta: any, source: any, editor: any) => void;
  content: string;
}

export const Editor: React.FC<Props> = ({ handleInput, content }) => {
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],

        ["blockquote", "code-block"],

        ["link", "image", "video", "formula"],

        [{ header: 1 }, { header: 2 }],

        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],

        [{ script: "sub" }, { script: "super" }],

        [{ indent: "-1" }, { indent: "+1" }],

        [{ direction: "rtl" }],

        [{ size: ["small", false, "large", "huge"] }],

        [{ color: [] }, { background: [] }],

        [{ font: [] }],

        [{ align: [] }],

        ["clean"],
      ],
    },
  };

  return (
    <>
      <div className="editor border border-gray-200 absolute w-full h-full bg-white rounded-lg text-gray-800 font-medium resize-none transition-all shadow-xl focus:outline-none backdrop-blur-sm cursor-text empty:before:content-[attr(data-placeholder)]before:text-yellow-600/90">
        <ReactQuill
          className="h-full"
          theme="snow"
          modules={modules}
          onChange={handleInput}
          value={content}
        />
      </div>
    </>
  );
};
``;
