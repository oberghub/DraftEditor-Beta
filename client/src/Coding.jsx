import React, { useState, useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html, htmlLanguage } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { duotoneLight } from '@uiw/codemirror-theme-duotone';
import Modal from './modal'
import { useLocation, Link } from 'react-router-dom';

//for test firebase
import { firebase } from './firebase.js';
import { updateDoc, collection, doc } from "@firebase/firestore"
//for test firebase


const Coding = () => {
    const location = useLocation()
    const [htmlText, setHtmlText] = useState(location.state.data.htmlText)
    const [cssText, setCssText] = useState(location.state.data.cssText)
    const [jsText, setJsText] = useState(location.state.data.jsText)

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
    // useEffect(() => {}, [])
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
    const [optionState, setOptionState] = useState(false)
    return (
        <>
            <Modal open={openModal} onClose={() => setOpenModal(false)}></Modal>
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
                                }}>นำออก</div>
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