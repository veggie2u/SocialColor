import React, { useEffect, useState } from 'react';
import { IonInput } from '@ionic/react';

const InputExample: React.FC = () => {

  const [input, setInput] = useState<string>('')
  
  useEffect(() => {
    console.log(input)
  }, [input])

  return (
    <IonInput value={input} onIonChange={(e:any) => setInput(e.target.value)}></IonInput>
  );
};

export default InputExample;
