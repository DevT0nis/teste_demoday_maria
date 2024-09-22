import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 5%;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 25px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
`;

const Status = styled.p`
  font-size: 18px;
  color: ${props => props.success ? 'green' : 'red'};
`;

const HomePage = () => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';  // Configura o reconhecimento para português
    recognition.continuous = true; // Continuamente ouvir sem parar
    recognition.interimResults = false; // Apenas resultados finais

    recognition.onstart = () => {
      setIsListening(true);
      setMessage("Escutando... Diga 'emergência' para ligar.");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript.toLowerCase().trim();
      console.log(`Detectado: ${transcript}`);

      if (transcript.includes("emergência")) {
        setMessage("Palavra-chave detectada! Ligando para 190...");
        
        // Criar link tel e simular clique para abrir o discador
        const telLink = document.createElement('a');
        telLink.href = 'tel:190';
        document.body.appendChild(telLink);
        telLink.click();
        document.body.removeChild(telLink);
      }
    };

    recognition.onerror = (event) => {
      setMessage(`Erro no reconhecimento: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognition.start(); // Reiniciar o reconhecimento
    };

    recognition.start();
  };

  useEffect(() => {
    startListening();  // Inicia o reconhecimento assim que o componente é carregado
  }, []);

  return (
    <Container>
      <Title>Detector de Emergência</Title>
      <Status success={isListening}>{message}</Status>
    </Container>
  );
};

export default HomePage;
