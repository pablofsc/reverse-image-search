import { useState, ReactElement } from 'react';

import './App.css';

import SearchEngineButton from './components/SearchEngineButton';
import Pushable from './components/Pushable';
import Icon from './components/Icon';
import FileUpload from './components/FileUpload';

const App = (): ReactElement => {
    const [imageSource, setImageSource] = useState<string>('');

    const clearSource = (): void => setImageSource('');

    const readClipboard = (): void => {
        navigator.clipboard.readText()
            .then(text => setImageSource(text))
            .catch(err => console.error('Failed to read clipboard contents: ', err));
    };

    return (
        <div className='App'>
            <div className='buttonsList sourceList'>
                <Pushable
                    class='actionButton'
                    color='blue'
                    content={Icon}
                    args='paste'
                    action={readClipboard}
                />

                <Pushable
                    class='actionButton'
                    color='red'
                    content={Icon}
                    args='trash-can'
                    action={clearSource}
                    disabled={!!!imageSource}
                />

                <FileUpload showOnScreen={setImageSource} />
            </div>

            <input
                className='input'
                type='text'
                placeholder='Drop an image from the web here.'
                value={imageSource}
                onChange={event => setImageSource(event.target.value)}
            />

            <div className='buttonsList'>
                <SearchEngineButton engine='Google' source={imageSource} />
                <SearchEngineButton engine='Bing' source={imageSource} />
                <SearchEngineButton engine='Yandex' source={imageSource} />
            </div>
        </div >
    );
};

export default App;
