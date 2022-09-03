import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ onChange, language, code ,theme}) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };
  return (
    <div style={{margin:"10px",borderRadius:"10px",border:"1px solid black",padding:'5px'}}>
      <Editor
        height="400px"
        width={`100%`}
        backgroundColor={"transparent"}
        theme={theme}
        language={language || "javascript"}
        value={value}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
