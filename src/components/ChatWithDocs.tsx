'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { send } from 'process';

export default function ChatWithDocs() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [summary, setSummary] = useState('');
  const [docText, setDocText] = useState('');



  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { role: 'user', content: input }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat-with-docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, fullText: docText }),
      });

      const data = await res.json();
      setMessages((msgs) => [...msgs, { role: 'assistant', content: data.reply || 'No response from Gemini.' }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((msgs) => [...msgs, { role: 'assistant', content: 'An error occurred. Please try again later.' }]);
    } finally {
      setInput('');
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-6 flex flex-col items-center text-white">
      <div className="max-w-2xl w-full p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-[#38b6ff]">Chat with Docs 🤖</h2>

        {/* <FilePond
          name="filepond"
          acceptedFileTypes={['application/pdf']}
          // labelFileTypeNotAllowed="❌ Only PDF files are allowed"
          // fileValidateTypeLabelExpectedTypes="Expected a PDF"
          allowMultiple={false}
          server={{
            process: (_fieldName, file, _metadata, load, error) => {
              handleFileUpload([{ file }])
                .then(() => load('done'))
                .catch(error);
            },
          }}
        /> */}




        {/* {summary && (
          <div className="mt-4 mb-6 p-4 bg-white/10 border border-white/20 rounded-md text-white/90">
            <h3 className="text-lg font-semibold mb-2 text-[#e0b1ee]">📋 Document Summary</h3>
            <p className="text-sm whitespace-pre-wrap">{summary}</p>
          </div>
        )} */}

        <div className="mb-4 h-64 overflow-y-auto bg-white/10 p-4 rounded-lg border border-white/20">
          {messages.map((msg, i) => (
            <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={msg.role === 'user' ? 'font-bold text-[#38b6ff]' : 'font-bold text-[#e0b1ee]'}>
                {msg.role === 'user' ? 'You' : 'Bot'}:
              </span>{' '}
              {msg.content}
            </div>
          ))}
        </div>

        <textarea
          className="w-full p-3 rounded-lg text-black focus:outline-none"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          placeholder="Ask something about the document..."
        />

        <button
          className="mb-4 w-full mt-3 bg-[#38b6ff] hover:bg-[#e0b1ee] text-white font-semibold py-2 rounded-lg transition duration-300"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>

        <div className="w-full">
          <FilePond
            name="filepond"
            acceptedFileTypes={['application/pdf']}
            // labelFileTypeNotAllowed="❌ Only PDF files are allowed"
            // fileValidateTypeLabelExpectedTypes="Expected a PDF file"
            server={{
              process: {
                url: '/api/upload-docs',
                onload: (response) => {
                  const { text } = JSON.parse(response);
                  setUploadStatus(`✅ File uploaded successfully.`);
                  setDocText(text);
                  setMessages((msgs) => [...msgs, { role: 'user', content: '📄 Uploaded document.' }]);

                  fetch('/api/chat-with-docs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      message: 'I have uploaded a document.',
                      fullText: text,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      setMessages((msgs) => [
                        ...msgs,
                        { role: 'assistant', content: data.reply || 'What would you like to know about the uploaded document?' },
                      ]);
                    })
                    .catch((err) => {
                      console.error('Auto-response error:', err);
                      setMessages((msgs) => [
                        ...msgs,
                        { role: 'assistant', content: 'An error occurred while reviewing the document.' },
                      ]);
                    });

                  return response;
                }
                ,
                onerror: (err) => {
                  // console.error('Upload error:', err);
                  setUploadStatus('❌ Upload failed. Only PDFs are allowed.');
                },
              },
            }}
          />
        </div>

        {uploadStatus && (
          <div className="mt-4 text-white/90 bg-white/10 p-4 rounded-md border border-white/20">
            {uploadStatus}
          </div>
        )}
      </div>

      <Link
        href="/home"
        className="mt-6 px-6 py-3 bg-[#38b6ff] hover:bg-[#e0b1ee] text-black font-semibold rounded-lg transition duration-300"
      >
        Back to Home
      </Link>
    </div>


    // <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 p-6 text-white">
    //   <h1 className="text-3xl font-bold mb-4">📄 Upload a PDF to Log Its Contents</h1>

    // <div className="w-full max-w-lg">
    //   <FilePond
    //     name="filepond"
    //     acceptedFileTypes={['application/pdf']}
    //     // labelFileTypeNotAllowed="❌ Only PDF files are allowed"
    //     // fileValidateTypeLabelExpectedTypes="Expected a PDF file"
    //     server={{
    //       process: {
    //         url: '/api/upload-docs',
    //         onload: (response) => {
    //           setUploadStatus('✅ File uploaded and processed. Check the server console.');
    //           return response;
    //         },
    //         onerror: (err) => {
    //           console.error('Upload error:', err);
    //           setUploadStatus('❌ Upload failed. Only PDFs are allowed.');
    //         },
    //       },
    //     }}
    //   />
    // </div>

    //   {uploadStatus && (
    //     <div className="mt-4 text-white/90 bg-white/10 p-4 rounded-md border border-white/20">
    //       {uploadStatus}
    //     </div>
    //   )}
    // </div>
  );
}
