import React, { useState, useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html, htmlLanguage } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { duotoneLight } from '@uiw/codemirror-theme-duotone';
import Modal from './modal'
import { useLocation, Link } from 'react-router-dom';

import JSZip from "jszip";
//for test firebase
import { firebase } from './firebase.js';
import { updateDoc, collection, doc } from "@firebase/firestore"
//for test firebase


const Coding = () => {
    const location = useLocation()
    const [htmlText, setHtmlText] = useState(location.state.data.htmlText)
    const [cssText, setCssText] = useState(location.state.data.cssText)
    const [jsText, setJsText] = useState(location.state.data.jsText)
    const [zipFileModal, setZipFileModal] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    const srcDoc = `
        <html>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <body>${htmlText}</body>
            <style>${cssText}</style>
            <script>${jsText}</script>
        </html>
    `
    const exportFile = () => {
        let htmlStruct = 
        `
        <!DOCTYPE HTML>
        <html>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" type="text/css" href="${cssFileName}.css">
                <title>My Website</title>
                <!--Don't forget to format document before use html code-->
            </head>
            <body>
                ${htmlText}
                <script src="${jsFileName}.js"></script>
            </body>
        </html>
        `
        let zip = new JSZip()
        zip.file(htmlFileName+".html", htmlStruct)
        zip.file(cssFileName+".css", cssText)
        zip.file(jsFileName+".js", jsText)
        zip.file("hello.py", `print("Hello World")`)
        zip.generateAsync({type : 'blob'})
        .then((content) => {
            const link = document.createElement("a");
            link.download = "example.zip";
            link.href = URL.createObjectURL(content);
            link.click();
        })
        setZipFileModal(false)
        setHtmlFileName(""), setCssFileName(""), setJsFileName("")
    }
    const [saved, setSaved] = useState("บันทึก")
    const saveDraft = () => {
        let roomData = location.state.data
        roomData.htmlText = htmlText
        roomData.cssText = cssText
        roomData.jsText = jsText
        console.log(roomData);
        updateDoc(doc(firebase, "roomData", location.state.data.id), roomData)
            .then(() => {
                setSaved("บันทึกแล้ว");
                setInterval(() => {
                    setSaved("บันทึก")
                }, 1500);
                clearInterval();
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const [htmlFileName, setHtmlFileName] = useState("")
    const [cssFileName, setCssFileName] = useState("")
    const [jsFileName, setJsFileName] = useState("")
    const htmlFileNameChange = (event) => {
        setHtmlFileName(event.target.value)
    }
    const cssFileNameChange = (event) => {
        setCssFileName(event.target.value)
    }
    const jsFileNameChange = (event) => {
        setJsFileName(event.target.value)
    }
    const generateFileName = () =>{
        setHtmlFileName("index")
        setCssFileName("style")
        setJsFileName("script")
    }
    const [optionState, setOptionState] = useState(false)
    return (
        <>
            <Modal open={openModal} onClose={() => setOpenModal(false)}></Modal>
            {zipFileModal ?
                <div className="overlay">
                    <div className="modalcontainer" style={{ padding: '2em', position: 'relative', width: '500px', height: '600px' }}>
                        <div>
                            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ color: '#353535', fontSize: '24px' }}>นำออกแบบ Zip</div>
                                <div style={{ cursor: 'pointer', color: '#353535', fontSize: '24px' }} onClick={() => { setZipFileModal(!zipFileModal) }}>X</div>
                            </div>
                            <div style={{ width: '100%', marginTop: '15px', marginBottom: '10px', color: '#353535' }}>
                                ตั้งชื่อไฟล์ของคุณ หรือ <u style={{cursor : 'pointer'}} onClick={() => {generateFileName()}}>ให้เราตั้งชื่อให้</u>
                            </div>
                            <div style={{marginBottom : '1em'}}>
                                <input type='text' style={{
                                    width: '40%', border: '1px solid lightgray', borderRadius: '3px', height: '40px', fontSize: '16px',
                                    paddingLeft: '15px'
                                }} onChange={htmlFileNameChange} value={htmlFileName} />.html
                            </div>
                            <div style={{marginBottom : '1em'}}>
                                <input type='text' style={{
                                    width: '40%', border: '1px solid lightgray', borderRadius: '3px', height: '40px', fontSize: '16px',
                                    paddingLeft: '15px'
                                }} onChange={cssFileNameChange} value={cssFileName} />.css
                            </div>
                            <div style={{marginBottom : '1em'}}>
                                <input type='text' style={{
                                    width: '40%', border: '1px solid lightgray', borderRadius: '3px', height: '40px', fontSize: '16px',
                                    paddingLeft: '15px'
                                }} onChange={jsFileNameChange} value={jsFileName} />.js
                            </div>
                            <div style={{
                                width: '100px', height: '40px', cursor: 'pointer',
                                backgroundColor: '#5cb86b', color: 'white', borderRadius: '5px', display: 'flex',
                                justifyContent: 'center', alignItems: 'center', position : 'absolute', right : 20, bottom : 20
                            }} onClick={() => {exportFile()}}>
                                ยืนยัน
                            </div>
                        </div>
                    </div>
                </div>
                :
                null}
            <div className="top-container">
                <Link to={"/"} className='text-top-container' style={{ cursor: 'pointer' }}>กลับหน้าหลัก</Link>
                <div className='text-top-container' onClick={() => { console.log(location.state.data); }}>
                    <b>{location.state.data.title}</b> - DraftEditor (Demo)
                </div>
                <div className='text-top-container' onClick={() => setOpenModal(true)} style={{ cursor: "pointer" }}>
                    ช่วยเหลือ
                </div>
            </div>
            <div className='containers' style={{ padding: '3em', marginTop: '2em' }}>
                <div className="container-overflow">
                    <div style={{
                        width: '100%', height: '40px', color: '#353535', fontSize: '18px', position: 'sticky', top: 0,
                        zIndex: 30, backgroundColor: '#e1e1e1'
                    }}>
                        โค้ดของคุณ
                    </div>
                    <div className='code-box' style={{ overflow: 'hidden', marginRight: '10px' }}>
                        <CodeMirror
                            theme={duotoneLight}
                            extensions={[html(htmlLanguage)]}
                            onChange={(value, viewUpdate) => {
                                setHtmlText(value)
                            }}
                            placeholder={"HTML"}
                            value={htmlText}
                        />
                    </div>
                    <div className='code-box' style={{ overflow: 'hidden', marginTop: '10px', marginRight: '10px' }}>
                        <CodeMirror
                            theme={duotoneLight}
                            extensions={[css()]}
                            onChange={(value, viewUpdate) => {
                                setCssText(value)
                            }}
                            placeholder={"CSS"}
                            value={cssText}
                        />
                    </div>
                    <div className="code-box" style={{ overflow: 'hidden', marginTop: '10px', marginRight: '10px' }}>
                        <CodeMirror
                            theme={duotoneLight}
                            extensions={[javascript({ jsx: true })]}
                            onChange={(value, viewUpdate) => {
                                setJsText(value)
                            }}
                            placeholder={"JS"}
                            value={jsText}
                        />
                    </div>
                </div>
                <div className="code-box" style={{ overflow: 'hidden', border: 'none', backgroundColor: '#e1e1e1' }}>
                    <div style={{ position: 'relative', width: '100%', height: '40px', color: '#353535', fontSize: '18px', display: 'flex', justifyContent: 'space-between', backgroundColor: '#e1e1e1' }}>
                        <div>ผลลัพธ์</div>
                        <div onClick={() => {setOptionState(!optionState)}} style={{ display: 'flex', gap: '5px', cursor: 'pointer', width: '50px', height: '30px', justifyContent: 'center', marginTop: '0.7em' }}>
                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#353535' }} />
                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#353535' }} />
                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#353535' }} />
                        </div>

                        {optionState ?
                            <div style={{
                                position: 'absolute', padding: '0.5em', right: 10, top: 30, width: '100px', height: 'auto', backgroundColor: '#999',
                                border: '1px solid lightgray'
                            }}>
                                <div style={{
                                    color: '#fff', fontSize: '16px', width: '100%', height: '30px',
                                    borderBottom: '1px solid white', marginTop: '5px', cursor: 'pointer'
                                }} onClick={saveDraft}>{saved}</div>
                                <div style={{
                                    color: '#fff', fontSize: '16px', width: '100%', height: '30px',
                                    borderBottom: '1px solid white', marginTop: '5px', cursor: 'pointer'
                                }} >นำเข้า</div>
                                <div style={{
                                    color: '#fff', fontSize: '16px', width: '100%', height: '30px',
                                    borderBottom: '1px solid white', marginTop: '5px', cursor: 'pointer',
                                    marginBottom : '0.5em'
                                }} onClick={() => {setZipFileModal(!zipFileModal)}}>นำออก</div>
                            </div>
                            : null}
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
        </>
    );
}
export default Coding