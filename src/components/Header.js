/* eslint-disable react-hooks/rules-of-hooks */

import React, { useContext } from 'react'
import AuthContext from '../Auth-context'

const header = props => {
    const auth = useContext(AuthContext)
    const headerTitle = props.header
    console.log(props)
    return (
        <div>
            <header>
                {auth.status ? (
                    <button onClick={props.onLoadHooks}>Hooks</button>
                ) : null}
                <button onClick={props.onLoadAuth}>Auth</button>
            </header>
            <p>{headerTitle}</p>
        </div>
    )
}

export default header
