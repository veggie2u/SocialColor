import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './redux/reducer'
import { FirebaseProvider } from './utils/firebase'

const store = createStore(reducer)

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <FirebaseProvider>
                <App />
            </FirebaseProvider>
        </Provider>
    </React.StrictMode>, 
    document.getElementById('root')
);
