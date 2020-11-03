import React from 'react'
import {Link} from 'react-router-dom'

export const LinksList = ({links}) => {
    if(links && !links.length){
        return (<p className="center">There is not links yet</p>)
    } else {
        return (
            <table>
                <thead>
                <tr>
                    <th>№ </th>
                    <th>Original</th>
                    <th>Short</th>
                    <th>Open</th>
                </tr>
                </thead>

                <tbody>
                {links && links.map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>
                                    Open
                                </Link>
                            </td>
                        </tr>)
                })}

                </tbody>
            </table>
        )
    }
}