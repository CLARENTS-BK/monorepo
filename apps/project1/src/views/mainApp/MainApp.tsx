// MainApp.tsx
import { usePopups } from 'popup-library';
import { FC, lazy, Suspense, useState } from 'react';
import Button from '../../components/button/Button';
import ComponentC from '../../components/componentC/ComponentC';
import styles from './MainApp.module.scss';
import clsx from 'clsx';

const ComponentA = lazy(() => import('../../components/componentA/ComponentA'));
const ComponentB = lazy(() => import('../../components/componentB/ComponentB'));

const MainApp: FC = () => {
  const { addPopup, closeAll } = usePopups();
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>([]);

  const handleAddTodo = (newTodo: string) => {
    setTodos((prevTodos) => [...prevTodos, { text: newTodo, completed: false }]);
  };

  const openAddTodoPopup = () => {
    addPopup({
      title: 'Nuevo Todo',
      content: (
        <ComponentC
          onAddTodo={handleAddTodo}
          onClose={closeAll}
        />
      ),
      defaultPosition: { left: 100, top: 100, width: 400 },
    });
  };

  const toggleTodo = (index: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index].completed = !updatedTodos[index].completed;
      return updatedTodos;
    });
  };

  const deleteTodo = (index: number) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.app}>
      <div className={styles.columns}>
        <div className={styles.buttonsColumn}>
          <Button
            label="Lanzar Todo Form"
            onClick={openAddTodoPopup}
          />
          <Button
            label="Lanzar Pokemons Casrrusel"
            onClick={() =>
              addPopup({
                title: 'Pokemons Casrrusel',
                content: (
                  <Suspense fallback={<div>Loading Component A...</div>}>
                    <ComponentA />
                  </Suspense>
                ),
                defaultPosition: { left: 100, top: 100, width: 400 },
              })
            }
          />
          <Button
            label="Lanzar Formulario de Contacto" 
            onClick={() =>
              addPopup({
                title: 'Formulario de Contacto',
                content: (
                  <Suspense fallback={<div>Loading Component B...</div>}>
                    <ComponentB />
                  </Suspense>
                ),
                defaultPosition: { left: 200, top: 200, width: 500 },
              })
            }
          />
          <Button
            label="Cerrar Todos los Popups"
            onClick={closeAll}
          />
        </div>
        <div className={styles.todoListColumn}>
          <ul className={styles.todoList}>
            {todos.map((todo, index) => (
              <li
                key={index}
                className={styles.todos}
              >
                <p className={clsx(styles.text, todo.completed && styles.completed)}>{todo.text}</p>
                <div className={styles.buttonsTodo}>
                  <Button
                    label="Completar"
                    variant="secondary"
                    onClick={() => toggleTodo(index)}
                  />
                  <Button
                    label="Eliminar"
                    variant="primaryNegative"
                    onClick={() => deleteTodo(index)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
