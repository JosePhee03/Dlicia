import { useEffect } from "preact/hooks"
import { getCategories } from "../db/client"

interface CodebarProps {
    codebar: string
}

export function Codebar (props: CodebarProps) {

    useEffect(() => {
        getCategories()
        .then(r => console.log(r))
        .catch(e => console.log("un ERROR", e))
    }, [])


    return (
        <h1>{props.codebar}</h1>

    ) 
}