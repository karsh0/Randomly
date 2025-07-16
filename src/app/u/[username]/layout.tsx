import PublicProfile from "./page"

export default function Layout({params}:{params:{username: string}}) {
    const { username } = (params)
    return <PublicProfile username={username}/>
}