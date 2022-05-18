import { useState } from 'react'

import './App.css'
import './Pushable.css'

import SearchEngineButton from './components/SearchEngineButton'
import Pushable from './components/Pushable'
import Icon from './components/Icon'
import FileUpload from './components/FileUpload'

const App = () => {
    const [source, setSource] = useState('')

    const textArea = () => document.getElementById('sourceInput')! as HTMLInputElement

    const updateSource = (newSource: string) => {
        textArea().value = newSource
        setSource(newSource)
    }

    const clearInput = () => updateSource('')

    const readClipboard = () => {
        navigator.clipboard.readText()
            .then(text => updateSource(text))
            .catch(err => console.error('Failed to read clipboard contents: ', err))
    }

    return (
        <div className="App">
            <div className='buttonsList sourceList'>
                <Pushable
                    color='blue'
                    content={Icon}
                    args='paste'
                    action={readClipboard}
                    style={{ margin: '25px 10px' }}
                />

                <Pushable
                    color='red'
                    content={Icon}
                    args='trash-can'
                    action={clearInput}
                    disabled={!!!source}
                    style={{ margin: '25px 10px' }}
                />

                <FileUpload action={updateSource} />
            </div>

            <input
                id='sourceInput'
                type="text"
                onChange={event => updateSource(event.target.value)}
                className='input'
                placeholder='Drop an image from the web here.'
            />

            <div className='buttonsList'>
                <SearchEngineButton engine='Google' source={source} />
                <SearchEngineButton engine='Bing' source={source} />
                <SearchEngineButton engine='Yandex' source={source} />
            </div>
        </div >
    )
}

export default App
