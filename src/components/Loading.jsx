// src/components/Loading.js
import React from 'react';
import { ClipLoader } from 'react-spinners'; // Import your desired spinner

const Loading = () => {
  return (
    <div style={styles.overlay}>
      <ClipLoader size={50} color={"#3ECC58"} loading={true} />
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: -25,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#3ecc580d',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  }
};

export default Loading;
