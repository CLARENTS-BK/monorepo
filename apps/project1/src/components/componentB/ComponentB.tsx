import clsx from 'clsx';
import { FC, FormEvent, useState } from 'react';
import emailRegex from '../../utils/emailRegex';
import Button from '../button/Button';
import styles from './ComponentB.module.scss';

const ComponentB: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    let valid = true;
    let nameError = '';
    let emailError = '';

    if (name.trim() === '') {
      nameError = 'El nombre es requerido.';
      valid = false;
    }

    if (!emailRegex.test(email)) {
      emailError = 'Introduce un correo electrónico válido.';
      valid = false;
    }

    setErrors({ name: nameError, email: emailError });
    return valid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 2000);
    }
  };

  return (
    <div className={styles.container}>
      {!submitted && <h2 className={styles.title}>Formulario de contacto</h2>}
      {submitted ? (
        <div className={styles.successMessage}>
          <p>¡Gracias por enviar el formulario, {name}!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="name"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={clsx(styles.input, errors.name ? styles.errorInput : '')}
            />
            {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
          </div>

          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor="email"
            >
              Correo electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={clsx(styles.input, errors.email && styles.errorInput)}
            />
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
          </div>

          <Button
            label={loading ? 'Enviando...' : 'Enviar'}
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          />
        </form>
      )}
    </div>
  );
};

export default ComponentB;
