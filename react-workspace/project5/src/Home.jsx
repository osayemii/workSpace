import { Link } from 'react-router-dom'

export function Home() {

    return (
        <>
            <p><Link to='/FirLinked'>Linked Page 1</Link></p>
            <p><Link to='/SecLinked'>Linked Page 2</Link></p>
        </>
    )
}