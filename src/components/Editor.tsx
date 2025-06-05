import React, { useRef, useEffect, useState } from "react";

import { TextFormatSelector } from "./notes/TextFormatSelector";
import { TextColorSelector } from "./notes/TextColorSelector";
import { BackgroundColorSelector } from "./notes/BackgroundColorSelector";

import { Bold, Italic } from "lucide-react";

interface EditorProps {
  content: string;
  handleInput: (html: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ content, handleInput }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const [openCollapse, setOpenCollapse] = useState<string | null>(null);

  const [currentTag, setCurrentTag] = useState<string | null>(null);
  const [currentColor, setCurrentColor] = useState<string | null>(null);
  const [currentBgColor, setCurrentBgColor] = useState<string | null>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    handleInput(editorRef.current?.innerHTML || "");
    editorRef.current?.focus();
  };

  const onInput = () => {
    handleInput(editorRef.current?.innerHTML || "");
  };

  const checkSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedNode = range.startContainer.parentElement;

      if (selection.toString().length > 0) {
        setShowToolbar(true);
        if (selectedNode) {
          setCurrentTag(selectedNode.tagName);
          const style = window.getComputedStyle(selectedNode);
          setCurrentColor(style.color);
          setCurrentBgColor(style.backgroundColor);
        }
      } else {
        setShowToolbar(false);
        setOpenCollapse(null);
      }
    }
  };

  const selectWordAtCursor = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    if (!range.collapsed) return;

    const node = range.startContainer;
    if (node.nodeType !== Node.TEXT_NODE) return;

    const text = node.textContent;
    if (!text) return;

    const offset = range.startOffset;

    let start = offset;
    while (start > 0 && /\w/.test(text[start - 1])) {
      start--;
    }

    let end = offset;
    while (end < text.length && /\w/.test(text[end])) {
      end++;
    }

    const newRange = document.createRange();
    newRange.setStart(node, start);
    newRange.setEnd(node, end);

    selection.removeAllRanges();
    selection.addRange(newRange);
  };

  useEffect(() => {
    document.addEventListener("mouseup", checkSelection);
    document.addEventListener("keyup", checkSelection);
    return () => {
      document.removeEventListener("mouseup", checkSelection);
      document.removeEventListener("keyup", checkSelection);
    };
  }, []);

  return (
    <>
      {showToolbar && (
        <div className="fixed flex items-baseline justify-start gap-8 bg-black text-white top-32 rounded-md py-1 px-6 select-none">
          <TextFormatSelector
            execCommand={execCommand}
            currentTag={currentTag}
          />

          <button
            className="cursor-pointer text-sm font-extralight"
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              execCommand("bold");
              setOpenCollapse(null);
            }}
          >
            <Bold size={16} />
          </button>

          <button
            className="cursor-pointer text-sm font-extralight"
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              execCommand("italic");
              setOpenCollapse(null);
            }}
          >
            <Italic size={16} />
          </button>

          <TextColorSelector
            execCommand={execCommand}
            currentColor={currentColor}
          />

          <BackgroundColorSelector
            execCommand={execCommand}
            currentBgColor={currentBgColor}
          />
        </div>
      )}

      <div
        ref={editorRef}
        className="editor h-full border border-gray-300 p-2.5 rounded outline-none text-base leading-[1.4] whitespace-pre-wrap break-words overflow-auto"
        contentEditable
        onInput={onInput}
        onMouseDown={(e) => {
          setTimeout(() => {
            selectWordAtCursor();
            checkSelection();
          }, 0);
        }}
        spellCheck
      ></div>
    </>
  );
};
