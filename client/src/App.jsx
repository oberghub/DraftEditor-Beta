import React, { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html, htmlLanguage } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { dracula } from '@uiw/codemirror-theme-dracula';



const App = () => {
  const [htmlText, setHtmlText] = useState("")
  const [cssText, setCssText] = useState("")
  const [jsText, setJsText] = useState("")

  const [selectTab, setSelectTab] = useState("HTML")

  const [tabValue, setTabValue] = useState(["HTML", "CSS", "JS"])
  const srcDoc = `
  <html>
      <body>${htmlText}</body>
      <style>${cssText}</style>
      <script>${jsText}</script>
  </html>
`
  const submitjs = () => {
    exportFile("text/javascript")
  }
  const exportFile = (fileType) => {
    const blob = new Blob([jsText], {
      type: fileType
    })
    const fileUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = "script"
    link.href = fileUrl
    link.click()
  }
  return (
    <>
      <div className='container'>
        <div>
          <div className='code-box'>
            <CodeMirror
              theme={dracula}
              extensions={[html(htmlLanguage)]}
              onChange={(value, viewUpdate) => {
                setHtmlText(value)
              }}
              placeholder={"HTML Language"}
            />
          </div>
          <div className='code-box'>
            <CodeMirror
              theme={dracula}
              extensions={[css()]}
              onChange={(value, viewUpdate) => {
                setCssText(value)
              }}
            />
          </div>
          <div className="code-box">
            <CodeMirror
              theme={dracula}
              extensions={[javascript({ jsx: true })]}
              onChange={(value, viewUpdate) => {
                setJsText(value)
              }}
            />
          </div>
        </div>
        <div className="code-box">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            width="100%"
            height="100%"
            className='iframe'
          />
        </div>
      </div>
      {/* <div style={{ display: 'flex', width: '300px', marginLeft: '2em', gap: '10px' }}>
        {tabValue.map((item) => {
          return (
            <div className='button' style={{ backgroundColor: 'gray' }} onClick={() => { setSelectTab(item) }}>
              {item}
            </div>
          )
        })}
      </div> */}
    </>
  );
}
export default App