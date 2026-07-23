import React, { useState } from 'react';

function MailRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateName = (value) => {
    if (value.length < 5) return 'Name must be at least 5 characters';
    return '';
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Email must contain @ and .';
    return '';
  };

  const validatePassword = (value) => {
    if (value.length < 8) return 'Password must be at least 8 characters';
    return '';
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setErrors({ ...errors, name: validateName(value) });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors({ ...errors, email: validateEmail(value) });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors({ ...errors, password: validatePassword(value) });
  };

  const isFormValid = () => {
    return (
      name.length >= 5 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      password.length >= 8
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div style={{ padding: '20px', border: '1px solid green', borderRadius: '8px' }}>
        <h2>Registration Successful!</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
      <div style={{ marginBottom: '15px' }}>
        <label>Name:</label><br />
        <input type="text" value={name} onChange={handleNameChange}
          style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        {errors.name && <p style={{ color: 'red', margin: '5px 0 0' }}>{errors.name}</p>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Email:</label><br />
        <input type="email" value={email} onChange={handleEmailChange}
          style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        {errors.email && <p style={{ color: 'red', margin: '5px 0 0' }}>{errors.email}</p>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Password:</label><br />
        <input type="password" value={password} onChange={handlePasswordChange}
          style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        {errors.password && <p style={{ color: 'red', margin: '5px 0 0' }}>{errors.password}</p>}
      </div>

      <button type="submit" disabled={!isFormValid()}
        style={{ padding: '10px 20px', backgroundColor: isFormValid() ? 'green' : 'gray', color: 'white', border: 'none', borderRadius: '5px', cursor: isFormValid() ? 'pointer' : 'not-allowed' }}>
        Register
      </button>
    </form>
  );
}

export default MailRegister;
