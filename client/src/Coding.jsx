import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html, htmlLanguage } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { duotoneLight } from '@uiw/codemirror-theme-duotone';
import Modal from './modal'
import { useLocation, Link } from 'react-router-dom';


const Coding = () => {
    const location = useLocation()
    const [htmlText, setHtmlText] = useState("")
    const [cssText, setCssText] = useState("")
    const [jsText, setJsText] = useState("")

    const [openModal, setOpenModal] = useState(false)

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
    const [saved, setSaved] = useState("บันทึก")
    const saveDraft = () => {
        setSaved("บันทึกแล้ว")
        setInterval(() => {
            setSaved("บันทึก")
        }, 1500);
    }
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
            <div className='containers'>
                <div className="container-overflow">
                    <div style={{
                        width: '100%', height: '40px', color: '#353535', fontSize: '18px', position: 'sticky', top: 0,
                        zIndex: 30, backgroundColor : '#e1e1e1'
                    }}>
                        โค้ดของคุณ
                    </div>
                    <div className='code-box' style={{ overflow: 'hidden', marginRight : '10px' }}>
                        <CodeMirror
                            theme={duotoneLight}
                            extensions={[html(htmlLanguage)]}
                            onChange={(value, viewUpdate) => {
                                setHtmlText(value)
                            }}
                            placeholder={"HTML"}
                        />
                    </div>
                    <div className='code-box' style={{ overflow: 'hidden', marginTop : '10px', marginRight : '10px' }}>
                        <CodeMirror
                            theme={duotoneLight}
                            extensions={[css()]}
                            onChange={(value, viewUpdate) => {
                                setCssText(value)
                            }}
                            placeholder={"CSS"}
                        />
                    </div>
                    <div className="code-box" style={{ overflow: 'hidden', marginTop : '10px', marginRight : '10px' }}>
                        <CodeMirror
                            theme={duotoneLight}
                            extensions={[javascript({ jsx: true })]}
                            onChange={(value, viewUpdate) => {
                                setJsText(value)
                            }}
                            placeholder={"JS"}
                        />
                    </div>
                </div>
                <div className="code-box" style={{ overflow: 'hidden', border: 'none', backgroundColor : '#e1e1e1' }}>
                    <div style={{ width: '100%', height: '40px', color: '#353535', fontSize: '18px', display : 'flex', justifyContent : 'space-between', backgroundColor : '#e1e1e1' }}>
                        <div>ผลลัพธ์</div>
                        <div style={{cursor : 'pointer', fontWeight : '600'}} onClick={saveDraft}>{saved}</div>
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
                <div style={{ width: "100%", height: "100px"}}>
                    <div style={{
                        width: '100px', padding: '10px', height: '45px', backgroundColor: '#5cb86b', color: '#fff', textAlign: 'center',
                        borderRadius: '5px', cursor: 'pointer'
                    }}>
                        ส่งไฟล์ออก
                    </div>
                </div>
            </div>
        </>
    );
}
export default Coding