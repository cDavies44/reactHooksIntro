import React, { useState, useEffect, useReducer, useMemo } from 'react'
import axios from 'axios'
import List from './List'
import { useFormInput } from '../hooks/formInputs'

const HooksList = props => {
    // USE STATE --> Moved to self created hook in formInputs.js
    // const [hookInput, updateHookInput] = useState('')
    // const [isValidInput, updateValidity] = useState(false)
    const hookInput = useFormInput()

    //use state replaced with use reducer
    //const [hookInputsList, updateHookInputsList] = useState([])

    // USE REDUCER
    const hooksReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload)
            case 'SET':
                return action.payload
            case 'REMOVE':
                return state.filter(hook => hook.id !== action.payload)
            default:
                return state
        }
    }

    const [hookInputsList, dispatch] = useReducer(hooksReducer, [])

    // USE EFFECT
    useEffect(() => {
        axios
            .get(
                'https://react-hooks-tutorial-excella.firebaseio.com/usestate.json'
            )
            .then(res => {
                const hookData = res.data
                const hooks = []
                for (const key in hookData) {
                    hooks.push({
                        id: key,
                        name: hookData[key].name,
                    })
                }
                console.log(hooks)
                // use reducer
                dispatch({ type: 'SET', payload: hooks })
            })
        return () => {
            console.log('Cleanup')
        }
    }, [])

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler)
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler)
        }
    })

    const mouseMoveHandler = event => {
        //console.log(event.clientX, event.clientY);
    }

    // const hookInputHandler = event => {
    //     updateHookInput(event.target.value)
    //     if (event.target.value.trim() === '') {
    //         if (isValidInput !== false) updateValidity(false)
    //     } else {
    //         if (isValidInput !== true) updateValidity(true)
    //     }
    // }

    const removeHookHandler = id => {
        axios
            .delete(
                `https://react-hooks-tutorial-excella.firebaseio.com/usestate/${id}.json`
            )
            .then(dispatch({ type: 'REMOVE', payload: id }))
            .catch(err => console.log(err))
    }

    const hookListHandler = () => {
        axios
            .post(
                'https://react-hooks-tutorial-excella.firebaseio.com/usestate.json',
                { name: hookInput.value }
            )
            .then(res => {
                //console.log('res ' + res.name)
                // use state replaces with us reducer
                // updateHookInputsList(
                //     hookInputsList.concat({
                //         id: res.data.name,
                //         name: hookInput,
                //     })
                // )

                // use reducer

                dispatch({
                    type: 'ADD',
                    payload: { id: res.data.name, name: hookInput.value },
                })

                //moves to valueRest function in formInputs
                // updateHookInput('')

                hookInput.valueReset()
            })
            .catch(err => console.log(err))
    }

    return (
        <React.Fragment>
            <input
                type="text"
                placeholder="hook"
                value={hookInput.value}
                onChange={hookInput.onChange}
                style={{
                    border: hookInput.isValidInput
                        ? '1px solid grey'
                        : '1px solid red',
                }}
            />
            <button type="button" onClick={hookListHandler}>
                Add to Hooks List
            </button>
            {useMemo(
                () => (
                    <List items={hookInputsList} onClick={removeHookHandler} />
                ),
                [hookInputsList]
            )}

            {/* replaced by list.js and the useMemo hook 
                 adds performance boost because only reloads the DOM element on full change */}
            {/* <ul>
                {hookInputsList.map(item => (
                    <li
                        key={item.id}
                        onClick={removeHookHandler.bind(this, item.id)}
                    >
                        {item.name}
                    </li>
                ))}
            </ul> */}
        </React.Fragment>
    )

    /* Rules 
        All hooks must be called at top level of function
        * CAN NOT call in an internal function (exe. const newFunction = () => {})
        * CAN NOT call inside of any conditional or loop (exe. if() or for() )
        * no nesting
        * ^ these can all lead to unexpected behavior 
    */

    /* Hooks
       * hooks are used to dynamically rerender the DOM based on input changes

        --COMMON HOOKS--

        useState()
        * use case: storing data internally for manipulation
        * takes a list of 2 arguments and can be set (and initialized) to anything (string, array, obj): [hookState, updateHookState] = useState([])
        * running " updateHookState('new state that you want to update to') " will update the state of 'hookState'
    
        useEffect()
        * use case: do something on rerender or value change
        * takes 2 inputs: first is what you want to happen, second is a list of vals that, if changed, UseEffect will run
        * if second is left blank useEffect will be run once per render cycle
        * if second is [] then useEffect will only run once upon mount
        * if return is added in useEffect it can be used as a cleanup and will be run once every time useEffect is
        * from the react docs: 
                "The Effect Hook, useEffect, adds the ability to perform side effects from a function component. 
                  It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount 
                  in React classes, but unified into a single API. "
        

        --LESS COMMON HOOKS--

        useContext()
        * use case: setting context externally 
        * returns the current context value of a preset context

        useReducer()
        * use case: preserving and running actions on state internally 
        * data operations and handling
        * takes 2 inputs
            *1  'type' which is the operaton being performed  exe. ADD, REMOVE, SET etc.
            *2  'payload' which is whatever object you're performing the operation on
        * preserves state internally
         
        useMemo()
        * use case: caching information to run logic only on value change
        * takes 2 inputs:
            *1 a function or logic to be returned  
            *2 the value change to cause that
        * good for conditionally doing something
        * can improve performance


        --CUSTOM HOOKS--
        * created in and imported from the hooks folder
        * values are set, functions are made, and only accessed from outside of the function if returned
        * basically like making a new class
        * see ../hooks/formInputs
    */
}

export default HooksList
