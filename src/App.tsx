import { useState } from 'react'

import './App.css'
import './Pushable.css'

import SearchEngineButton from './components/SearchEngineButton'

const App = () => {
    const [source = '', setSource] = useState<string>()

    const clearInput = () => {
        (document.getElementsByClassName('input')[0] as HTMLInputElement).value = ''
        setSource('')
    }

    return (
        <div className="App">
            <div className='buttonsList'>
                <button
                    className='pushable'
                    style={{ margin: '10px' }}
                    onClick={clearInput}>
                    <span className='shadow'></span>
                    <span className='edge'></span>
                    <span className='front' style={{ width: 'fit-content', height: '30px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                    </span>
                </button>
            </div>

            <input
                type="text"
                onChange={event => setSource(event.target.value)}
                className='input'
                placeholder='Drop an image from the web here. Local files not supported yet.' />

            <div className='buttonsList'>
                <SearchEngineButton engine='Google' source={source} />
                <SearchEngineButton engine='Bing' source={source} />
                <SearchEngineButton engine='Yandex' source={source} />
            </div>
        </div>
    )
}

export default App
