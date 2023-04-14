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
    <div className="top-container">
      <div className='text-top-container'>Back</div>
      <div className='text-top-container' style={{position : 'absolute', left : '50%'}}>
        DraftEditor (Demo)
      </div>
      <div className='text-top-container' style={{position : 'absolute', right : "1.5em", cursor: "pointer"}}>
        Help
      </div>
    </div>
      <div className='container'>
        <div className="container-overflow">
          <div style={{width : '100%', height : '40px', color : 'white', fontSize : '18px', position : 'sticky', top : 0,
                      zIndex : 50}}>
              Insert Code Here
          </div>
          <div className='code-box' style={{overflow : 'hidden'}}>
            <CodeMirror
              theme={dracula}
              extensions={[html(htmlLanguage)]}
              onChange={(value, viewUpdate) => {
                setHtmlText(value)
              }}
              placeholder={"HTML"}
            />
          </div>
          <div className='code-box' style={{overflow : 'hidden'}}>
            <CodeMirror
              theme={dracula}
              extensions={[css()]}
              onChange={(value, viewUpdate) => {
                setCssText(value)
              }}
              placeholder={"CSS"}
            />
          </div>
          <div className="code-box" style={{overflow : 'hidden'}}>
            <CodeMirror
              theme={dracula}
              extensions={[javascript({ jsx: true })]}
              onChange={(value, viewUpdate) => {
                setJsText(value)
              }}
              placeholder={"JS"}
            />
          </div>
        </div>
        <div className="code-box" style={{overflow : 'hidden', border : 'none'}}>
          <div style={{width : '100%', height : '40px', color : 'white', fontSize : '18px'}}>
            Output
          </div>
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
      <div style={{width : "100%", height : "100px", paddingLeft : "2em"}}>
        <div style={{width : '120px', padding : '10px', height : '45px', backgroundColor : '#5cb86b', color : 'white', textAlign : 'center',
                    borderRadius : '5px', cursor : 'pointer'}}>
              Export As Zip
        </div>
      </div>
    </>
  );
}
export default App