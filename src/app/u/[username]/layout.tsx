import PublicProfile from "./page"

export default async function Layout({params}:{params:Promise<any>}) {
    const { username } = await(params)
    return <PublicProfile username={username}/>
}