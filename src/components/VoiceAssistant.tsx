'use client';

import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';

const vapiApiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
const assistantId = process.env.NEXT_PUBLIC_ASSISTANT_ID;

if (!vapiApiKey) {
  throw new Error('VAPI_API_KEY environment variable is not set');
}
const vapi = new Vapi(vapiApiKey);

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speaker, setSpeaker] = useState('')

  useEffect(() => {
    vapi.on('speech-start', () => {
      console.log('Assistant is speaking...');
      setSpeaker('🤖 Assistant');
    });

    vapi.on('speech-end', () => {
      console.log('Assistant stopped speaking.');
      setSpeaker('🗣️ You');
    });

    vapi.on('message', (data) => {
      if (data.type !== 'transcript') return;
      if (data.transcriptType === 'final') {
        console.log('User said:', data.transcript);
        setTranscript(data.transcript);
      }
    });
  }, []);

  const startAssistant = async () => {
    await vapi.start(assistantId);
    setIsListening(true);
  };

  const stopAssistant = () => {
    vapi.stop();
    setIsListening(false);
  };

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-[#961ba0] to-[#6a0dad] text-white shadow-xl w-full max-w-md mx-auto flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">🎙️ StudyBuddy Assistant</h2>

      {/* Glowing Mic Indicator */}
      <div className="relative">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300
            ${isListening ? 'bg-cyan-500 shadow-[0_0_20px_4px_rgba(56,182,255,0.8)] animate-pulse' : 'bg-gray-600'}`}
        >
          <span className="text-3xl">🎤</span>
        </div>
        <p className="mt-2 text-sm text-center text-white/70">
          {isListening ? 'Listening...' : 'Offline'}
        </p>
      </div>

      {/* Control Button */}
      <button
        onClick={isListening ? stopAssistant : startAssistant}
        className="bg-[#38b6ff] hover:bg-[#e0b1ee] transition-all text-white font-semibold px-6 py-2 rounded-full shadow-md"
      >
        {isListening ? 'Stop Voice' : 'Start Voice'}
      </button>

      {/* Last transcript */}
      {transcript ? (
        <div className="w-full text-sm text-white/90 bg-white/10 p-3 rounded-lg mt-2 border border-white/20">
          <p className="font-semibold text-white mb-1">{`${speaker} said:`}</p>
          <p>{transcript}</p>
        </div>
      ) : (
        <div className="w-full text-sm text-white/90 bg-white/10 p-3 rounded-lg mt-2 border border-white/20 h-[50px]" />
      )}
    </div>
  );
}
