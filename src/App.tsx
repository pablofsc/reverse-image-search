import { useState } from 'react'

import './App.css'
import './Pushable.css'

import SearchEngineButton from './components/SearchEngineButton'
import Button from './components/Button'
import FileUpload from './components/FileUpload'

const App = () => {
    const [source = '', setSource] = useState<string>()

    const updateSource = (newSource: string) => {
        (document.getElementById('sourceInput')! as HTMLInputElement).value = newSource
        setSource(newSource)
    }

    const clearInput = () => {
        (document.getElementsByClassName('input')[0] as HTMLInputElement).value = ''
        updateSource('')
    }

    const readClipboard = () => {
        navigator.clipboard.readText()
            .then(text => {
                (document.getElementsByClassName('input')[0] as HTMLInputElement).value = text
                updateSource(text)
            })
            .catch(err => {
                console.error('Failed to read clipboard contents: ', err);
            });
        (document.getElementsByClassName('input')[0] as HTMLInputElement).value = ''
    }

    return (
        <div className="App">
            <div className='buttonsList sourceList'>
                <Button
                    pushable='pushable'
                    shadow='shadow'
                    edge='edge blue'
                    front='front'
                    content='icon:paste'
                    action={readClipboard}
                />

                <Button
                    pushable='pushable'
                    shadow='shadow'
                    edge='edge red'
                    front='front'
                    content='icon:trash-can'
                    action={clearInput}
                />

                <FileUpload action={updateSource} />
            </div>

            <input
                id='sourceInput'
                type="text"
                onChange={event => setSource(event.target.value)}
                className='input'
                placeholder='Drop an image from the web here. Local files not supported yet.'
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
