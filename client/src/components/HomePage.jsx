import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Message = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: ${props => props.success ? 'green' : 'red'};
`;

const HomePage = () => {
  const [message, setMessage] = useState('');
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = true; // Continuously listen for speech

    recognition.onstart = () => {
      setListening(true);
      setMessage("Escutando...");
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[event.resultIndex][0].transcript;
      console.log(`Detectado: ${transcript}`);
      
      if (transcript.toLowerCase().includes("emergência")) {
        setMessage("Palavra-chave detectada, ligando para 190...");
        
        // Enviar solicitação para o backend
        try {
          const response = await axios.post('http://localhost:5000/api/detect-keyword', { keyword: "emergência" });
          setMessage(response.data.message);
        } catch (error) {
          console.error('Erro ao conectar com o backend:', error);
          setMessage('Erro ao conectar com o backend.');
        }
      }
    };

    recognition.onerror = (event) => {
      setMessage(`Erro no reconhecimento: ${event.error}`);
      setListening(false);
    };

    recognition.onend = () => {
      if (listening) {
        recognition.start();  // Restart listening when it stops
      }
    };

    recognition.start();
  };

  useEffect(() => {
    startListening();  // Inicia o reconhecimento ao carregar a página
  }, []);

  return (
    <Container>
      <h1>Detector de Emergência</h1>
      <p>A aplicação está atenta, diga "emergência" para ligar automaticamente para o 190.</p>
      {message && <Message success={message.includes('ligando')}>{message}</Message>}
    </Container>
  );
};

export default HomePage;
