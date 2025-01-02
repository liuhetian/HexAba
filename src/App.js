import React, { useState } from 'react';
import './App.css';

function App() {
    const [encodeInput, setEncodeInput] = useState('');
    const [decodeInput, setDecodeInput] = useState('');
    const [encodedValue, setEncodedValue] = useState('');
    const [decodedValue, setDecodedValue] = useState('');
    const [activeTab, setActiveTab] = useState('encode');

    const handleChange = (event) => {
        if (activeTab === 'encode') {
            setEncodeInput(event.target.value);
        } else {
            setDecodeInput(event.target.value);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'decode' && encodedValue) {
            setDecodeInput(encodedValue);
        }
        if (tab === 'encode' && decodedValue) {
            setEncodeInput(decodedValue);
        }
    };

    const encode = (a) => {
        const _encode = (b) => {
            const a = {
                '0': '巴', '1': '啊', '2': '呜', '3': '哈', '4': '嘿',
                '5': '呵', '6': '嘻', '7': '哇', '8': '咿', '9': '呀',
                'a': '咕', 'b': '喵', 'c': '汪', 'd': '哞', 'e': '咩', 'f': '吱'
            };
            const hex = b.charCodeAt(0).toString(16);
            return '阿' + hex.split('').map(c => a[c]).join('');
        };
        return a.split('').map(_encode).join('');
    };

    const handleEncode = () => {
        const result = encode(encodeInput);
        setEncodedValue(result);
    };

    const decode = (a) => {
        const _decode = (a) => {
            if (!a) return '';
            const b = {
                '巴': '0', '啊': '1', '呜': '2', '哈': '3', '嘿': '4',
                '呵': '5', '嘻': '6', '哇': '7', '咿': '8', '呀': '9',
                '咕': 'a', '喵': 'b', '汪': 'c', '哞': 'd', '咩': 'e', '吱': 'f'
            };
            const hex = a.split('').map(c => b[c]).join('');
            return String.fromCharCode(parseInt('0x' + hex, 16));
        };
        return a.split('阿').map(_decode).join('');
    };

    const handleDecode = () => {
        const result = decode(decodeInput);
        setDecodedValue(result);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('内容已复制到剪贴板！');
        }).catch(err => {
            console.error('复制失败:', err);
        });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (activeTab === 'encode') {
                handleEncode();
            } else {
                handleDecode();
            }
        }
    };

    return (
        <div className="container">
            <div className="title-container">
                <h1>阿巴语翻译器</h1>
                <p className="subtitle">HexAbayu Translator</p>
            </div>
            <div className="tabs">
                <button 
                    onClick={() => handleTabChange('encode')} 
                    className={`encode-tab ${activeTab === 'encode' ? 'active' : ''}`}
                >
                    编码
                </button>
                <button 
                    onClick={() => handleTabChange('decode')} 
                    className={`decode-tab ${activeTab === 'decode' ? 'active' : ''}`}
                >
                    解码
                </button>
            </div>
            {activeTab === 'encode' && (
                <div className="tab-content">
                    <div className="input-group">
                        <input 
                            type="text" 
                            value={encodeInput} 
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                            placeholder="输入要编码为阿巴语的中文内容" 
                        />
                        <button className="encode-button" onClick={handleEncode}>编码</button>
                    </div>
                    {encodedValue && (
                        <>
                            <p>编码后的内容: {encodedValue}</p>
                            <button className="copy-button" onClick={() => copyToClipboard(encodedValue)}>
                                复制编码结果
                            </button>
                        </>
                    )}
                </div>
            )}
            {activeTab === 'decode' && (
                <div className="tab-content">
                    <div className="input-group">
                        <input 
                            type="text" 
                            value={decodeInput} 
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                            placeholder="输入要解码为中文的阿巴语内容" 
                        />
                        <button className="decode-button" onClick={handleDecode}>解码</button>
                    </div>
                    {decodedValue && (
                        <>
                            <p>解码后的内容: {decodedValue}</p>
                            <button className="copy-button" onClick={() => copyToClipboard(decodedValue)}>
                                复制解码结果
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;