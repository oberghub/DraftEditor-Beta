import React, { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html, htmlLanguage } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { dracula } from '@uiw/codemirror-theme-dracula';



const App = () => {
  const [htmlText, setHtmlText] = useState("")
  const [jsText, setJsText] = useState("console.log('hello world!');")
  const onChange = React.useCallback((value, viewUpdate) => {
    // console.log(value)
    setJsText(value)
  }, [])
  const submitjs = () => {
    exportFile("text/javascript")
  }
  const exportFile = (fileType) => {
    const blob = new Blob([jsText], {
      type : fileType
    })
    const fileUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = "script"
    link.href = fileUrl
    link.click()
  }
  // const html_Code_Editor_onChange = useCallback((editor, change) => {
  //   console.log(editor.getValue())
  // })
  return (
    <div>
      <div className='container'>
        <div className='code-box'>
          <CodeMirror
            value={jsText}
            theme={dracula}
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
          />
        </div>
        {/* <div className='code-box'>
          <CodeMirror
            value="<html></html>"
            theme={dracula}
            extensions={[html(htmlLanguage)]}
            onChange={(value, viewUpdate) => {
              console.log(value)
            }}
            placeholder={"HTML Language"}
          />
        </div> */}
        {/* <div className='code-box'>
          <CodeMirror
            value=".container{}"
            theme={dracula}
            extensions={[css()]}
            onChange={onChange}
          />
        </div> */}
      </div>
      <div style={{width : '60px', height : '30px', backgroundColor : 'lightblue', marginLeft : '2em'}} onClick={submitjs}>
      </div>
    </div>
  );
}
export default App