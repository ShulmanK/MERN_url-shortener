import React from 'react'

export const LinkCard = ({link}) => {
    console.log('link in the link card', link)
    return (
        <>
            <h2>Link</h2>
            <p>Your link:
                <a href={link.to} target={"_blank"} rel={"noopener noreferrer"}>
                    {link.to}
                </a>
            </p>
            <p>Link from:
                <a href={link.from} target={"_blank"} rel={"noopener noreferrer"}>
                    {link.from}
                </a>
            </p>
            <p>Amount of the clicking on the link: <strong>{link.clicks}</strong>
            </p>
            <p>The data of the creating:
                <strong> {new Date(link.date).toLocaleDateString()}</strong>
            </p>
        </>
    )
}