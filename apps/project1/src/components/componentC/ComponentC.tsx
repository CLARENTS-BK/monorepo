import { FC, useState } from 'react';
import Button from '../button/Button';
import TextInput from '../textInput/TextInput';
import styles from './ComponentC.module.scss';

interface ComponentCProps {
  onAddTodo: (todo: string) => void;
  onClose: () => void;
}

const ComponentC: FC<ComponentCProps> = ({ onAddTodo, onClose }) => {
  const [newTodo, setNewTodo] = useState<string>('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      onAddTodo(newTodo.trim());
      setNewTodo('');
      onClose();
    }
  };

  return (
    <div className={styles.popupContent}>
      <h2 className={styles.title}>Agregar Todo</h2>
      <TextInput
        label="Nuevo Todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Escribe un nuevo todo"
        inputSize="M"
        isMandatory={true}
      />
      <div className={styles.buttons}>
        <Button
          label="Agregar"
          onClick={handleAddTodo}
          variant="secondary"
        />
        <Button
          label="Cerrar"
          onClick={onClose}
          variant="secondaryNegative"
        />
      </div>
    </div>
  );
};

export default ComponentC;
