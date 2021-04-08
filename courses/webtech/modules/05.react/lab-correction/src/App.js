import React from 'react';
import './App.css';

import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';

const styles = {
    root: {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#565E71',
        padding: 50
    },
    content: {
        flex: '1 1 auto',
        marginRight: '.5rem'
    },
};

const App = () => (
    <div className="app" style={styles.root}>
        <Header />
        <Main />
        <Footer />
    </div>
);

export default App;
