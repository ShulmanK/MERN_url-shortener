import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {useHttp} from '../hooks/httphook'
import {AuthContext} from '../context/AuthContext'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState()
    const pressHandler = async (e) => {
        if(e.key === 'Enter'){
            console.log('auth', auth.token)
            try{
                const data = await request(
                    '/api/link/generate',
                    'POST',
                    {from: link},
                    {Authorization: `Bearer ${auth.token}`})
                console.log('data in create page', data)
                history.push(`/detail/${data.link._id}`)
            }catch(e){

            }
        }
    }
    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    return (
        <div>
            <div className="row">
                <div className="cols8 offset-2" style={{paddingTop:'2rem'}}>
                    <div className="input-field">
                        <input
                            placeholder="Input link"
                            id="link"
                            type="text"
                            name="email"
                            value={link}
                            onChange={(e)=>setLink(e.target.value)}
                            onKeyPress={pressHandler}
                        />
                        <label htmlFor="link">Input link</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

